/* Notes, shared.
   ─────────────────────────────────────────────────────────────────────
   One Vercel serverless function behind /api/notes, backed by the Neon
   Postgres added to this project from the Vercel dashboard. It replaces
   the browser-local store the board shipped with: notes written here are
   visible to everyone who opens the page, rather than to one browser.

   The page degrades on purpose. With no database wired up this answers
   200 {configured:false} rather than an error, and the board keeps its
   localStorage notes exactly as before — so this file can ship before
   anybody clicks anything in the Vercel dashboard, and light up when
   they do.

   NO AUTHENTICATION. The login screen on this prototype is a prop, so
   `author` is whatever the page says it is and anyone with the URL can
   read and write every note. That is a deliberate prototype trade, not
   an oversight: it must not hold anything sensitive until real sign-in
   exists.

   .mjs, not .js: package.json declares commonjs for the chart bundle,
   and the extension is what lets this one file be ESM regardless. */
import { neon } from '@neondatabase/serverless';

/* The Neon marketplace integration and the older Postgres integration
   name their connection string differently, so take whichever landed. */
const CONN =
  process.env.DATABASE_URL ||
  process.env.POSTGRES_URL ||
  process.env.DATABASE_URL_UNPOOLED ||
  process.env.POSTGRES_URL_NON_POOLING ||
  '';

const CAP = 4;        // four notes to a row — the same rule the UI enforces
const MAX_LEN = 280;  // the textarea's own maxlength
const MAX_KEY = 200;

/* Colour is NOT stored. It is the note's place in its own row — walking
   Fire, Wood, Earth, Water, Gold — so the server stays the authority on
   it while the client can still predict it: a row caps at four notes, so
   a stack is always Fire, Wood, Earth, Water, and a note being composed
   knows its colour before it is saved.

   It was (seq - 1) % 5, the table-wide insert order, which nothing on the
   board could see: the panel showed one colour and the saved pin came
   back another. The cost of the change is that deleting a note repaints
   the ones after it, since they have moved up the row. */
const SHAPE = `id, board_key, body, author, created_at, edited_by, edited_at,
               resolved_by, resolved_at,
               ((row_number() OVER (PARTITION BY board_key ORDER BY seq) - 1) % 5)::int
                 AS colour`;

const row = (r) => ({
  i: r.id,
  t: r.body,
  a: r.author,
  c: r.colour,
  ts: r.created_at,
  e: r.edited_by || undefined,
  ets: r.edited_at || undefined,
  r: r.resolved_by || undefined,
  rts: r.resolved_at || undefined,
});

/* Bootstrapped once per warm lambda rather than per request: the DDL is
   idempotent, but paying for it on every call is not. */
let bootstrapped = null;
function client() {
  const sql = neon(CONN);
  if (!bootstrapped) {
    bootstrapped = sql`
      CREATE TABLE IF NOT EXISTS notes (
        id         TEXT PRIMARY KEY,
        seq        BIGSERIAL,
        board_key  TEXT NOT NULL,
        body       TEXT NOT NULL,
        author     TEXT NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
        edited_by  TEXT,
        edited_at  TIMESTAMPTZ
      )`
      .then(() => sql`CREATE INDEX IF NOT EXISTS notes_board_key_idx ON notes (board_key)`)
      // the live table predates the resolve feature; these are no-ops after
      // the first call and the migration for a table created without them
      .then(() => sql`ALTER TABLE notes ADD COLUMN IF NOT EXISTS resolved_by TEXT`)
      .then(() => sql`ALTER TABLE notes ADD COLUMN IF NOT EXISTS resolved_at TIMESTAMPTZ`)
      .catch((e) => { bootstrapped = null; throw e; });   // let a cold-start failure retry
  }
  return { sql, ready: bootstrapped };
}

const clean = (v, n) => String(v == null ? '' : v).trim().slice(0, n);

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');

  if (!CONN) {
    // Not an error: this is the signal the page uses to stay local.
    return res.status(200).json({ configured: false });
  }

  const { sql, ready } = client();

  try {
    await ready;

    if (req.method === 'GET') {
      const rows = await sql`SELECT ${sql.unsafe(SHAPE)} FROM notes ORDER BY seq`;
      const notes = {};
      for (const r of rows) (notes[r.board_key] ||= []).push(row(r));
      return res.status(200).json({ configured: true, notes });
    }

    if (req.method === 'PUT') {
      const b = req.body || {};
      const text = clean(b.text, MAX_LEN);
      const who = clean(b.author, 80) || 'Unsigned';
      const key = clean(b.key, MAX_KEY);

      /* Resolve / reopen: its own small write, no text involved. The
         resolver is whoever the page says is signed in — same trust
         model as authorship, and the same place a real login plugs in. */
      if (b.id && b.resolve !== undefined) {
        const id = clean(b.id, 64);
        const hit = await sql`SELECT board_key FROM notes WHERE id = ${id}`;
        if (!hit.length) return res.status(404).json({ error: 'no such note' });
        if (b.resolve) {
          await sql`UPDATE notes SET resolved_by = ${who}, resolved_at = now() WHERE id = ${id}`;
        } else {
          await sql`UPDATE notes SET resolved_by = NULL, resolved_at = NULL WHERE id = ${id}`;
        }
        const bkey = hit[0].board_key;
        const rows = await sql`SELECT ${sql.unsafe(SHAPE)} FROM notes
                               WHERE board_key = ${bkey} ORDER BY seq`;
        return res.status(200).json({ configured: true, key: bkey, notes: rows.map(row) });
      }

      if (!key) return res.status(400).json({ error: 'key is required' });
      if (!text) return res.status(400).json({ error: 'text is required' });

      if (b.id) {
        const hit = await sql`SELECT author FROM notes WHERE id = ${clean(b.id, 64)}`;
        if (!hit.length) return res.status(404).json({ error: 'no such note' });
        /* Editing somebody else's note does not make it yours: the byline
           stays and the change is recorded beside it. Editing your own
           just re-dates it. Same rule the board has always applied. */
        if (hit[0].author === who) {
          await sql`UPDATE notes SET body = ${text}, created_at = now(),
                    edited_by = NULL, edited_at = NULL WHERE id = ${clean(b.id, 64)}`;
        } else {
          await sql`UPDATE notes SET body = ${text},
                    edited_by = ${who}, edited_at = now() WHERE id = ${clean(b.id, 64)}`;
        }
      } else {
        // the cap is enforced here too: the buttons disable at four, but
        // two people saving at once would not know about each other
        const [{ n }] = await sql`SELECT count(*)::int AS n FROM notes WHERE board_key = ${key}`;
        if (n >= CAP) return res.status(409).json({ error: 'cap', cap: CAP });
        const id = clean(b.newId, 64) || ('n' + Date.now().toString(36) + Math.random().toString(36).slice(2, 8));
        await sql`INSERT INTO notes (id, board_key, body, author)
                  VALUES (${id}, ${key}, ${text}, ${who})`;
      }

      const rows = await sql`SELECT ${sql.unsafe(SHAPE)} FROM notes
                             WHERE board_key = ${key} ORDER BY seq`;
      return res.status(200).json({ configured: true, key, notes: rows.map(row) });
    }

    if (req.method === 'DELETE') {
      const id = clean((req.query && req.query.id) || '', 64);
      const who = clean((req.query && req.query.author) || '', 80);
      if (!id) return res.status(400).json({ error: 'id is required' });
      // read the key AND the author first: the reply carries what is left on
      // that row, and only the creator is allowed to empty it
      const hit = await sql`SELECT board_key, author FROM notes WHERE id = ${id}`;
      if (!hit.length) return res.status(200).json({ configured: true, key: null, notes: [] });
      /* Only the creator may delete. Not the last editor — editing keeps the
         original byline, so `author` stays the owner. The UI hides the bin
         for everybody else; this is what makes the rule real. */
      if (hit[0].author !== who) {
        return res.status(403).json({ error: 'only the author may delete this note',
                                      author: hit[0].author });
      }
      const key = hit[0].board_key;
      await sql`DELETE FROM notes WHERE id = ${id}`;
      const rows = await sql`SELECT ${sql.unsafe(SHAPE)} FROM notes
                             WHERE board_key = ${key} ORDER BY seq`;
      return res.status(200).json({ configured: true, key, notes: rows.map(row) });
    }

    res.setHeader('Allow', 'GET, PUT, DELETE');
    return res.status(405).json({ error: 'method not allowed' });
  } catch (e) {
    // The page treats any failure as "stay local", so the shape matters
    // more than the status: never leave it guessing.
    return res.status(500).json({ configured: true, error: String((e && e.message) || e) });
  }
}
