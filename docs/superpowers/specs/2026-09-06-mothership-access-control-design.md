# Mothership access control: Settings and Users & roles

Date: 6 September 2026
Status: approved design, ready for an implementation plan

## What this is

Mothership gets the two screens that sit above every hub in the Collabrium
access model: a Settings page reached from the account menu, and a Users &
roles directory reached from Settings. Together they are where a Super Admin
or Admin decides who may sign in, which hubs they can open, and what role
they carry there. This is the "shared entry" step of the artifact's access
flow, the one decision that happens before a user ever reaches a hub.

The reference is the Collab: Sales pod's own Settings and Users & roles pages
at collab-sales-ui.vercel.app. Mothership mirrors their layout and language,
and adds what only the console tier holds.

Sources:

- Collabrium Mothership Architecture artifact, the Role-based, Activities and
  Access flow pages. The Mothership activity matrix is copied from its
  Activities page verbatim.
- collab-sales-ui.vercel.app/settings and /users, crawled 6 September 2026.

## Decisions taken during design

1. **One SSO identity, one record.** A person has one Sales-side role that
   Mothership and Collab: Sales share, a list of hubs they can open, and an
   Influencer role only when Collab: Influencer is granted. Roles are not
   chosen per hub independently.
2. **At least one hub always.** Adding a user requires one hub ticked, and
   the edit form will not remove the last one. A user with nothing to open is
   deactivated instead.
3. **Admin invites, Super Admin sets roles.** Read literally from the
   Activities page: Admin can add a user, assign hubs, and deactivate or
   remove. Only Super Admin assigns or changes a role.
4. **Seeded directory plus a browser-only overlay.** People come from the org
   chart already in the repo. Changes live in this browser's localStorage,
   the same way the notes fall back today. A Neon-backed users function can
   replace the store later without touching the pages.
5. **A "Viewing as" switcher decides the viewer.** Super Admin, Admin, or
   Leadership as the sample business role. It drives the gating and the
   sidebar account row.
6. **Settings carries two cards only.** Account and Users & roles. No
   placeholders for Appearance, Release notes or Activity log.
7. **Two standalone pages plus one shared access module.** Each page carries
   its own copy of the app shell, the pattern feedback-v1 already follows.

## Data model

Held in `shared/access.js`. One record per SSO identity.

| Field | Values |
|---|---|
| `id` | Stable slug derived from the name |
| `name`, `email`, `networkId` | From the org chart. The chart has no emails, so they are generated in the astro.com.my pattern from the name. Network ID is the mailbox part upper-cased |
| `role` | One of: Super Admin, Admin, Leadership, Sales VP, Head of Sales, Sales Manager, Sales (E/SE), Marketing Services / Product, Creative Strategist |
| `hubs` | Non-empty subset of `sales`, `influencer`, `planning` |
| `influencerRole` | One of: Admin / Head of Influencer, Influencer Manager, Viewer / Client. Present only when `influencer` is in `hubs`. Defaults to Viewer / Client |
| `reportsTo` | Id of the manager, or an email string when the manager is not a Collabrium user. Read-only, labelled as from Azure AD |
| `teamDirect`, `teamTotal` | Counts computed from the tree. Read-only |
| `access` | `active` or `inactive` |
| `lastSignIn` | ISO timestamp or null, meaning never |

### Seed

Built once from `data/org-tree.json`'s flat `index` map, which gives every
person a name, grade, team, reportsTo and line.

- Role from grade: VP becomes Sales VP; a head entry from the `heads` list
  becomes Head of Sales; a pod lead (AVP, or the `lead` of a pod) becomes
  Sales Manager; everyone else becomes Sales (E/SE). Grades outside the sales
  ladder (Delivery, Exec, blank) become Sales (E/SE) too.
- Bryan Wong, Head of Revenue, is added at the top as Super Admin. The VPs
  report to him. He is the dashboard's persona and the pod's Super Admin.
- Every seeded person gets `hubs: ['sales']`, `access: 'active'`, and
  `lastSignIn: null`. Bryan Wong and a handful of others get recent stamps so
  the State filter has something to show.
- Open roles in the chart (`open: true`) are skipped. They are seats, not
  people.
- Managers named in `reportsTo` that are not themselves in the chart are kept
  as an email string and rendered with the pod's "Not a Collabrium user"
  note.

### Overlay store

localStorage under one key. It holds only records that were added or
changed, keyed by id, a list of removed ids, and a `syncedAt` stamp. Reading
the directory means seed, then overlay applied on top, then removals dropped.
Clearing the key restores the seed exactly.

### Viewer state

localStorage under a second key: the viewer's role, one of Super Admin,
Admin, Leadership. Default Super Admin. The viewer is always Bryan Wong;
only the role line changes. That keeps the demo honest about it being one
person trying on three views.

### Activity matrix

The Mothership tier of the artifact's Activities page, copied as data with
its labels verbatim. Seven groups: Manage workspace, Manage user access,
Sales Board data & targets, Manage external access, Audit & compliance,
Export, Collaborate. Each item lists the business roles that hold it. Super
Admin holds everything. Admin mirrors Leadership, plus the console
items it holds on its own: invite or add a user, assign hubs, deactivate or
remove a user, and the Sales Board data items the artifact gives it.

Two helpers read it:

- `can(activityLabel)` answers whether the current viewer holds the activity.
  Pages call only this. No page hard-codes a role name for gating.
- `scopeWord(role)` returns the Sales Board scope the artifact uses:
  Everything for the admin tiers, Company for Leadership, Own org for Sales
  VP, Own team for Head of Sales and Sales Manager, Own quota for Sales
  (E/SE), and Company for Marketing Services / Product and Creative
  Strategist, whose home cards are all-platform.

## Rules the pages enforce

- Super Admin: everything.
- Admin: add a user, assign hubs, deactivate or remove. Cannot change a
  role. Role selects render as read-only text with the note "A Super Admin
  sets the role." A user added by an Admin lands as Sales (E/SE), and as
  Viewer / Client in Influencer if that hub is ticked.
- Business roles: the directory page refuses with an Admin-only state, and
  the Settings card is shown as unavailable.
- Nobody can raise or lower their own record to or from an admin tier,
  deactivate themselves, or remove themselves.
- The last active Super Admin cannot be deactivated, demoted or removed.
- At least one hub always. The last ticked hub's checkbox is disabled.
- Guards show an inline message next to the control that explains why,
  rather than a silently disabled control.

## The Settings page

`pages/settings.html`, opened from the account menu's Settings item, which
today closes the menu and does nothing. That item becomes a link.

- Same app shell as the dashboard: department switcher, sidebar with Home
  and Feedback, the account row at the foot with its popover. Log out still
  goes to the login page.
- Header mirrors the pod: title "Settings", subtitle "Your account, and who
  may sign in."
- The "Viewing as" control sits on the right of the page header: a small
  segmented control offering Super Admin, Admin, Leadership. It writes the
  viewer state, and the account row and Account card update with it.
- Two cards in the pod's grid, on the design system card component:
  - **Account.** The viewer's email, "Signed in through Astro ID · Super
    Admin" or whichever role is active, and a Sign out button to the login
    page.
  - **Users & roles.** "Who may sign in, which hubs they can open, and what
    they may do there. Synced from Azure AD." and an "Open the directory"
    button to the directory page. For a business-role viewer the card stays
    in place, reads "Admin only", and the button is disabled, so the layout
    does not shift between roles.

## The directory page

`pages/users.html`, aligned to the pod's directory with Mothership's
additions.

**Header.** "Users & roles", subtitle "Who may sign in, which hubs they can
open, and what they may do there." A "New user" button on the right, hidden
for business roles. The same "Viewing as" control as Settings.

**Toolbar.** Search across name, email and role. Three filters, each a
checkbox popover with Clear and Done like the pod: Role, Hub (Sales,
Influencer, Planning), State (Active, Deactivated, Never signed in). On the
right, "Synced 6 Sept, 10:18" from the store's stamp and a "Sync from Azure
AD" button that restamps the time and shows a toast. A one-line note counts
people who have never signed in, with the pod's wording.

**Table.** Design system table, sortable on every column, 50 rows a page
with the same rows selector (25, 50, 100, 250) and pager.

| Column | Shows |
|---|---|
| Person | Name, email underneath. Deactivated rows are dimmed with a Deactivated badge by the name |
| Hubs | One small badge per granted hub |
| Role | Sales-side role. Influencer role underneath in smaller text when granted |
| Can see | The scope word |
| Reports to | Name, email underneath. "Not a Collabrium user, grants no access" when the manager is not in the directory |
| Team | Direct count, or a dash |
| Last sign-in | Date and time, or Never |
| Edit | Pencil, hidden for business roles |

**Add a user.** A modal like the pod's, title "Add a user", subtitle "Search
Azure AD, then give them a role."

- Person: search over org-chart people not yet in the directory, with the
  pod's note that only Astro staff appear and a guest account cannot sign
  in.
- Hubs: three checkboxes, Sales ticked by default, at least one required.
- Role select. Influencer role select appears only when Influencer is
  ticked.
- Under the role, the same plain-language box the pod uses, describing the
  Mothership scope and what the role can do in each ticked hub, pulled from
  the activity matrix.
- For an Admin viewer the role selects are read-only at their defaults with
  the note "A Super Admin sets the role."
- Footer note: "Their reporting line comes from Azure AD and appears after
  the next sync. It is not set here."
- Add is disabled until a person is chosen.

**Edit a user.** Name and email in the header.

- Hubs, Role, Influencer role with the same gating as Add.
- Access select: Active, Deactivated, with the pod's note that deactivating
  keeps their place in the reporting tree, they simply cannot sign in.
- A read-only Azure AD block: Reports to, Network ID, Team, with the pod's
  note that a wrong reporting line is fixed in Azure AD.
- "Remove from workspace" link at the foot, with an inline confirm, for both
  admin tiers.
- Save is disabled until something changes.
- The last-Super-Admin and self-tier guards show an inline message.

**Business role.** The shell renders. The content area shows a centred
"Admin only" state with the sentence "Users & permissions is managed by an
Admin or Super Admin" and a link back to Settings. Nothing from the
directory loads, not even the row count.

## Files

New, in this repo:

- `shared/access.js`: roles, hubs, activity matrix, seed builder from the
  org chart, overlay store, viewer state, `can` and `scopeWord`. Loads in
  the browser as a plain script and in Node for the checks.
- `pages/settings.html` and `pages/users.html`: build-free, each with its
  own shell markup and styles, linking the vendored design system the same
  relative way the other pages do. No new dependencies.

Changed:

- `pages/landing-v3.html`: the account menu's Settings item becomes a link
  to `settings.html`. One line.
- `README.md`: the layout table gains the three new files.

Not in this round: gating the dashboard's own Sales Board editing and bulk
import. The seam is there; those controls can ask `can()` later.

## Testing

There is no test runner in the repo.

- `scripts/check-access.mjs`: loads the access module in Node with a stub
  localStorage and asserts the rules. Admin cannot change a role. The last
  Super Admin cannot be deactivated, demoted or removed. A record cannot
  lose its last hub. The viewer cannot change their own tier. The seed has
  no duplicate emails or ids. Every seeded manager resolves to a record or
  is flagged as external. Clearing the overlay restores the seed.
- Browser verification through the preview, as all three viewers: open both
  pages, add a user, edit hubs and role, deactivate, remove, filter and sort,
  reload to confirm the overlay persists, clear it to confirm the seed
  returns.
