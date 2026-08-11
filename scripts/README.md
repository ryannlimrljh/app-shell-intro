# Staying in sync with the Collabrium design system

```bash
npm run sync:ds              # fetch, update collabrium-dls/, report what broke
npm run sync:ds -- --check   # report only, change nothing
```

Run it whenever a teammate lands design-system work, and before any deploy. It
exits non-zero when something needs migrating, so it also works as a gate in a
hook or CI later.

## Topology

This project is standalone. The design system lives in a **different repo**,
reached through a fetch-only remote:

| Remote | Repo | Role |
|---|---|---|
| `origin` | `ryannlimrljh/app-shell-intro` | ours. The Vercel deploy target. `git push origin main` |
| `collabrium-ds` | `astroproductdesign/Collabrium-DS` | the team's design system. **Fetch only** — its push URL is deliberately set to a bogus value so a stray `git push collabrium-ds` fails loudly instead of landing a prototype in the team repo. |

`collabrium-dls/` here is a **vendored copy** of that repo's `collabrium-dls/`
directory. The page links `../collabrium-dls/tokens.css` and `components.css`
directly, so whatever is checked out here is what renders.

If the remote is ever missing, the script says so and gives you the command:

```bash
git remote add collabrium-ds https://github.com/astroproductdesign/Collabrium-DS.git
```

## Why a path-scoped checkout and not a merge

The two repos share history — this project began life as a branch of that one —
so git *can* merge them, and that is exactly what to avoid. That repo carries
1,763 files this project has no use for, including a vendored copy of Chart.js.
A merge would pull all of it into a prototype that deploys as static files.

The script does `git checkout collabrium-ds/main -- collabrium-dls/`: the one
path the page actually links, and nothing else.

## Why the `?v=` on the stylesheet links

The script rewrites the two `<link>` hrefs to `?v=<upstream-sha>` on every sync.
Without it a browser holding the old CSS keeps serving it after a successful
pull, and the sync looks like it did nothing — that happened on the first run:
`components.css` on disk had `.c-search-input-avatar` while the live page still
had `.c-userpicker` rules applying. The SHA changes exactly when the content
does, so the refetch is automatic.

## What the drift check looks for

Refreshing CSS is the easy half. The half that bites is a class the page uses
that the system renamed or dropped: nothing errors, the rule stops existing,
and the element quietly loses its styling. Three checks, because each catches
something the others miss:

| Check | Catches | Missed by |
|---|---|---|
| **DROPPED UPSTREAM** | the class was in the old `components.css`, not in the new one | only fires during an actual update |
| **UNSTYLED** | neither the system nor the page's `<style>` defines it | a page-local *state* rule (`.is-collapsed .c-userpicker-text`) is enough to hide a class here while its base styling has vanished |
| **RULES REMOVED** | the class survives but a selector targeting it is gone | nothing — this is the sharpest one |

All three earned their place on the first run:

- **DROPPED UPSTREAM** found the `.c-userpicker-*` → `.c-search-input-*` rename
  (4 classes; the system rebuilt User picker as Search input and the
  declarations came across byte-identical).
- **RULES REMOVED** found `.c-sidebar-logo img{height:22px}` gone while
  `.c-sidebar-logo` stayed — the sidebar logo had blown up to its intrinsic
  size and nothing else flagged it.
- **UNSTYLED** found `.c-space-tabs-w`, a wrapper around the word "Space" in
  the space tabs that had never had a rule written for it. At 375px the two
  tabs wanted 291px inside a 223px bar.

### What it cannot catch

A rule whose **declarations** changed — same selector, different values. If
upstream restyles `.c-card` from an 8px radius to 12px, the page just looks
different and the check stays quiet. Read `git diff collabrium-dls/` after a
sync, and compare against <https://collabrium-dls.vercel.app/#components>.

## Adding another page

Append it to `PAGES` in `sync-collabrium-ds.py`. Deliberately a list, not a
glob over `pages/*.html`: a page that does not link the design system would
produce nothing but false findings.

## Components we hand-rolled that the system now ships

Not migrated, and each is a real decision rather than an oversight:

| Ours | Used | Upstream now has |
|---|---|---|
| `.c-fpill` | 22× | `.c-chip-filter` / `.c-chip-group` |
| `.c-chat-fpill` | 12× | `.c-chip-filter` |
| `.seg-toggle` | 41× | `.c-segctl` / `.c-seg-pill` |

The main nav's department switcher **was** migrated — see the
`.c-dept-trigger` / `.c-dept-dropdown` work — so that pattern is the worked
example for doing the rest. Migrating the remaining three **will** change how
the filters and toggles look; the system's versions are not pixel-identical to
what is on the page. Worth doing as its own pass, against the live reference,
not folded into a sync.
