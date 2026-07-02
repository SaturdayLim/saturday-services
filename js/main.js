/* Saturday Services hub — persistent starfield + page-snap navigation.
   Pages are driven by links.json; each entry is one full-viewport page. */

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const pagesEl = document.getElementById('pages');
const brand = document.getElementById('brand');
const counter = document.getElementById('counter');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const pad = (n) => String(n).padStart(2, '0');

/* ================= starfield: one continuous space background ================= */
const NIGHT_BG = [11, 12, 16];
const DAY_BG = [253, 251, 247];
const NIGHT_STAR = [240, 243, 244];
const DAY_STAR = [74, 60, 49];

const space = document.getElementById('space');
const ctx = space.getContext('2d');
let stars = [];
let themeT = 0;        // 0 = night, 1 = day
let themeTarget = 0;

function seedStars() {
  const n = Math.round((window.innerWidth * window.innerHeight) / 11000);
  stars = Array.from({ length: Math.min(Math.max(n, 90), 240) }, () => ({
    x: Math.random(),
    y: Math.random(),
    r: 0.5 + Math.random() * 1.4,
    phase: Math.random() * Math.PI * 2,
    tw: 0.4 + Math.random() * 0.8,
    drift: 0.002 + Math.random() * 0.006,
  }));
}
function resizeSpace() {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  space.width = window.innerWidth * dpr;
  space.height = window.innerHeight * dpr;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}
const lerp = (a, b, t) => a + (b - a) * t;
const mix = (c1, c2, t) => c1.map((v, i) => Math.round(lerp(v, c2[i], t)));

let last = performance.now();
function drawSpace(now) {
  const dt = Math.min((now - last) / 1000, 0.05);
  last = now;
  themeT += (themeTarget - themeT) * Math.min(dt * 3.2, 1);

  const w = window.innerWidth, h = window.innerHeight;
  const [br, bg, bb] = mix(NIGHT_BG, DAY_BG, themeT);
  ctx.fillStyle = `rgb(${br},${bg},${bb})`;
  ctx.fillRect(0, 0, w, h);

  const [sr, sg, sb] = mix(NIGHT_STAR, DAY_STAR, themeT);
  const dim = 1 - themeT * 0.45; // daytime stars are softer
  for (const s of stars) {
    if (!reduced) {
      s.phase += dt * s.tw;
      s.y += dt * s.drift;
      if (s.y > 1.02) { s.y = -0.02; s.x = Math.random(); }
    }
    const a = (0.35 + 0.5 * (0.5 + 0.5 * Math.sin(s.phase))) * dim;
    ctx.fillStyle = `rgba(${sr},${sg},${sb},${a.toFixed(3)})`;
    ctx.beginPath();
    ctx.arc(s.x * w, s.y * h, s.r, 0, Math.PI * 2);
    ctx.fill();
  }
  requestAnimationFrame(drawSpace);
}

/* ================= inline SVG loader (enables glow + embedded images) ================= */
const svgCache = new Map();
async function logoNode(src, alt) {
  if (src.endsWith('.svg')) {
    try {
      if (!svgCache.has(src)) {
        const res = await fetch(src);
        if (!res.ok) throw new Error(res.status);
        svgCache.set(src, await res.text());
      }
      const holder = document.createElement('div');
      holder.innerHTML = svgCache.get(src);
      const svg = holder.querySelector('svg');
      svg.removeAttribute('width');
      svg.removeAttribute('height');
      svg.setAttribute('role', 'img');
      svg.setAttribute('aria-label', alt);
      return svg;
    } catch (e) { /* fall through to img */ }
  }
  const img = document.createElement('img');
  img.src = src;
  img.alt = alt;
  return img;
}

/* ================= page construction ================= */
function el(tag, className, text) {
  const n = document.createElement(tag);
  if (className) n.className = className;
  if (text != null) n.textContent = text;
  return n;
}

async function buildOption(opt) {
  const live = opt.status === 'live' && opt.link;
  const a = el(live ? 'a' : 'div', 'option' + (live ? '' : ' option--soon'));
  if (live) { a.href = opt.link; a.target = '_blank'; a.rel = 'noopener'; }
  const box = el('div', 'option-logo');
  box.appendChild(await logoNode(opt.logo, `${opt.title} mark`));
  a.appendChild(box);
  a.appendChild(el('span', 'option-label', opt.title));
  a.appendChild(el('span', 'option-status', live ? 'LIVE' : 'SOON'));
  return a;
}

async function buildPage(item, idx) {
  const sec = el('section', 'page');
  sec.dataset.vertical = item.vertical || 'services';
  if (item.theme === 'day') sec.dataset.theme = 'day';

  if (item.vertical === 'mn') {
    const back = el('button', 'night-return');
    back.type = 'button';
    back.innerHTML = '<span aria-hidden="true">←</span> BACK TO NIGHT';
    back.addEventListener('click', () => goTo(idx - 1));
    sec.appendChild(back);
  }

  sec.appendChild(el('h2', 'page-title', item.title));

  const single = item.link && item.status === 'live';
  const logoWrap = el(single ? 'a' : 'div', 'page-logo');
  if (single) { logoWrap.href = item.link; logoWrap.target = '_blank'; logoWrap.rel = 'noopener'; }
  logoWrap.appendChild(await logoNode(item.logo, `${item.title} mark`));
  sec.appendChild(logoWrap);

  if (item.blurb) sec.appendChild(el('p', 'page-blurb', item.blurb));

  if (item.options && item.options.length) {
    const row = el('div', 'options');
    for (const opt of item.options) row.appendChild(await buildOption(opt));
    sec.appendChild(row);
  } else if (item.status !== 'live') {
    sec.appendChild(el('span', 'badge badge--soon', 'COMING SOON'));
  }

  if (item.vertical === 'mn') sec.appendChild(el('span', 'flourish', 'together'));
  return sec;
}

/* ================= navigation ================= */
let pages = [];   // section elements; index 0 = hero (empty stage)
let themes = [];  // 'night' | 'day' per page
let idx = 0;
let locked = false;

function placeBrand() {
  brand.style.transform = 'none';
  const rect = brand.getBoundingClientRect();
  const vw = window.innerWidth, vh = window.innerHeight;
  const scale = Math.min(vw * 0.78, 860) / rect.width;
  const tx = (vw - rect.width * scale) / 2 - rect.left;
  const ty = vh * 0.45 - rect.top - (rect.height * scale) / 2;
  brand.dataset.hero = `translate(${tx}px, ${ty}px) scale(${scale.toFixed(3)})`;
  applyBrand();
}
function applyBrand() {
  brand.style.transform = idx === 0 ? brand.dataset.hero : 'none';
}

function goTo(i) {
  const target = Math.max(0, Math.min(pages.length - 1, i));
  if (target === idx || locked) return;
  locked = true;
  setTimeout(() => { locked = false; }, 820);
  idx = target;

  pages.forEach((p, k) => {
    if (!p) return;
    p.classList.toggle('active', k === idx);
    p.classList.toggle('above', k < idx);
  });
  document.body.classList.toggle('off-hero', idx !== 0);
  themeTarget = themes[idx] === 'day' ? 1 : 0;
  document.body.toggleAttribute('data-day', themes[idx] === 'day');
  applyBrand();
  counter.textContent = `${pad(idx + 1)} / ${pad(pages.length)}`;
  prevBtn.disabled = idx === 0;
  nextBtn.disabled = idx === pages.length - 1;
}

function wireInput() {
  prevBtn.addEventListener('click', () => goTo(idx - 1));
  nextBtn.addEventListener('click', () => goTo(idx + 1));
  document.getElementById('navProjects').addEventListener('click', () => goTo(1));

  let acc = 0;
  window.addEventListener('wheel', (e) => {
    e.preventDefault();
    if (locked) { acc = 0; return; }
    acc += e.deltaY;
    if (acc > 60) { acc = 0; goTo(idx + 1); }
    else if (acc < -60) { acc = 0; goTo(idx - 1); }
  }, { passive: false });

  window.addEventListener('keydown', (e) => {
    if (['ArrowDown', 'ArrowRight', 'PageDown', 'Enter', ' '].includes(e.key)) {
      e.preventDefault(); goTo(idx + 1);
    } else if (['ArrowUp', 'ArrowLeft', 'PageUp'].includes(e.key)) {
      e.preventDefault(); goTo(idx - 1);
    }
  });

  let touchY = null;
  window.addEventListener('touchstart', (e) => { touchY = e.touches[0].clientY; }, { passive: true });
  window.addEventListener('touchend', (e) => {
    if (touchY == null) return;
    const dy = touchY - e.changedTouches[0].clientY;
    if (Math.abs(dy) > 46) goTo(idx + (dy > 0 ? 1 : -1));
    touchY = null;
  }, { passive: true });
}

/* ================= boot ================= */
async function boot() {
  seedStars();
  resizeSpace();
  requestAnimationFrame(drawSpace);

  let data = { links: [] };
  try {
    data = await (await fetch('links.json')).json();
  } catch (e) { /* hero still works */ }

  const hero = el('section', 'page');
  hero.dataset.vertical = 'services';
  pagesEl.appendChild(hero);
  pages = [hero];
  themes = ['night'];

  for (const [i, item] of (data.links || []).entries()) {
    const sec = await buildPage(item, i + 1);
    pagesEl.appendChild(sec);
    pages.push(sec);
    themes.push(item.theme === 'day' ? 'day' : 'night');
  }

  hero.classList.add('active');
  counter.textContent = `${pad(1)} / ${pad(pages.length)}`;
  prevBtn.disabled = true;

  placeBrand();
  wireInput();

  window.addEventListener('resize', () => { resizeSpace(); seedStars(); placeBrand(); });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(placeBrand);
}

boot();
