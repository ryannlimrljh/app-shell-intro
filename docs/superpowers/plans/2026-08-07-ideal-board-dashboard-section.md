# Ideal-Board Dashboard Section Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the leadership "ideal board" (nine SVG chart panels + answer strip + actions table) as section 2 of `pages/app-shell-intro.html`, reached by the `Dashboard ↓` link with smooth scroll, scroll-in reveal, and the ask box sliding away while the section is in view.

**Architecture:** Everything lands in the one existing static page — page-local `.c-dash-*` CSS built strictly on `collabrium-dls` tokens/components (read-only; never edit `collabrium-dls/`), one `<section id="dashboard">` inside `.c-shell-content` (which is the scroll container — NOT the window), one IntersectionObserver for reveal + ask-box parking, and one self-contained chart module that renders nine SVGs from fixed-viewBox data (no layout measurement, so it is immune to this page's hidden-tab/zero-rAF quirks).

**Tech Stack:** Static HTML/CSS/vanilla JS, no build step, no test framework. Verification is in-browser: real pointer input via the `computer` tool (synthetic dispatched clicks false-pass on this page), layout-space measurement (`offsetLeft`/`getComputedStyle`, never `getBoundingClientRect` while transforms may be active), and a 1px `getBBox()` text-collision audit for the charts.

**Reference implementation:** `pages/leadership-dashboard-tracker.html` (Mode 2). Read-only — the chart code below is already adapted from its final state (DS tokens instead of `--art-*` vars, `d`-prefixed ids instead of `c`-prefixed to avoid colliding with the page's existing modal chart).

**Spec:** `docs/superpowers/specs/2026-08-07-role-dashboard-section-design.md` (see its **Scope amendment** — the View-as role switcher is OUT of scope; this is the leadership ideal board only).

---

## Working context every task needs

- Worktree: `/Users/kwlkokho/Documents/GitHub/Collabrium-DS/.worktrees/app-shell-intro-page`. Commit from HERE (running git from the main repo checkout is a recurring mistake on this project).
- Dev server: `python3 -m http.server 8791` from the worktree root (check `curl -s -o /dev/null -w "%{http_code}" http://localhost:8791/pages/app-shell-intro.html` first — it dies between sessions). Page: `http://localhost:8791/pages/app-shell-intro.html`.
- The page has a ~6s load choreography. Wait ≥6s after load before measuring or clicking.
- The Browser pane sometimes stops repainting scrolled content; screenshots force a render but may show stale/blank frames when scrolled. Prefer JS assertions; when a screenshot of mid-page content is needed, temporarily `display:none` the content above it (debug-only, then reload).
- Screenshot coordinate space ≠ CSS pixels. Compute `scale = 800 / window.innerWidth` and multiply CSS coordinates by it before clicking.
- Local commits only. **Never push** — the user pushes with the words "push to vercel".

---

### Task 1: Anchor, section shell, smooth scroll, ask-box parking

**Files:**
- Modify: `pages/app-shell-intro.html` (CSS block ~line 116, dashlink ~line 954, markup after ask box ~line 981, script tail ~line 2213)

- [x] **Step 1: Add the section + behaviour CSS**

Edit `pages/app-shell-intro.html`. Find this exact rule (with its comment):

```css
  .c-shell-content{padding-bottom:184px;} /* box height (~138) + its 24px bottom offset + breathing room — keeps the dashlink scrollable clear of the fixed box */
```

Immediately AFTER it, insert:

```css
  /* ── Section 2 — the leadership "ideal board" (spec 2026-08-07, as amended).
     .c-shell-content is the page's scroll container (components.css:282
     gives it overflow-y:auto inside a 100dvh shell), so smooth scrolling
     MUST live here — on html it fails silently. The existing 184px
     padding-bottom stays: it was sized for the fixed ask box, and below
     the new section it is plain breathing room (the box parks itself
     while the section is in view, see .is-parked). */
  .c-shell-content{scroll-behavior:smooth;}
  .c-dash{margin-top:var(--section-gap); scroll-margin-top:var(--spacing-32);}
  .c-dash-head{display:flex; align-items:flex-end; justify-content:space-between; gap:var(--spacing-16); flex-wrap:wrap; padding-bottom:var(--spacing-12); border-bottom:1px solid var(--color-neutral-3); margin-bottom:var(--spacing-16);}
  .c-dash-head h2{margin:0; font-size:var(--text-h2-size); line-height:var(--text-h2-lh); font-weight:800; letter-spacing:-.01em;}
  .c-dash-head p{margin:2px 0 0; font-size:var(--text-body1-size); color:var(--color-neutral-5);}
  /* Scroll-in reveal — same arrive-don't-exist convention as the cards.
     Widgets stagger off a per-widget --dw-i index (set inline in markup).
     The reduced-motion block sets the END state directly: with the base
     state opacity:0, merely removing the transition would hide the whole
     section from reduced-motion users forever. */
  .c-dash .c-dash-w{opacity:0; transform:translateY(18px); transition:opacity var(--duration-slow) var(--ease-settle), transform var(--duration-slow) var(--ease-settle); transition-delay:calc(var(--dw-i, 0) * 70ms);}
  .c-dash.is-revealed .c-dash-w{opacity:1; transform:none;}
  /* Ask box parking. Two subtleties: (1) .is-settled zeroes the 1150ms
     transition-delay that .is-revealed carries for the load choreography —
     it is added on the observer's FIRST fire (necessarily after load), and
     its rule sits after .is-revealed's so the source-order tie-break wins.
     (2) pointer-events:none so the invisible box never blocks table rows. */
  .c-canvas-askbox.is-settled{transition-delay:0ms;}
  .c-canvas-askbox.is-parked{opacity:0; transform:translate(-50%, 24px); pointer-events:none;}
  @media (prefers-reduced-motion: reduce){
    .c-shell-content{scroll-behavior:auto;}
    .c-dash .c-dash-w{opacity:1; transform:none; transition:none;}
    .c-canvas-askbox.is-parked{transition:none;}
  }
```

- [x] **Step 2: Point the Dashboard link at the section**

Replace:

```html
        <p class="c-canvas-dashlink" id="dashLink">Get more done, straight to your <a href="#">Dashboard &#8595;</a> | <a href="#">Clean up cards</a></p>
```

with:

```html
        <p class="c-canvas-dashlink" id="dashLink">Get more done, straight to your <a href="#dashboard">Dashboard &#8595;</a> | <a href="#">Clean up cards</a></p>
```

- [x] **Step 3: Insert the empty section shell**

Find this exact run (end of the ask box, closes of shell-content/main/shell, start of the modal comment):

```html
              <button class="mini-pill" type="button">Who's ahead of quota?</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
```

Replace with (the section slots in between the ask box's close and `.c-shell-content`'s close — it MUST be inside the scroll container):

```html
              <button class="mini-pill" type="button">Who's ahead of quota?</button>
            </div>
          </div>
        </div>

        <!-- ── Section 2 — leadership ideal board. Reached via #dashboard
             from the dashlink; content arrives on scroll-in (see .c-dash
             CSS). Chart panels are filled by the dashboard chart module
             at the end of the page script. -->
        <section id="dashboard" class="c-dash" aria-labelledby="dashTitle">
          <div class="c-dash-head">
            <div>
              <h2 id="dashTitle">Across the business</h2>
              <p>Every media line, rolled up — exceptions first</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
```

- [x] **Step 4: Add the observer JS**

At the very end of the page's `<script type="module">`, replace:

```js
})();
</script>
```

with:

```js
})();

// ── Section 2: scroll-in reveal + ask-box parking. One observer does both.
// Reveal is one-way (class add is idempotent — the revealCanvasContent()
// double-fire bug is the precedent for being paranoid here); parking is
// two-way so the box returns when the user scrolls back up to the cards.
// root is the real scroll container, not the viewport.
(function () {
  const shellContent = document.querySelector('.c-shell-content');
  const dash = document.getElementById('dashboard');
  const askBox = document.getElementById('askBox');
  if (!shellContent || !dash || !('IntersectionObserver' in window)) {
    if (dash) dash.classList.add('is-revealed'); // ancient-browser fallback: just show it
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        dash.classList.add('is-revealed');
        if (askBox) askBox.classList.add('is-settled', 'is-parked');
      } else if (askBox) {
        askBox.classList.remove('is-parked');
      }
    });
  }, { root: shellContent, threshold: 0.12 });
  io.observe(dash);
})();
</script>
```

- [x] **Step 5: Verify in the browser**

Load `http://localhost:8791/pages/app-shell-intro.html`, wait 6s, then run via `javascript_tool`:

```js
(() => {
  const sc = document.querySelector('.c-shell-content');
  const dash = document.getElementById('dashboard');
  const before = sc.scrollTop;
  return {
    smooth: getComputedStyle(sc).scrollBehavior,            // "smooth"
    href: document.querySelector('#dashLink a').getAttribute('href'), // "#dashboard"
    insideScroller: sc.contains(dash),                       // true — critical
    scrollTopBefore: before
  };
})()
```

Then click the Dashboard link with REAL pointer input (`computer` tool — compute the link's centre from `getBoundingClientRect()` × `800/innerWidth`), wait 1s, and assert:

```js
(() => {
  const sc = document.querySelector('.c-shell-content');
  return {
    scrolled: sc.scrollTop > 100,                            // the CONTAINER scrolled, not window
    windowStayedPut: window.scrollY === 0,
    dashRevealed: document.getElementById('dashboard').classList.contains('is-revealed'),
    askParked: document.getElementById('askBox').classList.contains('is-parked'),
    askSettled: document.getElementById('askBox').classList.contains('is-settled')
  };
})()
```

Then `sc.scrollTop = 0` via JS, wait 700ms, assert `is-parked` was removed and the box's computed opacity is heading back to 1 (class assertion is sufficient — the sandbox can stall transitions). Console must be clean.

- [x] **Step 6: Commit**

```bash
cd /Users/kwlkokho/Documents/GitHub/Collabrium-DS/.worktrees/app-shell-intro-page
git add pages/app-shell-intro.html
git commit -m "feat: dashboard section shell — anchor, smooth scroll, reveal observer, ask-box parking"
```

---

### Task 2: Panels markup, answer strip, provenance system, grid

> Note: figures (74.5/222.7/17.3) and the toggle's tablist semantics in this task body were amended during execution — see Deviations.

**Files:**
- Modify: `pages/app-shell-intro.html` (CSS after Task 1's block; section inner markup)

- [x] **Step 1: Add the panel/grid/provenance CSS**

Immediately AFTER Task 1's `@media (prefers-reduced-motion: reduce){...}` block, insert:

```css
  /* ── Ideal-board grid + panels. 12-col grid, spans set per panel.
     Panels are stock DS .c-card (padding/radius/shadow all its own);
     only grid placement and chart plumbing are page-local. Colour rules:
     no coloured backgrounds beyond the DS's elemental tints — emphasis
     is carried by border-color and text colour only. Purple is the DS's
     "AI / premium, not-yet-real" accent, which is exactly what a
     pending-source panel is. */
  .c-dash-grid{display:grid; grid-template-columns:repeat(12,1fr); gap:var(--spacing-16); align-items:stretch;}
  .c-dash-w{min-width:0;}
  .c-dash .sp2{grid-column:span 2;} .c-dash .sp4{grid-column:span 4;} .c-dash .sp5{grid-column:span 5;}
  .c-dash .sp6{grid-column:span 6;} .c-dash .sp7{grid-column:span 7;} .c-dash .sp8{grid-column:span 8;} .c-dash .sp12{grid-column:span 12;}
  @media (max-width:1100px){ .c-dash .sp2{grid-column:span 4;} .c-dash .sp4{grid-column:span 6;} .c-dash .sp5,.c-dash .sp6,.c-dash .sp7,.c-dash .sp8{grid-column:span 12;} }
  @media (max-width:640px){ .c-dash .sp2,.c-dash .sp4{grid-column:span 12;} }
  .c-dash-panel{height:100%;}
  .c-dash-panel-head{display:flex; align-items:baseline; justify-content:space-between; gap:var(--spacing-8);}
  .c-dash-panel-head h4{margin:0;}
  .c-dash-panel-sub{margin:0; font-size:var(--text-caption-size); color:var(--color-neutral-4); font-weight:600;}
  .c-dash-note{margin:var(--spacing-8) 0 0; font-size:var(--text-caption-size); color:var(--color-neutral-5); line-height:1.6;}
  .c-dash-note b{color:var(--color-neutral-9);}
  .c-dash-chart{overflow-x:auto;}
  .c-dash-chart svg{display:block; min-width:280px; width:100%;}
  .c-dash-scroll{overflow-x:auto;} /* tables scroll inside themselves; the page body never scrolls sideways */
  /* Provenance: one dot per source state. Text labels, not colour alone. */
  .c-dash-prov{display:flex; align-items:center; gap:var(--spacing-16); flex-wrap:wrap;}
  .c-dash-prov-t,.c-dash-src{font-size:var(--text-label3-size); font-weight:800; letter-spacing:.08em; text-transform:uppercase; color:var(--color-neutral-4);}
  .c-dash-prov-i{display:inline-flex; align-items:center; gap:6px; font-size:var(--text-caption-size); color:var(--color-neutral-5);}
  .c-dash-prov-c{margin-left:auto; font-size:var(--text-caption-size); font-weight:800; color:var(--color-neutral-9);}
  .c-dash-src{display:inline-flex; align-items:center; gap:5px; white-space:nowrap;}
  .c-dash-dot{width:9px; height:9px; border-radius:50%; flex:none; display:inline-block;}
  .c-dash-dot.d-c{background:var(--color-green);}
  .c-dash-dot.d-d{background:var(--color-navy);}
  .c-dash-dot.d-p{background:transparent; border:1.8px solid var(--color-purple);}
  /* Answer-strip stat tiles: stock .c-stat, value size stepped down to fit
     five-across; emphasis via border-color only (never a tinted fill). */
  .c-dash .c-stat-value{font-size:24px; letter-spacing:-.02em; font-variant-numeric:tabular-nums;}
  .c-dash .c-stat{height:100%;}
  .c-dash .c-stat.is-lead{border-color:var(--color-purple);}
  .c-dash .c-stat.is-lead .c-stat-value{color:var(--color-purple); font-size:28px;}
  .c-dash-up{color:var(--color-green);} .c-dash-dn{color:var(--color-red);} .c-dash-wn{color:#8A5A00;}
  /* Chart tables reuse DS .c-table / .c-datatable as-is; num cells right-align. */
  .c-dash .c-table td.num,.c-dash .c-table th.num,.c-dash .c-datatable td.num,.c-dash .c-datatable th.num{text-align:right; font-variant-numeric:tabular-nums;}
  .c-dash .c-table tr.tot td{font-weight:900; border-top:1.5px solid var(--color-neutral-9); border-bottom:0;}
  .c-dash-key{display:flex; gap:15px; flex-wrap:wrap; margin-top:var(--spacing-8); font-size:var(--text-caption-size); font-weight:700; color:var(--color-neutral-5);}
  .c-dash-key span{display:inline-flex; align-items:center; gap:6px;}
  .c-dash-sw{width:13px; height:4px; border-radius:2px; flex:none; display:inline-block;}
  .c-dash-sw.k-band{height:11px; background:var(--color-purple); opacity:.22;}
  .c-dash-sw.k-plan{height:0; border-top:1.8px dashed var(--color-neutral-9); opacity:.6; border-radius:0;}
  /* Visually-hidden table captions (spec's accessibility section): tables
     must be distinguishable when tabbed to without sight of the headings. */
  .c-dash-vh{position:absolute; width:1px; height:1px; padding:0; margin:-1px; overflow:hidden; clip:rect(0 0 0 0); white-space:nowrap; border:0;}
```

- [x] **Step 2: Fill the section with the panels markup**

Replace the Task-1 section (from `<section id="dashboard"` through `</section>`) with the full markup below. Every widget carries `class="c-dash-w"` and an inline `--dw-i` stagger index. SVGs are empty shells here — Task 3 fills them.

```html
        <section id="dashboard" class="c-dash" aria-labelledby="dashTitle">
          <div class="c-dash-head">
            <div>
              <h2 id="dashTitle">Across the business</h2>
              <p>Every media line, rolled up — exceptions first</p>
            </div>
            <div class="seg-toggle" id="dashPeriodToggle" role="tablist" aria-label="Dashboard period">
              <span class="seg-toggle-thumb" aria-hidden="true"></span>
              <button class="seg-toggle-btn active" type="button" role="tab" aria-selected="true"><span class="seg-toggle-label">MTD</span></button>
              <button class="seg-toggle-btn" type="button" role="tab" aria-selected="false"><span class="seg-toggle-label">QTD</span></button>
              <button class="seg-toggle-btn" type="button" role="tab" aria-selected="false"><span class="seg-toggle-label">YTD</span></button>
            </div>
          </div>
          <div class="c-dash-grid">

            <div class="c-dash-w sp12" style="--dw-i:0"><div class="c-card c-dash-panel c-dash-prov">
              <span class="c-dash-prov-t">Data provenance</span>
              <span class="c-dash-prov-i"><i class="c-dash-dot d-c"></i>Confirmed source — live today</span>
              <span class="c-dash-prov-i"><i class="c-dash-dot d-d"></i>Computed from confirmed sources</span>
              <span class="c-dash-prov-i"><i class="c-dash-dot d-p"></i>Needs an outstanding source</span>
              <span class="c-dash-prov-c">8 of 11 panels mix data you have with a source still to land.</span>
            </div></div>

            <div class="c-dash-w sp4" style="--dw-i:1"><div class="c-stat is-lead">
              <span class="c-stat-label">Will we hit RM 240.0M?</span>
              <span class="c-stat-value">RM 222.7M</span>
              <span class="c-stat-trend"><span class="period">weighted forecast · <b class="c-dash-dn">RM 17.3M short</b> · reachable only at best case</span></span>
              <span class="c-dash-src"><i class="c-dash-dot d-p"></i>needs pipeline</span>
            </div></div>
            <div class="c-dash-w sp2" style="--dw-i:2"><div class="c-stat">
              <span class="c-stat-label">Revenue YTD</span><span class="c-stat-value">RM 148.2M</span>
              <span class="c-stat-trend"><span class="c-dash-up">▲ 6.4%</span><span class="period">vs LY</span></span>
              <span class="c-dash-src"><i class="c-dash-dot d-c"></i>source 1</span>
            </div></div>
            <div class="c-dash-w sp2" style="--dw-i:3"><div class="c-stat">
              <span class="c-stat-label">Net new business</span><span class="c-stat-value c-dash-up">+RM 4.1M</span>
              <span class="c-stat-trend"><span class="period">new 12.7 − lapsed 8.6</span></span>
              <span class="c-dash-src"><i class="c-dash-dot d-d"></i>sources 4 + 5</span>
            </div></div>
            <div class="c-dash-w sp2" style="--dw-i:4"><div class="c-stat">
              <span class="c-stat-label">Gross margin</span><span class="c-stat-value">31.4%</span>
              <span class="c-stat-trend"><span class="c-dash-up">▲ 0.8pt</span><span class="period">vs LY</span></span>
              <span class="c-dash-src"><i class="c-dash-dot d-p"></i>needs margin</span>
            </div></div>
            <div class="c-dash-w sp2" style="--dw-i:5"><div class="c-stat">
              <span class="c-stat-label">Share of market</span><span class="c-stat-value c-dash-dn">13.8%</span>
              <span class="c-stat-trend"><span class="c-dash-dn">▼ 0.4pt</span><span class="period">market grew 8.1%</span></span>
              <span class="c-dash-src"><i class="c-dash-dot d-p"></i>needs benchmark</span>
            </div></div>

            <div class="c-dash-w sp8" style="--dw-i:6"><div class="c-card c-dash-panel">
              <div class="c-dash-panel-head"><div><h4>Cumulative revenue against plan, with the three closes</h4>
                <p class="c-dash-panel-sub">Actual to August, then commit / weighted / best case to December</p></div>
                <span class="c-dash-src"><i class="c-dash-dot d-c"></i>1 + 2 <i class="c-dash-dot d-p" style="margin-left:7px"></i>pipeline</span></div>
              <div class="c-dash-chart"><svg id="dFan" viewBox="0 0 700 300" height="300" role="img" aria-label="Cumulative revenue against target with commit, weighted and best-case projections to December"></svg></div>
              <div class="c-dash-key"><span><i class="c-dash-sw" style="background:var(--color-navy)"></i>Actual to date</span><span><i class="c-dash-sw" style="background:var(--color-purple)"></i>Weighted forecast</span><span><i class="c-dash-sw k-band"></i>Commit 210.2 &rarr; best case 239.4</span><span><i class="c-dash-sw k-plan"></i>Plan</span></div>
              <p class="c-dash-note"><b>The plan line is only touched by best case.</b> Weighted lands RM 17.3M short and commit RM 29.8M short — so the question stops being "are we behind" and becomes "which of these 73 open deals must close".</p>
            </div></div>

            <div class="c-dash-w sp4" style="--dw-i:7"><div class="c-card c-dash-panel">
              <div class="c-dash-panel-head"><div><h4>Where the RM 8.9M of growth came from</h4>
                <p class="c-dash-panel-sub">Last year to this year, decomposed</p></div>
                <span class="c-dash-src"><i class="c-dash-dot d-d"></i>1 + 4 + 5</span></div>
              <div class="c-dash-chart"><svg id="dBridge" viewBox="0 0 340 300" height="300" role="img" aria-label="Waterfall from last year revenue through existing account growth, new business and lapsed accounts to this year"></svg></div>
              <p class="c-dash-note"><b>New business is doing the work; existing accounts are nearly flat.</b> Of RM 8.9M growth, RM 12.7M came from new advertisers and RM 8.6M walked out — leaving only RM 4.8M from the accounts we already had. Retention, not acquisition, is the exposure.</p>
            </div></div>

            <div class="c-dash-w sp5" style="--dw-i:8"><div class="c-card c-dash-panel">
              <div class="c-dash-panel-head"><div><h4>Pipeline by stage</h4>
                <p class="c-dash-panel-sub">Value, and what it is worth after probability</p></div>
                <span class="c-dash-src"><i class="c-dash-dot d-p"></i>needs pipeline</span></div>
              <div class="c-dash-chart"><svg id="dFunnel" viewBox="0 0 420 268" height="268" role="img" aria-label="Pipeline funnel by stage with weighted value overlay"></svg></div>
              <p class="c-dash-note"><b>Half the open value sits in the least certain stage.</b> Negotiation holds RM 51.2M at 50% and averages 41 days — the oldest cohort. Contracted-not-booked is RM 28.4M at 95% and is really a billing question, not a selling one.</p>
            </div></div>

            <div class="c-dash-w sp7" style="--dw-i:9"><div class="c-card c-dash-panel">
              <div class="c-dash-panel-head"><div><h4>Which reps are actually at risk</h4>
                <p class="c-dash-panel-sub">All 14 reps — attainment today against pipeline cover for the rest of the year</p></div>
                <span class="c-dash-src"><i class="c-dash-dot d-c"></i>source 3 <i class="c-dash-dot d-p" style="margin-left:7px"></i>pipeline</span></div>
              <div class="c-dash-chart"><svg id="dQuad" viewBox="0 0 640 312" height="312" role="img" aria-label="Quadrant chart of sales rep attainment versus pipeline coverage"></svg></div>
              <p class="c-dash-note"><b>This settles the Daniel question, and the answer is the worse of the two.</b> He is at 85% <em>and</em> carries only 0.8× cover — behind with a thin pipeline, so it is a prospecting problem, not slow closes. Aisyah is the mirror image: ahead, with 2.4× cover behind her.</p>
            </div></div>

            <div class="c-dash-w sp6" style="--dw-i:10"><div class="c-card c-dash-panel">
              <div class="c-dash-panel-head"><div><h4>Sold against what we had to sell</h4>
                <p class="c-dash-panel-sub">Sold against sellable, with target attainment beneath</p></div>
                <span class="c-dash-src"><i class="c-dash-dot d-c"></i>source 2 <i class="c-dash-dot d-p" style="margin-left:7px"></i>inventory</span></div>
              <div class="c-dash-chart"><svg id="dFill" viewBox="0 0 480 324" height="324" role="img" aria-label="Fill rate versus target attainment by media type"></svg></div>
              <p class="c-dash-note"><b>The solid bar is what we sold; the pale remainder is shelf we never filled.</b> Digital sold 62% of its inventory and reached 75% of target — the stock was there, so it is a demand problem. Addressable is the opposite at 97% sold out, so its 109% is <b>capped by supply</b>. Sell Digital harder; buy more addressable.</p>
            </div></div>

            <div class="c-dash-w sp6" style="--dw-i:11"><div class="c-card c-dash-panel">
              <div class="c-dash-panel-head"><div><h4>Revenue against contribution</h4>
                <p class="c-dash-panel-sub">14 accounts — bubble size is gross profit, the ranking that matters</p></div>
                <span class="c-dash-src"><i class="c-dash-dot d-c"></i>source 4 <i class="c-dash-dot d-p" style="margin-left:7px"></i>margin</span></div>
              <div class="c-dash-chart"><svg id="dBubble" viewBox="0 0 500 274" height="274" role="img" aria-label="Scatter of advertiser revenue against margin percentage, sized by contribution"></svg></div>
              <p class="c-dash-note"><b>Two of the four biggest profit contributors are sub-RM 1M accounts.</b> 99 Speedmart bills RM 0.85M at 44% margin and out-earns Lazada's RM 1.80M on contribution. Revenue rank and profit rank are different league tables.</p>
            </div></div>

            <div class="c-dash-w sp6" style="--dw-i:12"><div class="c-card c-dash-panel">
              <div class="c-dash-panel-head"><div><h4>Why RM 4.4M walked</h4>
                <p class="c-dash-panel-sub">Split by cause, and what is actually recoverable</p></div>
                <span class="c-dash-src"><i class="c-dash-dot d-c"></i>source 5 <i class="c-dash-dot d-p" style="margin-left:7px"></i>reason codes</span></div>
              <div class="c-dash-chart"><svg id="dChurn" viewBox="0 0 480 216" height="216" role="img" aria-label="Lapsed revenue split by reason, showing recoverable versus structural loss"></svg></div>
              <div class="c-dash-scroll"><table class="c-table">
                <caption class="c-dash-vh">Lapsed advertisers with churn reason and recommended play</caption>
                <tbody>
                  <tr><td>Petronas Retail</td><td class="num">2.10</td><td><span class="c-badge c-badge-warning">Budget cycle</span></td><td style="color:var(--color-neutral-5)">Re-pitch at Q3 reset</td></tr>
                  <tr><td>AirAsia</td><td class="num">1.40</td><td><span class="c-badge c-badge-error">Competitive</span></td><td style="color:var(--color-neutral-5)">Rate review</td></tr>
                  <tr><td>Tealive</td><td class="num">0.50</td><td><span class="c-badge c-badge-error">Price</span></td><td style="color:var(--color-neutral-5)">Package restructure</td></tr>
                  <tr><td>Watsons MY</td><td class="num">0.40</td><td><span class="c-badge c-badge-neutral">Service</span></td><td style="color:var(--color-neutral-5)">Owner change</td></tr>
                </tbody>
              </table></div>
              <p class="c-dash-note"><b>Half of it was never lost — it was timing.</b> RM 2.1M is a budget-cycle gap that needs a calendar, not a discount. The other RM 1.9M is price and competitive, which needs a rate conversation.</p>
            </div></div>

            <div class="c-dash-w sp6" style="--dw-i:13"><div class="c-card c-dash-panel">
              <div class="c-dash-panel-head"><div><h4>How much rests on how few</h4>
                <p class="c-dash-panel-sub">Cumulative share of revenue by advertiser rank</p></div>
                <span class="c-dash-src"><i class="c-dash-dot d-p"></i>needs advertiser revenue</span></div>
              <div class="c-dash-chart"><svg id="dConc" viewBox="0 0 480 250" height="250" role="img" aria-label="Cumulative revenue concentration curve by advertiser rank"></svg></div>
              <p class="c-dash-note"><b>No single-account cliff, but a top-five exposure.</b> The largest advertiser is 9.2%, so no one client can sink the year — yet the top five carry 38%, which means losing two of them breaches plan.</p>
            </div></div>

            <div class="c-dash-w sp12" style="--dw-i:14"><div class="c-card c-dash-panel">
              <div class="c-dash-panel-head"><div><h4>Us against the market</h4>
                <p class="c-dash-panel-sub">Indexed growth, and the share that follows from it</p></div>
                <span class="c-dash-src"><i class="c-dash-dot d-c"></i>source 1 <i class="c-dash-dot d-p" style="margin-left:7px"></i>benchmark</span></div>
              <div class="c-dash-chart"><svg id="dShare" viewBox="0 0 700 268" height="268" role="img" aria-label="Our indexed growth against market growth, with share of market trending down"></svg></div>
              <p class="c-dash-note"><b>The most uncomfortable panel here, and the reason to buy the data.</b> Growing 6.4% in a market growing 8.1% means share fell from 14.2% to 13.8% — about RM 4.3M of revenue that existed and went elsewhere. Every other widget on this board calls this a good year. Only this one calls it a loss.</p>
            </div></div>

            <div class="c-dash-w sp12" style="--dw-i:15"><div class="c-card c-dash-panel">
              <div class="c-dash-panel-head"><div><h4>What this board says to do next</h4>
                <p class="c-dash-panel-sub">Each line traces to a panel above — the point of the exercise</p></div></div>
              <div class="c-dash-scroll"><div class="c-datatable"><table>
                <caption class="c-dash-vh">Recommended actions with amount at stake, owner and source panel</caption>
                <thead><tr><th>Move</th><th>Because</th><th class="num">At stake</th><th>Owner</th><th>From</th></tr></thead>
                <tbody>
                  <tr><td><b>Fund Digital demand, not inventory</b></td><td>62% fill with 75% attainment — shelves were full</td><td class="num">RM 5.1M</td><td>Daniel Tan</td><td>Sold vs sellable</td></tr>
                  <tr><td><b>Buy more addressable inventory</b></td><td>97% sold out; the only line beating plan is supply-capped</td><td class="num">RM 2.6M</td><td>Aisyah Rahman</td><td>Sold vs sellable</td></tr>
                  <tr><td><b>Put Daniel on prospecting, not closing</b></td><td>85% attainment with 0.8× cover is a top-of-funnel gap</td><td class="num">RM 2.4M</td><td>Sales lead</td><td>Rep risk quadrant</td></tr>
                  <tr><td><b>Diarise Petronas for the Q3 budget reset</b></td><td>Budget-cycle lapse, not a loss — timing beats discount</td><td class="num">RM 2.1M</td><td>Aisyah Rahman</td><td>Why RM 4.4M walked</td></tr>
                  <tr><td><b>Protect the top five accounts explicitly</b></td><td>38% of revenue; losing two breaches plan</td><td class="num">RM 56.3M</td><td>Leadership</td><td>How much rests on how few</td></tr>
                  <tr><td><b>Take the share question to the board</b></td><td>Growth is real but sub-market — share fell 0.4pt</td><td class="num">RM 4.3M</td><td>Leadership</td><td>Us against the market</td></tr>
                </tbody>
              </table></div></div>
              <p class="c-dash-note">Six moves, each with a number and an owner. None of them is derivable without the outstanding sources — which is the argument for them, stated as decisions rather than as charts.</p>
            </div></div>

          </div>
        </section>
```

- [x] **Step 3: Wire the period toggle thumb**

The `.seg-toggle` recipe needs its thumb positioned by JS. Reuse the page's proven transform-immune pattern (`offsetLeft`/`offsetWidth`, NEVER `getBoundingClientRect` — renders can run mid-animation). In the observer IIFE from Task 1, extend the `isIntersecting` branch and add the click handler. Replace the whole Task-1 IIFE body with:

```js
(function () {
  const shellContent = document.querySelector('.c-shell-content');
  const dash = document.getElementById('dashboard');
  const askBox = document.getElementById('askBox');
  if (!shellContent || !dash || !('IntersectionObserver' in window)) {
    if (dash) dash.classList.add('is-revealed');
    return;
  }
  // Period toggle thumb — offsetLeft/offsetWidth on purpose (layout space,
  // immune to any transform active at render time). Positioned lazily on
  // first reveal: before that the section may be display-affected and
  // offsets would read 0.
  const periodToggle = document.getElementById('dashPeriodToggle');
  function positionDashThumb() {
    if (!periodToggle) return;
    const active = periodToggle.querySelector('.seg-toggle-btn.active');
    const thumb = periodToggle.querySelector('.seg-toggle-thumb');
    if (!active || !thumb) return;
    thumb.style.left = active.offsetLeft + 'px';
    thumb.style.width = active.offsetWidth + 'px';
  }
  if (periodToggle) {
    periodToggle.addEventListener('click', (e) => {
      const btn = e.target.closest('.seg-toggle-btn');
      if (!btn) return;
      periodToggle.querySelectorAll('.seg-toggle-btn').forEach((b) => {
        const on = b === btn;
        b.classList.toggle('active', on);
        b.setAttribute('aria-selected', String(on));
      });
      positionDashThumb();
    });
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        dash.classList.add('is-revealed');
        positionDashThumb();
        if (askBox) askBox.classList.add('is-settled', 'is-parked');
      } else if (askBox) {
        askBox.classList.remove('is-parked');
      }
    });
  }, { root: shellContent, threshold: 0.12 });
  io.observe(dash);
})();
```

- [x] **Step 4: Verify**

Reload, wait 6s, scroll the container to the section via JS (`document.getElementById('dashboard').scrollIntoView()` on `.c-shell-content` is fine for this check), then assert:

```js
(() => {
  const dash = document.getElementById('dashboard');
  const widgets = [...dash.querySelectorAll('.c-dash-w')];
  return {
    widgetCount: widgets.length,                          // 16 (prov + 5 stats + 8 panels + share + actions)
    svgShells: [...dash.querySelectorAll('svg')].map(s => s.id), // dFan..dShare, 9 ids
    statTiles: dash.querySelectorAll('.c-stat').length,   // 5
    dsTables: dash.querySelectorAll('.c-table, .c-datatable table').length, // 2 (churn detail, actions)
    captions: dash.querySelectorAll('caption.c-dash-vh').length,            // 2
    staggerSet: widgets.every((w,i) => w.style.getPropertyValue('--dw-i') !== ''),
    sideways: document.documentElement.scrollWidth > document.documentElement.clientWidth, // false
    thumbW: document.querySelector('#dashPeriodToggle .seg-toggle-thumb').style.width // non-zero after reveal
  };
})()
```

Console clean. Real-click one seg-toggle button (computer tool) and assert `active` moved and thumb `left` changed.

- [x] **Step 5: Commit**

```bash
cd /Users/kwlkokho/Documents/GitHub/Collabrium-DS/.worktrees/app-shell-intro-page
git add pages/app-shell-intro.html
git commit -m "feat: ideal-board panels — answer strip, provenance dots, tables, chart shells"
```

---

### Task 3: The nine chart renderers

> Note: figures (74.5/222.7/17.3) and the toggle's tablist semantics in this task body were amended during execution — see Deviations.

**Files:**
- Modify: `pages/app-shell-intro.html` (script tail, after the observer IIFE)

- [x] **Step 1: Add the chart module**

Insert AFTER the observer IIFE's closing `})();` (still before `</script>`). This is the tracker's final, collision-audited chart code with DS-token colours and `d`-prefixed ids. Data is the reconciled set — months sum to 148.2, media actuals sum to 148.2, cumulative gap −9.4.

```js
// ── Ideal-board charts. Fixed-viewBox SVG built as strings — zero layout
// measurement, so rendering is immune to the hidden-tab/zero-rAF sandbox
// and can run at load while the section is still unrevealed. Figures are
// the reconciled set: months sum to 148.2, media actuals sum to 148.2
// against 157.6 target (94%, gap exactly 9.4). Label placement in the two
// scatters is first-fit against a running collision map — audited at 1px
// (a 3px threshold let visually-jammed pairs through; see the tracker's
// history).
(function () {
  var C = { ink:'var(--color-neutral-9)', mut:'var(--color-neutral-5)', fnt:'var(--color-neutral-4)',
            rule:'var(--color-neutral-3)', good:'var(--color-green)', warn:'var(--color-amber)',
            crit:'var(--color-red)', der:'var(--color-navy)', pur:'var(--color-purple)' };
  var M = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  function el(id){ return document.getElementById(id); }
  function set(id, s){ var n = el(id); if (n) n.innerHTML = s; }
  function txt(x,y,t,o){ o=o||{}; return '<text x="'+x+'" y="'+y+'" font-size="'+(o.s||10)+'" font-weight="'+(o.w||700)+
    '" fill="'+(o.f||C.mut)+'"'+(o.a?' text-anchor="'+o.a+'"':'')+(o.st?' style="'+o.st+'"':'')+'>'+t+'</text>'; }
  function ln(x1,y1,x2,y2,o){ o=o||{}; return '<line x1="'+x1+'" y1="'+y1+'" x2="'+x2+'" y2="'+y2+
    '" stroke="'+(o.c||C.rule)+'" stroke-width="'+(o.w||1)+'"'+(o.d?' stroke-dasharray="'+o.d+'"':'')+
    (o.cap?' stroke-linecap="'+o.cap+'"':'')+'/>'; }
  function rect(x,y,w,h,o){ o=o||{}; return '<rect x="'+x.toFixed(1)+'" y="'+y.toFixed(1)+'" width="'+Math.max(0,w).toFixed(1)+
    '" height="'+Math.max(0,h).toFixed(1)+'" rx="'+(o.r!=null?o.r:2)+'" fill="'+(o.f||C.der)+'"'+
    (o.o!=null?' opacity="'+o.o+'"':'')+(o.s?' stroke="'+o.s+'" stroke-width="'+(o.sw||1.5)+'"':'')+'/>'; }
  function path(d,o){ o=o||{}; return '<path d="'+d+'" fill="'+(o.f||'none')+'" stroke="'+(o.s||'none')+
    '" stroke-width="'+(o.w||2)+'"'+(o.d?' stroke-dasharray="'+o.d+'"':'')+
    (o.o!=null?' opacity="'+o.o+'"':'')+' stroke-linejoin="round" stroke-linecap="round"/>'; }

  /* 1 · Cumulative fan */
  (function(){
    var act=[16.2,33.3,51.7,68.7,88.3,108.5,127.6,148.2];
    var tgt=[18.6,37.6,57.0,76.2,96.2,116.6,136.8,157.6,178.2,199.0,219.4,240.0];
    var com=[148.2,163.2,178.6,194.2,210.2], wtd=[148.2,166.2,184.6,203.4,222.7], bst=[148.2,170.2,192.8,215.9,239.4];
    var L=48,R=634,T=22,B=252,max=260;
    var X=function(i){return L+(R-L)*(i/11);}, Y=function(v){return B-(v/max)*(B-T);};
    var s='';
    for(var g=0; g<=260; g+=65){ s+=ln(L,Y(g),R,Y(g),{d:'3 5'}); s+=txt(L-7,Y(g)+3.5,g?g+'M':'0',{s:9,f:C.fnt,a:'end'}); }
    var up='',dn='';
    for(var i=0;i<bst.length;i++){ up+=(i?' L':'M')+X(7+i).toFixed(1)+' '+Y(bst[i]).toFixed(1); }
    for(var j=com.length-1;j>=0;j--){ dn+=' L'+X(7+j).toFixed(1)+' '+Y(com[j]).toFixed(1); }
    s+=path(up+dn+' Z',{f:C.pur,o:.14});
    var tp=''; for(var t=0;t<tgt.length;t++){ tp+=(t?' L':'M')+X(t).toFixed(1)+' '+Y(tgt[t]).toFixed(1); }
    s+=path(tp,{s:C.ink,w:1.6,d:'6 4',o:.55});
    function line(a,col,dash,w){ var p=''; for(var k=0;k<a.length;k++){ p+=(k?' L':'M')+X(7+k).toFixed(1)+' '+Y(a[k]).toFixed(1); } return path(p,{s:col,w:w||2,d:dash}); }
    s+=line(com,C.crit,'5 4'); s+=line(bst,C.good,'5 4'); s+=line(wtd,C.pur,null,3);
    var ap=''; for(var m=0;m<act.length;m++){ ap+=(m?' L':'M')+X(m).toFixed(1)+' '+Y(act[m]).toFixed(1); }
    s+=path(ap,{s:C.der,w:3.4});
    s+='<circle cx="'+X(7).toFixed(1)+'" cy="'+Y(148.2).toFixed(1)+'" r="4.4" fill="'+C.der+'"/>';
    s+=ln(X(7),T,X(7),B,{c:C.fnt,d:'2 4',w:1});
    s+=txt(X(7)+5,T+9,'PROJECTED',{s:8.5,w:800,f:C.fnt,st:'letter-spacing:.1em'});
    s+=txt(R+5,Y(240)-5,'plan 240.0',{s:9.5,w:800,f:C.ink});
    s+=txt(R+5,Y(222.7)-2,'weighted',{s:9,w:700,f:C.pur});
    s+=txt(R+5,Y(222.7)+13,'222.7',{s:10.5,w:900,f:C.pur});
    for(var x=0;x<12;x+=1){ s+=txt(X(x),B+15,M[x],{s:9,f:C.fnt,a:'middle'}); }
    s+=ln(L,B,R,B,{c:C.rule,w:1.5});
    set('dFan',s);
  })();

  /* 2 · Growth composition */
  (function(){
    var rows=[{l:'New advertisers',v:12.7,c:C.good},{l:'Existing accounts',v:4.8,c:C.der},{l:'Lapsed advertisers',v:-8.6,c:C.crit}];
    var L=112,W=196,zero=L+(8.6/21.3)*W,top=28,rh=44,sc=W/21.3,s='';
    s+=txt(L-8,18,'RM million',{s:9,w:800,f:C.fnt,a:'end'});
    s+=ln(zero,top-8,zero,top+rh*3+18,{c:C.fnt,w:1.2});
    rows.forEach(function(r,i){
      var y=top+rh*i, w=Math.abs(r.v)*sc, x=r.v>=0?zero:zero-w;
      s+=rect(x,y,w,20,{f:r.c,r:2});
      s+=txt(L-8,y+14,r.l,{s:10.5,w:700,f:C.ink,a:'end'});
      s+=txt(x+w-7,y+14,(r.v>0?'+':'')+r.v.toFixed(1),{s:10.5,w:900,f:'#fff',a:'end'});
    });
    var ny=top+rh*3+2;
    s+=ln(L-4,ny-8,L+W+40,ny-8,{c:C.rule,w:1.2});
    s+=rect(zero,ny,8.9*sc,22,{f:C.ink,r:2});
    s+=txt(L-8,ny+15,'Net growth',{s:11,w:900,f:C.ink,a:'end'});
    s+=txt(zero+8.9*sc-7,ny+15,'+8.9',{s:11,w:900,f:'#fff',a:'end'});
    s+=txt(L-8,ny+50,'139.3 → 148.2',{s:10,w:700,f:C.fnt,a:'end'});
    s+=txt(L+4,ny+50,'last year to this year',{s:10,w:600,f:C.fnt});
    set('dBridge',s);
  })();

  /* 3 · Pipeline funnel */
  (function(){
    var st=[{l:'Negotiation',v:51.2,w:25.6,n:37,a:'41d',p:'50%'},
            {l:'Verbal agreement',v:31.6,w:22.1,n:22,a:'24d',p:'70%'},
            {l:'Contracted, not booked',v:28.4,w:27.0,n:14,a:'11d',p:'95%'}];
    var L=14,W=392,max=51.2,top=30,rh=74,s='';
    s+=txt(L,16,'OPEN VALUE',{s:8.5,w:800,f:C.fnt,st:'letter-spacing:.1em'});
    s+=txt(L+W,16,'RM 111.2M · 73 DEALS',{s:8.5,w:800,f:C.fnt,a:'end',st:'letter-spacing:.06em'});
    st.forEach(function(r,i){
      var y=top+rh*i, w=(r.v/max)*W, ww=(r.w/max)*W;
      s+=rect(L,y,w,30,{f:C.pur,o:.22,r:3});
      s+=rect(L,y,ww,30,{f:C.pur,r:3});
      s+=txt(L+8,y+20,r.l,{s:11.5,w:800,f:'#fff'});
      s+=txt(L+w-8,y+20,r.v.toFixed(1),{s:12,w:900,f:C.ink,a:'end'});
      s+=txt(L,y+45,r.n+' deals · '+r.p+' · avg '+r.a,{s:10,w:600,f:C.fnt});
      s+=txt(L+ww,y+45,'weighted '+r.w.toFixed(1),{s:10,w:800,f:C.pur,a:'middle'});
    });
    var y2=top+rh*3-14;
    s+=ln(L,y2,L+W,y2,{c:C.rule,w:1.2});
    s+=txt(L,y2+18,'Weighted total',{s:11,w:800,f:C.ink});
    s+=txt(L+W,y2+18,'RM 74.5M',{s:12.5,w:900,f:C.pur,a:'end'});
    set('dFunnel',s);
  })();

  /* 4 · Rep risk quadrant — 14 reps, first-fit labels vs a collision map */
  (function(){
    var reps=[
      {n:'Aisyah Rahman',x:118,y:2.5},{n:'Kavitha Raj',x:112,y:2.2},
      {n:'Bryan Wong',x:106,y:1.9},{n:'Wei Ling Ho',x:101,y:1.75},
      {n:'Hafiz Osman',x:121,y:1.45},{n:'Nurul Izzah',x:108,y:1.15},
      {n:'Arvind Kumar',x:103,y:0.85},{n:'Siti Marina',x:97,y:1.35},
      {n:'Mei Chen',x:88,y:2.4},{n:'Faizal Hamid',x:92,y:2.05},
      {n:'Zarina Yusof',x:74,y:1.85},{n:'Jason Lim',x:78,y:1.1},
      {n:'Priya Menon',x:95,y:0.65},{n:'Daniel Tan',x:85,y:0.8,r:true}];
    var L=54,R=486,T=26,B=266;
    var X=function(v){return L+((v-70)/(126-70))*(R-L);}, Y=function(v){return B-((v-0.3)/(2.8-0.3))*(B-T);};
    var s='';
    s+=rect(X(70),T,X(100)-X(70),Y(1.5)-T,{f:C.warn,o:.06,r:0});
    s+=rect(X(70),Y(1.5),X(100)-X(70),B-Y(1.5),{f:C.crit,o:.09,r:0});
    s+=rect(X(100),T,R-X(100),Y(1.5)-T,{f:C.good,o:.08,r:0});
    s+=ln(X(100),T,X(100),B,{c:C.fnt,d:'3 4'});
    s+=ln(L,Y(1.5),R,Y(1.5),{c:C.fnt,d:'3 4'});
    s+=ln(L,B,R,B,{c:C.rule,w:1.5}); s+=ln(L,T,L,B,{c:C.rule,w:1.5});
    [80,90,100,110,120].forEach(function(v){ s+=txt(X(v),B+15,v+'%',{s:9,f:C.fnt,a:'middle'}); });
    [0.5,1.0,1.5,2.0,2.5].forEach(function(v){ s+=txt(L-7,Y(v)+3.5,v.toFixed(1)+'×',{s:9,f:C.fnt,a:'end'}); });
    s+=txt(L+(R-L)/2,B+31,'Attainment today',{s:10,w:800,f:C.mut,a:'middle'});
    s+='<text transform="translate(16,'+((T+B)/2)+') rotate(-90)" font-size="10" font-weight="800" fill="'+C.mut+'" text-anchor="middle">Pipeline cover</text>';
    s+=txt(X(101),T+13,'AHEAD · WELL COVERED',{s:8,w:800,f:C.good,st:'letter-spacing:.08em'});
    s+=txt(X(70.6),B-8,'AT RISK · BEHIND AND THIN',{s:8,w:800,f:C.crit,st:'letter-spacing:.08em'});
    s+=txt(X(70.6),T+13,'BEHIND · COVERED',{s:8,w:800,f:C.warn,st:'letter-spacing:.08em'});
    var placed=[{x:X(101)-2,y:T+4,w:120,h:13},{x:X(70.6)-2,y:B-19,w:140,h:13},{x:X(70.6)-2,y:T+4,w:96,h:13}];
    function free(bx,by,bw,bh){
      return !placed.some(function(q){ return !(bx+bw<q.x-1||bx>q.x+q.w+1||by+bh<q.y-1||by>q.y+q.h+1); })
             && bx>2 && bx+bw<636 && by>2 && by+bh<B+34;
    }
    reps.forEach(function(p){
      var cx=X(p.x), cy=Y(p.y), col=p.r?C.crit:C.der, rad=p.r?6:4.2;
      if(p.r) s+='<circle cx="'+cx.toFixed(1)+'" cy="'+cy.toFixed(1)+'" r="12" fill="'+C.crit+'" opacity="0.15"/>';
      s+='<circle cx="'+cx.toFixed(1)+'" cy="'+cy.toFixed(1)+'" r="'+rad+'" fill="'+col+'"/>';
      var fs=p.r?9.5:8.4, h=p.r?22:11;
      var w=Math.max(p.n.length*fs*0.55, p.r?78:0)+2;
      var cands=[[cx+rad+4,cy-h/2],[cx-rad-4-w,cy-h/2],[cx-w/2,cy-rad-h-2],[cx-w/2,cy+rad+2],
                 [cx+rad+4,cy-h-3],[cx+rad+4,cy+3],[cx-rad-4-w,cy-h-3],[cx-rad-4-w,cy+3]];
      for(var i=0;i<cands.length;i++){
        if(free(cands[i][0],cands[i][1],w,h)){
          placed.push({x:cands[i][0],y:cands[i][1],w:w,h:h});
          s+=txt(cands[i][0],cands[i][1]+8.5,p.n,{s:fs,w:p.r?900:700,f:p.r?C.crit:C.ink});
          if(p.r) s+=txt(cands[i][0],cands[i][1]+19.5,'85% · 0.8× cover',{s:8.6,w:700,f:C.crit});
          break;
        }
      }
    });
    s+=txt(R+6,T+4,'14 reps',{s:9,w:800,f:C.fnt});
    set('dQuad',s);
  })();

  /* 5 · Sold vs sellable — funnel bar language */
  (function(){
    var d=[{l:'TV',cap:88.0,sold:79.4,fill:90,att:97},
           {l:'Addressable',cap:27.0,sold:26.1,fill:97,att:109},
           {l:'Radio',cap:34.0,sold:27.2,fill:80,att:88},
           {l:'Digital',cap:25.0,sold:15.5,fill:62,att:75}];
    var L=14,W=440,max=88,top=30,rh=58,s='';
    s+=txt(L,16,'SELLABLE INVENTORY',{s:8.5,w:800,f:C.fnt,st:'letter-spacing:.1em'});
    s+=txt(L+W,16,'RM 174.0M CAPACITY',{s:8.5,w:800,f:C.fnt,a:'end',st:'letter-spacing:.06em'});
    d.forEach(function(r,i){
      var y=top+rh*i, cw=(r.cap/max)*W, sw=(r.sold/max)*W;
      s+=rect(L,y,cw,30,{f:C.pur,o:.20,r:3});
      s+=rect(L,y,sw,30,{f:C.der,r:3});
      s+=txt(L+8,y+20,r.l,{s:11.5,w:800,f:'#fff'});
      if(sw>110) s+=txt(L+sw-8,y+20,r.sold.toFixed(1),{s:11.5,w:900,f:'#fff',a:'end'});
      else       s+=txt(L+sw+7,y+20,r.sold.toFixed(1),{s:11.5,w:900,f:C.der});
      s+=txt(L,y+45,r.fill+'% of '+r.cap.toFixed(1)+' sellable',{s:10,w:700,f:C.der});
      s+=txt(L+156,y+45,r.att+'% of target',{s:10,w:800,f:r.att>=100?C.good:C.warn});
    });
    var y2=top+rh*3+62;
    s+=ln(L,y2,L+W,y2,{c:C.rule,w:1.2});
    s+=txt(L,y2+18,'Sold',{s:11,w:800,f:C.ink});
    s+=txt(L+W,y2+18,'RM 148.2M · 85% fill',{s:12,w:900,f:C.der,a:'end'});
    s+=rect(L,y2+28,11,11,{f:C.der,r:2}); s+=txt(L+17,y2+37.5,'Sold',{s:9.5,w:600,f:C.mut});
    s+=rect(L+62,y2+28,11,11,{f:C.pur,o:.20,r:2}); s+=txt(L+79,y2+37.5,'Unsold capacity',{s:9.5,w:600,f:C.mut});
    set('dFill',s);
  })();

  /* 6 · Revenue vs contribution — 14 accounts */
  (function(){
    var d=[{n:'Maggi Malaysia',x:2.10,y:26},{n:'Shopee',x:1.95,y:16},
           {n:'Lazada MY',x:1.80,y:18},{n:'Petronas Retail',x:1.55,y:21},
           {n:'Maxis',x:1.40,y:29},{n:'Grab MY',x:1.10,y:24},
           {n:'MyKasih',x:0.90,y:22},{n:'99 Speedmart',x:0.85,y:44},
           {n:'Watsons MY',x:0.75,y:31},{n:'Mamee',x:0.65,y:36},
           {n:'ZUS Coffee',x:0.60,y:41},{n:'Farm Fresh',x:0.50,y:34},
           {n:'Tealive',x:0.45,y:38},{n:'Secret Recipe',x:0.35,y:46}];
    d.forEach(function(p){ p.c = +(p.x*p.y/100).toFixed(3); });
    var L=56,R=440,T=30,B=228;
    var X=function(v){return L+((v-0.20)/(2.30-0.20))*(R-L);}, Y=function(v){return B-((v-12)/(50-12))*(B-T);};
    var s='';
    [20,30,40,50].forEach(function(v){ s+=ln(L,Y(v),R,Y(v),{d:'3 5'}); s+=txt(L-7,Y(v)+3.5,v+'%',{s:9,f:C.fnt,a:'end'}); });
    [0.5,1.0,1.5,2.0].forEach(function(v){ s+=txt(X(v),B+15,v.toFixed(1),{s:9,f:C.fnt,a:'middle'}); s+=ln(X(v),T,X(v),B,{d:'3 5'}); });
    s+=ln(L,B,R,B,{c:C.rule,w:1.5}); s+=ln(L,T,L,B,{c:C.rule,w:1.5});
    s+=txt((L+R)/2,B+31,'Revenue, RM million',{s:10,w:800,f:C.mut,a:'middle'});
    s+='<text transform="translate(17,'+((T+B)/2)+') rotate(-90)" font-size="10" font-weight="800" fill="'+C.mut+'" text-anchor="middle">Gross margin</text>';
    s+=txt(R+4,T-14,'Bubble = gross profit',{s:9,w:600,f:C.fnt,a:'end'});
    s+=rect(L,T,R-L,Y(40)-T,{f:C.good,o:.06,r:0});
    s+=txt(R-6,Y(40)-6,'40%+ MARGIN',{s:8,w:800,f:C.good,a:'end',st:'letter-spacing:.09em'});
    var placed=[];
    function free(bx,by,bw,bh){
      return !placed.some(function(q){ return !(bx+bw<q.x-1||bx>q.x+q.w+1||by+bh<q.y-1||by>q.y+q.h+1); })
             && bx>2 && bx+bw<496 && by>2 && by+bh<B+30;
    }
    d.sort(function(a,b){ return b.c-a.c; });
    d.forEach(function(p){
      var hi=p.y>=40, cx=X(p.x), cy=Y(p.y), r=7+p.c*34, col=hi?C.good:C.pur;
      s+='<circle cx="'+cx.toFixed(1)+'" cy="'+cy.toFixed(1)+'" r="'+r.toFixed(1)+'" fill="'+col+'" opacity="'+(hi?.30:.20)+'"/>';
      s+='<circle cx="'+cx.toFixed(1)+'" cy="'+cy.toFixed(1)+'" r="'+r.toFixed(1)+'" fill="none" stroke="'+col+'" stroke-width="1.6"/>';
      if(r>=15){ s+=txt(cx,cy+3.4,p.c.toFixed(2),{s:9,w:900,f:col,a:'middle'});
                 placed.push({x:cx-15,y:cy-6,w:30,h:13}); }
      var w=p.n.length*4.9+2, h=10.5;
      var cands=[[cx-w/2,cy-r-h-2],[cx+r+4,cy-h/2],[cx-r-4-w,cy-h/2],[cx-w/2,cy+r+2],
                 [cx+r+4,cy-h-3],[cx+r+4,cy+3],[cx-r-4-w,cy-h-3],[cx-r-4-w,cy+3]];
      for(var i=0;i<cands.length;i++){
        if(free(cands[i][0],cands[i][1],w,h)){
          placed.push({x:cands[i][0],y:cands[i][1],w:w,h:h});
          s+=txt(cands[i][0],cands[i][1]+8,p.n,{s:8.6,w:hi?800:700,f:hi?C.good:C.ink});
          break;
        }
      }
    });
    set('dBubble',s);
  })();

  /* 7 · Churn by reason */
  (function(){
    var seg=[{l:'Budget cycle',v:2.1,c:C.warn},{l:'Competitive',v:1.4,c:C.crit},
             {l:'Price',v:0.5,c:C.crit},{l:'Service',v:0.4,c:C.fnt}];
    var L=16,W=448,tot=4.4,y=54,s='',x=L;
    s+=txt(L,20,'RM 4.4M LAPSED',{s:9,w:800,f:C.fnt,st:'letter-spacing:.1em'});
    seg.forEach(function(g){
      var w=(g.v/tot)*W;
      s+=rect(x,y,w-2,34,{f:g.c,r:2});
      if(w>62){ s+=txt(x+w/2-1,y+16,g.l,{s:10,w:800,f:'#fff',a:'middle'});
                s+=txt(x+w/2-1,y+28,g.v.toFixed(1),{s:10,w:900,f:'#fff',a:'middle'}); }
      else { s+=txt(x+w/2-1,y-6,g.v.toFixed(1),{s:9,w:800,f:g.c,a:'middle'}); }
      x+=w;
    });
    var rw=(2.1/tot)*W, sw=W-rw;
    s+=ln(L,y+44,L+rw-2,y+44,{c:C.warn,w:2.4,cap:'round'});
    s+=txt(L+rw/2,y+60,'RECOVERABLE · RM 2.1M',{s:9.5,w:800,f:C.warn,a:'middle',st:'letter-spacing:.06em'});
    s+=txt(L+rw/2,y+74,'timing, not loss',{s:9.5,w:600,f:C.mut,a:'middle'});
    s+=ln(L+rw+2,y+44,L+W,y+44,{c:C.crit,w:2.4,cap:'round'});
    s+=txt(L+rw+sw/2,y+60,'STRUCTURAL · RM 2.3M',{s:9.5,w:800,f:C.crit,a:'middle',st:'letter-spacing:.06em'});
    s+=txt(L+rw+sw/2,y+74,'needs a rate conversation',{s:9.5,w:600,f:C.mut,a:'middle'});
    set('dChurn',s);
  })();

  /* 8 · Concentration curve */
  (function(){
    var pts=[[0,0],[1,9.2],[2,16.1],[3,22.4],[5,38],[10,54],[20,71]];
    var L=52,R=440,T=26,B=196;
    var X=function(v){return L+(v/20)*(R-L);}, Y=function(v){return B-(v/80)*(B-T);};
    var s='';
    [20,40,60,80].forEach(function(v){ s+=ln(L,Y(v),R,Y(v),{d:'3 5'}); s+=txt(L-7,Y(v)+3.5,v+'%',{s:9,f:C.fnt,a:'end'}); });
    [1,5,10,20].forEach(function(v){ s+=txt(X(v),B+15,'Top '+v,{s:9,f:C.fnt,a:'middle'}); });
    s+=ln(L,B,R,B,{c:C.rule,w:1.5}); s+=ln(L,T,L,B,{c:C.rule,w:1.5});
    var p=''; pts.forEach(function(q,i){ p+=(i?' L':'M')+X(q[0]).toFixed(1)+' '+Y(q[1]).toFixed(1); });
    s+=path(p+' L'+X(20).toFixed(1)+' '+B+' L'+X(0).toFixed(1)+' '+B+' Z',{f:C.pur,o:.13});
    s+=path(p,{s:C.pur,w:3});
    s+=ln(X(5),Y(38),X(5),B,{c:C.warn,d:'4 3',w:1.4});
    s+='<circle cx="'+X(5).toFixed(1)+'" cy="'+Y(38).toFixed(1)+'" r="6" fill="'+C.warn+'"/>';
    s+=txt(X(5)+11,Y(38)-4,'Top 5 = 38%',{s:10.5,w:900,f:C.ink});
    s+=txt(X(5)+11,Y(38)+9,'losing two breaches plan',{s:9.5,w:600,f:C.mut});
    s+=txt(X(1)+6,Y(9.2)-7,'largest 9.2%',{s:9.5,w:700,f:C.fnt});
    s+='<circle cx="'+X(1).toFixed(1)+'" cy="'+Y(9.2).toFixed(1)+'" r="4" fill="'+C.pur+'"/>';
    s+=txt((L+R)/2,B+31,'Advertisers by rank',{s:10,w:800,f:C.mut,a:'middle'});
    set('dConc',s);
  })();

  /* 9 · Us vs market */
  (function(){
    var mk=[100,101.2,102.4,103.5,104.8,105.9,107.0,108.1];
    var us=[100,100.9,101.9,102.8,103.8,104.7,105.6,106.4];
    var sh=[14.20,14.14,14.12,14.08,14.02,13.95,13.88,13.80];
    var L=52,R=628,T=26,B=176;
    var X=function(i){return L+(R-L)*(i/7);}, Y=function(v){return B-((v-98)/(110-98))*(B-T);};
    var s='';
    [100,104,108].forEach(function(v){ s+=ln(L,Y(v),R,Y(v),{d:'3 5'}); s+=txt(L-7,Y(v)+3.5,v,{s:9,f:C.fnt,a:'end'}); });
    s+=ln(L,B,R,B,{c:C.rule,w:1.5});
    for(var i=0;i<8;i++){ s+=txt(X(i),B+15,M[i],{s:9,f:C.fnt,a:'middle'}); }
    function mkp(a){ var p=''; for(var k=0;k<a.length;k++){ p+=(k?' L':'M')+X(k).toFixed(1)+' '+Y(a[k]).toFixed(1); } return p; }
    s+=path(mkp(mk)+' L'+X(7).toFixed(1)+' '+Y(us[7]).toFixed(1)+' '+mkp(us).replace('M','L').split('L').reverse().join('L').replace(/^L/,'')+' Z',{f:C.crit,o:.10});
    s+=path(mkp(mk),{s:C.fnt,w:2.4,d:'6 4'});
    s+=path(mkp(us),{s:C.der,w:3.4});
    s+=txt(R+4,Y(108.1)+3.5,'market +8.1%',{s:9.5,w:800,f:C.mut});
    s+=txt(R+4,Y(106.4)+3.5,'us +6.4%',{s:9.5,w:800,f:C.der});
    var sT=222,sB=252;
    var SY=function(v){return sB-((v-13.6)/(14.4-13.6))*(sB-sT);};
    s+=txt(L-7,sT+4,'14.4%',{s:8.5,f:C.fnt,a:'end'}); s+=txt(L-7,sB+4,'13.6%',{s:8.5,f:C.fnt,a:'end'});
    var sp=''; for(var j=0;j<sh.length;j++){ sp+=(j?' L':'M')+X(j).toFixed(1)+' '+SY(sh[j]).toFixed(1); }
    s+=path(sp+' L'+X(7).toFixed(1)+' '+sB+' L'+X(0).toFixed(1)+' '+sB+' Z',{f:C.crit,o:.13});
    s+=path(sp,{s:C.crit,w:2.6});
    s+=txt(R,sT-9,'SHARE OF MARKET',{s:8.5,w:800,f:C.fnt,a:'end',st:'letter-spacing:.1em'});
    s+=txt(X(0)+4,SY(14.2)-7,'14.2%',{s:9.5,w:800,f:C.crit});
    s+=txt(X(7)-4,SY(13.8)-7,'13.8%',{s:9.5,w:900,f:C.crit,a:'end'});
    set('dShare',s);
  })();
})();
```

- [x] **Step 2: Verify — content, collisions, arithmetic**

Reload, wait 6s, run:

```js
(() => {
  const ids=['dFan','dBridge','dFunnel','dQuad','dFill','dBubble','dChurn','dConc','dShare'];
  const charts={}, bad={};
  ids.forEach(id=>{
    const svg=document.getElementById(id);
    charts[id]=svg && svg.innerHTML.length>200 ? 'ok' : 'EMPTY';
    if(!svg) return;
    const ts=[...svg.querySelectorAll('text')], hits=[];
    for(let i=0;i<ts.length;i++)for(let j=i+1;j<ts.length;j++){
      const a=ts[i].getBBox(), c=ts[j].getBBox();
      const ox=Math.min(a.x+a.width,c.x+c.width)-Math.max(a.x,c.x);
      const oy=Math.min(a.y+a.height,c.y+c.height)-Math.max(a.y,c.y);
      if(ox>1&&oy>1) hits.push(ts[i].textContent+' ↔ '+ts[j].textContent);
    }
    const vb=svg.viewBox.baseVal;
    // rotated text excluded: getBBox is pre-transform and false-positives on it
    const esc=ts.filter(t=>!t.getAttribute('transform'))
      .filter(t=>{const b=t.getBBox(); return b.x<-1||b.y<-1||b.x+b.width>vb.width+1||b.y+b.height>vb.height+1;})
      .map(t=>t.textContent);
    if(hits.length||esc.length) bad[id]={overlaps:hits,clipped:esc};
  });
  // arithmetic audit — a leadership reader checks totals
  const ty=[16.2,17.1,18.4,17.0,19.6,20.2,19.1,20.6];
  const actual=[79.4,26.1,27.2,15.5], target=[82.0,24.0,31.0,20.6];
  const gap=[-2.4,-1.9,-1.0,-2.2,-0.4,-0.2,-1.1,-0.2];
  const s=a=>+a.reduce((x,y)=>x+y,0).toFixed(1);
  return { charts, defects:Object.keys(bad).length?bad:'none',
    monthsSum:s(ty), mediaSum:s(actual), targetSum:s(target), gapSum:s(gap),
    reconciles: s(ty)===148.2 && s(actual)===148.2 && s(target)===157.6 && s(gap)===-9.4,
    quadCircles: document.getElementById('dQuad').querySelectorAll('circle').length, // 15 (14 + halo)
    bubbleCount: document.getElementById('dBubble').querySelectorAll('circle').length/2 // 14
  };
})()
```

Expected: every chart `ok`, `defects:'none'`, `reconciles:true`, 15 quad circles, 14 bubbles. Console clean.

- [x] **Step 3: Visual check**

Scroll to the section (JS), take a screenshot. If the pane serves a blank/stale frame (known quirk), temporarily `display:none` the content above the section via JS, screenshot at scroll 0, then reload to discard the debug state.

- [x] **Step 4: Commit**

```bash
cd /Users/kwlkokho/Documents/GitHub/Collabrium-DS/.worktrees/app-shell-intro-page
git add pages/app-shell-intro.html
git commit -m "feat: render the nine ideal-board charts from reconciled data"
```

---

### Task 4: Full verification matrix + docs true-up

**Files:**
- Modify: `pages/app-shell-intro.html` (fixes only, if the matrix finds defects)
- Modify: `docs/superpowers/specs/2026-08-07-role-dashboard-section-design.md` (Status line)
- Modify: `docs/superpowers/plans/2026-08-07-ideal-board-dashboard-section.md` (checkboxes)

- [x] **Step 1: End-to-end journey with real pointer input**

Fresh load, wait 6s. Then, using the `computer` tool for every interaction (synthetic clicks false-pass here):

1. Click `Dashboard ↓`. Assert `.c-shell-content.scrollTop` moved smoothly to put `#dashboard` in view, `window.scrollY` still 0, `is-revealed` on the section, ask box `is-parked` + `is-settled`.
2. Scroll back to top (real scroll input or JS `scrollTop = 0`). Assert `is-parked` removed; box visible again.
3. Scroll back down. Assert widgets remain revealed (one-way), box parks again.
4. Click a period-toggle segment. Assert `active`/`aria-selected` moved and the thumb's `left` changed (offset-based).

- [x] **Step 2: Section-1 regression**

The section must not have disturbed the approved page above it:

```js
(() => {
  const cards=[...document.querySelectorAll('.c-card-slide')];
  return {
    cardHeights: cards.map(c=>c.offsetHeight),          // all exactly 400
    ribbons: document.querySelectorAll('.c-hcard-ribbon').length, // 3
    trophy: !!document.querySelector('.c-hcard-trophy'),
    askBoxStillFixed: getComputedStyle(document.getElementById('askBox')).position, // "fixed"
    dashLinkText: document.getElementById('dashLink').textContent.trim()
  };
})()
```

Also real-click the Pace card and confirm its modal still opens with the swing (class assertions + offset geometry, not mid-flight poses), then Escape to close.

- [x] **Step 3: Reduced-motion inspection**

No emulation toggle is available for RM in this pane; verify by CSS assertion instead:

```js
(() => {
  const sheets=[...document.styleSheets].filter(s=>{try{return !!s.cssRules}catch(e){return false}});
  const rmRules=sheets.flatMap(s=>[...s.cssRules])
    .filter(r=>r.media && r.media.mediaText.includes('prefers-reduced-motion'))
    .flatMap(r=>[...r.cssRules].map(x=>x.selectorText));
  return {
    coversScroll: rmRules.some(t=>t&&t.includes('.c-shell-content')),
    coversWidgets: rmRules.some(t=>t&&t.includes('.c-dash-w')),
    coversAskbox: rmRules.some(t=>t&&t.includes('is-parked'))
  };
})()
```

All three true. Critically, confirm the RM widget rule sets `opacity:1` (end state), not merely `transition:none`.

- [x] **Step 4: Console + no sideways scroll + narrow width**

`read_console_messages` clean. `document.documentElement.scrollWidth <= clientWidth` at 1280 and at 900 (resize_window; tables must scroll inside `.c-dash-scroll`, never the body).

- [x] **Step 5: Docs true-up**

- Spec: change `**Status:** Approved; scope amended same day (see Scope amendment), planned` → `**Status:** Implemented (plan 2026-08-07-ideal-board-dashboard-section.md)`.
- This plan: tick all completed checkboxes; record any deviations in a `## Deviations` section at the bottom (create it only if there are any).

- [x] **Step 6: Commit**

```bash
cd /Users/kwlkokho/Documents/GitHub/Collabrium-DS/.worktrees/app-shell-intro-page
git add pages/app-shell-intro.html docs/superpowers/specs/2026-08-07-role-dashboard-section-design.md docs/superpowers/plans/2026-08-07-ideal-board-dashboard-section.md
git commit -m "test: full verification matrix for the dashboard section; docs true-up"
```

## Deviations

Recorded during subagent-driven execution, 2026-08-07/08:

1. **Task 3's dShare band path splice was a plan bug.** The plan's
   `split('L').reverse().join('L')` construction leaves a trailing bare `L`
   before `Z` — an SVG parse error. Replaced with an explicit `revp()`
   reverse-path builder (same coordinates). The same latent bug was found
   and fixed in the reference tracker page (`pages/leadership-dashboard-tracker.html`),
   where the band had been silently failing to render.
2. **The plan's weighted-pipeline figures did not reconcile.** Stages
   25.6 + 22.1 + 27.0 sum to 74.7, not the plan's 74.5 total — which fed
   148.2 + 74.5 = 222.7. Fixed forward: total RM 74.7M, forecast RM 222.9M,
   shortfall RM 17.1M, in both the page and the tracker.
3. **Review-driven polish beyond the plan text:** reduced-motion unpark made
   instant (`.c-canvas-askbox{transition:none}` under RM); churn table gained a
   visually-hidden `<thead>`; the period toggle uses `role="radiogroup"`/`radio`
   + `aria-checked` instead of the plan's `tablist` (honest semantics; the Pace
   modal's tablist toggle is pre-existing and out of scope); dead `.c-dash-wn`
   rule deleted; redundant `td.num` restatement trimmed; dBridge's separator
   rule fitted to its viewBox; silent-drop and entity-escaping caveats
   documented in the chart module.
4. **Churn-table thead approach:** `.c-dash-vh` applied to the `<thead>`
   element directly — verified it collapses out of flow with zero layout shift
   while exposing headers to the accessibility tree.
5. **Holistic-review fixes (2026-08-08):** the reveal and parking jobs were
   split apart after both intersection-based approaches failed one geometry
   each. The original `threshold: 0.12` was unreachable on phone portrait
   (at 375×667 the single-column section is ~8,000px tall, max intersection
   ratio ~0.08 — the section never revealed at all); the first fix,
   `threshold: 0` doing both jobs, parked the ask box AT LOAD on any window
   taller than the section's offsetTop (~742px — most desktops), because the
   section head peeks above the fold and the observer's first fire parked a
   box the user was still watching type. Final mechanism: the observer keeps
   only the one-way reveal at `threshold: 0` (mobile-safe, any-pixel), and
   parking moved to the passive scroll listener as deterministic scrollTop
   math — park once ~240px of the section is visible
   (`scrollTop > dash.offsetTop - clientHeight + 240`), unpark below that,
   evaluated once at setup so load state is correct. The fixed date banner
   (`.c-canvas-date`) fades via `.is-scrolled-away` on the same listener once
   the container scrolls past 40px (it predates the page scrolling and
   collided with card text at scrollTop ~520; instant under reduced motion).
   Both chart modules (`pages/app-shell-intro.html`,
   `pages/leadership-dashboard-tracker.html`) gained header pointers naming
   each other as diverged copies: port fixes both ways.
