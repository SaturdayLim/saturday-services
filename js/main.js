/* Saturday Services hub — deck builder + scene bootstrap */

const EYEBROWS = {
  services: 'SATURDAY SERVICES',
  shakes: 'SATURDAY SHAKES',
  solutions: 'SATURDAY SOLUTIONS — NIGHT GAMES',
  mn: 'M&N COLLECTIVE',
};

const track = document.getElementById('deckTrack');
const counter = document.getElementById('counter');
const pad = (n) => String(n).padStart(2, '0');

function badge(status) {
  const live = status === 'live';
  return `<span class="badge ${live ? '' : 'badge--soon'}">${live ? 'LIVE' : 'SOON'}</span>`;
}

function standardPanel(item) {
  const eyebrow = EYEBROWS[item.vertical] || 'SATURDAY SERVICES';
  const enter = item.link
    ? `<a class="enter" href="${item.link}" rel="noopener">ENTER →</a>`
    : `<span class="enter enter--disabled">COMING SOON</span>`;
  return `
    <article class="panel" data-vertical="${item.vertical}">
      <span class="eyebrow">${eyebrow}</span>
      <img class="logo" src="${item.logo}" alt="${item.title} mark" loading="lazy">
      <h2>${item.title}</h2>
      ${item.blurb ? `<p class="blurb">${item.blurb}</p>` : ''}
      ${badge(item.status)}
      ${enter}
    </article>`;
}

function mnPanel(item) {
  const rows = (item.children || []).map((c) => {
    const label = c.link
      ? `<a href="${c.link}" rel="noopener">${c.title}</a>`
      : `<span class="soon">${c.title}</span>`;
    const b = c.status === 'live'
      ? '<span class="mn-badge">LIVE</span>'
      : '<span class="mn-badge mn-badge--soon">SOON</span>';
    return `<li>${label}${b}</li>`;
  }).join('');
  return `
    <article class="panel panel--mn" data-vertical="mn">
      <div class="plate">
        <img class="monogram" src="${item.logo}" alt="M&amp;N monogram">
        <span class="mn-eyebrow">M&amp;N COLLECTIVE</span>
        <h2>${item.title}</h2>
        ${item.blurb ? `<p class="blurb">${item.blurb}</p>` : ''}
        <ul class="mn-links">${rows}</ul>
        <span class="flourish">together</span>
      </div>
    </article>`;
}

async function buildDeck() {
  try {
    const res = await fetch('links.json');
    const data = await res.json();
    const links = data.links || [];
    track.innerHTML = links
      .map((item) => (item.vertical === 'mn' || item.children ? mnPanel(item) : standardPanel(item)))
      .join('');
    updateCounter(links.length);
    wireNav(links.length);
  } catch (err) {
    track.innerHTML = '<article class="panel"><p class="blurb">Could not load links.json</p></article>';
  }
}

function currentIndex() {
  return Math.round(track.scrollLeft / track.clientWidth);
}
function updateCounter(total) {
  counter.textContent = `${pad(Math.min(currentIndex() + 1, total))} / ${pad(total)}`;
}

function wireNav(total) {
  const go = (dir) => track.scrollBy({ left: dir * track.clientWidth, behavior: 'smooth' });
  document.getElementById('prev').addEventListener('click', () => go(-1));
  document.getElementById('next').addEventListener('click', () => go(1));

  let raf;
  track.addEventListener('scroll', () => {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => updateCounter(total));
  });

  // translate vertical wheel to horizontal glide while over the deck
  track.addEventListener('wheel', (e) => {
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      e.preventDefault();
      track.scrollBy({ left: e.deltaY, behavior: 'auto' });
    }
  }, { passive: false });

  window.addEventListener('keydown', (e) => {
    const deckVisible = track.getBoundingClientRect().top < window.innerHeight * 0.5;
    if (!deckVisible) return;
    if (e.key === 'ArrowRight') go(1);
    if (e.key === 'ArrowLeft') go(-1);
  });
}

buildDeck();

/* ---- 3D scene: lazy, guarded, poster fallback stays if anything fails ---- */
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const small = window.innerWidth < 680;
if (!reduced && !small) {
  import('./scene.js')
    .then((m) => m.initScene(document.getElementById('stage')))
    .catch(() => { /* poster remains */ });
}
