# Highlight cards: personalized "next best action" content — design

**Date:** 2026-08-06
**Page:** `pages/app-shell-intro.html`
**Status:** Approved by user, pending implementation plan

## Goal

The App Shell's Content region currently has 6 blank `.c-card-slide` placeholders in
the card slider (`#cardSlider`). This spec fills them with realistic, personalized
content for one persona — **Bryan, a sales rep who sells media solutions to
clients** — to demonstrate that "collaboration understands you": the cards surface
contextual, next-best-action information, not generic filler.

This is a **content + visual-treatment** spec for the existing card slider. It does
not change the slider's mechanics (drag/scroll-snap/reveal-on-load JS), card count
(6), card footprint (340×400px, set in the previous session), or `.c-card` base
recipe from `components.css` (`collabrium-dls/` stays untouched, per project rule).

## Card set, in final order

Order was explicitly chosen by the user: pace sits at centre (position 3 of 6);
the AI card closes the row (position 6).

1. **Pipeline hygiene** — "3 deals need a nudge." List of stalled deals (MediaCorp
   12d, Genting F&B 7d, AirAsia Retail 5d) with a "Follow up →" CTA.
2. **Client at risk** — "Sunway Retail" flagged: engagement −30%, renews in 21
   days. Single-client alert card with a health gauge.
3. **Pace (centre card)** — "RM2.4M MTD vs RM2.1M run-rate — 🎉 +14% ahead."
   Big number + sparkline + status pill. This is the anchor/hero card of the row.
4. **Cross-engine upsell** — "TrendCafe is crushing it 🚀 — 2.3x ROAS," tagged
   "via Collab Influencers." The one card that couldn't exist without Collabrium
   being one platform across Studio/Sales/Influencers/Content — it pulls a stat
   from a sister engine into Bryan's Sales view.
5. **Team / social** — "#2 on the SEA team this month," RM120K behind #1, avatar
   stack + progress bar.
6. **AI next-best-action (closing)** — "🤖 Call PetronasBiz." Reasoning shown as
   three short tags (renews in 30d, budget opens next wk, 2 unopened proposals),
   not a paragraph. Closes the row as the synthesis of everything above it.

Client/company names are realistic placeholders (approved by user — "use real
name is fine," meaning realistic-sounding names, not a real client's confidential
data).

## Visual system

Approved via the brainstorming visual companion (mockup: `card-treatments-v3.html`,
saved under `.superpowers/brainstorm/` for reference — not committed, per that
directory's gitignore entry).

**What stays constant across all 6 cards** (the "one language" part):
- Same outer chrome as today's `.c-card`: large radius, `--shadow-1`/`--shadow-3`
  class of shadow, consistent internal padding rhythm on the 4px spacing scale.
- Same type scale: a small uppercase eyebrow label, one dominant headline
  treatment, one secondary/supporting text size — reused card to card even though
  what fills those slots differs.
- **Accent-as-signal, not decoration**: color is only used when it means something
  (green = ahead/positive, amber/orange = at-risk or attention, dark = "this is
  the AI/synthesis card"). No card gets a color just to look distinct.
- Every card ends with a clear terminal element (CTA text, button, or the last
  data point) — nothing trails off without a resolution.

**What varies per card** (the "six shapes" part — each card's internal layout
mirrors the shape of its own data, so nothing is a paragraph pretending to be a
card):
- Pipeline → stacked list rows with trailing chips.
- At-risk → single-focus card with a radial/gauge visual, warm-tinted background.
- Pace → big number + inline sparkline + pill badge.
- Upsell → media-thumbnail-style color block up top (visually distinct from data
  cards, reads as "content," reinforcing it's pulled from a different engine),
  stat overlaid on the thumbnail.
- Team → centered rank number, avatar stack, horizontal progress bar.
- AI next-best-action → dark card (only one of the six), short reasoning tags
  instead of prose, ends in a filled CTA button — the deliberate outlier that
  signals "this card is different in kind, not just in color."

## Non-goals

- No live data wiring — this is static demo markup/content, matching how the rest
  of `app-shell-intro.html` is built (no backend, no fetch).
- No new interactivity beyond what a card already needs to display (CTAs are
  visual only for this pass, not wired to real actions/routes).
- No change to `collabrium-dls/` — any new visual treatment needed that isn't
  already a token/component in `tokens.css`/`components.css` gets implemented as a
  page-local override in `app-shell-intro.html`, documented inline per this
  project's established pattern.
- No change to the slider mechanics, card count, or card footprint already built.

## Verification approach

Same pattern as the rest of this session: implement, reload the page in-browser,
confirm each card's `getBoundingClientRect()`/computed styles match spec,
screenshot for visual confirmation, then commit.
