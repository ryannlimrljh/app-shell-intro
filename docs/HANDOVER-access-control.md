# Mothership access control — handover

Built 6–7 September 2026 in the `mothership` repo (GitHub: `ryannlimrljh/app-shell-intro`),
branch `access-control`, merged to local `main`. Everything is build-free HTML, CSS and
ES5-style JavaScript on the vendored Collabrium design system. No dependencies were added.

## What it is

Three screens that sit above every hub in the Collabrium access model, plus the module
behind them.

| Screen | File | What it does |
|---|---|---|
| Settings | `pages/settings.html` | Reached from the account menu on the dashboard and the feedback board. Account card, Users & roles card, Roles & permissions card. Cards grey out for business roles. |
| Users & roles | `pages/users.html` | The directory: who may sign in, which hubs they can open (Collab: Sales, Collab: Influencer, Collab: Media), what role they carry. Add and Edit in a fold-out modal. Filters, A–Z rail, skeleton, element tags on hubs. |
| Roles & permissions | `pages/roles.html` | The artifact's Activities page made editable. A Super Admin adjusts what each role can do on Mothership; Admin reads; business roles are refused. Locks, Reset, change log. |

Behind them:

| File | Responsibility |
|---|---|
| `shared/access.js` | The access model. Roles, hubs, the three activity matrices from the architecture artifact, `holdsIn` with overrides, the directory seed and overlay store, every guard (`check`), the viewer, locks and change log. Browser global `CollabAccess`; CommonJS in Node. |
| `shared/shell.css`, `shared/shell.js` | The app shell the three pages share: rail collapse with memory, account menu, department switcher, hover label, toast, page-to-page transitions, the "Viewing as" control. Browser global `CollabShell`. |
| `scripts/check-access.mjs` | 137 assertions over the access model. `node scripts/check-access.mjs`. The only automated test in the repo. |
| `data/org-tree.json` | Pre-existing. The org chart the directory is seeded from. |

Specs and plans, in `docs/superpowers/`:

- `specs/2026-09-06-mothership-access-control-design.md` — Settings and the directory.
- `specs/2026-09-07-roles-and-permissions-design.md` — Roles & permissions.
- `plans/2026-09-06-mothership-access-control.md`, `plans/2026-09-07-roles-and-permissions.md` — how they were built, task by task.

## Run it

```bash
cd mothership
python3 -m http.server 8790
```

Then open `http://localhost:8790/pages/landing-v3.html`, click the account row at the foot
of the rail, then Settings. Or go straight to `pages/settings.html`, `pages/users.html`,
`pages/roles.html`. Browsers hold these pages hard; add `?v=2` to an address if a change
does not appear.

Checks:

```bash
node scripts/check-access.mjs
```

Production deploys from `main` on Vercel: `https://app-shell-intro.vercel.app/pages/…`.

## The access model, in one page

**One SSO identity, one record.** A person has one Sales-side role that Mothership and
Collab: Sales share, a list of hubs they can open, an Influencer role only when
Collab: Influencer is granted (Admin / Head of Influencer, Influencer Manager, Viewer /
Client), and a Media role only when Collab: Media is granted (Admin (Collab: Media),
Media Planner). Granting a hub brings its default role, which Admin may do; choosing
any other role is a Super Admin decision. At least one hub, always.

**Two admin tiers.** Super Admin is the platform ceiling. Admin can add a user, assign
hubs, deactivate or remove; only Super Admin sets or changes a role. Read literally from
the artifact's Activities page.

**Guards** (all in `check()` in `shared/access.js`, all covered by the checks):

- Business roles cannot touch the directory.
- Admin cannot change a role, on add or on edit, including the Influencer role.
- A record cannot lose its last hub; an Influencer role exists only with that hub.
- Nobody can change their own admin tier, deactivate themselves, or remove themselves.
- The last active Super Admin cannot be deactivated, demoted or removed.

**Roles & permissions:** per role, never per person. Super Admin's own row is locked to
everything; items the artifact reserves for Super Admin (the eight Mothership items with
no business role, including "Assign or change a user's role") are locked for every other
role, on the read path too, so nothing in storage can lower the ceiling. Admin mirrors
Leadership by rule until the first edit touching either, when Admin's set is written out
as explicit values. Defaults never change: edits are overrides, Reset drops them.

**Gating in the pages** goes through one function. Settings and the directory gate on
"Invite / add a user to the workspace"; editing roles gates on "Assign or change a user's
role". No page compares role names.

## Where state lives (this round)

Everything is per browser, in localStorage. Nothing is shared between people yet.

| Key | Holds |
|---|---|
| `collabrium.access.directory` | Added and changed records, removed ids, the Azure AD sync stamp. Clearing it restores the seed exactly. |
| `collabrium.access.overrides` | Role-matrix overrides and the change log. Clearing it restores the artifact's allocation. |
| `collabrium.access.viewer` | The "Viewing as" role: `super_admin`, `admin` or `leadership`. |
| `collabrium.shell.rail` | Whether the rail was left `collapsed` or `expanded`. |

Every page has an error surface: if its script fails before painting, it says so and
offers "Clear stored data and reload".

## The "Viewing as" control

A prototype control, labelled "(remove in actual implementation)". The viewer is always
Bryan Wong; only the role changes. It exists so the three experiences can be tried in one
click. The real build replaces it with the signed-in user's role from Astro ID.

## What to build next

1. **A shared store.** `createStore` in `shared/access.js` is the seam. The intended
   replacement keeps synchronous reads off a local cache and adds an async `refresh()`
   plus an `onChange` callback, the pattern `pages/feedback-v1.html` already uses for
   `/api/feedback` on Neon. The pages keep calling `list()`.
2. **Real audit log.** `CHANGE_LOG` in the overrides is the shape; it becomes rows.
3. **Hub matrices.** `shared/access.js` already carries Collab: Sales and Collab:
   Influencer matrices with checks. Roles & permissions shows Mothership only because
   each pod sets its own for now; the tabs can return when that changes.
4. **Gate the dashboard.** Sales Board target editing and bulk import can ask `holds()`.
5. **Retire "Viewing as"** once sign-in is real.

## Things that are easy to miss

- The account menu's Settings item on `landing-v3.html` and `feedback-v1.html` was a dead
  button; it is now a link. That is the only change to either file.
- The department switcher on the new pages matches the dashboard's, including Media
  opening `collab-media.vercel.app` in a new tab.
- The Planning hub was renamed Collab: Media on 7 September. A record stored under the
  old key reads back under the new one.
- Every check mark uses the regular Phosphor weight; the bold weight is not loaded.
- The design system sets `display` on buttons and choices, which outranks the browser's
  `[hidden]`. `shared/shell.css` carries one `[hidden]{display:none !important}` for it.
- The pages' shared scripts carry cache keys (`?v=N`). Bump them when the shared files
  change, or browsers keep the old copy.
