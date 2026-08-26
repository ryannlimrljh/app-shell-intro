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
| `pages/feedback-v1.html` | the feedback board for the 30-day pioneer group. Second item in the sidebar, on `api/feedback.mjs` |
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

## The feedback board

`pages/feedback-v1.html`, reached from the second item in the sidebar. It is
where the ten people using this during the
first 30 days say what got in their way, back each other's requests, and see
what happened to them. Backed
by `api/feedback.mjs` on the same Neon database as the notes, and it degrades
the same way: no database means `{"configured": false}` and the board runs on
`localStorage`.

**The standing "this board is on your device only" banner is deliberately
gone** while the shared store is still being decided — acknowledged rather
than overlooked. The signal that survives is the one tied to an action: a
write that cannot reach the group raises a toast at the moment it fails, and
the Posted toast still says which of the two happened. A banner that is
always there stops being read; a message about the thing you just did does
not. The recipe is still in the stylesheet under `.fb-offline` to put back
with.

It is a wall of paper, not a list. Notes are square and placed by a layout
pass rather than flowed by the browser: they overlap, they tilt, and moving
the pointer across them pushes the neighbours aside and squares up the one
underneath, which is how anybody reads a pile they have not sorted yet.
Square is doing work beyond the look — every tile is the same height, so a
row cannot end up with one note twice the depth of its neighbours and a
ragged band of canvas under the short ones. The tilt runs to about ±4.5°,
deterministic from the note's id so a redraw never reshuffles the wall;
below roughly ±1.5° the squares read as a slightly sloppy grid rather than
as paper somebody put up by hand, and past about 6° it stops looking like a
hand and starts looking like a mistake.

**Rearranging is a move, not a cut.** `render()` rebuilds the canvas from
scratch, so the notes that come back are different elements with no memory
of where they were — pressing Cluster changed the board's shape in a single
frame. The redraw now measures every note's rect first, puts each one back
where it was with a transform, and lets it travel, staggered by reading
order and capped so a large board has no note starting half a second late.
Notes that were not on the board a moment ago have nowhere to travel from
and simply appear. Below two notes wide the overlap
stops, because a half-hidden note on a phone has no pointer to part it.

The rail minimises itself about a second and a half after load, the way the
dashboard's does once its intro has played. It stands down on a click on
the rail, not on a hover: you arrive here by clicking Feedback in the rail,
so the pointer is already sitting on it when the page loads, and cancelling
on pointerenter meant the first small movement kept the nav open for
exactly the person who came in through it. The canvas below spans the
shell's full width — there is no reading measure to hold on a wall of
paper, and every extra hundred pixels is roughly another half a note per
row.

Three rules do the work:

- **Five open votes each.** Voting for everything is the same as voting
  for nothing; with ten people an uncapped board just ranks whoever posted
  first. Shipping a request releases the votes on it, so delivering
  something hands everyone their vote back. The budget reads as five dots
  and the word *Votes*: black for a vote you still have, an outlined white
  circle for one you have spent. Since the count now lives in the shape
  alone, the pill carries an `aria-label` that spells it out and
  `renderBudget()` keeps that in step.
- **Cluster is something you press,** not something the board does behind
  your back. It groups by the word a set of notes has in common, ranked by
  where that word appears rather than how rare it is, because people put
  the subject of a complaint at the front. Each drift is named by the word
  that grouped it and prints the other words the group shares, so a
  grouping can be checked rather than trusted. No box is drawn around a
  drift: the clustering is not confident enough to promise a boundary, and
  a note is allowed to sit at the edge of one.
- **New, Planned, Shipped,** each stamped with who moved it. Anyone can
  move anything; with no roles to check, naming the person is the only
  accountability available.

**A note's colour is its place in the posting sequence,** cycling through
the five elements, so the wall looks like five colours of paper somebody
grabbed in turn. It is keyed to the row's `seq`, which is assigned once and
never reused: keyed to a position in the list instead, withdrawing one note
would repaint every note after it. Colour deliberately does not mean cluster
membership, because the clustering changes under a live board and a note
that changes colour while you are looking at it is unsettling.

Fills and text are both the dashboard's: white on all five papers, which is
the reference look and was chosen with the numbers on the table. White
measures 3.15 on Fire, 2.49 on Wood, 6.02 on Earth, 4.54 on Water and 7.13
on Gold, so the note's own prose is under the 4.5 floor on two of the five.
Everything interactive is a white chip rather than white type, and those
clear it comfortably (5.9 to 7.78), which confines the shortfall to the
sentence itself on Fire and Wood.

**Writing one is a note, and so is reading one.** There is no modal on this
page and no scrim: a white dialog over a wall of coloured paper was the one
place the board stopped looking like what it is. Add feedback swings a
sticky out of the button in the dashboard's own `np-swing`, in the colour
the note is about to become; clicking a note on the canvas swings the same
sticky out of that note's own tile, in that note's colour, and the tile
stands down while it is open so there is one of each note on screen. Both
carry the dashboard's anatomy — `Signing in as` / `Note by`, the hairline,
the `Note · August` kicker, Cancel and a dark primary under a second
hairline. An opened note is 440px against the tile's 210, better than twice
its edge, with a deeper shadow and the sentence at body1: at the compose
box's 360 it read as a slightly grown tile rather than as the note opened
up. Posting folds the panel down on its own top edge and then flies it
onto the spot the canvas has just made for it, so what you see is a sheet
being folded and put on the wall. Screenshots attach by click, drag or paste, using the DS
FileUploader with its two Neutral-ground colours overridden to sit on a
saturated fill. They are downscaled to 1200px in the browser before they go
anywhere and stored in `feedback_images`, not on the note: the board is read
whole on a timer, so the note carries a thumbnail and the full grab is
fetched only when someone opens it.

**What the grouping cannot do:** it matches words, not meanings. "Slow" and
"laggy" will not meet. The mitigation is the duplicate nudge while you type,
which runs the same matcher at a lower bar and offers to add your vote to a
near-match instead of posting a second copy. Its rows sit on `--np-ink`, the
element's own hue taken dark — the same value the vote chip and the avatar
already use, so it is the note's paper in shadow rather than a new colour.
They were Neutral-2, which over a saturated fill read as translucent white
boxes stuck on the note. White on the recess clears the floor on all five
papers (5.9 to 7.78) and separates from the fill it sits on by 1.7 to 3.0. It was measured on a labelled
set at three board sizes rather than tuned by eye; the thresholds and what
they were measured against are in the comments at the top of the script.

**Reduced motion does not just remove the movement,** which would leave the
overlap in place with no way to part it. The layout pass stops overlapping
the notes entirely, so nothing is hidden and nothing needs pushing aside.

**No authentication,** exactly as with notes. The signed-in name is read off
the shell, so `author` is whatever the page claims and anyone with the URL
can post, vote and set status. Ten colleagues who know each other for thirty
days is the whole security model.

## Known gaps

- **1280×720** — the hero fold overflows by 22px. At 380px cards the four
  canvas elements need a 756px fold. Fine at 768 and up.
- **The rep quadrant chart** in Performance Space's three-up row renders at
  0.62 of its authored size, putting its 8.5px type near 5px. It needs a
  narrower viewBox or a reduced label set.
- **Three components** are still hand-rolled where the design system now ships
  equivalents — see the table at the end of `scripts/README.md`.
