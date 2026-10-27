/* In the news: the latest industry stories for the hero card.

   Reads the public RSS feeds of the trade press the card names, server
   side (the browser cannot read them across origins), and returns the
   newest items as JSON: source, title, link, date and an image when the
   feed carries one. Marketing-Interactive publishes no feed, so it is not
   here; add a source to SOURCES when one does.

   No key, no dependencies. Responses are cached at the edge for 15
   minutes, so the feeds are read a few times an hour however many
   people open the page. A feed that fails is skipped; if all fail the
   card falls back to its placeholder stories. */

export const config = { maxDuration: 15 };

const SOURCES = [
  { name: 'Campaign Brief Asia', short: 'CBA', url: 'https://campaignbriefasia.com/feed' },
  { name: 'Branding in Asia', short: 'BIA', url: 'https://www.brandinginasia.com/feed/' }
];
const PER_SOURCE = 6;
const TIMEOUT_MS = 8000;

const ENT = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ' };
function decode(s) {
  return String(s || '')
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(+n))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&([a-z]+);/gi, (m, n) => ENT[n.toLowerCase()] ?? m)
    .replace(/<[^>]+>/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}
function tag(xml, name) {
  const m = xml.match(new RegExp('<' + name + '(?:\\s[^>]*)?>([\\s\\S]*?)</' + name + '>', 'i'));
  return m ? m[1] : '';
}
function image(item) {
  const attr = (re) => { const m = item.match(re); return m ? m[1] : null; };
  const media = attr(/<media:(?:content|thumbnail)[^>]*\burl="([^"]+)"/i)
    || attr(/<enclosure[^>]*\burl="([^"]+)"[^>]*type="image/i);
  if (media) return media;
  // the first picture in the story body (WordPress feeds put it there)
  const body = (tag(item, 'content:encoded') || tag(item, 'description'))
    .replace(/<!\[CDATA\[|\]\]>/g, '').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"');
  const m = body.match(/<img[^>]+src=["']([^"']+)["']/i);
  return m ? m[1] : null;
}

async function read(src) {
  const ctl = new AbortController();
  const t = setTimeout(() => ctl.abort(), TIMEOUT_MS);
  try {
    const r = await fetch(src.url, { signal: ctl.signal, headers: { 'User-Agent': 'Collabrium/1.0 (+https://app-shell-intro.vercel.app)', Accept: 'application/rss+xml, application/xml, text/xml' } });
    if (!r.ok) return [];
    const xml = await r.text();
    return (xml.match(/<item[\s>][\s\S]*?<\/item>/gi) || []).slice(0, PER_SOURCE).map((item) => {
      const date = new Date(decode(tag(item, 'pubDate')));
      return {
        source: src.name, short: src.short,
        title: decode(tag(item, 'title')),
        link: decode(tag(item, 'link')),
        date: isNaN(date) ? null : date.toISOString(),
        image: image(item)
      };
    }).filter((x) => x.title && x.link);
  } catch (e) {
    return [];
  } finally {
    clearTimeout(t);
  }
}

export default async function handler(req, res) {
  const lists = await Promise.all(SOURCES.map(read));
  const items = lists.flat().sort((a, b) => (b.date || '').localeCompare(a.date || '')).slice(0, 12);
  res.setHeader('Cache-Control', 'public, s-maxage=900, stale-while-revalidate=3600');
  res.status(200).json({ items, sources: SOURCES.map((s) => s.name), fetched: new Date().toISOString() });
}
