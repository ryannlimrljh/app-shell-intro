# Modal Perspective-Swing Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the card modal's straight FLIP morph with a rigid 3D perspective swing (open ~800ms with corner-leading trapezoid pose and overshoot; close ~550ms reverse without overshoot), per `docs/superpowers/specs/2026-08-06-modal-perspective-swing-design.md`.

**Architecture:** Pure CSS `@keyframes` on the modal panel, parameterized by inline custom properties (`--sw-dx/--sw-dy/--sw-sx/--sw-sy/--sw-dir`) that JS computes from the clicked card's rect (the existing FLIP math). JS switches from inline-transition juggling to class toggling (`is-swinging-open` / `is-swinging-closed`). A `prefers-reduced-motion` branch keeps the pre-existing straight transition morph.

**Tech Stack:** Static HTML/CSS/vanilla JS, single file `pages/app-shell-intro.html`. No test framework — verification is in-browser assertions via the Browser pane (`javascript_tool`) plus **real pointer clicks** (`computer` tool; synthetic dispatched clicks false-pass on this page — see the pointer-capture incident in git history around commit `b86ac62`). Dev server: `python3 -m http.server 8791` serving the worktree root; page at `http://localhost:8791/pages/app-shell-intro.html`.

**Context you need before touching anything:**
- Worktree: `/Users/kwlkokho/Documents/GitHub/Collabrium-DS/.worktrees/app-shell-intro-page`, branch `app-shell-intro-page`. The `collabrium-dls/` directory is READ-ONLY — never modify it.
- The sandboxed Browser pane runs pages hidden: CSS animations/transitions stall and rAF may not fire. Assert **classes, inline styles, and computed `animation-name`**, not mid-flight poses. Screenshots force a render of the current frame.
- The page's `<style>` loads after `collabrium-dls/components.css`, so equal-specificity ties win by source order.
- Motion.dev owns the **cards'** inline transforms. The modal panel must stay Motion-free (it is today; keep it that way).

---

### Task 1: Swing CSS (keyframes + perspective + reduced-motion)

**Files:**
- Modify: `pages/app-shell-intro.html` — the modal CSS block (currently lines ~262-280, find with `grep -n "c-card-modal{" pages/app-shell-intro.html`)

- [ ] **Step 1: Replace the modal CSS block**

Find this exact CSS (5 rules):

```css
  .c-card-modal{position:fixed; inset:0; z-index:90; display:none; align-items:center; justify-content:center;}
  .c-card-modal.is-open{display:flex;}
  .c-card-modal-backdrop{position:absolute; inset:0; background:var(--color-canvas-warm); opacity:0; transition:opacity .4s ease;}
  .c-card-modal.is-shown .c-card-modal-backdrop{opacity:.88;}
  .c-card-modal-panel{position:relative; width:min(590px, calc(100vw - 64px)); height:min(680px, calc(100vh - 64px)); background:var(--color-neutral-1); border:1px solid var(--color-neutral-3); border-radius:var(--radius-lg); box-shadow:0 25px 50px -12px rgba(0,0,0,.25); transform-origin:top left; transition:transform .6s cubic-bezier(.16,1,.3,1), opacity .4s ease;}
```

Replace with (note: panel loses its `transition` — the swing is animation-driven; the transition returns only under reduced motion):

```css
  .c-card-modal{position:fixed; inset:0; z-index:90; display:none; align-items:center; justify-content:center; perspective:1200px;}
  .c-card-modal.is-open{display:flex;}
  .c-card-modal-backdrop{position:absolute; inset:0; background:var(--color-canvas-warm); opacity:0; transition:opacity .5s ease;}
  .c-card-modal.is-shown .c-card-modal-backdrop{opacity:.88;}
  .c-card-modal-panel{position:relative; width:min(590px, calc(100vw - 64px)); height:min(680px, calc(100vh - 64px)); background:var(--color-neutral-1); border:1px solid var(--color-neutral-3); border-radius:var(--radius-lg); box-shadow:0 25px 50px -12px rgba(0,0,0,.25); transform-origin:top left;}
  /* Perspective swing (2026-08-06 spec): one keyframe track serves all six
     cards and both swing directions — the flight is parameterized by inline
     custom properties set from JS at open/close time (--sw-dx/-dy/-sx/-sy =
     the FLIP card-rect pose, --sw-dir = 1 when the card is left of the
     viewport centre, -1 when right, so the panel always turns toward the
     viewer). Keyframes evaluate var() at the element's scope, which is what
     makes the parameterization possible. perspective sits on .c-card-modal
     (the fixed overlay) so the rotation reads at screen scale;
     transform-origin stays top left because the FLIP math depends on it. */
  .c-card-modal-panel.is-swinging-open{animation:c-modal-swing-open .8s cubic-bezier(.25,.9,.35,1) both;}
  .c-card-modal-panel.is-swinging-closed{animation:c-modal-swing-close .55s cubic-bezier(.3,.6,.35,1) both;}
  @keyframes c-modal-swing-open{
    0%{transform:translate(var(--sw-dx), var(--sw-dy)) scale(var(--sw-sx), var(--sw-sy)); opacity:.4;}
    45%{transform:translate(calc(var(--sw-dx) * .5), calc(var(--sw-dy) * .5)) scale(.7) rotateY(calc(48deg * var(--sw-dir))) rotateZ(calc(-7deg * var(--sw-dir))); opacity:1;}
    78%{transform:rotateY(calc(-7deg * var(--sw-dir))) rotateZ(calc(1deg * var(--sw-dir)));}
    100%{transform:none; opacity:1;}
  }
  @keyframes c-modal-swing-close{
    0%{transform:none; opacity:1;}
    50%{transform:translate(calc(var(--sw-dx) * .5), calc(var(--sw-dy) * .5)) scale(.7) rotateY(calc(45deg * var(--sw-dir))) rotateZ(calc(-6deg * var(--sw-dir))); opacity:1;}
    100%{transform:translate(var(--sw-dx), var(--sw-dy)) scale(var(--sw-sx), var(--sw-sy)); opacity:.35;}
  }
  /* Reduced motion: the pre-swing straight morph (JS branches to the old
     inline-transition path when this media query matches). */
  @media (prefers-reduced-motion: reduce){
    .c-card-modal-panel{transition:transform .6s cubic-bezier(.16,1,.3,1), opacity .4s ease;}
    .c-card-modal-panel.is-swinging-open, .c-card-modal-panel.is-swinging-closed{animation:none;}
  }
```

Also update the explanatory comment above the block (it describes the old
transition morph) — it should now say the open/close flight is the
perspective swing per the 2026-08-06 spec, with the FLIP-morph description
moved to the reduced-motion note.

- [ ] **Step 2: Verify the CSS parses and the keyframes resolve**

Serve the page (`python3 -m http.server 8791` from the worktree root if not already running), load `http://localhost:8791/pages/app-shell-intro.html` in the Browser pane, then run via `javascript_tool`:

```js
(() => {
  const panel = document.querySelector('.c-card-modal-panel');
  panel.classList.add('is-swinging-open');
  const name = getComputedStyle(panel).animationName;
  const dur = getComputedStyle(panel).animationDuration;
  panel.classList.remove('is-swinging-open');
  const persp = getComputedStyle(document.getElementById('cardModal')).perspective;
  return { name, dur, persp };
})()
```

Expected: `{ name: "c-modal-swing-open", dur: "0.8s", persp: "1200px" }`.

- [ ] **Step 3: Commit**

```bash
git add pages/app-shell-intro.html
git commit -m "feat: perspective-swing keyframes for the card modal (CSS)"
```

---

### Task 2: Swing JS (custom-property FLIP + class-driven open/close + reduced-motion branch)

**Files:**
- Modify: `pages/app-shell-intro.html` — the modal JS block (find with `grep -n "cardRectTransform" pages/app-shell-intro.html`, currently lines ~929-1004)

- [ ] **Step 1: Replace the modal JS**

Find the block starting at the comment `// Card detail modal — clicking a card opens the blank placeholder` down to (and including) the `document.addEventListener('keydown', …)` listener and its closing `}` of the `if (cardModal && modalPanel && modalBackdrop) {` guard. Replace the guard's body (keep the three `const cardModal/modalPanel/modalBackdrop` lookups and the `if` line as they are) with:

```js
      const MODAL_MORPH_MS = 600;       // reduced-motion fallback: must match the transition in the @media block
      const MODAL_SWING_OPEN_MS = 800;  // must match c-modal-swing-open's animation-duration
      const MODAL_SWING_CLOSE_MS = 550; // must match c-modal-swing-close's animation-duration
      const REDUCED_MOTION = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      let modalSourceCard = null;  // the card the open panel swung out of; null = modal closed
      let modalHideTimer = null;

      function cardRectTransform() {
        // Transform that lays the identity-positioned panel exactly
        // over the source card (transform-origin is top left, so a
        // translate to the rect corner + a non-uniform scale to the
        // rect size is sufficient). Used directly by the
        // reduced-motion morph; the swing path reads the same numbers
        // through the --sw-* custom properties (setSwingVars).
        const from = modalSourceCard.getBoundingClientRect();
        const to = modalPanel.getBoundingClientRect();
        return `translate(${(from.left - to.left).toFixed(1)}px, ${(from.top - to.top).toFixed(1)}px) scale(${(from.width / to.width).toFixed(4)}, ${(from.height / to.height).toFixed(4)})`;
      }
      function setSwingVars() {
        // The swing keyframes are parameterized by these inline custom
        // properties — recomputed at every open AND close (the page may
        // have been scrolled while the modal was up, moving the card's
        // rect). --sw-dir flips the rotation sign so the panel always
        // turns toward the viewer: card left of the viewport centre →
        // right edge leads (+1), card right of centre → mirrored (-1).
        const from = modalSourceCard.getBoundingClientRect();
        const to = modalPanel.getBoundingClientRect();
        modalPanel.style.setProperty('--sw-dx', `${(from.left - to.left).toFixed(1)}px`);
        modalPanel.style.setProperty('--sw-dy', `${(from.top - to.top).toFixed(1)}px`);
        modalPanel.style.setProperty('--sw-sx', (from.width / to.width).toFixed(4));
        modalPanel.style.setProperty('--sw-sy', (from.height / to.height).toFixed(4));
        modalPanel.style.setProperty('--sw-dir', (from.left + from.width / 2) <= window.innerWidth / 2 ? '1' : '-1');
      }
      function finishModalHide() {
        // Idempotent end-of-close cleanup — driven by BOTH animationend
        // and a fallback timer (this page's convention: timers back up
        // every animation event, because a backgrounded tab can miss
        // events entirely).
        cardModal.classList.remove('is-open');
        cardModal.setAttribute('aria-hidden', 'true');
        modalPanel.classList.remove('is-swinging-open', 'is-swinging-closed');
        modalPanel.style.transform = '';
        modalPanel.style.opacity = '';
      }
      function openCardModal(card) {
        clearTimeout(modalHideTimer);
        modalSourceCard = card;
        cardModal.classList.add('is-open');       // display:flex — panel gets its centered layout rect
        cardModal.setAttribute('aria-hidden', 'false');
        if (REDUCED_MOTION) {
          // Straight FLIP morph (the pre-swing behaviour, kept for
          // users who've opted out of animation): commit the card-rect
          // start state with transitions off, then release.
          modalPanel.style.transition = 'none';
          modalPanel.style.transform = cardRectTransform();
          modalPanel.style.opacity = '0.4';
          void modalPanel.offsetWidth;
          modalPanel.style.transition = '';
          modalPanel.style.transform = 'none';
          modalPanel.style.opacity = '1';
        } else {
          setSwingVars();
          modalPanel.classList.remove('is-swinging-closed');
          void modalPanel.offsetWidth;            // restart cleanly if reopening right after a close
          modalPanel.classList.add('is-swinging-open');
        }
        cardModal.classList.add('is-shown');      // backdrop fades in (its own .5s ease transition)
      }
      function closeCardModal() {
        if (!modalSourceCard) return;
        if (REDUCED_MOTION) {
          modalPanel.style.transform = cardRectTransform();
          modalPanel.style.opacity = '0.4';
        } else {
          setSwingVars();                          // re-read the card slot before releasing modalSourceCard
          modalPanel.classList.remove('is-swinging-open');
          void modalPanel.offsetWidth;
          modalPanel.classList.add('is-swinging-closed');
        }
        cardModal.classList.remove('is-shown');   // backdrop fades out
        modalSourceCard = null;
        clearTimeout(modalHideTimer);
        modalHideTimer = setTimeout(finishModalHide, (REDUCED_MOTION ? MODAL_MORPH_MS : MODAL_SWING_CLOSE_MS) + 50);
      }

      modalPanel.addEventListener('animationend', (e) => {
        // Fast path for the close cleanup (the timer above is the
        // backgrounded-tab fallback). Filtered by name: the OPEN
        // animation's end must not hide the modal.
        if (e.animationName === 'c-modal-swing-close') {
          clearTimeout(modalHideTimer);
          finishModalHide();
        }
      });

      document.addEventListener('click', (e) => {
        if (didDrag) return; // a drag-release click is not an open intent (same signal the slider's own click suppressor uses)
        const card = e.target.closest('.c-card-slide');
        if (card && cardSlider.contains(card) && !modalSourceCard) {
          if (e.target.closest('a, button')) return; // real controls inside a card (e.g. the AI card's CTA button) keep their own meaning
          openCardModal(card);
        }
      });
      modalBackdrop.addEventListener('click', closeCardModal);
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeCardModal();
      });
```

Also update the block's lead comment (lines ~929-945): keep the history note
about why this is a fixed top-layer modal, but describe the flight as the
perspective swing (class-driven keyframes parameterized by `--sw-*` inline
custom properties; reduced-motion falls back to the straight FLIP morph).

Known-accepted edge (do not "fix"): pressing Escape mid-open swaps the open
animation for the close animation, whose 0% pose is identity — the panel
jumps to identity before swinging back. The old code had the equivalent
discontinuity; smoothing it is out of scope.

- [ ] **Step 2: Verify with REAL pointer clicks in the Browser pane**

Reload `http://localhost:8791/pages/app-shell-intro.html`. Wait ~6s for the reveal to finish. Then, using the **`computer` tool** (real pointer input — do NOT dispatch synthetic click events; they bypass the pointer pipeline and false-passed before):

1. Take a screenshot, click the **leftmost** card (Pipeline). Then assert via `javascript_tool`:

```js
(() => {
  const modal = document.getElementById('cardModal');
  const panel = modal.querySelector('.c-card-modal-panel');
  return {
    open: modal.classList.contains('is-open'),
    shown: modal.classList.contains('is-shown'),
    ariaHidden: modal.getAttribute('aria-hidden'),
    swingClass: panel.classList.contains('is-swinging-open'),
    dir: panel.style.getPropertyValue('--sw-dir'),
    dx: panel.style.getPropertyValue('--sw-dx'),
    animName: getComputedStyle(panel).animationName
  };
})()
```

Expected: `open: true`, `shown: true`, `ariaHidden: "false"`, `swingClass: true`, `dir: "1"` (Pipeline sits left of centre), `dx` a negative px value, `animName: "c-modal-swing-open"`. Screenshot: panel visible over dimmed page.

2. Press Escape (`computer` key action). After ~700ms assert: `is-open` false, `aria-hidden` "true", panel has neither swing class, `--sw-dir` still set (vars persist — harmless), `modal.classList.contains('is-shown')` false.

3. Scroll the slider right (drag), click the **rightmost** card (AI). Assert `dir: "-1"`.

4. Click the backdrop (a point near the viewport edge, outside the panel). Assert closed as in (2).

5. Drag the slider (>3px) and release over a card — modal must NOT open (didDrag guard).

6. `read_console_messages` with onlyErrors — must be empty.

- [ ] **Step 3: Commit**

```bash
git add pages/app-shell-intro.html
git commit -m "feat: card modal opens with a 3D perspective swing"
```

---

### Task 3: Docs true-up + final pass

**Files:**
- Modify: `docs/superpowers/specs/2026-08-06-modal-perspective-swing-design.md` (status line)

- [ ] **Step 1: Update spec status**

Change `**Status:** Approved by user, pending implementation plan` to `**Status:** Implemented (see plan 2026-08-06-modal-perspective-swing.md)` and, if any motion values changed during implementation (angles, durations), true the spec's tables up to what shipped.

- [ ] **Step 2: Re-run the full click matrix once more**

Repeat Task 2 Step 2's checks 1-6 end-to-end on a fresh reload (regressions from the doc edit are impossible, but the matrix doubles as the final acceptance record). All pass.

- [ ] **Step 3: Commit**

```bash
git add docs/superpowers/specs/2026-08-06-modal-perspective-swing-design.md
git commit -m "docs: mark perspective-swing spec implemented"
```
