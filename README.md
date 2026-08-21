# App Shell Intro

A build-free prototype of the Collabrium app shell: an intro sequence, a hero
card fan, an assistant, and two working spaces — Decision Space and Performance
Space.

Live: <https://app-shell-intro.vercel.app/> (the login screen, which signs you
into v3)

## Run it

```bash
python3 -m http.server 8791
```

Then <http://localhost:8791/pages/login-v1.html> to start where a visitor
starts, <http://localhost:8791/pages/landing-v3.html> for the version the
login now serves, <http://localhost:8791/pages/landing-v2.html> for v2 on its
own, or <http://localhost:8791/pages/landing-v1.html> for the frozen one.

`/` redirects to **the login screen**, and its Astro ID button goes to **v3**.
That is the whole route: there is no identity provider behind the button, it
plays the state a real redirect would put you in and then lands on the app
shell. Before 11 Aug the root pointed at v1 instead, so if you are looking for
the frozen version it is now only reachable at its own path.

No build step, no framework, no bundler at serve time. `pages/landing-v1.html`
is one self-contained file — markup, a `<style>` block and its scripts — linking
only the design system's two stylesheets.

**If a change does not appear, add a cache-buster** (`?v=2`). The dev server
serves `Last-Modified` and browsers hold onto this page.

## Layout

| Path | What it is |
|---|---|
| `pages/login-v1.html` | the login screen, and what `/` serves. Signs into v3 |
| `pages/landing-v3.html` | what the login signs into. The variant whose board consumes real `collabrium-dls` component classes rather than restating their values |
| `pages/landing-v2.html` | **the working version. New implementation goes here.** The by-value reference v3 is diffed against |
| `pages/landing-v1.html` | the previous version, frozen. Kept so v2 can be diffed against it |
| `pages/assets/charts.bundle.js` | committed chart bundle — built, not hand-edited |
| `pages/decision-workspace-v2.html` | the pre-port snapshot two comments in the page cite as provenance. Kept for that reason, and excluded from the deploy by `.vercelignore`. |
| `pages/leadership-dashboard-tracker.html` | the reference board Performance Space was ported from |
| `charts/src/*.jsx` | visx source for the ten Performance Space boards |
| `collabrium-dls/` | **vendored** design system. Do not hand-edit — see below. |
| `scripts/` | the design-system sync tool and its notes |
| `docs/superpowers/` | **historical** specs and plans, dated. They describe the state at the time they were written, including a working directory this project no longer lives in. Read them as a record, not as instructions. |

## The design system is a dependency, not our code

`collabrium-dls/` is a vendored copy of a directory in the team's repo
(`astroproductdesign/Collabrium-DS`), pulled through a fetch-only
`collabrium-ds` remote.

**This project's copy is the only one it reads.** Every link in the page is
relative (`../collabrium-dls/tokens.css`), so it resolves inside this folder and
nowhere else. That matters because several other copies exist on this machine,
at various ages:

| Copy | State |
|---|---|
| `mothership/collabrium-dls/` | **this one.** Current, and what the page loads |
| `~/Documents/GitHub/Collabrium-DS/collabrium-dls/` | the old home. Same content today, but it drifts the moment either side syncs |
| `~/.claude/skills/collabrium-dls/` | the installed Claude skill. Stale, and has no `components.css` at all |
| `~/Desktop/collabrium-dls/`, `~/Desktop/Collabrium-DS-main/` | older loose copies |

If a component ever looks wrong, check which copy you are reading before you
change anything. Run `npm run sync:ds` to bring this one current; the others are
not this project's business.

```bash
npm run sync:ds              # pull the latest, and report what it breaks here
npm run sync:ds -- --check   # report only
```

Never hand-edit anything under `collabrium-dls/` — the next sync overwrites it,
and the script refuses to run while that directory has uncommitted changes.
Read `scripts/README.md` before the first sync; the drift check is the point of
the tool, and it has already caught three silent breakages.

## Rebuilding the charts

```bash
npm run build:charts
```

Bundles `charts/src/charts.jsx` (visx + React 19) to an IIFE at
`pages/assets/charts.bundle.js`. The output is **committed** on purpose, so the
page stays build-free at deploy time and pulls no chart code from a CDN at
runtime. Rebuild and commit whenever `charts/src/` changes.

## Deploying

```bash
git push origin main
```

Vercel builds `origin` (`ryannlimrljh/app-shell-intro`) and serves the repo as
static files. `vercel.json` redirects `/` to the login screen; `.vercelignore` keeps
`pages/decision-workspace-v2.html` off the deploy, because it is a pre-port
snapshot whose copy and numbers now contradict the live page.

Anything committed under `pages/` is reachable at a public URL. That is the
whole deployment model, and the reason `.vercelignore` exists.

## Shared notes

`api/notes.mjs` is the one serverless function in the project. It backs the
notes on the leaderboard and the deals table with Postgres, so a note written
on one machine is visible on every other. Without it the board keeps notes in
the writer's own browser and nobody else ever sees them.

**It is off until a database is attached, and that is deliberate.** With no
connection string in the environment the function answers `200
{"configured": false}` rather than an error, and the board silently keeps its
browser-local behaviour. So this ships safely before anyone touches the Vercel
dashboard, and lights up the moment they do.

To turn it on, once:

1. Vercel dashboard → the `app-shell-intro` project → **Storage** → **Create
   database** → **Neon** (Postgres). The free tier is ample here.
2. Accept the default of connecting it to this project. That is the whole
   step: Vercel writes `DATABASE_URL` into the project's environment itself.
3. Redeploy (or push anything). The function creates its own table on first
   call — there is no migration to run.

The first time each person opens the page after that, whatever notes their
browser was holding are uploaded once and then marked, so nothing anybody
wrote is stranded and nothing is uploaded twice.

**No authentication.** The login screen is a prop, so `author` is whatever the
page claims and anyone with the URL can read and write every note. That is a
prototype trade, not an oversight: do not put anything sensitive in a note
until real sign-in exists.

Local development does not have the function — `python3 -m http.server` serves
static files only, so `/api/notes` 404s and the board falls back to
browser-local notes, which is the same path as an unconfigured deploy. To
exercise the shared path locally, run `vercel dev` instead.

## Known gaps

- **1280×720** — the hero fold overflows by 22px. At 380px cards the four
  canvas elements need a 756px fold. Fine at 768 and up.
- **The rep quadrant chart** in Performance Space's three-up row renders at
  0.62 of its authored size, putting its 8.5px type near 5px. It needs a
  narrower viewBox or a reduced label set.
- **Three components** are still hand-rolled where the design system now ships
  equivalents — see the table at the end of `scripts/README.md`.
