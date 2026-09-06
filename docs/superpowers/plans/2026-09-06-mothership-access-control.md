# Mothership Access Control Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Give Mothership a Settings page and a Users & roles directory where a Super Admin or Admin decides who may sign in, which hubs they can open, and what role they carry, gated by the artifact's Mothership activity matrix.

**Architecture:** One shared access module (`shared/access.js`) holds the vocabulary, the activity matrix, the seed built from the org chart, the localStorage overlay, the viewer, and the guards. Two build-free pages (`pages/settings.html`, `pages/users.html`) carry their own copy of the app shell markup the way `pages/feedback-v1.html` does, and share the shell's styles and behaviour through `shared/shell.css` and `shared/shell.js`. A Node script (`scripts/check-access.mjs`) exercises the module's rules; the pages are verified in the browser.

**Tech Stack:** Plain HTML, CSS and ES5-style JavaScript served by `python3 -m http.server`. The vendored design system in `collabrium-dls/`. Node 18+ for the check script only. No new dependencies.

**Spec:** `docs/superpowers/specs/2026-09-06-mothership-access-control-design.md`

**Working directory:** every path below is relative to the mothership repo root, `/Users/kwlkokho/Desktop/Claude-Cowork-Space/Collabrium-Projects/mothership`. Run every command from there.

**One refinement to the spec.** The spec says each page carries its own shell markup and styles. The markup is per page, as in feedback-v1. The styles and the shell behaviour (collapse, account menu, department switcher, hover label, toast, the "Viewing as" control) are shared in two files under `shared/`, because both new pages need exactly the same ~300 lines and duplicating them would leave two copies to keep in step.

---

## File map

| Path | Responsibility |
|---|---|
| `shared/access.js` | Roles, hubs, activity matrix, `holds`, `scopeWord`, `describe`, `buildSeed`, `createStore`, `check`, viewer state. Browser global `CollabAccess`, CommonJS in Node |
| `shared/shell.css` | The page-level shell overrides feedback-v1 carries, plus the page header and the "Viewing as" control |
| `shared/shell.js` | Sidebar collapse, account menu, department switcher, hover label, toast, account-row fill, "Viewing as" mount. Browser global `CollabShell` |
| `pages/settings.html` | Settings: Account card, Users & roles card |
| `pages/users.html` | The directory: toolbar, filters, table, Add and Edit modals, Admin-only state |
| `scripts/check-access.mjs` | Node assertions over the access module |
| `pages/landing-v3.html` | The account menu's Settings item becomes a link (one line) |
| `pages/feedback-v1.html` | Same one-line change, so both existing pages reach Settings |
| `README.md` | Layout table gains the new files |

---

### Task 1: Access module vocabulary, matrix, `holds` and `scopeWord`

**Files:**
- Create: `shared/access.js`
- Create: `scripts/check-access.mjs`

- [ ] **Step 1: Write the failing check script**

Create `scripts/check-access.mjs`:

```js
/* Assertions over shared/access.js. No test runner in this repo, so this is
   a plain script: prints one line per check, exits 1 if any failed.
   Run: node scripts/check-access.mjs */
import { createRequire } from 'node:module';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const require = createRequire(import.meta.url);
const here = path.dirname(fileURLToPath(import.meta.url));
const A = require(path.join(here, '..', 'shared', 'access.js'));
const tree = JSON.parse(readFileSync(path.join(here, '..', 'data', 'org-tree.json'), 'utf8'));

let failed = 0;
function ok(cond, msg) {
  if (cond) console.log('  ok    ' + msg);
  else { failed++; console.log('  FAIL  ' + msg); }
}
function section(name) { console.log('\n' + name); }
/* A localStorage stand-in for Node: same three methods the module calls. */
function memStorage() {
  const m = new Map();
  return {
    getItem: (k) => (m.has(k) ? m.get(k) : null),
    setItem: (k, v) => { m.set(k, String(v)); },
    removeItem: (k) => { m.delete(k); }
  };
}

section('Vocabulary');
ok(A.ROLES.length === 9, 'nine Sales-side roles');
ok(A.ROLES[0].key === 'super_admin' && A.ROLES[1].key === 'admin', 'admin tiers first');
ok(A.INFLUENCER_ROLES.map(r => r.key).join() === 'infl_admin,infl_manager,viewer', 'three Influencer roles');
ok(A.HUBS.map(h => h.key).join() === 'sales,influencer,planning', 'three hubs');
ok(A.roleLabel('sales_rep') === 'Sales (E/SE)', 'role label');
ok(A.hubLabel('influencer') === 'Collab: Influencer', 'hub label');
ok(A.tierOf('admin') === 'admin' && A.tierOf('leadership') === 'business', 'tierOf');

section('Activity matrix');
const INVITE = 'Invite / add a user to the workspace';
const ROLE = "Assign or change a user's role";
const OWN_TARGET = "Update own team's target only (Sales VP: own org · HOS: own team)";
const REPORTS = 'View data access reports';
const HUBS_OFF = 'Enable or disable hubs (Collab: Sales, Collab: Influencer, Collab: Planning)';
ok(A.holds('super_admin', HUBS_OFF), 'Super Admin holds everything');
ok(A.holds('admin', INVITE), 'Admin can invite');
ok(!A.holds('admin', ROLE), 'Admin cannot change a role');
ok(!A.holds('admin', HUBS_OFF), 'Admin cannot enable or disable hubs');
ok(A.holds('admin', REPORTS), 'Admin mirrors Leadership');
ok(!A.holds('leadership', INVITE), 'Leadership cannot invite');
ok(A.holds('sales_vp', OWN_TARGET) && A.holds('head_of_sales', OWN_TARGET), 'VP and HOS edit own target');
ok(!A.holds('admin', OWN_TARGET), 'Admin does not hold the own-team target item');
ok(A.holds('sales_rep', 'View dashboard (home)'), 'every business role sees home');
let threw = false;
try { A.holds('admin', 'No such activity'); } catch (e) { threw = true; }
ok(threw, 'unknown activity label throws');

section('Scope words');
ok(A.scopeWord('super_admin') === 'Everything' && A.scopeWord('admin') === 'Everything', 'admin tiers see everything');
ok(A.scopeWord('leadership') === 'Company', 'Leadership: Company');
ok(A.scopeWord('sales_vp') === 'Own org', 'Sales VP: Own org');
ok(A.scopeWord('head_of_sales') === 'Own team' && A.scopeWord('sales_manager') === 'Own team', 'HOS and Manager: Own team');
ok(A.scopeWord('sales_rep') === 'Own quota', 'Sales: Own quota');

console.log(failed ? `\n${failed} check(s) failed` : '\nAll checks passed');
process.exit(failed ? 1 : 0);
```

- [ ] **Step 2: Run it to verify it fails**

Run: `node scripts/check-access.mjs`
Expected: an error, `Cannot find module '.../shared/access.js'`.

- [ ] **Step 3: Write the module**

Create `shared/access.js`:

```js
/* Collabrium access model.
   Roles, hubs, the Mothership activity matrix from the architecture
   artifact, the seeded directory built from data/org-tree.json, the
   browser-only overlay, and the viewer. One file, so every page reads the
   same rules and a change to the artifact's allocation is a change here.

   Plain script in the browser (window.CollabAccess) and CommonJS in Node,
   which is how scripts/check-access.mjs exercises it. No dependencies. */
(function (root, factory) {
  if (typeof module === 'object' && module && module.exports) module.exports = factory();
  else root.CollabAccess = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';
  var api = {};

  /* ── Vocabulary ─────────────────────────────────────────────────────── */

  /* Shared between Mothership and Collab: Sales. Order is the order the
     pod's own role select uses, with the two admin tiers first. */
  var ROLES = [
    { key: 'super_admin',         label: 'Super Admin' },
    { key: 'admin',               label: 'Admin' },
    { key: 'leadership',          label: 'Leadership' },
    { key: 'sales_vp',            label: 'Sales VP' },
    { key: 'head_of_sales',       label: 'Head of Sales' },
    { key: 'sales_manager',       label: 'Sales Manager' },
    { key: 'sales_rep',           label: 'Sales (E/SE)' },
    { key: 'marketing_services',  label: 'Marketing Services / Product' },
    { key: 'creative_strategist', label: 'Creative Strategist' }
  ];
  /* Collab: Influencer runs its own, simpler set. */
  var INFLUENCER_ROLES = [
    { key: 'infl_admin',   label: 'Admin / Head of Influencer' },
    { key: 'infl_manager', label: 'Influencer Manager' },
    { key: 'viewer',       label: 'Viewer / Client' }
  ];
  var HUBS = [
    { key: 'sales',      label: 'Collab: Sales',      short: 'Sales' },
    { key: 'influencer', label: 'Collab: Influencer', short: 'Influencer' },
    { key: 'planning',   label: 'Collab: Planning',   short: 'Planning' }
  ];
  var ADMIN_TIERS = ['super_admin', 'admin'];
  var BUSINESS = ['leadership', 'sales_vp', 'head_of_sales', 'sales_manager',
                  'sales_rep', 'marketing_services', 'creative_strategist'];
  var TEAM_SCOPED = ['sales_vp', 'head_of_sales', 'sales_manager'];
  var DEFAULT_ROLE = 'sales_rep';
  var DEFAULT_INFLUENCER_ROLE = 'viewer';

  function labelOf(list, key) {
    for (var i = 0; i < list.length; i++) if (list[i].key === key) return list[i].label;
    return key || '';
  }
  function roleLabel(k) { return labelOf(ROLES, k); }
  function influencerRoleLabel(k) { return labelOf(INFLUENCER_ROLES, k); }
  function hubLabel(k) { return labelOf(HUBS, k); }
  function hubShort(k) {
    for (var i = 0; i < HUBS.length; i++) if (HUBS[i].key === k) return HUBS[i].short;
    return k || '';
  }
  function tierOf(role) { return ADMIN_TIERS.indexOf(role) !== -1 ? 'admin' : 'business'; }

  /* ── The Mothership activity matrix ─────────────────────────────────── */

  /* The Mothership tier of the artifact's Activities page, labels verbatim.
     `roles` lists the business roles holding the item, plus 'admin' where
     Admin holds it on its own. Super Admin holds everything. Admin also
     holds whatever Leadership holds, which is the artifact's "Admin mirrors
     Leadership" rule. An empty list means Super Admin only. */
  var ACTIVITIES = [
    { title: 'Manage workspace', items: [
      { label: 'Enable or disable hubs (Collab: Sales, Collab: Influencer, Collab: Planning)', roles: [] },
      { label: 'Manage integrations (Similarweb, Brandwatch, CRM, booking/finance feeds)', roles: [] },
      { label: 'Manage data source connections', roles: [] }
    ]},
    { title: 'Manage user access', items: [
      { label: 'Invite / add a user to the workspace', roles: ['admin'] },
      { label: 'Assign which hub(s) a user can open (Collab: Sales, Collab: Influencer, Collab: Planning)', roles: ['admin'] },
      { label: "Assign or change a user's role", roles: [] },
      { label: 'Deactivate or remove a user', roles: ['admin'] },
      { label: 'Manage team / reporting-line structure', roles: [] }
    ]},
    { title: 'Sales Board data & targets', items: [
      { label: 'Bulk import / replace Sales Board data (Excel upload or JSON ingest)', roles: ['admin'] },
      { label: "Update all teams' targets (org-wide KPIs, to-date & projection, and by-platform targets)", roles: ['admin'] },
      { label: "Update own team's target only (Sales VP: own org · HOS: own team)", roles: ['sales_vp', 'head_of_sales'] },
      { label: 'Edit deal records (campaign, value, owner)', roles: ['admin'] },
      { label: 'Edit pods & IP-concentration breakdowns by Head of Sales', roles: ['admin'] },
      { label: 'Edit prior-year revenue baseline (monthly)', roles: ['admin'] }
    ]},
    { title: 'Manage external access', items: [
      { label: 'Manage guest or external partner access', roles: [] }
    ]},
    { title: 'Audit & compliance', items: [
      { label: 'View audit log', roles: [] },
      { label: 'Export audit log', roles: [] },
      { label: 'View data access reports', roles: ['leadership'] }
    ]},
    { title: 'Export', items: [
      { label: 'Export dashboard data', roles: ['leadership'] },
      { label: 'Export performance reports', roles: ['leadership', 'sales_vp', 'head_of_sales', 'sales_manager', 'marketing_services'] }
    ]},
    { title: 'Collaborate', items: [
      { label: 'View dashboard (home)', roles: BUSINESS },
      { label: 'Customize own dashboard layout', roles: BUSINESS },
      { label: 'View cross-pillar leadership overview', roles: ['leadership'] },
      { label: 'Receive notifications & alerts', roles: BUSINESS }
    ]}
  ];

  function findActivity(label) {
    for (var g = 0; g < ACTIVITIES.length; g++)
      for (var i = 0; i < ACTIVITIES[g].items.length; i++)
        if (ACTIVITIES[g].items[i].label === label) return ACTIVITIES[g].items[i];
    return null;
  }
  /* Does this role hold this activity? Throws on an unknown label, so a
     typo in a page fails loudly instead of quietly denying. */
  function holds(role, label) {
    var item = findActivity(label);
    if (!item) throw new Error('Unknown activity: ' + label);
    if (role === 'super_admin') return true;
    if (item.roles.indexOf(role) !== -1) return true;
    if (role === 'admin' && item.roles.indexOf('leadership') !== -1) return true;
    return false;
  }

  /* The Sales Board scope a role sees, in the artifact's own words. */
  var SCOPE = {
    super_admin: 'Everything', admin: 'Everything', leadership: 'Company',
    sales_vp: 'Own org', head_of_sales: 'Own team', sales_manager: 'Own team',
    sales_rep: 'Own quota', marketing_services: 'Company', creative_strategist: 'Company'
  };
  function scopeWord(role) { return SCOPE[role] || ''; }

  api.ROLES = ROLES;
  api.INFLUENCER_ROLES = INFLUENCER_ROLES;
  api.HUBS = HUBS;
  api.ADMIN_TIERS = ADMIN_TIERS;
  api.BUSINESS = BUSINESS;
  api.TEAM_SCOPED = TEAM_SCOPED;
  api.DEFAULT_ROLE = DEFAULT_ROLE;
  api.DEFAULT_INFLUENCER_ROLE = DEFAULT_INFLUENCER_ROLE;
  api.ACTIVITIES = ACTIVITIES;
  api.roleLabel = roleLabel;
  api.influencerRoleLabel = influencerRoleLabel;
  api.hubLabel = hubLabel;
  api.hubShort = hubShort;
  api.tierOf = tierOf;
  api.holds = holds;
  api.scopeWord = scopeWord;

  return api;
});
```

- [ ] **Step 4: Run the checks**

Run: `node scripts/check-access.mjs`
Expected: every line `ok`, ending `All checks passed`, exit 0.

- [ ] **Step 5: Commit**

```bash
git add shared/access.js scripts/check-access.mjs
git commit -m "access: roles, hubs and the Mothership activity matrix, with a Node check"
```

---

### Task 2: Seed builder from the org chart

**Files:**
- Modify: `shared/access.js` (insert before `return api;`)
- Modify: `scripts/check-access.mjs` (insert before the final `console.log(failed ? ...)`)

- [ ] **Step 1: Add the failing checks**

Insert into `scripts/check-access.mjs`, before the final summary lines:

```js
section('Seed');
const seed = A.buildSeed(tree, Date.parse('2026-09-06T10:00:00Z'));
ok(seed.length > 50, `seed has ${seed.length} people`);
const ids = new Set(seed.map(r => r.id));
ok(ids.size === seed.length, 'ids are unique');
ok(new Set(seed.map(r => r.email)).size === seed.length, 'emails are unique');
const bryan = seed.find(r => r.id === 'bryan-wong');
ok(bryan && bryan.role === 'super_admin' && bryan.reportsTo === null, 'Bryan Wong is Super Admin at the top');
ok(seed.filter(r => r.role === 'sales_vp').every(r => r.reportsTo === 'bryan-wong'), 'VPs report to Bryan');
ok(seed.filter(r => r.role === 'sales_vp').length >= 2, 'the two VPs became Sales VP');
ok(seed.filter(r => r.role === 'head_of_sales').length >= 10, 'heads became Head of Sales');
ok(seed.some(r => r.role === 'sales_manager'), 'pod leads became Sales Manager');
ok(seed.every(r => r.hubs.length === 1 && r.hubs[0] === 'sales'), 'everyone starts with Sales only');
ok(seed.every(r => r.access === 'active'), 'everyone starts active');
ok(seed.every(r => r.reportsTo === null || ids.has(r.reportsTo)), 'every reportsTo resolves');
ok(seed.every(r => !(r.reportsTo && r.reportsToEmail)), 'resolved managers carry no external email');
ok(!seed.some(r => /^open role/i.test(r.name)), 'open seats are skipped');
ok(seed.every(r => /^[a-z.]+@astro\.com\.my$/.test(r.email)), 'emails are in the astro.com.my pattern');
ok(bryan.teamDirect >= 2 && bryan.teamTotal > bryan.teamDirect, 'team counts roll up');
ok(seed.slice(1).every((r, i) => seed[i].name.localeCompare(r.name) <= 0), 'sorted by name');
```

- [ ] **Step 2: Run it to verify it fails**

Run: `node scripts/check-access.mjs`
Expected: `TypeError: A.buildSeed is not a function`.

- [ ] **Step 3: Add the seed builder**

Insert into `shared/access.js` immediately before `return api;`:

```js
  /* ── Seed from the org chart ────────────────────────────────────────── */

  var VIEWER_ID = 'bryan-wong';

  function slug(name) {
    return String(name).toLowerCase().replace(/\(.*?\)/g, '')
      .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  }
  /* The chart has no addresses. first.last@astro.com.my from the name,
     nicknames in parentheses dropped, is the pattern the pod's own
     directory shows. */
  function emailFor(name) {
    var local = String(name).toLowerCase().replace(/\(.*?\)/g, '')
      .replace(/[^a-z\s]/g, '').trim().split(/\s+/).join('.');
    return local + '@astro.com.my';
  }
  function networkIdFor(email) {
    return email.split('@')[0].replace(/\./g, '').slice(0, 8).toUpperCase();
  }
  function iso(ms) { return new Date(ms).toISOString(); }
  function byNameOrder(a, b) { return a.name.localeCompare(b.name); }

  /* Direct and total team sizes, from reportsTo. Recomputed on every read
     so an added or removed person changes their manager's count. */
  function withTeams(recs) {
    var kids = {};
    recs.forEach(function (r) {
      if (r.reportsTo) (kids[r.reportsTo] = kids[r.reportsTo] || []).push(r.id);
    });
    function total(id, seen) {
      var n = 0;
      (kids[id] || []).forEach(function (c) {
        if (seen[c]) return;
        seen[c] = 1;
        n += 1 + total(c, seen);
      });
      return n;
    }
    recs.forEach(function (r) {
      r.teamDirect = (kids[r.id] || []).length;
      r.teamTotal = total(r.id, {});
    });
    return recs;
  }

  /* One record per person in the chart's flat index, plus Bryan Wong on
     top. Role from grade: VP → Sales VP, a head → Head of Sales, a pod lead
     or AVP → Sales Manager, everyone else → Sales (E/SE). */
  function buildSeed(tree, now) {
    now = now || Date.now();
    var DAY = 86400000;
    var alias = tree.boardAlias || {};
    function canon(n) { return alias[n] || n; }
    var vps = {}, heads = {}, leads = {};
    Object.keys(tree.vps || {}).forEach(function (k) { vps[canon(tree.vps[k].name)] = true; });
    (tree.heads || []).forEach(function (h) {
      heads[canon(h.name)] = true;
      (h.pods || []).forEach(function (p) { if (p.lead) leads[canon(p.lead)] = true; });
    });
    var recs = [], byName = {}, ids = {};
    function push(rec) {
      var base = rec.id, n = 2;
      while (ids[rec.id]) rec.id = base + '-' + (n++);
      ids[rec.id] = true;
      byName[rec.name] = rec;
      recs.push(rec);
    }
    push({ id: VIEWER_ID, name: 'Bryan Wong', email: 'bryan.wong@astro.com.my', networkId: 'BRYANWON',
           role: 'super_admin', hubs: ['sales'], influencerRole: null,
           reportsTo: null, reportsToEmail: null, access: 'active',
           lastSignIn: iso(now - 2 * 3600000), _mgr: null });
    var index = tree.index || {};
    Object.keys(index).forEach(function (key) {
      var p = index[key] || {};
      var name = canon(p.name || key);
      if (/^open role/i.test(name) || p.open || byName[name]) return;
      var role = vps[name] ? 'sales_vp'
               : heads[name] ? 'head_of_sales'
               : (leads[name] || p.grade === 'AVP') ? 'sales_manager'
               : 'sales_rep';
      var email = emailFor(name);
      push({ id: slug(name), name: name, email: email, networkId: networkIdFor(email),
             role: role, hubs: ['sales'], influencerRole: null,
             reportsTo: null, reportsToEmail: null, access: 'active',
             lastSignIn: role === 'sales_vp' ? iso(now - 3 * DAY) : null,
             _mgr: p.reportsTo || null });
    });
    /* Managers resolve by name, through the board aliases. A manager the
       chart names but does not list is kept as an address, which the
       directory shows with the pod's "Not a Collabrium user" note. */
    recs.forEach(function (r) {
      var m = r._mgr ? canon(r._mgr) : null;
      if (r.id === VIEWER_ID) { /* top of the tree */ }
      else if (r.role === 'sales_vp') r.reportsTo = VIEWER_ID;
      else if (m && byName[m]) r.reportsTo = byName[m].id;
      else if (m) r.reportsToEmail = emailFor(m);
      delete r._mgr;
    });
    /* Duplicate addresses can only come from two names collapsing to the
       same local part; disambiguate with the id, which is already unique. */
    var seenEmail = {};
    recs.forEach(function (r) {
      if (seenEmail[r.email]) { r.email = r.id.replace(/-/g, '.') + '@astro.com.my'; r.networkId = networkIdFor(r.email); }
      seenEmail[r.email] = true;
    });
    return withTeams(recs.sort(byNameOrder));
  }

  api.VIEWER_ID = VIEWER_ID;
  api.buildSeed = buildSeed;
  api.withTeams = withTeams;
```

- [ ] **Step 4: Run the checks**

Run: `node scripts/check-access.mjs`
Expected: all `ok`, `All checks passed`. If "heads became Head of Sales" fails, print `seed.filter(r => r.role === 'head_of_sales').map(r => r.name)` and compare against `tree.heads`; the names must match after `boardAlias` is applied.

- [ ] **Step 5: Commit**

```bash
git add shared/access.js scripts/check-access.mjs
git commit -m "access: seed the directory from the org chart, Bryan Wong on top"
```

---

### Task 3: Overlay store and the guards

**Files:**
- Modify: `shared/access.js` (insert before `return api;`)
- Modify: `scripts/check-access.mjs`

- [ ] **Step 1: Add the failing checks**

Insert into `scripts/check-access.mjs`, before the final summary lines:

```js
section('Store');
{
  const st = memStorage();
  const store = A.createStore({ seed, storage: st });
  ok(store.list().length === seed.length, 'list returns the seed');
  ok(store.syncedAt() === null, 'no sync stamp yet');
  const joy = store.list().find(r => r.name.indexOf('Ahmad') !== -1);
  ok(!!joy, 'a seeded person can be found');
  store.save(Object.assign({}, joy, { hubs: ['sales', 'influencer'], influencerRole: 'infl_manager' }));
  ok(store.get(joy.id).hubs.length === 2, 'a saved change is read back');
  ok(store.list().length === seed.length, 'saving does not duplicate');
  store.save({ id: 'new-person', name: 'New Person', email: 'new.person@astro.com.my', networkId: 'NEWPERSO',
               role: 'sales_rep', hubs: ['planning'], influencerRole: null,
               reportsTo: joy.id, reportsToEmail: null, access: 'active', lastSignIn: null });
  ok(store.list().length === seed.length + 1, 'an added person appears');
  ok(store.get(joy.id).teamDirect === joy.teamDirect + 1, "the manager's direct count grew");
  store.remove('new-person');
  ok(store.get('new-person') === null && store.list().length === seed.length, 'a removed person is gone');
  store.remove(joy.id);
  ok(store.get(joy.id) === null, 'a seeded person can be removed');
  store.save(joy);
  ok(store.get(joy.id) !== null, 'saving again un-removes');
  store.stampSync('2026-09-06T10:18:00.000Z');
  ok(store.syncedAt() === '2026-09-06T10:18:00.000Z', 'sync stamp is kept');
  store.reset();
  ok(store.get(joy.id).hubs.length === 1 && store.syncedAt() === null, 'reset restores the seed');
  ok(store.candidates().length === 0, 'no candidates while everyone is in');
  store.remove(joy.id);
  ok(store.candidates().length === 1 && store.candidates()[0].id === joy.id, 'a removed person is a candidate again');
  store.reset();
}

section('Guards');
{
  const all = A.withTeams(seed.map(r => Object.assign({}, r)));
  const SA = { id: 'bryan-wong', role: 'super_admin' };
  const AD = { id: 'bryan-wong', role: 'admin' };
  const LD = { id: 'bryan-wong', role: 'leadership' };
  const joy = all.find(r => r.name.indexOf('Ahmad') !== -1);
  const bryan = all.find(r => r.id === 'bryan-wong');
  const edit = (rec, patch) => Object.assign({}, rec, patch);
  ok(A.check(SA, joy, edit(joy, { role: 'sales_manager' }), all) === null, 'Super Admin may change a role');
  ok(/Super Admin sets the role/.test(A.check(AD, joy, edit(joy, { role: 'sales_manager' }), all)), 'Admin may not change a role');
  ok(A.check(AD, joy, edit(joy, { hubs: ['sales', 'planning'] }), all) === null, 'Admin may assign hubs');
  ok(A.check(AD, joy, edit(joy, { access: 'inactive' }), all) === null, 'Admin may deactivate');
  ok(A.check(AD, joy, null, all) === null, 'Admin may remove');
  ok(/Admin or Super Admin/.test(A.check(LD, joy, edit(joy, { access: 'inactive' }), all)), 'a business role may do nothing');
  ok(/at least one hub/.test(A.check(SA, joy, edit(joy, { hubs: [] }), all)), 'a record cannot lose its last hub');
  ok(/Influencer role/.test(A.check(SA, joy, edit(joy, { hubs: ['sales', 'influencer'], influencerRole: null }), all)), 'Influencer needs an Influencer role');
  ok(A.check(SA, joy, edit(joy, { hubs: ['sales', 'influencer'], influencerRole: 'viewer' }), all) === null, 'Influencer with a role is fine');
  ok(/last active Super Admin/.test(A.check(SA, bryan, edit(bryan, { access: 'inactive' }), all)), 'the last Super Admin cannot be deactivated');
  ok(/last active Super Admin/.test(A.check(SA, bryan, edit(bryan, { role: 'admin' }), all)), 'the last Super Admin cannot be demoted');
  ok(/last active Super Admin/.test(A.check(SA, bryan, null, all)), 'the last Super Admin cannot be removed');
  const withSecond = all.concat([edit(joy, { id: 'second-sa', role: 'super_admin' })]);
  ok(/own admin tier/.test(A.check(SA, bryan, edit(bryan, { role: 'leadership' }), withSecond)), 'the viewer cannot change their own tier');
  ok(A.check(SA, joy, edit(joy, { role: 'super_admin' }), all) === null, 'someone else can be promoted');
  const add = { id: 'x', name: 'X', email: 'x@astro.com.my', networkId: 'X', role: 'sales_rep', hubs: ['sales'],
                influencerRole: null, reportsTo: null, reportsToEmail: null, access: 'active', lastSignIn: null };
  ok(A.check(AD, null, add, all) === null, 'Admin may add with the default role');
  ok(/Super Admin sets the role/.test(A.check(AD, null, edit(add, { role: 'leadership' }), all)), 'Admin may not add with another role');
  ok(A.check(AD, null, edit(add, { hubs: ['sales', 'influencer'], influencerRole: 'viewer' }), all) === null, 'Admin may add with the default Influencer role');
  ok(/Super Admin sets the role/.test(A.check(AD, null, edit(add, { hubs: ['influencer'], influencerRole: 'infl_admin' }), all)), 'Admin may not pick an Influencer role');
}
```

- [ ] **Step 2: Run it to verify it fails**

Run: `node scripts/check-access.mjs`
Expected: `TypeError: A.createStore is not a function`.

- [ ] **Step 3: Add the store and the guards**

Insert into `shared/access.js` immediately before `return api;`:

```js
  /* ── The overlay store ──────────────────────────────────────────────── */

  /* Seed plus a browser-only overlay. The overlay holds full records for
     anyone added or changed, keyed by id, a list of removed ids, and the
     Azure AD sync stamp. Reading is seed, then overlay on top, then removals
     dropped. Clearing the key restores the seed exactly. */
  var DIRECTORY_KEY = 'collabrium.access.directory';

  function clone(o) { return JSON.parse(JSON.stringify(o)); }
  function strip(rec) {
    var r = clone(rec);
    delete r.teamDirect;
    delete r.teamTotal;
    return r;
  }

  function createStore(opts) {
    var seed = opts.seed, storage = opts.storage, KEY = opts.key || DIRECTORY_KEY;
    function read() {
      try {
        var v = JSON.parse(storage.getItem(KEY) || '{}') || {};
        return { changed: v.changed || {}, removed: v.removed || [], syncedAt: v.syncedAt || null };
      } catch (e) { return { changed: {}, removed: [], syncedAt: null }; }
    }
    function write(o) { try { storage.setItem(KEY, JSON.stringify(o)); } catch (e) { /* quota or private mode: the page still works on the seed */ } }
    function list() {
      var o = read(), inSeed = {};
      var out = seed.map(function (r) { inSeed[r.id] = true; return o.changed[r.id] ? clone(o.changed[r.id]) : strip(r); });
      Object.keys(o.changed).forEach(function (id) { if (!inSeed[id]) out.push(clone(o.changed[id])); });
      out = out.filter(function (r) { return o.removed.indexOf(r.id) === -1; });
      return withTeams(out.sort(byNameOrder));
    }
    function get(id) {
      var all = list();
      for (var i = 0; i < all.length; i++) if (all[i].id === id) return all[i];
      return null;
    }
    function save(rec) {
      var o = read();
      o.changed[rec.id] = strip(rec);
      o.removed = o.removed.filter(function (x) { return x !== rec.id; });
      write(o);
    }
    function remove(id) {
      var o = read();
      delete o.changed[id];
      if (o.removed.indexOf(id) === -1) o.removed.push(id);
      write(o);
    }
    function reset() { try { storage.removeItem(KEY); } catch (e) {} }
    function syncedAt() { return read().syncedAt; }
    function stampSync(t) { var o = read(); o.syncedAt = t || new Date().toISOString(); write(o); }
    /* Org-chart people not currently in the directory: what Add a user
       searches over. A removed person comes back as a candidate. */
    function candidates() {
      var present = {};
      list().forEach(function (r) { present[r.id] = true; });
      return seed.filter(function (r) { return !present[r.id]; }).map(strip);
    }
    return { list: list, get: get, save: save, remove: remove, reset: reset,
             syncedAt: syncedAt, stampSync: stampSync, candidates: candidates };
  }

  /* ── The guards ─────────────────────────────────────────────────────── */

  /* Every rule the pages enforce, in one place. `before` is null for an
     add, `next` is null for a remove. Returns null when the change is
     allowed, otherwise the sentence the page shows next to the control. */
  var DENIED = 'Users & permissions is managed by an Admin or Super Admin.';
  var ROLE_IS_SUPER = 'A Super Admin sets the role.';

  function check(viewer, before, next, all) {
    if (tierOf(viewer.role) !== 'admin') return DENIED;
    if (next) {
      if (!next.hubs || !next.hubs.length) return 'Every user needs at least one hub. Deactivate them instead.';
      var hasInfl = next.hubs.indexOf('influencer') !== -1;
      if (hasInfl && !next.influencerRole) return 'Choose an Influencer role for Collab: Influencer.';
      if (!hasInfl && next.influencerRole) return 'An Influencer role needs Collab: Influencer granted.';
      var roleChanged = before
        ? (before.role !== next.role || (before.influencerRole || null) !== (next.influencerRole || null))
        : (next.role !== DEFAULT_ROLE || (hasInfl && next.influencerRole !== DEFAULT_INFLUENCER_ROLE));
      if (viewer.role === 'admin' && roleChanged) return ROLE_IS_SUPER;
      if (before && before.id === viewer.id && tierOf(before.role) !== tierOf(next.role))
        return 'You cannot change your own admin tier.';
    }
    if (before && before.role === 'super_admin' && before.access === 'active') {
      var stillSuper = next && next.role === 'super_admin' && next.access === 'active';
      if (!stillSuper) {
        var others = all.filter(function (r) {
          return r.id !== before.id && r.role === 'super_admin' && r.access === 'active';
        }).length;
        if (!others) return 'This is the last active Super Admin. Promote someone else first.';
      }
    }
    if (!next && before && before.id === viewer.id) return 'You cannot remove yourself.';
    return null;
  }

  api.DIRECTORY_KEY = DIRECTORY_KEY;
  api.DENIED = DENIED;
  api.ROLE_IS_SUPER = ROLE_IS_SUPER;
  api.createStore = createStore;
  api.check = check;
```

- [ ] **Step 4: Run the checks**

Run: `node scripts/check-access.mjs`
Expected: all `ok`, `All checks passed`.

- [ ] **Step 5: Commit**

```bash
git add shared/access.js scripts/check-access.mjs
git commit -m "access: the overlay store and every guard the pages enforce"
```

---

### Task 4: Viewer state, `can`, `describe`, `initials`

**Files:**
- Modify: `shared/access.js` (insert before `return api;`)
- Modify: `scripts/check-access.mjs`

- [ ] **Step 1: Add the failing checks**

Insert into `scripts/check-access.mjs`, before the final summary lines:

```js
section('Viewer');
{
  const st = memStorage();
  const v = A.getViewer(st);
  ok(v.id === 'bryan-wong' && v.name === 'Bryan Wong' && v.role === 'super_admin', 'default viewer is Bryan as Super Admin');
  A.setViewer(st, 'admin');
  ok(A.getViewer(st).role === 'admin', 'viewer role is stored');
  A.setViewer(st, 'sales_rep');
  ok(A.getViewer(st).role === 'admin', 'a role outside the three is ignored');
  st.setItem('collabrium.access.viewer', 'garbage');
  ok(A.getViewer(st).role === 'super_admin', 'garbage falls back to Super Admin');
  A.setViewer(st, 'leadership');
  ok(!A.can(st, 'Invite / add a user to the workspace'), 'can() reads the stored viewer');
  A.setViewer(st, 'admin');
  ok(A.can(st, 'Invite / add a user to the workspace'), 'can() for Admin');
  ok(A.VIEWER_ROLES.join() === 'super_admin,admin,leadership', 'three viewer roles');
}

section('Describe');
{
  const rec = { role: 'head_of_sales', hubs: ['sales', 'influencer', 'planning'], influencerRole: 'infl_manager' };
  const lines = A.describe(rec);
  ok(lines.length === 4, 'one line for scope plus one per hub');
  ok(/own team/i.test(lines[0]), 'scope line names the scope');
  ok(/Collab: Sales/.test(lines[1]) && /team/.test(lines[1]), 'Sales line is team-scoped');
  ok(/Collab: Influencer/.test(lines[2]) && /view Users & Permissions/.test(lines[2]), 'Influencer Manager line');
  ok(/Collab: Planning/.test(lines[3]), 'Planning line');
  ok(A.describe({ role: 'super_admin', hubs: ['sales'] })[0].indexOf('Platform ceiling') !== -1, 'Super Admin line');
  ok(A.describe({ role: 'admin', hubs: ['sales'] })[0].indexOf('A Super Admin sets roles') !== -1, 'Admin line');
  ok(A.initials('Bryan Wong') === 'BW' && A.initials('Normala (Joy) Ahmad') === 'NA', 'initials skip nicknames');
}
```

- [ ] **Step 2: Run it to verify it fails**

Run: `node scripts/check-access.mjs`
Expected: `TypeError: A.getViewer is not a function`.

- [ ] **Step 3: Add the viewer, `can`, `describe` and `initials`**

Insert into `shared/access.js` immediately before `return api;`:

```js
  /* ── The viewer ─────────────────────────────────────────────────────── */

  /* Always Bryan Wong; only the role line changes. That keeps the demo
     honest about it being one person trying on three views. */
  var VIEWER_KEY = 'collabrium.access.viewer';
  var VIEWER_ROLES = ['super_admin', 'admin', 'leadership'];

  function getViewer(storage) {
    var role = null;
    try { role = storage.getItem(VIEWER_KEY); } catch (e) {}
    if (VIEWER_ROLES.indexOf(role) === -1) role = 'super_admin';
    return { id: VIEWER_ID, name: 'Bryan Wong', email: 'bryan.wong@astro.com.my', role: role };
  }
  function setViewer(storage, role) {
    if (VIEWER_ROLES.indexOf(role) === -1) return;
    try { storage.setItem(VIEWER_KEY, role); } catch (e) {}
  }
  /* The one question a page asks before showing a control. */
  function can(storage, label) { return holds(getViewer(storage).role, label); }

  /* ── Plain-language summary for the forms ───────────────────────────── */

  function salesLine(role) {
    if (tierOf(role) === 'admin') return 'full access to all campaigns, manages Users & Permissions, reads every Activity Log entry.';
    if (TEAM_SCOPED.indexOf(role) !== -1) return "own + their team's campaigns, and can edit their team's work. Activity log: own team.";
    if (role === 'marketing_services') return 'own campaigns only, and the sole editor of Inventory, Bundles and Brand Profiles. Activity log: own only.';
    return "own campaigns only, cannot edit anyone else's work. Activity log: own only.";
  }
  function influencerLine(r) {
    if (r === 'infl_admin') return 'full access across Tools, Reference Data and Insight, manages Users & Permissions.';
    if (r === 'infl_manager') return 'full access across Tools, Reference Data and Insight, can view Users & Permissions but not manage it.';
    return 'no standing access, can respond to their own KOL preview or draft.';
  }
  function describe(rec) {
    var lines = [], hubs = rec.hubs || [];
    if (rec.role === 'super_admin') lines.push('Sees everything on the Sales Board. Platform ceiling: every activity, everywhere.');
    else if (rec.role === 'admin') lines.push('Sees everything on the Sales Board. Adds users, assigns hubs, deactivates. A Super Admin sets roles.');
    else lines.push('Sees ' + scopeWord(rec.role).toLowerCase() + ' on the Sales Board.');
    if (hubs.indexOf('sales') !== -1) lines.push('Collab: Sales: ' + salesLine(rec.role));
    if (hubs.indexOf('influencer') !== -1) lines.push('Collab: Influencer: ' + influencerLine(rec.influencerRole));
    if (hubs.indexOf('planning') !== -1) lines.push('Collab: Planning: opens Plans, Campaign performances, and Inventory availability & forecast.');
    return lines;
  }

  function initials(name) {
    var parts = String(name).replace(/\(.*?\)/g, '').trim().split(/\s+/);
    return ((parts[0] || '')[0] || '').toUpperCase() + ((parts[parts.length - 1] || '')[0] || '').toUpperCase();
  }

  api.VIEWER_KEY = VIEWER_KEY;
  api.VIEWER_ROLES = VIEWER_ROLES;
  api.getViewer = getViewer;
  api.setViewer = setViewer;
  api.can = can;
  api.describe = describe;
  api.initials = initials;
```

- [ ] **Step 4: Run the checks**

Run: `node scripts/check-access.mjs`
Expected: all `ok`, `All checks passed`.

- [ ] **Step 5: Commit**

```bash
git add shared/access.js scripts/check-access.mjs
git commit -m "access: the viewer, can(), and the plain-language role summary"
```

---

### Task 5: Shared shell styles and behaviour

**Files:**
- Create: `shared/shell.css`
- Create: `shared/shell.js`

These are the shell overrides and scripts `pages/feedback-v1.html` already carries, lifted out so the two new pages share them, plus the page header, the toast, the account-row fill and the "Viewing as" control. Nothing here is tested by Node; Task 6 verifies it in the browser.

- [ ] **Step 1: Create `shared/shell.css`**

```css
/* Collabrium app shell, page-level rules shared by settings.html and
   users.html. Every rule here is either ported from feedback-v1.html, where
   its reasoning is written up, or belongs to the page header and the
   "Viewing as" control those two pages share. The design system itself is
   linked separately and never edited. */

*{box-sizing:border-box;}
html,body{margin:0; height:100%;}
body{font-family:var(--font-primary); color:var(--color-neutral-9);
  background:var(--color-canvas-warm); -webkit-font-smoothing:antialiased;}

/* The DS ships .c-shell at a fixed 480px; every real screen has to say so. */
.c-shell{height:100dvh;}
.c-shell-content{padding:0;}
.c-sidebar-footer{margin-top:auto;}

/* The account row, composed from UserPicker's avatar/name/role classes. */
.c-sidebar-account{display:flex; align-items:center; gap:var(--spacing-12);
  width:100%; padding:var(--spacing-8) var(--spacing-12);
  margin-bottom:var(--spacing-4); border:none; background:transparent;
  border-radius:var(--radius-sm); font-family:inherit; text-align:left;
  cursor:pointer;
  transition:background-color var(--duration-fast) var(--ease-standard);}
.c-sidebar-account:hover{background:var(--color-neutral-2);}
.c-sidebar.is-collapsed .c-sidebar-item span.label{display:none;}
.c-sidebar.is-collapsed .c-sidebar-account{justify-content:center; padding:var(--spacing-8) 0;}
.c-sidebar.is-collapsed .c-sidebar-account .c-search-input-text{display:none;}

/* The account menu: Settings and Log out, opening above the row. Fixed and
   outside .c-sidebar because the rail clips. */
.c-account-menu{display:none; position:fixed; width:200px; z-index:60;
  background:var(--color-neutral-1); border:1px solid var(--color-neutral-3);
  border-radius:var(--radius-md); box-shadow:var(--shadow-3);
  padding:var(--spacing-4); overflow:hidden;}
.c-account-menu.is-open{display:block;}
.c-account-menu-item{display:flex; align-items:center; gap:var(--spacing-12);
  width:100%; height:36px; padding:0 var(--spacing-8); border:none;
  background:transparent; border-radius:var(--radius-sm);
  font-family:var(--font-primary); font-size:var(--text-body1-size);
  font-weight:500; color:var(--color-neutral-9); text-decoration:none;
  text-align:left; cursor:pointer;
  transition:background-color var(--duration-fast) var(--ease-standard);}
.c-account-menu-item:hover{background:var(--color-neutral-2);}
.c-account-menu-item i{flex:none; font-size:16px; color:var(--color-neutral-5);}
.c-sidebar-hover-label{z-index:60;}
.c-dept-dropdown{position:fixed; z-index:60;}
a.c-sidebar-item{text-decoration:none;}

/* The page: a centred column, the pod's own width. */
.pg-wrap{max-width:1180px; margin:0 auto;
  padding:var(--spacing-32) var(--spacing-24) var(--spacing-60);}
.pg-head{display:flex; align-items:flex-start; justify-content:space-between;
  gap:var(--spacing-16); flex-wrap:wrap; margin-bottom:var(--spacing-24);}
.pg-head h1{margin:0; font-size:var(--text-h2-size); font-weight:800; line-height:1.15;}
.pg-head .sub{margin:var(--spacing-4) 0 0; color:var(--color-neutral-5);
  font-size:var(--text-body1-size);}
.pg-head-right{display:flex; align-items:center; gap:var(--spacing-12); flex-wrap:wrap;}
.pg-rule{width:100%; border:none; border-top:1px solid var(--color-neutral-3);
  margin:var(--spacing-16) 0 0;}

/* "Viewing as": one person trying on three views. */
.va{display:inline-flex; align-items:center; gap:var(--spacing-8);
  font-size:var(--text-caption-size); color:var(--color-neutral-5);}
.va-seg{display:inline-flex; border:1px solid var(--color-neutral-3);
  border-radius:var(--radius-pill); background:var(--color-neutral-1); padding:2px;}
.va-seg button{height:28px; padding:0 var(--spacing-12); border:none;
  border-radius:var(--radius-pill); background:transparent; font-family:inherit;
  font-size:var(--text-caption-size); font-weight:700; color:var(--color-neutral-9);
  cursor:pointer; transition:background-color var(--duration-fast) var(--ease-standard);}
.va-seg button:hover{background:var(--color-neutral-2);}
.va-seg button[aria-pressed="true"]{background:var(--color-obsidian); color:var(--color-neutral-1);}
.va-seg button:focus-visible{outline:2px solid var(--color-obsidian); outline-offset:2px;}

/* Toasts sit bottom-right, the DS host. */
.c-toast-host{pointer-events:none;}

/* Narrow: the rail becomes a box in the corner, as the dashboard does. */
@media (max-width:640px){
  .c-shell{position:relative;}
  .c-shell .c-sidebar-shell{position:absolute; top:var(--spacing-16);
    left:var(--spacing-16); margin:0; z-index:50;}
  .c-shell-main{padding-top:74px;}
  .c-sidebar.is-collapsed .c-sidebar-header{padding:var(--spacing-8);}
  .c-sidebar.is-collapsed .c-sidebar-item,
  .c-sidebar.is-collapsed .c-sidebar-footer{display:none;}
  .pg-wrap{padding:var(--spacing-20) var(--spacing-16) var(--spacing-48);}
  .pg-head h1{font-size:26px;}
}
```

- [ ] **Step 2: Create `shared/shell.js`**

```js
/* Collabrium app shell behaviour, shared by settings.html and users.html.
   Ported from feedback-v1.html, which documents each piece: the rail's
   collapse, the account menu, the department switcher, the collapsed rail's
   hover label. Added here: the toast, filling the account row from the
   viewer, and the "Viewing as" control.

   Usage, after the markup is in the page and shared/access.js is loaded:
     CollabShell.init({ onViewerChange: function (viewer) { ... } });
   init() returns the viewer. CollabShell.toast(tone, title, message) shows
   a toast in #toasts. CollabShell.esc(s) escapes text for innerHTML. */
(function () {
  'use strict';
  var REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var NARROW = window.matchMedia('(max-width:640px)');

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  /* ── Sidebar collapse ─────────────────────────────────────────────── */
  function setCollapsed(on) {
    var nav = document.getElementById('shellSidebarNav');
    if (!nav) return;
    nav.classList.toggle('is-collapsed', on);
    var t = document.getElementById('sidebarToggle');
    if (t) t.setAttribute('aria-label', on ? 'Expand sidebar' : 'Collapse sidebar');
    var arrow = document.getElementById('sidebarArrow');
    if (arrow) arrow.setAttribute('d', on ? 'M11.5 7 14 10l-2.5 3' : 'M13.5 7 11 10l2.5 3');
  }
  function initSidebar() {
    if (NARROW.matches) setCollapsed(true);
    /* The rail minimises itself once the page has settled, cancelled by a
       click on it, which is the one signal that means "I am using this". */
    if (!NARROW.matches && !REDUCED) {
      var timer = setTimeout(function () {
        var nav = document.getElementById('shellSidebarNav');
        if (nav && !nav.classList.contains('is-collapsed')) setCollapsed(true);
      }, 1600);
      var shell = document.getElementById('shellSidebarShell');
      if (shell) shell.addEventListener('click', function () { clearTimeout(timer); }, { once: true });
    }
    document.addEventListener('click', function (e) {
      if (!NARROW.matches || e.target.closest('#shellSidebarShell') ||
          e.target.closest('#accountMenu') || e.target.closest('#deptDropdown')) return;
      setCollapsed(true);
    });
    var toggle = document.getElementById('sidebarToggle');
    if (toggle) toggle.addEventListener('click', function () {
      setCollapsed(!document.getElementById('shellSidebarNav').classList.contains('is-collapsed'));
    });
  }

  /* ── Account menu ─────────────────────────────────────────────────── */
  function initAccountMenu() {
    var trigger = document.getElementById('accountMenuTrigger');
    var menu = document.getElementById('accountMenu');
    if (!trigger || !menu) return;
    function place() {
      var r = trigger.getBoundingClientRect();
      var w = menu.offsetWidth || 200;
      menu.style.left = Math.max(8, Math.min(r.left + r.width / 2 - w / 2, window.innerWidth - w - 8)) + 'px';
      menu.style.bottom = (window.innerHeight - r.top + 8) + 'px';
    }
    function close() {
      menu.classList.remove('is-open');
      menu.setAttribute('aria-hidden', 'true');
      trigger.setAttribute('aria-expanded', 'false');
    }
    function open() {
      place();
      menu.classList.add('is-open');
      menu.setAttribute('aria-hidden', 'false');
      trigger.setAttribute('aria-expanded', 'true');
    }
    trigger.addEventListener('click', function (e) {
      e.stopPropagation();
      if (menu.classList.contains('is-open')) close(); else open();
    });
    menu.addEventListener('click', function (e) {
      if (e.target.closest('.c-account-menu-item')) close();
    });
    document.addEventListener('click', function (e) {
      if (!menu.classList.contains('is-open')) return;
      if (e.target.closest('#accountMenu') || e.target.closest('#accountMenuTrigger')) return;
      close();
    });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
    window.addEventListener('resize', function () { if (menu.classList.contains('is-open')) place(); });
  }

  /* ── Department switcher ──────────────────────────────────────────── */
  function initDeptSwitcher() {
    var trigger = document.querySelector('.js-dept-trigger');
    var panel = document.getElementById('deptDropdown');
    if (!trigger || !panel) return;
    var liveMark = trigger.querySelector('.js-dept-logo-live');
    var staticMark = trigger.querySelector('.js-dept-logo-static');
    var collapsedMark = document.querySelector('.js-dept-logo-collapsed');
    var chevron = trigger.querySelector('.js-dept-chevron');
    function place() {
      var r = trigger.getBoundingClientRect();
      var w = panel.offsetWidth || 240;
      panel.style.left = Math.max(8, Math.min(r.left, window.innerWidth - w - 8)) + 'px';
      panel.style.top = (r.bottom + 8) + 'px';
    }
    function close() {
      panel.hidden = true;
      trigger.setAttribute('aria-expanded', 'false');
      if (chevron) chevron.classList.replace('ph-caret-up', 'ph-caret-down');
    }
    function open() {
      panel.hidden = false;
      place();
      trigger.setAttribute('aria-expanded', 'true');
      if (chevron) chevron.classList.replace('ph-caret-down', 'ph-caret-up');
    }
    trigger.addEventListener('click', function (e) {
      e.stopPropagation();
      if (panel.hidden) open(); else close();
    });
    panel.addEventListener('click', function (e) {
      var opt = e.target.closest('.c-dept-option');
      if (!opt) return;
      var all = panel.querySelectorAll('.c-dept-option');
      for (var i = 0; i < all.length; i++) {
        var on = all[i] === opt;
        all[i].classList.toggle('is-active', on);
        all[i].setAttribute('aria-selected', String(on));
      }
      var logo = opt.dataset.logo;
      if (logo) {
        staticMark.src = logo;
        staticMark.alt = opt.dataset.name || '';
        staticMark.style.display = '';
        liveMark.style.display = 'none';
      } else {
        staticMark.style.display = 'none';
        staticMark.removeAttribute('src');
        liveMark.style.display = '';
      }
      if (collapsedMark && opt.dataset.elementIcon) collapsedMark.src = opt.dataset.elementIcon;
      trigger.setAttribute('aria-label', 'Switch department, ' + (opt.dataset.name || ''));
      close();
    });
    document.addEventListener('click', function (e) {
      if (panel.hidden) return;
      if (e.target.closest('#deptDropdown') || e.target.closest('.js-dept-trigger')) return;
      close();
    });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
    window.addEventListener('resize', function () { if (!panel.hidden) place(); });
  }

  /* ── Collapsed rail hover label ───────────────────────────────────── */
  function initHoverLabel() {
    var label = document.getElementById('shellSidebarHoverLabel');
    if (!label) return;
    function show(item) {
      var nav = item.closest('.c-sidebar');
      var source = item.querySelector('.c-sidebar-hover-text');
      if (!nav || !nav.classList.contains('is-collapsed') || !source) return;
      var icon = item.querySelector('i');
      if (!icon) return;
      var ir = icon.getBoundingClientRect();
      label.textContent = source.textContent;
      label.style.left = (nav.getBoundingClientRect().right + 8) + 'px';
      label.style.top = (ir.top + ir.height / 2) + 'px';
      label.style.transform = 'translateY(-50%)';
      label.classList.add('is-visible');
    }
    function hide() { label.classList.remove('is-visible'); }
    document.addEventListener('mouseover', function (e) {
      var item = e.target.closest('.c-sidebar-item');
      if (item && !item.contains(e.relatedTarget)) show(item);
    });
    document.addEventListener('mouseout', function (e) {
      var item = e.target.closest('.c-sidebar-item');
      if (item && !item.contains(e.relatedTarget)) hide();
    });
    document.addEventListener('focusin', function (e) {
      var item = e.target.closest('.c-sidebar-item');
      if (item) show(item);
    });
    document.addEventListener('focusout', function (e) {
      var item = e.target.closest('.c-sidebar-item');
      if (item) hide();
    });
  }

  /* ── Toast ────────────────────────────────────────────────────────── */
  function toast(tone, title, message) {
    var host = document.getElementById('toasts');
    if (!host) return;
    var el = document.createElement('div');
    el.className = 'c-toast is-entering';
    el.setAttribute('role', 'status');
    el.innerHTML = '<i class="ph-fill ' +
        (tone === 'success' ? 'ph-check-circle' : tone === 'warning' ? 'ph-warning-circle' : 'ph-info') +
        ' tone tone-' + (tone === 'success' ? 'success' : tone === 'warning' ? 'warning' : 'neutral') + '"></i>' +
      '<div class="body"><div class="title">' + esc(title) + '</div>' +
      (message ? '<div class="message">' + esc(message) + '</div>' : '') + '</div>';
    host.appendChild(el);
    requestAnimationFrame(function () { el.classList.remove('is-entering'); });
    setTimeout(function () {
      el.classList.add('is-exiting');
      setTimeout(function () { if (el.parentNode) el.parentNode.removeChild(el); }, REDUCED ? 0 : 240);
    }, 4000);
  }

  /* ── The viewer: account row and "Viewing as" ─────────────────────── */
  function paintAccount(viewer) {
    var A = window.CollabAccess;
    var av = document.querySelector('#accountMenuTrigger .c-search-input-avatar');
    var title = document.querySelector('#accountMenuTrigger .c-search-input-title');
    var sub = document.querySelector('#accountMenuTrigger .c-search-input-subtitle');
    if (av) av.textContent = A.initials(viewer.name);
    if (title) title.textContent = viewer.name;
    if (sub) sub.textContent = A.roleLabel(viewer.role);
  }
  function mountViewingAs(viewer, onChange) {
    var A = window.CollabAccess;
    var host = document.getElementById('viewingAs');
    if (!host) return;
    host.innerHTML = '<span>Viewing as</span><div class="va-seg" role="group" aria-label="Viewing as">' +
      A.VIEWER_ROLES.map(function (r) {
        return '<button type="button" data-role="' + r + '" aria-pressed="' + (r === viewer.role) + '">' +
          esc(A.roleLabel(r)) + '</button>';
      }).join('') + '</div>';
    host.addEventListener('click', function (e) {
      var b = e.target.closest('button[data-role]');
      if (!b) return;
      A.setViewer(localStorage, b.dataset.role);
      var v = A.getViewer(localStorage);
      host.querySelectorAll('button[data-role]').forEach(function (x) {
        x.setAttribute('aria-pressed', String(x.dataset.role === v.role));
      });
      paintAccount(v);
      if (onChange) onChange(v);
    });
  }

  function init(opts) {
    opts = opts || {};
    initSidebar();
    initAccountMenu();
    initDeptSwitcher();
    initHoverLabel();
    var viewer = window.CollabAccess.getViewer(localStorage);
    paintAccount(viewer);
    mountViewingAs(viewer, opts.onViewerChange);
    return viewer;
  }

  window.CollabShell = { init: init, toast: toast, esc: esc, setCollapsed: setCollapsed };
})();
```

- [ ] **Step 3: Commit**

```bash
git add shared/shell.css shared/shell.js
git commit -m "shell: the app shell's styles and behaviour, shared by the new pages"
```

---

### Task 6: The Settings page

**Files:**
- Create: `pages/settings.html`

- [ ] **Step 1: Create `pages/settings.html`**

```html
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title>Collabrium · Settings</title>
<meta name="viewport" content="width=device-width, initial-scale=1" />
<link rel="icon" id="siteFavicon" type="image/svg+xml" href="../collabrium-dls/SVG/coin.svg" />
<script src="assets/favicon.js" defer></script>
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Mulish:wght@400;500;600;700;800;900&family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,600&display=swap" rel="stylesheet" />
<link rel="stylesheet" href="https://unpkg.com/@phosphor-icons/web@2.1.1/src/regular/style.css" />
<link rel="stylesheet" href="https://unpkg.com/@phosphor-icons/web@2.1.1/src/fill/style.css" />
<link rel="stylesheet" href="../collabrium-dls/tokens.css?v=f278e40" />
<link rel="stylesheet" href="../collabrium-dls/components.css?v=f278e40" />
<link rel="stylesheet" href="../shared/shell.css?v=1" />
<style>
  /* The pod's Settings grid: two cards side by side, one column when narrow. */
  .st-grid{display:grid; grid-template-columns:repeat(2, minmax(0, 1fr)); gap:var(--spacing-16);}
  .st-card{padding:var(--spacing-20); gap:var(--spacing-12); min-height:168px;}
  .st-kicker{font-size:var(--text-label3-size); font-weight:700; letter-spacing:var(--tracking-eyebrow);
    text-transform:uppercase; color:var(--color-neutral-5);}
  .st-card p{margin:0; font-size:var(--text-body2-size); color:var(--color-neutral-5); line-height:1.5;}
  .st-email{font-size:var(--text-body1-size); font-weight:700; color:var(--color-neutral-9);}
  .st-line{font-size:var(--text-caption-size); color:var(--color-neutral-5);}
  .st-actions{margin-top:auto; padding-top:var(--spacing-8); display:flex; align-items:center; gap:var(--spacing-12);}
  .st-actions a{text-decoration:none;}
  /* An unavailable card keeps its place so the grid does not shift between roles. */
  .st-card.is-off .c-btn{pointer-events:none; background:var(--color-neutral-2); color:var(--color-neutral-4); border-color:var(--color-neutral-3); box-shadow:none;}
  .st-note{display:inline-flex; align-items:center; gap:var(--spacing-4); font-size:var(--text-caption-size); color:var(--color-neutral-5);}
  .st-note i{font-size:14px;}
  @media (max-width:760px){ .st-grid{grid-template-columns:1fr;} }
</style>
</head>
<body>

<div class="c-shell">
  <div class="c-sidebar-shell" id="shellSidebarShell">
    <nav class="c-sidebar" id="shellSidebarNav">
      <div class="c-sidebar-header">
        <button class="c-dept-trigger js-dept-trigger" type="button" aria-haspopup="listbox"
                aria-expanded="false" aria-label="Switch department" aria-controls="deptDropdown">
          <span class="c-sidebar-logo-live-wrap js-dept-logo-live"><iframe src="../collabrium-dls/logo.html" title="Collabrium" scrolling="no"></iframe></span>
          <img class="c-dept-logo-static js-dept-logo-static" alt="" style="display:none" />
          <i class="ph ph-caret-down js-dept-chevron c-dept-chevron"></i>
        </button>
        <img class="c-sidebar-logo-collapsed js-dept-logo-collapsed" src="../collabrium-dls/SVG/coin.svg" alt="Collabrium" />
      </div>
      <div class="c-sidebar-section">Overview</div>
      <a class="c-sidebar-item" href="landing-v3.html"><i class="ph-fill ph-house"></i><span class="label">Dashboard</span><span class="c-sidebar-hover-text">Dashboard</span></a>
      <a class="c-sidebar-item" href="feedback-v1.html"><i class="ph-fill ph-lightbulb-filament"></i><span class="label">Feedback</span><span class="c-sidebar-hover-text">Feedback</span></a>
      <div class="c-sidebar-footer">
        <button class="c-sidebar-account" type="button" id="accountMenuTrigger"
                aria-haspopup="menu" aria-expanded="false" aria-controls="accountMenu">
          <span class="c-search-input-avatar">BW</span>
          <span class="c-search-input-text">
            <span class="c-search-input-title">Bryan Wong</span>
            <span class="c-search-input-subtitle">Super Admin</span>
          </span>
        </button>
      </div>
    </nav>
    <button class="c-sidebar-toggle" type="button" aria-label="Collapse sidebar" id="sidebarToggle">
      <svg viewBox="0 0 20 20" fill="none">
        <rect x="2.5" y="3.5" width="15" height="13" rx="2" stroke="currentColor" stroke-width="1.4"/>
        <line x1="9" y1="3.5" x2="9" y2="16.5" stroke="currentColor" stroke-width="1.4"/>
        <path id="sidebarArrow" d="M13.5 7 11 10l2.5 3" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>
  </div>

  <div class="c-shell-main">
    <div class="c-shell-content">
      <div class="pg-wrap">
        <header class="pg-head">
          <div>
            <h1>Settings</h1>
            <p class="sub">Your account, and who may sign in.</p>
          </div>
          <div class="pg-head-right">
            <div class="va" id="viewingAs"></div>
          </div>
          <hr class="pg-rule" />
        </header>

        <div class="st-grid">
          <section class="c-card st-card" aria-labelledby="acctK">
            <div class="st-kicker" id="acctK">Account</div>
            <div class="st-email" id="acctEmail"></div>
            <div class="st-line" id="acctLine"></div>
            <div class="st-actions">
              <a class="c-btn c-btn-secondary c-btn-md" href="login-v1.html">Sign out</a>
            </div>
          </section>

          <section class="c-card st-card" id="dirCard" aria-labelledby="dirK">
            <div class="st-kicker" id="dirK">Users &amp; roles</div>
            <p>Who may sign in, which hubs they can open, and what they may do there. Synced from Azure AD.</p>
            <div class="st-actions">
              <a class="c-btn c-btn-secondary c-btn-md" id="dirLink" href="users.html">Open the directory <i class="ph ph-arrow-right"></i></a>
              <span class="st-note" id="dirNote" hidden><i class="ph ph-lock-simple"></i> Admin only</span>
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
</div>

<div class="c-sidebar-hover-label" id="shellSidebarHoverLabel" role="tooltip"></div>

<div class="c-account-menu" id="accountMenu" role="menu" aria-hidden="true">
  <a class="c-account-menu-item" href="settings.html" role="menuitem" aria-current="page"><i class="ph-fill ph-gear"></i><span>Settings</span></a>
  <a class="c-account-menu-item" href="login-v1.html" role="menuitem"><i class="ph-fill ph-sign-out"></i><span>Log out</span></a>
</div>

<div class="c-dept-dropdown" id="deptDropdown" role="listbox" aria-label="Departments" hidden>
  <div class="c-dept-option is-active" role="option" aria-selected="true" aria-label="Collabrium (Default)" data-dept="default" data-name="Collabrium (Default)" data-element-icon="../collabrium-dls/SVG/coin.svg">
    <span class="c-dept-option-logo"><img src="../collabrium-dls/logo-lockups/collabrium-default-logo.svg" alt="" style="--logo-scale:0.6" /></span>
    <i class="ph ph-check c-dept-check"></i>
  </div>
  <div class="c-dept-option" role="option" aria-selected="false" aria-label="Studio" data-dept="studio" data-name="Studio" data-logo="../collabrium-dls/logo-lockups/collabStudio.svg" data-element-icon="../collabrium-dls/SVG/fire.svg">
    <span class="c-dept-option-logo"><img src="../collabrium-dls/logo-lockups/collabStudio.svg" alt="" /></span>
    <i class="ph ph-check c-dept-check"></i>
  </div>
  <div class="c-dept-option" role="option" aria-selected="false" aria-label="Sales" data-dept="sales" data-name="Sales" data-logo="../collabrium-dls/logo-lockups/collabSales.svg" data-element-icon="../collabrium-dls/SVG/gold.svg">
    <span class="c-dept-option-logo"><img src="../collabrium-dls/logo-lockups/collabSales.svg" alt="" /></span>
    <i class="ph ph-check c-dept-check"></i>
  </div>
  <!-- Media is the one department with somewhere to go: Collab:Media is a
       deployed product, so picking it opens that app rather than restyling
       this shell. data-href is what says so; shell.js opens it in a new tab. -->
  <div class="c-dept-option" role="option" aria-selected="false" aria-label="Media" data-dept="media" data-name="Media" data-logo="../collabrium-dls/logo-lockups/collabMedia.svg" data-element-icon="../collabrium-dls/SVG/water.svg" data-href="https://collab-media.vercel.app">
    <span class="c-dept-option-logo"><img src="../collabrium-dls/logo-lockups/collabMedia.svg" alt="" /></span>
    <i class="ph ph-arrow-up-right c-dept-check" aria-hidden="true" style="opacity:1"></i>
  </div>
  <div class="c-dept-option" role="option" aria-selected="false" aria-label="Influencers" data-dept="influencers" data-name="Influencers" data-logo="../collabrium-dls/logo-lockups/collabInfluencers.svg" data-element-icon="../collabrium-dls/SVG/earth.svg">
    <span class="c-dept-option-logo"><img src="../collabrium-dls/logo-lockups/collabInfluencers.svg" alt="" /></span>
    <i class="ph ph-check c-dept-check"></i>
  </div>
  <div class="c-dept-option" role="option" aria-selected="false" aria-label="Content" data-dept="content" data-name="Content" data-logo="../collabrium-dls/logo-lockups/collabContent.svg" data-element-icon="../collabrium-dls/SVG/wood.svg">
    <span class="c-dept-option-logo"><img src="../collabrium-dls/logo-lockups/collabContent.svg" alt="" /></span>
    <i class="ph ph-check c-dept-check"></i>
  </div>
</div>

<div class="c-toast-host" id="toasts"></div>

<script src="../shared/access.js?v=1"></script>
<script src="../shared/shell.js?v=1"></script>
<script>
(function () {
  var A = window.CollabAccess;
  /* The directory is gated on the first item in "Manage user access":
     whoever can invite can open it. Business roles cannot. */
  var GATE = 'Invite / add a user to the workspace';

  function paint(viewer) {
    document.getElementById('acctEmail').textContent = viewer.email;
    document.getElementById('acctLine').textContent = 'Signed in through Astro ID · ' + A.roleLabel(viewer.role);
    var allowed = A.holds(viewer.role, GATE);
    var card = document.getElementById('dirCard');
    var link = document.getElementById('dirLink');
    var note = document.getElementById('dirNote');
    card.classList.toggle('is-off', !allowed);
    link.setAttribute('aria-disabled', String(!allowed));
    link.tabIndex = allowed ? 0 : -1;
    note.hidden = allowed;
  }

  var viewer = window.CollabShell.init({ onViewerChange: paint });
  paint(viewer);
})();
</script>
</body>
</html>
```

- [ ] **Step 2: Verify in the browser**

Start the server from the repo root: use the `mothership-direct` configuration in `.claude/launch.json` (it serves the repo on port 8791), then open `http://localhost:8791/pages/settings.html`.

Check:
- The shell renders with the rail, the department switcher, Dashboard and Feedback links, and the account row reading Bryan Wong, Super Admin.
- The header reads Settings with the subtitle, and the "Viewing as" control on the right shows Super Admin pressed.
- Account card shows `bryan.wong@astro.com.my` and "Signed in through Astro ID · Super Admin".
- Users & roles card shows "Open the directory" enabled.
- Click Admin: the account row's role line becomes Admin, the Account card follows, the directory button stays enabled.
- Click Leadership: the directory button greys out and "Admin only" appears beside it. The card does not move.
- Reload: the choice persists.
- The account row's popover opens above it with Settings and Log out. Escape closes it.
- No console errors (read the console).

- [ ] **Step 3: Commit**

```bash
git add pages/settings.html
git commit -m "settings: Account and Users & roles, gated by the viewer"
```

---

### Task 7: The directory page, list only

**Files:**
- Create: `pages/users.html`

This task builds the page with the toolbar, filters, sorting, pagination and the table, plus the Admin-only state. Task 8 adds the Add and Edit modals. The page is written in full here; Task 8 inserts into marked places.

- [ ] **Step 1: Create `pages/users.html`**

```html
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title>Collabrium · Users &amp; roles</title>
<meta name="viewport" content="width=device-width, initial-scale=1" />
<link rel="icon" id="siteFavicon" type="image/svg+xml" href="../collabrium-dls/SVG/coin.svg" />
<script src="assets/favicon.js" defer></script>
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Mulish:wght@400;500;600;700;800;900&family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,600&display=swap" rel="stylesheet" />
<link rel="stylesheet" href="https://unpkg.com/@phosphor-icons/web@2.1.1/src/regular/style.css" />
<link rel="stylesheet" href="https://unpkg.com/@phosphor-icons/web@2.1.1/src/fill/style.css" />
<link rel="stylesheet" href="../collabrium-dls/tokens.css?v=f278e40" />
<link rel="stylesheet" href="../collabrium-dls/components.css?v=f278e40" />
<link rel="stylesheet" href="../shared/shell.css?v=1" />
<style>
  /* ── Toolbar ─────────────────────────────────────────────────────── */
  .us-bar{display:flex; align-items:center; justify-content:space-between; gap:var(--spacing-12);
    flex-wrap:wrap; margin-bottom:var(--spacing-8);}
  .us-bar-left{display:flex; align-items:center; gap:var(--spacing-8); flex-wrap:wrap;}
  .us-bar-right{display:flex; align-items:center; gap:var(--spacing-12); flex-wrap:wrap;
    font-size:var(--text-caption-size); color:var(--color-neutral-5);}
  .us-search{position:relative;}
  .us-search i{position:absolute; left:12px; top:50%; transform:translateY(-50%);
    color:var(--color-neutral-5); font-size:var(--icon-sm); pointer-events:none;}
  .us-search input{height:36px; width:260px; max-width:100%; padding:0 12px 0 34px;
    border:1px solid var(--color-neutral-3); border-radius:var(--radius-sm);
    font-family:inherit; font-size:var(--text-body2-size); background:var(--color-neutral-1);}
  .us-search input:focus{outline:none; border:2px solid var(--color-obsidian); padding:0 11px 0 33px;}
  .us-sep{width:1px; height:24px; background:var(--color-neutral-3); margin:0 var(--spacing-4);}
  /* A filter chip and its popover. */
  .us-filter{position:relative;}
  .us-filter > button{height:36px; padding:0 var(--spacing-12); border:1px solid var(--color-neutral-3);
    border-radius:var(--radius-pill); background:var(--color-neutral-1); font-family:inherit;
    font-size:var(--text-body2-size); font-weight:600; color:var(--color-neutral-9); cursor:pointer;
    display:inline-flex; align-items:center; gap:var(--spacing-4);}
  .us-filter > button:hover, .us-filter > button[aria-expanded="true"]{background:var(--color-neutral-2);}
  .us-filter > button.is-on{border-color:var(--color-obsidian);}
  .us-filter > button i{font-size:12px; color:var(--color-neutral-5);}
  .us-pop{position:absolute; top:calc(100% + 8px); left:0; z-index:40; min-width:240px;
    background:var(--color-neutral-1); border:1px solid var(--color-neutral-3);
    border-radius:var(--radius-md); box-shadow:var(--shadow-3); padding:var(--spacing-12);}
  .us-pop[hidden]{display:none;}
  .us-pop .h{font-size:var(--text-label3-size); font-weight:700; letter-spacing:var(--tracking-eyebrow);
    text-transform:uppercase; color:var(--color-neutral-5); margin-bottom:var(--spacing-8);}
  .us-pop .row{display:flex; align-items:center; gap:var(--spacing-8); padding:6px 0; cursor:pointer;
    font-size:var(--text-body2-size);}
  .us-pop .foot{display:flex; justify-content:space-between; gap:var(--spacing-8);
    margin-top:var(--spacing-8); padding-top:var(--spacing-8); border-top:1px solid var(--color-neutral-3);}
  .us-note{font-size:var(--text-caption-size); color:var(--color-neutral-5); margin:0 0 var(--spacing-16);}
  .us-count{display:flex; align-items:center; justify-content:space-between; gap:var(--spacing-12);
    flex-wrap:wrap; font-size:var(--text-caption-size); color:var(--color-neutral-5); margin-bottom:var(--spacing-8);}
  .us-count b{color:var(--color-neutral-9);}
  .us-pager{display:flex; align-items:center; gap:var(--spacing-8);}
  .us-pager select{height:28px; border:1px solid var(--color-neutral-3); border-radius:var(--radius-sm);
    font-family:inherit; font-size:var(--text-caption-size); background:var(--color-neutral-1);}
  .us-pager button{width:28px; height:28px; border:1px solid transparent; border-radius:var(--radius-pill);
    background:transparent; font-family:inherit; font-size:var(--text-caption-size); font-weight:700;
    color:var(--color-neutral-9); cursor:pointer; display:inline-flex; align-items:center; justify-content:center;}
  .us-pager button:hover:not(:disabled){background:var(--color-neutral-2);}
  .us-pager button[aria-current="page"]{background:var(--color-obsidian); color:var(--color-neutral-1);}
  .us-pager button:disabled{color:var(--color-neutral-4); cursor:default;}

  /* ── Table ───────────────────────────────────────────────────────── */
  .us-tablewrap{background:var(--color-neutral-1); border:1px solid var(--color-neutral-3);
    border-radius:var(--radius-lg); overflow:auto;}
  .us-table{min-width:960px;}
  .us-table th{background:var(--color-canvas-warm-card); white-space:nowrap; cursor:pointer; user-select:none;}
  .us-table th .arr{font-size:10px; margin-left:4px; color:var(--color-neutral-4);}
  .us-table th.is-sorted .arr{color:var(--color-neutral-9);}
  .us-table th:first-child, .us-table td:first-child{padding-left:var(--spacing-16);}
  .us-table tbody tr{cursor:default;}
  .us-table td{vertical-align:top;}
  .us-name{font-weight:600; color:var(--color-neutral-9); display:flex; align-items:center; gap:var(--spacing-8);}
  .us-sub{font-size:var(--text-caption-size); color:var(--color-neutral-5); margin-top:2px;}
  .us-sub.warn{color:var(--color-neutral-5); font-style:italic;}
  .us-hubs{display:flex; gap:4px; flex-wrap:wrap;}
  .us-ext{color:var(--color-neutral-5);}
  tr.is-off td{opacity:.55;}
  .us-edit{width:32px; height:32px; border:none; background:transparent; border-radius:var(--radius-sm);
    color:var(--color-neutral-5); cursor:pointer; display:inline-flex; align-items:center; justify-content:center;}
  .us-edit:hover{background:var(--color-neutral-2); color:var(--color-neutral-9);}
  .us-empty{padding:var(--spacing-40);}

  /* ── Admin-only state ────────────────────────────────────────────── */
  .us-denied{max-width:420px; margin:var(--spacing-60) auto;}
  .us-denied a{text-decoration:none;}

  /* ── Modals (Task 8 fills these) ─────────────────────────────────── */
  .us-overlay{position:fixed; inset:0; z-index:80; background:rgba(20,20,20,.38);
    display:none; align-items:flex-start; justify-content:center; padding:var(--spacing-40) var(--spacing-16); overflow:auto;}
  .us-overlay.is-open{display:flex;}
  .us-modal{max-width:480px;}
  .us-modal .c-modal-head{align-items:flex-start; padding-bottom:var(--spacing-12); border-bottom:1px solid var(--color-neutral-3);}
  .us-modal .c-modal-head .sub{margin:2px 0 0; font-size:var(--text-body2-size); color:var(--color-neutral-5); font-weight:400;}
  .us-modal .c-modal-body{padding-top:var(--spacing-16); display:flex; flex-direction:column; gap:var(--spacing-16);}
  .us-modal .c-modal-foot{align-items:center;}
  .us-x{border:none; background:transparent; width:32px; height:32px; border-radius:var(--radius-sm);
    cursor:pointer; color:var(--color-neutral-5); display:inline-flex; align-items:center; justify-content:center;}
  .us-x:hover{background:var(--color-neutral-2); color:var(--color-neutral-9);}
  .us-f{display:flex; flex-direction:column; gap:var(--spacing-4);}
  .us-f > label, .us-f > .lab{font-size:var(--text-label1-size); font-weight:700;}
  .us-f input[type="text"], .us-f select{height:40px; border:1px solid var(--color-neutral-3); border-radius:var(--radius-sm);
    padding:0 var(--spacing-12); font-family:inherit; font-size:var(--text-body2-size); background:var(--color-neutral-1); width:100%;}
  .us-f input[type="text"]:focus, .us-f select:focus{outline:none; border:2px solid var(--color-obsidian); padding:0 11px;}
  .us-f .help{font-size:var(--text-caption-size); color:var(--color-neutral-5); line-height:1.4;}
  .us-f .ro{height:40px; display:flex; align-items:center; padding:0 var(--spacing-12);
    border:1px solid var(--color-neutral-3); border-radius:var(--radius-sm); background:var(--color-neutral-2);
    font-size:var(--text-body2-size); color:var(--color-neutral-9);}
  .us-hubgrid{display:flex; flex-direction:column; gap:var(--spacing-8);}
  .us-desc{border:1px solid var(--color-neutral-3); border-radius:var(--radius-md); padding:var(--spacing-12);
    font-size:var(--text-caption-size); color:var(--color-neutral-5); line-height:1.5; display:flex; flex-direction:column; gap:4px;}
  .us-desc b{color:var(--color-neutral-9);}
  .us-ad{background:var(--color-neutral-2); border-radius:var(--radius-md); padding:var(--spacing-12);
    font-size:var(--text-caption-size); display:grid; grid-template-columns:auto 1fr; gap:4px var(--spacing-16);}
  .us-ad .k{color:var(--color-neutral-5);}
  .us-ad .note{grid-column:1 / -1; color:var(--color-neutral-5); margin-top:4px;}
  .us-guard{display:flex; align-items:flex-start; gap:var(--spacing-8); font-size:var(--text-caption-size);
    color:var(--color-red); line-height:1.4;}
  .us-guard[hidden]{display:none;}
  .us-guard i{flex:none; font-size:14px; margin-top:1px;}
  .us-cands{border:1px solid var(--color-neutral-3); border-radius:var(--radius-sm); overflow:hidden; max-height:220px; overflow-y:auto;}
  .us-cands[hidden]{display:none;}
  .us-cand{display:block; width:100%; text-align:left; border:none; background:transparent; padding:8px 12px;
    font-family:inherit; font-size:var(--text-body2-size); cursor:pointer;}
  .us-cand:hover{background:var(--color-neutral-2);}
  .us-cand .us-sub{margin:0;}
  .us-picked{display:flex; align-items:center; gap:var(--spacing-12); padding:8px 12px;
    border:1px solid var(--color-obsidian); border-radius:var(--radius-sm);}
  .us-picked .us-x{margin-left:auto;}
  .us-remove{margin-right:auto; border:none; background:transparent; font-family:inherit; font-size:var(--text-caption-size);
    font-weight:700; color:var(--color-red); cursor:pointer; padding:0;}
  .us-confirm{margin-right:auto; display:flex; align-items:center; gap:var(--spacing-8); font-size:var(--text-caption-size); flex-wrap:wrap;}
  .us-confirm[hidden]{display:none;}
  .us-btn-danger{background:var(--color-red); color:var(--color-neutral-1);}
  .us-btn-danger:hover{background:#d8232f;}

  @media (max-width:760px){
    .us-search input{width:100%;}
    .us-bar-left{width:100%;}
  }
</style>
</head>
<body>

<div class="c-shell">
  <div class="c-sidebar-shell" id="shellSidebarShell">
    <nav class="c-sidebar" id="shellSidebarNav">
      <div class="c-sidebar-header">
        <button class="c-dept-trigger js-dept-trigger" type="button" aria-haspopup="listbox"
                aria-expanded="false" aria-label="Switch department" aria-controls="deptDropdown">
          <span class="c-sidebar-logo-live-wrap js-dept-logo-live"><iframe src="../collabrium-dls/logo.html" title="Collabrium" scrolling="no"></iframe></span>
          <img class="c-dept-logo-static js-dept-logo-static" alt="" style="display:none" />
          <i class="ph ph-caret-down js-dept-chevron c-dept-chevron"></i>
        </button>
        <img class="c-sidebar-logo-collapsed js-dept-logo-collapsed" src="../collabrium-dls/SVG/coin.svg" alt="Collabrium" />
      </div>
      <div class="c-sidebar-section">Overview</div>
      <a class="c-sidebar-item" href="landing-v3.html"><i class="ph-fill ph-house"></i><span class="label">Dashboard</span><span class="c-sidebar-hover-text">Dashboard</span></a>
      <a class="c-sidebar-item" href="feedback-v1.html"><i class="ph-fill ph-lightbulb-filament"></i><span class="label">Feedback</span><span class="c-sidebar-hover-text">Feedback</span></a>
      <div class="c-sidebar-footer">
        <button class="c-sidebar-account" type="button" id="accountMenuTrigger"
                aria-haspopup="menu" aria-expanded="false" aria-controls="accountMenu">
          <span class="c-search-input-avatar">BW</span>
          <span class="c-search-input-text">
            <span class="c-search-input-title">Bryan Wong</span>
            <span class="c-search-input-subtitle">Super Admin</span>
          </span>
        </button>
      </div>
    </nav>
    <button class="c-sidebar-toggle" type="button" aria-label="Collapse sidebar" id="sidebarToggle">
      <svg viewBox="0 0 20 20" fill="none">
        <rect x="2.5" y="3.5" width="15" height="13" rx="2" stroke="currentColor" stroke-width="1.4"/>
        <line x1="9" y1="3.5" x2="9" y2="16.5" stroke="currentColor" stroke-width="1.4"/>
        <path id="sidebarArrow" d="M13.5 7 11 10l2.5 3" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>
  </div>

  <div class="c-shell-main">
    <div class="c-shell-content">
      <div class="pg-wrap">
        <header class="pg-head">
          <div>
            <h1>Users &amp; roles</h1>
            <p class="sub">Who may sign in, which hubs they can open, and what they may do there.</p>
          </div>
          <div class="pg-head-right">
            <div class="va" id="viewingAs"></div>
            <button class="c-btn c-btn-primary c-btn-md" type="button" id="newUser">New user</button>
          </div>
          <hr class="pg-rule" />
        </header>

        <div id="content"></div>
      </div>
    </div>
  </div>
</div>

<div class="c-sidebar-hover-label" id="shellSidebarHoverLabel" role="tooltip"></div>

<div class="c-account-menu" id="accountMenu" role="menu" aria-hidden="true">
  <a class="c-account-menu-item" href="settings.html" role="menuitem"><i class="ph-fill ph-gear"></i><span>Settings</span></a>
  <a class="c-account-menu-item" href="login-v1.html" role="menuitem"><i class="ph-fill ph-sign-out"></i><span>Log out</span></a>
</div>

<div class="c-dept-dropdown" id="deptDropdown" role="listbox" aria-label="Departments" hidden>
  <div class="c-dept-option is-active" role="option" aria-selected="true" aria-label="Collabrium (Default)" data-dept="default" data-name="Collabrium (Default)" data-element-icon="../collabrium-dls/SVG/coin.svg">
    <span class="c-dept-option-logo"><img src="../collabrium-dls/logo-lockups/collabrium-default-logo.svg" alt="" style="--logo-scale:0.6" /></span>
    <i class="ph ph-check c-dept-check"></i>
  </div>
  <div class="c-dept-option" role="option" aria-selected="false" aria-label="Studio" data-dept="studio" data-name="Studio" data-logo="../collabrium-dls/logo-lockups/collabStudio.svg" data-element-icon="../collabrium-dls/SVG/fire.svg">
    <span class="c-dept-option-logo"><img src="../collabrium-dls/logo-lockups/collabStudio.svg" alt="" /></span>
    <i class="ph ph-check c-dept-check"></i>
  </div>
  <div class="c-dept-option" role="option" aria-selected="false" aria-label="Sales" data-dept="sales" data-name="Sales" data-logo="../collabrium-dls/logo-lockups/collabSales.svg" data-element-icon="../collabrium-dls/SVG/gold.svg">
    <span class="c-dept-option-logo"><img src="../collabrium-dls/logo-lockups/collabSales.svg" alt="" /></span>
    <i class="ph ph-check c-dept-check"></i>
  </div>
  <!-- Media is the one department with somewhere to go: Collab:Media is a
       deployed product, so picking it opens that app rather than restyling
       this shell. data-href is what says so; shell.js opens it in a new tab. -->
  <div class="c-dept-option" role="option" aria-selected="false" aria-label="Media" data-dept="media" data-name="Media" data-logo="../collabrium-dls/logo-lockups/collabMedia.svg" data-element-icon="../collabrium-dls/SVG/water.svg" data-href="https://collab-media.vercel.app">
    <span class="c-dept-option-logo"><img src="../collabrium-dls/logo-lockups/collabMedia.svg" alt="" /></span>
    <i class="ph ph-arrow-up-right c-dept-check" aria-hidden="true" style="opacity:1"></i>
  </div>
  <div class="c-dept-option" role="option" aria-selected="false" aria-label="Influencers" data-dept="influencers" data-name="Influencers" data-logo="../collabrium-dls/logo-lockups/collabInfluencers.svg" data-element-icon="../collabrium-dls/SVG/earth.svg">
    <span class="c-dept-option-logo"><img src="../collabrium-dls/logo-lockups/collabInfluencers.svg" alt="" /></span>
    <i class="ph ph-check c-dept-check"></i>
  </div>
  <div class="c-dept-option" role="option" aria-selected="false" aria-label="Content" data-dept="content" data-name="Content" data-logo="../collabrium-dls/logo-lockups/collabContent.svg" data-element-icon="../collabrium-dls/SVG/wood.svg">
    <span class="c-dept-option-logo"><img src="../collabrium-dls/logo-lockups/collabContent.svg" alt="" /></span>
    <i class="ph ph-check c-dept-check"></i>
  </div>
</div>

<div class="us-overlay" id="overlay" role="presentation">
  <div class="c-modal us-modal" id="modal" role="dialog" aria-modal="true" aria-labelledby="modalTitle"></div>
</div>

<div class="c-toast-host" id="toasts"></div>

<script src="../shared/access.js?v=1"></script>
<script src="../shared/shell.js?v=1"></script>
<script>
(function () {
  var A = window.CollabAccess, Sh = window.CollabShell, esc = Sh.esc;
  var S = localStorage;
  var GATE = 'Invite / add a user to the workspace';
  var EDIT_GATE = 'Deactivate or remove a user';

  var viewer, store, seedAll;
  var state = { q: '', role: [], hub: [], st: [], sort: { key: 'name', dir: 1 }, page: 1, rows: 50 };

  /* ── Boot: the org chart, then the store, then the page ───────────── */
  fetch('../data/org-tree.json').then(function (r) { return r.json(); }).then(function (tree) {
    seedAll = A.buildSeed(tree);
    store = A.createStore({ seed: seedAll, storage: S });
    viewer = Sh.init({ onViewerChange: function (v) { viewer = v; state.page = 1; render(); } });
    document.getElementById('newUser').addEventListener('click', function () { openAdd(); });
    render();
  }).catch(function (e) {
    document.getElementById('content').innerHTML =
      '<div class="c-empty"><i class="ph ph-warning-circle"></i><h4>The org chart did not load</h4><p>' + esc(String(e)) + '</p></div>';
  });

  /* ── Formatting ───────────────────────────────────────────────────── */
  var MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
  function fmtWhen(iso) {
    if (!iso) return 'Never';
    var d = new Date(iso);
    return d.getDate() + ' ' + MON[d.getMonth()] + ', ' +
      String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0');
  }
  function stateOf(r) { return r.access === 'inactive' ? 'inactive' : r.lastSignIn ? 'active' : 'never'; }

  /* ── Filtering and sorting ────────────────────────────────────────── */
  function visible(all) {
    var byId = {};
    all.forEach(function (r) { byId[r.id] = r; });
    var q = state.q.trim().toLowerCase();
    var out = all.filter(function (r) {
      if (state.role.length && state.role.indexOf(r.role) === -1) return false;
      if (state.hub.length && !state.hub.some(function (h) { return r.hubs.indexOf(h) !== -1; })) return false;
      if (state.st.length && state.st.indexOf(stateOf(r)) === -1) return false;
      if (!q) return true;
      var hay = [r.name, r.email, A.roleLabel(r.role), r.influencerRole ? A.influencerRoleLabel(r.influencerRole) : ''].join(' ').toLowerCase();
      return hay.indexOf(q) !== -1;
    });
    var k = state.sort.key, d = state.sort.dir;
    function val(r) {
      switch (k) {
        case 'hubs': return r.hubs.map(A.hubShort).join(', ');
        case 'role': return A.roleLabel(r.role);
        case 'scope': return A.scopeWord(r.role);
        case 'reportsTo': return r.reportsTo && byId[r.reportsTo] ? byId[r.reportsTo].name : (r.reportsToEmail || '');
        case 'team': return r.teamDirect;
        case 'lastSignIn': return r.lastSignIn || '';
        default: return r.name;
      }
    }
    out.sort(function (a, b) {
      var x = val(a), y = val(b);
      var c = typeof x === 'number' ? x - y : String(x).localeCompare(String(y));
      return c ? c * d : a.name.localeCompare(b.name);
    });
    return { rows: out, byId: byId };
  }

  /* ── Render ───────────────────────────────────────────────────────── */
  var COLS = [
    { key: 'name', label: 'Person' }, { key: 'hubs', label: 'Hubs' }, { key: 'role', label: 'Role' },
    { key: 'scope', label: 'Can see' }, { key: 'reportsTo', label: 'Reports to' },
    { key: 'team', label: 'Team' }, { key: 'lastSignIn', label: 'Last sign-in' }
  ];

  function render() {
    var content = document.getElementById('content');
    var mayOpen = A.holds(viewer.role, GATE);
    var mayEdit = A.holds(viewer.role, EDIT_GATE);
    document.getElementById('newUser').hidden = !mayOpen;
    if (!mayOpen) {
      content.innerHTML =
        '<div class="c-empty us-denied"><i class="ph ph-lock-simple"></i><h4>Admin only</h4>' +
        '<p>' + esc(A.DENIED) + '</p>' +
        '<a class="c-btn c-btn-secondary c-btn-md" href="settings.html">Back to Settings</a></div>';
      return;
    }
    var all = store.list();
    var v = visible(all), rows = v.rows, byId = v.byId;
    var never = all.filter(function (r) { return stateOf(r) === 'never'; }).length;
    var total = rows.length, pages = Math.max(1, Math.ceil(total / state.rows));
    if (state.page > pages) state.page = pages;
    var from = (state.page - 1) * state.rows, page = rows.slice(from, from + state.rows);
    var synced = store.syncedAt();

    var h = '';
    h += '<div class="us-bar"><div class="us-bar-left">' +
      '<div class="us-search"><i class="ph ph-magnifying-glass"></i>' +
      '<input type="text" id="q" placeholder="Search name, address, role…" value="' + esc(state.q) + '" aria-label="Search" /></div>' +
      '<span class="us-sep"></span>' +
      filterChip('role', 'Role', A.ROLES.map(function (r) { return { key: r.key, label: r.label }; })) +
      filterChip('hub', 'Hub', A.HUBS.map(function (x) { return { key: x.key, label: x.label }; })) +
      filterChip('st', 'State', [{ key: 'active', label: 'Active' }, { key: 'inactive', label: 'Deactivated' }, { key: 'never', label: 'Never signed in' }]) +
      '</div><div class="us-bar-right">' +
      '<span>' + (synced ? 'Synced ' + esc(fmtWhen(synced)) : 'Not yet synced') + '</span>' +
      '<button class="c-btn c-btn-secondary c-btn-sm" type="button" id="sync">Sync from Azure AD</button>' +
      '</div></div>';
    h += '<p class="us-note">' + never + ' of ' + all.length + ' have never signed in. Until they do, nothing has confirmed the address we hold is one they can use.</p>';
    h += '<div class="us-count"><span>Showing <b>' + (total ? from + 1 : 0) + '–' + Math.min(from + state.rows, total) + '</b> of <b>' + total + '</b> items</span>' +
      '<div class="us-pager"><span>Rows</span><select id="rows" aria-label="Rows per page">' +
      [25, 50, 100, 250].map(function (n) { return '<option value="' + n + '"' + (n === state.rows ? ' selected' : '') + '>' + n + '</option>'; }).join('') +
      '</select>' + pager(pages) + '</div></div>';

    h += '<div class="us-tablewrap"><table class="c-table us-table"><thead><tr>' +
      COLS.map(function (c) {
        var on = state.sort.key === c.key;
        return '<th data-sort="' + c.key + '" class="' + (on ? 'is-sorted' : '') + '" aria-sort="' + (on ? (state.sort.dir > 0 ? 'ascending' : 'descending') : 'none') + '">' +
          esc(c.label) + '<span class="arr">' + (on ? (state.sort.dir > 0 ? '↑' : '↓') : '↕') + '</span></th>';
      }).join('') + '<th aria-label="Edit"></th></tr></thead><tbody>';
    if (!page.length) {
      h += '<tr><td colspan="8"><div class="c-empty us-empty"><i class="ph ph-users"></i><h4>No one matches</h4><p>Clear a filter or change the search.</p></div></td></tr>';
    }
    page.forEach(function (r) {
      var mgr = r.reportsTo && byId[r.reportsTo] ? byId[r.reportsTo] : null;
      h += '<tr class="' + (r.access === 'inactive' ? 'is-off' : '') + '" data-id="' + esc(r.id) + '">' +
        '<td><div class="us-name">' + esc(r.name) + (r.access === 'inactive' ? ' <span class="c-badge c-badge-neutral">Deactivated</span>' : '') + '</div><div class="us-sub">' + esc(r.email) + '</div></td>' +
        '<td><div class="us-hubs">' + r.hubs.map(function (k) { return '<span class="c-badge c-badge-neutral">' + esc(A.hubShort(k)) + '</span>'; }).join('') + '</div></td>' +
        '<td>' + esc(A.roleLabel(r.role)) + (r.influencerRole ? '<div class="us-sub">Influencer: ' + esc(A.influencerRoleLabel(r.influencerRole)) + '</div>' : '') + '</td>' +
        '<td>' + esc(A.scopeWord(r.role)) + '</td>' +
        '<td>' + (mgr ? esc(mgr.name) + '<div class="us-sub">' + esc(mgr.email) + '</div>'
                      : r.reportsToEmail ? '<span class="us-ext">' + esc(r.reportsToEmail) + '</span><div class="us-sub warn">Not a Collabrium user — grants no access</div>'
                      : '<span class="us-ext">—</span>') + '</td>' +
        '<td class="num">' + (r.teamDirect ? r.teamDirect : '—') + '</td>' +
        '<td><span class="us-sub" style="margin:0">' + esc(fmtWhen(r.lastSignIn)) + '</span></td>' +
        '<td>' + (mayEdit ? '<button class="us-edit" type="button" data-edit="' + esc(r.id) + '" aria-label="Edit ' + esc(r.name) + '"><i class="ph ph-pencil-simple"></i></button>' : '') + '</td>' +
        '</tr>';
    });
    h += '</tbody></table></div>';
    content.innerHTML = h;
    wire(byId);
  }

  function filterChip(key, label, options) {
    var on = state[key].length;
    return '<div class="us-filter" data-filter="' + key + '">' +
      '<button type="button" class="' + (on ? 'is-on' : '') + '" aria-expanded="false" aria-haspopup="true">' + esc(label) + (on ? ' · ' + on : '') + ' <i class="ph ph-caret-down"></i></button>' +
      '<div class="us-pop" hidden><div class="h">' + esc(label) + '</div>' +
      options.map(function (o) {
        var c = state[key].indexOf(o.key) !== -1;
        return '<label class="row"><span class="c-checkbox-box' + (c ? ' on' : '') + '">' + (c ? '<i class="ph-bold ph-check" style="font-size:12px"></i>' : '') + '</span>' +
          '<input type="checkbox" value="' + esc(o.key) + '"' + (c ? ' checked' : '') + ' style="position:absolute;opacity:0;width:0;height:0" />' + esc(o.label) + '</label>';
      }).join('') +
      '<div class="foot"><button class="c-btn c-btn-ghost c-btn-sm" type="button" data-clear>Clear</button><button class="c-btn c-btn-primary c-btn-sm" type="button" data-done>Done</button></div>' +
      '</div></div>';
  }

  function pager(pages) {
    var h = '<button type="button" data-page="' + (state.page - 1) + '" aria-label="Previous page"' + (state.page <= 1 ? ' disabled' : '') + '><i class="ph ph-caret-left"></i></button>';
    for (var p = 1; p <= pages; p++) {
      if (pages > 7 && Math.abs(p - state.page) > 2 && p !== 1 && p !== pages) {
        if (p === 2 || p === pages - 1) h += '<span>…</span>';
        continue;
      }
      h += '<button type="button" data-page="' + p + '"' + (p === state.page ? ' aria-current="page"' : '') + '>' + p + '</button>';
    }
    h += '<button type="button" data-page="' + (state.page + 1) + '" aria-label="Next page"' + (state.page >= pages ? ' disabled' : '') + '><i class="ph ph-caret-right"></i></button>';
    return h;
  }

  /* ── Wiring, after every render ───────────────────────────────────── */
  function wire(byId) {
    var q = document.getElementById('q');
    q.addEventListener('input', function () {
      state.q = q.value; state.page = 1;
      var pos = q.selectionStart;
      render();
      var nq = document.getElementById('q'); nq.focus(); nq.setSelectionRange(pos, pos);
    });
    document.getElementById('rows').addEventListener('change', function (e) {
      state.rows = Number(e.target.value); state.page = 1; render();
    });
    document.querySelectorAll('.us-pager button[data-page]').forEach(function (b) {
      b.addEventListener('click', function () { state.page = Number(b.dataset.page); render(); });
    });
    document.querySelectorAll('.us-table th[data-sort]').forEach(function (th) {
      th.addEventListener('click', function () {
        var k = th.dataset.sort;
        if (state.sort.key === k) state.sort.dir = -state.sort.dir; else state.sort = { key: k, dir: 1 };
        render();
      });
    });
    document.querySelectorAll('.us-filter').forEach(function (f) {
      var key = f.dataset.filter, btn = f.querySelector(':scope > button'), pop = f.querySelector('.us-pop');
      var draft = state[key].slice();
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        var open = pop.hidden;
        closePops();
        if (open) { pop.hidden = false; btn.setAttribute('aria-expanded', 'true'); }
      });
      pop.addEventListener('change', function (e) {
        var cb = e.target;
        if (cb.type !== 'checkbox') return;
        var i = draft.indexOf(cb.value);
        if (cb.checked && i === -1) draft.push(cb.value);
        if (!cb.checked && i !== -1) draft.splice(i, 1);
        var box = cb.previousElementSibling;
        box.classList.toggle('on', cb.checked);
        box.innerHTML = cb.checked ? '<i class="ph-bold ph-check" style="font-size:12px"></i>' : '';
      });
      pop.querySelector('[data-clear]').addEventListener('click', function () { state[key] = []; state.page = 1; render(); });
      pop.querySelector('[data-done]').addEventListener('click', function () { state[key] = draft.slice(); state.page = 1; render(); });
    });
    document.getElementById('sync').addEventListener('click', function () {
      store.stampSync();
      render();
      Sh.toast('success', 'Synced from Azure AD', 'The directory is up to date.');
    });
    document.querySelectorAll('[data-edit]').forEach(function (b) {
      b.addEventListener('click', function () { openEdit(b.dataset.edit); });
    });
  }
  function closePops() {
    document.querySelectorAll('.us-pop').forEach(function (p) { p.hidden = true; });
    document.querySelectorAll('.us-filter > button').forEach(function (b) { b.setAttribute('aria-expanded', 'false'); });
  }
  document.addEventListener('click', function (e) { if (!e.target.closest('.us-filter')) closePops(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { closePops(); closeModal(); } });

  /* ── Modals: Task 8 ───────────────────────────────────────────────── */
  function openAdd() {}
  function openEdit(id) {}
  function closeModal() {}

  /* MODALS-END */
})();
</script>
</body>
</html>
```

- [ ] **Step 2: Verify in the browser**

Open `http://localhost:8791/pages/users.html` (server as in Task 6).

Check as Super Admin:
- The table lists the seed, Bryan Wong included, sorted by name, 50 rows, pager showing 2 pages.
- Hubs column shows a Sales badge on every row; Role shows the derived roles; Can see shows the scope word; Reports to shows names with emails, and VPs report to Bryan Wong; Team shows counts on managers and a dash on reps; Last sign-in shows Never except Bryan and the VPs.
- Search "ahmad" narrows the list. The input keeps focus and caret while typing.
- Role filter: tick Head of Sales, Done. The chip reads "Role · 1" and the list narrows. Clear resets.
- State filter: Never signed in narrows to everyone but Bryan and the VPs.
- Click a header to sort, again to reverse. Team sorts numerically.
- Rows 25 shows 3 pages; page buttons move.
- Sync from Azure AD stamps the time in the toolbar and shows a toast.
- Switch to Admin: everything still shows, edit pencils still show.
- Switch to Leadership: the New user button disappears and the content becomes the Admin-only state with a link back to Settings.
- Console: no errors.

- [ ] **Step 3: Commit**

```bash
git add pages/users.html
git commit -m "users: the directory list, filters, sort, pager and the Admin-only state"
```

---

### Task 8: Add and Edit modals

**Files:**
- Modify: `pages/users.html` (replace the three stub functions between `/* ── Modals: Task 8 ── */` and `/* MODALS-END */`)

- [ ] **Step 1: Replace the modal stubs**

In `pages/users.html`, replace these three lines:

```js
  function openAdd() {}
  function openEdit(id) {}
  function closeModal() {}
```

with:

```js
  var overlay = document.getElementById('overlay');
  var modal = document.getElementById('modal');
  var form = null;   // { mode:'add'|'edit', before, next, picked }

  function closeModal() {
    overlay.classList.remove('is-open');
    modal.innerHTML = '';
    form = null;
  }
  overlay.addEventListener('click', function (e) { if (e.target === overlay) closeModal(); });

  function blank() {
    return { id: '', name: '', email: '', networkId: '', role: A.DEFAULT_ROLE, hubs: ['sales'],
             influencerRole: null, reportsTo: null, reportsToEmail: null, access: 'active', lastSignIn: null };
  }
  function openAdd() {
    form = { mode: 'add', before: null, next: blank(), picked: null };
    paintModal();
    overlay.classList.add('is-open');
    var p = document.getElementById('person');
    if (p) p.focus();
  }
  function openEdit(id) {
    var rec = store.get(id);
    if (!rec) return;
    form = { mode: 'edit', before: rec, next: JSON.parse(JSON.stringify(rec)), picked: rec };
    paintModal();
    overlay.classList.add('is-open');
  }

  /* One paint per change. The inputs are rebuilt, so focus is restored to
     whichever control was active by id. */
  function paintModal() {
    var f = form, n = f.next, isAdd = f.mode === 'add';
    var mayRole = A.holds(viewer.role, "Assign or change a user's role");
    var hasInfl = n.hubs.indexOf('influencer') !== -1;
    var all = store.list();
    var byId = {};
    all.forEach(function (r) { byId[r.id] = r; });
    var guard = isAdd && !f.picked ? null : A.check(viewer, f.before, n, all);
    var dirty = isAdd ? !!f.picked : JSON.stringify(strip(n)) !== JSON.stringify(strip(f.before));
    var canSave = dirty && !guard;

    var h = '<div class="c-modal-head"><div><h4 id="modalTitle">' + (isAdd ? 'Add a user' : esc(n.name)) + '</h4>' +
      '<p class="sub">' + (isAdd ? 'Search Azure AD, then give them a role.' : esc(n.email)) + '</p></div>' +
      '<button class="us-x" type="button" data-close aria-label="Close"><i class="ph ph-x"></i></button></div>';
    h += '<div class="c-modal-body">';

    if (isAdd) {
      h += '<div class="us-f"><label for="person">Person</label>';
      if (f.picked) {
        h += '<div class="us-picked"><span class="c-search-input-avatar">' + esc(A.initials(f.picked.name)) + '</span>' +
          '<span><div>' + esc(f.picked.name) + '</div><div class="us-sub">' + esc(f.picked.email) + '</div></span>' +
          '<button class="us-x" type="button" data-unpick aria-label="Choose someone else"><i class="ph ph-x"></i></button></div>';
      } else {
        h += '<input type="text" id="person" placeholder="e.g. bryan, or bryan.wong@astro.com.my" autocomplete="off" value="' + esc(f.q || '') + '" />' +
          '<div class="us-cands" id="cands" hidden></div>';
      }
      h += '<div class="help">Search the company directory by name or address. Only Astro staff appear — a guest account cannot sign in.</div></div>';
    }

    h += '<div class="us-f"><div class="lab">Hubs</div><div class="us-hubgrid">' +
      A.HUBS.map(function (x) {
        var on = n.hubs.indexOf(x.key) !== -1, last = on && n.hubs.length === 1;
        return '<label class="c-choice' + (last ? ' disabled' : '') + '"><span class="c-checkbox-box' + (on ? ' on' : '') + '">' + (on ? '<i class="ph-bold ph-check" style="font-size:12px"></i>' : '') + '</span>' +
          '<input type="checkbox" data-hub="' + x.key + '"' + (on ? ' checked' : '') + (last ? ' disabled' : '') + ' />' +
          '<span class="text"><span class="label">' + esc(x.label) + '</span>' + (last ? '<span class="desc">The last hub stays. Deactivate them instead.</span>' : '') + '</span></label>';
      }).join('') + '</div><div class="help">Which hubs they can open. The switcher only ever offers what is ticked here.</div></div>';

    h += '<div class="us-f"><label for="role">Role</label>' +
      (mayRole
        ? '<select id="role">' + A.ROLES.map(function (r) { return '<option value="' + r.key + '"' + (r.key === n.role ? ' selected' : '') + '>' + esc(r.label) + '</option>'; }).join('') + '</select>' +
          '<div class="help">Decides what they can see and edit. Change it any time.</div>'
        : '<div class="ro">' + esc(A.roleLabel(n.role)) + '</div><div class="help">' + esc(A.ROLE_IS_SUPER) + '</div>') +
      '</div>';

    if (hasInfl) {
      h += '<div class="us-f"><label for="irole">Influencer role</label>' +
        (mayRole
          ? '<select id="irole">' + A.INFLUENCER_ROLES.map(function (r) { return '<option value="' + r.key + '"' + (r.key === n.influencerRole ? ' selected' : '') + '>' + esc(r.label) + '</option>'; }).join('') + '</select>' +
            '<div class="help">Collab: Influencer runs its own role set.</div>'
          : '<div class="ro">' + esc(A.influencerRoleLabel(n.influencerRole)) + '</div><div class="help">' + esc(A.ROLE_IS_SUPER) + '</div>') +
        '</div>';
    }

    h += '<div class="us-desc">' + A.describe(n).map(function (line, i) {
      return '<div>' + (i === 0 ? line.replace(/^Sees ([^.]+)\./, 'Sees <b>$1</b>.') : esc(line)) + '</div>';
    }).join('') + '</div>';

    if (!isAdd) {
      h += '<div class="us-f"><label for="access">Access</label><select id="access">' +
        '<option value="active"' + (n.access === 'active' ? ' selected' : '') + '>Active</option>' +
        '<option value="inactive"' + (n.access === 'inactive' ? ' selected' : '') + '>Deactivated</option></select>' +
        '<div class="help">Deactivating keeps their place in the reporting tree; they simply cannot sign in.</div></div>';
      var mgr = n.reportsTo && byId[n.reportsTo] ? byId[n.reportsTo].name : (n.reportsToEmail || '—');
      h += '<div class="us-ad"><span class="k">Reports to</span><span>' + esc(mgr) + '</span>' +
        '<span class="k">Network ID</span><span>' + esc(n.networkId) + '</span>' +
        '<span class="k">Team</span><span>' + n.teamDirect + ' direct, ' + n.teamTotal + ' in total</span>' +
        '<span class="note">From Azure AD. Fix a wrong reporting line there — it is not editable here.</span></div>';
    } else {
      h += '<div class="help">Their reporting line comes from Azure AD and appears after the next sync — it is not set here.</div>';
    }

    h += '<div class="us-guard" id="guard"' + (guard ? '' : ' hidden') + '><i class="ph-fill ph-warning-circle"></i><span>' + esc(guard || '') + '</span></div>';
    h += '</div>';

    h += '<div class="c-modal-foot">';
    if (!isAdd) {
      h += '<button class="us-remove" type="button" data-remove' + (f.confirm ? ' hidden' : '') + '>Remove from workspace</button>' +
        '<div class="us-confirm"' + (f.confirm ? '' : ' hidden') + '><span>Remove ' + esc(n.name) + '? They lose every hub.</span>' +
        '<button class="c-btn us-btn-danger c-btn-sm" type="button" data-remove-yes>Remove</button>' +
        '<button class="c-btn c-btn-ghost c-btn-sm" type="button" data-remove-no>Keep</button></div>';
    }
    h += '<button class="c-btn c-btn-secondary c-btn-md" type="button" data-close>Cancel</button>' +
      '<button class="c-btn c-btn-primary c-btn-md" type="button" data-save' + (canSave ? '' : ' disabled') + '>' + (isAdd ? 'Add user' : 'Save changes') + '</button>';
    h += '</div>';

    modal.innerHTML = h;
    wireModal();
  }
  function strip(r) {
    if (!r) return null;
    var c = JSON.parse(JSON.stringify(r));
    delete c.teamDirect; delete c.teamTotal;
    return c;
  }

  function wireModal() {
    var f = form, n = f.next;
    modal.querySelectorAll('[data-close]').forEach(function (b) { b.addEventListener('click', closeModal); });

    var person = document.getElementById('person');
    if (person) {
      person.addEventListener('input', function () {
        f.q = person.value;
        var q = f.q.trim().toLowerCase();
        var box = document.getElementById('cands');
        if (!q) { box.hidden = true; box.innerHTML = ''; return; }
        var hits = store.candidates().filter(function (c) {
          return (c.name + ' ' + c.email).toLowerCase().indexOf(q) !== -1;
        }).slice(0, 8);
        box.hidden = false;
        box.innerHTML = hits.length
          ? hits.map(function (c) {
              return '<button class="us-cand" type="button" data-pick="' + esc(c.id) + '">' + esc(c.name) + '<div class="us-sub">' + esc(c.email) + '</div></button>';
            }).join('')
          : '<div class="us-cand" style="cursor:default;color:var(--color-neutral-5)">No one in Azure AD matches, or they are already in the directory.</div>';
        box.querySelectorAll('[data-pick]').forEach(function (b) {
          b.addEventListener('click', function () {
            var c = store.candidates().filter(function (x) { return x.id === b.dataset.pick; })[0];
            if (!c) return;
            f.picked = c;
            f.next = Object.assign(blank(), { id: c.id, name: c.name, email: c.email, networkId: c.networkId,
                                              reportsTo: c.reportsTo, reportsToEmail: c.reportsToEmail });
            paintModal();
          });
        });
      });
    }
    var unpick = modal.querySelector('[data-unpick]');
    if (unpick) unpick.addEventListener('click', function () { f.picked = null; f.q = ''; f.next = blank(); paintModal(); });

    modal.querySelectorAll('input[data-hub]').forEach(function (cb) {
      cb.addEventListener('change', function () {
        var k = cb.dataset.hub, i = n.hubs.indexOf(k);
        if (cb.checked && i === -1) n.hubs.push(k);
        if (!cb.checked && i !== -1) n.hubs.splice(i, 1);
        n.hubs = A.HUBS.map(function (x) { return x.key; }).filter(function (x) { return n.hubs.indexOf(x) !== -1; });
        var hasInfl = n.hubs.indexOf('influencer') !== -1;
        if (hasInfl && !n.influencerRole) n.influencerRole = A.DEFAULT_INFLUENCER_ROLE;
        if (!hasInfl) n.influencerRole = null;
        paintModal();
      });
    });
    var role = document.getElementById('role');
    if (role) role.addEventListener('change', function () { n.role = role.value; paintModal(); document.getElementById('role').focus(); });
    var irole = document.getElementById('irole');
    if (irole) irole.addEventListener('change', function () { n.influencerRole = irole.value; paintModal(); document.getElementById('irole').focus(); });
    var access = document.getElementById('access');
    if (access) access.addEventListener('change', function () { n.access = access.value; paintModal(); document.getElementById('access').focus(); });

    var rm = modal.querySelector('[data-remove]');
    if (rm) rm.addEventListener('click', function () { f.confirm = true; paintModal(); });
    var no = modal.querySelector('[data-remove-no]');
    if (no) no.addEventListener('click', function () { f.confirm = false; paintModal(); });
    var yes = modal.querySelector('[data-remove-yes]');
    if (yes) yes.addEventListener('click', function () {
      var err = A.check(viewer, f.before, null, store.list());
      if (err) { f.confirm = false; paintModal(); showGuard(err); return; }
      store.remove(f.before.id);
      closeModal();
      render();
      Sh.toast('neutral', 'Removed from the workspace', f.before.name + ' no longer has access to any hub.');
    });

    var save = modal.querySelector('[data-save]');
    if (save) save.addEventListener('click', function () {
      var err = A.check(viewer, f.before, n, store.list());
      if (err) { showGuard(err); return; }
      store.save(n);
      var isAdd = f.mode === 'add';
      closeModal();
      render();
      Sh.toast('success', isAdd ? 'User added' : 'Changes saved',
        n.name + (isAdd ? ' can open ' + n.hubs.map(A.hubLabel).join(', ') + '.' : ' is updated.'));
    });
  }
  function showGuard(msg) {
    var g = document.getElementById('guard');
    if (!g) return;
    g.hidden = false;
    g.querySelector('span').textContent = msg;
  }
```

- [ ] **Step 2: Verify in the browser**

Open `http://localhost:8791/pages/users.html?v=2` (the cache-buster the README recommends).

As Super Admin:
- New user opens "Add a user". Type "ahm": no candidates, because everyone from the chart is already in. Cancel.
- Edit Joy Ahmad (or any Head of Sales): the sheet shows Hubs with Sales ticked and disabled as the last hub, Role select, the description box reading "Sees own team on the Sales Board." with the Collab: Sales line, Access select, and the Azure AD block with Reports to, Network ID and Team. Save is disabled.
- Tick Influencer: an Influencer role select appears, defaulting to Viewer / Client, the description gains a Collab: Influencer line, and Sales is now enabled. Save enables. Save: toast, the row shows two hub badges and "Influencer: Viewer / Client" under the role.
- Edit Bryan Wong: set Access to Deactivated. The red guard reads "This is the last active Super Admin. Promote someone else first." and Save stays disabled. Set back to Active: the guard hides.
- Edit someone else, set Role to Super Admin, save. Now edit Bryan Wong and set Role to Leadership: guard reads "You cannot change your own admin tier."
- Edit that promoted person: Remove from workspace shows the inline confirm. Keep hides it. Remove again, then Remove: row gone, toast shown.
- New user: type the removed person's name. They appear as a candidate. Pick them: the picked card shows, hubs default to Sales, Role select at Sales (E/SE). Add user: they are back in the list with the default role, and their old manager's Team count is restored.
- Reload: every change persists.

As Admin (switch with the control):
- Edit anyone: Role and Influencer role are read-only text with "A Super Admin sets the role." Hubs, Access and Remove work.
- New user with Influencer ticked shows Viewer / Client read-only. Adding works.

As Leadership: the Admin-only state, no New user button.

Restore the seed: in the console run `localStorage.removeItem('collabrium.access.directory')` and reload. The table is back to the seed.

No console errors throughout.

- [ ] **Step 3: Commit**

```bash
git add pages/users.html
git commit -m "users: Add and Edit sheets with hubs, roles, access, remove, and every guard inline"
```

---

### Task 9: Wire the existing pages and the README

**Files:**
- Modify: `pages/landing-v3.html:4755`
- Modify: `pages/feedback-v1.html:763`
- Modify: `README.md` (the Layout table)

- [ ] **Step 1: Point the dashboard's Settings item at the new page**

In `pages/landing-v3.html`, find the account menu (search for `id="accountMenu"`). Replace this line:

```html
    <button class="c-account-menu-item" type="button" role="menuitem"><i class="ph-fill ph-gear"></i><span>Settings</span></button>
```

with:

```html
    <a class="c-account-menu-item" href="settings.html" role="menuitem"><i class="ph-fill ph-gear"></i><span>Settings</span></a>
```

The menu's close handler matches `.c-account-menu-item` by class, not by tag, so an anchor closes it the same way the Log out anchor does. Also update the comment above the dashboard's Log out anchor if it says Settings is inert: change "Settings does not yet" to "Settings now does too" where it appears in the CSS comment near `.c-account-menu-item` (search for `Settings does not yet`). If the phrase is not there, skip.

- [ ] **Step 2: Same change in the feedback page**

In `pages/feedback-v1.html`, replace:

```html
  <button class="c-account-menu-item" type="button" role="menuitem"><i class="ph-fill ph-gear"></i><span>Settings</span></button>
```

with:

```html
  <a class="c-account-menu-item" href="settings.html" role="menuitem"><i class="ph-fill ph-gear"></i><span>Settings</span></a>
```

- [ ] **Step 3: Verify the links**

Open `http://localhost:8791/pages/landing-v3.html`, click the account row, click Settings: the Settings page opens. Same from `feedback-v1.html`. From Settings, Dashboard and Feedback in the rail go back.

- [ ] **Step 4: Add the new files to the README layout table**

In `README.md`, after the row for `pages/feedback-v1.html`, add:

```markdown
| `pages/settings.html` | Settings, from the account menu: Account, and the Users & roles card. Carries the "Viewing as" control that drives the access gating |
| `pages/users.html` | Users & roles: who may sign in, which hubs they can open, what role they carry. Seeded from `data/org-tree.json`, changes kept in this browser's localStorage |
| `shared/access.js` | The access model: roles, hubs, the Mothership activity matrix, the seed, the overlay store, the guards. `node scripts/check-access.mjs` checks its rules |
| `shared/shell.css`, `shared/shell.js` | The app shell's styles and behaviour, shared by the two pages above |
```

And after the "Run it" block, add one line:

```markdown
`node scripts/check-access.mjs` runs the access model's checks; there is no other test runner.
```

- [ ] **Step 5: Run the checks one last time and commit**

Run: `node scripts/check-access.mjs`
Expected: `All checks passed`.

```bash
git add pages/landing-v3.html pages/feedback-v1.html README.md
git commit -m "shell: Settings reaches the new page from the dashboard and the feedback board"
```

---

### Task 10: Full browser pass and screenshots

**Files:** none changed unless a defect is found.

- [ ] **Step 1: Walk the spec's browser verification list end to end**

With the server running, as each of the three viewers in turn:

1. Open `pages/settings.html`. Confirm the cards, the account row and the Account card agree with the viewer.
2. Open `pages/users.html`. Confirm what the viewer may see and do, per Task 7 and Task 8.
3. Add a user, edit hubs and role, deactivate, remove, filter, sort, change rows per page, page.
4. Reload: the overlay persists.
5. Clear the overlay from the console and reload: the seed returns.

Also: resize to 640px wide. The rail becomes the corner box, the toolbar wraps, and the table scrolls inside its own container without the page scrolling sideways.

- [ ] **Step 2: Fix anything found, re-run `node scripts/check-access.mjs`, commit**

```bash
git add -A pages/settings.html pages/users.html shared/access.js shared/shell.css shared/shell.js
git commit -m "access: fixes from the browser pass"
```

Skip the commit if nothing changed.

- [ ] **Step 3: Take two screenshots for the handover**

Super Admin on the directory with the Edit sheet open, and Leadership on the directory showing the Admin-only state. Send both to the user.

---

## Self-review against the spec

**Coverage.** Data model and seed: Tasks 1, 2. Overlay store: Task 3. Viewer state: Task 4. Activity matrix and `holds`, `scopeWord`: Task 1. Rules the pages enforce: Task 3 (`check`) and Task 8 (inline guards, read-only role for Admin, last-hub checkbox disabled). Settings page: Task 6. Directory header, toolbar, filters, table, Add, Edit, Business role state: Tasks 7, 8. Files: Tasks 5, 9. Testing: every task's check step, Task 10.

**Not in scope, as the spec says:** gating the dashboard's own Sales Board editing and bulk import.

**Type consistency.** Record fields are `id, name, email, networkId, role, hubs, influencerRole, reportsTo, reportsToEmail, access, lastSignIn` plus computed `teamDirect, teamTotal` in every task. Store API is `list, get, save, remove, reset, syncedAt, stampSync, candidates` in Tasks 3, 7, 8. `check(viewer, before, next, all)` in Tasks 3, 8. `CollabShell.init` returns the viewer and takes `onViewerChange`; `toast(tone, title, message)`; both used that way in Tasks 6, 7, 8.
