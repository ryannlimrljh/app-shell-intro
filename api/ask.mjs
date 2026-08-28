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

The BOARD BRIEF in the first user turn is the board as they currently
have it filtered, produced by the same code that draws the page. It is
your only source of numbers. Never invent a figure, a client, or a
person. If the brief cannot answer the question, say what is missing
and, when you can, name the filter or view on the board that would show
it. When the brief marks a slice as derived or modelled, carry that
caveat into your answer.

Currency is Malaysian Ringgit, written like RM4.5M. The month runs on a
billing window the brief states; do not assume calendar days.

Style: answer first, then the reasoning, briefly. Plain sentences.
Short answers for short questions. No bullet lists unless listing is
the answer. Never use em dashes. You are talking to someone senior and
busy: no filler, no cheerleading, no restating their question.`;

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
    { role: 'assistant', content: 'Understood. I will answer from this brief only.' },
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
