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

  return api;
});
