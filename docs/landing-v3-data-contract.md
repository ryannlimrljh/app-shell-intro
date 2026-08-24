# Sales dashboard: data contract

**File:** `pages/landing-v3.html`
**Live:** <https://app-shell-intro.vercel.app/pages/landing-v3.html>

Everything on this board is currently hardcoded. It was transcribed by hand
from `Sales_Leadership_Weekly_07AUG26.pptx` (pipeline export 6 Aug 2026,
billing extracts 6 Aug 2026) and has not moved since. This document is what
you need to replace it with a real source.

The whole thing is one `<script>` inside the page, in an IIFE. The data lives
in a block near the top of it marked:

```
/* ── Source data ──────────────────────────────────────────── */
```

Eleven variables, about 90 lines. Replace those and the board is live. You do
not need to touch anything else, and you should not want to: everything below
them is derived, and most of the page's logic is in the deriving.

---

## Read this first

Three conventions will bite you if you skim.

**1. Every money figure is in RM millions, as a float.** `t:10.2` is RM 10.2
million. `v:0.780` is RM 780,000. There is no separate unit field and no
currency field. The formatter `rm()` decides on its own whether to print
`RM10.2M` or `RM780K`, so if you send absolute ringgit every number on the
board goes up by six orders of magnitude and nothing will look obviously
broken until someone reads it.

**2. Several fields are stated, not derived, and they disagree with the
rounded values beside them.** TV shows `t:10.2, f:10.2, gap:+0.066,
pct:101`. Target and forecast are rounded to one decimal and happen to
match; the gap and the percentage were computed upstream on the unrounded
figures. Do not recompute `gap` as `f - t` or `pct` as `f / t`, and do not
"fix" the inconsistency. Send the precise values from your source for all
four and the board will show them.

**3. There are two horizons and they are not the same shape.** `now` is
August month to date. `next` is September to December. In `HOS_NOW`, the `b`
field is **booked revenue**. In `HOS_NEXT`, the same field name means
**contracted**. That is not a bug, it is what the two periods measure. Keep
them separate all the way through.

A fourth thing worth knowing: `null` is meaningful. It means "the source does
not have this", and the page prints `n/d` for it rather than zero. `0` means
zero. Do not coalesce.

---

## The eleven inputs

### `PLATFORMS`: August by platform

Four rows, one per platform. Drives the "By platform" cards and the platform
slice filter.

| Field | Type | Meaning |
|---|---|---|
| `n` | string | Platform name. Also the join key used by the platform filter and by `DEALS_NOW.x`. Current values: `TV`, `Radio`, `Digital`, `AA` |
| `t` | float | Target |
| `b` | float | Booked |
| `p` | float | Pipeline, open, unweighted |
| `f` | float | Forecast. Booked plus pipeline weighted by the source Win Rate field |
| `gap` | float | Forecast minus target, signed, computed upstream unrounded |
| `pct` | int | Forecast as per cent of target |
| `ly` | int or null | Per cent change against the same period last year |
| `wow` | null | Week on week. **Always null today**, because no weekly snapshot was retained. See "Two things to start doing" below |
| `caveat` | true, optional | Billing window is 24 Jul to 23 Aug rather than the calendar month. Changes the day count the pace calculation uses. Set on Digital and AA |

Contracted deals are removed from pipeline upstream, so `b` and `p` do not
overlap. If your source does not do that, do it before sending, or the
forecast double counts.

### `HOS_NOW`: Head of Sales, August month to date

Nine rows, one per revenue-carrying head. Drives the leaderboard, the KPI
tiles, and everything the org tree derives.

| Field | Type | Meaning |
|---|---|---|
| `n` | string | Short name. **This is the join key** across `HOS_NOW`, `HOS_NEXT`, `HEAT`, `FANDOM`, `TEAMS.k` and `DEALS_*.o`. It must match exactly in all six |
| `t` | float | Target |
| `b` | float | Booked |
| `f` | float | Forecast |
| `gap` | float | Forecast minus target, signed |
| `pct` | int | Forecast as per cent of target |
| `opp` | float or null | Opportunity at 80% or better that is **not yet in forecast**. Headroom, not forecast. Do not add it to `f` |
| `ly` | int or null | Per cent against last year |
| `s` | string | Status: `red`, `amber` or `green`. Stated by the source, not computed from `pct`, so send it |
| `sub` | string, optional | Subtitle under the name. Only Joanne Tan has one today |

### `HOS_NEXT`: Head of Sales, September to December

Same nine people, same field names, **except `b` means contracted, not
booked.** Same join key on `n`.

### `MONTHS` and `MONTHS_TOTAL`: forward outlook by month

Four rows plus a total row. Drives the coverage-by-month block and the stage
breakdown table under it.

| Field | Type | Meaning |
|---|---|---|
| `m` | string | Month label, e.g. `Sep 26`. `MONTHS_TOTAL.m` is `Sep to Dec` |
| `t` | float | Target |
| `c` | float | Contracted |
| `p` | float | Planned pipeline, unweighted |
| `cov` | int | Coverage per cent. Contracted plus unweighted planned pipeline, over target |
| `f` | float | Forecast. Weights that pipeline by win rate |
| `pct` | int | Forecast as per cent of target |
| `won` | float | Won, not yet contracted |
| `e80` | float | Open at 80 per cent |
| `e50` | float | Open at 50 per cent and below |

`MONTHS_TOTAL` is a real row from the source, not the sum of the four. Send
it rather than adding the months up, and expect it not to reconcile exactly.

### `HEAT`: per cent to target, by head by month

Array of arrays, not objects: `['Alvin Wong', 48, 38, 29, 25]`. Name, then
one integer per month in the same order as `MONTHS`. Drives the heatmap.

Nine rows, and the name must match `HOS_NOW.n`.

### `DEALS_NOW`: August deals open at 80%

Ten rows. Drives the "Deals that can still land" table.

| Field | Type | Meaning |
|---|---|---|
| `a` | string | Account name, as it appears in CRM including the shouting |
| `c` | string | Campaign name |
| `ip` | string or null | IP name, joins to `IPS.n`. Null when the deal is not against an IP |
| `x` | string | Platform, joins to `PLATFORMS.n` |
| `v` | float | Value |
| `o` | string | Owner, joins to `HOS_NOW.n` |
| `trunc` | true, optional | The name is truncated in the source itself, at 32 characters. The page marks it so the truncation is not mistaken for its own |

### `DEALS_NEXT`: forward deals at 50% and 80%

Eleven rows, same fields, with two differences:

- `x` is a **month span string**, not a platform. For example `Aug to Nov 26`
  or `Jul to Sep 26, Nov to Dec 26`. It is displayed, never parsed.
- `dup: true` marks a row the source contains twice. It is kept, and marked,
  rather than silently deduplicated. If your source resolves the duplicate,
  drop the flag.

### `FANDOM`: IP contribution by head

Nine rows. Drives the IP spotlight bars.

| Field | Type | Meaning |
|---|---|---|
| `n` | string | Head, joins to `HOS_NOW.n` |
| `jul` | float | July |
| `sd` | float | September to December |
| `full` | float | Full window. Not `jul + sd`; send it |
| `d` | int | Deal count |

### `IPS`: IP spotlight

| Field | Type | Meaning |
|---|---|---|
| `n` | string | IP name, joins to `DEALS_*.ip` |
| `v` | float | Value |
| `d` | int | Deal count |
| `lead` | string | Lead head, joins to `HOS_NOW.n` |

### `TEAMS`: the org tree

The structural input, and the only one that is not figures. Nine heads, each
with pods, each pod with members. Generated from the FY27 Client Solutions
chart (master 15 Jul 2026, team tabs wef 1 Aug 2026).

```js
{
  k: "Alvin Wong",           // join key, must match HOS_NOW.n
  name: "Alvin Wong",        // display name, may be longer than k
  grade: "AVP",
  seg: "Agency",             // segment, shown as the head's subtitle
  vp: "Jeyapuvan",           // joins to VPS
  line: "A",                 // line filter
  team: 9,                   // headcount, used to seed the pod split
  sup: ["Mei Li", "Edwin"],  // support staff, not revenue carrying
  pods: [
    {
      lead: "Ling Chen Lee", // null means "reports direct"
      g: "AVP",              // grade
      seg: "",               // pod segment, optional
      m: [                   // members
        { n: "Fiona Lee", g: "SE" },
        { n: "Open role", g: "", o: 1 }   // o:1 marks a vacant seat
      ]
    }
  ]
}
```

Three heads on the org chart carry no revenue row in the deck and are
deliberately absent: Kenn, Harminder Singh and Yip Siew Ling. If your source
has revenue for them, add them to `HOS_NOW`, `HOS_NEXT` and `HEAT` at the
same time or the tree will not add up.

`VPS` is a flat array of VP names: `['Jeyapuvan', 'Nicholas Teh']`.

### `COMPANY`: company totals

```js
var COMPANY = {
  now:  { t: 26.5,  b: 14.0, p: 8.0,  f: 22.0 },
  next: { t: 110.2, b: 17.4, p: 21.1, f: 26.9 }
};
```

**These do not equal the sum of the nine books, and that is deliberate.** In
August the nine under-account by RM 66K of target, because RM 138K of booked
revenue sits with leads outside the list. On the forward block they
over-allocate by RM 700K, which the source does not explain. The board shows
the difference as its own leaderboard row, labelled "Not on the book list" or
"Over-allocated" depending on the sign, so the tree adds up to the company
rather than to whatever the nine happen to make. See `residualRow()`.

Keep this behaviour. Send the company figure your finance system states and
let the row appear. Forcing them to reconcile hides a real discrepancy.

---

## What the page computes itself

Do not build these in SQL. The board expects to derive them, and if you send
them precomputed they will be recomputed anyway.

- **The org rollup.** Company, VP, head, manager and person levels all come
  out of `HOS_*` plus `TEAMS` via `rowFor()` and `childrenOf()`. Send the
  nine head rows and the tree; the rest is arithmetic.
- **Share of parent**, stamped on every child row so proportions add to 100.
- **Every filter and slice.** Platform, head, status, line, manager, person,
  and the cascade between them.
- **Sorting**, including the attention-needed default.
- **Pace.** Day counts and the daily run rate needed to reach target, using
  the billing window from the `caveat` flag.
- **Every bar, tick, rail and shortfall marker.**
- **The hero cards.** Four of the six rewrite themselves from the filtered
  model on every change.

---

## What is modelled today, and must be replaced

This is the honest list. Each of these is a deterministic placeholder that
draws the right shape from the wrong number. They are all marked in the UI
with a hint the user can hover, so nothing here is passing itself off as
measured, but all of them are waiting on you.

### 1. The head by platform crosstab

**Where:** `PLATC` / `platMul()`, under the comment "Modelled scoping".

The source states revenue by platform and revenue by book, and never crosses
the two. So when someone filters to Digital, the nine books are reshaped onto
Digital's stated total using a deterministic hash, and every level below
inherits that scaling. The comment in the code says it plainly: *"Swap in the
real crosstab and this whole block goes."*

**What we need:** revenue by head **and** platform, for both horizons. Target,
booked and forecast. That is a 9 by 4 grid per horizon. It is the single
highest-value thing on this list, because it is the one people ask for most.

The forward block is worse than the August one: it has no platform split at
all, so August's mix is carried across.

### 2. Manager and person level figures

**Where:** `childrenOf()`, the `mg` and `ex` branches.

Pods and individuals have no figures in the source at all. Today their
targets are reshaped from headcount with a wide spread, because a pod's real
target comes from the client books it carries and books are far less even
than headcount. Booked and forecast are then reshaped off the target so the
percentages stay believable.

**What we need:** target, booked and forecast per pod and per person. If
individual targets are re-cut quarterly, we need the current cut and the date
it was set.

### 3. Last year

**Where:** `lyBase()`, `LY_WHY`.

The source states a vs-last-year **percentage** per platform and per book,
and nothing else. No absolute figure, no company total, no reading at the
same point in the month. Last year is backed out of those percentages, which
are gross against a net book, and its position on 6 August is invented.

**What we need:** last year's actuals at the same point in the period, and
last year's target. The target is a recorded number and resolves cleanly the
moment Sales Ops hands it over. See `LY_TARGET_GROWTH`, which currently
assumes last year's target was 8% below this year's.

### 4. Last month and last quarter

**Where:** `baseFor()`, `cmpWhy()`.

Modelled outright. The 7 August cut carries August and the forward block and
nothing before them, so there is no earlier figure anywhere to reverse
engineer. These resolve the moment weekly snapshots exist.

### 5. Week on week

`PLATFORMS.wow` is null on every row and the board prints `n/d`. The source
shows the same gap, for the same reason.

---

## Two things the database must start doing now

**Retain a weekly snapshot.** Pipeline and forecast are live states of the
system, not recorded figures. Last August's pipeline cannot be rebuilt from
today's database at any price. Every week that passes without a snapshot is a
week of comparison that is permanently unavailable, which makes this the one
request on the board that gets more expensive the longer it waits. A weekly
row per head per platform, carrying target, booked, contracted, pipeline and
forecast, is enough to fill items 3, 4 and 5 above.

**Keep the head name stable, or give us an ID.** Six structures join on the
short name string. The moment someone is renamed in one system and not
another, that person silently splits into two people on the board. A stable
employee ID with the display name alongside it would remove the whole class
of problem, and we will take it in place of the name join wherever you can
give it to us.

---

## How to swap it in

The page has no build step and no framework. Two options.

**Fetch on load, which is what we would do.** Replace the literal
declarations with one call, keeping the same variable names, and call the
board's existing entry point when it resolves. Everything downstream is
already written to run from those names.

```js
fetch('/api/board')
  .then(function (r) { return r.json(); })
  .then(function (d) {
    PLATFORMS = d.platforms;  HOS_NOW = d.hosNow;  HOS_NEXT = d.hosNext;
    MONTHS = d.months;        MONTHS_TOTAL = d.monthsTotal;
    HEAT = d.heat;            DEALS_NOW = d.dealsNow;  DEALS_NEXT = d.dealsNext;
    FANDOM = d.fandom;        IPS = d.ips;
    TEAMS = d.teams;          VPS = d.vps;            COMPANY = d.company;
    applyFilters();           // the board's own redraw
  });
```

Two things to handle that the current page does not, because today the data
cannot fail: a loading state, and an error state. The board renders
synchronously from literals right now, so it has neither.

**Or generate the block server side** and keep the page static. Same shapes,
no fetch, no states to add. Worth it if this stays a weekly cut rather than
becoming live.

There is a working example of the fetch pattern already in the repo:
`api/feedback.mjs` with `pages/feedback-v1.html`. It is a Vercel serverless
function on Neon Postgres, and it shows the shape we use for degrading
politely when the backend is not there.

---

## Suggested payload

One document, because the board reads everything at once and re-derives on
every filter change. It is roughly 6 KB of JSON today.

```json
{
  "cut": "2026-08-06",
  "generated": "2026-08-07T09:14:00+08:00",
  "currency": "MYR",
  "unit": "millions",
  "platforms": [ ... ],
  "hosNow": [ ... ],
  "hosNext": [ ... ],
  "months": [ ... ],
  "monthsTotal": { ... },
  "heat": [ ["Alvin Wong", 48, 38, 29, 25] ],
  "dealsNow": [ ... ],
  "dealsNext": [ ... ],
  "fandom": [ ... ],
  "ips": [ ... ],
  "teams": [ ... ],
  "vps": ["Jeyapuvan", "Nicholas Teh"],
  "company": { "now": { ... }, "next": { ... } }
}
```

`cut` and `generated` are new and we want them. The board currently states
"7 August 2026" in three places as static text, and it will go stale without
anyone noticing.

If you can also give us `hosByPlatform` as a 9 by 4 grid per horizon, item 1
of the modelled list disappears on the day you ship it.

---

## Acceptance checks

Worth running before you hand it over, in this order.

1. **Units.** The August company target reads `RM26.5M`, not `RM26,500,000M`.
2. **The join.** Every `HOS_NOW.n` appears in `HOS_NEXT`, `HEAT`, `FANDOM.n`
   and `TEAMS.k`, and every `DEALS_*.o` and `IPS.lead` matches one of them.
   A mismatch does not throw, it silently drops a row.
3. **The residual.** The leaderboard shows either "Not on the book list" or
   "Over-allocated" unless the nine books sum exactly to `COMPANY`. If it
   vanishes, check whether something reconciled them on the way through.
4. **Nulls survived.** Heads with no `opp` and no `ly` print `n/d`, not `RM0`
   and not `0%`.
5. **Both horizons.** Toggle "To date" and "Sep to Dec" and confirm the
   leaderboard, KPIs, deals table and hero cards all change.
6. **A slice reaches the tree.** Filter to one platform and confirm the
   leaderboard sums to the tile above it. If you have shipped the real
   crosstab, also confirm the "modelled" hint has stopped appearing on
   those rows.
7. **The console is clean.** Open it, change every filter once, and confirm
   nothing is thrown and no figure reads `NaN`.

---

## Questions worth answering before you start

- Is the cut weekly, or do you want this live? Live changes the answer on
  caching, on the loading state, and on whether `MONTHS_TOTAL` can drift from
  its own rows mid-read.
- Can we have an employee ID instead of the name join?
- Does the crosstab in item 1 exist anywhere already, even as a report
  someone runs by hand? It changes what the board can honestly show more than
  anything else on this list.
- Who owns last year's target? It is the one modelled figure that resolves
  with a single number rather than a system change.
