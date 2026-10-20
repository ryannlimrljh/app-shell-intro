/* Mothership · the Guide, for the sales board (landing-v4).

   Ported from Collab:Sales' Guide (collab-sales/shared/guide.js) so the
   two pods teach the same way: one quiet coach mark beside the thing it
   explains, with a ring on the thing, "Walk me through" and "Got it".
   Nothing dims the page or blocks a click. A moment shows itself when
   its part of the board first comes into view, at most twice, never
   while the board is loading, a menu or popup is open or someone is
   typing, and never again once done. The Guide (the account menu, or
   "?") lists the six moments with a tick and "Show me", which scrolls to
   the real thing (switching tab where it lives on Projection) and walks
   through it.

   A moment is done when it is walked to the end, or when the reader does
   the thing it teaches (changes seat, opens a head's row, opens
   Projection, ticks a move). Progress is kept per browser. */
(function () {
'use strict';
var KEY = 'mothership-board-guide';
var REDUCED = !!(window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches);
var esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (ch) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]; }); };
var ic = function (n, fill) { return '<i class="' + (fill ? 'ph-fill' : 'ph') + ' ph-' + n + '" aria-hidden="true"></i>'; };
var $ = function (sel) { return document.querySelector(sel); };

/* The moments, in the order a reader meets them. `at` is what the mark
   points at; `points` are the walkthrough's stops, each with fallbacks. */
var MOMENTS = [
  { key: 'hero', n: 1, title: 'Your day, first', tab: null,
    line: 'The top of the page is what needs you today, worked out from the weekly report for the seat you are viewing.',
    points: [{ t: 'The week in three numbers. Hover one for the full sentence.', at: '#weekSummary .wk-chip, #weekSummary' },
             { t: 'Each focus card is one decision: the gap, the deal to land, the weakest platform, the thinnest month. Its button takes you to where it sits on the board.', at: '#cardSlider' },
             { t: 'Get more done takes you straight to the sales board below.', at: '#dashLink' }],
    at: function () { return $('#cardSlider'); } },
  { key: 'viewas', n: 2, title: 'View as anyone', tab: null,
    line: 'The board is one page for every seat. Pick a line, a head, a manager or a salesperson and every tile rescopes to them.',
    points: [{ t: 'Who you are viewing as: Leadership, VP, Head of Sales, Sales Manager or Salesperson.', at: '#seatLevel' },
             { t: 'Each choice offers only what sits under the one before it: line, then head, then manager, then salesperson.', at: '#fLine, #seatPath' },
             { t: 'October, to date and Projection: the same seat, this month or the four-month sprint.', at: '#controls .views' },
             { t: 'Key 1 folds the nav for more room; press it again to bring it back.', at: '#shellSidebarNav, #seatPath' }],
    at: function () { return $('#seatPath'); } },
  { key: 'month', n: 3, title: 'Will we make October?', tab: 'now',
    line: 'Forecast is won-booked plus 80% deals weighted at 80%. The rest of what is logged counts toward coverage, and the gap is new business.',
    points: [{ t: 'The four numbers: forecast, won-booked, weighted 80%, and the new business still to find.', at: '#standSec' },
             { t: 'The gauge: forecast against target, with everything logged behind it and the 50% and 60% lines.', at: '.gauge-t', id: 'gauge' },
             { t: 'The bridge: from what is booked to the target, in ringgit. Hover a column for what it holds.', at: '#bridgeSec' },
             { t: 'What it takes: tick the moves and watch the lines. Nothing is saved; it is arithmetic on the report.', at: '#simSec', id: 'sim' }],
    at: function () { return $('#standSec'); } },
  { key: 'heads', n: 4, title: 'Who needs help', tab: 'now',
    line: 'Every head, or every person in a team, against their own target. Open a row for their team, their months and their top deals.',
    points: [{ t: 'Each bar is forecast against target, with the rest of coverage behind it. The badge says where they stand.', at: '#lbRows .hr, #teamSec .hr' },
             { t: 'Click a row: it opens in place. Open another and the first one folds away.', at: '#lbRows .hr, #teamSec .hr' },
             { t: 'Gap or Lead: largest gap first, or grouped by VP line.', at: '#leadSec .c-segctl, #leadSec, #teamSec' },
             { t: 'The four-month sprint at a glance: one dot per month, shaded by how much is logged. A dot opens that month.', at: '#dotsSec', id: 'dots' }],
    at: function () { return $('#leadSec') || $('#teamSec'); } },
  { key: 'deals', n: 5, title: 'Two ways to move the number', tab: 'now',
    line: 'Push the 50% deals to close, and get the 80% deals booked. Each row is the campaign, the brand, its channels and who holds it.',
    points: [{ t: 'Push to close: deals in negotiation at 50%. Moving one to 80% adds 80% of it to the forecast.', at: '#dealsSec' },
             { t: 'Get it booked: agreed verbally, waiting on paperwork. Paperwork turns each one into won-booked.', at: '#dealsSec + .t, #dealsSec' },
             { t: 'Hover a row: long names run so you can read them, and the full brand, channels and person are in the tip.', at: '#dealsSec .dl' },
             { t: 'In the bank: what is already booked or won this month.', at: '#bankSec' }],
    at: function () { return $('#dealsSec'); } },
  { key: 'sprint', n: 6, title: 'The four-month sprint', tab: 'next',
    line: 'Projection shows October to January in ringgit: what is booked and logged in each month, and the new business still to find.',
    points: [{ t: 'Each month up to its own target. The gold label is what is still to find; hover a month for its breakdown.', at: '#sprintSec .months, #sprintSec' },
             { t: 'The runway: the four months added up, as one bar and its parts.', at: '#runwaySec' },
             { t: 'Pick a month: what is in negotiation, what is already in the bank, and what it would take.', at: '#monthSec' },
             { t: 'Where the gap is forming: each cell is a month. Hover a row for its bars; click a cell to open that month.', at: '#gridSec' }],
    at: function () { return $('#sprintSec'); } }
];
/* A page can leave a section out (window.BOARD_OMIT, by point id); the
   Guide then skips the stops that would point at it. */
function live(p) { return !p.id || (window.BOARD_OMIT || []).indexOf(p.id) < 0; }
function byKey(k) { return MOMENTS.filter(function (m) { return m.key === k; })[0]; }

/* ── What the reader has done, per browser ── */
function state() { try { return JSON.parse(localStorage.getItem(KEY) || '{}'); } catch (e) { return {}; } }
function put(s) { try { localStorage.setItem(KEY, JSON.stringify(s)); } catch (e) {} }
function bump(k, what) { var s = state(); s[what] = s[what] || {}; s[what][k] = (s[what][k] || 0) + 1; put(s); }
function isDone(k) { return !!(state().done || {})[k]; }
function doneCount() { return MOMENTS.filter(function (m) { return isDone(m.key); }).length; }
function mayAuto(k) { var s = state(); return !isDone(k) && ((s.shown || {})[k] || 0) < 2 && ((s.skip || {})[k] || 0) < 2; }
function done(k) {
  if (!byKey(k) || isDone(k)) return;
  var s = state(); s.done = s.done || {}; s.done[k] = 1; put(s);
  /* doing the thing counts as done, but never cuts short a walkthrough the
     reader is in the middle of: that one stays until they finish it */
  marks.slice().forEach(function (rec) { if (rec.key === k && rec.step < 0) close(rec.card); });
  paintEntry();
}

/* ── Not now: loading, a menu or popup, typing, the entrance ── */
/* a popup counts only when it is actually on screen: the page keeps its
   dialogs in the DOM, hidden by CSS */
function shownOnScreen(x) { if (!x.getClientRects().length) return false; var cs = getComputedStyle(x); return cs.visibility !== 'hidden' && +cs.opacity > 0.05 && cs.display !== 'none'; }
function popupOpen() { return [].some.call(document.querySelectorAll('#accountMenu.is-open, .gd-sheet, [aria-modal="true"], [role="dialog"]:not(.gd-mark)'), shownOnScreen); }
function busy(m) {
  var a = document.activeElement;
  if (!document.getElementById('askBox') || !document.getElementById('askBox').classList.contains('is-revealed')) return true;   // the entrance is still playing
  if (m && m.tab && document.querySelector('#boardBody .sk-wrap')) return true;   // a board moment waits for the board to load
  if (popupOpen()) return true;
  if (a && a.closest && a.closest('input, textarea, select, [contenteditable="true"]')) return true;
  return false;
}
function onTab(m) { var b = document.getElementById('salesBoard'); return !m.tab || !b || b.dataset.h === m.tab; }

/* ── The coach mark: one small card by the thing, a ring on the thing ── */
var marks = [], offered = {}, lastClose = 0;   // once per visit, and a quiet spell after any mark closes
function visible(el) { var r = el.getBoundingClientRect(); return r.width && r.height; }
function pick(sels) {
  var out = null;
  String(sels || '').split(',').some(function (sel) { out = [].filter.call(document.querySelectorAll(sel.trim()), visible)[0] || null; return !!out; });
  return out;
}
function note(k, opts) {
  opts = opts || {};
  var m = byKey(k); if (!m) return;
  if (!opts.force && !mayAuto(k)) return;
  if (document.querySelector('.gd-mark')) return;   // one at a time
  var el = m.at();
  if (!el || !visible(el)) return;
  if (!opts.force) { bump(k, 'shown'); offered[k] = 1; }
  var r0 = el.getBoundingClientRect();
  if (r0.top < 96 || r0.top > innerHeight - 160) el.scrollIntoView({ block: 'center', behavior: REDUCED ? 'auto' : 'smooth' });
  var card = document.createElement('div');
  card.className = 'gd-mark'; card.setAttribute('data-key', k); card.setAttribute('role', 'dialog'); card.setAttribute('aria-label', m.title);
  var rec = { card: card, el: el, key: k, step: -1 }, pts = (m.points || []).filter(live);
  function head() { return '<span class="gd-k">' + ic('sparkle', true) + 'Guide · ' + m.n + ' of ' + MOMENTS.length + '</span><b>' + esc(m.title) + '</b>'; }
  function paint() {
    if (rec.step < 0) {
      card.innerHTML = head() + '<p>' + esc(m.line) + '</p><div class="gd-acts">' +
        (pts.length ? '<button type="button" class="c-btn c-btn-primary c-btn-sm" data-gd="walk">' + ic('footprints', true) + 'Walk me through</button>' : '') +
        '<button type="button" class="c-btn c-btn-ghost c-btn-sm" data-gd="ok">Got it</button></div>';
    } else {
      var pt = pts[rec.step], last = rec.step === pts.length - 1, nx = MOMENTS[MOMENTS.indexOf(m) + 1];
      card.innerHTML = head() + '<p class="gd-step"><span class="gd-step-n">' + (rec.step + 1) + ' of ' + pts.length + '</span>' + esc(pt.t) + '</p><div class="gd-acts">' +
        (rec.step ? '<button type="button" class="c-btn c-btn-ghost c-btn-sm" data-gd="back">Back</button>' : '') +
        (!last ? '<button type="button" class="c-btn c-btn-primary c-btn-sm" data-gd="next">Next' + ic('arrow-right') + '</button>'
          : nx ? '<button type="button" class="c-btn c-btn-primary c-btn-sm" data-gd="onward">Next: ' + esc(nx.title) + ic('arrow-right') + '</button><button type="button" class="c-btn c-btn-ghost c-btn-sm" data-gd="done">Done for now</button>'
          : '<button type="button" class="c-btn c-btn-primary c-btn-sm" data-gd="done">Finish' + ic('check') + '</button>') + '</div>';
    }
    card.insertAdjacentHTML('beforeend', '<button type="button" class="gd-x" aria-label="Close" data-gd="x">' + ic('x') + '</button><span class="gd-tail" aria-hidden="true"></span>');
    place(rec);
  }
  function goStep(i) {
    rec.step = i;
    var target = pick(pts[i].at) || el;
    if (target !== rec.el) {
      unring(rec.el); rec.el = target; ring(target);
      var r = target.getBoundingClientRect();
      if (r.top < 96 || r.bottom > innerHeight - 96) target.scrollIntoView({ block: 'center', behavior: REDUCED ? 'auto' : 'smooth' });
    }
    paint();
  }
  paint();
  document.body.appendChild(card);
  ring(el); marks.push(rec); place(rec);
  requestAnimationFrame(function () { card.classList.add('is-in'); });
  if (opts.walk && pts.length) setTimeout(function () { goStep(0); }, 400);
  card.addEventListener('click', function (e) {
    var b = e.target.closest('[data-gd]'); if (!b) return;
    var what = b.getAttribute('data-gd');
    if (what === 'walk') return goStep(0);
    if (what === 'next') return goStep(Math.min(pts.length - 1, rec.step + 1));
    if (what === 'back') return goStep(Math.max(0, rec.step - 1));
    if (what === 'done') { close(card); done(k); return; }
    if (what === 'onward') { var nx2 = MOMENTS[MOMENTS.indexOf(m) + 1]; close(card); done(k); if (nx2) setTimeout(function () { show(nx2.key); }, REDUCED ? 0 : 280); return; }
    if (!isDone(k) && !opts.force && rec.step < 0) bump(k, 'skip');
    close(card);
  });
  var onKey = function (e) { if (e.key === 'Escape') { if (!isDone(k) && !opts.force) bump(k, 'skip'); close(card); } };
  document.addEventListener('keydown', onKey);
  rec.off = function () { document.removeEventListener('keydown', onKey); };
  /* follows the thing: on every scroll frame, and every half second for a
     board re-render that swaps the element underneath it */
  var raf = 0, follow = function () { if (raf) return; raf = requestAnimationFrame(function () { raf = 0; place(rec); }); };
  var sc = document.querySelector('.c-shell-content');
  window.addEventListener('scroll', follow, true); window.addEventListener('resize', follow);
  rec.tick = setInterval(function () {
    if (!document.body.contains(card)) return close(card);   // the card itself went away: stop following
    if (!document.body.contains(rec.el)) { var again = (rec.step >= 0 && pick(pts[rec.step].at)) || m.at(); if (again) { rec.el = again; ring(again); } else return close(card); }
    if (!rec.el.classList.contains('gd-ring')) ring(rec.el);
    place(rec);
    /* an offered mark (not a walkthrough the reader asked for) quietly
       steps aside once its part of the page has been scrolled away from */
    if (rec.awaySince && rec.step < 0 && !opts.force && Date.now() - rec.awaySince > 1500) close(card);
  }, 500);
  var offKey = rec.off;
  rec.off = function () { offKey && offKey(); window.removeEventListener('scroll', follow, true); window.removeEventListener('resize', follow); if (raf) cancelAnimationFrame(raf); };
  void sc;
}
function ring(el) { el.classList.add('gd-ring'); if (getComputedStyle(el).borderRadius === '0px') { el.setAttribute('data-gd-r', '1'); el.style.borderRadius = '12px'; } }
function unring(el) { if (!el) return; el.classList.remove('gd-ring'); if (el.getAttribute('data-gd-r')) { el.style.borderRadius = ''; el.removeAttribute('data-gd-r'); } }
function place(rec) {
  var c = rec.card, w = c.offsetWidth, h = c.offsetHeight, pad = 12;
  var box = (document.querySelector('.c-shell-content') || document.body).getBoundingClientRect();
  var L = Math.max(8, box.left + 8), Rt = Math.min(innerWidth - 8, box.right - 8), T = Math.max(8, box.top + 8), Bm = Math.min(innerHeight - 8, box.bottom - 8);
  var t0 = rec.el.getBoundingClientRect();
  /* the part of the thing actually on screen (anywhere on screen: the nav
     counts); the card itself stays inside the content area */
  var r = { left: Math.max(t0.left, 0), right: Math.min(t0.right, innerWidth), top: Math.max(t0.top, 0), bottom: Math.min(t0.bottom, innerHeight) };
  r.width = r.right - r.left; r.height = r.bottom - r.top;
  var away = r.width < 8 || r.height < 8;
  c.classList.toggle('is-away', away);
  if (away) { rec.awaySince = rec.awaySince || Date.now(); return; }
  rec.awaySince = 0;
  c.classList.remove('is-above', 'is-right', 'is-left', 'no-tail');
  var narrow = r.width < (Rt - L) * 0.45, roomRight = r.right + pad + w < Rt, roomLeft = r.left - pad - w > L;
  if (narrow && (roomRight || roomLeft)) {   // beside a small thing, covering nothing under it
    var left = roomRight ? r.right + pad : r.left - pad - w, top = Math.max(T, Math.min(Bm - h, r.top));
    c.style.top = top + 'px'; c.style.left = left + 'px';
    c.classList.add(roomRight ? 'is-right' : 'is-left');
    c.style.setProperty('--tail', Math.max(16, Math.min(h - 24, r.top + Math.min(r.height / 2, 24) - top)) + 'px');
    return;
  }
  var below = r.bottom + pad + h < Bm, above = r.top - pad - h > T;
  var left2 = Math.min(Math.max(L, r.left + Math.min(r.width / 2, 160) - w / 2), Rt - w);
  if (below || above) {
    c.style.top = (below ? r.bottom + pad : r.top - pad - h) + 'px';
    c.classList.toggle('is-above', !below);
  } else {   // a big thing filling the screen: the card sits inside its top-left corner, no tail
    c.style.top = Math.max(T, Math.min(Bm - h, r.top + 16)) + 'px';
    left2 = Math.min(Math.max(L, r.left + 16), Rt - w);
    c.classList.add('no-tail');
  }
  c.style.left = left2 + 'px';
  c.style.setProperty('--tail', Math.max(16, Math.min(w - 24, r.left + Math.min(r.width / 2, 160) - left2 - 6)) + 'px');
}
function close(card) {
  var i = marks.map(function (x) { return x.card; }).indexOf(card); if (i < 0) { if (card && card.remove) card.remove(); return; }
  var rec = marks[i]; marks.splice(i, 1); lastClose = Date.now();
  clearInterval(rec.tick); if (rec.off) rec.off();
  unring(rec.el);
  card.classList.remove('is-in');
  setTimeout(function () { card.remove(); }, REDUCED ? 0 : 260);
}

/* ── Show me: go to the real thing (its tab first) and walk it ── */
function show(k) {
  var m = byKey(k); if (!m) return;
  document.querySelectorAll('.gd-mark').forEach(close);
  var wait = 0;
  if (m.tab && !onTab(m)) { var b = document.querySelector('#salesBoard [data-view="' + m.tab + '"]'); if (b) { b.click(); wait = 1400; } }   // the tab loads first
  setTimeout(function () {
    var el = m.at(); if (!el) return;
    el.scrollIntoView({ block: 'center', behavior: REDUCED ? 'auto' : 'smooth' });
    setTimeout(function () { note(k, { force: true, walk: true }); }, REDUCED ? 60 : 650);
  }, wait);
}

/* ── The Guide sheet: the six moments, ticked, each with Show me ── */
var sheet = null;
function closeSheet() { if (!sheet) return; var s = sheet; sheet = null; s.classList.remove('is-open'); setTimeout(function () { s.remove(); }, REDUCED ? 0 : 220); document.removeEventListener('keydown', sheetKey); }
function sheetKey(e) { if (e.key === 'Escape') closeSheet(); }
function open() {
  if (sheet) return closeSheet();
  marks.slice().forEach(function (x) { close(x.card); });   // the Guide takes over from any mark on screen
  var n = doneCount();
  var rows = MOMENTS.map(function (m) {
    var d = isDone(m.key);
    return '<div class="gd-row' + (d ? ' is-done' : '') + '"><span class="gd-n">' + (d ? ic('check') : m.n) + '</span><span class="gd-t"><b>' + esc(m.title) + '</b><small>' + esc(m.line) + '</small>' +
      '<ul class="gd-pts">' + m.points.filter(live).map(function (p) { return '<li>' + esc(p.t) + '</li>'; }).join('') + '</ul></span>' +
      '<button type="button" class="c-btn ' + (d ? 'c-btn-ghost' : 'c-btn-secondary') + ' c-btn-sm" data-gd-show="' + m.key + '">' + ic('play', true) + (d ? 'Again' : 'Show me') + '</button></div>';
  }).join('');
  sheet = document.createElement('div');
  sheet.className = 'gd-sheet'; sheet.setAttribute('role', 'dialog'); sheet.setAttribute('aria-modal', 'true'); sheet.setAttribute('aria-label', 'Guide');
  sheet.innerHTML = '<div class="gd-scrim" data-gd-close></div><div class="gd-panel"><button type="button" class="gd-x" aria-label="Close" data-gd-close>' + ic('x') + '</button>' +
    '<div class="gd"><h4>The sales board, in six moments</h4><p class="gd-lead">' + (n === MOMENTS.length ? 'You have been through all six. Play any of them again.' : n ? n + ' of ' + MOMENTS.length + ' done. Each one plays on the board itself, on the seat you are viewing.' : 'Six moments, each played on the board itself, on the seat you are viewing. Nothing here changes any numbers.') + '</p>' +
    '<div class="gd-track" aria-hidden="true">' + MOMENTS.map(function (m) { return '<i class="' + (isDone(m.key) ? 'ok' : '') + '"></i>'; }).join('') + '</div>' + rows +
    '<p class="gd-foot">Keys: <kbd>1</kbd> folds the nav · <kbd>?</kbd> opens this Guide · <kbd>Esc</kbd> closes it.</p></div></div>';
  document.body.appendChild(sheet);
  requestAnimationFrame(function () { sheet.classList.add('is-open'); });
  sheet.addEventListener('click', function (e) {
    var x = e.target.closest('[data-gd-show]'); if (x) { var k = x.getAttribute('data-gd-show'); closeSheet(); show(k); return; }
    if (e.target.closest('[data-gd-close]')) closeSheet();
  });
  document.addEventListener('keydown', sheetKey);
  var f = sheet.querySelector('[data-gd-show]'); if (f) f.focus({ preventScroll: true });
}

/* ── The way in: the account menu, and "?" ── */
function paintEntry() {
  var menu = document.getElementById('accountMenu'); if (!menu) return;
  var n = doneCount(), b = menu.querySelector('.gd-entry');
  if (!b) {
    b = document.createElement('button'); b.type = 'button'; b.className = 'c-account-menu-item gd-entry'; b.setAttribute('role', 'menuitem');
    menu.insertBefore(b, menu.firstChild);
    b.addEventListener('click', function () { setTimeout(open, 60); });   // the menu closes itself, then the Guide opens
  }
  b.innerHTML = ic('compass', true) + '<span>Guide</span><small class="gd-count">' + (n === MOMENTS.length ? 'all done' : n + ' of ' + MOMENTS.length) + '</small>';
}
document.addEventListener('keydown', function (e) {
  if (e.key !== '?' || e.defaultPrevented || e.metaKey || e.ctrlKey || e.altKey) return;
  var t = e.target; if (t && t.closest && t.closest('input, textarea, select, [contenteditable]')) return;
  e.preventDefault(); open();
});

/* ── Done by doing: the things each moment teaches ── */
document.addEventListener('change', function (e) { if (e.target && /^(fLine|fHos|fMgr|fPerson)$/.test(e.target.id)) done('viewas'); }, true);
document.addEventListener('click', function (e) {
  var t = e.target.closest && e.target.closest('[data-open], [data-view="next"], [data-gm], .c-card-slide [data-decision], #dashLink a');
  if (!t) return;
  if (t.hasAttribute('data-open')) done('heads');
  else if (t.getAttribute('data-view') === 'next' || t.hasAttribute('data-gm')) done('sprint');
  else done('hero');
}, true);
document.addEventListener('change', function (e) { if (e.target && e.target.matches && e.target.matches('[data-pick]')) done('month'); }, true);

/* ── On view: a moment offers itself when its part of the board is in sight ── */
function watch() {
  if (document.querySelector('.gd-mark') || busy() || Date.now() - lastClose < 20000) return;   // the entrance, a popup, typing; and room to breathe after a mark
  for (var i = 0; i < MOMENTS.length; i++) {
    var m = MOMENTS[i]; if (offered[m.key] || !mayAuto(m.key) || !onTab(m) || busy(m)) continue;
    var el = m.at(); if (!el || !visible(el)) continue;
    var r = el.getBoundingClientRect();
    if (r.top < innerHeight * 0.55 && r.bottom > innerHeight * 0.35) { note(m.key); return; }   // well into view, not just peeking
  }
}
function boot() { paintEntry(); setInterval(watch, 1200); }
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();

/* the board calls this right after it re-renders, so a ring moves to
   the new element at once instead of on the next half-second check */
function refresh() {
  marks.forEach(function (rec) {
    if (document.body.contains(rec.el)) return;
    var m = byKey(rec.key), pts = (m.points || []).filter(live);
    var again = (rec.step >= 0 && pick(pts[rec.step].at)) || m.at();
    if (again) { rec.el = again; ring(again); place(rec); }
  });
}
window.boardGuide = { popupOpen: popupOpen, refresh: refresh, MOMENTS: MOMENTS, note: note, done: done, isDone: isDone, open: open, show: show, state: state,
  reset: function () { try { localStorage.removeItem(KEY); } catch (e) {} paintEntry(); } };
})();
