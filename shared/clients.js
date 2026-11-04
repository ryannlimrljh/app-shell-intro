/* The clients, as one list (4 Nov). data/brand-logos.js is the directory:
   one display name, the spellings NeoCRM uses for it, and a website for
   its logo. Settings → Client management edits it, and every page that
   shows a brand reads it, so a name or logo changed there shows the same
   everywhere: the board's deal lists, the hero cards, the client table.

   There is no server to write to yet, so the edits are kept in this
   browser (localStorage) and laid over the directory as it loads. Load
   this right after data/brand-logos.js: it rewrites window.BRAND_LOGOS in
   place with the edits applied, so pages that read the directory directly
   pick them up without knowing this file exists.

   Every change is also written to a short local log, which the Activity
   log shows as Client management entries. */
(function () {
  'use strict';
  var KEY = 'collabrium.clients.v1';
  var BASE = (window.BRAND_LOGOS || []).map(function (b) { return { name: b.name, re: b.re, domain: b.domain || '' }; });
  var BASE_AT = Date.parse(window.BRAND_LOGOS_UPDATED || '') || 0;

  function read() {
    var o = null;
    try { o = JSON.parse(localStorage.getItem(KEY) || 'null'); } catch (e) {}
    o = o && typeof o === 'object' ? o : {};
    return { edits: o.edits || {}, added: o.added || [], removed: o.removed || [], log: o.log || [] };
  }
  function write(o) { try { localStorage.setItem(KEY, JSON.stringify(o)); } catch (e) {} }

  /* A directory brand is keyed by its spellings (re), which never change
     in the editor; a client added here gets a key of its own. */
  function list() {
    var o = read();
    var base = BASE.filter(function (b) { return o.removed.indexOf(b.re) < 0; }).map(function (b) {
      var e = o.edits[b.re] || {};
      return { key: b.re, re: b.re, name: e.name || b.name, domain: e.domain != null ? e.domain : b.domain,
        company: e.company || '', active: e.active !== false, updated: e.updated || BASE_AT, edited: !!e.updated };
    });
    var added = o.added.filter(function (c) { return o.removed.indexOf(c.key) < 0; }).map(function (c) {
      var e = o.edits[c.key] || {};
      return { key: c.key, re: c.re, name: e.name || c.name, domain: e.domain != null ? e.domain : (c.domain || ''),
        company: e.company != null ? e.company : (c.company || ''), active: (e.active != null ? e.active : c.active) !== false,
        updated: e.updated || c.updated, edited: true, isNew: true };
    });
    return base.concat(added);
  }
  /* What the board matches deals against: every client, active or not
     (an inactive client's old deals still wear its logo). */
  function directory() { return list().map(function (c) { return { name: c.name, re: c.re, domain: c.domain || undefined }; }); }
  function sync() {
    if (!window.BRAND_LOGOS) return;
    var d = directory();
    window.BRAND_LOGOS.length = 0;
    Array.prototype.push.apply(window.BRAND_LOGOS, d);
  }

  function note(o, ev) {
    ev.at = Date.now();
    o.log.unshift(ev);
    o.log = o.log.slice(0, 200);
  }
  var upperRe = function (name) { return '^' + name.toUpperCase().replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); };

  /* c: { key? , name, company, domain, active }, by: who made the change */
  function save(c, by) {
    var o = read(), now = Date.now(), before = c.key ? list().filter(function (x) { return x.key === c.key; })[0] : null;
    var fields = { name: c.name, company: c.company || '', domain: c.domain || '', active: c.active !== false, updated: now };
    if (before) {
      o.edits[c.key] = fields;
      var what = [];
      if (before.name !== fields.name) what.push('renamed from ' + before.name);
      if ((before.domain || '') !== fields.domain) what.push(fields.domain ? 'website set to ' + fields.domain : 'website cleared');
      if ((before.company || '') !== fields.company) what.push(fields.company ? 'company name set to ' + fields.company : 'company name cleared');
      if (before.active !== fields.active) what.push(fields.active ? 'made active' : 'made inactive');
      note(o, { title: 'Client updated', desc: fields.name + ' ' + (what.length ? what.join(', ') : 'saved') + '.', action: 'updated', by: by });
    } else {
      c.key = 'u:' + now.toString(36);
      o.added.push({ key: c.key, re: upperRe(c.name), name: fields.name, company: fields.company, domain: fields.domain, active: fields.active, updated: now });
      note(o, { title: 'Client added', desc: fields.name + ' can now be picked for a campaign.', action: 'created', by: by });
    }
    write(o); sync();
    return c.key;
  }
  function remove(key, by) {
    var o = read(), c = list().filter(function (x) { return x.key === key; })[0];
    if (!c) return;
    if (o.removed.indexOf(key) < 0) o.removed.push(key);
    note(o, { title: 'Client removed', desc: c.name + ' can no longer be picked for a campaign.', action: 'removed', by: by });
    write(o); sync();
  }
  function logoUrl(domain) {
    var src = window.BRAND_LOGO_SRC || '';
    return domain && src ? src.replace('{domain}', encodeURIComponent(domain)) : '';
  }
  /* "Kementerian Kesihatan Malaysia" -> "KK", skipping the small words */
  function initials(name) {
    return String(name || '').replace(/[^A-Za-z0-9& ]/g, '').split(/\s+/)
      .filter(function (w) { return w && !/^(the|and|of|&)$/i.test(w); }).slice(0, 2)
      .map(function (w) { return w[0]; }).join('').toUpperCase() || '–';
  }

  sync();
  window.CollabClients = {
    list: list, save: save, remove: remove, logoUrl: logoUrl, initials: initials,
    log: function () { return read().log; },
    reset: function () { try { localStorage.removeItem(KEY); } catch (e) {} sync(); }
  };
})();
