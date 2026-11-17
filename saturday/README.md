# Saturday Signature v2.0.0

The design kit for two separate tracks that share one engine (glass surfaces, grid, components, contrast check, phone rules):

- **Saturday Services**, your brand family: the parent plus three houses, **Saturday Shakes** (drinks), **Saturday Solutions** (tech and games) and **M&N Collective** (finance and wedding apps). Rules in `BRAND.md`.
- **Work**: Saturday Portfolio dashboards, reports and Código 1530 pages, on the **Desk** and **Código** skins. Rules in `WORK.md`.

Start here: open `handbook/index.html` for the brand family, or `demo/index.html` for every component. Phone comps are calibrated to iPhone 16 Pro Max (440 x 956pt).

## What's inside

| Path | What it is |
|---|---|
| `BRAND.md` | Saturday Services handbook: architecture, houses, calibration, missing-components list |
| `WORK.md` | Work track: Desk and Código skins, F/C periods, 9Lc, dashboard samples (owner-approved) |
| `handbook/index.html` | Visual brand handbook: every house side by side, phone and desktop previews |
| `demo/index.html` | Live showcase of every component, both skins, both themes |
| `demo/index.single.html` | The same page as one self-contained file (built by `tools/inline-kit.js`) |
| `css/tokens.css` | All design tokens as CSS variables (generated) |
| `css/saturday.css` | Fonts, base styles and components |
| `css/skin-<name>.css` | One file per skin: shakes, solutions, mn, desk, codigo (generated) |
| `css/skins-all.css` | Every skin in one file, for pages that switch houses (generated) |
| `css/fonts-houses.css` | Loads Bodoni Moda, Bricolage Grotesque, Cormorant Garamond from Google Fonts |
| `js/saturday.js` | Theme toggle, switches, segmented controls, chips, tips, sheets. No dependencies |
| `fonts/` | Instrument Serif, Geist, Geist Mono, Libre Baskerville (woff2, Latin) |
| `assets/` | House marks (Shakes final; Services, Solutions, M&N draft v0), favicon, triple-line gold PNG |
| `tokens/tokens.json` | Source of truth for every token |
| `tokens/tailwind.preset.js` | Tailwind v3 preset (generated) |
| `tokens/tailwind-theme.css` | Tailwind v4 theme (generated) |
| `tools/build-tokens.js` | Rebuilds the generated files from `tokens.json` |
| `tools/check-contrast.js` | Checks every text colour on every glass level, both skins, both themes |
| `tools/build-handbook.js` | Builds `handbook/index.html` (Artifact-ready) and `handbook/preview.html` from the kit and `handbook/components.json` |
| `tools/inline-kit.js` | Turns a page into one HTML file with fonts embedded |
| `SIGNATURE.md` | The design rules: glass, type, captions, spacing, desktop and mobile |
| `WRITING.md` | Voice and caption samples (draft for your edits) |
| `SKILL.md` | Lets Claude Code apply the kit automatically (see below) |
| `licenses/` | SIL Open Font License for each bundled font |

## Load the kit into a project (plain HTML, about 5 minutes)

1. Copy this whole folder into the project and rename it `saturday`.
2. Paste these lines into `<head>`, in this order:

   ```html
   <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
   <script>try{var t=localStorage.getItem('sat-theme');if(t==='light'||t==='dark')document.documentElement.setAttribute('data-theme',t)}catch(e){}</script>
   <link rel="icon" href="saturday/assets/favicon.svg" type="image/svg+xml">
   <link rel="preload" href="saturday/fonts/Geist-Variable.woff2" as="font" type="font/woff2" crossorigin>
   <link rel="stylesheet" href="saturday/css/tokens.css">
   <link rel="stylesheet" href="saturday/css/saturday.css">
   <script src="saturday/js/saturday.js" defer></script>
   ```

   The one-line script stops a white flash on dark-mode devices. Keep it before the stylesheets.
3. Add `class="sat"` to `<body>`.
4. Pick the skin. Add its file after `saturday.css` and set it on `<html>`:

   | Skin | Track | Files after saturday.css | `<html>` |
   |---|---|---|---|
   | Saturday Services (parent) | Saturday | none | no attribute |
   | Saturday Shakes | Saturday | `skin-shakes.css`, `fonts-houses.css` | `data-skin="shakes"` |
   | Saturday Solutions | Saturday | `skin-solutions.css`, `fonts-houses.css` | `data-skin="solutions"` |
   | M&N Collective | Saturday | `skin-mn.css`, `fonts-houses.css` | `data-skin="mn"` |
   | Desk | Work | `skin-desk.css` | `data-skin="desk"` |
   | Código 1530 | Work | `skin-codigo.css` | `data-skin="codigo"` |
5. Build the page from the classes in `demo/index.html`. Copy a block from the demo, then change the words.

### Smallest working page

```html
<body class="sat">
  <header class="sat-header sat-shell">
    <div class="sat-header-bar sat-glass">
      <div class="sat-brand"><!-- paste assets/saturday-shakes-mark.svg here and add class="sat-mark" --><span class="sat-wordmark">Saturday Shakes</span></div>
      <button class="sat-btn sat-btn--ghost sat-iconbtn" data-sat-theme-cycle aria-label="Change theme">◐</button>
    </div>
  </header>
  <main class="sat-shell sat-stack">
    <div class="sat-glass sat-stat">
      <span class="sat-caption">Active markets</span>
      <span class="sat-kpi">35</span>
      <span class="sat-delta sat-delta--up">▲ 2.9%<small>v F25 (34)</small></span>
    </div>
  </main>
</body>
```

### Theme toggle

- Three-way (desktop): a `.sat-seg` with three `role="radio"` buttons carrying `data-sat-theme="auto"`, `"light"` and `"dark"`.
- One button (phone): any button with `data-sat-theme-cycle`. It cycles auto, light, dark.
- From code: `Saturday.setTheme('dark')`. Listen for changes with `document.addEventListener('sat-theme', e => e.detail.resolved)`.
- The choice is stored in `localStorage` under `sat-theme`. Auto follows the operating system and updates live.

### Listening to toggles

Every switch, segmented control and chip fires a bubbling `sat-change` event:

```js
document.getElementById('measure').addEventListener('sat-change', e => render(e.detail.value));
```

`detail` is `{ checked }` for a switch, `{ value }` for a segmented control (the button's `data-value`), and `{ pressed }` for a chip.

## React, Next.js and Vite

1. Copy the folder to `public/saturday` (Next.js) or `src/saturday` (Vite).
2. Import the CSS once, in the root layout or `main.jsx`:
   ```js
   import './saturday/css/tokens.css';
   import './saturday/css/saturday.css';
   ```
   In Next.js with the folder in `public/`, use `<link rel="stylesheet" href="/saturday/css/...">` in the root layout's `<head>` instead.
3. Put the one-line theme script in `<head>` (Next.js: `<script dangerouslySetInnerHTML={{ __html: "..." }} />` inside the root layout's `<head>`).
4. Add `className="sat"` to `<body>`.
5. Either load `saturday.js` (it works on any DOM, including React-rendered markup), or drive the attributes from React state: set `aria-checked` / `aria-pressed` yourself and call `window.Saturday.setTheme()` for the theme.

## Tailwind

- **v4:** in your main CSS:
  ```css
  @import "tailwindcss";
  @import "./saturday/css/tokens.css";
  @import "./saturday/tokens/tailwind-theme.css";
  ```
  Then use `bg-sat-glass-1`, `text-sat-muted`, `font-display`, `rounded-sat-lg`, `shadow-sat`. Keep `saturday.css` too if you want the ready-made components.
- **v3:** `presets: [require('./saturday/tokens/tailwind.preset.js')]` in `tailwind.config.js`, and import `tokens.css` in your CSS.

Tailwind classes point at the CSS variables, so theme and skin switching keep working.

## One-file deliverables (emailed reports, Apps Script, Worldmap-style builds)

```bash
node saturday/tools/inline-kit.js page.html page.single.html
```

This puts the kit's CSS and JS inside the page and embeds the fonts as base64. The result opens with no other files and no internet. It adds about 250 KB. For Google Apps Script, paste the output into `App.html`.

## Excel, PowerPoint and other non-web tools

Take the hex values from `tokens/tokens.json` (`skins.saturday.light` for print and slides). For slides, use `bg` as background, `text` for body, `accent-fill` for one highlight per slide, Instrument Serif for titles and Geist for text. The `.woff2` files here are for the web only; for Office, install the TTF versions from fonts.google.com, or fall back to Georgia and Segoe UI.

## Change a colour or size

1. Edit `tokens/tokens.json`.
2. Run `node tools/build-tokens.js`.
3. Run `node tools/check-contrast.js`. It must end with `All 360 checks pass.` If a check fails, darken (light theme) or lighten (dark theme) the failing colour and run it again.
4. Run `node tools/build-handbook.js` to refresh the handbook, then open `demo/index.html` and `handbook/preview.html` in light and dark and look at the change.
5. Bump `meta.version` in `tokens.json` and add a line to the changelog below.

## Use with Claude Code

Copy this whole folder to `%USERPROFILE%\.claude\skills\saturday-signature\` (it contains `SKILL.md`). Claude Code then applies the kit when you build a page, dashboard or tool UI for a Saturday Services house or a work project (Saturday Portfolio, Código). You can also say "use the Saturday signature" in any session.

## Browser support

Chrome, Edge, Safari and Firefox from 2023 onward. Browsers without `backdrop-filter` get solid panels automatically.

## Licences

The kit's own code and docs are yours. The fonts are under the SIL Open Font License 1.1 (see `licenses/`): free to use, embed and ship, not to sell on their own. The Código brand fonts (Engravers, Baskerville Brand) are licensed separately and are **not** in this kit; the Código skin uses them only if they are installed on the viewer's computer.

## Changelog

- **2.0.0 (27 Oct 2026):** the splice. Work and Saturday Services separated: `WORK.md` holds the work notation and samples (moved unchanged from `WRITING.md`); `BRAND.md` holds the brand family. New skins: `shakes`, `solutions`, `mn` (houses) and `desk` (work). Skins may now override type sizes, radii and display weight. Endorsement line and lockup classes. Draft marks for Services, Solutions and M&N. Device calibration tokens (iPhone 16 Pro Max). House voices drafted in `WRITING.md` section 4 (needs owner approval). 360 contrast checks. **Breaking for work pages:** move from the default teal skin to `data-skin="desk"` when they next ship.
- **1.0.3 (26 Oct 2026):** Saturday Shakes shaker mark added (vector, from the logo deck) with favicon, `--sat-mark` token and logo rules; financial year July to June; number format; Title Case for page titles only; accents on Código 1530 and Añejo everywhere; 120 contrast checks.
- **1.0.2 (26 Oct 2026):** period abbreviations confirmed and written as a pattern (`M-1TD`, `PFYTD`, `CYTEOM`, `N3M`, `MoM`), F = financial year, tooltip rule completed.
- **1.0.1 (26 Oct 2026):** writing voice approved by owner (`WRITING.md`). Captions carry units in brackets (`.sat-qual` keeps their case), deltas use `v` and a base, quarters use F/C year type, volume in 9Lc, Title Case titles. Demo copy updated to match. Fix: info tips near the screen edge no longer widen the page; open tips shift back inside the screen.
- **1.0.0 (26 Oct 2026):** first release. Saturday and Código skins, light and dark glass, 104 contrast checks passing, demo verified at 375px and 1280px.
