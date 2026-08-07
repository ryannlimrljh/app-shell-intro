# Top-3 focus ribbons on the highlight cards — design

**Date:** 2026-08-07
**Page:** `pages/app-shell-intro.html`
**Status:** Implemented (plan 2026-08-07-top3-focus-ribbons.md)
**Builds on:** the six-card highlight row (`2026-08-06-highlight-cards-design.md`) and
its recommendation + CTA pass (`2026-08-06-card-recommendations-design.md`).

## Goal

Three of the six highlight cards carry a ranked corner ribbon — **Focus 1**,
**Focus 2**, **Focus 3** — so Bryan can see at a glance which cards to work
first. The row's order, layout, and card visuals are otherwise unchanged: this
is a priority *layer* over the existing cards, not a re-sort or a restyle.

## Decisions (user-confirmed during brainstorm)

| Question | Decision |
|---|---|
| Ranking basis | **Computed-looking** — the flag should read as Collabrium having derived the ranking from signals already on the cards (12-day stall, renewal in 21 days, RM150K close), not as arbitrary decoration. Achieved through framing (see Subtitle), not a scoring engine — this is a static demo page. |
| Which three cards | **Pipeline (1), At risk (2), AI next-best-action (3)**. Pace, Upsell, and SEA team stay unflagged — they carry positive/informational news, not asks. |
| Placement | **Folded ribbon corner**, top-right (variant C of four mocked options). |
| Ranked vs. equal | **Ranked 1–3**, each card showing its own number. |
| Card visuals | **Unchanged.** No extra shadow on flagged cards, no dimming of the unflagged three, no layout shift. |
| Ribbon size | **80×80 corner box** (see Geometry — 56px clipped the word, 96px cut across the card's headline). |
| Subtitle | **Reworded** to acknowledge the ranking (see Subtitle). |

## Geometry

The band's usable text length is the **chord** it cuts across the corner box,
not the box's width — this is what made the first 56px attempt clip "FOCUS" at
both ends. For a box of side `S` whose band centreline meets each edge at
distance `a` from the corner:

- usable chord = `a × √2`
- `S` must clear `a + (band height ÷ 2) × √2`, so the band's far edge stays
  inside the box

Chosen values: **S = 80px, a = 56px, band height 22px, band width 128px** →
chord ≈ 79px against ≈ 53px measured for "FOCUS 1" (all three labels measure
identically — the digits have equal advance in Mulish at this weight).

**The 79px chord is the box's ceiling, not the visible one.** Found during the
final holistic review: the fan overlaps each card 26px onto its neighbour, and
cards 1 and 2 sit *under* the card to their right (z-order 1, 2, 6, 5, 4, 3) —
which is exactly the corner the ribbon occupies. Measured, the band is occluded
from ~68px along the chord on Pipeline and ~66px on At risk; the AI card has
nothing to its right and shows the full folded corner. Since the text is centred,
a label of width `w` ends at `(79 + w) / 2`, so the real rewording budget is
`w ≤ ~54px` on At risk and `~57px` on Pipeline. "FOCUS 1" at 53.8px is already at
that limit. See **Known limitation** below.

Positioning (derived from the above, not tuned by eye):

- band `top: 17px` — from `(a − height) ÷ 2`
- band `right: −36px` — from `(width − a) ÷ 2`
- `transform: rotate(45deg)`

The box is `display:block; position:absolute; top:0; right:0; width:80px;
height:80px; overflow:clip; border-top-right-radius: var(--radius-lg)` (20px,
matching `.c-card`), and `pointer-events:none` so it never intercepts a card
click. `clip` rather than `hidden`: both clip visually, but `hidden` would leave
the box programmatically scrollable over ~25px of hidden band overhang. The
containment is entirely `overflow`'s doing — measured, the corner radius never
meets a painted pixel at `a = 56`, so it is insurance for future tuning only.

## Visual treatment

- Band: `--color-orange` fill, `--color-neutral-1` text.
- Text: `Focus n` in a `.c-hcard-ribbon-band` span (a class, not a bare `<i>` —
  in this file `<i>` means "Phosphor icon glyph", and a descendant selector
  would have caught any icon later placed inside a ribbon), uppercase via
  `text-transform`, at `--text-label3-size` (11px) /
  `--weight-extrabold` / `letter-spacing: .08em` — deliberately double
  label3's own 0.04em tracking, which the ~53px measurement assumes —
  `line-height: 22px` (= the band height), centred, `white-space: nowrap`.
- Identical on all three cards, including the obsidian AI card — the ribbon is
  a rank marker, so it must not vary by card. Identical *in CSS*; see **Known
  limitation** for how the fan's overlap makes them render differently. Orange
  on the AI card is acceptable: the nearest other orange there is the card's own
  `🤖 Next best action` eyebrow label, ~70px to the ribbon's left on the same
  row, and the two read as separate elements rather than one smear.

## Integration with existing card machinery

The ribbon is written into the markup like all other card content, so it
inherits the existing behaviour rather than needing new code paths:

- **Clip safety:** the band lives entirely inside the card's own 80×80 corner
  box, so nothing new overflows into the fan's rotated-corner gutter. The
  slider track's `padding: 16px 64px 96px 240px` needs no change.
- **Skeleton/reveal:** as a direct child it is covered by the existing
  `.c-card-slide.is-loading > :not(.c-hcard-skeleton)` and `.is-loaded`
  rules, so it fades in with the content cascade and paints beneath the
  skeleton overlay (which carries `z-index:2`) during load.
- **Hover tilt and modal swing:** it is a child of the card, so it tilts with
  it under Motion's transform and needs no involvement of its own.
- **Label collision:** the band only reaches into the card's content area
  across the eyebrow-label row; it has fully exited the content box ~48px down.
  Current labels ("Pipeline", "⚠ At risk", "🤖 Next best action") are all well
  short of the band, so **no right padding is added pre-emptively** —
  implementation must measure the rendered labels and add `padding-right` only
  if one actually reaches the band's zone. Measured during implementation: all
  three clear it by 70–185px, so **no padding rule was added**.

## Known limitation — the fan occludes two of the three ribbons

Found in the final holistic review, after both per-task reviews had passed,
because it only exists in the assembled row rather than in any single card.

The fan overlaps each card 26px onto its neighbour and stacks them z 1, 2, 6, 5,
4, 3 (the Pace card is the apex). Cards 1 and 2 therefore sit *under* the card to
their right — the same corner the ribbon occupies. Rendered: **Pipeline and At
risk show the band cut off just past the digit; only the AI card shows the full
symmetric folded corner.** Hovering lifts a card to `z-index:10` and momentarily
restores its whole ribbon, which is why the row reads fine in motion.

Nothing looks broken — the digits are never clipped, and the ribbons still read
as ranked flags — but the approved mockup showed three symmetric folded corners,
and that is not what ships. Left as-is pending a user call, because every fix
touches something the spec's own constraints protect:

- **Raise the flagged cards' z-index** — restores all three corners, but changes
  the fan's deliberate stacking arc (Pace as apex).
- **Move the ribbon to the top-left** — fixes cards 1 and 2, but breaks the AI
  card, whose *left* edge is the overlapped one. No single corner is free on all
  three.
- **Pull the band inboard** so the text sits inside the ~66px visible region —
  keeps the fan untouched, at the cost of a smaller corner flag.
- **Accept as-is** — the flags read, and hover reveals the full corner.

## Accessibility

The ribbon is `role="img"` with `aria-label="Focus 1 of 3"` (2, 3) — wording
that matches the visible word rather than paraphrasing it — and its
inner band element is `aria-hidden="true"` — a rotated "FOCUS 1" fragment read
in isolation is meaningless, and `role="img"` + `aria-label` is reliably
announced where a bare `<span aria-label>` may be skipped.

## Subtitle

The greeting subtitle changes from:

> Here's what needs your eyes across the business today.

to:

> Here's what needs your eyes today — I've flagged your top 3.

This is what makes the three ribbons legible as deliberate prioritization
rather than ornament, delivering the "computed-looking" intent without
inventing a scoring mechanism. No change to the h1 or the reveal choreography.

## Non-goals

- No scoring/ranking engine — the ranks are authored, the framing does the work.
- No re-ordering of the card row.
- No change to card fill, border, shadow, or the unflagged cards.
- No change to the modal, the fan layout, tilt, skeleton, or reveal timings.
- No new tokens; `collabrium-dls/` stays untouched.

## Verification approach

Real pointer input in the Browser pane (synthetic clicks false-pass on this
page):

1. All three ribbons render with the full word visible and correctly clipped to
   the card's rounded corner — on white, fire-tint, and obsidian cards.
2. Measure each flagged card's label against the band's zone; confirm no
   overlap (or add padding and re-confirm).
3. Ribbons survive the fan rotations, arrive with the load cascade, and tilt
   with their card on hover.
4. Clicking a flagged card still opens its modal (ribbon is `pointer-events:none`).
5. Unflagged cards show no ribbon; subtitle reads the new copy.
6. Screenshot for visual sign-off; console clean.
