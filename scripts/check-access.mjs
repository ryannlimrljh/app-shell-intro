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
ok(seed.every(r => r.reportsTo !== r.id), 'nobody reports to themselves');
{ const cyc = A.withTeams([{ id: 'a', name: 'A', reportsTo: 'b' }, { id: 'b', name: 'B', reportsTo: 'a' }]); ok(cyc.every(r => r.teamTotal === 1 && r.teamDirect === 1), 'a cycle never counts a person in their own team'); }
ok(seed.every(r => !r.reportsToEmail || /^[a-z]+(\.[a-z]+)*@astro\.com\.my$/.test(r.reportsToEmail)), 'external manager addresses are well formed');
ok(!seed.some(r => r.reportsToEmail && /not\.stated|^@/.test(r.reportsToEmail)), 'placeholders do not become addresses');

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
  { let threwNoId = false; try { store.save({}); } catch (e) { threwNoId = true; } ok(threwNoId, 'save without an id throws'); }
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
  ok(/deactivate yourself/.test(A.check(SA, bryan, edit(bryan, { access: 'inactive' }), withSecond)), 'the viewer cannot deactivate themselves');
  ok(/remove yourself/.test(A.check(SA, bryan, null, withSecond)), 'the viewer cannot remove themselves');
  ok(A.check(SA, joy, edit(joy, { role: 'super_admin' }), all) === null, 'someone else can be promoted');
  const add = { id: 'x', name: 'X', email: 'x@astro.com.my', networkId: 'X', role: 'sales_rep', hubs: ['sales'],
                influencerRole: null, reportsTo: null, reportsToEmail: null, access: 'active', lastSignIn: null };
  ok(A.check(AD, null, add, all) === null, 'Admin may add with the default role');
  ok(/Super Admin sets the role/.test(A.check(AD, null, edit(add, { role: 'leadership' }), all)), 'Admin may not add with another role');
  ok(A.check(AD, null, edit(add, { hubs: ['sales', 'influencer'], influencerRole: 'viewer' }), all) === null, 'Admin may add with the default Influencer role');
  ok(/Super Admin sets the role/.test(A.check(AD, null, edit(add, { hubs: ['influencer'], influencerRole: 'infl_admin' }), all)), 'Admin may not pick an Influencer role');
  { const joyInfl = edit(joy, { hubs: ['sales', 'influencer'], influencerRole: 'viewer' }); ok(/Super Admin sets the role/.test(A.check(AD, joyInfl, edit(joyInfl, { influencerRole: 'infl_manager' }), all)), 'Admin may not change the Influencer role on edit'); }
}

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
  ok(A.initials('Bryan Wong') === 'BW' && A.initials('Normala (Joy) Ahmad') === 'NA' && A.initials('Adreena') === 'A', 'initials skip nicknames and single names get one letter');
}

console.log(failed ? `\n${failed} check(s) failed` : '\nAll checks passed');
process.exit(failed ? 1 : 0);
