/* Saturday Services hub. Reads links.json, renders the parent page or one house page.
   A house page sets <html data-skin> so the whole page wears that house. */
(function () {
  'use strict';

  var MARKS = {
    services: '<svg class="sat-mark" viewBox="0 0 48 48" aria-hidden="true"><path d="M33.37 11.6 A14 14 0 0 1 19.67 35.32"/><path d="M14.63 32.4 A14 14 0 0 1 28.33 8.68"/><path d="M6 43 H20 M28 43 H42"/></svg>',
    shakes: '<svg class="sat-mark" viewBox="-90 -110 2020 6060" aria-hidden="true"><path d="M1736.7 1731.7 L1546.2 90.2 C1287.7 -43.7 431.5 -10.9 263.5 74.3 L0.0 2388.9 C431.5 2519.4 1201.2 2547.4 1759.0 2401.6"/><path d="M81.0 2336.5 C607.5 2482.3 1453.1 2425.7 1841.5 2304.8 C1823.0 2760.1 1671.1 5163.3 1514.5 5706.8 C1349.6 5855.0 539.5 5903.1 298.4 5694.1 C186.0 4943.5 85.5 4188.1 25.4 3363.6"/></svg>',
    solutions: '<svg class="sat-mark" viewBox="0 0 48 48" aria-hidden="true"><path d="M22 8 H15 A7 7 0 0 0 8 15 V33 A7 7 0 0 0 15 40 H18"/><path d="M26 40 H33 A7 7 0 0 0 40 33 V15 A7 7 0 0 0 33 8 H30"/><circle cx="17" cy="17" r="2.6" fill="currentColor" stroke="none"/><circle cx="24" cy="24" r="2.6" fill="currentColor" stroke="none"/><circle cx="31" cy="31" r="2.6" fill="currentColor" stroke="none"/></svg>',
    mn: '<svg class="sat-mark" viewBox="0 0 48 48" aria-hidden="true"><path d="M26.06 16.51 A11 11 0 1 1 21.6 13.61"/><path d="M21.94 31.49 A11 11 0 1 1 26.4 34.39"/></svg>'
  };
  var SHORT = { shakes: 'Shakes', solutions: 'Solutions', mn: 'M&N' };
  var SKINS = ['shakes', 'solutions', 'mn'];

  var root = document.documentElement;
  var main = document.getElementById('main');
  var drink = document.querySelector('.hub-drink');
  var houses = [];

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function count(n, word) { return n + ' ' + word + (n === 1 ? '' : 's'); }
  function current() { var h = location.hash.slice(1); return SKINS.indexOf(h) > -1 ? h : ''; }
  function apps(h) { return h.options || []; }
  function isLive(o) { return o.status === 'live' && !!o.link; }

  function syncThemeColor() {
    var meta = document.querySelector('meta[name="theme-color"]');
    var c = getComputedStyle(root).getPropertyValue('--sat-theme-color').trim();
    if (meta && c) meta.content = c;
  }

  function renderTabs(active) {
    var items = [{ id: '', label: 'Home' }].concat(houses.map(function (h) {
      return { id: h.vertical, label: SHORT[h.vertical] || h.title };
    }));
    var html = items.map(function (it) {
      return '<a href="#' + it.id + '"' + (it.id === active ? ' aria-current="page"' : '') + '>' + esc(it.label) + '</a>';
    }).join('');
    document.querySelectorAll('[data-tabs]').forEach(function (n) { n.innerHTML = html; });
  }

  function homeView() {
    var live = houses.reduce(function (n, h) { return n + apps(h).filter(isLive).length; }, 0);
    var cards = houses.map(function (h, i) {
      var names = apps(h).map(function (o) { return esc(o.title); }).join(', ');
      return '<a class="sat-glass sat-card hub-card hub-rise" style="--i:' + (i + 2) + '" href="#' + esc(h.vertical) + '">' +
        '<div class="hub-card-top">' + (MARKS[h.vertical] || '') + '<svg class="hub-go" aria-hidden="true"><use href="#i-out"/></svg></div>' +
        '<h2 class="sat-h3">' + esc(h.title) + '</h2>' +
        '<p class="hub-apps">' + count(apps(h).length, 'app') + ': ' + names + '</p></a>';
    }).join('');
    return '<section class="hub-hero">' +
        '<h1 class="sat-display hub-rise">Every day is <em>Saturday</em></h1>' +
        '<p class="sat-lede hub-rise" style="--i:1">' + count(live, 'app') + ' across ' + count(houses.length, 'house') + ', one tap away.</p>' +
      '</section>' +
      '<section class="hub-section" aria-labelledby="housesCap">' +
        '<h2 class="sat-caption" id="housesCap">Houses <span class="sat-qual">(' + houses.length + ')</span></h2>' +
        '<div class="sat-grid" style="--sat-min: 260px">' + cards + '</div>' +
      '</section>';
  }

  function houseView(h) {
    var ink = h.theme === 'day';
    var cards = apps(h).map(function (o, i) {
      var live = isLive(o);
      var tag = live ? 'a' : 'div';
      var attrs = live
        ? ' href="' + esc(o.link) + '" target="_blank" rel="noopener" aria-label="' + esc(o.title) + ', opens in a new tab"'
        : '';
      return '<' + tag + ' class="sat-glass sat-card hub-card hub-rise' + (live ? '' : ' is-soon') + '" style="--i:' + (i + 2) + '"' + attrs + '>' +
        '<div class="hub-card-top"><span class="hub-logo' + (ink ? ' hub-logo--ink' : '') + '"><img src="' + esc(o.logo) + '" alt="" width="44" height="44" loading="lazy"></span>' +
        (live ? '<svg class="hub-go" aria-hidden="true"><use href="#i-out"/></svg>' : '<span class="sat-badge sat-badge--muted">Soon</span>') + '</div>' +
        '<div><h2 class="sat-h3">' + esc(o.title) + '</h2>' +
        (o.subtitle ? '<p class="sat-small sat-muted">' + esc(o.subtitle) + '</p>' : '') + '</div>' +
        '</' + tag + '>';
    }).join('');
    return '<section class="hub-hero">' +
        '<div class="hub-lockup hub-rise">' + (MARKS[h.vertical] || '') +
          '<div><h1 class="sat-display">' + esc(h.title) + '</h1><p class="sat-endorse">a Saturday Services house</p></div>' +
        '</div>' +
        (h.blurb ? '<p class="sat-lede hub-rise" style="--i:1">' + esc(h.blurb) + '</p>' : '') +
      '</section>' +
      '<section class="hub-section" aria-labelledby="appsCap">' +
        '<h2 class="sat-caption" id="appsCap">Apps <span class="sat-qual">(' + apps(h).length + ')</span></h2>' +
        '<div class="sat-grid" style="--sat-min: 220px">' + cards + '</div>' +
      '</section>';
  }

  function render(focus) {
    var id = current();
    var house = houses.filter(function (h) { return h.vertical === id; })[0];
    if (house) root.setAttribute('data-skin', id); else root.removeAttribute('data-skin');
    main.innerHTML = house ? houseView(house) : homeView();
    drink.hidden = id !== 'shakes';
    document.title = house ? house.title + ' | Saturday Services' : 'Saturday Services';
    renderTabs(house ? id : '');
    brand.innerHTML = house
      ? MARKS[id] + '<span class="hub-brand-text"><span class="sat-wordmark">' + esc(house.title) + '</span><small class="sat-endorse">a Saturday Services house</small></span>'
      : MARKS.services + '<span class="sat-wordmark">Saturday Services</span>';
    brand.setAttribute('aria-label', (house ? house.title + ', a Saturday Services house.' : 'Saturday Services.') + ' Go to all houses');
    syncThemeColor();
    if (focus) { window.scrollTo(0, 0); main.focus({ preventScroll: true }); }
  }

  function go(focus) {
    if (document.startViewTransition && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.startViewTransition(function () { render(focus); });
    } else {
      render(focus);
    }
  }

  window.addEventListener('hashchange', function () { go(true); });
  document.addEventListener('sat-theme', syncThemeColor);

  // Left and right arrows step through the houses, as on the old hub.
  document.addEventListener('keydown', function (e) {
    if (e.altKey || e.ctrlKey || e.metaKey || /input|textarea|select/i.test(e.target.tagName)) return;
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    if (e.target.closest && e.target.closest('[role="radiogroup"]')) return;
    var ids = [''].concat(houses.map(function (h) { return h.vertical; }));
    var i = ids.indexOf(current());
    i = (i + (e.key === 'ArrowRight' ? 1 : ids.length - 1)) % ids.length;
    location.hash = ids[i];
  });

  var brand = document.querySelector('.hub-home');

  fetch('links.json', { cache: 'no-cache' })
    .then(function (r) { if (!r.ok) throw new Error(String(r.status)); return r.json(); })
    .then(function (data) { houses = data.links || []; render(false); })
    .catch(function () {
      main.innerHTML = '<p class="sat-body">Unable to load the app list. Reload the page to try again.</p>';
    });
})();
