// GET /api/status -> { checkedAt, apps: { "<link>": { status: "up"|"down"|"slow", code } } }
// Checks only the live links listed in links.json, so callers cannot make it fetch anything else.
// Free on Vercel Hobby. Edge cache holds a result for 60 s, so many visits cost one run a minute.
const links = require('../links.json');

const TIMEOUT_MS = 8000;

function liveLinks() {
  const out = [];
  for (const house of links.links || []) {
    for (const app of house.options || []) {
      if (app.status === 'live' && app.link) out.push(app.link);
    }
  }
  return out;
}

async function check(url) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      method: 'GET',
      redirect: 'follow',
      signal: ctrl.signal,
      headers: { 'user-agent': 'saturday-services-status/1.0' }
    });
    // Read nothing; close the body so the connection frees.
    try { await res.body?.cancel(); } catch (e) {}
    return { status: res.status < 400 ? 'up' : 'down', code: res.status };
  } catch (err) {
    return { status: err.name === 'AbortError' ? 'slow' : 'down', code: null };
  } finally {
    clearTimeout(timer);
  }
}

module.exports = async function handler(req, res) {
  const urls = liveLinks();
  const results = await Promise.all(urls.map(check));
  const apps = {};
  urls.forEach((u, i) => { apps[u] = results[i]; });
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=240');
  res.setHeader('X-Robots-Tag', 'noindex, nofollow');
  res.statusCode = 200;
  res.end(JSON.stringify({ checkedAt: new Date().toISOString(), apps }));
};

module.exports.check = check;
