# Mode 3 — The Decision Workspace

**Status:** In implementation — see `docs/superpowers/plans/2026-08-08-mode3-decision-workspace.md` and its Deviations section for what has shipped
**Date:** 2026-08-08
**File:** `pages/leadership-dashboard-tracker.html` (git-tracked canonical; publishes to artifact `886c79d5-fc33-4625-ac36-13a32ba2aa1a`)
**Supersedes nothing.** Modes 1 and 2 stay exactly as they are.

---

## 1. Why this exists

Mode 2 was reviewed as *strategically comprehensive but experientially flat* — "a very good analyst's executive memo placed into a UI, rather than a leadership workspace." The review listed 5 content gaps and 7 experience gaps. Those 12 items collapse into three structural failures and one separate axis:

| # | Root cause | Symptoms it explains |
|---|---|---|
| **A** | **Ordered by analysis, not by decision.** Mode 2's sections are named after chart types. A leader's head is organised by decision. | Equal visual importance · text-conclusiveness · the fuzzy "top 3" · no drill-through · visual system not carrying signal |
| **B** | **No clock.** Nothing on the page knows what it said last week. | No "since last review" · no forecast-accuracy history · no trend velocity · no action log |
| **C** | **No consequence.** An action is a verb with no owner, deadline, stake, status, or return path. | Actions lack commitment and closure |
| — | *Separate axis:* four uncovered subject areas (commercial mix, retention health, cash & delivery, operating cadence) | The "something is missing" feeling |

You can't tier what isn't ordered by stakes, and you can't drill through a page whose objects are charts instead of questions. Fixing A moves five symptoms at once.

**Mode 3 addresses A and C directly, and uses B as the mechanism that makes C visible.** The separate axis is deliberately out of scope — see §9.

### Three positions taken, with reasons

1. **Mode 3 does not do the daily-command-centre job.** The review diagnosed "two competing products" and then prescribed a third view containing a health strip *and* daily focus items *and* drivers *and* evidence — which re-creates the same abruptness one level up. The daily job already has a home in `pages/app-shell-intro.html`, whose canvas hero now deliberately holds the fold with greeting-and-cards and puts the board a full screen below. Mode 3 takes the executive job and declines the daily one.

2. **The narrative captions are the asset, not the flaw.** The review called them "too text-conclusive" while separately naming "it does not stop at RM 17.1M short" as the board's strongest quality. Both are true because the problem is not that conclusions are stated — it is that they are stated *at equal volume, all at once, in one place*. That is a placement problem. Mode 3 solves it with progressive disclosure and keeps every word.

3. **Four interactions, not six.** The review asked for clickable metrics, decision drawers, cross-filtering, comparison mode, saved views, and contextual AI. In a static single-file artifact with no data layer, six half-working affordances read worse than three that respond. See §6 for what is built and what is dropped.

### Thesis

> Mode 2 says *here is everything we know*. Mode 3 says *here are the three decisions only you can make this week — and the evidence is one click away.*

---

## 2. Page structure

Six layers, top to bottom.

| Layer | Content | Job |
|---|---|---|
| **Posture** | One sentence on where the business stands, plus a "since last review" delta line | Orientation before decisions |
| **Health** | 6 metrics, each with direction *and* velocity. No charts. | Calm context that does not compete with the decisions |
| **Now** | Decision cards at full weight, filtered by horizon | The actual product |
| **Also open** | Off-horizon decisions, demoted to the compact treatment. Not a separate widget — the same seven cards in the same container, reordered by the horizon filter (§6 I3). | Shows the horizon filter has teeth |
| **Watch** | 4 compact cards, threshold-only, **no buttons** | The tier *is* the guidance |
| **Evidence** | 9 titled rows deep-linking into Mode 2 | Progressive disclosure, zero duplication |
| **Log** | What was decided, when, and what happened since | The closure loop |

Mode 3 hides the role tabs (leadership-level, as Mode 2 already does), the media/segment filter chips (dead affordances — no filtering is implemented), and the MTD/QTD/YTD period control (the horizon filter replaces it, answering the review's operating-cadence ask).

---

## 3. Copy

**Mode button:** kicker `Mode 3`, title `The decision workspace`, description `Experience-led — decisions first, evidence on demand`.

**Section title / subtitle:** `Three decisions this week` / `Ordered by what is at stake, not by what is easy to chart`

**Banner:** *"**This mode reorders, it does not add.** Every figure comes from Mode 2 — the same forecast, the same concentration, the same fill rates. What changes is the ordering: decisions are the objects and the charts became their evidence. Roughly a third of the fields here — every deadline, every status, the cash metric and all "since last review" deltas — are an operating layer no dataset supplies. Those carry the pending marker."*

**Posture line:** *"Revenue is growing and margin is improving, but plan and share are both at risk. RM 111.2M of pipeline is open against a RM 17.1M gap, so the shortfall is a conversion question — while Digital's unsold shelf and RM 4.4M of lapsed revenue say the demand underneath it is thinner than the growth rate suggests."*

**Delta line** (all pending): *"Since Monday: weighted forecast +RM 1.2M · one negotiation-stage deal slipped to Q4 · the Petronas Q3 reset is 7 days undiarised · no decisions closed."*

**Footer addition:** *"**Mode 3** is an experience study, not new analysis. It proves that the same content ordered by decision reads differently from the same content ordered by chart."*

---

## 4. Health strip — 6 metrics

Each carries a value, a direction, and where possible a velocity. Provenance marker in brackets.

| Metric | Value | Direction / velocity | Provenance |
|---|---|---|---|
| Forecast to plan | RM 222.9M of RM 240.0M | RM 17.1M short · +RM 1.2M since Monday | value **confirmed**, velocity **pending** |
| Gross margin | 31.4% | +0.8pt vs LY — the only headline metric improving | **confirmed** |
| Net revenue retention | 97.3% | lapsed RM 4.4M YTD | **derived** — see note below |
| Share of market | 13.8% | −0.4pt YTD · accelerating, −0.2pt in the last 60 days | value **confirmed**, velocity **pending** |
| Cash & delivery risk | RM 12.4M overdue > 60 days | booked-to-billed 94% | **pending** |
| Decisions | 3 due this week | 1 stalled · 0 closed since last review | **pending** (operating layer) |

The three counts are defined, not decorative — see §6 I2 for the recompute rule. *Due this week* = the three `week`-horizon decisions. *Stalled* = D6, which was decided on 5 Aug and is still undiarised at 7 days; it is quarter-horizon, so "stalled" deliberately counts across all horizons while "due this week" does not. *Closed since last review* starts at zero, which is the point: the strip opens by telling the reader that nothing has been finished.

**NRR is derived, not invented.** The growth bridge already gives every term: opening base RM 139.3M, existing-account growth +RM 4.8M, lapsed −RM 8.6M. `(139.3 + 4.8 − 8.6) / 139.3 = 97.3%`. It carries the **Derived** tag naming the bridge as its source, exactly as Mode 1's computed figures do. New advertisers (+RM 12.7M) are correctly excluded — NRR measures the existing book only.

---

## 5. The decision object

Seven objects. Six are the existing recommended-actions table rows promoted from a footnote to first-class objects; the seventh (D1) is new but **derived** — it is the fan chart's own conclusion given a decision framing, not invented data.

### Fields

Every card carries eight fields in this order:

1. **Headline** — phrased as a decision, not a finding. "Close the RM 17.1M gap", not "RM 17.1M short".
2. **Because** — the evidence in one sentence, with its number.
3. **At stake** — revenue and gross profit. Gross profit is stated as *"at the blended 31.4% margin"* so it reads as derived rather than as a separate figure.
4. **Owner** — named individual, plus accountable leader.
5. **By** — a date, never "this week". *(pending)*
6. **Success looks like** — an observable outcome.
7. **Escalation** — what only leadership can unlock, or explicitly "none". *(pending)*
8. **Status** — chip, cycles. *(pending)*

Plus an action row of commitment verbs — `Approve` / `Ask for options` / `Defer with reason` — not navigation verbs. The review's objection to "Book save call" was that it does not change the operating system; these do.

### The seven

| Id | Decision | Stake (rev / GP) | Owner · accountable | Horizon | Tier | Evidence panel |
|---|---|---|---|---|---|---|
| D1 | Close the RM 17.1M gap — name the eight deals | 17.1 / 5.4 | Sales lead · Bryan Wong | week | urgent | Cumulative revenue against plan + Pipeline by stage |
| D2 | Name an executive sponsor for each top-five account | 56.3 / 17.7 | Leadership · Bryan Wong | week | urgent | How much rests on how few |
| D3 | Fund Digital demand, not inventory | 5.1 / 1.6 | Daniel Tan · Sales lead | week | risk | Sold against what we had to sell |
| D4 | Buy more addressable inventory | 2.6 / 0.8 | Aisyah Rahman · Leadership | quarter | opportunity | Sold against what we had to sell |
| D5 | Move Daniel to prospecting, not closing | 2.4 / 0.8 | Sales lead · Bryan Wong | quarter | risk | Which reps are actually at risk |
| D6 | Diarise Petronas for the Q3 budget reset | 2.1 / 0.7 | Aisyah Rahman · Sales lead | quarter | risk | Why RM 4.4M walked |
| D7 | Take the share question to the board | 4.3 / 1.4 | Leadership · Bryan Wong | FY | strategic | Us against the market |

Gross profit column is `stake × 31.4%`, rounded to one decimal: 5.4, 17.7, 1.6, 0.8, 0.8, 0.7, 1.4.

### Full field content

**D1 — Close the RM 17.1M gap: name the eight deals** · urgent · week
- *Because:* Weighted forecast lands RM 222.9M against a RM 240.0M plan. RM 111.2M is open across 73 deals; RM 51.2M of it sits in Negotiation at 50% probability and averages 41 days — the oldest cohort.
- *At stake:* RM 17.1M revenue · RM 5.4M gross profit at the blended 31.4% margin
- *Owner:* Sales lead · accountable: Bryan Wong
- *By:* 15 Aug — before the Q3 forecast lock *(pending)*
- *Success:* Eight named deals with an executive sponsor each, together covering RM 17.1M weighted
- *Escalation:* Rate approval above 12% discount *(pending)*

**D2 — Name an executive sponsor for each top-five account** · urgent · week
- *Because:* The top five advertisers carry 38% of revenue — RM 56.3M. At 9.2% no single account can sink the year, but losing two breaches plan.
- *At stake:* RM 56.3M revenue · RM 17.7M gross profit at the blended 31.4% margin
- *Owner:* Leadership · accountable: Bryan Wong
- *By:* 12 Aug *(pending)*
- *Success:* Five accounts, five named sponsors, a first contact logged against each
- *Escalation:* Leadership allocation — nobody below this level can assign an executive

**D3 — Fund Digital demand, not inventory** · risk · week
- *Because:* Digital sold 62% of its inventory and reached 75% of target. The shelf was full, so the constraint is demand, not supply.
- *At stake:* RM 5.1M revenue · RM 1.6M gross profit at the blended 31.4% margin
- *Owner:* Daniel Tan · accountable: Sales lead
- *By:* 15 Aug — Q3 plan lock *(pending)*
- *Success:* A demand-generation budget approved and booked against Digital, not against more inventory
- *Escalation:* Budget reallocation between inventory and demand *(pending)*

**D4 — Buy more addressable inventory** · opportunity · quarter
- *Because:* Addressable is 97% sold out and the only line beating plan at 109% — its ceiling is supply, not selling.
- *At stake:* RM 2.6M revenue · RM 0.8M gross profit at the blended 31.4% margin
- *Owner:* Aisyah Rahman · accountable: Leadership
- *By:* Q3 inventory commit *(pending)*
- *Success:* Additional addressable volume contracted for Q4
- *Escalation:* Capital commitment on inventory *(pending)*

**D5 — Move Daniel to prospecting, not closing** · risk · quarter
- *Because:* 85% attainment with only 0.8× pipeline cover is a top-of-funnel gap. Coaching on closing technique would have been the wrong quarter's work.
- *At stake:* RM 2.4M revenue · RM 0.8M gross profit at the blended 31.4% margin
- *Owner:* Sales lead · accountable: Bryan Wong
- *By:* Start of the Q4 territory plan *(pending)*
- *Success:* His cover ratio above 1.5× within one quarter
- *Escalation:* None — a management decision. It appears here because the board's own evidence overturned an earlier one; see log row 4.

**D6 — Diarise Petronas for the Q3 budget reset** · risk · quarter
- *Because:* RM 2.1M of the RM 4.4M lapsed was a budget-cycle gap, not a loss. It needs a calendar, not a discount.
- *At stake:* RM 2.1M revenue · RM 0.7M gross profit at the blended 31.4% margin
- *Owner:* Aisyah Rahman · accountable: Sales lead
- *By:* Inside the Q3 reset window *(pending)*
- *Success:* A meeting in the diary inside the reset window
- *Escalation:* None
- **Initial status is `Scheduled`, not `Not started`** — decided 5 Aug and still undiarised at 7 days. This is the one card that ships in a non-default state, so the link between status, the health strip's overdue count, and log row 1 is visible without the user touching anything.

**D7 — Take the share question to the board** · strategic · FY
- *Because:* Growing 6.4% in a market growing 8.1% moved share from 14.2% to 13.8% — roughly RM 4.3M of revenue that existed and went elsewhere. Every other panel on the board calls this a good year.
- *At stake:* RM 4.3M revenue · RM 1.4M gross profit at the blended 31.4% margin
- *Owner:* Leadership · accountable: Bryan Wong
- *By:* Next board meeting *(pending)*
- *Success:* A board-agreed position on whether to defend share or bank margin
- *Escalation:* Only the board can set that posture

---

## 6. Interactions — four built, three dropped

### Built

**I1 · Evidence disclosure.** Each card's `▸ Evidence` toggles a drawer holding a compact purpose-built mini-chart, the one-line claim, and a `Full analysis in Mode 2 →` link. `aria-expanded` on the trigger, `hidden` on the drawer. Because the mini-charts are fixed-viewBox SVG built as strings with zero layout measurement, a drawer can be populated while still hidden and will render correctly on reveal — no need to defer building until after a frame.

Mini-charts are **new and small**, not the Mode 2 panels. The nine large panels are deliberately *not* duplicated into Mode 3: one source of truth, and it keeps a 425KB file from becoming ~600KB. Six renderers cover seven drawers — D3 and D4 share the fill-rate renderer with a different series highlighted.

| Renderer | Drawer(s) | Shape |
|---|---|---|
| `mGap` | D1 | Four horizontal bars — commit 210.2, weighted 222.9, best case 239.4 — against a plan rule at 240.0 |
| `mConc` | D2 | Cumulative concentration curve with the top-five band filled |
| `mFill` | D3, D4 | Sold-vs-sellable pair for the highlighted line, attainment beneath |
| `mQuad` | D5 | Two-axis quadrant with Daniel (85%, 0.8×) and Aisyah plotted |
| `mChurn` | D6 | Lapsed split with the recoverable RM 2.1M highlighted |
| `mShare` | D7 | Indexed growth, us against market, gap band between |

Built as fixed-viewBox SVG strings with zero layout measurement — same convention as the existing chart module, which is what makes it render correctly in a hidden tab with no animation frames. Rendered lazily on first open.

**I2 · Status cycling.** Clicking the status chip advances through `Not started → Scheduled → Awaiting client → Closed → Moot → Not started`. The five states are the whole status vocabulary — nothing anywhere else in Mode 3 may use a sixth word for a status. On every change the health strip's `Decisions` metric recomputes all three counts:

| Count | Rule |
|---|---|
| due this week | `week`-horizon decisions whose status is not `Closed` or `Moot` |
| stalled | decisions carrying a stalled flag whose status is not `Closed` or `Moot` — D6 only at ship |
| closed since last review | decisions whose status is `Closed` |

and a row is prepended to the log with today's date, the decision name, and the new status.

This is the closure thesis made tangible and the single most important interaction in the mode. If anything gets cut, this is the last thing to go. It is fully reversible by cycling round.

**I3 · Horizon filter.** `This week / This quarter / FY outlook`, writing `data-horizon` on `#root`. Implemented as pure CSS with flexbox `order`, no DOM moves:

```css
.decs{display:flex; flex-direction:column; gap:14px;}
.decs .dec{order:3;}                                    /* demoted, compact treatment */
.decs .dec-split{order:2;}                              /* "Also open" divider */
[data-horizon="week"]    .dec[data-h~="week"]{order:1;}
[data-horizon="quarter"] .dec[data-h~="quarter"]{order:1;}
[data-horizon="fy"]      .dec[data-h~="fy"]{order:1;}
```

Cards at `order:1` get the Now treatment; everything else falls below the divider with the compact treatment. `order` takes integers only, hence 1/2/3 rather than a fraction. Same attribute-filtering philosophy as the existing `data-mode`/`data-view` switches, which is why it costs almost nothing.

**I4 · Screen-aware assistant prompts.** A Mode-3-only row of static chips under the decision list, headed *"Questions this board can now answer"*: *"Which eight deals close the RM 17.1M gap?"* · *"Draft the board note on the 0.4pt share decline."* · *"Who owns the top-five sponsor gap?"* · *"What did we decide last month that has not moved?"*

**Correction to the review's framing:** there is nothing to "replace the generic pills" with here — the tracker has no assistant box at all; the *"Ask anything"* composer with generic pills lives on `pages/app-shell-intro.html`, not in this file. So this is new content, and it is honest about being inert: the chips are not buttons and carry no hover or press affordance. Their job is to show the product team what contextual prompting would look like when the composer is wired to a board, which is the reviewable idea. A fake working composer would be exactly the dead affordance §6's drop-list exists to avoid.

### Dropped, and why

- **Cross-filtering** (select Digital → all panels filter): needs a data layer. Faking it across 9 panels produces wrong numbers, which is worse than no filter.
- **Comparison mode** (division/team/period side-by-side): no comparative data exists for any dimension.
- **Saved leadership views** (CEO / CRO / finance / board): the role-switcher experiment already established that this DS's element map cannot distinguish the roles convincingly, which is why Mode 2 turned role filtering off.

---

## 7. Visual tier system

| Tier | Treatment |
|---|---|
| **Now** | Full-width card · 2px semantic border · h3 headline · field grid · button row · status chip |
| **Also open** | Same card, compact: 1px rule border, headline at body size, fields collapsed to a single stake·owner·by line, no button row, status chip retained |
| **Watch** | Compact card · 1px neutral border · caption type · threshold line · **no buttons** |
| **Evidence** | No card at all — a titled row with a chevron |
| **Log** | Plain muted table, dated |

**Watch has no buttons on purpose.** Every tier having actions is how the page got flat in the first place. The tier is the guidance: Now means act, Watch means not yet.

Semantic colour, using artifact tokens that already exist — no new values:

| Meaning | Token |
|---|---|
| Urgent downside | `--art-crit` |
| Emerging risk | `--art-warn` |
| Verified upside | `--art-good` |
| Projected / strategic | `--art-imagined` |

Mode 3's own mode-button and banner accent follow `--art-accent`, distinguishing it from Mode 1 (ink) and Mode 2 (`--art-imagined`) at a glance.

---

## 8. Watch and Log content

### Watch — 4 cards

| Watch item | Value | Escalates if |
|---|---|---|
| Negotiation-stage ageing | 37 deals · RM 51.2M at 50% · average 41 days | the average passes 45 days |
| Contracted, not booked | RM 28.4M at 95% · average 11 days — a billing question, not a selling one | average ageing doubles |
| Share of market | 13.8% · −0.4pt YTD | it falls a further 0.2pt at H1 close |
| Gross margin | 31.4% · +0.8pt vs LY — the only headline improving | it drops below 30.5% |

Share of market appears in Watch *and* as D7. That is deliberate, not duplication: at `week` horizon it is a threshold to monitor; at `FY` horizon it becomes the decision. It is the clearest demonstration that the horizon filter changes meaning and not just visibility.

### Log — 4 rows

| Decision | Decided | By | Outcome |
|---|---|---|---|
| Diarise Petronas for the Q3 budget reset | 5 Aug | Aisyah Rahman | **Scheduled** — still no meeting in the diary, 7 days |
| Rate review for AirAsia | 1 Aug | Sales lead | **Awaiting client** |
| Restructure the Tealive package | 28 Jul | Aisyah Rahman | **Closed** — won back RM 0.3M of RM 0.5M |
| Coach Daniel on closing technique | 21 Jul | Sales lead | **Moot** — the rep quadrant showed a prospecting gap, not a closing one |

Row 4 is the most important line in Mode 3. It shows a decision **retired by evidence**, which is the "what happens after I act" loop in a single sentence — and it is already implied by Mode 2's own note that coaching Daniel on closing "would have been the wrong quarter's work."

All four rows are pending (operating layer). Row 1 is consistent with D6 shipping in `Scheduled` and with the delta line's "7 days undiarised".

---

## 9. Out of scope

The four uncovered subject areas — **commercial mix** (by product, vertical, agency/direct, new vs existing), **retention health** (renewal value due at 30/60/90/180 days, save-plan coverage), **cash & delivery** (receivables ageing, booked-to-billed, delivery pacing, make-good exposure, inventory liability), and **operating cadence** beyond the horizon filter — are recorded here as a Mode 4 backlog and are **not** built.

Reason: Mode 3's brief is experience, not coverage. Adding roughly five panels to a board already criticised as dense would work against the thesis it exists to prove. Two of the four are represented in Mode 3 as single health-strip metrics (NRR, cash risk) precisely so the gap is visible without the page carrying the weight.

The renewal-coverage table is the strongest single candidate for Mode 4: it is the only one of the four that is forward-looking, and forward-looking was the review's opening complaint.

---

## 10. Architecture

Mode 3 is a third value on the existing attribute switch. No refactor.

**CSS additions:**

```css
/* One rule per mode, negated — not one per mode PAIR. Three modes would
   otherwise need six rules and a fourth twelve. Equivalent because every
   data-mode-only value is a single token; this also replaces the two
   pair-enumeration rules that predated Mode 3. */
[data-mode="now"]    .w[data-mode-only]:not([data-mode-only~="now"]){display:none;}
[data-mode="next"]   .w[data-mode-only]:not([data-mode-only~="next"]){display:none;}
[data-mode="decide"] .w[data-mode-only]:not([data-mode-only~="decide"]){display:none;}
[data-mode="decide"] .roles,
[data-mode="decide"] .filters,
[data-mode="decide"] .period{display:none;}
[data-mode="decide"] .modes button[aria-pressed="true"]{background:var(--art-accent); border-color:var(--art-accent);}
[data-mode="decide"] .modes{border-color:var(--art-accent);}
[data-mode="decide"] .mbanner{border-left-color:var(--art-accent); background:var(--art-accent-bg);}
```

**JS changes** to `setMode(mode)` in the tracker's script tail:
- generalise the two hardcoded `aria-pressed` writes into a loop over `.modes button`, keyed on `data-m` — currently it names `mNow` and `mNext` explicitly and would need a third line per mode added forever
- add `decide` entries to the existing `copy` and `titles` maps
- both existing writes stay: `root.setAttribute` and `root.parentElement.setAttribute`, because the artifact wrapper needs the attribute too

**Class namespace.** Every new class is prefixed `m3-`, except the decision-card trio `.dec` / `.decs` / `.dec-split` which read better unprefixed and collide with nothing. The file already uses `.st`, `.st-lead`, `.st-v`, `.st-warn`, `.stack` and `.strip`, so **status-chip classes must not use an `st-` prefix** — they are `.m3-chip` with a `data-status` attribute carrying the state.

**Mini-chart renderers live inside the existing chart-module IIFE** (script block opening at line 1490) so they reuse its `C` colour map and its `txt` / `ln` / `rect` / `path` helpers rather than duplicating them. That IIFE is closed, so it exposes them for the interaction module as `window.M3CHARTS = { mGap, mConc, mFill, mQuad, mChurn, mShare }`.

**New markup**, all inside `.dash` as `data-mode-only="decide"` widgets using the existing 12-column span classes:

| Widget | Span | Contents |
|---|---|---|
| Posture | `s12` | Posture sentence + delta line + horizon filter |
| Health | `s12` | 6 metric tiles in a flex row |
| Decisions | `s12` | `.decs` flex column: 7 `.dec` cards + the `.dec-split` divider |
| Watch | `s12` | 4 compact cards in a flex row |
| Evidence | `s12` | 9 titled rows, each a Mode 2 deep link |
| Log | `s12` | Table, 4 seed rows |

Everything is `s12` because Mode 3's tiering is vertical: the whole point is that the page stops being a grid of equal cells.

**Reduced motion:** the file already has a global `@media (prefers-reduced-motion:reduce){ *{transition:none !important; animation:none !important;} }`, so drawer and status transitions are covered without new rules. Verify the drawer still opens (height/`display` must not be the transitioned property carrying the state).

---

## 11. Verification

1. **Mode isolation.** In each of the three modes, count visible `.w` elements and assert no widget from another mode is visible. Mode 1 and Mode 2 widget counts must be unchanged from before this work — this is a regression check on the two-mode CSS, which now has a third neighbour.
2. **Arithmetic reconciliation.** Every figure in Mode 3 traces to the reconciled set: months sum 148.2 · media actuals 148.2 against 157.6 target (gap 9.4) · open pipeline 51.2 + 31.6 + 28.4 = 111.2 across 37 + 22 + 14 = 73 deals · weighted 25.6 + 22.1 + 27.0 = 74.7 · 148.2 + 74.7 = 222.9 · plan 240.0, short 17.1 · commit 210.2, short 29.8 · churn 2.1 + 1.4 + 0.5 + 0.4 = 4.4 · top-five 38% of 148.2 = 56.3 · NRR (139.3 + 4.8 − 8.6) / 139.3 = 97.3% · every gross-profit figure = stake × 31.4% to one decimal. A prior version of this board shipped a monthly chart summing RM 125.7M beside a stat claiming RM 148.2M; arithmetic is a first-class check here, not a formality.
3. **Status cycling.** Cycle D1 through all five states and back. Assert the health strip's due-count decrements when it reaches `Closed`, that a log row is prepended each time, and that a full cycle returns the strip to its starting numbers.
4. **Horizon filter.** At each of the three horizons, assert the set of cards at `order:1` matches the spec table in §5, and that the `.dec-split` divider sits between the promoted and demoted groups.
5. **Evidence drawers.** Open all seven; assert each contains a non-empty SVG and that no drawer's mini-chart overflows its viewBox. `getBBox()` collision audit at 1px, excluding `[transform]` elements — rotated text reports a pre-transform box and produces false positives.
6. **Geometry.** 1280×720, 1440×1100 and 375×667. No sideways body scroll at any width.
7. **Console clean** in all three modes.
8. **Dark mode.** Mode 3's semantic tier borders must survive the `prefers-color-scheme: dark` block and the `[data-theme="dark"]` override — the tier system is the one thing in this mode that carries meaning in colour alone, so it needs a shape or label fallback as well.

---

## 12. Publication

`pages/leadership-dashboard-tracker.html` is canonical and committed. The artifact at `886c79d5-fc33-4625-ac36-13a32ba2aa1a` is republished from it by passing that URL so the link stays stable.

Note the standing constraint: local commits only. Nothing is pushed to Vercel until the words "push to vercel" are given. Publishing the artifact is a separate action from pushing the repo and should be confirmed before it happens.
