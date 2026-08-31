# The Collabrium assistant: how it is built, and how to take it further

This is the handoff for the AI chat behind the ask box on
`pages/landing-v3.html`. It covers what exists, why it is shaped that
way, and exactly where your integration work slots in. Everything here
is live at `app-shell-intro.vercel.app` as of 31 Aug 2026.

---

## The architecture in one paragraph

The page assembles a JSON snapshot of the board as the reader currently
has it filtered (the "brief"), and posts it with the conversation to
`/api/ask`, a Vercel serverless function. The function holds the
Anthropic API key, prepends a fixed system prompt, calls Claude, and
streams the answer back as plain text. The page meters the stream onto
the screen through a typewriter, renders a four-shape markdown subset,
and keeps conversations in the browser's localStorage. No server-side
state exists anywhere: the API is stateless, the history rides in each
request, and deleting a conversation is a localStorage edit.

```
landing-v3.html                      api/ask.mjs                 Anthropic
┌──────────────────────┐   POST      ┌─────────────────┐
│ composer (chat UI)   │ ──────────▶ │ key, caps,      │ ────────▶ Claude
│ __boardBrief() JSON  │  messages   │ system prompt   │  stream   (claude-opus-5,
│ localStorage threads │  + brief    │ streams back    │ ◀──────── effort low)
│ typewriter + render  │ ◀────────── └─────────────────┘
└──────────────────────┘  text/plain chunks
```

## The pieces

| Piece | Where | What it does |
|---|---|---|
| Serverless function | `api/ask.mjs` | Key holder, input caps, system prompt, streaming relay |
| Chat UI | `pages/landing-v3.html`, the script marked `The composer, wired` | Threads, bubbles, renderer, typewriter, stop button, delete menu |
| Brief assembly | same file, inside `renderHeroCards()`, published as `window.__boardBrief` | Rebuilds the JSON snapshot on every filter pass |
| Org chart | `data/org-tree.json` | Full FY27 tree, fetched once by the page, embedded in the brief |
| Question bank | `docs/assistant-question-bank.xlsx` | 63 asks by seniority with answerability status; doubles as the test plan |

## Setup

One secret: `ANTHROPIC_API_KEY`, set in Vercel's environment variables
for the deploy and in `.env.local` for local work. With no key the
function answers `200 {configured:false}` and the page says "not
connected" politely, so a missing key can never break the page.

There is NO AUTHENTICATION on this site. The login screen is a prop.
Anyone holding the URL can chat, and every answer spends the key's
credit. The monthly spend cap in the Anthropic console is the real
guard; keep it set. The in-code caps (`MAX_OUT` 2048 tokens out,
`MAX_TURNS` 20, `MAX_MSG` 4000 chars, `MAX_BRIEF` 32000 chars) only
stop a single request from being expensive.

Model: `claude-opus-5` with `output_config: {effort: 'low'}`. Low is
deliberate: every fact the answer needs is already in the brief, and at
default effort the first word took 7.5s; at low it takes 1.7s and the
answers come back tighter, which the prompt wants anyway. If answers
ever feel shallow, this is a one-word dial.

## The brief: the whole trick

Claude knows nothing about this business. The brief is a JSON object
the page rebuilds from the same model that draws the board, so the
assistant can never disagree with the page behind it, and it follows
the reader's filters automatically. Keys, in order:

- `units`, `provenance`: self-description. The system prompt reads
  these before anything else.
- `filters_in_force`, `billing_window_august`
- `august_mtd_this_slice`, `sep_to_dec_this_slice`: target, booked,
  pipeline, forecast, gap, each with a `derived_not_sourced` flag
- `platforms_august_company`, `forward_months_company`,
  `forward_total_company`
- `heads_august_company`, `heads_sep_to_dec_company`,
  `forward_coverage_pct_of_month_target` (the heat map)
- `team_structure`: the whole of `org-tree.json` minus its `index`
  (lookup aid for code, dead weight for a model). Includes
  `open_questions` (the org chart's six unresolved footnotes) and
  `name_conventions` (shortforms: Joy, Fifi, Jaja, Nick, Jey, the
  family-name-first Chinese names, and the ambiguous first names).
  Falls back to the page's own `TEAMS` copy if the fetch fails.
- `largest_open_deals_august_this_slice`,
  `largest_forward_deals_this_slice`, with `flagged_duplicate` where
  the export repeats a row

All money is RM millions. The brief runs about 20KB; each question
costs roughly 2 to 3 sen at current pricing.

**The one rule that must survive any refactor:** everything in the
brief must be true, and everything invented must be absent. The board
itself displays modelled pod/person splits below head level; those are
deliberately NOT in the brief, because a chart can wear a "derived"
hint but a spoken sentence sheds its footnotes. The system prompt cages
facts to the brief, so whatever you put in it will be stated as truth.

## The system prompt contract

Lives entirely in `api/ask.mjs`, in plain English, in this order:

1. **Facts caged**: numbers, clients, people only from the brief;
   missing data is declared missing, with the view that would show it.
2. **Thinking free**: plans, warnings, drafts, coaching, sales craft
   from its own knowledge. This split is the whole personality; early
   versions caged everything and the bot read as useless.
3. **Scope fence**: work in service of Collabrium only. Drawn at "in
   service of the work", not "mentions Collabrium", so craft questions
   stay in. One friendly decline for the rest. It is a courtesy fence,
   not a security fence; the spend cap is the security.
4. **Pod routing**: CollabSales (this seat), CollabInfluencers,
   CollabStudio, CollabContent, with the switcher behind the sidebar
   logo. Other pods' assistants are declared upcoming, not pretended.
5. **Names**: resolve shortforms per `name_conventions`, answer in the
   name the asker used, name candidates when genuinely ambiguous.
6. **Brevity**: two to four sentences by default, verdict plus the
   number that proves it. Length only for plans, comparisons,
   analyses, drafts.
7. **Format**: exactly four shapes: bold, italic, lists, pipe tables.
   Bold only on the words carrying the decision. No headings, links,
   code, nested lists: the page renderer supports nothing else.

The prompt carries `cache_control: {type: 'ephemeral'}` so the static
part caches across requests; the brief rides as the first user turn
precisely so it can change per request without breaking that cache.

## The client, and its two safety rules

Threads live in `localStorage['cbrm.chats']`, newest first, capped at
50, titled by the first question, grouped Today/Earlier, deletable from
the hover menu. A refresh always opens a blank conversation; the rail
holds the history.

Rendering rule one: **escape first, decorate second**. `renderMd()`
HTML-escapes every character before applying the four shapes, so
nothing the model writes, or anyone upstream of the model injects, can
become markup. The unit fixture includes a live `<img onerror>` and
`<script>` payload; both must render as visible text. If you touch the
renderer, keep that fixture passing.

Rendering rule two: user turns and error messages go through `plain()`
(textContent), never through the renderer.

The stream drains through a typewriter: a few characters per frame,
speeding up in proportion to backlog, so slabs read as typing. The
send button becomes Stop while busy (AbortController), the header line
says "Collabrium is thinking" via `aria-live`, and reduced-motion users
get the words without the dots and caret.

## Your integration points, in value order

The question bank marks 10 asks "Not yet" and every one traces to the
same three ingredients:

1. **Rep-level rows** (owner-level targets and actuals from NeoCRM).
   Add them to the brief as a new key, shaped like
   `heads_august_company`, and per-person answers switch on with zero
   assistant changes. This also lets you delete the board's modelled
   pod splits eventually.
2. **History** (weekly snapshots of pipeline and forecast). This one
   is time-critical: it can never be rebuilt backwards, and every week
   without it is permanently lost. Once two snapshots exist, add a
   `week_over_week` key and "what changed" comes alive.
3. **Activity** (calls, meetings, touches). Unlocks the
   effort-versus-book-quality questions.

Mechanics of extending: the brief is assembled client-side today
because the data lives in the page. When real data comes from a
database, assemble the brief server-side in `api/ask.mjs` instead
(fetch from Neon there, merge with whatever the page sends), which also
stops trusting the client's numbers. The system prompt needs no change
either way; it reads whatever keys exist.

Per-pod assistants: give each pod its own brief builder and reuse
`api/ask.mjs` unchanged, swapping the system prompt's seat line, or add
a `pod` field to the request and branch the prompt server-side.

## Testing

Local: `scratchpad` dev servers come and go; the durable check is
against the deploy or `vercel dev`. One curl proves the whole chain:

```
curl -N -X POST https://app-shell-intro.vercel.app/api/ask \
  -H 'content-type: application/json' \
  -d '{"messages":[{"role":"user","content":"where does august stand?"}],
       "brief":"<paste window.__boardBrief() from the console>"}'
```

In the browser console on the landing page, `window.__boardBrief()`
returns the exact brief the chat would send; `JSON.parse` it to check a
new key landed. The question bank's 63 rows are the acceptance test:
after your integration, the "Not yet" rows should answer.

Known measured numbers, for regression sense: first word ~1.7s, full
short answer ~4.5s, brief ~20KB. If first-word time regresses past ~3s,
suspect either an effort change or a much larger brief.

## Honest limitations, so nobody discovers them the hard way

- No auth, no rate limiting beyond the per-request caps. Fine for ten
  named pilots, not fine past that.
- The scope fence is prompt-level and can be talked around by a
  determined user. Budget-cap accordingly.
- The org chart is a transcription of a 15 Jul 2026 master; its six
  `open_questions` are real unknowns (Kenn's grade, Siok Chin's June
  roster, GenNext's reporting line, among others). Keep that array
  updated when people move; a stale org chart gives confidently wrong
  answers, which is worse than none.
- Answers about anything below head level are structural only, by
  design, until ingredient 1 lands.
