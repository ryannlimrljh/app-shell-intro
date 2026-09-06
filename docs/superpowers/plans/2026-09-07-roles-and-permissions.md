# Roles & permissions Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development or superpowers:executing-plans. Steps use checkbox syntax.

**Goal:** Let a Super Admin edit the activity matrix behind every role, per matrix, with locks, reset, and a change log, and have the directory read the result.

**Architecture:** The access module gains the two hub matrices, a `holdsIn` that consults browser-held overrides, and the override store with locks and log. A new page `pages/roles.html` renders roles left, switches right, tabs per matrix. Settings gains the card. The directory loads overrides at boot so its checklist is live.

**Tech Stack:** Plain HTML/CSS/ES5 JS, vendored design system, Node for checks.

**Spec:** `docs/superpowers/specs/2026-09-07-roles-and-permissions-design.md`

---

### Task 1: Matrices, `holdsIn`, overrides, locks, log in `shared/access.js`

- [ ] Add checks to `scripts/check-access.mjs` (section "Matrices" and "Overrides") for every item the spec lists.
- [ ] Add `SALES_ACTIVITIES`, `INFLUENCER_ACTIVITIES`, `MATRICES`, `defaultHolds`, `holdsIn`, `loadOverrides`, `setOverride`, `resetRole`, `isModified`, `lastChange`, `lockReason`, `materialiseAdmin`.
- [ ] Run `node scripts/check-access.mjs`, all ok. Commit.

### Task 2: `pages/roles.html`

- [ ] Shell markup as `settings.html`, back arrow to Settings, tabs, left role list, right switches, Admin read-only, business denied.
- [ ] Verify in the browser as all three viewers. Commit.

### Task 3: Settings card, directory boot, README

- [ ] Settings: third card gated like the directory card.
- [ ] `users.html` and `settings.html`: `A.loadOverrides(localStorage)` before first render.
- [ ] README rows. Commit.

### Task 4: Review and verify

- [ ] Code review subagent on the diff; fix what matters.
- [ ] Browser pass: edit a switch, see it in the directory's checklist; reset; locks; Admin read-only; Leadership denied.
