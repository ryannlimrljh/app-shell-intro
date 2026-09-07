# Roles & permissions: Super Admin edits what each role can do

Date: 7 September 2026
Status: approved in conversation, building

## What this is

A third card on Settings, Roles & permissions, opening a page where a Super
Admin adjusts the activity matrix behind every role: roles down the left
with a user count, the activity groups on the right with a switch per
activity, one tab per matrix. It is the artifact's Activities page made
editable, which is what that page says it is modelled on, "a standard admin
permissions screen". The artifact marks the Mothership allocation as
proposed, to confirm with each team; this is where that confirmation lands
without a code change.

## Decisions

1. **Per role, never per person.** The directory's record model stays: the
   role decides. No per-user overrides.
2. **Super Admin edits, Admin reads, business roles are refused.** The view
   is gated on the same activity that gates the directory; editing is gated
   on "Assign or change a user's role", which only Super Admin holds.
3. **Mothership only, for now.** The page shows the Mothership matrix. Each
   hub's own matrix (Collab: Sales, Collab: Influencer) is set inside that
   hub's pod; the module still carries both, with their checks, so the tabs
   can return when the pods hand that over.
4. **Locks.** Super Admin's own row is locked to everything: the ceiling
   cannot lower itself. Items the artifact marks Super Admin only stay
   locked for every other role. A locked switch shows a lock and a reason.
5. **Admin's mirror of Leadership becomes explicit on first edit.** Today
   Admin holds whatever Leadership holds by rule. The first edit that
   touches Leadership or Admin on the Mothership tab materialises Admin's
   current set into explicit values, so an edit to Leadership no longer
   silently changes Admin.
6. **Defaults never change.** Edits are overrides in the browser overlay,
   keyed by matrix, role and activity label. Each role shows "Modified from
   default" and a Reset that drops its overrides.
7. **Every change is logged.** The overlay keeps who, when, matrix, role,
   activity and value; the role header shows the last change. In the real
   build this is the audit log.
8. **Everything that reads the matrix sees the overrides.** The directory's
   role checklist and the Settings gating read through the same function,
   so an edit here shows there at once.

## Data

In `shared/access.js`:

- `MATRICES`: `{ mothership, sales, influencer }`, each with `title`, the
  role list it applies to, its groups, and the default rule (Mothership:
  Super Admin all, Admin mirrors Leadership plus its own items; hubs: Super
  Admin and Admin all except `superOnly` items).
- `holdsIn(matrix, role, label)`: override if set, else the default.
  `holds(role, label)` stays as the Mothership shorthand.
- Overrides in localStorage under one key: `{ o: { matrix: { role: { label:
  bool } } }, log: [ { at, by, matrix, role, label, value } ] }`. Loaded
  once per page with `loadOverrides(storage)`.
- `setOverride(storage, viewer, matrix, role, label, value)`, `resetRole`,
  `isModified`, `lastChange`, `lockReason(matrix, role, label)` returning
  null or the sentence shown.

## The page

`pages/roles.html`, same shell as the other two pages, back arrow to
Settings, the "Viewing as" control. Tabs across the top for the three
matrices. Left: one card per role, radio-style, name, a one-line meaning,
and the count of directory users carrying that role (Influencer tab counts
by Influencer role). Right: the role's name and count as the heading, the
Modified badge, Reset, the last change line; then each group as a section
with a row per activity: label, a short helper where the label needs one,
and a switch. Locked rows show the lock and the reason in place of the
switch's hover. Admin sees every switch disabled with the note "A Super
Admin sets roles." Business roles get the Admin-only state.

Settings gains the card: "Roles & permissions. What each role may do, in
Mothership and in every hub. Super Admin edits, Admin views." with an
"Open roles" button, greyed with "Admin only" for business roles.

## Checks

`scripts/check-access.mjs` gains: defaults per matrix (Influencer Manager
cannot manage users; Marketing Services edits inventory in Sales; Admin
equals Super Admin in Sales except the Super Admin only item; Viewer holds
only the two respond items), override set and read, reset, modified flag,
Super Admin row locked, superOnly locked for others, the mirror
materialised on first edit, the log entry written, garbage in storage
ignored.
