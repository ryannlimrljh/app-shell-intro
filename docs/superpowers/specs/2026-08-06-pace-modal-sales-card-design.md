# Pace modal: live Sales card — design

**Date:** 2026-08-06
**Page:** `pages/app-shell-intro.html`
**Status:** Implemented (built inline after user approval; this doc is the record)
**Source:** `~/Desktop/collabrium-screens/dashboard-home.html` (2026-08-05) — its
combined MTD/YTD revenue stat card, extracted and rescaled.
**Builds on:** the card modal (`cb0b567`→`5784a23`, perspective-swing open/close).

## Decisions (user-confirmed via question round)

1. **Data matches the Pace card's story**, not the dashboard's: RM2.4M MTD vs
   RM2.1M run-rate to date (+14.3%), today = Aug 6 → day 6 of 31. YTD invented
   at the same scale: RM22.1M, +8.3% vs LY RM20.4M, day 218 of 365. `runRate`
   in the data is the FULL-period line value (MTD 10.85 = 2.1 × 31/6), which is
   what makes `expectedByNow` (runRate × progress) land back on 2.10 — the
   number the Pace card itself quotes.
2. **Fully live:** MTD/YTD segmented toggle switches data with redraw + count-up,
   chart draw-on reveal, hover tooltip (real series points in the actual zone,
   run-rate projection past today), pulsing LIVE dot, and a 5s live-tick mock
   that nudges value/trend/curve endpoint while the modal is open.
3. **Other five cards' modals stay blank** — placeholder for their own builds.

## Mechanics

- `.c-modal-sales` lives inside the modal panel, `display:none` unless the
  modal carries `.is-pace` — set in `openCardModal` when the clicked card is
  `.c-hcard-pace` (aria-label becomes "Sales detail"); cleared with aria
  restore in `finishModalHide`.
- `openSalesModal()` renders on every Pace open (thumb position + animated
  render), so the chart's draw-on reveal is part of the modal's arrival,
  running concurrently with the swing.
- **Transform-immune measurement** (the bug found in verification): the render
  runs while the panel is mid-swing, so client rects come back scaled by the
  in-flight transform. The SVG viewBox is pinned from
  `getComputedStyle(svg).width` and the toggle thumb from
  `offsetLeft/offsetWidth` — layout-space values a transform can't distort.
  (First attempt used `getBoundingClientRect` and rendered the chart
  letterboxed at the swing's 0.576 start scale.)
- Chart: 180px tall, viewBox re-pinned 1:1 to layout pixels per render;
  Catmull-Rom smoothed actual line (Orange, glow) vs straight dashed run-rate
  (Salmon Pink); fire-bg-strong gradient area; today/pace dots + gap line;
  damped forecast (±25% of run rate); pace verdict badge
  (Ahead/Behind/On, ratio thresholds 1.02/0.98).
- Vertical rhythm: `margin-top:auto` on BOTH the chart wrap and the footer
  splits the 680px panel's free space evenly — head/hero/trend top, chart
  centered, footer anchored bottom.
- Live tick guards on `.is-pace` + `.is-open`, so it never mutates a closed
  modal; `animateValue` snaps to the final frame under reduced motion.
- Class names and element ids keep their dashboard-home spellings
  (`seg-toggle`, `live-badge`, `chart-*`, `revenue*`) so the two files stay
  diffable; generic names (`panel-head`) are scoped under `.c-modal-sales`.
- `collabrium-dls/` untouched; all colors/sizes are DS tokens per the source
  file's own token discipline.

## Verification (real pointer input)

Pace card click → modal shows the live card (viewBox = layout width, thumb =
button width, data correct, live tick observed); YTD toggle click switches all
seven bound fields and slides the thumb; Escape closes and clears `.is-pace`;
At-risk card click → modal opens blank (`.c-modal-sales` display:none, aria
"Card detail"); console clean.
