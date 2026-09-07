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
  /* Collab: Media runs its own pair, from the live app's directory. */
  var MEDIA_ROLES = [
    { key: 'media_admin',   label: 'Admin (Collab: Media)' },
    { key: 'media_planner', label: 'Media Planner' }
  ];
  /* element: the design system's department colour, the same mapping the
     department switcher uses (Sales is Gold, Influencers Earth, Media Water). */
  var HUBS = [
    { key: 'sales',      label: 'Collab: Sales',      short: 'Sales',      element: 'gold' },
    { key: 'influencer', label: 'Collab: Influencer', short: 'Influencer', element: 'earth' },
    { key: 'media',      label: 'Collab: Media',      short: 'Media',      element: 'water' }
  ];
  var ADMIN_TIERS = ['super_admin', 'admin'];
  var BUSINESS = ['leadership', 'sales_vp', 'head_of_sales', 'sales_manager',
                  'sales_rep', 'marketing_services', 'creative_strategist'];
  var TEAM_SCOPED = ['sales_vp', 'head_of_sales', 'sales_manager'];
  var DEFAULT_ROLE = 'sales_rep';
  var DEFAULT_INFLUENCER_ROLE = 'viewer';
  var DEFAULT_MEDIA_ROLE = 'media_planner';

  function labelOf(list, key) {
    for (var i = 0; i < list.length; i++) if (list[i].key === key) return list[i].label;
    return key || '';
  }
  function roleLabel(k) { return labelOf(ROLES, k); }
  function influencerRoleLabel(k) { return labelOf(INFLUENCER_ROLES, k); }
  function mediaRoleLabel(k) { return labelOf(MEDIA_ROLES, k); }
  function hubLabel(k) { return labelOf(HUBS, k); }
  function hubShort(k) {
    for (var i = 0; i < HUBS.length; i++) if (HUBS[i].key === k) return HUBS[i].short;
    return k || '';
  }
  function hubElement(k) {
    for (var i = 0; i < HUBS.length; i++) if (HUBS[i].key === k) return HUBS[i].element;
    return null;
  }
  function tierOf(role) { return ADMIN_TIERS.indexOf(role) !== -1 ? 'admin' : 'business'; }

  /* ── The Mothership activity matrix ─────────────────────────────────── */

  /* The Mothership tier of the artifact's Activities page, labels verbatim.
     `roles` lists the business roles holding the item, plus 'admin' where
     Admin holds it on its own. Super Admin holds everything. Admin also
     holds whatever Leadership holds, which is the artifact's "Admin mirrors
     Leadership" rule. superOnly marks what the artifact reserves for Super
     Admin: never granted to anyone else, by default or by override. */
  var ACTIVITIES = [
    { title: 'Manage workspace', items: [
      { label: 'Enable or disable hubs (Collab: Sales, Collab: Influencer, Collab: Media)', roles: [], superOnly: true },
      { label: 'Manage integrations (Similarweb, Brandwatch, CRM, booking/finance feeds)', roles: [], superOnly: true },
      { label: 'Manage data source connections', roles: [], superOnly: true }
    ]},
    { title: 'Manage user access', items: [
      { label: 'Invite / add a user to the workspace', roles: ['admin'] },
      { label: 'Assign which hub(s) a user can open (Collab: Sales, Collab: Influencer, Collab: Media)', roles: ['admin'] },
      { label: "Assign or change a user's role", roles: [], superOnly: true },
      { label: 'Deactivate or remove a user', roles: ['admin'] },
      { label: 'Manage team / reporting-line structure', roles: [], superOnly: true }
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
      { label: 'Manage guest or external partner access', roles: [], superOnly: true }
    ]},
    { title: 'Audit & compliance', items: [
      { label: 'View audit log', roles: [], superOnly: true },
      { label: 'Export audit log', roles: [], superOnly: true },
      { label: 'View data access reports', roles: ['leadership'] }
    ]},
    { title: 'Export', items: [
      { label: 'Export dashboard data', roles: ['leadership'] },
      { label: 'Export performance reports', roles: ['leadership', 'sales_vp', 'head_of_sales', 'sales_manager', 'marketing_services'] }
    ]},
    { title: 'Collaborate', items: [
      { label: 'View dashboard (home)', roles: BUSINESS.slice() },
      { label: 'Customize own dashboard layout', roles: BUSINESS.slice() },
      { label: 'View cross-pillar leadership overview', roles: ['leadership'] },
      { label: 'Receive notifications & alerts', roles: BUSINESS.slice() }
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
  function holds(role, label) { return holdsIn('mothership', role, label); }

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
  api.MEDIA_ROLES = MEDIA_ROLES;
  api.DEFAULT_MEDIA_ROLE = DEFAULT_MEDIA_ROLE;
  api.mediaRoleLabel = mediaRoleLabel;
  api.hubLabel = hubLabel;
  api.hubShort = hubShort;
  api.hubElement = hubElement;
  api.tierOf = tierOf;
  api.holds = holds;
  api.scopeWord = scopeWord;

  /* ── Seed from the org chart ────────────────────────────────────────── */

  var VIEWER_ID = 'bryan-wong';

  function slug(name) {
    return String(name).toLowerCase().replace(/\(.*?\)/g, '')
      .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  }
  /* The chart has no addresses. The name's words joined by dots, at
     astro.com.my, nicknames in parentheses dropped, is the pattern the
     pod's own directory shows. */
  function emailFor(name) {
    var local = String(name).toLowerCase().replace(/\(.*?\)/g, '')
      .replace(/[^a-z\s]/g, '').trim().split(/\s+/).join('.');
    return local + '@astro.com.my';
  }
  /* A manager name that is really a placeholder ("Not stated", "TBC",
     "-") rather than a real person. Treated as no manager at all. */
  function isPlaceholder(name) {
    var s = String(name || '').trim().toLowerCase();
    return !/[a-z]/.test(s) || ['not stated', 'n/a', 'none', 'tbc', 'tbd', 'unassigned'].indexOf(s) !== -1;
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
      var seen = {}; seen[r.id] = 1;
      r.teamTotal = total(r.id, seen);
    });
    return recs;
  }

  /* One record per person in the chart's flat index, plus Bryan Wong on
     top. Role from the chart's own lists: a name in `vps` → Sales VP, a
     name in `heads` → Head of Sales, a pod lead or AVP grade → Sales
     Manager, everyone else → Sales (E/SE). */
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
           role: 'super_admin', hubs: ['sales'], influencerRole: null, mediaRole: null,
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
             role: role, hubs: ['sales'], influencerRole: null, mediaRole: null,
             reportsTo: null, reportsToEmail: null, access: 'active',
             lastSignIn: role === 'sales_vp' ? iso(now - 3 * DAY) : null,
             _mgr: p.reportsTo || null });
    });
    /* Managers resolve by name, through the board aliases. A manager the
       chart names but does not list is kept as an address, which the
       directory shows with the pod's "Not a Collabrium user" note. */
    recs.forEach(function (r) {
      var m = r._mgr ? canon(r._mgr) : null;
      if (m && isPlaceholder(m)) m = null;
      if (r.id === VIEWER_ID) { /* top of the tree */ }
      else if (r.role === 'sales_vp') r.reportsTo = VIEWER_ID;
      else if (m && byName[m]) { if (byName[m].id !== r.id) r.reportsTo = byName[m].id; }
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
     dropped. Clearing the key restores the seed exactly.

     The interface is synchronous by design for this round. A later
     API-backed store should keep synchronous reads off a local cache and
     add an async refresh() plus an onChange callback, the pattern
     pages/feedback-v1.html already uses for /api/feedback, so the pages
     keep calling list(). */
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
    /* The hub once called Planning is Collab: Media; a record saved under
       the old key reads back under the new one. */
    function migrate(r) {
      if (r.hubs) r.hubs = r.hubs.map(function (h) { return h === 'planning' ? 'media' : h; });
      /* Media grants saved before the hub had roles get the default one. */
      if (r.hubs && r.hubs.indexOf('media') !== -1 && !r.mediaRole) r.mediaRole = DEFAULT_MEDIA_ROLE;
      if (r.mediaRole === undefined) r.mediaRole = null;
      return r;
    }
    function list() {
      var o = read(), inSeed = {};
      var out = seed.map(function (r) { inSeed[r.id] = true; return migrate(o.changed[r.id] ? clone(o.changed[r.id]) : strip(r)); });
      Object.keys(o.changed).forEach(function (id) { if (!inSeed[id]) out.push(migrate(clone(o.changed[id]))); });
      out = out.filter(function (r) { return o.removed.indexOf(r.id) === -1; });
      return withTeams(out.sort(byNameOrder));
    }
    function get(id) {
      var all = list();
      for (var i = 0; i < all.length; i++) if (all[i].id === id) return all[i];
      return null;
    }
    function save(rec) {
      if (!rec || !rec.id) throw new Error('save needs a record with an id');
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

  function hubRoleChanged(was, now, def) {
    was = was || null; now = now || null;
    if (was === now) return false;
    if (now === null) return false;      /* the hub went, its role with it */
    if (was === null) return now !== def; /* the hub arrived: only a non-default role is a choice */
    return true;
  }
  function check(viewer, before, next, all) {
    if (tierOf(viewer.role) !== 'admin') return DENIED;
    if (next) {
      if (!next.hubs || !next.hubs.length) return 'Every user needs at least one hub. Deactivate them instead.';
      var hasInfl = next.hubs.indexOf('influencer') !== -1, hasMedia = next.hubs.indexOf('media') !== -1;
      if (hasInfl && !next.influencerRole) return 'Choose an Influencer role for Collab: Influencer.';
      if (!hasInfl && next.influencerRole) return 'An Influencer role needs Collab: Influencer granted.';
      if (hasMedia && !next.mediaRole) return 'Choose a Media role for Collab: Media.';
      if (!hasMedia && next.mediaRole) return 'A Media role needs Collab: Media granted.';
      /* A hub's default role arriving with the hub is part of assigning the
         hub, which Admin may do; any other role, or a change to one, is a
         role decision, which Admin may not. Dropping a hub drops its role. */
      var roleChanged = before
        ? (before.role !== next.role ||
           hubRoleChanged(before.influencerRole, next.influencerRole, DEFAULT_INFLUENCER_ROLE) ||
           hubRoleChanged(before.mediaRole, next.mediaRole, DEFAULT_MEDIA_ROLE))
        : (next.role !== DEFAULT_ROLE || (hasInfl && next.influencerRole !== DEFAULT_INFLUENCER_ROLE) || (hasMedia && next.mediaRole !== DEFAULT_MEDIA_ROLE));
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
    if (next && before && before.id === viewer.id && next.access === 'inactive') return 'You cannot deactivate yourself.';
    if (!next && before && before.id === viewer.id) return 'You cannot remove yourself.';
    return null;
  }

  api.DIRECTORY_KEY = DIRECTORY_KEY;
  api.DENIED = DENIED;
  api.ROLE_IS_SUPER = ROLE_IS_SUPER;
  api.createStore = createStore;
  api.check = check;

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
  function mediaLine(r) {
    if (r === 'media_admin') return 'full access; manages plans, rate cards and Users & Permissions in the hub.';
    return 'builds and edits own media plans; opens Plans, Campaign performances, and Inventory availability & forecast.';
  }
  function describe(rec) {
    var lines = [], hubs = rec.hubs || [];
    if (rec.role === 'super_admin') lines.push('Sees everything on the Sales Board. Platform ceiling: every activity, everywhere.');
    else if (rec.role === 'admin') lines.push('Sees everything on the Sales Board. Adds users, assigns hubs, deactivates. A Super Admin sets roles.');
    else lines.push('Sees ' + scopeWord(rec.role).toLowerCase() + ' on the Sales Board.');
    if (hubs.indexOf('sales') !== -1) lines.push('Collab: Sales: ' + salesLine(rec.role));
    if (hubs.indexOf('influencer') !== -1) lines.push('Collab: Influencer: ' + influencerLine(rec.influencerRole));
    if (hubs.indexOf('media') !== -1) lines.push('Collab: Media: ' + mediaLine(rec.mediaRole));
    return lines;
  }

  function initials(name) {
    var parts = String(name).replace(/\(.*?\)/g, '').trim().split(/\s+/);
    if (parts.length === 1) return ((parts[0] || '')[0] || '').toUpperCase();
    return ((parts[0] || '')[0] || '').toUpperCase() + ((parts[parts.length - 1] || '')[0] || '').toUpperCase();
  }

  api.VIEWER_KEY = VIEWER_KEY;
  api.VIEWER_ROLES = VIEWER_ROLES;
  api.getViewer = getViewer;
  api.setViewer = setViewer;
  api.can = can;
  api.describe = describe;
  api.initials = initials;


  /* ── The hub matrices, and every matrix in one place ────────────────── */

  /* Collab: Sales and Collab: Influencer, from the artifact's Activities
     page, labels verbatim, role keys mapped onto this module's. In a hub
     Super Admin and Admin (Head of Influencer, in that hub) hold everything
     except the items marked superOnly. */
  var TEAM_FULL = ['head_of_sales', 'sales_manager', 'sales_vp'];
  var SALES_ACTIVITIES = [
    { title: 'Tools', items: [
      { label: 'Create a campaign', roles: BUSINESS.slice() },
      { label: 'Edit own campaign', roles: BUSINESS.slice() },
      { label: "Edit team's campaigns", roles: TEAM_FULL.slice() },
      { label: 'Log the client brief', roles: BUSINESS.slice() },
      { label: 'Create a proposal', roles: BUSINESS.slice() },
      { label: 'Build a deck', roles: BUSINESS.slice() },
      { label: 'Add people to a campaign', roles: BUSINESS.slice() },
      { label: 'Share a campaign', roles: BUSINESS.slice() },
      { label: 'Archive own campaign', roles: BUSINESS.slice() },
      { label: "Archive team's campaigns", roles: TEAM_FULL.slice() },
      { label: 'Delete own campaign (creator only)', roles: BUSINESS.slice() },
      { label: 'Query client intelligence (search & run)', roles: BUSINESS.slice() },
      { label: 'View client profile & performance', roles: BUSINESS.slice() }
    ]},
    { title: 'Browse', items: [
      { label: 'View inventory', roles: BUSINESS.slice() },
      { label: 'Edit inventory (create, update, delete)', roles: ['marketing_services'] },
      { label: 'View bundles', roles: BUSINESS.slice() },
      { label: 'Edit bundles (create, update, delete)', roles: ['marketing_services'] },
      { label: 'View brand profiles', roles: BUSINESS.slice() },
      { label: 'Edit brand profiles', roles: ['marketing_services'] },
      { label: 'View performance data', roles: BUSINESS.slice() }
    ]},
    { title: 'Administration', items: [
      { label: 'Manage users & permissions', roles: [] },
      { label: 'View own activity log', roles: ['leadership', 'sales_rep', 'marketing_services', 'creative_strategist'] },
      { label: "View own team's activity log", roles: TEAM_FULL.slice() },
      { label: 'View all activity logs', roles: [] },
      { label: 'Remove / archive an activity log entry (Super Admin only)', roles: [], superOnly: true }
    ]}
  ];
  var INFLUENCER_ACTIVITIES = [
    { title: 'Tools', items: [
      { label: 'Manage influencer roster', roles: ['infl_manager'] },
      { label: 'Bulk upload influencers', roles: ['infl_manager'] },
      { label: 'Manage campaigns', roles: ['infl_manager'] },
      { label: 'Select KOLs', roles: ['infl_manager'] },
      { label: 'Respond to own KOL preview', roles: ['infl_manager', 'viewer'] },
      { label: 'Manage client preview links', roles: ['infl_manager'] },
      { label: 'Manage documents', roles: ['infl_manager'] },
      { label: 'Manage drafts', roles: ['infl_manager'] },
      { label: 'Respond to own draft', roles: ['infl_manager', 'viewer'] },
      { label: 'Manage agencies', roles: ['infl_manager'] }
    ]},
    { title: 'Reference Data', items: [
      { label: 'Manage brands', roles: ['infl_manager'] },
      { label: 'Manage niches', roles: ['infl_manager'] },
      { label: 'Manage cost centres', roles: ['infl_manager'] },
      { label: 'Manage Astro signatories', roles: ['infl_manager'] },
      { label: 'Manage report templates', roles: ['infl_manager'] }
    ]},
    { title: 'Insight', items: [
      { label: 'View dashboard', roles: ['infl_manager'] },
      { label: 'View campaign financials (quote, cost, split)', roles: ['infl_manager'] }
    ]},
    { title: 'Administration', items: [
      { label: 'Manage users & permissions', roles: [] },
      { label: 'View users & permissions', roles: ['infl_manager'] },
      { label: 'View activity log', roles: ['infl_manager'] },
      { label: 'Remove / archive an activity log entry (Super Admin only)', roles: [], superOnly: true }
    ]}
  ];
  var INFLUENCER_MATRIX_ROLES = [{ key: 'super_admin', label: 'Super Admin' }].concat(INFLUENCER_ROLES);
  var MATRICES = {
    mothership: { key: 'mothership', title: 'Mothership', sub: 'Platform-wide actions, not specific to any one hub.', roles: ROLES, groups: ACTIVITIES, full: ['super_admin'], mirror: { admin: 'leadership' } },
    sales:      { key: 'sales', title: 'Collab: Sales', sub: 'Tools, Browse and Administration, the hub\'s own side-nav groups.', roles: ROLES, groups: SALES_ACTIVITIES, full: ['super_admin', 'admin'] },
    influencer: { key: 'influencer', title: 'Collab: Influencer', sub: 'Tools, Reference Data, Insight and Administration.', roles: INFLUENCER_MATRIX_ROLES, groups: INFLUENCER_ACTIVITIES, full: ['super_admin', 'infl_admin'] }
  };
  function matrixOf(key) {
    var m = MATRICES[key];
    if (!m) throw new Error('Unknown matrix: ' + key);
    return m;
  }
  function findIn(matrix, label) {
    var m = matrixOf(matrix);
    for (var g = 0; g < m.groups.length; g++)
      for (var i = 0; i < m.groups[g].items.length; i++)
        if (m.groups[g].items[i].label === label) return m.groups[g].items[i];
    throw new Error('Unknown activity in ' + matrix + ': ' + label);
  }
  /* The artifact's allocation, untouched by any override. */
  function defaultHolds(matrix, role, label) {
    var m = matrixOf(matrix), item = findIn(matrix, label);
    if (role === 'super_admin') return true;
    if (item.superOnly) return false;
    if (m.full.indexOf(role) !== -1) return true;
    if (item.roles.indexOf(role) !== -1) return true;
    if (m.mirror && m.mirror[role] && item.roles.indexOf(m.mirror[role]) !== -1) return true;
    return false;
  }

  /* ── Overrides: what a Super Admin has changed, in this browser ─────── */

  var OVERRIDES_KEY = 'collabrium.access.overrides';
  var OVERRIDES = {}, CHANGE_LOG = [], overridesStorage = null;
  function isPlainObject(x) { return !!x && typeof x === 'object' && !Array.isArray(x); }
  /* Whatever is in storage, the page runs: a string that is not JSON, or
     JSON of the wrong shape, both fall back to the defaults. */
  function loadOverrides(storage) {
    overridesStorage = storage;
    OVERRIDES = {}; CHANGE_LOG = [];
    try {
      var v = JSON.parse(storage.getItem(OVERRIDES_KEY) || '{}');
      if (isPlainObject(v)) {
        if (isPlainObject(v.o)) OVERRIDES = v.o;
        if (Array.isArray(v.log)) CHANGE_LOG = v.log.filter(isPlainObject);
      }
    } catch (e) { /* garbage: run on the defaults */ }
  }
  function saveOverrides() {
    if (!overridesStorage) return;
    try { overridesStorage.setItem(OVERRIDES_KEY, JSON.stringify({ o: OVERRIDES, log: CHANGE_LOG.slice(-500) })); } catch (e) {}
  }
  function explicit(matrix, role) {
    return OVERRIDES[matrix] && OVERRIDES[matrix][role] ? OVERRIDES[matrix][role] : null;
  }
  /* Override if set, else the artifact's default. A locked cell never reads
     an override, whatever storage says: the ceiling cannot be lowered and a
     Super Admin only item cannot be granted through the back door. */
  function holdsIn(matrix, role, label) {
    if (lockReason(matrix, role, label)) return defaultHolds(matrix, role, label);
    var o = explicit(matrix, role);
    if (o && Object.prototype.hasOwnProperty.call(o, label)) return !!o[label];
    return defaultHolds(matrix, role, label);
  }
  /* Why a switch cannot move, or null. */
  function lockReason(matrix, role, label) {
    var item = findIn(matrix, label);
    if (role === 'super_admin') return 'Super Admin is the platform ceiling. Its access cannot be lowered.';
    if (item.superOnly) return 'Super Admin only, by design.';
    return null;
  }
  var ROLES_ARE_SUPER = 'A Super Admin sets roles.';
  function mayEditRoles(viewer) { return holdsIn('mothership', viewer.role, "Assign or change a user's role"); }
  /* Admin mirrors Leadership by rule until the first edit touches either;
     then Admin's current set is written out so the two part company. */
  function materialiseMirror(matrix) {
    var m = matrixOf(matrix);
    if (!m.mirror) return;
    Object.keys(m.mirror).forEach(function (role) {
      OVERRIDES[matrix] = OVERRIDES[matrix] || {};
      var o = OVERRIDES[matrix][role] = OVERRIDES[matrix][role] || {};
      m.groups.forEach(function (g) { g.items.forEach(function (item) {
        if (!Object.prototype.hasOwnProperty.call(o, item.label)) o[item.label] = holdsIn(matrix, role, item.label);
      }); });
    });
  }
  function logChange(viewer, matrix, role, label, value) {
    CHANGE_LOG.push({ at: new Date().toISOString(), by: viewer.name, matrix: matrix, role: role, label: label, value: value });
  }
  function roleInMatrix(m, role) { return m.roles.some(function (r) { return r.key === role; }); }
  function setOverride(storage, viewer, matrix, role, label, value) {
    if (storage !== overridesStorage) loadOverrides(storage);
    if (!mayEditRoles(viewer)) return ROLES_ARE_SUPER;
    var m = matrixOf(matrix);
    if (!roleInMatrix(m, role)) return 'That role does not exist in ' + m.title + '.';
    var lock = lockReason(matrix, role, label);
    if (lock) return lock;
    if (m.mirror && (m.mirror[role] || Object.keys(m.mirror).some(function (r) { return m.mirror[r] === role; }))) materialiseMirror(matrix);
    OVERRIDES[matrix] = OVERRIDES[matrix] || {};
    OVERRIDES[matrix][role] = OVERRIDES[matrix][role] || {};
    OVERRIDES[matrix][role][label] = !!value;
    logChange(viewer, matrix, role, label, !!value);
    saveOverrides();
    return null;
  }
  function resetRole(storage, viewer, matrix, role) {
    if (storage !== overridesStorage) loadOverrides(storage);
    if (!mayEditRoles(viewer)) return ROLES_ARE_SUPER;
    var m = matrixOf(matrix);
    if (!roleInMatrix(m, role)) return 'That role does not exist in ' + m.title + '.';
    if (OVERRIDES[matrix]) delete OVERRIDES[matrix][role];
    logChange(viewer, matrix, role, null, null);
    saveOverrides();
    return null;
  }
  /* Modified means an explicit value that differs from the default; a
     materialised mirror that still equals its default is not modified. */
  function isModified(matrix, role) {
    var o = explicit(matrix, role);
    if (!o) return false;
    return Object.keys(o).some(function (label) {
      try { return !!o[label] !== defaultHolds(matrix, role, label); } catch (e) { return false; }
    });
  }
  function lastChange(matrix, role) {
    for (var i = CHANGE_LOG.length - 1; i >= 0; i--)
      if (CHANGE_LOG[i].matrix === matrix && CHANGE_LOG[i].role === role) return CHANGE_LOG[i];
    return null;
  }

  api.SALES_ACTIVITIES = SALES_ACTIVITIES;
  api.INFLUENCER_ACTIVITIES = INFLUENCER_ACTIVITIES;
  api.MATRICES = MATRICES;
  api.OVERRIDES_KEY = OVERRIDES_KEY;
  api.ROLES_ARE_SUPER = ROLES_ARE_SUPER;
  api.defaultHolds = defaultHolds;
  api.holdsIn = holdsIn;
  api.loadOverrides = loadOverrides;
  api.setOverride = setOverride;
  api.resetRole = resetRole;
  api.isModified = isModified;
  api.lastChange = lastChange;
  api.lockReason = lockReason;
  api.mayEditRoles = mayEditRoles;

  return api;
});
