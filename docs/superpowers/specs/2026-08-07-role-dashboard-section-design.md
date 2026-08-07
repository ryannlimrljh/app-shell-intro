# Role-filtered dashboard section — design

**Date:** 2026-08-07
**Page:** `pages/app-shell-intro.html`
**Status:** Approved, not yet planned
**Builds on:** the six-card highlight row (`2026-08-06-highlight-cards-design.md`),
its recommendation + CTA pass (`2026-08-06-card-recommendations-design.md`), and
the top-3 focus ribbons (`2026-08-07-top3-focus-ribbons-design.md`).

## Goal

A second section below the highlight-card fan, reached by the existing
`Dashboard ↓` link, holding tables and charts. One master container carries
every widget; a visible **View as** control filters it to a role. Leadership is
the default and the deep view, because leadership is where the real data is.

The purpose is to make the information architecture *reviewable*: product
managers and builders cannot comment on a data model they cannot see. Getting
the numbers' provenance exactly right is explicitly deferred to them.

## Decisions (user-confirmed during brainstorm)

| Question | Decision |
|---|---|
| Role source | **A visible "View as" switcher**, not SSO. In production SSO would preset the default view; in a static prototype a hidden role model is unreviewable — see *Why not SSO* below. |
| Content model | **Master container of all widgets**, filtered by role. Not four separate builds. |
| Which roles | **Leadership** (default, deep), **Sales manager** (real data), **KOL manager** and **Studio manager** (illustrative, badged). |
| Content engine | **Omitted.** The app switcher has a Content entry with no role behind it. Recorded as a known gap, not silently dropped. |
| Filtering vs ranking | Role **hides** widgets in the prototype, but each role's set is drawn generously — see *Cross-engine survival* below. |
| Data provenance | **Loose on purpose.** Widgets trace to confirmed datasets where they can; the two illustrative roles are visibly marked. |
| Ask box | **Slides away** while section 2 is in view, returns on scroll back up. |
| Reveal | **On scroll-in**, cascading like the cards. Not present at load. |
| `AA` | **Addressable advertising** (user-confirmed) — a distinct sell from linear TV. |

### Why not SSO

SSO-derived role is correct for the shipped product and wrong for this artifact,
in a way that fails silently: this is a static page with no backend or session,
so "role comes from login" means the role is whatever is hardcoded. A reviewer
opening the Vercel link would see one role forever and the other three would be
invisible work. A control labelled **"View as"** also makes no claim about who is
logged in, which leaves section 1's "Bryan" persona untouched.

Three mechanisms are routinely conflated and are kept distinct here:

- **Permission** — *may I see it?* Identity-driven, a hard boundary. Not modelled.
- **Relevance** — *do I care?* Role-driven. Should rank, not hide.
- **Default view** — *what do I land on?* Role-driven, overridable. This is what
  the switcher models.

### Cross-engine survival

Filtering strictly on relevance would delete the product's differentiator. The
existing Upsell card deliberately shows a *sales* rep an *Influencers* insight,
and its own comment says it "couldn't exist without Collabrium being one platform
across Studio/Sales/Influencers/Content." A narrow role filter removes it first.

Mitigation: the **shared needs-attention queue** carries cross-department handoff
rows for every role, so no role needs a dedicated cross-engine widget and no role
is sealed inside its own department.

## Data foundation

Six datasets confirmed available (user's data contact, 2026-08-07). Widget
sources below refer to these numbers:

1. Overall gross revenue by month vs last year
2. Target vs actual, separable by TV, AA, Radio, Digital
3. Performance by salesperson; Key Clients & Agency vs Govt/SME/Regional
4. Top 20 new advertisers, by spend
5. Top 20 lapsed advertisers, by spend
6. Agency performance by tiering, Tier 1 vs Tier 2

**Derived metric.** `Net new business = ④ − ⑤`. It is in neither dataset alone
and answers the question leadership actually has: is growth real, or is it
replacing churn? If lapsed outruns new, a rising revenue line is an illusion
propped up by existing accounts. This is the hero tile.

**The data's dimensions are not the engines.** It slices by media type
(TV / AA / Radio / Digital), client type (Key Clients & Agency vs
Govt/SME/Regional), and agency tier (T1/T2). Nothing slices by
Studio/Sales/Influencers/Content. The app switcher's engine axis therefore does
**not** organise this section; the View-as control is separate from it.

**Retracted during brainstorm, recorded so it is not re-proposed:**

- **Cross-sell rate** (% of clients on more than one engine) was proposed as
  leadership's hero metric and argued for hardest. Not pullable and not derivable
  from the six. It would have been a fabricated number in the most prominent tile
  of a leadership dashboard. Replaced by *net new business*.
- **Pipeline by stage** was called "the core artifact" for sales managers. There
  is no deal-stage data. A pipeline table is the first thing a sales director
  would interrogate, so an invented one is a liability.
- **Campaign performance / ROAS / creator roster / team utilisation / revision
  rounds** — no creator, campaign, or production data exists. These survive only
  inside the two explicitly illustrative roles.

## Architecture

One container, one attribute, no JavaScript for content:

```html
<section id="dashboard" class="c-dash" data-view="leadership">
  <div class="c-dash-w" data-roles="leadership">…</div>
  <div class="c-dash-w" data-roles="sales leadership">…</div>
</section>
```

```css
.c-dash[data-view="sales"] .c-dash-w:not([data-roles~="sales"]) { display: none; }
```

The switcher's only job is setting `data-view`; CSS does the filtering. `~=`
matches one whitespace-separated word, so a widget lists every role it belongs to.

Per-role stat rows are **separate tagged blocks** rather than JS swapping
numbers. This is a deliberate choice, not laziness: it means zero JavaScript
owns any content in this section. Every hard bug on this page so far —
synthetic-click false passes, mid-animation measurement corruption, the
double-invoked reveal — came from JS-driven state. This design has none of that
surface.

## Widget inventory

**Shared spine — every role.**

| Widget | Component | Source |
|---|---|---|
| Period toggle (MTD / QTD / YTD) | reuses the Pace modal's `seg-toggle` | — |
| Stat row **slot** — 4 tiles, one tagged block per role | `.c-stat` | see each role below |
| Needs-attention queue | `.c-table` + `.c-badge` | exceptions only; carries cross-department handoff rows |

"Spine" means every role has these three slots filled, not that one shared
element is reused. Per the architecture above, each role's stat row is its own
tagged block.

**Leadership — default, deep. All widgets data-backed.**

| Widget | Component | Source |
|---|---|---|
| Stat row: Gross revenue YTD · **Net new business** · Target attainment · Tier 1 share | `.c-stat`, hero tile for net new | ①, ④−⑤, ②, ⑥ |
| Gross revenue by month vs last year | inline SVG, 2 series | ① |
| Target vs actual by media | `.c-table` + `td.num` | ② |
| Top 20 new advertisers | `.c-datatable` + `td.num` | ④ |
| Top 20 lapsed advertisers | `.c-datatable` + `td.num` | ⑤ |
| Performance by salesperson | `.c-datatable` + `td.num` | ③ |
| Client mix (Key & Agency vs Govt/SME/Regional) | stacked bar | ③ |
| Agency performance by tier | `.c-chartmap-row` + ramp | ⑥ |

New and lapsed sit **side by side deliberately** — the juxtaposition is the
insight, and it is what makes the derived hero tile legible.

**Sales manager — real data, cheap but not free.**

| Widget | Component | Source |
|---|---|---|
| Performance by salesperson, scoped to their book | second `.c-datatable` block, same recipe as leadership's | ③ |
| Target vs actual for their media | second `.c-table` block, same recipe | ② |

Dataset ③ is the one that serves both altitudes: leadership reads it as *who is
carrying the number*, a sales manager as *my team*.

Note the honest cost. Because content is static tagged blocks rather than
JS-filtered rows, "scoped to their book" means a **second block with fewer rows**,
not the same DOM re-filtered. What is reused is the *recipe* — markup shape,
classes, column set — not the element. Two extra blocks, no extra CSS, no new
component. That is the trade the no-JavaScript architecture buys, and it is worth
naming so nobody implements a JS row filter expecting the spec to require it.

**KOL manager and Studio manager — illustrative, badged.**

Two widgets each, carrying a visible `Illustrative` badge (`.c-badge-neutral`)
so the mock numbers announce themselves before anyone asks:

- KOL manager: campaign performance, creator roster
- Studio manager: team utilisation, production board

The badge is the point. These views let PMs react to the *shape* of a KOL or
Studio dashboard without the page implying the data exists.

**Filter bar.** `.c-filterbar` + `.c-filter-pill`, both existing DS components:
Media (All / TV / AA / Radio / Digital) and Segment (All / Key & Agency /
Govt·SME·Regional). These are the data's own dimensions, so the bar is real
rather than decorative.

## Behaviour

**Anchor.** `Dashboard ↓` targets `#dashboard`. Critically, **`.c-shell-content`
is the scroll container, not the window** — `.c-shell` is `height:100dvh` and
`.c-shell-content` carries `overflow-y:auto` (components.css:282). A plain
`href="#dashboard"` works because browsers scroll the nearest scrollable
ancestor, but `scroll-behavior:smooth` must be set on `.c-shell-content`.
Putting it on `html` fails silently — the jump is instant with no error.

**Reveal.** Widgets cascade in when the section scrolls into view, reusing the
card reveal pattern. An `IntersectionObserver` adds `.is-revealed`; the cascade
itself is CSS transition-delay, as with the cards. Must be idempotent — the
`revealCanvasContent()` double-invocation bug is the precedent.

**Ask box.** Slides out while section 2 is in view and returns on scroll back up,
driven by the same observer. Section 1's one-shot placeholder choreography is
untouched. `.c-shell-content`'s existing `padding-bottom:184px` was sized to keep
the Dashboard line clear of the fixed box; that padding stays for section 1 but
must not double-apply below the new section.

**Reduced motion.** `prefers-reduced-motion` disables the cascade and the ask
box's slide, matching the modal swing's existing treatment. Content appears
immediately; nothing is hidden from anyone.

## Accessibility

- The View-as control is a `role="radiogroup"` of `role="radio"` buttons with
  `aria-checked`, matching the app switcher's existing `menuitemradio` idiom.
- Changing view moves focus nowhere; the section is announced via
  `aria-live="polite"` on a short status line ("Showing leadership view").
- Every table gets a `<caption>` (visually hidden) naming its dataset, so the
  tables are distinguishable when tabbing without sight of the headings.
- `td.num` columns keep `font-variant-numeric:tabular-nums` from the DS.
- Illustrative badges are real text, not colour alone.

## Known gaps

Recorded so they read as decisions rather than oversights:

- **Content engine has no role.** The app switcher ships four engines; only three
  map to a role here, and none of the six datasets covers Content. Suggested v2
  widgets: content calendar, publishing throughput, asset-library usage,
  engagement by format.
- **KOL and Studio are unsourced.** Badged as illustrative. They exist to test
  the shape, and should not be shown to leadership as fact.
- **No pipeline data.** Any future deal-stage view needs a new source.
- **Role ≠ permission.** Nothing here models entitlement. A real build must not
  treat this filter as a security boundary.

## Non-goals

- No change to section 1 — the greeting, the fan, the cards, the ribbons, the
  modals, or the 6-second load choreography.
- No change to the app switcher; the View-as control is separate from it.
- No new tokens; `collabrium-dls/` stays untouched and read-only.
- No data layer, no fetch, no build step.
- No re-sort or re-theme of existing components.

## Verification approach

Real pointer input in the Browser pane — synthetic dispatched clicks false-pass
on this page — plus layout-space measurement, since transforms are often active:

1. `Dashboard ↓` smooth-scrolls to the section; confirm `.c-shell-content`'s
   `scrollTop` changes, not `window.scrollY`.
2. Each View-as option shows exactly its tagged widgets and hides the rest;
   assert per-widget computed `display` for all four views.
3. Leadership is the default on load.
4. Ask box leaves while section 2 is in view and returns on scroll up.
5. Widgets cascade once, not twice, on repeated scroll in/out.
6. Tables scroll horizontally inside their own container at narrow widths; the
   page body never scrolls sideways.
7. Console clean; reduced-motion branch verified.
8. Section 1 unchanged — re-verify the six cards still measure 400px and the
   ribbons still read.
