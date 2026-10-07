# Decision Space — closed-loop actions — design

**Date:** 2026-08-13
**Page:** `pages/decision-space-sales.html`
**Status:** Approved in brainstorm, built ahead of written review (user: "build it 1st we shall review later")
**Replaces:** the generic `Approve / Ask for options / Defer` CTA applied identically to every card

## Problem

Every card carried the same three verbs. They are verdicts on a proposal, but a
card is not a proposal — it is a condition detected in the data. Nothing closed:

- "Approve" had no referent. There is nothing to approve in "August is RM4.5M short".
- Every card already carried a **testable closing condition** in *Success looks
  like*, and the buttons ignored it.
- A deliberate write-off was indistinguishable from neglect in the log, which is
  precisely the distinction a prior-actions review exists to make.
- Defects, diagnostics and structural risks cannot be actioned the same way as a
  revenue gap, yet all four got identical buttons.

## Model

The verb is **assign**, not approve. Each card resolves to a **disposition**
that determines where it lives next week.

| Disposition | Effect | Owner |
|---|---|---|
| `push` | leaves Tai's board, lands on level −1 | named by the data |
| `mine` | Tai's own list | Tai |
| `keep` | stays on the board, tracked weekly | Tai |
| `close` | leaves the board — `done` or `accepted` | Tai |

`close/accepted` is the write-off. Two cards' own success text already
contemplates it ("or an accepted shortfall with the number written down").

### A push carries the closing condition

When a card is pushed down, the card's own *Success looks like* text and a date
travel with it. Without that, level −1 receives a problem rather than an
instruction.

### The return matters more than the send

Detectors recompute from data every week. A card dispositioned last week that
still fires this week means the nudge failed. The board records a snapshot of
the stake at disposition time and compares it to the recomputed value, so it can
say *still firing, moved from −RM1.1M to −RM1.4M, week 2*. With this week's
static data the delta is nil and the page says so plainly rather than implying
movement it cannot see.

### Action sets by card kind

| Kind | Actions |
|---|---|
| `act`, reachable (pipeline exists) | Push to owners · I'll sponsor these · Keep on my board · Close |
| `act`, not reachable | Push with a pipeline target · Keep on my board · Close |
| `structural` | Name cover · Keep on my board · Accept the concentration |
| `defect` | Commission from data team · Keep on my board · Live with it |
| `diagnostic` | **none** — context only, plus a "raise as a decision" link |

Rationale for the exclusions:

- **Defects** cannot go to a Head of Sales; the owner pool is the data team.
- **Diagnostics** have no owner and nothing to resolve. They are context for the
  cards above them. Buttons on them invite meaningless clicks.
- **Structural** risk cannot be closed by the person who *is* the concentration.

## Rejected alternatives

- **A single "Assign to…" picker, no per-type tailoring.** Less to learn, but it
  loses the accepted-versus-neglected distinction and offers a Head of Sales as
  the owner of a data defect.
- **Full ticket states (open → in progress → blocked → closed).** Familiar, but
  it lies by the second week: nobody updates a tracker between weekly meetings.
  The data updates itself; hand-maintained states do not.

## Storage

`mem.board[id] = {disp, outcome, owner, due, note, since, stakeAt, condition}`

`since` is the ISO date of first disposition; week count is derived from it, not
stored. Persistence is localStorage, and the page states plainly when storage is
unavailable rather than implying the board was saved.

## Out of scope

- No handoff outside the page (no email, no CRM write). The loop closes weekly
  against the prior-actions review, per the source deck's own close.
- No margin or contribution figures — the source carries revenue only.
