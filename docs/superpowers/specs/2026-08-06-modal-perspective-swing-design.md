# Card modal: perspective-swing open/close — design

**Date:** 2026-08-06
**Page:** `pages/app-shell-intro.html`
**Status:** Implemented (plan 2026-08-06-modal-perspective-swing.md; commits dfda9cb, 30aa617, 17cbe04, f7cfa8a + final-pass commit)
**Builds on:** the card modal introduced in commit `cb0b587` (fixed top-layer modal
with FLIP morph); reference motion: fff.cmiscm.com card-open transition (user's
screen recording, frame-analyzed 2026-08-06; visual companion demo D chosen over
three segmented-fold variants A/B/C).

## Goal

Replace the modal panel's straight FLIP morph with a **rigid 3D perspective
swing**: the panel lifts off the clicked card's slot, pivots corner-leading in
3D mid-flight (the trapezoid silhouette from the reference), lands centered
with a small overshoot, and settles flat. Close is the reverse swing, shorter
and without overshoot.

## What does NOT change

- Modal architecture: `position:fixed` overlay at z-index 90, `.c-card-modal` /
  `.c-card-modal-backdrop` / `.c-card-modal-panel` structure, blank placeholder
  panel, `aria-hidden`/`role="dialog"` handling.
- Triggers: open on card click (with the existing `didDrag` and `a, button`
  guards), close on backdrop click or Escape.
- Backdrop colour/opacity: `--color-canvas-warm` at .88.
- The card fan, tilt, skeleton, reveal — untouched.
- `collabrium-dls/` — untouched, as always.

## Motion spec

### Open (~800ms, `cubic-bezier(.25,.9,.35,1)`)

Opacity ramps alongside the transform: .4 at 0% (matches the pre-swing morph's
mid-flight dim), 1 by 45%, held at 1 through 78% and 100%.

One CSS `@keyframes` track, three poses between start and rest:

| Progress | Pose | Opacity |
|---|---|---|
| 0% | At the clicked card's rect: `translate(var(--sw-dx), var(--sw-dy)) scale(var(--sw-sx), var(--sw-sy))`, flat (0° rotations) | .4 |
| ~45% | Halfway along the travel path (`calc(var(--sw-dx) * .5)`, same for dy), `scale(.7)` (absolute — between the ~0.58 start scale and 1), `rotateY(calc(48deg * var(--sw-dir)))` `rotateZ(calc(-7deg * var(--sw-dir)))` — corner-leading trapezoid | 1 |
| ~78% | Full size, centered, overshot past flat: `rotateY(calc(-7deg * var(--sw-dir)))` `rotateZ(calc(1deg * var(--sw-dir)))` | 1 (unset, carries forward) |
| 100% | Identity — flat, centered | 1 |

- `--sw-dir` is `1` when the card sits left of the viewport centre (right edge
  leads) and `-1` when right of centre (mirrored), so the swing always reads as
  "turning toward the viewer." Computed in JS at open time from the card rect.
- `--sw-dx/--sw-dy/--sw-sx/--sw-sy` come from the existing `cardRectTransform()`
  math (card rect → panel rect), set inline on the panel per open.
- `perspective: 1200px` on `.c-card-modal` (the fixed overlay) so the rotation
  reads at screen scale. `transform-origin` stays `top left` (the FLIP math
  depends on it).
- Backdrop fade lengthens 0.4s → 0.5s so it lands with the panel.

### Close (~550ms, `cubic-bezier(.3,.6,.35,1)`, no overshoot)

Reverse swing: identity → mid pose (~45° at the halfway point) → card rect.
Implemented as a second keyframes track (`animation-direction: reverse` is not
used — the overshoot must not replay on close). Opacity holds at 1 through
0% and 50%, dropping to .35 only at 100% (matches the pre-swing morph's
mid-flight dim, symmetric with open's start opacity). Hide timer updates to
match the 550ms (plus the existing 50ms slack).

### Reduced motion

Under `@media (prefers-reduced-motion: reduce)`, skip both keyframe tracks and
keep the current straight transition morph (the pre-this-spec behaviour).

## Implementation notes

- Keyframes read `var()` at element scope, so a single track serves all six
  cards and both directions; JS only sets the five `--sw-*` custom properties
  and toggles classes (`is-swinging-open` / `is-swinging-closed`). The
  keyframes carry the full component prefix — `c-card-modal-swing-open` /
  `c-card-modal-swing-close` — per this page's namespacing convention. Every
  `var(--sw-*)` reference carries a fallback (`0px` for the translate axes,
  `1` for the scale axes, `1` for `--sw-dir`) so an unset custom property
  degrades to the identity pose (and un-mirrored rotation sign) instead of an
  invalid transform.
- The 78% pose spells out the full transform function list —
  `translate(0px, 0px) scale(1) rotateY(...) rotateZ(...)` — rather than
  omitting the settled functions, so every keyframe segment interpolates
  per-function instead of jumping where a function drops out of the list.
- The panel stays Motion-free (plain CSS animation; no ownership conflict with
  motion.dev, which owns the cards' transforms, not the panel's).
- The existing reflow-commit pattern (`void offsetWidth`) is kept, but moved
  inside `setSwingVars()` itself: the function unconditionally strips the
  swing classes and forces a reflow before reading the panel's rect, so every
  caller gets an untransformed measurement without repeating the prologue.
  `animationend` (with a `setTimeout` fallback, per this page's
  backgrounded-tab convention) still drives the end-of-close cleanup.
- The base `.c-card-modal-panel` rule keeps its pre-swing `.6s` `transform`
  transition; the reduced-motion media block only sets `animation:none` on
  the swing classes. A `both`-fill animation always wins over a transition
  while it's playing, so the transition is inert on the swing path and only
  becomes live again — intentionally — once reduced motion suppresses the
  animation.
- Both flight paths measure the panel untransformed before reading its rect:
  `setSwingVars()` (swing path) strips the swing classes and forces a reflow
  at its own top; `cardRectTransform()` (reduced-motion path) suppresses the
  base transition and clears any in-flight inline transform, then forces a
  reflow, before either reads `getBoundingClientRect()`. Callers of
  `cardRectTransform()` re-enable the transition afterward so the morph
  actually animates.
- Page-local classes documented inline, per the established pattern.

## Non-goals

- No modal content (panel stays a blank placeholder for the upcoming build).
- No change to which gestures open/close the modal.
- No segmented fold (variants A/B/C were explicitly not chosen).

## Verification approach

Real pointer clicks (the `computer` tool, not synthetic dispatch — the
pointer-capture lesson) on the leftmost, centre, and rightmost cards:
`--sw-dir` sign must match card side; open/close class lifecycle and
`aria-hidden` assert correctly; `animationend` cleanup runs (fallback timer in
a throttled tab). Mid-flight frames can't render in the sandboxed pane, so
pose-level QA is the user's visual check in a real browser. Console clean.
