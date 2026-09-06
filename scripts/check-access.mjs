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

console.log(failed ? `\n${failed} check(s) failed` : '\nAll checks passed');
process.exit(failed ? 1 : 0);
