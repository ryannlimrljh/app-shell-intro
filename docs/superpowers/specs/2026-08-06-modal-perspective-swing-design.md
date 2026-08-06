# Card modal: perspective-swing open/close — design

**Date:** 2026-08-06
**Page:** `pages/app-shell-intro.html`
**Status:** Approved by user, pending implementation plan
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

One CSS `@keyframes` track, three poses between start and rest:

| Progress | Pose |
|---|---|
| 0% | At the clicked card's rect: `translate(var(--sw-dx), var(--sw-dy)) scale(var(--sw-sx), var(--sw-sy))`, flat (0° rotations) |
| ~45% | Halfway along the travel path (`calc(var(--sw-dx) * .5)`, same for dy), `scale(.7)` (absolute — between the ~0.58 start scale and 1), `rotateY(calc(48deg * var(--sw-dir)))` `rotateZ(calc(-7deg * var(--sw-dir)))` — corner-leading trapezoid |
| ~78% | Full size, centered, overshot past flat: `rotateY(calc(-7deg * var(--sw-dir)))` `rotateZ(calc(1deg * var(--sw-dir)))` |
| 100% | Identity — flat, centered |

- `--sw-dir` is `1` when the card sits left of the viewport centre (right edge
  leads) and `-1` when right of centre (mirrored), so the swing always reads as
  "turning toward the viewer." Computed in JS at open time from the card rect.
- `--sw-dx/--sw-dy/--sw-sx/--sw-sy` come from the existing `cardRectTransform()`
  math (card rect → panel rect), set inline on the panel per open.
- `perspective: 1200px` on `.c-card-modal` (the fixed overlay) so the rotation
  reads at screen scale. `transform-origin` stays `top left` (the FLIP math
  depends on it).
- Backdrop fade lengthens 0.4s → 0.5s so it lands with the panel.

### Close (~550ms, same curve family, no overshoot)

Reverse swing: identity → mid pose (~45° at the halfway point) → card rect.
Implemented as a second keyframes track (`animation-direction: reverse` is not
used — the overshoot must not replay on close). Hide timer updates to match
the 550ms (plus the existing 50ms slack).

### Reduced motion

Under `@media (prefers-reduced-motion: reduce)`, skip both keyframe tracks and
keep the current straight transition morph (the pre-this-spec behaviour).

## Implementation notes

- Keyframes read `var()` at element scope, so a single track serves all six
  cards and both directions; JS only sets the five `--sw-*` custom properties
  and toggles classes (`is-swinging-open` / `is-swinging-closed` or similar).
- The panel stays Motion-free (plain CSS animation; no ownership conflict with
  motion.dev, which owns the cards' transforms, not the panel's).
- The existing reflow-commit pattern (`void offsetWidth`) is replaced by
  animation start/end handling: keyframes don't need a committed start frame,
  but `animationend` (with a `setTimeout` fallback, per this page's
  backgrounded-tab convention) drives the end-of-close cleanup.
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
