# Mode 3 — Decision Workspace Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a third mode to `pages/leadership-dashboard-tracker.html` that reorders Mode 2's content under decisions — posture, health strip, seven decision objects tiered by horizon, watch thresholds, an evidence tray, and a decision log — proving that the same content ordered by decision reads differently from the same content ordered by chart.

**Architecture:** Mode 3 is a third value on the file's existing `data-mode` attribute switch, so mode isolation is CSS attribute filtering and costs one rule block. All new markup lives inside the existing `.dash` grid as `data-mode-only="decide"` widgets, every one spanning all 12 columns because Mode 3's hierarchy is vertical, not a grid. The horizon filter re-tiers decision cards with flexbox `order` — pure CSS, no DOM moves. Six mini-chart renderers are added *inside* the existing chart-module IIFE so they reuse its colour map and SVG string helpers, and are exposed on `window.M3CHARTS` for the separate interaction module.

**Tech Stack:** Single self-contained HTML file. Vanilla ES5-style JS (the file's existing idiom — `var`, `function`, no arrow functions in the chart module). Fixed-viewBox SVG built as strings with zero layout measurement. No build step, no test framework — verification is in-browser assertions and screenshots via the Browser pane.

**Spec:** `docs/superpowers/specs/2026-08-08-mode3-decision-workspace-design.md`

---

## Before you start

**Working directory is the worktree, not the main repo.** Running `git commit` from `/Users/kwlkokho/Documents/GitHub/Collabrium-DS` instead of the worktree is a recurring mistake on this project and commits to the wrong branch.

```bash
cd /Users/kwlkokho/Documents/GitHub/Collabrium-DS/.worktrees/app-shell-intro-page
git status   # expect: On branch app-shell-intro-page, clean
```

**Start the dev server** (use the Browser pane's `preview_start`, never Bash for servers):

```bash
python3 -m http.server 8791
```

Target URL: `http://localhost:8791/pages/leadership-dashboard-tracker.html`

**Sandbox quirks that will waste your time if you don't know them:**

- The Browser pane runs pages with `document.hidden === true` and delivers zero animation frames. CSS transitions and native smooth scroll **stall**. Taking a screenshot forces frames. This is why mini-charts must be fixed-viewBox with no measurement.
- A `scrollTop` write and a read of it in the *same* `javascript_exec` call can return a stale value. Isolate each into its own call.
- `window.innerWidth` can read 0 before layout. Use `window.visualViewport.width`.
- Screenshots come back at 2× device-pixel ratio. Click coordinates are image coordinates ÷ 2. Prefer `ref`-based clicking via `read_page` over coordinates.
- **Synthetic dispatched clicks can false-pass on these pages.** Use the `computer` tool's real pointer input for anything you are claiming works.
- `getBBox()` on a **rotated** `<text>` returns its pre-transform box, which produces false positives in collision audits. Exclude `[transform]` elements.

**Never touch `collabrium-dls/`.** It is read-only reference. All theming happens in this file's own artifact layer.

---

## File structure

One file is modified. No files are created except docs.

| File | Responsibility | Change |
|---|---|---|
| `pages/leadership-dashboard-tracker.html` | The whole tracker | Modified in five distinct regions, listed below |
| `docs/superpowers/plans/2026-08-08-mode3-decision-workspace.md` | This plan | Deviations section appended as you go |

The five regions of the file, with the line numbers as of commit `5ff871a`. **Line numbers shift as you insert — always anchor edits on the quoted text, never on a bare line number.**

| Region | Line (at 5ff871a) | What it is |
|---|---|---|
| R1 mode buttons | 971–982 | `.modes` container, currently two buttons |
| R2 dash grid | ends 1370 | `.dash` closing `</div>`; all Mode 3 markup goes immediately before it |
| R3 mode switch JS | 1405–1423 | `copy` / `titles` maps and `setMode()` |
| R4 init IIFE | 1447–1448 | sets the `data-view` default; Mode 3's `data-horizon` default joins it |
| R5 Mode 2 style block | ends 1488 | `<style>` block; Mode 3 CSS appends before its `</style>` |
| R6 chart module IIFE | opens 1490 | `C`, `txt`, `ln`, `rect`, `path`; mini-charts go inside, before its final `})();` |

---

## Task 1: Mode 3 shell — third mode, isolation, posture and horizon filter

Produces a working, switchable third mode containing only the posture layer. Modes 1 and 2 must be byte-for-byte unchanged in behaviour.

**Files:**
- Modify: `pages/leadership-dashboard-tracker.html` regions R1, R2, R3, R4, R5

- [ ] **Step 1: Write the failing test**

Open `http://localhost:8791/pages/leadership-dashboard-tracker.html` in the Browser pane and run this in `javascript_exec`. It is the mode-isolation and regression assertion used by every later task, so keep it to hand.

```js
(() => {
  const root = document.getElementById('root');
  const vis = () => [...document.querySelectorAll('.dash > .w')]
    .filter(w => getComputedStyle(w).display !== 'none');
  const counts = {};
  ['now','next','decide'].forEach(m => {
    root.setAttribute('data-mode',m); root.parentElement.setAttribute('data-mode',m);
    root.parentElement.setAttribute('data-mode', m);
    counts[m] = {
      total: vis().length,
      leaked: vis().filter(w => w.dataset.modeOnly && w.dataset.modeOnly !== m).length
    };
  });
  root.setAttribute('data-mode','now'); root.parentElement.setAttribute('data-mode','now');
  root.parentElement.setAttribute('data-mode','now');
  return JSON.stringify({
    counts,
    hasThirdButton: !!document.getElementById('mDecide'),
    modeButtons: document.querySelectorAll('.modes button').length
  }, null, 1);
})()
```

Expected before the change: `hasThirdButton: false`, `modeButtons: 2`, and `counts.decide` showing Mode 1's widgets still visible because no rule hides them — i.e. `counts.decide.leaked > 0`.

- [ ] **Step 2: Run it and confirm it fails**

Expected output shape: `{"counts":{"now":{"total":19,"leaked":0},"next":{"total":13,"leaked":0},"decide":{"total":32,"leaked":32}},"hasThirdButton":false,"modeButtons":2}`

The exact `now` and `next` totals are whatever the file currently has — **write them down**, they are the regression baseline for every later task. The failure signals are `leaked: 32` on `decide` and `hasThirdButton: false`.

- [ ] **Step 3: Add the third mode button (R1)**

Insert after the `mNext` button's closing `</button>` and before `</div>`:

```html
    <button type="button" id="mDecide" aria-pressed="false" data-m="decide">
      <span class="m-k">Mode 3</span>
      <span class="m-t">The decision workspace</span>
      <span class="m-d">Experience-led — decisions first, evidence on demand</span>
    </button>
```

- [ ] **Step 4: Add Mode 3 CSS (R5)**

Append immediately before the `</style>` that closes the Mode 2 style block:

```css
/* ══════════ Mode 3 · decision workspace ══════════
   A third value on the same data-mode switch Modes 1 and 2 already use —
   isolation is attribute filtering, not new plumbing. Every new class is
   m3-* prefixed except the .dec trio; note the file already owns .st,
   .st-lead, .st-v, .st-warn, .stack and .strip, so status chips are
   .m3-chip[data-status] and must never take an st- prefix. */
[data-mode="now"]    .w[data-mode-only="decide"],
[data-mode="next"]   .w[data-mode-only="decide"]{display:none;}
[data-mode="decide"] .w[data-mode-only="now"],
[data-mode="decide"] .w[data-mode-only="next"]{display:none;}

/* Mode 3 is leadership-level and implements no filtering, so the role tabs
   and the media/segment chips would be dead affordances. The MTD/QTD/YTD
   control goes too: the horizon filter replaces it, which is the review's
   operating-cadence ask answered rather than two adjacent time controls. */
[data-mode="decide"] .roles,
[data-mode="decide"] .filters,
[data-mode="decide"] .period{display:none;}

/* Mode 3 wears --art-accent, so which mode you are in is legible from the
   chrome alone: ink for Mode 1, imagined/purple for Mode 2, accent here. */
[data-mode="decide"] .modes{border-color:var(--art-accent);}
[data-mode="decide"] .modes button{border-right-color:var(--art-accent);}
[data-mode="decide"] .modes button[aria-pressed="true"]{background:var(--art-accent); border-color:var(--art-accent);}
[data-mode="decide"] .mbanner{border-left-color:var(--art-accent); background:rgba(255,88,37,.07);}

/* Three buttons no longer fit one row on a narrow viewport. */
@media (max-width:860px){
  .modes{flex-wrap:wrap;}
  .modes button{flex:1 1 100%; border-right:0; border-bottom:1px solid var(--art-ink);}
  .modes button:last-child{border-bottom:0;}
  [data-mode="next"]   .modes button{border-bottom-color:var(--art-imagined);}
  [data-mode="decide"] .modes button{border-bottom-color:var(--art-accent);}
}

/* ── Posture: orientation before decisions. The one thing a decision-only
   page would have lost, so it is first and it is quiet. ── */
.m3-posture{background:var(--art-surface); border:1px solid var(--art-rule); border-radius:3px;
  box-shadow:var(--art-shadow); padding:18px 20px;}
.m3-posture p{margin:0; font-size:15.5px; line-height:1.55; color:var(--art-ink); font-weight:600;}
.m3-delta{margin:12px 0 0 !important; padding-top:12px; border-top:1px solid var(--art-rule);
  font-size:12.5px !important; font-weight:600 !important; color:var(--art-muted) !important;}
.m3-hz{display:flex; align-items:center; gap:10px; flex-wrap:wrap; margin-top:14px;}
.m3-hz-lbl{font-size:10px; font-weight:800; letter-spacing:.13em; text-transform:uppercase; color:var(--art-faint);}
.m3-hz button{border:1px solid var(--art-rule); background:var(--art-surface); border-radius:999px;
  padding:5px 13px; font:inherit; font-size:12px; font-weight:700; color:var(--art-muted); cursor:pointer;}
.m3-hz button:hover{border-color:var(--art-faint); color:var(--art-ink);}
.m3-hz button[aria-pressed="true"]{background:var(--art-ink); border-color:var(--art-ink); color:var(--art-canvas);}
.m3-hz button:focus-visible{outline:2px solid var(--art-accent); outline-offset:1px;}
```

- [ ] **Step 5: Add the posture widget markup (R2)**

Insert immediately before the `  </div>` that closes `.dash` (the one directly after `    </div></div>` and a blank line, at 1370 in `5ff871a`):

```html
    <!-- ═══════════ MODE 3 · DECISION WORKSPACE ═══════════
         Reorders Mode 2, adds no analysis. Every widget is s12: the whole
         point is that the page stops being a grid of equal cells. -->

    <div class="w s12" data-mode-only="decide"><div class="m3-posture">
      <p>Revenue is growing and margin is improving, but plan and share are both at risk. RM&nbsp;111.2M of pipeline is open against a RM&nbsp;17.1M gap, so the shortfall is a conversion question — while Digital's unsold shelf and RM&nbsp;4.4M of lapsed revenue say the demand underneath it is thinner than the growth rate suggests.</p>
      <p class="m3-delta"><span class="prov-s"><i class="dot dot-p"></i>pending</span> &nbsp;Since Monday: weighted forecast +RM&nbsp;1.2M · one negotiation-stage deal slipped to Q4 · the Petronas Q3 reset is 7 days undiarised · no decisions closed.</p>
      <div class="m3-hz" role="group" aria-label="Decision horizon">
        <span class="m3-hz-lbl">Horizon</span>
        <button type="button" data-hz="week" aria-pressed="true">This week</button>
        <button type="button" data-hz="quarter" aria-pressed="false">This quarter</button>
        <button type="button" data-hz="fy" aria-pressed="false">FY outlook</button>
      </div>
    </div></div>
```

- [ ] **Step 6: Generalise `setMode` and add Mode 3 copy (R3)**

Replace the two `copy` entries' closing and the whole `setMode` block. Find:

```js
  var titles={now:['Across the business','Every media line, rolled up — exceptions first'],
              next:['The ideal board','Everything available today, plus the six sources still to land']};
  function setMode(mode){
    root.parentElement.setAttribute('data-mode',mode);
    root.setAttribute('data-mode',mode); root.parentElement.setAttribute('data-mode',mode);
    document.getElementById('mNow').setAttribute('aria-pressed',String(mode==='now'));
    document.getElementById('mNext').setAttribute('aria-pressed',String(mode==='next'));
    bText.innerHTML=copy[mode];
    document.getElementById('secTitle').textContent=titles[mode][0];
    document.getElementById('secSub').textContent=titles[mode][1];
  }
  document.getElementById('mNow').addEventListener('click',function(){setMode('now');});
  document.getElementById('mNext').addEventListener('click',function(){setMode('next');});
```

Replace with:

```js
  var titles={now:['Across the business','Every media line, rolled up — exceptions first'],
              next:['The ideal board','Everything available today, plus the six sources still to land'],
              decide:['Three decisions this week','Ordered by what is at stake, not by what is easy to chart']};
  // Loop over .modes button keyed on data-m rather than naming each button:
  // the two-button version needed one more line per mode forever, and a
  // fourth mode now costs zero JS.
  function setMode(mode){
    root.parentElement.setAttribute('data-mode',mode);
    root.setAttribute('data-mode',mode); root.parentElement.setAttribute('data-mode',mode);
    document.querySelectorAll('.modes button').forEach(function(b){
      b.setAttribute('aria-pressed',String(b.dataset.m===mode));
    });
    bText.innerHTML=copy[mode];
    document.getElementById('secTitle').textContent=titles[mode][0];
    document.getElementById('secSub').textContent=titles[mode][1];
  }
  document.querySelectorAll('.modes button').forEach(function(b){
    b.addEventListener('click',function(){setMode(b.dataset.m);});
  });
```

Then add the `decide` entry to the `copy` map — find the `next:` entry's closing `'` and comma-append:

```js
    decide:'<b>This mode reorders, it does not add.</b> Every figure comes from Mode 2 — the same forecast, the same concentration, the same fill rates. What changes is the ordering: decisions are the objects and the charts became their evidence. Roughly a third of the fields here — every deadline, every status, the cash metric and all “since last review” deltas — are an operating layer no dataset supplies. Those carry the pending marker.'
```

- [ ] **Step 7: Set the horizon default and wire the filter (R4)**

Find:

```js
  root.setAttribute('data-view','leadership');
  root.parentElement.setAttribute('data-view','leadership');
```

Append after those two lines, inside the same IIFE:

```js
  // Mode 3 horizon default. Same attribute-filtering philosophy as data-mode
  // and data-view — CSS does the re-tiering, JS only writes the attribute.
  root.setAttribute('data-horizon','week'); root.parentElement.setAttribute('data-horizon','week');
  root.parentElement.setAttribute('data-horizon','week');
  var hzGroup=document.querySelector('.m3-hz');
  if(hzGroup){
    hzGroup.addEventListener('click',function(e){
      var b=e.target.closest('button[data-hz]'); if(!b)return;
      hzGroup.querySelectorAll('button[data-hz]').forEach(function(x){
        x.setAttribute('aria-pressed',String(x===b));
      });
      root.setAttribute('data-horizon',b.dataset.hz); root.parentElement.setAttribute('data-horizon',b.dataset.hz);
      root.parentElement.setAttribute('data-horizon',b.dataset.hz);
    });
  }
```

- [ ] **Step 8: Run the test to verify it passes**

Reload, wait 2 seconds, take a screenshot to force frames, then re-run the Step 1 assertion.

Expected: `hasThirdButton: true`, `modeButtons: 3`, `counts.decide.leaked === 0`, `counts.decide.total === 1`, and **`counts.now.total` and `counts.next.total` identical to the baseline you recorded in Step 2**. That last check is the regression gate — the two-mode CSS now has a third neighbour.

- [ ] **Step 9: Verify the mode switch works with real input**

Use `read_page` to get a ref for the Mode 3 button, then `computer` `left_click` on it — not a dispatched event. Then:

```js
(() => {
  const root = document.getElementById('root');
  return JSON.stringify({
    mode: root.getAttribute('data-mode'),
    wrapperMode: root.parentElement.getAttribute('data-mode'),
    horizon: root.getAttribute('data-horizon'),
    pressed: [...document.querySelectorAll('.modes button')].map(b => b.dataset.m + '=' + b.getAttribute('aria-pressed')),
    title: document.getElementById('secTitle').textContent,
    rolesHidden: getComputedStyle(document.querySelector('.roles')).display === 'none',
    periodHidden: getComputedStyle(document.querySelector('.period')).display === 'none',
    bannerMentionsReorder: document.getElementById('bannerText').textContent.includes('reorders')
  }, null, 1);
})()
```

Expected: `mode` and `wrapperMode` both `"decide"`, `horizon: "week"`, `pressed: ["now=false","next=false","decide=true"]`, title `"Three decisions this week"`, both hidden flags `true`, `bannerMentionsReorder: true`.

Then click Mode 1 and Mode 2 and confirm each still switches — the generalised loop replaced named handlers, so this is a real regression risk.

- [ ] **Step 10: Commit**

```bash
cd /Users/kwlkokho/Documents/GitHub/Collabrium-DS/.worktrees/app-shell-intro-page
git add pages/leadership-dashboard-tracker.html
git commit -m "feat: Mode 3 shell — third mode, isolation CSS, posture and horizon filter"
```

---

## Task 2: Health strip and Watch tier

Six health metrics and four watch cards, plus the visual tier CSS both depend on.

**Files:**
- Modify: `pages/leadership-dashboard-tracker.html` regions R2, R5

- [ ] **Step 1: Write the failing test**

```js
(() => {
  const root = document.getElementById('root');
  root.setAttribute('data-mode','decide'); root.parentElement.setAttribute('data-mode','decide');
  root.parentElement.setAttribute('data-mode','decide');
  const hm = [...document.querySelectorAll('.m3-hm')];
  const wc = [...document.querySelectorAll('.m3-wcard')];
  return JSON.stringify({
    healthMetrics: hm.length,
    healthLabels: hm.map(h => h.querySelector('.m3-hm-k')?.textContent),
    nrrDerived: !!document.querySelector('.m3-hm .dot-d'),
    watchCards: wc.length,
    watchHasNoButtons: wc.every(c => c.querySelectorAll('button').length === 0),
    everyWatchHasThreshold: wc.every(c => (c.textContent || '').includes('Escalates if'))
  }, null, 1);
})()
```

Expected before the change: `healthMetrics: 0`, `watchCards: 0`.

- [ ] **Step 2: Run it and confirm it fails**

Expected: `{"healthMetrics":0,"healthLabels":[],"nrrDerived":false,"watchCards":0,"watchHasNoButtons":true,"everyWatchHasThreshold":true}`

The two `every()` flags vacuously pass on an empty array — that is fine, they become meaningful once the cards exist.

- [ ] **Step 3: Add the tier and strip CSS (R5)**

Append before the same `</style>`:

```css
/* ── Health strip: calm context. Six metrics, no charts, nothing that
   competes with the decisions below. Each carries direction AND velocity —
   a leader needs to know whether something is deteriorating, not only
   where it stands. ── */
.m3-health{display:grid; grid-template-columns:repeat(6,1fr); gap:0;
  background:var(--art-surface); border:1px solid var(--art-rule); border-radius:3px;
  box-shadow:var(--art-shadow); overflow:hidden;}
@media (max-width:1150px){ .m3-health{grid-template-columns:repeat(3,1fr);} }
@media (max-width:680px){ .m3-health{grid-template-columns:repeat(2,1fr);} }
.m3-hm{padding:14px 15px; border-right:1px solid var(--art-rule); display:flex; flex-direction:column; gap:4px;}
.m3-hm:last-child{border-right:0;}
.m3-hm-k{font-size:9.5px; font-weight:800; letter-spacing:.12em; text-transform:uppercase; color:var(--art-faint);}
.m3-hm-v{font-size:21px; font-weight:900; letter-spacing:-.02em; line-height:1.1; font-variant-numeric:tabular-nums;}
.m3-hm-d{font-size:11.5px; color:var(--art-muted); line-height:1.45;}
.m3-hm-d b{color:var(--art-ink);}
.m3-up{color:var(--art-good);} .m3-dn{color:var(--art-crit);}

/* ── Tier system. Weight is a function of stakes, assigned by the page —
   a RM 56.3M exposure physically cannot look like an interesting aside. ── */
.m3-tier{font-size:9.5px; font-weight:800; letter-spacing:.14em; text-transform:uppercase;
  display:inline-flex; align-items:center; gap:6px;}
.m3-tier::before{content:''; width:8px; height:8px; border-radius:50%; background:currentColor;}
.m3-t-urgent{color:var(--art-crit);}
.m3-t-risk{color:var(--art-warn);}
.m3-t-opp{color:var(--art-good);}
.m3-t-strategic{color:var(--art-imagined);}

/* Section rules — quiet labels, not cards, so the tiers below them read as
   the page's structure rather than as more boxes. */
.m3-srule{display:flex; align-items:baseline; gap:12px; margin:8px 0 -2px;}
.m3-srule h3{margin:0; font-size:13px; font-weight:900; letter-spacing:.1em; text-transform:uppercase; color:var(--art-ink);}
.m3-srule p{margin:0; font-size:12px; color:var(--art-faint);}

/* ── Watch: compact, threshold-only, and deliberately BUTTONLESS. Every
   tier having actions is how the page went flat in the first place. The
   tier is the guidance: Now means act, Watch means not yet. ── */
.m3-watch{display:grid; grid-template-columns:repeat(4,1fr); gap:14px;}
@media (max-width:1000px){ .m3-watch{grid-template-columns:repeat(2,1fr);} }
@media (max-width:560px){ .m3-watch{grid-template-columns:1fr;} }
.m3-wcard{background:var(--art-surface); border:1px solid var(--art-rule); border-radius:3px;
  box-shadow:var(--art-shadow); padding:13px 15px; display:flex; flex-direction:column; gap:6px;}
.m3-wcard h4{margin:0; font-size:12.5px; font-weight:800; color:var(--art-ink);}
.m3-wv{font-size:15px; font-weight:900; letter-spacing:-.01em; font-variant-numeric:tabular-nums;}
.m3-wcard p{margin:0; font-size:11.5px; color:var(--art-muted); line-height:1.5;}
.m3-thr{margin-top:auto !important; padding-top:8px; border-top:1px dashed var(--art-rule);
  font-size:11px !important; color:var(--art-faint) !important;}
.m3-thr b{color:var(--art-warn);}
```

- [ ] **Step 4: Add the health strip and Watch markup (R2)**

Insert immediately after the posture widget's closing `</div></div>` from Task 1:

```html
    <div class="w s12" data-mode-only="decide"><div class="m3-health" id="m3Health">
      <div class="m3-hm">
        <span class="m3-hm-k">Forecast to plan</span>
        <span class="m3-hm-v">RM 222.9M</span>
        <span class="m3-hm-d">of RM 240.0M · <b class="m3-dn">RM 17.1M short</b><br><span class="prov-s"><i class="dot dot-p"></i>pending</span> +RM 1.2M since Monday</span>
      </div>
      <div class="m3-hm">
        <span class="m3-hm-k">Gross margin</span>
        <span class="m3-hm-v">31.4%</span>
        <span class="m3-hm-d"><b class="m3-up">+0.8pt</b> vs LY<br>the only headline metric improving</span>
      </div>
      <div class="m3-hm">
        <span class="m3-hm-k">Net revenue retention</span>
        <span class="m3-hm-v">97.3%</span>
        <span class="m3-hm-d"><span class="prov-s"><i class="dot dot-d"></i>derived</span> from the growth bridge<br>lapsed RM 4.4M YTD</span>
      </div>
      <div class="m3-hm">
        <span class="m3-hm-k">Share of market</span>
        <span class="m3-hm-v m3-dn">13.8%</span>
        <span class="m3-hm-d"><b class="m3-dn">−0.4pt</b> YTD<br><span class="prov-s"><i class="dot dot-p"></i>pending</span> accelerating, −0.2pt in 60 days</span>
      </div>
      <div class="m3-hm">
        <span class="m3-hm-k">Cash &amp; delivery risk</span>
        <span class="m3-hm-v">RM 12.4M</span>
        <span class="m3-hm-d"><span class="prov-s"><i class="dot dot-p"></i>pending</span> overdue &gt; 60 days<br>booked-to-billed 94%</span>
      </div>
      <div class="m3-hm">
        <span class="m3-hm-k">Decisions</span>
        <span class="m3-hm-v" id="m3Due">3 due</span>
        <span class="m3-hm-d"><span class="prov-s"><i class="dot dot-p"></i>pending</span> this week · <span id="m3Stalled">1</span> stalled<br><span id="m3Closed">0</span> closed since last review</span>
      </div>
    </div></div>

    <div class="w s12" data-mode-only="decide"><div class="m3-srule">
      <h3>Watch</h3><p>Material, not yet actionable — each carries the threshold that would promote it</p>
    </div></div>

    <div class="w s12" data-mode-only="decide"><div class="m3-watch">
      <div class="m3-wcard">
        <h4>Negotiation-stage ageing</h4>
        <span class="m3-wv">41 days</span>
        <p>37 deals · RM 51.2M at 50% — the oldest cohort in the pipeline.</p>
        <p class="m3-thr">Escalates if <b>the average passes 45 days</b></p>
      </div>
      <div class="m3-wcard">
        <h4>Contracted, not booked</h4>
        <span class="m3-wv">RM 28.4M</span>
        <p>At 95% and averaging 11 days. A billing question, not a selling one.</p>
        <p class="m3-thr">Escalates if <b>average ageing doubles</b></p>
      </div>
      <div class="m3-wcard">
        <h4>Share of market</h4>
        <span class="m3-wv m3-dn">13.8%</span>
        <p>Down 0.4pt YTD. At FY horizon this stops being a threshold and becomes a decision.</p>
        <p class="m3-thr">Escalates if <b>it falls a further 0.2pt at H1 close</b></p>
      </div>
      <div class="m3-wcard">
        <h4>Gross margin</h4>
        <span class="m3-wv m3-up">31.4%</span>
        <p>Up 0.8pt vs LY — the only headline metric moving the right way.</p>
        <p class="m3-thr">Escalates if <b>it drops below 30.5%</b></p>
      </div>
    </div></div>
```

- [ ] **Step 5: Run the test to verify it passes**

Reload, wait 2s, screenshot to force frames, re-run the Step 1 assertion.

Expected: `healthMetrics: 6`, `healthLabels` reading `["Forecast to plan","Gross margin","Net revenue retention","Share of market","Cash & delivery risk","Decisions"]`, `nrrDerived: true`, `watchCards: 4`, `watchHasNoButtons: true`, `everyWatchHasThreshold: true`.

- [ ] **Step 6: Verify the arithmetic**

```js
(() => {
  const t = document.querySelector('.m3-health').textContent.replace(/\s+/g,' ');
  const nrr = Math.round(((139.3 + 4.8 - 8.6) / 139.3) * 1000) / 10;
  return JSON.stringify({
    nrrComputed: nrr,
    nrrShownMatches: t.includes(nrr.toFixed(1) + '%'),
    forecastPair: t.includes('RM 222.9M') && t.includes('RM 240.0M') && t.includes('RM 17.1M short'),
    shortfallChecks: (240.0 - 222.9).toFixed(1) === '17.1',
    watchPipeline: (51.2 + 31.6 + 28.4).toFixed(1) === '111.2'
  }, null, 1);
})()
```

Expected: `nrrComputed: 97.3`, and every boolean `true`. Arithmetic is a first-class check on this board — a prior version shipped a monthly chart summing RM 125.7M beside a stat claiming RM 148.2M.

- [ ] **Step 7: Verify Mode 1 and Mode 2 are unaffected**

Re-run Task 1 Step 1. `counts.now.total` and `counts.next.total` must still equal the Task 1 baseline; `counts.decide.total` is now **4** with `leaked: 0` — posture from Task 1 plus the three widgets this task adds (health strip, the Watch section label, the Watch grid). The running totals are 1 → 4 → 6 → 6 → 11: Task 4 adds no widgets, because its drawers live inside the decision cards Task 3 creates.

- [ ] **Step 8: Commit**

```bash
cd /Users/kwlkokho/Documents/GitHub/Collabrium-DS/.worktrees/app-shell-intro-page
git add pages/leadership-dashboard-tracker.html
git commit -m "feat: Mode 3 health strip and Watch tier"
```

---

## Task 3: The seven decision objects

The mode's actual product. Seven cards, eight fields each, re-tiered by horizon with flexbox `order`.

**Files:**
- Modify: `pages/leadership-dashboard-tracker.html` regions R2, R5

- [ ] **Step 1: Write the failing test**

```js
(() => {
  const root = document.getElementById('root');
  root.setAttribute('data-mode','decide'); root.parentElement.setAttribute('data-mode','decide');
  root.parentElement.setAttribute('data-mode','decide');
  const decs = [...document.querySelectorAll('.dec')];
  const FIELDS = ['Because','At stake','Owner','By','Success','Escalation'];
  const promoted = h => {
    root.setAttribute('data-horizon',h); root.parentElement.setAttribute('data-horizon',h);
    return decs.filter(d => getComputedStyle(d).order === '1').map(d => d.dataset.id);
  };
  const out = { week: promoted('week'), quarter: promoted('quarter'), fy: promoted('fy') };
  root.setAttribute('data-horizon','week'); root.parentElement.setAttribute('data-horizon','week');
  return JSON.stringify({
    cards: decs.length,
    ids: decs.map(d => d.dataset.id),
    allFieldsPresent: decs.every(d => FIELDS.every(f => d.textContent.includes(f))),
    allHaveStatusChip: decs.every(d => !!d.querySelector('.m3-chip[data-status]')),
    allHaveTier: decs.every(d => !!d.querySelector('.m3-tier')),
    promotedByHorizon: out,
    splitExists: !!document.querySelector('.dec-split')
  }, null, 1);
})()
```

Expected before the change: `cards: 0`.

- [ ] **Step 2: Run it and confirm it fails**

Expected: `{"cards":0,"ids":[],...,"splitExists":false}`

- [ ] **Step 3: Add the decision-card CSS (R5)**

Append before the same `</style>`:

```css
/* ── Decision objects. The unit the whole mode is built from: a decision is
   an object with an owner, a deadline, a stake, an escalation and a status,
   not a verb in a table cell. ── */
.decs{display:flex; flex-direction:column; gap:14px;}

/* Horizon re-tiering with flexbox order — pure CSS, no DOM moves. order
   takes integers only, hence 1/2/3 rather than a fraction for the divider.
   Cards matching the horizon float to order 1 and get the Now treatment;
   everything else falls below the divider, compacted. */
.decs .dec{order:3;}
.decs .dec-split{order:2;}
[data-horizon="week"]    .decs .dec[data-h~="week"]{order:1;}
[data-horizon="quarter"] .decs .dec[data-h~="quarter"]{order:1;}
[data-horizon="fy"]      .decs .dec[data-h~="fy"]{order:1;}

.dec{background:var(--art-surface); border:1px solid var(--art-rule); border-radius:3px;
  box-shadow:var(--art-shadow); padding:18px 20px;}
.dec-h{margin:8px 0 0; font-size:19px; font-weight:900; letter-spacing:-.02em; line-height:1.25; color:var(--art-ink);}
.dec-f{display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:10px 26px; margin-top:14px;}
@media (max-width:760px){ .dec-f{grid-template-columns:1fr;} }
.dec-fi{display:flex; flex-direction:column; gap:2px;}
.dec-fk{font-size:9.5px; font-weight:800; letter-spacing:.12em; text-transform:uppercase; color:var(--art-faint);}
.dec-fv{font-size:12.5px; color:var(--art-muted); line-height:1.5;}
.dec-fv b{color:var(--art-ink);}
.dec-acts{display:flex; align-items:center; gap:9px; flex-wrap:wrap; margin-top:16px;
  padding-top:14px; border-top:1px solid var(--art-rule);}
.dec-acts button{border:1px solid var(--art-rule); background:var(--art-surface); border-radius:2px;
  padding:7px 13px; font:inherit; font-size:12px; font-weight:800; color:var(--art-ink); cursor:pointer;}
.dec-acts button:first-child{background:var(--art-ink); border-color:var(--art-ink); color:var(--art-canvas);}
.dec-acts button:hover{border-color:var(--art-accent); color:var(--art-accent);}
.dec-acts button:first-child:hover{background:var(--art-accent); border-color:var(--art-accent); color:var(--art-canvas);}
.dec-acts button:focus-visible{outline:2px solid var(--art-accent); outline-offset:2px;}

/* Now tier: 2px semantic border, keyed off the tier attribute so colour and
   weight can never disagree with the label. */
[data-horizon="week"]    .dec[data-h~="week"],
[data-horizon="quarter"] .dec[data-h~="quarter"],
[data-horizon="fy"]      .dec[data-h~="fy"]{border-width:2px;}
.dec[data-tier="urgent"]{--dec-c:var(--art-crit);}
.dec[data-tier="risk"]{--dec-c:var(--art-warn);}
.dec[data-tier="opp"]{--dec-c:var(--art-good);}
.dec[data-tier="strategic"]{--dec-c:var(--art-imagined);}
[data-horizon="week"]    .dec[data-h~="week"],
[data-horizon="quarter"] .dec[data-h~="quarter"],
[data-horizon="fy"]      .dec[data-h~="fy"]{border-color:var(--dec-c);}

/* "Also open" tier: same card, compacted. The field grid and the commitment
   buttons collapse; the stake/owner/by summary appears; and .dec-status is
   deliberately left alone so a demoted decision keeps its status chip and
   stays inspectable without being promoted first. That is why the chip and
   the evidence trigger live in .dec-status rather than in .dec-acts — the
   compact rule hides .dec-acts wholesale. */
.dec-sum{display:none; margin:8px 0 0; font-size:12px; color:var(--art-muted);}
.dec-status{display:flex; align-items:center; gap:9px; flex-wrap:wrap; margin-top:12px;}
[data-horizon="week"]    .decs .dec:not([data-h~="week"]) .dec-status,
[data-horizon="quarter"] .decs .dec:not([data-h~="quarter"]) .dec-status,
[data-horizon="fy"]      .decs .dec:not([data-h~="fy"]) .dec-status{margin-top:8px;}
[data-horizon="week"]    .decs .dec:not([data-h~="week"]),
[data-horizon="quarter"] .decs .dec:not([data-h~="quarter"]),
[data-horizon="fy"]      .decs .dec:not([data-h~="fy"]){padding:13px 16px;}
[data-horizon="week"]    .decs .dec:not([data-h~="week"]) .dec-h,
[data-horizon="quarter"] .decs .dec:not([data-h~="quarter"]) .dec-h,
[data-horizon="fy"]      .decs .dec:not([data-h~="fy"]) .dec-h{font-size:14px; font-weight:800;}
[data-horizon="week"]    .decs .dec:not([data-h~="week"]) .dec-f,
[data-horizon="week"]    .decs .dec:not([data-h~="week"]) .dec-acts,
[data-horizon="quarter"] .decs .dec:not([data-h~="quarter"]) .dec-f,
[data-horizon="quarter"] .decs .dec:not([data-h~="quarter"]) .dec-acts,
[data-horizon="fy"]      .decs .dec:not([data-h~="fy"]) .dec-f,
[data-horizon="fy"]      .decs .dec:not([data-h~="fy"]) .dec-acts{display:none;}
[data-horizon="week"]    .decs .dec:not([data-h~="week"]) .dec-sum,
[data-horizon="quarter"] .decs .dec:not([data-h~="quarter"]) .dec-sum,
[data-horizon="fy"]      .decs .dec:not([data-h~="fy"]) .dec-sum{display:block;}

.dec-split{display:flex; align-items:baseline; gap:12px; padding-top:6px;}
.dec-split h3{margin:0; font-size:11px; font-weight:900; letter-spacing:.14em; text-transform:uppercase; color:var(--art-faint);}
.dec-split p{margin:0; font-size:11.5px; color:var(--art-faint);}

/* Status chip. NOT st-* — the file already owns .st, .st-lead, .st-v and
   .st-warn. State lives in data-status so CSS and JS read one source. */
.m3-chip{border:1px solid var(--art-rule); background:var(--art-sunk); border-radius:999px;
  padding:5px 12px; font:inherit; font-size:11px; font-weight:800; cursor:pointer;
  color:var(--art-muted); display:inline-flex; align-items:center; gap:6px;}
.m3-chip::before{content:''; width:7px; height:7px; border-radius:50%; background:currentColor; opacity:.6;}
.m3-chip:hover{border-color:var(--art-faint); color:var(--art-ink);}
.m3-chip:focus-visible{outline:2px solid var(--art-accent); outline-offset:2px;}
.m3-chip[data-status="Scheduled"]{color:var(--art-warn); border-color:var(--art-warn);}
.m3-chip[data-status="Awaiting client"]{color:var(--art-derived); border-color:var(--art-derived);}
.m3-chip[data-status="Closed"]{color:var(--art-good); border-color:var(--art-good);}
.m3-chip[data-status="Moot"]{color:var(--art-faint); text-decoration:line-through;}
.m3-chip-h{margin-left:auto; font-size:10px; font-weight:800; letter-spacing:.1em;
  text-transform:uppercase; color:var(--art-faint);}
```

- [ ] **Step 4: Add the decision markup (R2)**

Insert immediately after the Watch widget's closing `</div></div>`. Note `data-h` carries the horizon, `data-tier` the semantic colour, `data-id` the assertion handle, and every card ends with an evidence trigger that Task 4 activates.

```html
    <div class="w s12" data-mode-only="decide"><div class="m3-srule">
      <h3>Now</h3><p>Decisions only leadership can make — nobody below can unlock these</p>
    </div></div>

    <div class="w s12" data-mode-only="decide"><div class="decs" id="m3Decs">

      <div class="dec" data-id="D1" data-h="week" data-tier="urgent">
        <span class="m3-tier m3-t-urgent">Urgent</span>
        <h4 class="dec-h">Close the RM 17.1M gap — name the eight deals</h4>
        <p class="dec-sum">RM 17.1M · Sales lead · by 15 Aug</p>
        <div class="dec-f">
          <div class="dec-fi"><span class="dec-fk">Because</span><span class="dec-fv">Weighted forecast lands RM 222.9M against a RM 240.0M plan. RM 111.2M is open across 73 deals; <b>RM 51.2M of it sits in Negotiation at 50%</b> and averages 41 days — the oldest cohort.</span></div>
          <div class="dec-fi"><span class="dec-fk">At stake</span><span class="dec-fv"><b>RM 17.1M revenue</b> · RM 5.4M gross profit at the blended 31.4% margin</span></div>
          <div class="dec-fi"><span class="dec-fk">Owner</span><span class="dec-fv"><b>Sales lead</b> · accountable: Bryan Wong</span></div>
          <div class="dec-fi"><span class="dec-fk">By</span><span class="dec-fv"><span class="prov-s"><i class="dot dot-p"></i>pending</span> <b>15 Aug</b> — before the Q3 forecast lock</span></div>
          <div class="dec-fi"><span class="dec-fk">Success looks like</span><span class="dec-fv">Eight named deals with an executive sponsor each, together covering RM 17.1M weighted</span></div>
          <div class="dec-fi"><span class="dec-fk">Escalation</span><span class="dec-fv"><span class="prov-s"><i class="dot dot-p"></i>pending</span> Rate approval above 12% discount</span></div>
        </div>
        <div class="dec-acts">
          <button type="button">Approve</button><button type="button">Ask for options</button><button type="button">Defer with reason</button>
        </div>
        <div class="dec-status">
          <button type="button" class="m3-chip" data-status="Not started">Not started</button>
          <button type="button" class="dec-ev" aria-expanded="false" data-chart="mGap">&#9656; Evidence</button>
        </div>
        <div class="dec-drawer" hidden></div>
      </div>

      <div class="dec" data-id="D2" data-h="week" data-tier="urgent">
        <span class="m3-tier m3-t-urgent">Urgent</span>
        <h4 class="dec-h">Name an executive sponsor for each top-five account</h4>
        <p class="dec-sum">RM 56.3M · Leadership · by 12 Aug</p>
        <div class="dec-f">
          <div class="dec-fi"><span class="dec-fk">Because</span><span class="dec-fv">The top five advertisers carry <b>38% of revenue — RM 56.3M</b>. At 9.2% no single account can sink the year, but losing two breaches plan.</span></div>
          <div class="dec-fi"><span class="dec-fk">At stake</span><span class="dec-fv"><b>RM 56.3M revenue</b> · RM 17.7M gross profit at the blended 31.4% margin</span></div>
          <div class="dec-fi"><span class="dec-fk">Owner</span><span class="dec-fv"><b>Leadership</b> · accountable: Bryan Wong</span></div>
          <div class="dec-fi"><span class="dec-fk">By</span><span class="dec-fv"><span class="prov-s"><i class="dot dot-p"></i>pending</span> <b>12 Aug</b></span></div>
          <div class="dec-fi"><span class="dec-fk">Success looks like</span><span class="dec-fv">Five accounts, five named sponsors, a first contact logged against each</span></div>
          <div class="dec-fi"><span class="dec-fk">Escalation</span><span class="dec-fv">Leadership allocation — <b>nobody below this level can assign an executive</b></span></div>
        </div>
        <div class="dec-acts">
          <button type="button">Approve</button><button type="button">Ask for options</button><button type="button">Defer with reason</button>
        </div>
        <div class="dec-status">
          <button type="button" class="m3-chip" data-status="Not started">Not started</button>
          <button type="button" class="dec-ev" aria-expanded="false" data-chart="mConc">&#9656; Evidence</button>
        </div>
        <div class="dec-drawer" hidden></div>
      </div>

      <div class="dec" data-id="D3" data-h="week" data-tier="risk">
        <span class="m3-tier m3-t-risk">Risk</span>
        <h4 class="dec-h">Fund Digital demand, not inventory</h4>
        <p class="dec-sum">RM 5.1M · Daniel Tan · by 15 Aug</p>
        <div class="dec-f">
          <div class="dec-fi"><span class="dec-fk">Because</span><span class="dec-fv">Digital sold <b>62% of its inventory</b> and reached 75% of target. The shelf was full, so the constraint is demand, not supply.</span></div>
          <div class="dec-fi"><span class="dec-fk">At stake</span><span class="dec-fv"><b>RM 5.1M revenue</b> · RM 1.6M gross profit at the blended 31.4% margin</span></div>
          <div class="dec-fi"><span class="dec-fk">Owner</span><span class="dec-fv"><b>Daniel Tan</b> · accountable: Sales lead</span></div>
          <div class="dec-fi"><span class="dec-fk">By</span><span class="dec-fv"><span class="prov-s"><i class="dot dot-p"></i>pending</span> <b>15 Aug</b> — Q3 plan lock</span></div>
          <div class="dec-fi"><span class="dec-fk">Success looks like</span><span class="dec-fv">A demand-generation budget approved and booked against Digital, not against more inventory</span></div>
          <div class="dec-fi"><span class="dec-fk">Escalation</span><span class="dec-fv"><span class="prov-s"><i class="dot dot-p"></i>pending</span> Budget reallocation between inventory and demand</span></div>
        </div>
        <div class="dec-acts">
          <button type="button">Approve</button><button type="button">Ask for options</button><button type="button">Defer with reason</button>
        </div>
        <div class="dec-status">
          <button type="button" class="m3-chip" data-status="Not started">Not started</button>
          <button type="button" class="dec-ev" aria-expanded="false" data-chart="mFillDigital">&#9656; Evidence</button>
        </div>
        <div class="dec-drawer" hidden></div>
      </div>

      <div class="dec-split"><h3>Also open</h3><p>Live decisions outside the selected horizon</p></div>

      <div class="dec" data-id="D4" data-h="quarter" data-tier="opp">
        <span class="m3-tier m3-t-opp">Opportunity</span>
        <h4 class="dec-h">Buy more addressable inventory</h4>
        <p class="dec-sum">RM 2.6M · Aisyah Rahman · by Q3 inventory commit</p>
        <div class="dec-f">
          <div class="dec-fi"><span class="dec-fk">Because</span><span class="dec-fv">Addressable is <b>97% sold out</b> and the only line beating plan at 109% — its ceiling is supply, not selling.</span></div>
          <div class="dec-fi"><span class="dec-fk">At stake</span><span class="dec-fv"><b>RM 2.6M revenue</b> · RM 0.8M gross profit at the blended 31.4% margin</span></div>
          <div class="dec-fi"><span class="dec-fk">Owner</span><span class="dec-fv"><b>Aisyah Rahman</b> · accountable: Leadership</span></div>
          <div class="dec-fi"><span class="dec-fk">By</span><span class="dec-fv"><span class="prov-s"><i class="dot dot-p"></i>pending</span> <b>Q3 inventory commit</b></span></div>
          <div class="dec-fi"><span class="dec-fk">Success looks like</span><span class="dec-fv">Additional addressable volume contracted for Q4</span></div>
          <div class="dec-fi"><span class="dec-fk">Escalation</span><span class="dec-fv"><span class="prov-s"><i class="dot dot-p"></i>pending</span> Capital commitment on inventory</span></div>
        </div>
        <div class="dec-acts">
          <button type="button">Approve</button><button type="button">Ask for options</button><button type="button">Defer with reason</button>
        </div>
        <div class="dec-status">
          <button type="button" class="m3-chip" data-status="Not started">Not started</button>
          <button type="button" class="dec-ev" aria-expanded="false" data-chart="mFillAddressable">&#9656; Evidence</button>
        </div>
        <div class="dec-drawer" hidden></div>
      </div>

      <div class="dec" data-id="D5" data-h="quarter" data-tier="risk">
        <span class="m3-tier m3-t-risk">Risk</span>
        <h4 class="dec-h">Move Daniel to prospecting, not closing</h4>
        <p class="dec-sum">RM 2.4M · Sales lead · by Q4 territory plan</p>
        <div class="dec-f">
          <div class="dec-fi"><span class="dec-fk">Because</span><span class="dec-fv"><b>85% attainment with only 0.8× pipeline cover</b> is a top-of-funnel gap. Coaching on closing technique would have been the wrong quarter's work.</span></div>
          <div class="dec-fi"><span class="dec-fk">At stake</span><span class="dec-fv"><b>RM 2.4M revenue</b> · RM 0.8M gross profit at the blended 31.4% margin</span></div>
          <div class="dec-fi"><span class="dec-fk">Owner</span><span class="dec-fv"><b>Sales lead</b> · accountable: Bryan Wong</span></div>
          <div class="dec-fi"><span class="dec-fk">By</span><span class="dec-fv"><span class="prov-s"><i class="dot dot-p"></i>pending</span> <b>Start of the Q4 territory plan</b></span></div>
          <div class="dec-fi"><span class="dec-fk">Success looks like</span><span class="dec-fv">His cover ratio above 1.5× within one quarter</span></div>
          <div class="dec-fi"><span class="dec-fk">Escalation</span><span class="dec-fv">None — a management decision. It appears here because <b>the board's own evidence overturned an earlier one</b>; see the log.</span></div>
        </div>
        <div class="dec-acts">
          <button type="button">Approve</button><button type="button">Ask for options</button><button type="button">Defer with reason</button>
        </div>
        <div class="dec-status">
          <button type="button" class="m3-chip" data-status="Not started">Not started</button>
          <button type="button" class="dec-ev" aria-expanded="false" data-chart="mQuad">&#9656; Evidence</button>
        </div>
        <div class="dec-drawer" hidden></div>
      </div>

      <div class="dec" data-id="D6" data-h="quarter" data-tier="risk" data-stalled="true">
        <span class="m3-tier m3-t-risk">Risk</span>
        <h4 class="dec-h">Diarise Petronas for the Q3 budget reset</h4>
        <p class="dec-sum">RM 2.1M · Aisyah Rahman · decided 5 Aug, still undiarised</p>
        <div class="dec-f">
          <div class="dec-fi"><span class="dec-fk">Because</span><span class="dec-fv"><b>RM 2.1M of the RM 4.4M lapsed was a budget-cycle gap</b>, not a loss. It needs a calendar, not a discount.</span></div>
          <div class="dec-fi"><span class="dec-fk">At stake</span><span class="dec-fv"><b>RM 2.1M revenue</b> · RM 0.7M gross profit at the blended 31.4% margin</span></div>
          <div class="dec-fi"><span class="dec-fk">Owner</span><span class="dec-fv"><b>Aisyah Rahman</b> · accountable: Sales lead</span></div>
          <div class="dec-fi"><span class="dec-fk">By</span><span class="dec-fv"><span class="prov-s"><i class="dot dot-p"></i>pending</span> <b>Inside the Q3 reset window</b></span></div>
          <div class="dec-fi"><span class="dec-fk">Success looks like</span><span class="dec-fv">A meeting in the diary inside the reset window</span></div>
          <div class="dec-fi"><span class="dec-fk">Escalation</span><span class="dec-fv">None</span></div>
        </div>
        <div class="dec-acts">
          <button type="button">Approve</button><button type="button">Ask for options</button><button type="button">Defer with reason</button>
        </div>
        <div class="dec-status">
          <button type="button" class="m3-chip" data-status="Scheduled">Scheduled</button>
          <span class="m3-chip-h">stalled 7 days</span>
          <button type="button" class="dec-ev" aria-expanded="false" data-chart="mChurn">&#9656; Evidence</button>
        </div>
        <div class="dec-drawer" hidden></div>
      </div>

      <div class="dec" data-id="D7" data-h="fy" data-tier="strategic">
        <span class="m3-tier m3-t-strategic">Strategic</span>
        <h4 class="dec-h">Take the share question to the board</h4>
        <p class="dec-sum">RM 4.3M · Leadership · by next board meeting</p>
        <div class="dec-f">
          <div class="dec-fi"><span class="dec-fk">Because</span><span class="dec-fv">Growing 6.4% in a market growing 8.1% moved share from 14.2% to 13.8% — <b>roughly RM 4.3M of revenue that existed and went elsewhere</b>. Every other panel on the board calls this a good year.</span></div>
          <div class="dec-fi"><span class="dec-fk">At stake</span><span class="dec-fv"><b>RM 4.3M revenue</b> · RM 1.4M gross profit at the blended 31.4% margin</span></div>
          <div class="dec-fi"><span class="dec-fk">Owner</span><span class="dec-fv"><b>Leadership</b> · accountable: Bryan Wong</span></div>
          <div class="dec-fi"><span class="dec-fk">By</span><span class="dec-fv"><span class="prov-s"><i class="dot dot-p"></i>pending</span> <b>Next board meeting</b></span></div>
          <div class="dec-fi"><span class="dec-fk">Success looks like</span><span class="dec-fv">A board-agreed position on whether to defend share or bank margin</span></div>
          <div class="dec-fi"><span class="dec-fk">Escalation</span><span class="dec-fv"><b>Only the board can set that posture</b></span></div>
        </div>
        <div class="dec-acts">
          <button type="button">Approve</button><button type="button">Ask for options</button><button type="button">Defer with reason</button>
        </div>
        <div class="dec-status">
          <button type="button" class="m3-chip" data-status="Not started">Not started</button>
          <button type="button" class="dec-ev" aria-expanded="false" data-chart="mShare">&#9656; Evidence</button>
        </div>
        <div class="dec-drawer" hidden></div>
      </div>

    </div></div>
```

- [ ] **Step 5: Run the test to verify it passes**

Expected: `cards: 7`, `ids: ["D1".."D7"]`, `allFieldsPresent: true`, `allHaveStatusChip: true`, `allHaveTier: true`, `splitExists: true`, and:

```
promotedByHorizon: { week: ["D1","D2","D3"], quarter: ["D4","D5","D6"], fy: ["D7"] }
```

That last object is the spec's §5 horizon column. If it disagrees, a `data-h` attribute is wrong.

- [ ] **Step 6: Verify the compact treatment actually applies**

```js
(() => {
  const root = document.getElementById('root');
  root.setAttribute('data-mode','decide'); root.parentElement.setAttribute('data-mode','decide'); root.setAttribute('data-horizon','week'); root.parentElement.setAttribute('data-horizon','week');
  const now = document.querySelector('.dec[data-id="D1"]');
  const off = document.querySelector('.dec[data-id="D7"]');
  const cs = el => getComputedStyle(el);
  return JSON.stringify({
    nowBorderWidth: cs(now).borderTopWidth,
    offBorderWidth: cs(off).borderTopWidth,
    nowFieldsVisible: cs(now.querySelector('.dec-f')).display !== 'none',
    offFieldsHidden: cs(off.querySelector('.dec-f')).display === 'none',
    offSummaryVisible: cs(off.querySelector('.dec-sum')).display !== 'none',
    offActionsHidden: cs(off.querySelector('.dec-acts')).display === 'none',
    offChipStillReachable: cs(off.querySelector('.m3-chip')).display !== 'none'
  }, null, 1);
})()
```

Expected: `nowBorderWidth: "2px"`, `offBorderWidth: "1px"`, `nowFieldsVisible: true`, `offFieldsHidden: true`, `offSummaryVisible: true`, `offActionsHidden: true`, `offChipStillReachable: true`.

That last one is why the status chip and the evidence trigger sit in `.dec-status` and not in `.dec-acts`: the compact rule hides `.dec-acts` wholesale, which would have taken the chip with it and broken the spec's §7 requirement that a demoted card keeps its status. If it reads `false`, the chip ended up inside `.dec-acts` — move it.

- [ ] **Step 7: Verify the horizon filter with real input**

`read_page`, then `computer` `left_click` the "This quarter" button — real pointer, not a dispatched event. Then confirm `data-horizon === "quarter"` on both `#root` and its parent, `aria-pressed` moved, and the promoted set is `["D4","D5","D6"]`. Screenshot to force frames first.

- [ ] **Step 8: Commit**

```bash
cd /Users/kwlkokho/Documents/GitHub/Collabrium-DS/.worktrees/app-shell-intro-page
git add pages/leadership-dashboard-tracker.html
git commit -m "feat: seven decision objects with horizon re-tiering"
```

---

## Task 4: Evidence drawers and six mini-chart renderers

**Files:**
- Modify: `pages/leadership-dashboard-tracker.html` regions R5, R6, plus a new interaction IIFE at the end of the R6 script block

- [ ] **Step 1: Write the failing test**

```js
(() => {
  const root = document.getElementById('root');
  root.setAttribute('data-mode','decide'); root.parentElement.setAttribute('data-mode','decide');
  const trigs = [...document.querySelectorAll('.dec-ev')];
  return JSON.stringify({
    triggers: trigs.length,
    chartKeys: trigs.map(t => t.dataset.chart),
    rendererExists: typeof window.M3CHARTS,
    renderers: window.M3CHARTS ? Object.keys(window.M3CHARTS) : [],
    drawersFilled: [...document.querySelectorAll('.dec-drawer')].filter(d => d.querySelector('svg')).length
  }, null, 1);
})()
```

Expected before the change: `rendererExists: "undefined"`, `drawersFilled: 0`.

- [ ] **Step 2: Run it and confirm it fails**

Expected `triggers: 7`, `chartKeys: ["mGap","mConc","mFillDigital","mFillAddressable","mQuad","mChurn","mShare"]`, `rendererExists: "undefined"`, `drawersFilled: 0`.

- [ ] **Step 3: Add drawer CSS (R5)**

```css
/* ── Evidence drawer. The narrative captions were never the problem — they
   were stated at equal volume, all at once. Here the claim and its chart
   are one click away from the decision they produced, which is placement,
   not less conclusiveness. ── */
.dec-ev{margin-left:auto;}
.dec-drawer{margin-top:14px; padding:14px 16px; background:var(--art-sunk);
  border:1px solid var(--art-rule); border-radius:3px;}
.dec-drawer[hidden]{display:none;}
.dec-drawer svg{display:block; width:100%; max-width:420px; height:auto;}
.dec-dclaim{margin:0 0 10px; font-size:12.5px; color:var(--art-muted); line-height:1.5;}
.dec-dclaim b{color:var(--art-ink);}
.dec-dlink{display:inline-block; margin-top:10px; font-size:12px; font-weight:800;
  color:var(--art-ink); text-decoration:underline; text-underline-offset:3px; cursor:pointer;
  background:none; border:0; padding:0; font-family:inherit;}
.dec-dlink:hover{color:var(--art-accent);}
.dec-dlink:focus-visible{outline:2px solid var(--art-accent); outline-offset:2px;}
```

- [ ] **Step 4: Add the six renderers inside the chart-module IIFE (R6)**

Insert immediately before the chart module's final `})();` so the renderers can use `C`, `txt`, `ln`, `rect` and `path` without duplicating them. Every renderer returns an SVG-innards string and does **zero** layout measurement, which is what makes them render correctly in a hidden tab with no animation frames.

```js
  /* ── Mode 3 mini-charts ──────────────────────────────────
     Drawer-sized evidence, not copies of the nine big panels: duplicating
     those would mean two sources of truth and about 175KB. Fixed viewBox,
     no measurement. Exposed on window because the Mode 3 interaction module
     is a separate IIFE and these helpers are closed over in here. */
  var VB='0 0 380 130';
  function wrap(s){ return '<svg viewBox="'+VB+'" role="img">'+s+'</svg>'; }

  function mGap(){
    var x0=100,x1=330,lo=200,hi=246,H=130;
    function X(v){ return x0+(v-lo)/(hi-lo)*(x1-x0); }
    var rows=[['Commit',210.2,C.crit],['Weighted',222.9,C.pur],['Best case',239.4,C.good]];
    var s='';
    rows.forEach(function(r,i){
      var y=20+i*30;
      s+=txt(x0-9,y+11,r[0],{a:'end',s:10,f:C.mut});
      s+=rect(x0,y,X(r[1])-x0,15,{f:r[2],o:.85,r:2});
      s+=txt(X(r[1])+6,y+11,r[1].toFixed(1),{s:10,w:800,f:C.ink});
    });
    s+=ln(X(240),12,X(240),H-22,{c:C.ink,w:1.6,d:'3 3'});
    s+=txt(X(240),H-8,'plan 240.0',{a:'middle',s:9,w:800,f:C.ink});
    return wrap(s);
  }

  function mConc(){
    // COPY THIS ARRAY FROM Mode 2's cConc IIFE, do not retype it. A mini-chart
    // that disagrees with the panel it claims to summarise is worse than no
    // mini-chart. The values below are the shape to expect — largest 9.2%,
    // top five 38.0% — but the authoritative series is the one already in the
    // file. Verify cum[0] === 9.2 and cum[4] === 38.0 after copying.
    var cum=[9.2,17.1,24.3,31.4,38.0,43.8,49.1,54.0,58.6,62.9];
    var x0=42,x1=350,y0=104,y1=18;
    function X(i){ return x0+i/(cum.length-1)*(x1-x0); }
    function Y(v){ return y0-(v/70)*(y0-y1); }
    var s='';
    [0,20,40,60].forEach(function(v){
      s+=ln(x0,Y(v),x1,Y(v),{c:C.rule});
      s+=txt(x0-6,Y(v)+3,v+'%',{a:'end',s:8,f:C.fnt});
    });
    var band='M'+X(0)+' '+y0;
    for(var i=0;i<5;i++) band+=' L'+X(i).toFixed(1)+' '+Y(cum[i]).toFixed(1);
    band+=' L'+X(4).toFixed(1)+' '+y0+' Z';
    s+=path(band,{f:C.crit,o:.13});
    var d='M'+X(0).toFixed(1)+' '+Y(cum[0]).toFixed(1);
    for(var j=1;j<cum.length;j++) d+=' L'+X(j).toFixed(1)+' '+Y(cum[j]).toFixed(1);
    s+=path(d,{s:C.ink,w:2});
    s+='<circle cx="'+X(4).toFixed(1)+'" cy="'+Y(38).toFixed(1)+'" r="4" fill="'+C.crit+'"/>';
    s+=txt(X(4)+8,Y(38)-2,'top 5 = 38% · RM 56.3M',{s:10,w:800,f:C.ink});
    s+=txt(x0,y0+16,'advertiser rank 1 → 10',{s:9,f:C.fnt});
    return wrap(s);
  }

  // Percentages only, deliberately: the spec states 62%/75% for Digital and
  // 97%/109% for Addressable but no per-line RM split, and inventing one here
  // would risk contradicting Mode 2's own fill panel. The only RM figure this
  // board owns for fill is the all-lines total, RM 148.2M of RM 174.0M.
  function mFill(name,soldPct,attainPct){
    var x0=14,x1=366,s='';
    s+=txt(x0,16,name+' · sold against sellable',{s:10,w:800,f:C.ink});
    s+=rect(x0,24,x1-x0,20,{f:C.rule,o:.55,r:2});
    s+=rect(x0,24,(x1-x0)*soldPct/100,20,{f:C.der,r:2});
    s+=txt(x0+6,38,soldPct+'% sold',{s:10,w:800,f:'#fff'});
    s+=txt(x1,38,'unsold shelf '+(100-soldPct)+'%',{a:'end',s:9,f:C.mut});
    s+=txt(x0,64,'target attainment',{s:9,w:800,f:C.fnt});
    var capped=attainPct>100;
    s+=rect(x0,70,(x1-x0)*Math.min(attainPct,130)/130,14,{f:capped?C.good:C.warn,r:2});
    s+=ln(x0+(x1-x0)*100/130,66,x0+(x1-x0)*100/130,88,{c:C.ink,w:1.4,d:'3 3'});
    s+=txt(x0+(x1-x0)*100/130+5,98,'100%',{s:8,f:C.fnt});
    s+=txt(x1,81,attainPct+'%',{a:'end',s:11,w:900,f:capped?C.good:C.warn});
    s+=txt(x0,116,capped?'Sold out — this ceiling is supply, not selling.'
                        :'Shelf was full — the constraint is demand, not supply.',
           {s:10,w:700,f:C.ink});
    return wrap(s);
  }

  function mQuad(){
    var x0=44,x1=352,y0=100,y1=18;
    function X(a){ return x0+(a-60)/70*(x1-x0); }        // attainment 60..130 %
    function Y(c){ return y0-(c/3)*(y0-y1); }            // cover 0..3 x
    var s='';
    s+=rect(x0,y1,X(100)-x0,Y(1)-y1,{f:C.warn,o:.08,r:0});
    s+=rect(X(100),y1,x1-X(100),Y(1)-y1,{f:C.good,o:.09,r:0});
    s+=rect(x0,Y(1),X(100)-x0,y0-Y(1),{f:C.crit,o:.09,r:0});
    s+=ln(X(100),y1,X(100),y0,{c:C.rule,w:1.2,d:'3 3'});
    s+=ln(x0,Y(1),x1,Y(1),{c:C.rule,w:1.2,d:'3 3'});
    s+=txt(x0-6,Y(1)+3,'1.0×',{a:'end',s:8,f:C.fnt});
    s+=txt(X(100),y0+14,'100%',{a:'middle',s:8,f:C.fnt});
    var pts=[['Daniel Tan',85,0.8,C.crit],['Aisyah Rahman',118,2.4,C.good]];
    pts.forEach(function(p){
      s+='<circle cx="'+X(p[1]).toFixed(1)+'" cy="'+Y(p[2]).toFixed(1)+'" r="5" fill="'+p[3]+'"/>';
      s+=txt(X(p[1])+9,Y(p[2])+4,p[0]+' · '+p[1]+'% · '+p[2]+'×',{s:10,w:800,f:C.ink});
    });
    s+=txt(x0,y0+28,'attainment →   ↑ pipeline cover · all 14 reps plotted in Mode 2',{s:9,f:C.fnt});
    return wrap(s);
  }

  function mChurn(){
    var rows=[['Petronas Retail',2.1,'Budget cycle',true],
              ['AirAsia',1.4,'Competitive',false],
              ['Tealive',0.5,'Price',false],
              ['Watsons MY',0.4,'Service',false]];
    var x0=110,x1=300,s='';
    rows.forEach(function(r,i){
      var y=16+i*24;
      s+=txt(x0-8,y+10,r[0],{a:'end',s:9.5,f:C.mut});
      s+=rect(x0,y,(x1-x0)*r[1]/2.4,13,{f:r[3]?C.warn:C.crit,o:r[3]?.9:.55,r:2});
      s+=txt(x1+6,y+10,r[1].toFixed(1),{s:9.5,w:800,f:C.ink});
      if(r[3]) s+=txt(x1+34,y+10,'recoverable',{s:8.5,w:800,f:C.warn});
    });
    s+=txt(x0-8,120,'RM 4.4M total',{a:'end',s:10,w:900,f:C.ink});
    s+=txt(x0,120,'— RM 2.1M was timing, not a loss',{s:10,f:C.mut});
    return wrap(s);
  }

  function mShare(){
    // COPY BOTH ARRAYS FROM Mode 2's cShare IIFE — same reason as mConc.
    // Endpoints must be us[7] === 106.4 and mk[7] === 108.1 (our +6.4% against
    // the market's +8.1%), which is what makes the 0.4pt share loss legible.
    var us=[100,101.4,102.6,103.5,104.4,105.2,105.9,106.4];
    var mk=[100,101.8,103.2,104.3,105.4,106.4,107.3,108.1];
    var x0=34,x1=300,y0=96,y1=18;
    function X(i){ return x0+i/(us.length-1)*(x1-x0); }
    function Y(v){ return y0-(v-99)/10*(y0-y1); }
    function d(a){ var p='M'+X(0).toFixed(1)+' '+Y(a[0]).toFixed(1);
      for(var i=1;i<a.length;i++) p+=' L'+X(i).toFixed(1)+' '+Y(a[i]).toFixed(1); return p; }
    function rev(a){ var p=''; for(var k=a.length-1;k>=0;k--) p+=' L'+X(k).toFixed(1)+' '+Y(a[k]).toFixed(1); return p; }
    var s='';
    s+=path(d(mk)+rev(us)+' Z',{f:C.crit,o:.11});
    s+=path(d(mk),{s:C.mut,w:2,d:'4 3'});
    s+=path(d(us),{s:C.der,w:2.4});
    s+=txt(X(7)+6,Y(mk[7])+3,'market +8.1%',{s:9.5,w:800,f:C.mut});
    s+=txt(X(7)+6,Y(us[7])+3,'us +6.4%',{s:9.5,w:800,f:C.der});
    s+=txt(x0,120,'share 14.2% → 13.8% · about RM 4.3M that went elsewhere',{s:10,w:700,f:C.ink});
    return wrap(s);
  }

  window.M3CHARTS={
    mGap:mGap, mConc:mConc, mQuad:mQuad, mChurn:mChurn, mShare:mShare,
    mFillDigital:function(){ return mFill('Digital',62,75); },
    mFillAddressable:function(){ return mFill('Addressable',97,109); }
  };
```

- [ ] **Step 5: Add the drawer interaction module**

Append a new IIFE after the chart module's closing `})();`, before `</script>`:

```js
// ── Mode 3 interactions. Separate IIFE from the chart module, which is why
// the mini-charts are handed over on window.M3CHARTS rather than closed over.
(function(){
  var CLAIMS={
    mGap:'<b>The plan line is only touched by best case.</b> Weighted lands RM 17.1M short and commit RM 29.8M short.',
    mConc:'<b>No single-account cliff, but a top-five exposure.</b> The largest advertiser is 9.2%; the top five carry 38%.',
    mFillDigital:'<b>The pale remainder is shelf we never filled.</b> Digital sold 62% and reached 75% of target.',
    mFillAddressable:'<b>The only line beating plan is supply-capped.</b> Addressable is 97% sold out at 109% of target.',
    mQuad:'<b>Behind with a thin pipeline.</b> 85% attainment and 0.8× cover is a prospecting problem, not slow closes.',
    mChurn:'<b>Half of it was never lost — it was timing.</b> RM 2.1M is a budget-cycle gap that needs a calendar.',
    mShare:'<b>Growth that still loses ground.</b> 6.4% in a market growing 8.1% cost 0.4pt of share.'
  };
  var PANEL={mGap:'cFan',mConc:'cConc',mFillDigital:'cFill',mFillAddressable:'cFill',
             mQuad:'cQuad',mChurn:'cChurn',mShare:'cShare'};

  document.addEventListener('click',function(e){
    var t=e.target.closest('.dec-ev'); if(!t)return;
    var dec=t.closest('.dec'), drawer=dec.querySelector('.dec-drawer');
    var open=t.getAttribute('aria-expanded')==='true';
    if(!open && !drawer.querySelector('svg')){
      var key=t.dataset.chart, fn=window.M3CHARTS&&window.M3CHARTS[key];
      drawer.innerHTML='<p class="dec-dclaim">'+(CLAIMS[key]||'')+'</p>'+
        (fn?fn():'')+
        '<button type="button" class="dec-dlink" data-panel="'+PANEL[key]+'">Full analysis in Mode 2 →</button>';
    }
    t.setAttribute('aria-expanded',String(!open));
    t.innerHTML=(open?'▸':'▾')+' Evidence';
    drawer.hidden=open;
  });

  // Deep link: switch to Mode 2 and bring the full panel into view. The nine
  // panels already carry svg ids, so no markup change to Mode 2 is needed.
  document.addEventListener('click',function(e){
    var l=e.target.closest('.dec-dlink'); if(!l)return;
    var btn=document.getElementById('mNext'); if(btn) btn.click();
    var svg=document.getElementById(l.dataset.panel);
    if(svg){ var w=svg.closest('.w'); if(w) w.scrollIntoView({block:'center'}); }
  });
})();
```

- [ ] **Step 6: Run the test to verify it passes**

Reload, wait 2s, screenshot, then run the Step 1 assertion plus this drawer audit:

```js
(() => {
  const root = document.getElementById('root');
  root.setAttribute('data-mode','decide'); root.parentElement.setAttribute('data-mode','decide');
  document.querySelectorAll('.dec-ev').forEach(t => t.click());
  const drawers = [...document.querySelectorAll('.dec-drawer')];
  const overflow = [];
  drawers.forEach(d => {
    const svg = d.querySelector('svg'); if (!svg) return;
    const [, , vw, vh] = svg.getAttribute('viewBox').split(' ').map(Number);
    svg.querySelectorAll('text,rect,circle,path,line').forEach(n => {
      if (n.hasAttribute('transform')) return;   // getBBox is pre-transform — false positives
      const b = n.getBBox();
      if (b.x < -1 || b.y < -1 || b.x + b.width > vw + 1 || b.y + b.height > vh + 1) {
        overflow.push(d.closest('.dec').dataset.id + ':' + n.tagName + ':' + (n.textContent || '').slice(0, 18));
      }
    });
  });
  return JSON.stringify({
    filled: drawers.filter(d => d.querySelector('svg')).length,
    allHaveClaim: drawers.every(d => !!d.querySelector('.dec-dclaim')),
    allHaveLink: drawers.every(d => !!d.querySelector('.dec-dlink')),
    overflowCount: overflow.length, overflow
  }, null, 1);
})()
```

Expected: `filled: 7`, `allHaveClaim: true`, `allHaveLink: true`, `overflowCount: 0`. Any overflow entry names the offending element — adjust that renderer's coordinates, do not widen the viewBox, because the drawer's `max-width:420px` is what keeps the mini-charts reading as insets rather than as panels.

Note this step uses `.click()` for the bulk audit deliberately — it is measuring geometry, not proving the affordance works. Step 7 proves the affordance.

- [ ] **Step 7: Verify one drawer and one deep link with real input**

`read_page`, `computer` `left_click` D1's Evidence trigger. Confirm `aria-expanded === "true"`, the drawer is not `hidden`, the chevron flipped to `▾`, and a screenshot shows the gap bars. Then real-click "Full analysis in Mode 2 →" and confirm `data-mode` became `next` and `#cFan`'s panel is in the viewport.

- [ ] **Step 8: Commit**

```bash
cd /Users/kwlkokho/Documents/GitHub/Collabrium-DS/.worktrees/app-shell-intro-page
git add pages/leadership-dashboard-tracker.html
git commit -m "feat: evidence drawers with six mini-chart renderers and Mode 2 deep links"
```

---

## Task 5: Status cycling, decision log, prompt chips, and full verification

The closure loop — the most important interaction in the mode — plus the evidence tray, the log, and the final verification matrix.

**Files:**
- Modify: `pages/leadership-dashboard-tracker.html` regions R2, R5, R6
- Modify: `docs/superpowers/plans/2026-08-08-mode3-decision-workspace.md` (Deviations)

- [ ] **Step 1: Write the failing test**

```js
(() => {
  const root = document.getElementById('root');
  root.setAttribute('data-mode','decide'); root.parentElement.setAttribute('data-mode','decide');
  const chip = document.querySelector('.dec[data-id="D1"] .m3-chip');
  const before = {
    due: document.getElementById('m3Due')?.textContent,
    closed: document.getElementById('m3Closed')?.textContent,
    logRows: document.querySelectorAll('#m3Log tbody tr').length
  };
  const seen = [];
  for (let i = 0; i < 5; i++) { chip.click(); seen.push(chip.dataset.status); }
  const after = {
    due: document.getElementById('m3Due')?.textContent,
    closed: document.getElementById('m3Closed')?.textContent,
    logRows: document.querySelectorAll('#m3Log tbody tr').length
  };
  return JSON.stringify({ before, cycle: seen, after,
    tray: document.querySelectorAll('.m3-ev-row').length,
    chips: document.querySelectorAll('.m3-ask').length }, null, 1);
})()
```

Expected before the change: `before.logRows: 0`, `tray: 0`, `chips: 0`, and `cycle` five copies of `"Not started"` because nothing cycles yet.

- [ ] **Step 2: Run it and confirm it fails**

Expected `cycle: ["Not started","Not started","Not started","Not started","Not started"]` and all three counts zero.

- [ ] **Step 3: Add CSS for the tray, log and prompt chips (R5)**

```css
/* ── Evidence tray: no cards at all, just titled rows. This is the calm
   area. The nine panels stay in Mode 2 — one source of truth. ── */
.m3-ev{background:var(--art-surface); border:1px solid var(--art-rule); border-radius:3px;
  box-shadow:var(--art-shadow); overflow:hidden;}
.m3-ev-row{display:flex; align-items:center; gap:12px; width:100%; padding:12px 16px;
  border:0; border-top:1px solid var(--art-rule); background:none; font:inherit;
  font-size:13px; font-weight:700; color:var(--art-ink); text-align:left; cursor:pointer;}
.m3-ev-row:first-child{border-top:0;}
.m3-ev-row:hover{background:var(--art-sunk); color:var(--art-accent);}
.m3-ev-row:focus-visible{outline:2px solid var(--art-accent); outline-offset:-2px;}
.m3-ev-row span{margin-left:auto; font-size:11px; font-weight:700; color:var(--art-faint);}

/* ── Prompt chips. Inert on purpose: the tracker has no assistant composer
   (that lives on app-shell-intro.html), so a working-looking one would be
   the dead affordance the interaction budget exists to avoid. ── */
.m3-asks{display:flex; gap:9px; flex-wrap:wrap; align-items:center;}
.m3-ask{border:1px dashed var(--art-rule); border-radius:999px; padding:6px 13px;
  font-size:11.5px; font-weight:700; color:var(--art-muted); background:var(--art-surface);}

/* ── Decision log: the closure loop. Plain, muted, dated. ── */
.m3-log{width:100%; border-collapse:collapse; font-size:12.5px;}
.m3-log th{text-align:left; padding:8px 12px; font-size:9.5px; font-weight:800;
  letter-spacing:.12em; text-transform:uppercase; color:var(--art-faint);
  border-bottom:1px solid var(--art-rule);}
.m3-log td{padding:9px 12px; border-bottom:1px solid var(--art-rule); color:var(--art-muted); vertical-align:top;}
.m3-log tr:last-child td{border-bottom:0;}
.m3-log td b{color:var(--art-ink);}
.m3-log .o-open{color:var(--art-warn); font-weight:800;}
.m3-log .o-wait{color:var(--art-derived); font-weight:800;}
.m3-log .o-done{color:var(--art-good); font-weight:800;}
.m3-log .o-moot{color:var(--art-faint); font-weight:800;}
.m3-log tr.is-new td{background:rgba(255,88,37,.06);}
```

- [ ] **Step 4: Add the tray, prompt-chip and log markup (R2)**

Insert immediately after the `.decs` widget's closing `</div></div>`:

```html
    <div class="w s12" data-mode-only="decide"><div class="m3-asks">
      <span class="m3-hz-lbl">Questions this board can now answer</span>
      <span class="m3-ask">Which eight deals close the RM 17.1M gap?</span>
      <span class="m3-ask">Draft the board note on the 0.4pt share decline.</span>
      <span class="m3-ask">Who owns the top-five sponsor gap?</span>
      <span class="m3-ask">What did we decide last month that has not moved?</span>
    </div></div>

    <div class="w s12" data-mode-only="decide"><div class="m3-srule">
      <h3>Evidence</h3><p>The nine analytical panels, one click away in Mode 2 — kept there so there is one source of truth</p>
    </div></div>

    <div class="w s12" data-mode-only="decide"><div class="m3-ev">
      <button type="button" class="m3-ev-row" data-panel="cFan">Cumulative revenue against plan, with the three closes<span>Mode 2 &rarr;</span></button>
      <button type="button" class="m3-ev-row" data-panel="cBridge">Where the RM 8.9M of growth came from<span>Mode 2 &rarr;</span></button>
      <button type="button" class="m3-ev-row" data-panel="cFunnel">Pipeline by stage<span>Mode 2 &rarr;</span></button>
      <button type="button" class="m3-ev-row" data-panel="cQuad">Which reps are actually at risk<span>Mode 2 &rarr;</span></button>
      <button type="button" class="m3-ev-row" data-panel="cFill">Sold against what we had to sell<span>Mode 2 &rarr;</span></button>
      <button type="button" class="m3-ev-row" data-panel="cBubble">Revenue against contribution<span>Mode 2 &rarr;</span></button>
      <button type="button" class="m3-ev-row" data-panel="cChurn">Why RM 4.4M walked<span>Mode 2 &rarr;</span></button>
      <button type="button" class="m3-ev-row" data-panel="cConc">How much rests on how few<span>Mode 2 &rarr;</span></button>
      <button type="button" class="m3-ev-row" data-panel="cShare">Us against the market<span>Mode 2 &rarr;</span></button>
    </div></div>

    <div class="w s12" data-mode-only="decide"><div class="m3-srule">
      <h3>Decision log</h3><p>What was decided, when, and what has happened since</p>
    </div></div>

    <div class="w s12" data-mode-only="decide"><div class="p">
      <div class="cw"><table class="m3-log" id="m3Log">
        <thead><tr><th>Decision</th><th>Decided</th><th>By</th><th>Outcome</th></tr></thead>
        <tbody>
          <tr><td><b>Diarise Petronas for the Q3 budget reset</b></td><td>5 Aug</td><td>Aisyah Rahman</td><td><span class="o-open">Scheduled</span> — still no meeting in the diary, 7 days</td></tr>
          <tr><td><b>Rate review for AirAsia</b></td><td>1 Aug</td><td>Sales lead</td><td><span class="o-wait">Awaiting client</span></td></tr>
          <tr><td><b>Restructure the Tealive package</b></td><td>28 Jul</td><td>Aisyah Rahman</td><td><span class="o-done">Closed</span> — won back RM 0.3M of RM 0.5M</td></tr>
          <tr><td><b>Coach Daniel on closing technique</b></td><td>21 Jul</td><td>Sales lead</td><td><span class="o-moot">Moot</span> — the rep quadrant showed a prospecting gap, not a closing one</td></tr>
        </tbody>
      </table></div>
      <p class="note"><span class="prov-s"><i class="dot dot-p"></i>pending</span> <b>Every row here is an operating layer no dataset supplies.</b> The last one is the point of the whole mode: a decision retired by evidence. Coaching Daniel on closing would have been the wrong quarter's work, and the board is what proved it.</p>
    </div></div>
```

- [ ] **Step 5: Add status cycling and tray navigation (R6)**

Append inside the Mode 3 interaction IIFE from Task 4, before its closing `})();`:

```js
  // ── Status cycling: the closure thesis made tangible. Changing a status
  // recomputes the health strip's three counts and writes a log row, so the
  // page visibly knows something happened. Fully reversible by cycling round.
  var STATUSES=['Not started','Scheduled','Awaiting client','Closed','Moot'];
  var CLS={'Not started':'o-open','Scheduled':'o-open','Awaiting client':'o-wait',
           'Closed':'o-done','Moot':'o-moot'};

  function recount(){
    var decs=[...document.querySelectorAll('.dec')];
    var live=function(d){ var s=d.querySelector('.m3-chip').dataset.status;
                          return s!=='Closed'&&s!=='Moot'; };
    var due=decs.filter(function(d){ return d.dataset.h.indexOf('week')>-1 && live(d); }).length;
    var stalled=decs.filter(function(d){ return d.dataset.stalled==='true' && live(d); }).length;
    var closed=decs.filter(function(d){ return d.querySelector('.m3-chip').dataset.status==='Closed'; }).length;
    document.getElementById('m3Due').textContent=due+' due';
    document.getElementById('m3Stalled').textContent=stalled;
    document.getElementById('m3Closed').textContent=closed;
  }

  function logRow(dec,status){
    var body=document.querySelector('#m3Log tbody');
    var name=dec.querySelector('.dec-h').textContent;
    var tr=document.createElement('tr');
    tr.className='is-new';
    tr.innerHTML='<td><b>'+name+'</b></td><td>today</td><td>Bryan Wong</td>'+
                 '<td><span class="'+CLS[status]+'">'+status+'</span> — set from the board</td>';
    body.insertBefore(tr,body.firstChild);
  }

  document.addEventListener('click',function(e){
    var chip=e.target.closest('.m3-chip'); if(!chip)return;
    var next=STATUSES[(STATUSES.indexOf(chip.dataset.status)+1)%STATUSES.length];
    chip.dataset.status=next;
    chip.textContent=next;
    recount();
    logRow(chip.closest('.dec'),next);
  });

  // Evidence tray rows: same deep link as the drawer's, one handler apart
  // because the tray rows carry data-panel directly.
  document.addEventListener('click',function(e){
    var r=e.target.closest('.m3-ev-row'); if(!r)return;
    var btn=document.getElementById('mNext'); if(btn) btn.click();
    var svg=document.getElementById(r.dataset.panel);
    if(svg){ var w=svg.closest('.w'); if(w) w.scrollIntoView({block:'center'}); }
  });

  recount();
```

- [ ] **Step 6: Run the test to verify it passes**

Expected: `before` reading `{due:"3 due", closed:"0", logRows:4}`; `cycle` exactly `["Scheduled","Awaiting client","Closed","Moot","Not started"]`; `after.logRows: 9` (4 seeded + 5 written); `after.due: "3 due"` and `after.closed: "0"` because a full cycle returns to the start. `tray: 9`, `chips: 4`.

Then check the intermediate state explicitly — cycle D1 three times only and assert `due` reads `"2 due"` and `closed` reads `"1"`:

```js
(() => {
  const root = document.getElementById('root');
  root.setAttribute('data-mode','decide'); root.parentElement.setAttribute('data-mode','decide');
  const chip = document.querySelector('.dec[data-id="D1"] .m3-chip');
  while (chip.dataset.status !== 'Not started') chip.click();
  chip.click(); chip.click(); chip.click();   // → Closed
  return JSON.stringify({
    status: chip.dataset.status,
    due: document.getElementById('m3Due').textContent,
    stalled: document.getElementById('m3Stalled').textContent,
    closed: document.getElementById('m3Closed').textContent
  }, null, 1);
})()
```

Expected: `{"status":"Closed","due":"2 due","stalled":"1","closed":"1"}`.

- [ ] **Step 7: Verify status cycling with real input**

Reload for a clean state. `read_page`, then `computer` `left_click` D1's status chip. Screenshot. Confirm visually that the chip turned amber and reads `Scheduled`, that the health strip's `Decisions` tile still reads `3 due`, and that a highlighted row appeared at the top of the log. Click three more times and screenshot that `due` has dropped to `2 due` and `closed` to `1`.

- [ ] **Step 8: Add the footer line (spec §3)**

The page footer currently explains Modes 1 and 2 only. Find, in the `<p class="foot">`:

```html
<b>Mode 2</b> is the target state: confirmed data properly visualised alongside the sources still outstanding.
```

Append immediately after that sentence, inside the same paragraph:

```html
 <b>Mode 3</b> is an experience study, not new analysis: it proves that the same content ordered by decision reads differently from the same content ordered by chart.
```

Verify with:

```js
document.querySelector('.foot').textContent.includes('experience study, not new analysis')
```

Expected: `true`.

- [ ] **Step 9: Run the full verification matrix**

Spec §11, all eight checks plus the reduced-motion check from §10. Record actual output for each.

1. **Mode isolation and regression** — Task 1 Step 1 assertion. `leaked: 0` in all three modes; `now` and `next` totals equal to the Task 1 baseline (**15** and **12**); `decide` total **11**.
2. **Arithmetic** — run:

```js
(() => {
  const t = document.getElementById('root').textContent.replace(/\s+/g,' ');
  const checks = {
    pipelineSum: (51.2+31.6+28.4).toFixed(1) === '111.2',
    dealSum: (37+22+14) === 73,
    weightedSum: (25.6+22.1+27.0).toFixed(1) === '74.7',
    forecast: (148.2+74.7).toFixed(1) === '222.9',
    shortfall: (240.0-222.9).toFixed(1) === '17.1',
    commitShort: (240.0-210.2).toFixed(1) === '29.8',
    churnSum: (2.1+1.4+0.5+0.4).toFixed(1) === '4.4',
    topFive: (148.2*0.38).toFixed(1) === '56.3',
    nrr: (((139.3+4.8-8.6)/139.3)*100).toFixed(1) === '97.3'
  };
  const gp = [[17.1,'5.4'],[56.3,'17.7'],[5.1,'1.6'],[2.6,'0.8'],[2.4,'0.8'],[2.1,'0.7'],[4.3,'1.4']];
  checks.grossProfits = gp.every(([s,g]) => (s*0.314).toFixed(1) === g);
  checks.noStaleFigures = !/222\.7|74\.5|17\.3|125\.7/.test(t);
  return JSON.stringify(checks, null, 1);
})()
```

Every value must be `true`. `noStaleFigures` guards against the 74.5/222.7 arithmetic bug and the 125.7 monthly-sum bug that both shipped on earlier versions of this board.

3. **Status cycling** — Step 6 above.
4. **Horizon filter** — Task 3 Step 5's `promotedByHorizon`, plus the `.dec-split` sitting between the promoted and demoted groups (`order` 1 / 2 / 3).
5. **Evidence drawers** — Task 4 Step 6's 1px `getBBox` audit, `overflowCount: 0`.
6. **Geometry** — 1280×720, 1440×1100, 375×667. At each, assert `document.documentElement.scrollWidth <= window.visualViewport.width`.
7. **Console clean** — `read_console_messages` with `onlyErrors: true` in all three modes.
8. **Dark mode** — `resize_window` with `colorScheme: "dark"`, then confirm every tier border still resolves to a colour rather than `rgba(0, 0, 0, 0)`:

```js
(() => {
  const root = document.getElementById('root');
  root.setAttribute('data-mode','decide'); root.parentElement.setAttribute('data-mode','decide'); root.setAttribute('data-horizon','week'); root.parentElement.setAttribute('data-horizon','week');
  return JSON.stringify([...document.querySelectorAll('.dec')].map(d => ({
    id: d.dataset.id, tier: d.dataset.tier,
    border: getComputedStyle(d).borderTopColor,
    tierLabel: d.querySelector('.m3-tier').textContent
  })), null, 1);
})()
```

Every `border` must be a real colour, and every card must carry a text `tierLabel` — the tier system is the one thing in this mode carrying meaning in colour, so the word is its non-colour fallback.

9. **Reduced motion** (spec §10). The file has a global `@media (prefers-reduced-motion:reduce){ *{transition:none !important; animation:none !important;} }`. That kills transitions, so any state carried *by* a transitioned property would get stuck. Confirm the drawer state is carried by the `hidden` attribute and not by an animated height:

```js
(() => {
  const root = document.getElementById('root');
  root.setAttribute('data-mode','decide'); root.parentElement.setAttribute('data-mode','decide');
  const d = document.querySelector('.dec[data-id="D1"]');
  const drawer = d.querySelector('.dec-drawer');
  const cs = getComputedStyle(drawer);
  d.querySelector('.dec-ev').click();
  const open = getComputedStyle(d.querySelector('.dec-drawer'));
  return JSON.stringify({
    closedDisplay: cs.display,
    openDisplay: open.display,
    heightIsAuto: open.height !== '0px',
    transitionedProps: open.transitionProperty
  }, null, 1);
})()
```

Expected: `closedDisplay: "none"`, `openDisplay` anything other than `"none"`, `heightIsAuto: true`. Run it once normally and once with `resize_window`'s reduced-motion emulation if available; the result must be identical, because `hidden` is not animatable and therefore cannot be suppressed.

- [ ] **Step 10: Append the Deviations section to this plan**

Add a `## Deviations` heading at the end of this file recording anything that differed from the plan text — in particular the two arrays copied out of Mode 2 (`mConc`, `mShare`), noting whether the plan's placeholder values matched what was already in the file or had to be corrected.

- [ ] **Step 11: Commit**

```bash
cd /Users/kwlkokho/Documents/GitHub/Collabrium-DS/.worktrees/app-shell-intro-page
git add pages/leadership-dashboard-tracker.html docs/superpowers/plans/2026-08-08-mode3-decision-workspace.md
git commit -m "feat: status cycling, decision log, evidence tray; full verification matrix"
```

---

## Publication

**Do not publish or push without asking.** Two standing constraints on this project:

- **Local commits only** until the user says the words "push to vercel".
- `origin` is the shared org repo (`astroproductdesign/Collabrium-DS`) and must never receive this prototype. The prototype's own remote is `personal`, pushed with the cross-name refspec `git push personal app-shell-intro-page:main`.

Republishing the artifact is a **separate act** from pushing the repo, and also needs confirmation. When confirmed, publish by passing the existing URL so the link stays stable:

```
Artifact(file_path: <built body>, url: "https://claude.ai/code/artifact/886c79d5-fc33-4625-ac36-13a32ba2aa1a")
```

### The publish step is a wrapper strip, not a rebuild

Verified at commit `b20bd73`. `pages/leadership-dashboard-tracker.html` is **already fully self-contained** — DS CSS inlined, Mulish embedded as a `data:font/ttf;base64` URI, and **zero external requests**: no `<link>`, no `<script src>`, no `<img>`, no `@import`, no remote `url()`. The single `components.css` occurrence in the file is inside a code comment on line 198. So the CSP that blocks external hosts is already satisfied by the page as committed.

The only thing publishing needs is removing the document wrapper, because the Artifact tool supplies its own. **Keep `<title>`** — the tool reads it for the tab and gallery name.

```bash
cd /Users/kwlkokho/Documents/GitHub/Collabrium-DS/.worktrees/app-shell-intro-page
SCRATCH=/private/tmp/claude-502/-Users-kwlkokho-Documents-GitHub-Collabrium-DS/a61b8061-3b61-4e4b-8d91-684c2d5fcaab/scratchpad
sed -E '/^<!DOCTYPE html>$/d; /^<html lang="en">$/d; /^<head>$/d; /^<\/head>$/d; /^<body>$/d; /^<\/body>$/d; /^<\/html>$/d; /^<meta /d' \
  pages/leadership-dashboard-tracker.html > "$SCRATCH/mode3-artifact-body.html"
grep -cE '^<!DOCTYPE|^<html|^<head|^<body|^<meta ' "$SCRATCH/mode3-artifact-body.html"   # expect 0
grep -c '<title>' "$SCRATCH/mode3-artifact-body.html"                                    # expect 1
```

Then publish to the existing URL so the link stays stable:

```
Artifact(file_path: "$SCRATCH/mode3-artifact-body.html",
         url: "https://claude.ai/code/artifact/886c79d5-fc33-4625-ac36-13a32ba2aa1a",
         favicon: <the artifact's existing emoji — do NOT change it>)
```

### Scratchpad files: which is which

Three older copies exist and only one is a useful reference. Do not publish any of them.

| File | What it is |
|---|---|
| `scratchpad/artifact-body.html` (80KB) | A **template**, not a build — it carries the literal string `__FONT_B64__` where the font belongs. This is what the 425KB publish copy was generated *from*. |
| `scratchpad/collabrium-leadership-tracker.html` (425KB) | The **last published body**. Differs from the current git-tracked page by exactly one thing: a two-line code comment added to the chart module after publishing. Nothing visible. |
| `scratchpad/Collabrium-Leadership-Dashboard-Tracker.html` (399KB) | **Stale export** — only 12 Mode 2 widgets against the current 13. Ignore it. |

Because the live artifact is one comment behind the committed page and nothing else, publishing after this work ships Mode 3 and that comment, with no other drift.

---

## Deviations

Recorded as work lands. Task text above is left intact as the record of what was planned; this section is what was actually built and why it differs.

### Task 1 (`f50d27a`, fixes in `c8f99f7`)

1. **The plan's illustrative widget counts were wrong.** Task 1 Step 2 guessed `now: 19, next: 13`. The file's real baseline is **Mode 1 = 15, Mode 2 = 12**, and Mode 3 = 1 after the shell lands. Those are the regression numbers for every later task. The plan said to record the actual output rather than trust the example, and that is what caught it.

2. **The horizon filter ships as a `radiogroup`, not `aria-pressed` toggles** — a correction to the plan, not a deviation from it in spirit. The control is single-choice with exactly one always on, and the file had already made this decision for the identical shape at `#roleTabs` (`role="radiogroup"` / `role="radio"` / `aria-checked`). As originally specified, a screen-reader user would hear three independent toggles with no indication they were exclusive. `.period` is not a counter-precedent: those buttons drive no state at all and are decorative.

   Shipped: `role="radiogroup"` on `.m3-hz`, `role="radio"` + `aria-checked` per button, `aria-hidden="true"` on the label span, the handler writing `aria-checked`, and the CSS selector `.m3-hz button[aria-checked="true"]`.

   **Known gap, deliberate:** `role="radio"` sets an arrow-key navigation expectation that plain focusable buttons do not meet. `#roleTabs` already ships with that same gap, so matching it keeps the file internally consistent. A future accessibility pass should add roving tabindex and arrow handling to **both** groups together, not just this one. Task 3's verification step was updated to check `aria-checked` rather than `aria-pressed`.

3. **`setMode` gained a guard.** Without it, a mode whose `copy`/`titles` entry is missing writes the literal string `undefined` into the banner and *then* throws on `titles[mode][0]` — after `data-mode` and every `aria-pressed` have already been written. The result is one mode's widgets under another mode's heading: half-applied and misleading rather than visibly broken. `if(!copy[mode]||!titles[mode])return;` is now the first statement, so a bad key leaves the page wholly on the previous mode. The comment claiming a fourth mode "costs zero JS" was the invitation to that bug and now states the real cost: two map entries, wiring free.

4. **`--art-accent-bg` token added** (`#FFEEE7` light, `#3A1C10` dark, in all four theme blocks). Mode 3's banner wash was a literal `rgba(255,88,37,.07)`. The hue was right — `--art-accent` is `#FF5825` in both themes — but the alpha was the problem: over the light canvas it composites near `#FEEDE4`, comparable to Mode 2's tint, while over the dark canvas it lands near `#251812` against Mode 2's purpose-built `#2A1D45`. Mode 3's wash would have all but vanished in dark while Mode 2's stayed legible, against the file's convention that every wash is theme-valued.

5. **Mode isolation collapsed from O(modes²) to O(modes).** The plan enumerated mode *pairs*, so three modes needed six rules and a fourth would have needed twelve. The file's own `data-roles` filtering already used the linear form. Shipped as three rules replacing six, including the two that predated this work:

   ```css
   [data-mode="now"]    .w[data-mode-only]:not([data-mode-only~="now"]){display:none;}
   [data-mode="next"]   .w[data-mode-only]:not([data-mode-only~="next"]){display:none;}
   [data-mode="decide"] .w[data-mode-only]:not([data-mode-only~="decide"]){display:none;}
   ```

   Equivalent because every `data-mode-only` value is a single token. This was the riskiest change in the fix round — it rewrote rules Modes 1 and 2 depend on — so the 15/12/1 zero-leak assertion was re-run as its gate.

6. **Minor cleanups from the same review:** four `!important` on `.m3-delta` replaced by the higher-specificity `.m3-posture .m3-delta`; a cargo-culted `if(hzGroup)` guard dropped to match the unguarded `#roleTabs` handler and to let a class-rename typo throw instead of silently producing an inert control; and two comments that described future state in the present tense reworded, since a reader would have grepped for CSS that did not exist yet.

7. **Environment note for later tasks:** the Browser pane serves a stale cached copy after an edit, and a plain reload does not clear it. Append a cache-buster (`?cb=1`) on the first navigation after editing; subsequent reloads then track the file. Confirmed by `curl` against the dev server, which was serving the updated file correctly the whole time.

### Found during Task 1 review, carried into Task 5

8. **Pre-existing WCAG AA failure on the pressed mode button's sub-text.** Measured contrast of the 10px `.m-k` kicker and 12px `.m-d` description against the pressed background, at `.modes` (the shared pattern, not Mode 3's addition):

   | Mode | Pressed background | Contrast | Verdict |
   |---|---|---|---|
   | Mode 2 | `--art-imagined` `#9F56FF` | 3.84:1 | fails 4.5:1 — pre-existing |
   | Mode 3 | `--art-accent` `#FF5825` | 3.02:1 | fails — same family, slightly worse |
   | Mode 1, **dark theme** | `--art-ink` `#F3F0E9` | **1.09:1** | effectively invisible — pre-existing |

   The culprit is the hardcoded `rgba(252,250,245,.72)` on the pressed sub-text: it assumes a dark pressed background, which is true only for Mode 1 in the light theme. Mode 3 joins a broken pattern rather than creating one, and the worst instance (Mode 1 in dark) is outside this feature entirely — but Mode 3's own button is the second-worst, so this is our accessibility bug too, not only inherited debt. **Fixed in Task 5** with a theme-aware token, which clears all three instances at once rather than papering over the one we introduced.

9. **Verification trap for the remaining tasks.** Reading `backgroundColor` on `.modes button` immediately after a click returns the *pre-transition* value (`rgba(0,0,0,0)`), because `transition:background .18s` never advances in a pane that delivers zero animation frames. Inject `transition:none` before reading any transitioned property. This does not affect `.mbanner` (no transition on it), but it will silently lie about anything on `.modes`, and about the decision cards' own hover and border transitions in Tasks 3–5.

### Task 2 (`4b7a8a6`)

10. **The plan's Mode 3 widget counts were wrong, and the implementer was right not to satisfy them.** Task 2's step text expected `counts.decide.total` to reach 5; the correct figure is **4**. Task 2's own markup adds exactly three widgets — health strip, the Watch section label, the Watch grid — on top of Task 1's posture. The downstream projection was wrong for the same reason: the real running totals are **1 → 4 → 6 → 6 → 11**, and Task 5's matrix claimed 12.

    The implementer built the specified markup, found the count short, and **declined to invent a fifth widget to make the assertion pass** — noting that nothing in the step's code implied one and that manufacturing it risked straying into Task 3's scope. That is the correct call. A number in a plan is a prediction, and when a prediction and working code disagree it is usually the prediction that is wrong; forcing agreement would have put a junk widget in the page to satisfy my arithmetic. `leaked: 0` — the assertion that actually guards isolation correctness — held throughout.

    Note for Task 4: it adds **no** `.w` widgets at all. Its evidence drawers are nested inside the decision cards Task 3 creates, so an unchanged count of 6 is the expected result there, not a sign that nothing landed.

### Task 2 review round (`e0d47e9`)

11. **The health strip misgrouped on most laptop widths — Critical, and not visible at the width it was authored at.** `.m3-hm` carried only `border-right`, which is correct for the 6-across single row. At the 3- and 2-column breakpoints the vertical rules ran unbroken through both rows with nothing between them, so six independent metrics read as three stacked pairs — "Share of market 13.8%" appearing to sit under "Forecast to plan RM 222.9M". Measured, not eyeballed: at 900px, cells 0–2 at y=260 and cells 3–5 at y=367, every cell `border-bottom: 0`. There was also a doubled 2px rule where the row-final cell's `border-right` met the container edge, because `:last-child` only ever fixes the final cell, not the last cell of each row.

    Fixed with a self-contained reset of both borders at each breakpoint before applying that breakpoint's row and column rules. **The first fix introduced a second bug, which the implementer found itself while verifying rather than reporting done:** at the 2-column step, `nth-child(2n)` does not match cell 3, so the 3-column block's `nth-child(3n)` rule — equal specificity (0,2,0) — kept winning and left one metric without its right border. Media queries contribute nothing to specificity, so a class-only reset at (0,1,0) can never out-rank an `nth-child` rule regardless of source order; only an equal-or-higher-specificity selector can. Restating column one as `nth-child(2n+1)` puts it at (0,2,0) and hands the decision to source order, where the later block wins. Verified at 1151/1150/1000/681/680/375/320 — both sides of both boundaries — with zero invariant violations.

12. **Every direction colour in the health strip was silently not rendering.** `.m3-hm-d b` at (0,1,1) out-specifies `.m3-up`/`.m3-dn` at (0,1,0), so `<b class="m3-dn">RM 17.1M short</b>` computed to `rgb(8,8,8)` — plain ink. The value beneath it coloured correctly because nothing competed with it, so the strip was half-working in a way that reads as deliberate. Fixed by raising specificity (`.m3-hm-d b.m3-dn`) rather than reaching for `!important`. The same pattern 30 lines later *had* used `!important` to fight `.m3-wcard p`; that was rewritten as `.m3-wcard p.m3-thr` so Task 3 can reuse the class without a specificity fight.

13. **Light-theme contrast failed across most of Mode 3's small text, and the fix mechanism was a deliberate override of the review.** Five rows failed 4.5:1 in the light theme, one at **1.98:1** — unreadable. The reviewer proposed re-valuing `--art-good`, `--art-warn`, `--art-crit` and `--art-imagined` per theme. **Rejected**, because those tokens drive every chart fill, bar and badge in Modes 1 and 2, which are already reviewed and approved; fixing text contrast would have silently repainted two other modes.

    Instead, extended the family the file already established for exactly this problem — `--art-derived-ink`, `--art-imagined-ink`, `--art-illus-ink` — with `--art-good-ink`, `--art-warn-ink` and `--art-crit-ink` across all four theme blocks, pointed only *text* usages at them, and left every fill on the saturated base token. `--art-faint` (failing in both themes at 3.44/4.08, but used widely elsewhere) was left alone; the three Mode 3 selectors sitting on it moved to `--art-muted`.

    All ten rows now pass in both themes, tightest 4.55:1. Modes 1 and 2 confirmed unchanged by two independent methods: no `-` line in the diff re-values any token, and all 18 changed selectors match 41 live elements, every one inside a `[data-mode-only="decide"]` wrapper.

14. **The strategic tier's purple collided with "this data is invented" — a spec error, not an implementation one.** The spec assigned `--art-imagined` to the strategic tier, but purple already means *invented / not-yet-real* in this file: it drives `.p-imagined`, `.tile-hero-p`, the Mode 2 banner and `.dot-p`. The health strip renders five hollow purple pending rings, so a filled purple tier dot inches away would have told a reader that a strategic decision was fabricated — the exact misreading the tracker exists to prevent. Given its own `--art-strategic` token (`#7C3AED` / `#C9A6FF`) so a future re-tint of the provenance colour cannot change tier meaning.

    The four tier dots now also differ in **shape**, not only hue — circle, diamond, ring, square — because Task 3 inherits this CSS for seven cards and the spec commits to the tier system carrying signal before anyone reads. The text label is retained in every case regardless.

15. **Two notes for later, neither actionable now.** `--art-warn-ink` is value-identical to `--art-illus-ink` in both themes (`#8A5A00` / `#F0C173`), which is harmless but means the two will not track each other if either is re-tinted. And the health strip's row rules encode a fixed six items via `nth-child(-n+3)` / `(-n+4)`; a seventh metric would need them revisited.

16. **A reported anomaly that was not one.** The re-run assertion returned `"Cash &amp; delivery risk"`, suggesting a double-escape that would render as visible corrupted copy. It was a report-formatting artefact — the agent HTML-escaped its own write-up. The markup is correctly single-escaped, `textContent` returns exactly one ampersand, and the diff never touched that line. Worth recording because "escaped entity in a test result" is a cheap check that would have been expensive to discover after publishing.

### Task 3 (`1896068`)

17. **The plan's own horizon test was broken, and it was broken in a way that reports success as failure.** `promoted(h)` in Task 3's Step 1 wrote `data-horizon` to `#root` only, never to `root.parentElement`. Both nodes carry the attribute — `setMode` and the horizon handler always write both, because the published artifact wraps the page and the wrapper needs it too. Since the CSS selectors are descendant selectors, a card matches if **either** ancestor holds the value. Updating one and leaving the other stale makes two horizons simultaneously active, so the results accumulate monotonically: `quarter` returned `["D1","D2","D3","D4","D5","D6"]` instead of `["D4","D5","D6"]`.

    The implementation was correct throughout. The implementer diagnosed the script rather than the page, verified the real handler writes both nodes, re-ran a corrected version, got the exact expected sets, and **left the page alone** — the right call. Bending correct code to satisfy a broken assertion is the failure mode this would have invited.

    **Fixed everywhere:** 19 single-node attribute writes in the plan and 7 across the Task 4 and Task 5 briefs are now paired. The bug only bites where a snippet *cycles* a value — Task 1's mode loop happened to pair its writes and so was never affected, and snippets that set an attribute to the value it already holds are no-ops. That is why it survived two task rounds undetected.

    **Standing rule for any future test in this file:** never write `data-mode` or `data-horizon` to one node. Write both, always, or the selector matches through the stale ancestor.

18. **`--art-strategic`, not `--art-imagined`.** The plan's Step 3 CSS still pointed `.dec[data-tier="strategic"]` at `--art-imagined`, the purple that means "invented data" in this file. Corrected during implementation per deviation 14. The plan text above is stale on this line; the shipped code is right.

### Task 3 review round (`8800faf`)

19. **`.dec-ev` had no CSS rule anywhere — seven raw browser buttons, and the one element on the page that ignored the theme.** Computed style was `Arial 13.3333px`, `background rgb(239,239,239)`, `border 2px outset black`, `border-radius 0` — **identical in the dark theme**, sitting directly beside a fully styled `.m3-chip` pill. The cause is a plan error: the only `.dec-ev` declaration anywhere was a bare `margin-left:auto` that I put in *Task 4's* CSS block, so Task 3 shipped the markup with nothing to style it. Now fully styled with hover, `:focus-visible` and an `[aria-expanded="true"]` state, and the `▸` glyph wrapped in `aria-hidden` so it stops forming part of the accessible name.

20. **All four status-chip states coloured text with saturated fill tokens; two failed in both themes.** Measured against `--art-sunk`: Scheduled 1.77 light, Awaiting client 4.06/3.58, Closed 2.10 light, Moot 3.08/3.86. Repointed to `-ink` variants while keeping `border-color` on the saturated token, since a border is a non-text boundary and carries the visual coding. `--art-good-ink` was itself marginal, so its light value deepened `#00875A → #00734D`, which lifted the Closed chip to 5.27 **and** `.m3-t-opp` from a barely-passing 4.55 to 5.90 — one token change fixing two call sites. A side effect: `.m3-chip::before` uses `currentColor` at `opacity:.6`, so the Scheduled dot had been rendering near 1.4:1, effectively invisible. All states now clear 4.5:1 in both themes.

21. **Reading and focus order were inverted at two of three horizons — a design error in the spec, not the implementation.** The spec specified pure-CSS re-tiering via flexbox `order`, which moves boxes visually without touching the DOM. Measured at `quarter`: D4 rendered at `top:1383` and D1 at `top:2572`, while DOM order remained D1→D7 with `.dec-split` fixed after D3. A screen-reader or keyboard user therefore received **D1, D2, D3, "Also open", D4, D5, D6, D7** — the three *demoted* decisions announced first, above a heading declaring them deprioritised, and the three actually-Now decisions announced *beneath* "Also open". Sighted and non-sighted users were told opposite things about which decisions mattered. WCAG 1.3.2 and 2.4.3.

    It was invisible at the default `week` horizon, which is exactly why implementation and spec review both passed it.

    **Resolved by adding a four-line `reflowDecisions(hz)` that moves DOM nodes**, called at init and on every horizon change, with the `order` CSS retained as the no-JS fallback (correct for `week`, the initial state). Verified: DOM order matches visual order at all three horizons — `week` D1–D7, `quarter` D4,D5,D6,D1,D2,D3,D7, `fy` D7,D4,D5,D6,D1,D2,D3.

    This **supersedes the spec's §6 I3 claim of "pure CSS, no DOM moves"**. Pure CSS was an elegance preference, not a requirement, and it cannot express "reorder for everyone" — only "reorder for people who can see". For a mode whose entire thesis is that hierarchy is the message, that is the wrong trade.

22. **Thirty-five controls, most sharing an accessible name.** `Approve` ×7, `Ask for options` ×7, `Defer with reason` ×7, `Evidence` ×7, `Not started` ×6. Ancestor context is not conveyed in browse or forms mode, so the enclosing card did not disambiguate them. Fixed by `aria-label` with a short per-card handle on all 21 commitment buttons and all 7 evidence triggers, promoting each card to `<section aria-labelledby>` with an id on its `h4`, and giving each drawer an id with `aria-controls` on its trigger — ids Task 4 needed anyway.

    The six status chips were **deliberately deferred to Task 5**, not missed: the chip's visible text mutates as it cycles, and a self-relabelling button is announced inconsistently, so its `aria-label` must be maintained *by the cycling code* rather than bolted on here where it would go stale on the first click. Added to the Task 5 brief as a requirement.

23. **Minors taken:** `--dec-c` given a fallback so an unknown `data-tier` no longer yields a black border (an invalid `var()` falls back to *inherited*, not to the rule's own value); `.dec-split` gated to the three known horizons so an absent or unknown `data-horizon` no longer files every card under "Also open"; the `:not()` chains collapsed 24 → 15 with `:is()`; four `--art-faint` micro-text rules repointed to `--art-muted`; `data-stalled` and the `data-h ~=` multi-token convention documented; and the canonical field order recorded once in the block comment so a missing field shows up as a diff.

    The 375px fix needed more than the prescribed change: dropping `margin-left:auto` alone still left D6's status row 21px too wide, so the gap and the control padding were also tightened inside the existing narrow-viewport block. Measured right edge 306px inside a 325px boundary.

24. **Environment note.** The `computer` tool's click coordinates needed dividing by roughly 3.2 this session — the viewport-to-screenshot ratio multiplied by a `devicePixelRatio` of 2 — and the factor is not stable across sessions. The implementer diagnosed it empirically with a temporary capture-phase click listener before trusting any click result. Worth copying: the failure mode is a click that lands on nothing while the assertion quietly never fires, which reads as a pass.

### Task 3 close-out (`e91841e`) — approved

25. **The demoted group's order was path-dependent.** `reflowDecisions` preserved relative DOM order but never restored canonical order, so "Also open" reshuffled with click history: reaching `week` from init gave D4,D5,D6,D7 below the divider, but reaching it via `fy` gave D7,D4,D5,D6. Functionally and accessibly harmless — the promoted set was always canonical — but a demo where someone toggles horizons would show the list reordering for no visible reason. Fixed by capturing the canonical D1–D7 list once at init and filtering *that* rather than re-reading an already-reordered DOM. Three convergent paths to `week` now produce identical order.

26. **The no-JS fallback did not exist, and one attribute made the claim true.** With `data-horizon` absent — the actual scripting-off state, since JS was its only writer — all seven cards computed `order:3` at full size, and this round's divider gating meant `.dec-split` computed `display:none` too. So scripting-off gave seven identical cards and no divider, not the `week` view the comment promised. Fixed by putting `data-horizon="week"` in the markup on `#root`. That makes the fallback real, removes the duplication of the initial state between JS and CSS, and eliminates the pre-JS flash where cards render un-tiered before init runs. The JS init write is kept to sync the parent node.

27. **Three comments asserted things that were not true, and one of them was my error propagated into the file.** I told the implementer in a fix brief that `.dec-ev`'s only rule was a bare `margin-left:auto` in Task 4's block; the reviewer re-grepped commit `1896068` and found no `.dec-ev` rule anywhere in the file. I had confused it with `.m3-chip-h{margin-left:auto}`. The implementer faithfully recorded my claim as file history in a code comment — which in a file whose comments are the deliverable is a real defect, not a nitpick. Corrected, along with the stale no-JS claim and a garbled unfinished sentence in the `.decs` block.

    **Consequence caught while fixing it:** Task 4's brief still listed `.dec-ev{margin-left:auto;}` as CSS to add. With the trigger now fully styled, that would have landed a second competing declaration in a different block. Replaced in the brief with an explicit do-not-redeclare note, since a duplicate rule in a 2,100-line single-file page drifts silently.

28. **Verified by the reviewer, worth recording as facts Task 4 depends on:** `reflowDecisions` is idempotent across repeated clicks, never orphans or duplicates a card, and keeps `.dec-split` at the partition boundary. Critically, it **preserves event listeners bound to card descendants** — proven by attaching a counter to D1's Approve button, running nine horizon switches, then confirming both node identity and the counter survived. `insertBefore`/`appendChild` reparent existing nodes rather than recreating them, so Task 4 may bind drawer handlers directly to card descendants without re-binding after a horizon change; delegation on `#m3Decs` also works.

    Also: the 28 `aria-label` values are formed `"<visible text> — <handle>"`, so the visible string is a prefix of the accessible name. That satisfies WCAG 2.5.3 Label in Name and keeps voice control working ("click Approve"). The reverse order would have looked identical to a screen reader while silently breaking voice control.

### Task 4 (`0851bea`, fixes in `f59bf98`)

29. **Both placeholder chart datasets in the plan were wrong, and one was wrong in a way that would have contradicted the panel it links to.** The plan supplied placeholder arrays for `mConc` and `mShare` with an instruction to copy Mode 2's real series instead. That instruction earned its keep twice over:

    - **`mShare`**: the placeholders agreed with Mode 2 only at the endpoints and differed at **every interior point**. Since the drawer's deep link puts the inset and the full `cShare` panel in the reader's working memory seconds apart, shipping the placeholders would have drawn two different growth curves for the same data inside one document.
    - **`mConc`**: the plan assumed Mode 2's `cConc` held a dense `cum[0..9]` array. It holds sparse `(rank, cumulative%)` control points — `[[0,0],[1,9.2],[2,16.1],[3,22.4],[5,38],[10,54],[20,71]]`. The shape assumption was wrong, not just the values.

    Both copied verbatim and confirmed byte-identical to source by the spec reviewer, with the named anchors intact (largest advertiser 9.2%, top five 38%, us +6.4% to 106.4, market +8.1% to 108.1).

30. **Two genuine SVG overflows, found by the audit rather than by eye.** D5's `mQuad` had a rep label running past the 380-unit viewBox; D6's `mChurn` had a trailing "recoverable" tag past the edge. Fixed by **moving elements, not widening viewBoxes** — the drawer's `max-width:420px` is what keeps these reading as insets rather than as panels. `mQuad` now anchors labels `end` and draws leftward for points in the right half; `mChurn` pulled `x1` from 300 to 280. Neither was a `getBBox`/transform false positive.

31. **The interaction module shipped in a second `<script>` tag rather than appended to the chart block, and this was judged better than the plan.** It buys error isolation: if a chart IIFE throws, the interaction module still binds and the drawers open with claim text and a working deep link. Merged into one block, a throw anywhere in 300+ lines of coordinate maths would take the 25 lines of disclosure with it. Both blocks are classic parse-blocking scripts executing in document order, so `M3CHARTS` is assigned before anything reads it — and the only read is inside a click handler that cannot fire during parse. Minifiers do not merge sibling `<script>` blocks, and the artifact publish path wraps the body without reordering.

32. **Saturated fill tokens used as text in the new renderers — 1.77:1 and 2.10:1 in the light theme.** The attainment percentage in `mFill` and the "recoverable" tag in `mChurn`. Fixed by adding `goodInk`/`warnInk` to the chart module's `C` map and using them **for text only**, leaving bar fills on the saturated tokens: 5.27:1 and 5.30:1 light, 9.77:1 and 9.74:1 dark. Mode 2's eight equivalent sites deliberately left alone — they sit on `--art-surface` rather than the drawer's darker `--art-sunk`, so the insets were the file's worst case.

33. **A real logic bug: `mFill`'s caption was driven by the wrong variable.** `var capped = attainPct>100` decided whether to print *"Sold out — this ceiling is supply, not selling"* — but sold-out-ness is `soldPct`, not attainment. The two agree for Addressable (97 sold / 109 attainment) **by coincidence**. A line at 55% sold and 104% attainment would have printed "Sold out" above a bar visibly 45% empty: a chart contradicting its own caption, in a file people quote from. Split into `soldOut = soldPct>=95` and `beat = attainPct>=100`, with bar colour from `beat` and caption from `soldOut`. `100-soldPct` also wrapped in `Math.max(0, …)` so a value above 100 cannot print a negative percentage.

34. **Minors taken:** the chevron toggle rebuilds its `aria-hidden` span instead of silently discarding it on first click; the deep link moves focus to the scrolled target so a keyboard user is not stranded in a `display:none` subtree; `mQuad`'s bottom caption gained 4px of descender headroom it had been surviving only on MulishArt's exact metrics; the drawer rebuild guard moved from "has an SVG" to an explicit `dataset.built` flag so a missing renderer cannot cause a rebuild on every open; and `mChurn`'s magic `2.4` divisor is now a named `mx`.

35. **Recorded follow-up, not done: repoint `--art-faint` at the token level.** Chart axis labels at 8–9.5px use `C.fnt` (`--art-faint`), which measures **3.08:1 light / 3.86:1 dark against `--art-sunk`** — worse than the commonly quoted figure, which is against the lighter `--art-surface`. Deliberately **not** patched at the call sites, for two reasons. First, the deep link puts an inset and its full panel side by side in the reader's mind, so divergent axis-label colour would read as a bug rather than as an improvement. Second, the fix belongs one level up: repointing the token to roughly `#6E6A61` light / `#9A9488` dark clears 4.5:1 for all nine Mode 2 panels, all six Mode 3 insets, and the file's `.src`/`.foot`/`.tile-k` micro-text idioms in a single two-value edit — whereas patching six call sites fixes the least-broken instances and leaves the worst alone.

    This is a **visual change to Modes 1 and 2**, both already approved, so it needs sign-off before it lands. Worth noting the mini-charts are simultaneously the worst-contrast and best-legibility instances of the token: they render at roughly 0.79 scale where Mode 2's panels render near 0.5, because 380-unit viewBoxes scale less in the same column than 620–700-unit ones.

### Task 5

36. **Task 5's own brief carried a stale instruction copied from Task 4.** Step 10 asked to record "the two arrays copied out of Mode 2 (`mConc`, `mShare`)" — that correction was already made and recorded in Task 4's Deviations (#29) and Task 5 touches neither array. Noted here rather than silently ignored, since the brief says to record what differed from the plan text and this line simply did not apply to this task.

37. **The log's outcome colours used saturated fill tokens directly — the exact defect class this file's token-discipline notes warn against.** The plan's CSS had `.o-open{color:var(--art-warn)}`, `.o-wait{color:var(--art-derived)}`, `.o-done{color:var(--art-good)}` — fills, not the `-ink` text variants. Task 5's own brief explicitly calls this out ("use the -ink variants and measure them"), so this was corrected before shipping rather than after: `.o-open` → `--art-warn-ink`, `.o-wait` → `--art-derived-ink`, `.o-done` → `--art-good-ink`. `.o-moot` was left on `--art-faint`, which is already a text-appropriate token and sits on 12.5px text (at or above the file's 12px floor for that token).

38. **Step 8b's own prescribed fix fails the contrast bar it exists to clear, and the failure only shows up once you composite `opacity` into the measurement.** The plan's replacement CSS sets Mode 2/3's pressed sub-text to opaque `#FFFFFF`. Measured against the actual pressed backgrounds — `--art-imagined` `#9F56FF` and `--art-accent` `#FF5825`, neither redefined in the dark theme — opaque white gives **4.00:1** and **3.15:1**. Both fail AA at 10px/12px (neither qualifies as "large text"). The plan's own worked example for Mode 1 correctly composited its `opacity:.82` against the pressed background; the replacement rule for Modes 2/3 set `opacity:1` but then picked a colour as if the surface were still dark, when both saturated hues are close enough to white in relative luminance that light text loses more contrast than it gains. Opaque **black** measures 5.25:1 (imagined) and 6.67:1 (accent) — both pass, and because neither background token is redefined for dark, one colour choice covers both themes. Shipped `#000000` in place of `#FFFFFF` for the Mode 2/3 override, with the reasoning recorded in a code comment so a future pass doesn't get flipped back on a hunch.

39. **A second, unscoped instance of the identical bug, fixed alongside it.** `.m-t` (the button's title line, not touched by Step 8b's selector) inherits its pressed-state colour from `.modes button[aria-pressed="true"]{color:var(--art-canvas)}` with no per-mode override — the same fixed near-white value, on the same two backgrounds, with the same 4.00:1/3.15:1 failure, on 15px bold text (still not "large text" by the 18.66px/14pt-bold threshold). Left alone, the fix would have corrected the two smaller lines of a pressed Mode 2/3 button while leaving its largest, most prominent line failing AA. Extended the same `#000000` override to `.m-t` for Modes 2/3, noted as scope creep beyond the literal brief but justified by being the identical defect the step was already fixing.

40. **The step's own verification snippet cannot see the bug it's checking for.** Both the light- and dark-theme measurement scripts in the brief set `data-mode` directly via `root.setAttribute(...)` without calling the page's real `setMode()` — which is also what updates `aria-pressed` on the mode buttons. Since `.modes button[aria-pressed="true"]` never changes target under direct attribute writes (it stays pinned to whichever button last received a real click — Mode 1's, on a fresh load), the snippet measures Mode 1's own button rendered under a foreign `[data-mode="next"/"decide"]` ancestor context, not each mode's actual button. It happens to read the right *background* (the CSS selector matches on the ancestor's `data-mode` regardless of which button is "pressed"), which is why the bug is easy to miss — but the `.m-k`/`.m-d`/`.m-t` text and its computed colour belong to Mode 1's DOM node throughout all three iterations. Re-ran every contrast measurement using real `.click()` on each `.modes button[data-m="…"]`, confirmed by reading back each button's own `.m-k` label text before trusting its colour. All nine ratios reported below come from the click-based version.

41. **Real-pointer status-cycling verification (Step 7) matched Steps 1/6's synthetic-click predictions exactly** — `Not started → Scheduled → Awaiting client → Closed → Moot → Not started`, health-strip counts `3 due → 2 due` / `0 closed → 1 closed` on the third real click, and a highlighted log row appeared each time. No divergence between synthetic and real input was found for this interaction, unlike the coordinate-scaling issue flagged in Task 2's deviations — screenshot-to-viewport ratio was 1:1 this session (800×426 screenshot for an 844×450 viewport), confirmed with a temporary capture-phase click listener before trusting each click.

### Task 5 review round — four Important, six Minor

42. **Important 1 — the tray deep link dropped the focus half of Task 4's own fix.** `.m3-ev-row`'s handler was a near-copy of `.dec-dlink`'s that kept the mode-switch and scroll but not the `tabindex`/`focus()` pair, so a keyboard user activating a tray row lost focus to `<body>` — the exact regression the comment on `.dec-dlink` exists to prevent. Extracted both handlers' shared body into one `deepLink(panelId)` function; both `document.addEventListener` callbacks now just resolve their id and call it. Verified on a deferred tick (`setTimeout(...,0)`, since a synchronous read is misleading — focus doesn't land until the next task): both entry points now land on the target panel's `.w` wrapper.

43. **Important 2 — `.o-moot` repointed to `--art-muted`, and folded together with Minor 5's five-state remap.** The chip already rendered `Moot` in `--art-muted` with a strikethrough; the log rendered the same word in `--art-faint` with no strikethrough — same status, same commit, two different appearances. `--art-faint` also measured 3.44:1/4.08:1 (worse on the `.is-new` highlight), but the deciding argument was consistency, not the ratio: the token is a "worse below 12px" caution, not a "passes above 12px" clearance, and this is 12.5px bold, well under the 18.66px large-text floor. Repointed `.o-moot` to `--art-muted` with `text-decoration:line-through` added, matching the chip exactly. Folded in Minor 5 at the same time: `CLS` had collapsed `Not started` and `Scheduled` onto one `o-open` class, so a card the board hadn't touched yet showed amber in the log and neutral on its own chip. Added `.o-none{color:var(--art-muted)}` and remapped `'Not started':'o-none'`, leaving `Scheduled` as the sole `o-open`. All five states now share one colour token between chip and log, confirmed programmatically by cycling D1 through all five states and comparing `getComputedStyle(...).color` pairwise (all five matched). `.m3-log th` was deliberately left alone — it's the file's established column-label idiom (shared with `.src`/`.tile-k`/`.foot`), not a status value, and belongs with the recorded token-level follow-up (#35), not a per-site patch.

44. **Important 3 — `.is-new` now single-occupancy.** `logRow` set the class on every generated row and never cleared the previous one, so six clicks meant six highlighted rows and the affordance stopped meaning "newest." Added a `body.querySelector('tr.is-new')` lookup (not a loop — the invariant is "at most one") that clears the previous row before the new one is marked. Verified with ten clicks across all seven chips: `isNewCount` stayed at exactly 1 throughout.

45. **Important 4 — neither consequence of a click was ever on screen, which undercut the mode's own thesis.** Added a `<span class="m3-chip-h" data-live aria-live="polite">` to every card's `.dec-status` (empty at init, six of seven), and had `recount()` **return** the due count instead of only writing to the DOM, so `cycleStatus` can drop `'logged · '+due+' due'` into the clicked card's own live span with no extra DOM read. This closes the loop at the point of the click instead of requiring a scroll to the health strip (up to 1806px away) or the log (up to 1848px away) to see either consequence, and gives screen-reader users something too, where before there was nothing. Verified at 375px that the span's text change causes zero horizontal shift (`scrollWidth` identical before/after a click).

46. **Minor 7 resolved as a side effect of Important 4.** D6 shipped with a static, unconditional `stalled 7 days` in the same slot the live span now occupies — cycle D6 to `Closed` and the strip would read `0 stalled` while the card still claimed otherwise, a real contradiction between two pieces of the same UI. Used D6's live span for that claim instead of a plain string: it ships as the initial content (identical rendered text at load), and the first click on D6's own chip overwrites it with the same `'logged · N due'` confirmation every other card gets. Verified via a real click: D6's span read `stalled 7 days` before, `logged · 2 due` after (screenshot-confirmed), so the two can no longer disagree.

47. **Minor 6 — log capped at six generated rows, seeds permanently exempt.** `logRow` now tags every row it writes with `data-gen="1"`; a determined clicker pushes `body.querySelectorAll('tr[data-gen]')` past `LOG_CAP=6` and the **oldest generated row** (not the oldest row overall) is evicted. The four hand-authored seed rows carry no `data-gen` attribute and are therefore never candidates for eviction, regardless of click count — verified with ten clicks across all seven chips: 6 generated rows, all 4 seeds present by exact text match, including the `Coach Daniel` `Moot` row that is the editorial point of the mode.

48. **Minor 8 — `.m3-ev-row span`'s "Mode 2 →" label was the same new-rule `--art-faint` failure as `.o-moot`,** and it's the only text on the row saying where the click goes. Repointed to `--art-muted`; measured 6.90:1 light / 7.08:1 dark against the tray's actual rendered background (walked up the ancestor chain to the nearest non-transparent `background-color`, since `.m3-ev-row` itself is `background:none` — the table/row elements are transparent by design and the colour that actually renders behind the text is `--art-surface` one level up).

49. **Minor 9 — introduced `--art-on-saturated` and moved the pressed-state colour to the button, not its children.** `.modes button[aria-pressed="true"]{color:var(--art-canvas)}` still applied to the pressed button itself for Modes 2/3 (nothing reads it today beyond what `.m-k`/`.m-d`/`.m-t` already override, but anything added to that button later would silently inherit the failing near-white value). Added `--art-on-saturated:#000000` as a named token (documented in place, next to where a reader would look for "why black") and set it once on `:is([data-mode="next"],[data-mode="decide"]) .modes button[aria-pressed="true"]`; `.m-t` now inherits it for free rather than needing to be listed, and `.m-k`/`.m-d` keep one explicit override each because they declare their own colour/opacity that inheritance can't reach through. Re-measured all nine ratios post-refactor via real `.click()` on each mode button — identical to the pre-refactor values (12.79/5.25/6.67 light; 9.87/5.25/6.67 dark), confirming the `:is()` merge changed nothing about which rule wins.

50. **Minor 10 — `chipHandle` now falls back to the card's own heading instead of trusting `.dec-ev`'s `aria-label` unconditionally.** A reworded or deleted Evidence label would previously have broken every chip's accessible name silently at init, in a feature nobody touched. `chipHandle` now checks the label matches the expected `"Evidence — …"` shape before trusting it, and falls back to `.dec-h`'s text otherwise — same content either way today (Task 3 review already established the visible-text-is-a-prefix invariant), but no longer a single point of failure across features.

**Skipped, per instruction:** lightening `--art-imagined` — touches Mode 2's already-approved chrome and stays bundled with the recorded token-level follow-up (#35) rather than landing piecemeal here.

**Full verification matrix re-run after all of the above**, all nine checks pass; full JSON, the nine mode-button ratios, the `.o-none`/`.o-moot`/`.m3-ev-row span` contrast figures (6.90–8.65:1 across both themes and the `.is-new` overlay), the accessible-name census (0 duplicates), and confirmation of seed-row survival are recorded in the task's completion report rather than duplicated here.
