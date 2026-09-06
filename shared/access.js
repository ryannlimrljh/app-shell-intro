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
