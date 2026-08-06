# Highlight cards: recommendation + next-best-action CTA — design

**Date:** 2026-08-06
**Page:** `pages/app-shell-intro.html`
**Status:** Approved by user, pending implementation plan
**Builds on:** `2026-08-06-highlight-cards-design.md` (the six-card content/visual spec)

## Goal

Every highlight card currently stops at *insight* (a stat, an alert, a rank). This
pass makes each card complete the arc **insight → recommendation → one-click
action**: a short coaching line ("what Collabrium thinks Bryan should do about
this") plus a next-best-action CTA. This is the "collaboration understands you"
promise made explicit on all six cards, not just the AI card.

## Per-card copy (approved)

| # | Card | Recommendation line | CTA |
|---|------|--------------------|-----|
| 1 | Pipeline | Start with MediaCorp — it's been quiet longest (12d). | Nudge MediaCorp → *(replaces the generic "Follow up →")* |
| 2 | At risk | Renewal is in 21 days — a save call this week beats a discount later. | Book save call → |
| 3 | Pace | Two deals close this week — land them and October starts ahead too. | See closing deals → |
| 4 | Upsell | 3 of your clients fit the same influencer playbook. | Clone this pitch → |
| 5 | SEA team | Closing PetronasBiz (RM150K) takes #1. | Draft outreach → *(deliberately the same action as Card 6 — two cards converging on one next best action is the "platform understands you" story)* |
| 6 | AI | Unchanged — its reasoning tags already are the recommendation. | Draft outreach (filled button, unchanged) |

## Pattern rules

- **Placement:** recommendation is the card's final text line; the CTA is the
  terminal element anchored at the card's bottom (extends the existing "every
  card ends with a resolution" rule to all six uniformly).
- **Voice:** coach, not alarm. Second person, one sentence, no paragraph.
- **CTA treatment (user's choice, option c):** text-arrow links on cards 1–5,
  styled on the existing `.c-hcard-cta` recipe (label2/700/Neutral-9 + arrow
  icon). The filled orange button stays **AI-card-only** — it preserves the AI
  card's "different in kind" outlier status from the original design.
- **Recommendation line styling:** visually distinct from card body copy so it
  reads as "Collabrium speaking": a ✨ lead-in glyph and Neutral-5 at caption
  size. Not a coloured background, not a border — the accent-as-signal rule
  stays reserved for the risk/positive/AI accents already in play.
- **Interaction:** CTAs remain visual-only (no routes/actions exist on this
  static page), same non-goal as the parent spec.

## Layout notes per card

- Card 1: recommendation replaces nothing (new line after the list); existing
  `.c-hcard-cta` text updates to "Nudge MediaCorp".
- Card 2: gauge stays the mid-card visual; recommendation + CTA sit below it
  as the card's new bottom cluster (rec directly above CTA).
- Card 3: sparkline stays anchored above the new bottom cluster; recommendation
  + CTA close the card. (In both cards the rec/CTA go *after* the SVG so the
  gauge/sparkline keep their existing `margin-top:auto` bottom anchors — a card
  must never have two auto anchors, or flexbox splits the free space between
  them.)
- Card 4: recommendation after the "via Collab Influencers" tag; CTA new at
  bottom.
- Card 5: recommendation after the bar caption; CTA new at bottom. Card 5 keeps
  its centered layout except the CTA, which left-aligns like every other card's
  terminal element.
- Card 6: untouched.

All new elements use the shared card rhythm (12px gap, pairing rule where a
line supports the element above it) and DS tokens only; `collabrium-dls/`
stays untouched, page-local classes documented inline as established.

## Non-goals

- No live actions/routing behind CTAs.
- No new card content beyond the recommendation + CTA lines.
- No change to slider mechanics, fan layout, tilt, skeleton, or entrance.

## Verification approach

Same as all prior passes: reload in-browser, confirm computed styles/positions
(CTA anchored last, recommendation line present on cards 1–5, AI card
unchanged), screenshot, then commit.
