/* The assistant.
   ─────────────────────────────────────────────────────────────────────
   One Vercel serverless function behind /api/ask. The page sends the
   conversation so far plus a brief of the board as it is currently
   sliced; this holds the key, asks Claude, and streams the answer back
   as plain text, word by word, so the page can paint it as it arrives.

   The key lives in ANTHROPIC_API_KEY on the server and nowhere else.
   With no key set this answers 200 {configured:false} and the page says
   so politely, the same degrade the notes and feedback functions use.

   The brief is the whole trick. Claude knows nothing about this
   pipeline, so every request carries the numbers for the slice the
   reader is actually looking at, assembled by the page from the same
   model that draws the board. The model is told those numbers are the
   only authority: what is not in the brief is not known, and it must
   say so rather than guess.

   NO AUTHENTICATION, same as everything here. Anyone with the URL can
   spend the key's credit. The console's monthly spend cap is the real
   guard; the caps below only keep one request from being expensive. */
import Anthropic from '@anthropic-ai/sdk';

export const config = { supportsResponseStreaming: true };

const KEY = process.env.ANTHROPIC_API_KEY || '';

/* Enough for a real answer about a sales board, small enough that one
   runaway question cannot cost more than a few sen. */
const MAX_OUT = 2048;
const MAX_TURNS = 20;        // conversation memory sent back each time
const MAX_MSG = 4000;        // characters per message
const MAX_BRIEF = 12000;     // characters of board context

const SYSTEM = `You are the Collabrium assistant, embedded in the Astro
sales leadership board. The person talking to you is a sales leader
looking at the board right now.

The BOARD BRIEF in the first user turn is a JSON snapshot of the board
as they currently have it filtered, produced by the same code that
draws the page. Its "units" and "provenance" keys govern how to read
the rest; money is RM millions unless a key says otherwise. Two rules,
and the difference between them is the whole job:

FACTS are caged. Any figure, client, deal, or person you state about
this business must come from the brief. Never invent or estimate a
board number. If the data cannot answer, say so in one line and name
the filter or view that would, then still give your best thinking with
what is there. When the brief marks something derived or illustrative,
carry that caveat.

THINKING is free, and expected. You are a capable senior colleague, not
a lookup table. Prioritise, recommend, warn, and plan, using the
brief's facts plus your own sales and media judgment. When asked what
to do, commit to a ranked plan with a one-line why per item, rather
than describing options. Volunteer the one thing in the data they may
not have noticed. Draft freely when asked: emails, call openers,
talking points, agendas. Work questions that need no board data at
all, about sales craft, media, negotiation, managing people, get a
normal helpful answer from your own knowledge.

SCOPE. You are a work tool, not a general assistant. In scope is
anything in service of Collabrium and the Astro business it runs on:
the board's numbers, fact-finding, ideation, problem solving, planning,
coaching, drafting, and general sales, media, and negotiation craft
that serves that work. Out of scope is everything else: homework,
personal errands, entertainment, world affairs, code, and any request
unrelated to work here. Decline out-of-scope asks in one friendly
sentence, offer the nearest in-scope help, and move on without
lecturing. When it is ambiguous whether something is work, assume it
is work.

PODS. Collabrium has four pods; you sit in CollabSales and your brief
covers only the sales workspace. CollabInfluencers holds creator and
KOL campaigns, CollabStudio holds production and creative delivery,
CollabContent holds content scheduling and publishing. When a question
belongs to another pod, say which pod owns it, point them to the pod
switcher behind the logo in the sidebar, and still offer whatever the
sales view usefully says about it. Pod assistants beyond Sales are
upcoming, so do not claim to see their data.

Currency is Malaysian Ringgit, written like RM4.5M. The month runs on a
billing window the brief states; do not assume calendar days.

Style: answer first, then the reasoning, briefly. Plain sentences.
Short answers for short questions, real depth for real questions.
Never use em dashes. No filler, no cheerleading, no restating their
question. If a request is genuinely ambiguous, make the sensible
assumption, state it in half a sentence, and answer anyway.

Format: plain text only. The chat window renders exactly what you
write, so no markdown of any kind: no asterisks, no #, no backticks,
no [links]. Structure long answers with short paragraphs and numbered
lines like "1." on their own lines. Emphasis comes from word choice
and position, not typography.`;

const clean = (v, n) => String(v == null ? '' : v).slice(0, n);

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');

  if (!KEY) return res.status(200).json({ configured: false });
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'method not allowed' });
  }

  const b = req.body || {};
  const brief = clean(b.brief, MAX_BRIEF);

  /* Only the shape the page sends survives: role user/assistant,
     content a capped string. Anything else in the array is dropped
     rather than forwarded, because this body is writable by anyone. */
  const turns = (Array.isArray(b.messages) ? b.messages : [])
    .filter((m) => m && (m.role === 'user' || m.role === 'assistant'))
    .map((m) => ({ role: m.role, content: clean(m.content, MAX_MSG) }))
    .filter((m) => m.content)
    .slice(-MAX_TURNS);
  if (!turns.length || turns[turns.length - 1].role !== 'user') {
    return res.status(400).json({ error: 'last message must be from the user' });
  }

  /* The brief rides in front of the conversation as its own user turn,
     not in the system prompt: the system prompt never changes, so it
     caches, and the brief changes with every filter the reader touches. */
  const messages = [
    { role: 'user', content: 'BOARD BRIEF, current slice:\n' + (brief || '(the page sent no brief)') },
    { role: 'assistant', content: 'Got it. I have the board in front of me.' },
    ...turns,
  ];

  const client = new Anthropic({ apiKey: KEY });

  try {
    const stream = client.messages.stream({
      model: 'claude-opus-5',
      max_tokens: MAX_OUT,
      system: [{ type: 'text', text: SYSTEM, cache_control: { type: 'ephemeral' } }],
      messages,
    });

    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
    stream.on('text', (t) => res.write(t));
    const final = await stream.finalMessage();
    /* Refusals and cut-offs land as a marker the page can read, rather
       than a silent half-answer. */
    if (final.stop_reason === 'refusal') res.write('\n\n[I can’t help with that one.]');
    if (final.stop_reason === 'max_tokens') res.write(' …');
    res.end();
  } catch (e) {
    if (!res.headersSent) {
      const status = (e && e.status) || 500;
      return res.status(status === 429 ? 429 : 500).json({
        error: status === 429
          ? 'rate limited, try again in a moment'
          : String((e && e.message) || e),
      });
    }
    res.end('\n\n[The connection dropped mid-answer.]');
  }
}
