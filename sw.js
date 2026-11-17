/* Saturday Services hub: offline support.
   Shell files: served from cache at once, refreshed in the background (stale-while-revalidate).
   links.json: network first, cache when offline, so a new app shows up on the next visit.
   /api/status and other sites: never cached; the page handles offline itself.
   Bump VERSION when the precache list changes. */
var VERSION = 'hub-v4';
var SHELL = [
  './',
  'go',
  'links.json',
  'manifest.webmanifest',
  'css/hub.css',
  'js/hub.js',
  'saturday/css/tokens.css',
  'saturday/css/saturday.css',
  'saturday/css/skins-all.css',
  'saturday/css/fonts-houses.css',
  'saturday/js/saturday.js',
  'saturday/fonts/Geist-Variable.woff2',
  'saturday/fonts/GeistMono-Variable.woff2',
  'saturday/fonts/InstrumentSerif-Regular.woff2',
  'saturday/fonts/InstrumentSerif-Italic.woff2',
  'saturday/assets/favicon.svg',
  'assets/icons/apple-touch-icon.png',
  'assets/icons/icon-192.png'
];

self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(VERSION).then(function (c) { return c.addAll(SHELL); }).then(function () { return self.skipWaiting(); }));
});

self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.filter(function (k) { return k !== VERSION && k.indexOf('hub-') === 0; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});

function staleWhileRevalidate(req) {
  return caches.open(VERSION).then(function (cache) {
    return cache.match(req, { ignoreSearch: true }).then(function (hit) {
      var net = fetch(req).then(function (res) {
        if (res && res.ok) cache.put(req, res.clone());
        return res;
      }).catch(function () { return hit; });
      return hit || net;
    });
  });
}

function networkFirst(req) {
  return caches.open(VERSION).then(function (cache) {
    return fetch(req).then(function (res) {
      if (res && res.ok) cache.put(req, res.clone());
      return res;
    }).catch(function () { return cache.match(req, { ignoreSearch: true }); });
  });
}

var FONT_HOSTS = ['fonts.googleapis.com', 'fonts.gstatic.com'];

self.addEventListener('fetch', function (e) {
  var req = e.request;
  if (req.method !== 'GET') return;
  var url = new URL(req.url);

  // House fonts from Google: keep a copy so house pages look right offline.
  if (FONT_HOSTS.indexOf(url.hostname) > -1) { e.respondWith(staleWhileRevalidate(req)); return; }
  if (url.origin !== self.location.origin) return;           // other sites: untouched
  if (url.pathname.indexOf('/api/') === 0) return;           // live status: never cached

  if (url.pathname.endsWith('/links.json')) { e.respondWith(networkFirst(req)); return; }
  if (req.mode === 'navigate') {
    e.respondWith(networkFirst(req).then(function (res) {
      return res || caches.match('./');
    }));
    return;
  }
  e.respondWith(staleWhileRevalidate(req));
});
