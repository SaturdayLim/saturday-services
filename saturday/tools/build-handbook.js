#!/usr/bin/env node
// Builds the visual brand handbook from the kit itself.
//   node tools/build-handbook.js
// Reads:  handbook/handbook.src.html, handbook/components.json, tokens/tokens.json,
//         css/saturday.css, js/saturday.js, assets/*-mark.svg
// Writes: handbook/index.html    page body only (for publishing as a claude.ai Artifact, which adds the skeleton)
//         handbook/preview.html  the same page as a full document, to open locally in a browser
// Fonts come from Google Fonts (the Artifact host allows no other font source), so both files need internet.
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const read = p => fs.readFileSync(path.join(root, p), 'utf8');
const T = JSON.parse(read('tokens/tokens.json'));
const C = JSON.parse(read('handbook/components.json'));

const hexToRgba = (hex, a) => {
  const h = hex.replace('#', '');
  const [r, g, b] = [0, 2, 4].map(i => parseInt(h.slice(i, i + 2), 16));
  return `rgba(${r},${g},${b},${a})`;
};
const colourVars = (c, indent) => Object.entries(c)
  .filter(([k]) => k !== 'mesh-opacity')
  .map(([k, v]) => `${indent}--sat-${k}: ${/^mesh-\d$/.test(k) ? hexToRgba(v, c['mesh-opacity']) : v};`).join('\n');

// Skins scoped to [data-house] so several houses can sit side by side on one page.
// Every block carries the full size and radius set, so a nested house never inherits its parent's overrides.
const scoped = Object.entries(T.skins).map(([name, s]) => {
  const sel = `[data-house="${name}"]`;
  const sizes = { ...T.type.size, ...(s.size || {}) };
  delete sizes['body-touch'];
  const radii = { ...T.radius, ...(s.radius || {}) };
  const statics = [
    ...Object.entries(s.fonts).map(([k, v]) => `  --sat-font-${k}: ${v};`),
    ...Object.entries(sizes).map(([k, v]) => `  --sat-fs-${k}: ${v};`),
    ...Object.entries(radii).map(([k, v]) => `  --sat-radius-${k}: ${v};`),
  ].join('\n');
  return `${sel} {\n${statics}\n${colourVars(s.light, '  ')}\n}
@media (prefers-color-scheme: dark) {\n  :root:not([data-theme="light"]) ${sel} {\n${colourVars(s.dark, '    ')}\n  }\n}
:root[data-theme="dark"] ${sel} {\n${colourVars(s.dark, '  ')}\n}`;
}).join('\n');

// The kit's own CSS, minus the local @font-face lines (Google Fonts replaces them here).
const kitCss = read('css/tokens.css') + '\n' + read('css/saturday.css').replace(/^@font-face[^\n]*\n/gm, '');

const markFiles = {
  saturday: 'assets/saturday-services-mark.svg',
  shakes: 'assets/saturday-shakes-mark.svg',
  solutions: 'assets/saturday-solutions-mark.svg',
  mn: 'assets/mn-collective-mark.svg',
};
const mark = (name, extra = '') => read(markFiles[name])
  .replace(/<!--[\s\S]*?-->\s*/g, '')
  .replace(/<svg [^>]*?(viewBox="[^"]+")[^>]*>/, `<svg class="sat-mark${extra ? ' ' + extra : ''}" $1 aria-hidden="true" focusable="false">`)
  .replace(/\s*\n\s*/g, '');

const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const houseLabel = { all: 'All houses', saturday: 'Parent', shakes: 'Shakes', solutions: 'Solutions', mn: 'M&N' };
const total = C.groups.reduce((n, g) => n + g.items.length, 0);
const inventory = C.groups.map(g => `
<section class="inv-group">
  <h3 class="sat-h3">${esc(g.name)} <span class="sat-small sat-muted">(${g.items.length})</span></h3>
  <ul class="inv-list">
${g.items.map(it => `    <li data-p="${it.p}" data-h="${it.house}">
      <input type="checkbox" id="inv-${it.id}" data-inv="${it.id}">
      <label for="inv-${it.id}">${esc(it.text)}</label>
      <span class="inv-meta"><span class="pill pill--p${it.p}">P${it.p}</span><span class="sat-badge sat-badge--muted">${esc(houseLabel[it.house])}</span></span>
    </li>`).join('\n')}
  </ul>
</section>`).join('\n');

let html = read('handbook/handbook.src.html')
  .replace('/*@KIT_CSS@*/', () => kitCss)
  .replace('/*@SKINS@*/', () => scoped)
  // "</script" inside the code (even in a comment) would end the tag early, so escape it.
  .replace('/*@KIT_JS@*/', () => read('js/saturday.js').replace(/<\/script/gi, '<\\/script'))
  .replace(/<!--@MARK:(\w+)(?::([\w-]+))?@-->/g, (m, n, cls) => mark(n, cls))
  .replace('<!--@INVENTORY@-->', () => inventory)
  .replace(/@VERSION@/g, T.meta.version)
  .replace(/@TOTAL@/g, String(total));

fs.writeFileSync(path.join(root, 'handbook', 'index.html'), html);
fs.writeFileSync(path.join(root, 'handbook', 'preview.html'),
  `<!doctype html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n</head>\n<body>\n${html}\n</body>\n</html>\n`);
console.log(`Built handbook/index.html and handbook/preview.html (${total} inventory items, ${Object.keys(T.skins).length} skins)`);
