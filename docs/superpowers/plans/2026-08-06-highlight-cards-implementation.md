# Highlight Cards Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fill the App Shell's 6 empty `.c-card-slide` placeholders with real, personalized "next best action" content for Bryan (sales rep persona), each in its own distinct visual shape, per the approved spec.

**Architecture:** Single-file static page (`pages/app-shell-intro.html`) — no build step, no framework, no test runner. Every task edits this one file: a CSS addition to the page's existing `<style>` block, then an HTML replacement of one of the six `<div class="c-card c-card-slide"></div>` placeholders. "Tests" in this codebase are manual browser verification (the pattern already used for every prior change on this page this session) — `getBoundingClientRect()`/computed-style checks via the Browser pane's `javascript_tool`, plus a screenshot — not an automated suite, because none exists on this page.

**Tech Stack:** HTML/CSS/vanilla JS, Collabrium DLS tokens (`collabrium-dls/tokens.css`) and components (`collabrium-dls/components.css`, read-only — never modified), Phosphor Icons (`ph`/`ph-fill`, already linked in `<head>`).

**Reference:** `docs/superpowers/specs/2026-08-06-highlight-cards-design.md` — the approved design this plan implements.

---

## Before you start

Read `pages/app-shell-intro.html` once, focused on two regions:
- The `<style>` block around the existing `.c-card-slide` rules (search for `.c-card-slide{flex:0 0 340px`) — every task's CSS goes right after that rule's block.
- The six placeholder divs (search for `c-card-slider-track`) — every task replaces exactly one of the six `<div class="c-card c-card-slide"></div>` lines, in top-to-bottom order.

Do not touch `collabrium-dls/tokens.css` or `collabrium-dls/components.css`. Every class from those files used below (`.c-badge`, `.c-tag`, `.c-stat*`) is used as-is, unmodified.

---

### Task 1: Foundation styles + Card 1 (Pipeline hygiene)

**Files:**
- Modify: `pages/app-shell-intro.html` (style block — insert after the `.c-card-slide.is-revealed{...}` rule; markup — replace the *first* empty card div)

- [x] **Step 1: Add the foundation comment + Card 1's CSS**

Find this exact line in the `<style>` block:

```css
  .c-card-slide.is-revealed{opacity:1; transform:translateY(0);}
```

Insert immediately after it (before the blank line and the `/* Main nav — ...` comment that follows):

```css

  /* ---- Highlight cards: personalized "next best action" content for
     the card slider (see docs/superpowers/specs/2026-08-06-highlight-
     cards-design.md for the approved design). Six cards, six distinct
     internal layouts ("shapes") that match what each one is actually
     saying, sharing one language: .c-card's own bg/border/radius-lg/
     shadow-1/padding-16/gap-8 recipe is reused as-is (these rules only
     add each card's *internal* layout), plus collabrium-dls's own
     .c-badge/.c-tag/.c-stat* components wherever a card is genuinely
     that kind of thing (Pace and Team below are Stat/KPI cards in
     spirit, so they reuse .c-stat directly rather than reinventing
     it). The other four cards define one page-local eyebrow class,
     .c-hcard-label, matching the *recipe* every other DS component's
     own label already uses (caption/700/tracking-eyebrow/uppercase/
     Neutral-5) — deliberately not reusing .c-stat-label cross-
     component, since the DS's own convention (SidebarNav's section
     label, MultiSelect's group label, ElBadge's name label) is that
     each component re-implements this recipe locally rather than
     sharing one class across unrelated components. */
  .c-hcard-label{font-size:var(--text-caption-size); font-weight:700; letter-spacing:var(--tracking-eyebrow); text-transform:uppercase; color:var(--color-neutral-5);}

  /* Card 1/6 — Pipeline hygiene: list-shaped, ends in a text CTA. */
  .c-hcard-list{display:flex; flex-direction:column;}
  .c-hcard-list-row{display:flex; align-items:center; justify-content:space-between; gap:var(--spacing-12); padding:var(--spacing-8) 0; border-top:1px solid var(--color-neutral-2); font-size:var(--text-body2-size); color:var(--color-neutral-9);}
  .c-hcard-list-row:first-child{border-top:none;}
  .c-hcard-cta{margin-top:auto; display:flex; align-items:center; gap:var(--spacing-4); font-size:var(--text-label2-size); font-weight:700; color:var(--color-neutral-9);}
```

- [x] **Step 2: Replace the first placeholder card**

Find (the *first* occurrence, inside `.c-card-slider-track`):

```html
            <div class="c-card c-card-slide"></div>
```

Replace just that first occurrence with:

```html
            <div class="c-card c-card-slide">
              <span class="c-hcard-label">Pipeline</span>
              <h4>3 deals need a nudge</h4>
              <div class="c-hcard-list">
                <div class="c-hcard-list-row"><span>MediaCorp</span><span class="c-badge c-badge-warning">12d stalled</span></div>
                <div class="c-hcard-list-row"><span>Genting F&amp;B</span><span class="c-badge c-badge-warning">7d stalled</span></div>
                <div class="c-hcard-list-row"><span>AirAsia Retail</span><span class="c-badge c-badge-warning">5d stalled</span></div>
              </div>
              <span class="c-hcard-cta">Follow up <i class="ph ph-arrow-right"></i></span>
            </div>
```

Leave the other five `<div class="c-card c-card-slide"></div>` lines untouched — later tasks replace them one at a time.

- [x] **Step 3: Verify in the browser**

Open the Browser pane at `http://localhost:8791/pages/app-shell-intro.html`, wait ~3s for the intro reveal, then run via `javascript_tool`:

```js
const card = document.querySelectorAll('.c-card-slide')[0];
const rect = card.getBoundingClientRect();
JSON.stringify({
  width: rect.width, height: rect.height,
  label: card.querySelector('.c-hcard-label')?.textContent,
  rows: card.querySelectorAll('.c-hcard-list-row').length,
  ctaAlignSelf: getComputedStyle(card.querySelector('.c-hcard-cta')).marginTop,
});
```

Expected: `width:340, height:400` (unchanged card footprint), `label:"Pipeline"`, `rows:3`. Then take a screenshot and confirm visually: three rows with amber "Nd stalled" chips that do **not** stretch full-width, and "Follow up →" sitting at the card's bottom edge.

- [x] **Step 4: Commit**

```bash
git add pages/app-shell-intro.html
git commit -m "feat: add highlight-card foundation styles + Pipeline card content

First of six personalized card-slide contents (see
docs/superpowers/specs/2026-08-06-highlight-cards-design.md). Adds the
shared .c-hcard-label eyebrow recipe plus Card 1 (Pipeline hygiene):
a list-shaped card ending in a text CTA, reusing collabrium-dls's own
.c-badge-warning for the stalled-deal chips.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

### Task 2: Card 2 (Client at risk)

**Files:**
- Modify: `pages/app-shell-intro.html` (style block — append after Card 1's CSS; markup — replace the second empty card div)

- [ ] **Step 1: Add Card 2's CSS**

Find the end of Card 1's CSS block (the last line should now be `.c-hcard-cta{margin-top:auto; ...}`) and insert immediately after it:

```css

  /* Card 2/6 — Client at risk: single-focus alert, warm elemental tint
     (Fire — per tokens.css's "elemental background tints... the ONLY
     permitted coloured backgrounds" rule, never an arbitrary or mid-
     strength fill), radial gauge. */
  .c-hcard-risk{background:var(--color-fire-bg); border-color:var(--color-fire-bg-strong);}
  .c-hcard-risk .c-hcard-label{color:var(--color-orange);}
  .c-hcard-gauge{margin-top:auto; align-self:center;}
```

- [ ] **Step 2: Replace the second placeholder card**

Find the (now only remaining) five `<div class="c-card c-card-slide"></div>` lines and replace the **first** of those five (i.e. the 2nd card overall) with:

```html
            <div class="c-card c-card-slide c-hcard-risk">
              <span class="c-hcard-label"><i class="ph-fill ph-warning"></i> At risk</span>
              <h4>Sunway Retail</h4>
              <p>Engagement down 30% · renews in 21 days</p>
              <svg class="c-hcard-gauge" viewBox="0 0 90 52" width="90" height="52" aria-hidden="true">
                <path d="M5 47 A40 40 0 0 1 85 47" style="stroke:var(--color-fire-bg-strong)" stroke-width="8" fill="none" stroke-linecap="round"/>
                <path d="M5 47 A40 40 0 0 1 58 12" style="stroke:var(--color-orange)" stroke-width="8" fill="none" stroke-linecap="round"/>
              </svg>
            </div>
```

- [ ] **Step 3: Verify in the browser**

Reload, wait for reveal, then:

```js
const card = document.querySelectorAll('.c-card-slide')[1];
JSON.stringify({
  bg: getComputedStyle(card).backgroundColor,
  title: card.querySelector('h4')?.textContent,
  gaugeWidth: card.querySelector('.c-hcard-gauge')?.getBoundingClientRect().width,
});
```

Expected: `bg` is the Fire tint (not white), `title:"Sunway Retail"`, `gaugeWidth:90` (not stretched to the card's full ~308px content width — confirms `align-self:center` took effect). Screenshot to confirm the warm background and the two-tone arc render correctly.

- [ ] **Step 4: Commit**

```bash
git add pages/app-shell-intro.html
git commit -m "feat: add Client-at-risk highlight card

Card 2/6. Single-focus alert card using the Fire elemental background
tint (the only permitted colour-fill mechanism per tokens.css) plus a
small inline radial gauge.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

### Task 3: Card 3 (Pace — centre card)

**Files:**
- Modify: `pages/app-shell-intro.html` (style block — append after Card 2's CSS; markup — replace the third empty card div)

- [ ] **Step 1: Add Card 3's CSS**

Insert after Card 2's CSS block (after the `.c-hcard-gauge{...}` line):

```css

  /* Card 3/6 — Pace (centre card): reuses collabrium-dls's own .c-stat
     component wholesale (.c-stat-label/.c-stat-value.hero/
     .c-stat-trend.up) rather than reinventing a "big number" card.
     Border emphasizes it as the row's anchor, per the approved
     design. .c-stat-trend has no background of its own, but it's
     still a flex item of a flex-column card with default
     align-items:stretch — align-self:flex-start keeps its box hugging
     its own content instead of invisibly reserving full card width. */
  .c-hcard-pace{border-color:var(--color-obsidian);}
  .c-hcard-pace .c-stat-trend{align-self:flex-start;}
  .c-hcard-sparkline{display:block; margin-top:auto; width:100%; height:36px;}
```

- [ ] **Step 2: Replace the third placeholder card**

Replace the (now only remaining) four `<div class="c-card c-card-slide"></div>` lines' **first** occurrence (i.e. the 3rd card overall) with:

```html
            <div class="c-card c-card-slide c-stat c-hcard-pace">
              <span class="c-stat-label">Pace</span>
              <div class="c-stat-value hero">RM2.4M</div>
              <p>MTD vs RM2.1M run-rate</p>
              <span class="c-stat-trend up">🎉 +14% ahead</span>
              <svg class="c-hcard-sparkline" viewBox="0 0 200 40" preserveAspectRatio="none" aria-hidden="true">
                <polyline points="0,32 30,28 60,30 90,20 120,22 150,10 180,14 200,4" fill="none" style="stroke:var(--color-green)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
```

- [ ] **Step 3: Verify in the browser**

Reload, wait for reveal, then:

```js
const card = document.querySelectorAll('.c-card-slide')[2];
const trend = card.querySelector('.c-stat-trend');
JSON.stringify({
  border: getComputedStyle(card).borderColor,
  value: card.querySelector('.c-stat-value')?.textContent,
  trendWidth: trend.getBoundingClientRect().width,
  cardContentWidth: card.getBoundingClientRect().width - 32, // minus 16px padding each side
});
```

Expected: `border` is Obsidian (near-black, not the default light Neutral-3), `value:"RM2.4M"`, and `trendWidth` noticeably smaller than `cardContentWidth` (confirms the pill isn't invisibly stretched full-width). Screenshot to confirm: this card visually reads as the anchor of the row (bordered), with the green sparkline sitting at the bottom edge.

- [ ] **Step 4: Commit**

```bash
git add pages/app-shell-intro.html
git commit -m "feat: add Pace highlight card (centre)

Card 3/6, the row's centre/anchor card per the approved design.
Reuses collabrium-dls's Stat/KPI card component (.c-stat/
.c-stat-value.hero/.c-stat-trend.up) directly rather than reinventing
a big-number layout, plus a bespoke inline sparkline.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

### Task 4: Card 4 (Cross-engine upsell)

**Files:**
- Modify: `pages/app-shell-intro.html` (style block — append after Card 3's CSS; markup — replace the fourth empty card div)

- [ ] **Step 1: Add Card 4's CSS**

Insert after Card 3's CSS block (after `.c-hcard-sparkline{...}`):

```css

  /* Card 4/6 — Cross-engine upsell: media-thumbnail-shaped, the one
     card whose content is pulled from a sister Collabrium engine
     (Influencers) rather than Sales itself — this is the card that
     couldn't exist without Collabrium being one platform across
     Studio/Sales/Influencers/Content. Fire-bg-strong (still an
     approved elemental tint, the "strong" step of it) stands in for a
     real campaign thumbnail image. */
  .c-hcard-thumb{position:relative; height:120px; margin-bottom:var(--spacing-4); border-radius:var(--radius-sm); background:var(--color-fire-bg-strong); display:flex; align-items:flex-end; padding:var(--spacing-8);}
  .c-hcard-thumb i{position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); font-size:32px; color:var(--color-orange);}
  .c-hcard-tag{display:block; margin-top:auto; font-size:var(--text-caption-size); font-weight:700; color:var(--color-orange);}
```

- [ ] **Step 2: Replace the fourth placeholder card**

Replace the (now only remaining) three `<div class="c-card c-card-slide"></div>` lines' **first** occurrence (i.e. the 4th card overall) with:

```html
            <div class="c-card c-card-slide">
              <div class="c-hcard-thumb">
                <i class="ph-fill ph-play-circle"></i>
                <span class="c-badge c-badge-neutral">2.3x ROAS</span>
              </div>
              <h4>TrendCafe is crushing it 🚀</h4>
              <span class="c-hcard-tag">via Collab Influencers</span>
            </div>
```

- [ ] **Step 3: Verify in the browser**

Reload, wait for reveal, then:

```js
const card = document.querySelectorAll('.c-card-slide')[3];
const badge = card.querySelector('.c-badge');
const thumb = card.querySelector('.c-hcard-thumb').getBoundingClientRect();
JSON.stringify({
  title: card.querySelector('h4')?.textContent,
  thumbHeight: thumb.height,
  badgeBottom: badge.getBoundingClientRect().bottom,
  thumbBottom: thumb.bottom,
});
```

Expected: `title` contains "TrendCafe", `thumbHeight:120`, and `badgeBottom` very close to `thumbBottom` (within ~10px — confirms the "2.3x ROAS" badge sits at the *bottom* of the thumbnail, not the top, i.e. `align-items:flex-end` on `.c-hcard-thumb` worked and wasn't overridden). Screenshot to confirm the warm thumbnail block with the centered play icon and the bottom-left stat badge.

- [ ] **Step 4: Commit**

```bash
git add pages/app-shell-intro.html
git commit -m "feat: add Cross-engine upsell highlight card

Card 4/6. Media-thumbnail-shaped card surfacing a stat from a sister
Collabrium engine (Influencers) inside Bryan's Sales view — the card
that most directly demonstrates the 'collaboration understands you'
premise, per the approved design.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

### Task 5: Card 5 (Team standing)

**Files:**
- Modify: `pages/app-shell-intro.html` (style block — append after Card 4's CSS; markup — replace the fifth empty card div)

- [ ] **Step 1: Add Card 5's CSS**

Insert after Card 4's CSS block (after `.c-hcard-tag{...}`):

```css

  /* Card 5/6 — Team standing: also a Stat/KPI card in spirit (reuses
     .c-stat + .c-stat-label + .c-stat-value.hero for "#2"), centered
     rather than left-aligned since it's a single hero figure. Avatar
     stack and progress bar have no equivalent yet in collabrium-dls,
     so they're page-local, same as the gauge/sparkline above. */
  .c-hcard-team{align-items:center; text-align:center;}
  .c-hcard-avatars{display:flex; margin:var(--spacing-16) 0 var(--spacing-8);}
  .c-hcard-avatar{width:28px; height:28px; border-radius:var(--radius-pill); background:var(--color-neutral-2); border:2px solid var(--color-neutral-1); margin-left:-8px; display:flex; align-items:center; justify-content:center; font-size:var(--text-caption-size); font-weight:700; color:var(--color-neutral-9);}
  .c-hcard-avatar:first-child{margin-left:0;}
  .c-hcard-bar{width:100%; height:6px; margin-top:auto; border-radius:var(--radius-pill); background:var(--color-neutral-2); overflow:hidden;}
  .c-hcard-bar-fill{width:72%; height:100%; background:var(--color-obsidian);}
  .c-hcard-barlabel{display:block; margin:var(--spacing-4) 0 0; font-size:var(--text-caption-size); color:var(--color-neutral-5);}
```

- [ ] **Step 2: Replace the fifth placeholder card**

Replace the (now only remaining) two `<div class="c-card c-card-slide"></div>` lines' **first** occurrence (i.e. the 5th card overall) with:

```html
            <div class="c-card c-card-slide c-stat c-hcard-team">
              <span class="c-stat-label">SEA team</span>
              <div class="c-stat-value hero">#2</div>
              <p>this month</p>
              <div class="c-hcard-avatars">
                <span class="c-hcard-avatar">JL</span>
                <span class="c-hcard-avatar">KW</span>
                <span class="c-hcard-avatar">SM</span>
                <span class="c-hcard-avatar">BW</span>
              </div>
              <div class="c-hcard-bar"><div class="c-hcard-bar-fill"></div></div>
              <span class="c-hcard-barlabel">RM120K behind #1</span>
            </div>
```

Note: `BW` deliberately matches Bryan Wong's own initials already shown in the sidebar's account avatar — he's one of the four dots in his own team's stack.

- [ ] **Step 3: Verify in the browser**

Reload, wait for reveal, then:

```js
const card = document.querySelectorAll('.c-card-slide')[4];
JSON.stringify({
  rank: card.querySelector('.c-stat-value')?.textContent,
  avatarCount: card.querySelectorAll('.c-hcard-avatar').length,
  barFillWidth: card.querySelector('.c-hcard-bar-fill').getBoundingClientRect().width,
  barWidth: card.querySelector('.c-hcard-bar').getBoundingClientRect().width,
});
```

Expected: `rank:"#2"`, `avatarCount:4`, and `barFillWidth` ≈ 72% of `barWidth`. Screenshot to confirm the whole card reads centered (rank number, "this month," avatar stack, and bar label all horizontally centered), with the overlapping avatar circles and the progress bar spanning full width regardless of the centered siblings.

- [ ] **Step 4: Commit**

```bash
git add pages/app-shell-intro.html
git commit -m "feat: add Team-standing highlight card

Card 5/6. Reuses .c-stat for the '#2' hero figure, centered rather
than left-aligned; adds a bespoke avatar stack and thin progress bar
(no equivalent exists yet in collabrium-dls). Bryan's own initials
(BW) are one of the four avatars, tying him into his own team's
standing.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

### Task 6: Card 6 (AI next-best-action — closing)

**Files:**
- Modify: `pages/app-shell-intro.html` (style block — append after Card 5's CSS; markup — replace the sixth, final empty card div)

- [ ] **Step 1: Add Card 6's CSS**

Insert after Card 5's CSS block (after `.c-hcard-barlabel{...}`):

```css

  /* Card 6/6 — AI next-best-action (closing): the deliberate outlier —
     the only dark card, signalling "this one's different in kind, not
     just in colour," per the approved design. Reasoning shown as
     .c-tag chips (reused as-is) instead of a paragraph. Both the
     h4-color and .c-tag overrides below match .c-card h4 / .c-tag's
     own specificity or exceed it, so they win regardless of source
     order — see this task's Step 3 for the live check anyway. */
  .c-hcard-ai{background:var(--color-obsidian); border-color:var(--color-obsidian);}
  .c-hcard-ai .c-hcard-label{color:var(--color-amber);}
  .c-hcard-ai h4{color:var(--color-neutral-1);}
  .c-hcard-ai .c-tag{background:rgba(255,255,255,.12); color:var(--color-neutral-1);}
  .c-hcard-tags{display:flex; flex-wrap:wrap; gap:var(--spacing-8);}
  .c-hcard-cta-btn{margin-top:auto; align-self:flex-start; border:none; border-radius:var(--radius-sm); background:var(--color-orange); color:var(--color-neutral-1); font-family:var(--font-primary); font-size:var(--text-label2-size); font-weight:700; padding:var(--spacing-8) var(--spacing-12); cursor:pointer; transition:opacity var(--duration-fast) var(--ease-standard);}
  .c-hcard-cta-btn:hover{opacity:.88;}
```

- [ ] **Step 2: Replace the sixth, final placeholder card**

Replace the last remaining `<div class="c-card c-card-slide"></div>` with:

```html
            <div class="c-card c-card-slide c-hcard-ai">
              <span class="c-hcard-label">🤖 Next best action</span>
              <h4>Call PetronasBiz</h4>
              <div class="c-hcard-tags">
                <span class="c-tag">Renews in 30d</span>
                <span class="c-tag">Budget opens next wk</span>
                <span class="c-tag">2 unopened proposals</span>
              </div>
              <button class="c-hcard-cta-btn" type="button">Draft outreach</button>
            </div>
```

At this point there should be zero remaining `<div class="c-card c-card-slide"></div>` empty placeholders in the file — confirm with:

```bash
grep -c '<div class="c-card c-card-slide"></div>' pages/app-shell-intro.html
```

Expected: `0`.

- [ ] **Step 3: Verify in the browser**

Reload, wait for reveal, then:

```js
const card = document.querySelectorAll('.c-card-slide')[5];
JSON.stringify({
  bg: getComputedStyle(card).backgroundColor,
  titleColor: getComputedStyle(card.querySelector('h4')).color,
  tagBg: getComputedStyle(card.querySelector('.c-tag')).backgroundColor,
  tagCount: card.querySelectorAll('.c-tag').length,
  btnWidth: card.querySelector('.c-hcard-cta-btn').getBoundingClientRect().width,
});
```

Expected: `bg` is the dark Obsidian color (not white), `titleColor` is white/near-white (not the default dark text — confirms the `.c-hcard-ai h4` override actually won the specificity tie), `tagBg` is a translucent white (not the default light-grey `.c-tag`), `tagCount:3`, and `btnWidth` well under the card's ~308px content width (confirms the button isn't stretched full-width). Screenshot to confirm the dark card with amber eyebrow, white title, translucent tag chips, and the orange "Draft outreach" button.

- [ ] **Step 4: Full-row screenshot**

Scroll/drag the card slider (or reduce browser zoom) to get all six cards in view in one screenshot if possible, or take two screenshots covering the full scroll width. Confirm the final left-to-right order matches the spec: Pipeline · At-risk · Pace (bordered, centre) · Upsell · Team · AI (dark, closing).

- [ ] **Step 5: Commit**

```bash
git add pages/app-shell-intro.html
git commit -m "feat: add AI next-best-action highlight card (closing)

Card 6/6, closing the row per the approved design. The only dark
card in the set — a deliberate visual outlier signalling this card
is a synthesis of the others, not just another metric. Reasoning
shown as three .c-tag chips instead of a paragraph, ending in a
filled CTA button.

All six card-slide placeholders are now filled; see
docs/superpowers/specs/2026-08-06-highlight-cards-design.md for the
full design this closes out.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

### Task 7: Final verification pass (no code changes)

**Files:** none — verification only.

- [ ] **Step 1: Reload fresh and let the full intro sequence play out**

Navigate to `http://localhost:8791/pages/app-shell-intro.html`, wait for the curtain/wipe/greeting/card-reveal sequence to fully finish (~3–4s), and confirm no console errors:

```
read_console_messages with onlyErrors: true
```

Expected: empty.

- [ ] **Step 2: Confirm all six cards structurally, in one pass**

```js
JSON.stringify(Array.from(document.querySelectorAll('.c-card-slide')).map(c => ({
  w: Math.round(c.getBoundingClientRect().width),
  h: Math.round(c.getBoundingClientRect().height),
  hasContent: c.children.length > 0,
})));
```

Expected: six entries, each `w:340, h:400, hasContent:true`.

- [ ] **Step 3: Spot-check drag/scroll and arrow-key navigation still work**

Click into the slider and press the right-arrow key twice via `computer` (`key` action, `ArrowRight`), then confirm `cardSlider.scrollLeft` increased. This confirms filling the cards with real content didn't break the existing slider mechanics (drag, scroll-snap, keyboard nav) from prior sessions.

- [ ] **Step 4: Screenshot for the record**

Take a final screenshot (or two, covering the full scrollable width) showing all six populated cards, for sharing with the user. No commit — this task produces no file changes.

---

## Self-review notes (from plan authoring)

- **Spec coverage:** All 6 cards from the spec are covered (Tasks 1–6), in the spec's confirmed final order (pipeline · at-risk · pace-centre · upsell · team · ai-closing). The spec's visual-system principles (consistent chrome via reused `.c-card`, accent-as-signal via `.c-hcard-risk`/`.c-hcard-ai`, six distinct internal shapes) are each implemented in their respective task.
- **A gotcha caught during planning, not left for live debugging:** `.c-card`/`.c-stat` are `display:flex; flex-direction:column` with no `align-items` override, so any direct-child flex item defaults to `align-items:stretch` (full card width). This plan explicitly opts out per element where the visual needs to hug its own content (`.c-hcard-gauge`, `.c-stat-trend` in the Pace card, `.c-hcard-cta-btn`) and explicitly relies on it elsewhere where full-width is correct (`.c-hcard-list`, `.c-hcard-tags`, `.c-hcard-bar`). Each affected task's verification step checks this directly via `getBoundingClientRect()` rather than assuming it.
- **Specificity note:** `.c-hcard-ai h4` and `.c-card h4` (from `components.css`) have equal specificity (one class + one type selector each); because the page's own `<style>` block is later in document order than the `components.css` `<link>`, the page-local rule wins — Task 6's verification step confirms this live rather than trusting the theory.
- **No placeholders:** every task's CSS and HTML is complete, copy-pasteable code — nothing marked TBD.
