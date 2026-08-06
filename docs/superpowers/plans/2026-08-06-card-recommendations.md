# Card Recommendations + Next-Best-Action CTAs Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a one-line "Collabrium recommends" coaching line plus a next-best-action CTA to highlight cards 1–5 in `pages/app-shell-intro.html`, per `docs/superpowers/specs/2026-08-06-card-recommendations-design.md` (card 6, the AI card, is already the pattern's archetype and stays untouched).

**Architecture:** One new page-local class (`.c-hcard-rec`) for the recommendation line, reuse of the existing `.c-hcard-cta` text-arrow recipe for the five new/updated CTAs, and per-card markup insertions. No DS files change; no JS changes — the skeleton loader, entrance, fan layout, and tilt all operate on card *children generically* and need no modification.

**Tech Stack:** Static HTML/CSS (design tokens from `collabrium-dls/tokens.css`, read-only), verified in-browser via the Browser pane tools. There is no test suite — "testing" is computed-style/DOM assertions plus screenshots, matching every prior pass on this page.

**Context for a fresh engineer:**
- Working dir: `/Users/kwlkokho/Documents/GitHub/Collabrium-DS/.worktrees/app-shell-intro-page` (git worktree, branch `app-shell-intro-page`).
- `collabrium-dls/` is **strictly off-limits** — never modify it.
- Dev server: `http://localhost:8791/pages/app-shell-intro.html` (python3 http.server on port 8791; if not running, start via the `.claude/launch.json` config named `app-shell-intro-page`).
- The six cards live in `.c-card-slider-track` (markup ~lines 533–600). Cards are flex-column (`.c-card` from the DS: `display:flex; flex-direction:column`) with a page-local 12px gap and 24px padding (`.c-card-slide` override).
- The page's own `<style>` block loads AFTER `components.css`, so page-local rules that tie DS rules on specificity win by source order — this is documented and relied on throughout the file.
- Several existing card elements use `margin-top:auto` as bottom anchors (`.c-hcard-gauge`, `.c-hcard-sparkline`, `.c-hcard-tag`, `.c-hcard-bar`, `.c-hcard-cta`, `.c-hcard-cta-btn`). Two consecutive `margin-top:auto` items SPLIT the free space between them — the plan avoids ever having two autos in a row in one card.
- Browser-pane caveat: the sandboxed pane runs pages as `document.hidden` with no rAF, so Motion springs (card tilt) don't visibly animate there. Verify with computed styles/DOM, not by watching animations.

---

### Task 1: `.c-hcard-rec` CSS + Card 1 (Pipeline)

**Files:**
- Modify: `pages/app-shell-intro.html` (the `<style>` block's highlight-cards section, and Card 1's markup)

- [ ] **Step 1: Add the recommendation-line CSS**

Find this existing rule in the highlight-cards CSS section (Card 1's block):

```css
  .c-hcard-cta{margin-top:auto; display:flex; align-items:center; gap:var(--spacing-4); font-size:var(--text-label2-size); font-weight:700; color:var(--color-neutral-9);}
```

Insert immediately AFTER it:

```css
  /* Recommendation line — "Collabrium speaking," per the 2026-08-06
     card-recommendations spec: every card completes insight →
     recommendation → CTA. Caption-size Neutral-5 with a ✨ lead-in
     glyph (in the markup, not a ::before — it's content, screen
     readers should read it in flow). Deliberately NOT a coloured
     background or border: the accent-as-signal rule keeps colour
     reserved for the risk/positive/AI accents already in play. When a
     CTA directly follows a rec line they pair tightly (gap minus 8px
     = 4px net, the same pairing rule as headline + support) — and
     that fixed margin also neutralizes .c-hcard-cta's own
     margin-top:auto, which matters because two consecutive
     margin-top:auto flex items would otherwise SPLIT the card's free
     space between them instead of pushing both to the bottom. On
     Card 1 the rec line itself is the bottom anchor (margin-top:auto
     via the .c-hcard-list + sibling rule); on cards 2–5 an earlier
     element (gauge/sparkline/tag/bar) already anchors, so the rec
     just flows after it. */
  .c-hcard-rec{display:block; font-size:var(--text-caption-size); line-height:var(--text-caption-lh); color:var(--color-neutral-5);}
  .c-hcard-list + .c-hcard-rec{margin-top:auto;}
  .c-hcard-rec + .c-hcard-cta{margin-top:calc(-1 * var(--spacing-8));}
```

- [ ] **Step 2: Update Card 1's markup**

Find Card 1 (first `.c-card.c-card-slide` in `.c-card-slider-track`):

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

Replace the last line (the `.c-hcard-cta` span) with:

```html
              <span class="c-hcard-rec">✨ Start with MediaCorp — it's been quiet longest (12d).</span>
              <span class="c-hcard-cta">Nudge MediaCorp <i class="ph ph-arrow-right"></i></span>
```

- [ ] **Step 3: Verify in-browser**

Reload `http://localhost:8791/pages/app-shell-intro.html`, wait ~6s for the skeleton phase to resolve, then run in the browser JS tool:

```js
(() => { const c = document.querySelectorAll('.c-card-slide')[0];
  const rec = c.querySelector('.c-hcard-rec'), cta = c.querySelector('.c-hcard-cta');
  const rcs = getComputedStyle(rec), ccs = getComputedStyle(cta);
  return { recText: rec.textContent.slice(0,20), ctaText: cta.textContent.trim(),
    recSize: rcs.fontSize, recColor: rcs.color, ctaMarginTop: ccs.marginTop,
    recIsSecondToLast: c.children[c.children.length-2] === rec,
    ctaIsLast: c.children[c.children.length-1] === cta }; })()
```

Expected: `recSize` 12px, `recColor` the Neutral-5 grey (`rgb(90, 90, 90)`), `ctaMarginTop` `-8px`, `ctaText` "Nudge MediaCorp", rec second-to-last child, CTA last child. Screenshot to confirm the rec+CTA sit together at the card's bottom.

- [ ] **Step 4: Commit**

```bash
git add pages/app-shell-intro.html
git commit -m "feat: recommendation line + specific CTA on Pipeline card

.c-hcard-rec (caption/Neutral-5, ✨ lead-in in content) per the
card-recommendations spec; rec+CTA pair at 4px and the fixed pair
margin neutralizes .c-hcard-cta's margin-top:auto so the card never
has two auto anchors. Card 1's CTA goes from generic 'Follow up' to
'Nudge MediaCorp'."
```

---

### Task 2: Cards 2 (At risk) + 3 (Pace)

**Files:**
- Modify: `pages/app-shell-intro.html` (Card 2 and Card 3 markup only — Task 1's CSS already covers styling)

- [ ] **Step 1: Update Card 2's markup**

Find Card 2:

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

Insert after the closing `</svg>` tag (the gauge keeps its `margin-top:auto` anchor; rec/CTA flow after it on the shared gap):

```html
              <span class="c-hcard-rec">✨ Renewal is in 21 days — a save call this week beats a discount later.</span>
              <span class="c-hcard-cta">Book save call <i class="ph ph-arrow-right"></i></span>
```

- [ ] **Step 2: Update Card 3's markup**

Find Card 3:

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

Insert after the closing `</svg>` tag (sparkline keeps its `margin-top:auto` anchor, staying above the rec/CTA cluster):

```html
              <span class="c-hcard-rec">✨ Two deals close this week — land them and October starts ahead too.</span>
              <span class="c-hcard-cta">See closing deals <i class="ph ph-arrow-right"></i></span>
```

- [ ] **Step 3: Verify in-browser**

Reload, wait ~6s, then:

```js
(() => [1,2].map(i => { const c = document.querySelectorAll('.c-card-slide')[i];
  const rec = c.querySelector('.c-hcard-rec'), cta = c.querySelector('.c-hcard-cta');
  return { card: i+1, rec: rec.textContent.slice(0,14), cta: cta.textContent.trim(),
    ctaLast: c.children[c.children.length-1] === cta,
    pairGap: cta.getBoundingClientRect().top - rec.getBoundingClientRect().bottom > 0 }; }))()
```

Expected: card 2 CTA "Book save call", card 3 CTA "See closing deals", `ctaLast` true on both. Screenshot: on Card 2 the gauge sits above the rec/CTA cluster; on Card 3 the sparkline sits above the rec/CTA cluster; nothing overflows the 400px min-height cards (they grow if needed — flex column, min-height not fixed height).

- [ ] **Step 4: Commit**

```bash
git add pages/app-shell-intro.html
git commit -m "feat: recommendation + CTA on At-risk and Pace cards

'Book save call' (churn-save play, time-boxed) and 'See closing
deals' (protect-the-lead framing — the recommendation for when
things are GOOD). Gauge/sparkline keep their margin-top:auto anchors
so each card still has exactly one auto anchor."
```

---

### Task 3: Cards 4 (Upsell) + 5 (SEA team)

**Files:**
- Modify: `pages/app-shell-intro.html` (Card 4/5 markup + one Card-5 CSS rule)

- [ ] **Step 1: Update Card 4's markup**

Find Card 4:

```html
            <div class="c-card c-card-slide">
              <span class="c-hcard-label">Upsell</span>
              <div class="c-hcard-thumb">
                <i class="ph-fill ph-play-circle"></i>
                <span class="c-badge c-badge-neutral">2.3x ROAS</span>
              </div>
              <h4>TrendCafe is crushing it 🚀</h4>
              <span class="c-hcard-tag">via Collab Influencers</span>
            </div>
```

Insert after the `.c-hcard-tag` span (the tag keeps its `margin-top:auto` anchor):

```html
              <span class="c-hcard-rec">✨ 3 of your clients fit the same influencer playbook.</span>
              <span class="c-hcard-cta">Clone this pitch <i class="ph ph-arrow-right"></i></span>
```

- [ ] **Step 2: Add Card 5's CTA alignment rule**

Find this rule in the Card 5 CSS section:

```css
  .c-hcard-team{align-items:center; text-align:center;}
```

Insert immediately AFTER it:

```css
  /* Per the card-recommendations spec, the Team card keeps its
     centered layout EXCEPT the terminal CTA, which left-aligns like
     every other card's terminal element. (The rec line above it stays
     centered with the rest of the card.) */
  .c-hcard-team .c-hcard-cta{align-self:flex-start; text-align:left;}
```

- [ ] **Step 3: Update Card 5's markup**

Find Card 5:

```html
            <div class="c-card c-card-slide c-stat c-hcard-team">
              <span class="c-stat-label">SEA team</span>
              <div class="c-stat-value hero">#2</div>
              <p>this month</p>
              <div class="c-hcard-avatars">
                <span class="c-userpicker-avatar c-hcard-avatar">JL</span>
                <span class="c-userpicker-avatar c-hcard-avatar">KW</span>
                <span class="c-userpicker-avatar c-hcard-avatar">SM</span>
                <span class="c-userpicker-avatar c-hcard-avatar">BW</span>
              </div>
              <div class="c-hcard-bar"><div class="c-hcard-bar-fill"></div></div>
              <span class="c-hcard-barlabel">RM120K behind #1</span>
            </div>
```

Insert after the `.c-hcard-barlabel` span (the bar keeps its `margin-top:auto` anchor; barlabel and rec/CTA flow after it). Note the CTA text is deliberately the same action as the AI card — two cards converging on one next best action is the spec's "platform understands you" story:

```html
              <span class="c-hcard-rec">✨ Closing PetronasBiz (RM150K) takes #1.</span>
              <span class="c-hcard-cta">Draft outreach <i class="ph ph-arrow-right"></i></span>
```

- [ ] **Step 4: Verify in-browser**

Reload, wait ~6s, then:

```js
(() => [3,4].map(i => { const c = document.querySelectorAll('.c-card-slide')[i];
  const rec = c.querySelector('.c-hcard-rec'), cta = c.querySelector('.c-hcard-cta');
  return { card: i+1, cta: cta.textContent.trim(), ctaLast: c.children[c.children.length-1] === cta,
    ctaAlign: getComputedStyle(cta).alignSelf, ctaOffsetLeft: cta.offsetLeft }; }))()
```

Expected: card 4 CTA "Clone this pitch" (`ctaAlign` may be normal/stretch — fine); card 5 CTA "Draft outreach" with `ctaAlign` `flex-start` and `ctaOffsetLeft` 24 (the card's padding — i.e. genuinely left-aligned despite the centered card). Screenshot both cards.

- [ ] **Step 5: Commit**

```bash
git add pages/app-shell-intro.html
git commit -m "feat: recommendation + CTA on Upsell and Team cards

'Clone this pitch' (replicate the cross-engine win) and 'Draft
outreach' — deliberately the same action as the AI card, two cards
converging on one next best action per the spec. Team card keeps its
centered layout except the CTA, which left-aligns like every other
card's terminal element."
```

---

### Task 4: Final verification pass

**Files:**
- Modify: none expected (fix-forward only if a check fails)

- [ ] **Step 1: Full-row verification**

Reload, wait ~6s, then:

```js
(() => { const cards=[...document.querySelectorAll('.c-card-slide')];
  return { recCount: document.querySelectorAll('.c-hcard-rec').length,
    ctaCount: document.querySelectorAll('.c-hcard-cta').length,
    aiUnchanged: cards[5].querySelector('.c-hcard-rec') === null && cards[5].querySelector('.c-hcard-cta-btn') !== null,
    aiBtnLast: cards[5].children[cards[5].children.length-1] === cards[5].querySelector('.c-hcard-cta-btn'),
    skeletonsGone: document.querySelectorAll('.c-hcard-skeleton').length === 0,
    tiltEnabled: cards.every(c=>!!c.dataset.tiltEnabled),
    noOverflow: (() => { const s=document.getElementById('cardSlider'); return s.scrollHeight === s.clientHeight; })() }; })()
```

Expected: `recCount` 5, `ctaCount` 5, `aiUnchanged` true, `aiBtnLast` true, `skeletonsGone` true, `tiltEnabled` true, `noOverflow` true (cards may have grown taller than 400px — that's allowed, min-height not fixed — but the slider must not be vertically clipping; if `noOverflow` is false, increase `.c-card-slider-track`'s bottom padding until it's true).

Also check `read_console_messages` for errors (expect none) and take a final screenshot of both ends of the row (scroll the slider to 0 and to max).

- [ ] **Step 2: Commit (only if fixes were needed)**

```bash
git add pages/app-shell-intro.html
git commit -m "fix: <describe the specific final-pass fix>"
```

---

## Self-review notes

- **Spec coverage:** copy table → Tasks 1–3 (all five rec lines + CTAs verbatim from spec); CTA treatment (text links, AI button unique) → `.c-hcard-cta` reuse + Task 4's `aiUnchanged` check; rec styling (✨/caption/Neutral-5, no tint) → Task 1 CSS; Team CTA left-align exception → Task 3 Step 2; placement/terminal rules → per-task `ctaLast` checks; non-goals (no routing, no mechanics changes) → no JS touched anywhere.
- **Placeholder scan:** none — every step has exact code/commands.
- **Consistency:** `.c-hcard-rec`/`.c-hcard-cta` names used identically across tasks; the "one auto anchor per card" rule is stated once and respected in every card's markup order.
