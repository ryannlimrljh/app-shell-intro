# Top-3 Focus Ribbons Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Put ranked folded-ribbon corners (Focus 1 / 2 / 3) on the Pipeline, At risk, and AI next-best-action highlight cards, and reword the greeting subtitle so the ribbons read as deliberate prioritization.

**Architecture:** One page-local CSS block (`.c-hcard-ribbon`) plus one `<span>` in each of the three flagged cards' markup. No JS: the ribbon is authored content, so it inherits the page's existing skeleton/reveal, hover-tilt, and modal machinery for free. The band's offsets are derived from the spec's chord geometry, not tuned by eye.

**Tech Stack:** Static HTML/CSS in the single file `pages/app-shell-intro.html`. No build step, **no test framework** — verification is in-browser measurement and screenshots via the Browser pane. Dev server: `python3 -m http.server 8791` from the worktree root; page at `http://localhost:8791/pages/app-shell-intro.html`.

**Context you need before touching anything:**
- Worktree: `/Users/kwlkokho/Documents/GitHub/Collabrium-DS/.worktrees/app-shell-intro-page`, branch `app-shell-intro-page`.
- **`collabrium-dls/` is READ-ONLY.** Never modify it. Read it for token values only.
- The page's `<style>` block loads *after* `collabrium-dls/components.css`, so equal-specificity ties win by source order. Page-local classes are documented with an inline comment explaining the *why* — match that density; the file's comment style is the house style and reviewers hold it to that bar.
- The sandboxed Browser pane runs pages **hidden**: CSS animations/transitions stall and `requestAnimationFrame` may not fire. Assert computed styles, class state, and **offset geometry**, not mid-flight animation poses. Screenshots force a render of the current frame.
- **Never verify clicks with synthetic dispatched events** — they bypass the pointer pipeline and have false-passed on this page before. Use the `computer` tool's real pointer input.
- Browser-pane screenshot space is 800×450 while the page viewport is 1280×720. To aim a real click, read the target's `getBoundingClientRect()` and multiply by **0.625**.
- The page has a ~6 second load choreography (wipe → nav reveal → nav auto-collapse → card reveal). Wait ~6s after load before measuring or clicking cards.

**Spec:** `docs/superpowers/specs/2026-08-07-top3-focus-ribbons-design.md` (commit `16545f4`). Read it if any decision here seems arbitrary — it records the geometry derivation.

**Hard constraint — the cards themselves do not change.** The user was explicit: no extra shadow or border on the flagged cards, no dimming or desaturating of the unflagged three, no layout shift, no re-ordering of the row. The only additions are the ribbon rules, the three ribbon spans, and the subtitle copy. If you find yourself editing a `.c-card`, `.c-card-slide`, `.c-hcard-risk`, or `.c-hcard-ai` rule, stop — that is out of scope.

## Deviations from this plan (applied during code review)

Task 1's CSS shipped differently from the block written in Task 1 Step 1 below.
Code review caught the first item as a blocker specifically because it had to be
settled *before* Task 2 wrote markup on three cards; the rest were folded into
the same fix commit. **Task 1's own text below is left as originally written —
it is the historical record. Task 2's markup snippets have been corrected in
place, since that work was still ahead.**

- **The band element is `<span class="c-hcard-ribbon-band">`, not `<i>`.** In
  this file `<i>` means "Phosphor icon glyph" (~20 existing uses, and both
  existing precedents for that selector shape — `.c-hcard-thumb i`,
  `.c-account-menu-item i` — target icons). A descendant selector
  `.c-hcard-ribbon i` would also have matched any icon later added inside a
  ribbon, silently rendering it as a second rotated orange band stacked on the
  first. The classed span also matches the file's habit of naming page-local
  parts (`c-hcard-label`, `c-hcard-rec`, `c-skeleton-bar`), and lets
  `font-style:normal` go — that declaration existed only to undo `<i>`.
- **`overflow:clip` rather than `overflow:hidden`.** `hidden` clips visually but
  leaves the box programmatically scrollable, holding ~25px of hidden band
  overhang that a stray `scrollIntoView` on a descendant could shift out of
  place. `clip` clips identically, respects the radius, and creates no scroll
  container. `display:block` added alongside it, since `overflow` only applies
  to the span because `position:absolute` blockifies it.
- **`font-weight:var(--weight-extrabold)`** instead of a raw `800`.
- **The geometry comment was corrected on three counts:** containment is credited
  to `overflow`, not the corner radius (measured, the radius is inert at a=56 —
  the nearest painted pixel sits ~29px from the corner against the arc's ~8px);
  the text budget now names its anchor word ("FOCUS 1", measured at ~53px, not
  the ~58px first assumed) and states the ~79px ceiling, so a maintainer rewording the label can tell whether the new
  word fits; and the rejected S=56 attempt now gives its `a=32` so the quoted
  ~45px chord is reproducible from the formula. It also records the tracking
  deviation (0.08em is double label3's own 0.04em, deliberately) and the
  direct-child precondition the skeleton/reveal inheritance depends on.

---

### Task 1: Ribbon CSS

**Files:**
- Modify: `pages/app-shell-intro.html` — insert a new CSS block immediately **after** the shared-label rule that ends at line 469 (find it with `grep -n "c-hcard-label,-\?$" pages/app-shell-intro.html`, or search for the line starting `.c-card-slide .c-stat-label{font-size:var(--text-h3-size)`). Insert after that rule's closing `}` and its trailing comment, before the `/* Shared card rhythm` comment block.

- [ ] **Step 1: Add the ribbon CSS block**

Insert exactly this (the comment is required — it carries the geometry derivation a future maintainer would otherwise have to re-derive):

```css
  /* ---- Top-3 focus ribbon (2026-08-07 spec). A folded corner band on
     the three cards Collabrium ranks highest, so the row reads as a
     priority order rather than six equal tiles. Authored in the markup
     like all other card content, so it inherits the skeleton/reveal
     cascade, the hover tilt, and the modal swing with no JS of its own.
     GEOMETRY (do not re-tune by eye): the band's usable text length is
     the CHORD it cuts across the corner box, not the box's width — for
     a box of side S whose centreline meets each edge at distance `a`
     from the corner, chord = a x root-2, and S must clear
     a + (band height / 2) x root-2 so the band's far edge stays inside
     the box. Here S=80, a=56, height=22 -> chord ~79px against ~58px of
     text (~10px clear each side); a first attempt at S=56 gave only
     ~45px and clipped the word at both ends. The band's own offsets
     fall straight out of those numbers: top = (a - height)/2 = 17px,
     right = -(width - a)/2 = -36px. The box clips to the card's own
     radius-lg corner, so nothing overflows into the fan's rotated-
     corner gutter and the slider track's clip-safety padding is
     untouched. pointer-events:none so it never swallows a card click
     (the whole card opens the modal). */
  .c-hcard-ribbon{position:absolute; top:0; right:0; width:80px; height:80px; overflow:hidden; border-top-right-radius:var(--radius-lg); pointer-events:none;}
  .c-hcard-ribbon i{position:absolute; top:17px; right:-36px; width:128px; height:22px; background:var(--color-orange); color:var(--color-neutral-1); font-family:var(--font-primary); font-size:var(--text-label3-size); line-height:22px; font-weight:800; letter-spacing:.08em; text-transform:uppercase; text-align:center; white-space:nowrap; font-style:normal; transform:rotate(45deg);}
```

Note `font-style:normal` — the band uses `<i>` as a neutral inline element (matching how the page already uses `<i>` for Phosphor icons), so the browser's default italic must be cancelled.

- [ ] **Step 2: Verify the CSS parses and resolves**

Ensure a dev server is running (from the worktree root: `python3 -m http.server 8791`, backgrounded). Load `http://localhost:8791/pages/app-shell-intro.html` in the Browser pane, then run via `javascript_tool`:

```js
(() => {
  const probe = document.createElement('span');
  probe.className = 'c-hcard-ribbon';
  probe.innerHTML = '<i>Focus 1</i>';
  document.querySelector('.c-card-slide').appendChild(probe);
  const box = getComputedStyle(probe);
  const band = getComputedStyle(probe.querySelector('i'));
  const out = {
    boxW: box.width, boxH: box.height, boxOverflow: box.overflow,
    boxRadiusTR: box.borderTopRightRadius, boxPointerEvents: box.pointerEvents,
    bandTop: band.top, bandRight: band.right, bandW: band.width,
    bandBg: band.backgroundColor, bandTransform: band.transform,
    bandFontSize: band.fontSize, bandStyle: band.fontStyle
  };
  probe.remove();
  return out;
})()
```

Expected: `boxW: "80px"`, `boxH: "80px"`, `boxOverflow: "hidden"`, `boxRadiusTR: "20px"`, `boxPointerEvents: "none"`, `bandTop: "17px"`, `bandRight: "-36px"`, `bandW: "128px"`, `bandBg: "rgb(255, 88, 37)"`, `bandTransform` a matrix (the rotation — roughly `matrix(0.707107, 0.707107, -0.707107, 0.707107, 0, 0)`), `bandFontSize: "11px"`, `bandStyle: "normal"`.

Then check `read_console_messages` with `onlyErrors: true` — must be empty.

- [ ] **Step 3: Commit**

```bash
git add pages/app-shell-intro.html
git commit -m "feat: focus-ribbon CSS for the top-3 highlight cards"
```

End the commit body with:
```
Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>
```

---

### Task 2: Ribbon markup on the three flagged cards

**Files:**
- Modify: `pages/app-shell-intro.html` — three card blocks. Locate them with `grep -n 'class="c-card c-card-slide' pages/app-shell-intro.html`; the three targets are the first card (plain `.c-card-slide`, contains `<span class="c-hcard-label">Pipeline</span>`), the `.c-hcard-risk` card, and the `.c-hcard-ai` card.

- [ ] **Step 1: Add the ribbon to the Pipeline card**

Find:

```html
            <div class="c-card c-card-slide">
              <span class="c-hcard-label">Pipeline</span>
```

Replace with:

```html
            <div class="c-card c-card-slide">
              <span class="c-hcard-ribbon" role="img" aria-label="Focus 1 of 3"><span class="c-hcard-ribbon-band" aria-hidden="true">Focus 1</span></span>
              <span class="c-hcard-label">Pipeline</span>
```

- [ ] **Step 2: Add the ribbon to the At risk card**

Find:

```html
            <div class="c-card c-card-slide c-hcard-risk">
              <span class="c-hcard-label"><i class="ph-fill ph-warning"></i> At risk</span>
```

Replace with:

```html
            <div class="c-card c-card-slide c-hcard-risk">
              <span class="c-hcard-ribbon" role="img" aria-label="Focus 2 of 3"><span class="c-hcard-ribbon-band" aria-hidden="true">Focus 2</span></span>
              <span class="c-hcard-label"><i class="ph-fill ph-warning"></i> At risk</span>
```

- [ ] **Step 3: Add the ribbon to the AI next-best-action card**

Find:

```html
            <div class="c-card c-card-slide c-hcard-ai">
              <span class="c-hcard-label">🤖 Next best action</span>
```

Replace with:

```html
            <div class="c-card c-card-slide c-hcard-ai">
              <span class="c-hcard-ribbon" role="img" aria-label="Focus 3 of 3"><span class="c-hcard-ribbon-band" aria-hidden="true">Focus 3</span></span>
              <span class="c-hcard-label">🤖 Next best action</span>
```

Why `role="img"` + `aria-label` with the band `aria-hidden`: a rotated "FOCUS 1" fragment read in isolation is meaningless, and a bare `<span aria-label>` may be skipped by screen readers, whereas `role="img"` + `aria-label` is reliably announced. The label wording matches the visible word rather than paraphrasing it.

- [ ] **Step 4: Verify all three render, and that the unflagged three do not**

Reload `http://localhost:8791/pages/app-shell-intro.html`, wait ~6s for the load choreography, then run:

```js
(() => new Promise(resolve => {
  setTimeout(() => {
    resolve([...document.querySelectorAll('.c-card-slide')].map(card => {
      const rib = card.querySelector('.c-hcard-ribbon');
      const label = card.querySelector('.c-hcard-label, .c-stat-label');
      return {
        card: label ? label.textContent.trim().slice(0, 18) : '?',
        ribbon: rib ? rib.getAttribute('aria-label') : null,
        bandText: rib ? rib.querySelector('.c-hcard-ribbon-band').textContent : null,
        // The ribbon is a direct child, so the page's skeleton rules
        // (.is-loading > :not(.c-hcard-skeleton){opacity:0}) hide it during
        // load and the .is-loaded cascade brings it back. This asserts the
        // spec's claim that it inherits that machinery correctly — a ribbon
        // stuck at opacity 0 would mean the cascade never released it.
        opacity: rib ? getComputedStyle(rib).opacity : null,
        loadClassesCleared: !card.classList.contains('is-loading') && !card.classList.contains('is-loaded')
      };
    }));
  }, 6000);
}))()
```

Expected exactly: Pipeline → `"Focus 1 of 3"` / `"Focus 1"`; At risk → `"Focus 2 of 3"` / `"Focus 2"`; Pace → `null`; Upsell → `null`; SEA team → `null`; Next best action → `"Focus 3 of 3"` / `"Focus 3"`. Every flagged card must additionally show `opacity: "1"` and `loadClassesCleared: true`.

- [ ] **Step 5: Verify the band is fully visible (not clipped) on all three**

The whole point of the 80px sizing is that the word fits. Measure the band's rendered text width against its chord:

```js
(() => {
  const r = new Range();
  return [...document.querySelectorAll('.c-hcard-ribbon')].map(rib => {
    const band = rib.querySelector('.c-hcard-ribbon-band');
    r.selectNodeContents(band);
    return {
      label: rib.getAttribute('aria-label'),
      textW: +r.getBoundingClientRect().width.toFixed(1),
      chord: +(56 * Math.SQRT2).toFixed(1),
      bandVisibleInBox: rib.getBoundingClientRect().width === 80
    };
  });
})()
```

Expected: `textW` around 55–62px on each, comfortably under `chord` ≈ 79.2, and `bandVisibleInBox: true`. If any `textW` exceeds ~75px, STOP and report — the type is rendering wider than the spec assumed and the box needs revisiting rather than silently clipping.

- [ ] **Step 6: Check the label-collision question the spec deliberately left open**

The spec adds **no** pre-emptive right padding on the eyebrow labels, because the band only intrudes across the label row and the current labels look far too short to reach it. Verify that empirically rather than assuming:

```js
(() => {
  // The band's leftmost incursion into the card's content box happens at
  // the TOP of the label row and moves right as y increases. Card is
  // 340px wide with 24px padding; ribbon box occupies the rightmost 80px.
  // Band centreline runs from (cardW-80+24, 0) to (cardW, 56); half its
  // thickness projects ~15.6px horizontally.
  return [...document.querySelectorAll('.c-hcard-ribbon')].map(rib => {
    const card = rib.closest('.c-card-slide');
    const label = card.querySelector('.c-hcard-label, .c-stat-label');
    const cardR = card.getBoundingClientRect();
    const labelR = label.getBoundingClientRect();
    const yTop = labelR.top - cardR.top;
    const bandLeftAtLabelTop = (cardR.width - 80 + 24) + yTop - 15.6;
    return {
      label: label.textContent.trim().slice(0, 18),
      labelRightEdge: +(labelR.right - cardR.left).toFixed(1),
      bandLeftEdgeAtLabelTop: +bandLeftAtLabelTop.toFixed(1),
      clear: (labelR.right - cardR.left) < bandLeftAtLabelTop
    };
  });
})()
```

Expected: `clear: true` on all three. **If any is `false`**, add this rule directly after the two `.c-hcard-ribbon` rules from Task 1 and re-run:

```css
  /* Only needed if a flagged card's label actually reaches the band —
     measured, not pre-emptive (see the 2026-08-07 spec). */
  .c-card-slide:has(> .c-hcard-ribbon) .c-hcard-label{padding-right:var(--spacing-32);}
```

Then report in the task summary whether the padding was needed, so the spec can be trued up either way.

- [ ] **Step 7: Verify the ribbons don't break the card interactions**

Using the **`computer` tool** (real pointer input — not synthetic events):

1. Take a screenshot to cache the pane dimensions.
2. Compute a click point on the **At risk** card and click it:
   ```js
   (() => { const r = document.querySelector('.c-hcard-risk').getBoundingClientRect();
     return { x: Math.round((r.left + r.width/2) * 0.625), y: Math.round((r.top + r.height/2) * 0.625) }; })()
   ```
3. Assert the modal opened (the ribbon's `pointer-events:none` must not have blocked it):
   ```js
   (() => { const m = document.getElementById('cardModal');
     return { open: m.classList.contains('is-open'), aria: m.getAttribute('aria-hidden') }; })()
   ```
   Expected: `open: true`, `aria: "false"`.
4. Press Escape with the `computer` tool; after ~800ms assert `open: false` and `aria: "true"`.
5. Screenshot the card row for visual sign-off — all three ribbons should read cleanly, clipped to the rounded corner, on white, fire-tint, and obsidian.
6. `read_console_messages` with `onlyErrors: true` — must be empty.

- [ ] **Step 8: Commit**

```bash
git add pages/app-shell-intro.html
git commit -m "feat: Focus 1-3 ribbons on the top-3 highlight cards"
```

End the commit body with:
```
Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>
```

---

### Task 3: Subtitle reword + docs true-up

**Files:**
- Modify: `pages/app-shell-intro.html:808` — the greeting subtitle
- Modify: `docs/superpowers/specs/2026-08-07-top3-focus-ribbons-design.md` — status line, and the label-collision note if Task 2 Step 6 needed the padding

- [ ] **Step 1: Reword the subtitle**

Find:

```html
          <p id="greetingSubtitle">Here's what needs your eyes across the business today.</p>
```

Replace with:

```html
          <p id="greetingSubtitle">Here's what needs your eyes today — I've flagged your top 3.</p>
```

This is what makes three ribbons read as deliberate prioritization rather than ornament. Do not touch the `<h1>` above it, and do not touch `revealCanvasContent()` — the subtitle's reveal is driven by its existing `#greetingSubtitle` id and needs no change.

- [ ] **Step 2: Verify the subtitle renders and still reveals**

Reload, wait ~6s, then:

```js
(() => { const s = document.getElementById('greetingSubtitle');
  return { text: s.textContent, revealed: s.classList.contains('is-revealed'), opacity: getComputedStyle(s).opacity }; })()
```

Expected: `text: "Here's what needs your eyes today — I've flagged your top 3."`, `revealed: true`, `opacity: "1"`.

- [ ] **Step 3: Update the spec's status line**

In `docs/superpowers/specs/2026-08-07-top3-focus-ribbons-design.md`, change:

```markdown
**Status:** Approved by user, pending implementation plan
```

to:

```markdown
**Status:** Implemented (plan 2026-08-07-top3-focus-ribbons.md)
```

If Task 2 Step 6 found a real label collision and you added the `padding-right` rule, also update the spec's **Label collision** bullet to say the padding was measured as necessary and applied, replacing the "no right padding is added pre-emptively" wording. If no collision was found, leave that bullet as-is — it correctly describes what shipped.

- [ ] **Step 4: Final pass — re-run the full check set**

On a fresh reload (wait ~6s), confirm all of: the three ribbons present with correct aria-labels and unclipped text (Task 2 Steps 4–5), the three unflagged cards ribbon-free, label clearance `true` (or padding applied), the subtitle's new copy revealed, a real-pointer card click still opening and Escape closing the modal (Task 2 Step 7), and a clean console. Take one final screenshot of the full card row plus greeting.

- [ ] **Step 5: Commit**

```bash
git add pages/app-shell-intro.html docs/superpowers/specs/2026-08-07-top3-focus-ribbons-design.md
git commit -m "feat: subtitle frames the top-3 flags; mark ribbon spec implemented"
```

End the commit body with:
```
Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>
```
