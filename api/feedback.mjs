/* The feedback board.
   ─────────────────────────────────────────────────────────────────────
   One Vercel serverless function behind /api/feedback, on the same Neon
   Postgres as the row notes. It holds what the pioneer group asks for
   during the first 30 days, who backed it, and what happened to it.

   Two tables rather than a votes column: a count cannot answer "have I
   already backed this", cannot be un-backed idempotently, and cannot be
   audited when someone asks who wanted a thing. A row per (note, voter)
   answers all three, and the primary key makes a double vote impossible
   rather than merely unlikely.

   The page degrades on purpose, exactly as the notes function does. With
   no database attached this answers 200 {configured:false} and the board
   runs on localStorage, so the page never breaks in front of a user.

   NO AUTHENTICATION. The login screen is a prop, so `author` is whatever
   the page claims and anyone with the URL can post, vote, and set status.
   For ten named colleagues over thirty days that is an acceptable trade;
   it stops being one the moment this holds anything sensitive or the
   group grows past people who know each other. */
import { neon } from '@neondatabase/serverless';

const CONN =
  process.env.DATABASE_URL ||
  process.env.POSTGRES_URL ||
  process.env.DATABASE_URL_UNPOOLED ||
  process.env.POSTGRES_URL_NON_POOLING ||
  '';

/* Five open votes each. The number is the whole mechanic: with ten people
   and no ceiling, everything worth agreeing with gets agreed with and the
   ranking flattens into "who posted first". Scarcity is what turns a pile
   of requests into a priority order.

   Shipped notes release their votes, because the budget counts only what
   is still open, so delivering something hands everyone their vote back
   rather than leaving the board permanently spent. */
const BUDGET = 5;
const MAX_LEN = 400;
const STATUSES = ['new', 'planned', 'shipped'];

const clean = (v, n) => String(v == null ? '' : v).trim().slice(0, n);

let bootstrapped = null;
function client() {
  const sql = neon(CONN);
  if (!bootstrapped) {
    bootstrapped = sql`
      CREATE TABLE IF NOT EXISTS feedback (
        id         TEXT PRIMARY KEY,
        seq        BIGSERIAL,
        body       TEXT NOT NULL,
        author     TEXT NOT NULL,
        status     TEXT NOT NULL DEFAULT 'new',
        created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
        status_by  TEXT,
        status_at  TIMESTAMPTZ
      )`
      .then(() => sql`
        CREATE TABLE IF NOT EXISTS feedback_votes (
          note_id    TEXT NOT NULL REFERENCES feedback(id) ON DELETE CASCADE,
          voter      TEXT NOT NULL,
          created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
          PRIMARY KEY (note_id, voter)
        )`)
      .then(() => sql`CREATE INDEX IF NOT EXISTS feedback_votes_voter_idx ON feedback_votes (voter)`)
      .catch((e) => { bootstrapped = null; throw e; });   // let a cold start retry
  }
  return { sql, ready: bootstrapped };
}

/* One read for the whole board. It is small by construction, ten people
   over thirty days, so paging it would cost more than it saves, and the
   clustering on the page needs every note at once anyway. */
async function board(sql) {
  const rows = await sql`
    SELECT f.id, f.body, f.author, f.status, f.created_at, f.status_by, f.status_at,
           COALESCE(
             (SELECT array_agg(v.voter ORDER BY v.created_at)
                FROM feedback_votes v WHERE v.note_id = f.id),
             ARRAY[]::text[]
           ) AS voters
      FROM feedback f
     ORDER BY f.seq`;
  return rows.map((r) => ({
    i: r.id,
    t: r.body,
    a: r.author,
    ts: r.created_at,
    st: r.status,
    stb: r.status_by || undefined,
    sts: r.status_at || undefined,
    v: r.voters || [],
  }));
}

const reply = (res, notes) =>
  res.status(200).json({ configured: true, budget: BUDGET, notes });

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');

  if (!CONN) return res.status(200).json({ configured: false, budget: BUDGET });

  const { sql, ready } = client();

  try {
    await ready;

    if (req.method === 'GET') return reply(res, await board(sql));

    if (req.method === 'PUT') {
      const b = req.body || {};
      const who = clean(b.author, 80) || 'Unsigned';

      /* Backing a request, or taking it back. The budget is checked here
         and not only in the buttons: two people spending their last vote
         at the same moment would each see a button that still looked
         available. */
      if (b.id && b.vote !== undefined) {
        const id = clean(b.id, 64);
        const hit = await sql`SELECT id, status FROM feedback WHERE id = ${id}`;
        if (!hit.length) return res.status(404).json({ error: 'no such note' });
        /* A vote on something already shipped costs nothing, because the
           budget only counts what is still open, so it cannot be the vote
           that breaks the budget. Checking it anyway refused a free vote
           and put the page out of step with the server, which the board
           would have shown as a vote that appeared and then vanished. */
        if (b.vote && hit[0].status !== 'shipped') {
          const [{ n }] = await sql`
            SELECT count(*)::int AS n
              FROM feedback_votes v JOIN feedback f ON f.id = v.note_id
             WHERE v.voter = ${who} AND f.status <> 'shipped' AND v.note_id <> ${id}`;
          if (n >= BUDGET) {
            return res.status(409).json({ error: 'budget', budget: BUDGET, spent: n });
          }
        }
        if (b.vote) {
          await sql`INSERT INTO feedback_votes (note_id, voter) VALUES (${id}, ${who})
                    ON CONFLICT DO NOTHING`;
        } else {
          await sql`DELETE FROM feedback_votes WHERE note_id = ${id} AND voter = ${who}`;
        }
        return reply(res, await board(sql));
      }

      /* Moving a request along. Anyone can, and the board says who did:
         with no roles to check, naming the person is the only honest
         accountability available. */
      if (b.id && b.status !== undefined) {
        const id = clean(b.id, 64);
        const st = clean(b.status, 16);
        if (STATUSES.indexOf(st) < 0) return res.status(400).json({ error: 'bad status' });
        const hit = await sql`SELECT id FROM feedback WHERE id = ${id}`;
        if (!hit.length) return res.status(404).json({ error: 'no such note' });
        await sql`UPDATE feedback SET status = ${st}, status_by = ${who}, status_at = now()
                   WHERE id = ${id}`;
        return reply(res, await board(sql));
      }

      const text = clean(b.text, MAX_LEN);
      if (!text) return res.status(400).json({ error: 'text is required' });

      if (b.id) {                                  // an edit, by its author only
        const id = clean(b.id, 64);
        const hit = await sql`SELECT author FROM feedback WHERE id = ${id}`;
        if (!hit.length) return res.status(404).json({ error: 'no such note' });
        if (hit[0].author !== who) {
          return res.status(403).json({ error: 'only the author may edit this' });
        }
        await sql`UPDATE feedback SET body = ${text} WHERE id = ${id}`;
        return reply(res, await board(sql));
      }

      const id = clean(b.newId, 64) ||
        ('f' + Date.now().toString(36) + Math.random().toString(36).slice(2, 8));
      await sql`INSERT INTO feedback (id, body, author) VALUES (${id}, ${text}, ${who})`;
      return reply(res, await board(sql));
    }

    if (req.method === 'DELETE') {
      const id = clean((req.query && req.query.id) || '', 64);
      const who = clean((req.query && req.query.author) || '', 80);
      if (!id) return res.status(400).json({ error: 'id is required' });
      const hit = await sql`SELECT author FROM feedback WHERE id = ${id}`;
      if (!hit.length) return reply(res, await board(sql));
      /* Only the person who asked for it may withdraw it. Other people
         have spent votes on this; it is not one person's to delete. */
      if (hit[0].author !== who) {
        return res.status(403).json({ error: 'only the author may delete this',
                                      author: hit[0].author });
      }
      await sql`DELETE FROM feedback WHERE id = ${id}`;   // votes cascade
      return reply(res, await board(sql));
    }

    res.setHeader('Allow', 'GET, PUT, DELETE');
    return res.status(405).json({ error: 'method not allowed' });
  } catch (e) {
    return res.status(500).json({ configured: true, error: String((e && e.message) || e) });
  }
}
