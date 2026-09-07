/* Collabrium app shell behaviour, shared by settings.html and users.html.
   Ported from feedback-v1.html, which documents each piece: the rail's
   collapse, the account menu, the department switcher, the collapsed rail's
   hover label. Added here: the toast, filling the account row from the
   viewer, and the "Viewing as" control.

   Usage, after the markup is in the page and shared/access.js is loaded:
     CollabShell.init({ onViewerChange: function (viewer) { ... } });
   init() returns the viewer. CollabShell.toast(tone, title, message) shows
   a toast in #toasts. CollabShell.esc(s) escapes text for innerHTML. */
(function () {
  'use strict';
  var REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var NARROW = window.matchMedia('(max-width:640px)');

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  /* ── Sidebar collapse ─────────────────────────────────────────────── */
  /* The rail remembers how you left it. The first visit keeps the
     dashboard's habit of minimising itself once the page has settled; from
     then on, every page opens the rail the way the last page left it. */
  var RAIL_KEY = 'collabrium.shell.rail';
  function storedRail() {
    try { return localStorage.getItem(RAIL_KEY); } catch (e) { return null; }
  }
  function rememberRail(on) {
    try { localStorage.setItem(RAIL_KEY, on ? 'collapsed' : 'expanded'); } catch (e) {}
  }
  function setCollapsed(on, remember) {
    var nav = document.getElementById('shellSidebarNav');
    if (!nav) return;
    nav.classList.toggle('is-collapsed', on);
    var t = document.getElementById('sidebarToggle');
    if (t) t.setAttribute('aria-label', on ? 'Expand sidebar' : 'Collapse sidebar');
    var arrow = document.getElementById('sidebarArrow');
    if (arrow) arrow.setAttribute('d', on ? 'M11.5 7 14 10l-2.5 3' : 'M13.5 7 11 10l2.5 3');
    if (remember) rememberRail(on);
  }
  function initSidebar() {
    var remembered = storedRail();
    if (NARROW.matches) setCollapsed(true);
    else if (remembered === 'collapsed') setCollapsed(true);
    else if (remembered === 'expanded') setCollapsed(false);
    /* No memory yet: the rail minimises itself once the page has settled,
       cancelled by a click on it, and whichever way it ends up is kept. */
    if (!NARROW.matches && !remembered) {
      if (REDUCED) { rememberRail(false); }
      else {
        var timer = setTimeout(function () {
          var nav = document.getElementById('shellSidebarNav');
          if (nav && !nav.classList.contains('is-collapsed')) setCollapsed(true, true);
        }, 1600);
        var shell = document.getElementById('shellSidebarShell');
        if (shell) shell.addEventListener('click', function () { clearTimeout(timer); rememberRail(false); }, { once: true });
      }
    }
    document.addEventListener('click', function (e) {
      if (!NARROW.matches || e.target.closest('#shellSidebarShell') ||
          e.target.closest('#accountMenu') || e.target.closest('#deptDropdown')) return;
      setCollapsed(true);
    });
    var toggle = document.getElementById('sidebarToggle');
    if (toggle) toggle.addEventListener('click', function () {
      setCollapsed(!document.getElementById('shellSidebarNav').classList.contains('is-collapsed'), true);
    });
  }

  /* ── Page to page: a soft leave and arrive, not a hard cut ─────────── */
  /* A same-folder page link fades the main column out under a thin
     progress bar, then navigates; the next page arrives faded in. The
     browser's own history and new-tab behaviours are left alone: only a
     plain left click on a local .html link takes this path. */
  function initTransitions() {
    var main = document.querySelector('.c-shell-main');
    if (!main) return;
    var bar = document.createElement('div');
    bar.className = 'pg-progress';
    bar.setAttribute('aria-hidden', 'true');
    document.body.appendChild(bar);
    /* Only a page that is actually being painted fades in; a hidden tab
       would stall the animation clock and sit invisible. A timer backstops
       the frame callbacks for the same reason. */
    if (!REDUCED && document.visibilityState === 'visible') {
      main.classList.add('is-arriving');
      var arrive = function () { main.classList.remove('is-arriving'); };
      requestAnimationFrame(function () { requestAnimationFrame(arrive); });
      setTimeout(arrive, 400);
    }
    document.addEventListener('click', function (e) {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      var a = e.target.closest('a[href]');
      if (!a || a.target || a.hasAttribute('download') || a.getAttribute('aria-disabled') === 'true') return;
      var href = a.getAttribute('href') || '';
      if (!/^[a-z0-9-]+\.html(\?[^#]*)?(#.*)?$/i.test(href)) return;
      e.preventDefault();
      bar.classList.add('is-on');
      if (REDUCED) { location.href = a.href; return; }
      main.classList.add('is-leaving');
      setTimeout(function () { location.href = a.href; }, 170);
    });
    /* Back-forward cache restores the page mid-leave; undo that. */
    window.addEventListener('pageshow', function (ev) {
      if (ev.persisted) { main.classList.remove('is-leaving'); bar.classList.remove('is-on'); }
    });
  }

  /* ── Account menu ─────────────────────────────────────────────────── */
  function initAccountMenu() {
    var trigger = document.getElementById('accountMenuTrigger');
    var menu = document.getElementById('accountMenu');
    if (!trigger || !menu) return;
    function place() {
      var r = trigger.getBoundingClientRect();
      var w = menu.offsetWidth || 200;
      menu.style.left = Math.max(8, Math.min(r.left + r.width / 2 - w / 2, window.innerWidth - w - 8)) + 'px';
      menu.style.bottom = (window.innerHeight - r.top + 8) + 'px';
    }
    function close() {
      menu.classList.remove('is-open');
      menu.setAttribute('aria-hidden', 'true');
      trigger.setAttribute('aria-expanded', 'false');
    }
    function open() {
      place();
      menu.classList.add('is-open');
      menu.setAttribute('aria-hidden', 'false');
      trigger.setAttribute('aria-expanded', 'true');
    }
    trigger.addEventListener('click', function (e) {
      e.stopPropagation();
      if (menu.classList.contains('is-open')) close(); else open();
    });
    menu.addEventListener('click', function (e) {
      if (e.target.closest('.c-account-menu-item')) close();
    });
    document.addEventListener('click', function (e) {
      if (!menu.classList.contains('is-open')) return;
      if (e.target.closest('#accountMenu') || e.target.closest('#accountMenuTrigger')) return;
      close();
    });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
    window.addEventListener('resize', function () { if (menu.classList.contains('is-open')) place(); });
  }

  /* ── Department switcher ──────────────────────────────────────────── */
  function initDeptSwitcher() {
    var trigger = document.querySelector('.js-dept-trigger');
    var panel = document.getElementById('deptDropdown');
    if (!trigger || !panel) return;
    var liveMark = trigger.querySelector('.js-dept-logo-live');
    var staticMark = trigger.querySelector('.js-dept-logo-static');
    var collapsedMark = document.querySelector('.js-dept-logo-collapsed');
    var chevron = trigger.querySelector('.js-dept-chevron');
    function place() {
      var r = trigger.getBoundingClientRect();
      var w = panel.offsetWidth || 240;
      panel.style.left = Math.max(8, Math.min(r.left, window.innerWidth - w - 8)) + 'px';
      panel.style.top = (r.bottom + 8) + 'px';
    }
    function close() {
      panel.hidden = true;
      trigger.setAttribute('aria-expanded', 'false');
      if (chevron) chevron.classList.replace('ph-caret-up', 'ph-caret-down');
    }
    function open() {
      panel.hidden = false;
      place();
      trigger.setAttribute('aria-expanded', 'true');
      if (chevron) chevron.classList.replace('ph-caret-down', 'ph-caret-up');
    }
    trigger.addEventListener('click', function (e) {
      e.stopPropagation();
      if (panel.hidden) open(); else close();
    });
    panel.addEventListener('click', function (e) {
      var opt = e.target.closest('.c-dept-option');
      if (!opt) return;
      /* A department that owns a deployed product opens it in a new tab,
         as the dashboard does, and leaves this shell's lockup alone. */
      if (opt.dataset.href) {
        window.open(opt.dataset.href, '_blank', 'noopener');
        close();
        return;
      }
      var all = panel.querySelectorAll('.c-dept-option');
      for (var i = 0; i < all.length; i++) {
        var on = all[i] === opt;
        all[i].classList.toggle('is-active', on);
        all[i].setAttribute('aria-selected', String(on));
      }
      var logo = opt.dataset.logo;
      if (logo) {
        staticMark.src = logo;
        staticMark.alt = opt.dataset.name || '';
        staticMark.style.display = '';
        liveMark.style.display = 'none';
      } else {
        staticMark.style.display = 'none';
        staticMark.removeAttribute('src');
        liveMark.style.display = '';
      }
      if (collapsedMark && opt.dataset.elementIcon) collapsedMark.src = opt.dataset.elementIcon;
      trigger.setAttribute('aria-label', 'Switch department, ' + (opt.dataset.name || ''));
      close();
    });
    document.addEventListener('click', function (e) {
      if (panel.hidden) return;
      if (e.target.closest('#deptDropdown') || e.target.closest('.js-dept-trigger')) return;
      close();
    });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
    window.addEventListener('resize', function () { if (!panel.hidden) place(); });
  }

  /* ── Collapsed rail hover label ───────────────────────────────────── */
  function initHoverLabel() {
    var label = document.getElementById('shellSidebarHoverLabel');
    if (!label) return;
    function show(item) {
      var nav = item.closest('.c-sidebar');
      var source = item.querySelector('.c-sidebar-hover-text');
      if (!nav || !nav.classList.contains('is-collapsed') || !source) return;
      var icon = item.querySelector('i');
      if (!icon) return;
      var ir = icon.getBoundingClientRect();
      label.textContent = source.textContent;
      label.style.left = (nav.getBoundingClientRect().right + 8) + 'px';
      label.style.top = (ir.top + ir.height / 2) + 'px';
      label.style.transform = 'translateY(-50%)';
      label.classList.add('is-visible');
    }
    function hide() { label.classList.remove('is-visible'); }
    document.addEventListener('mouseover', function (e) {
      var item = e.target.closest('.c-sidebar-item');
      if (item && !item.contains(e.relatedTarget)) show(item);
    });
    document.addEventListener('mouseout', function (e) {
      var item = e.target.closest('.c-sidebar-item');
      if (item && !item.contains(e.relatedTarget)) hide();
    });
    document.addEventListener('focusin', function (e) {
      var item = e.target.closest('.c-sidebar-item');
      if (item) show(item);
    });
    document.addEventListener('focusout', function (e) {
      var item = e.target.closest('.c-sidebar-item');
      if (item) hide();
    });
  }

  /* ── Toast ────────────────────────────────────────────────────────── */
  function toast(tone, title, message) {
    var host = document.getElementById('toasts');
    if (!host) return;
    var el = document.createElement('div');
    el.className = 'c-toast is-entering';
    el.setAttribute('role', 'status');
    el.innerHTML = '<i class="ph-fill ' +
        (tone === 'success' ? 'ph-check-circle' : tone === 'warning' ? 'ph-warning-circle' : 'ph-info') +
        ' tone tone-' + (tone === 'success' ? 'success' : tone === 'warning' ? 'warning' : 'neutral') + '"></i>' +
      '<div class="body"><div class="title">' + esc(title) + '</div>' +
      (message ? '<div class="message">' + esc(message) + '</div>' : '') + '</div>';
    host.appendChild(el);
    requestAnimationFrame(function () { el.classList.remove('is-entering'); });
    setTimeout(function () {
      el.classList.add('is-exiting');
      setTimeout(function () { if (el.parentNode) el.parentNode.removeChild(el); }, REDUCED ? 0 : 240);
    }, 4000);
  }

  /* ── The viewer: account row and "Viewing as" ─────────────────────── */
  function paintAccount(viewer) {
    var A = window.CollabAccess;
    var av = document.querySelector('#accountMenuTrigger .c-search-input-avatar');
    var title = document.querySelector('#accountMenuTrigger .c-search-input-title');
    var sub = document.querySelector('#accountMenuTrigger .c-search-input-subtitle');
    if (av) av.textContent = A.initials(viewer.name);
    if (title) title.textContent = viewer.name;
    if (sub) sub.textContent = A.roleLabel(viewer.role);
  }
  function mountViewingAs(viewer, onChange) {
    var A = window.CollabAccess;
    var host = document.getElementById('viewingAs');
    if (!host) return;
    host.innerHTML = '<span>Viewing as <em class="va-note">(remove in actual implementation)</em></span><div class="va-seg" role="group" aria-label="Viewing as">' +
      A.VIEWER_ROLES.map(function (r) {
        return '<button type="button" data-role="' + r + '" aria-pressed="' + (r === viewer.role) + '">' +
          esc(A.roleLabel(r)) + '</button>';
      }).join('') + '</div>';
    host.addEventListener('click', function (e) {
      var b = e.target.closest('button[data-role]');
      if (!b) return;
      A.setViewer(localStorage, b.dataset.role);
      var v = A.getViewer(localStorage);
      host.querySelectorAll('button[data-role]').forEach(function (x) {
        x.setAttribute('aria-pressed', String(x.dataset.role === v.role));
      });
      paintAccount(v);
      if (onChange) onChange(v);
    });
  }

  function init(opts) {
    opts = opts || {};
    initSidebar();
    initTransitions();
    initAccountMenu();
    initDeptSwitcher();
    initHoverLabel();
    var viewer = window.CollabAccess.getViewer(localStorage);
    paintAccount(viewer);
    mountViewingAs(viewer, opts.onViewerChange);
    return viewer;
  }

  window.CollabShell = { init: init, toast: toast, esc: esc, setCollapsed: setCollapsed };
})();
