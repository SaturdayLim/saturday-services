# PRD — Saturday Services Hub & Design Suite

**Status:** Draft for sign-off
**Owner:** Michael (Saturday Services)
**Date:** 2026-07-02
**Deploy target:** `github.com/SaturdayLim/saturday-services` → auto-deploy → `saturday-services.vercel.app` (complete overwrite, fresh history)

---

## 1. Overview

Two deliverables in one repo:

1. **A personal landing hub** — a dark, classy, WebGL-driven page that serves as Michael's single entry point to every live project. New projects are added by editing one `links.json` file and pushing.
2. **A transferrable design suite** — per-vertical design systems (matching the proven ActiveTheory/M&N 4-file kit format) plus logo options, so every future app under a Saturday vertical starts from a copyable folder instead of a blank page.

**Tagline:** *Every day is Saturday.*
**Visibility:** private-feeling — `noindex` via meta tag + `X-Robots-Tag` header. Public URL, not publicized.

---

## 2. Brand architecture

```
SATURDAY SERVICES  (parent · umbrella mark · electric blue)
├── SATURDAY SHAKES      (bar vertical · shaker-S mark · copper/gold)
│     ├── Saturday Shakes  — recipes app        [LIVE]
│     └── Flavour Lab      — flavour-mixing app [LIVE]
├── SATURDAY SOLUTIONS   (catch-all vertical · game-motif S mark · neon yellow)
│     └── Saturday Night Games — game hub (trivia etc.) [FUTURE]
│         + printed assets: loyalty cards, board/card games
└── M&N COLLECTIVE       (guest brand · own canonical identity · linked, never restyled)
      ├── Just-Do-Fin        [LIVE]
      ├── Just Do I Do       [LIVE]
      └── Just Write It Down [FUTURE]
```

**Rules:**

- All three Saturday marks share a unifying **S signal**, each adapted to its vertical (shaker-S, game-tile S, reduced parent S).
- **Solutions and Night Games share one mark** (proposed — see Open Questions): the game-motif S serves Saturday Night Games digitally and Saturday Solutions in print (loyalty cards, produced assets). Night Games gets a named lockup of the same mark.
- **M&N Collective is not restyled.** Its design system (`M&N Collective/design/design-direction.md`) is canonical: quiet luxury, alabaster canvas, Cormorant Garamond, forest-green single signal, interlocked monogram. The hub only *consumes* its monogram and palette; its hub page renders as a light "plate" inside the dark stage.

---

## 3. Design direction (resolved)

**Ruling:** Saturday Services tokens win conflicts with the ActiveTheory reference, but execution is restrained — *"a measure of energy, but classy."* ActiveTheory contributes the stage (void canvas, corner chrome, single 3D centerpiece, instrument-panel micro-labels); Saturday Services contributes the material world (obsidian base, metallic finishes, accent chroma). No running cyberpunk: no data-dense telemetry walls, no circuit-board decoration on the hub, no neon saturation as wallpaper.

### 3.1 Palette (hub + saturday-core)

| Token | Value | Role |
|---|---|---|
| `--color-bg-base` (Obsidian) | `#0B0C10` | Page canvas. SS wins over ActiveTheory's `#000000`. |
| `--color-bg-surface` (Titanium) | `#1F2833` | Sparingly — elevated panels only. |
| `--color-text-main` | `#F0F3F4` | Primary text. |
| `--color-text-muted` | `#8A9199` | Secondary text, micro-labels at rest. |
| `--hairline` | `rgba(192,192,192,0.18)` | 1px rules replace card chrome (ActiveTheory discipline). |
| `--accent-services` (Electric Blue) | `#00F0FF` | Services vertical + hub interactive states. Signal, never wallpaper. |
| `--accent-shakes` (Copper) | `#B87333` | Shakes vertical. Brushed-metal material in 3D. |
| `--accent-solutions` (Neon Yellow) | `#FFE600` | Solutions/Night Games vertical. Signal only. |
| `--accent-mn` (Forest Green) | `#2C4C38` | M&N page accents, per its canonical system. |

**Discipline (inherited from ActiveTheory + M&N's single-signal doctrine):** one accent per surface. A vertical's page uses *its* accent only. Emissive bloom is permitted on 3D materials and focused UI signals — not on text blocks or backgrounds. Glassmorphism only on overlay panels (`blur(12px)`, 1px hairline).

### 3.2 Typography — free, downloadable kit (proposed)

All free (SIL Open Font License), downloadable for print — confirmed by Michael 2026-07-02:

| Face | Weights | Job |
|---|---|---|
| **Space Grotesk** | 400 / 500 / 700 | Display + headings. Sharp geometric neo-grotesque; H1/H2 uppercase, tracking 0.12–0.15em. |
| **Elms Sans** | variable (400–700 used) | UI, nav, micro-labels, status badges — the utilitarian geometric instrument voice. |
| **Inter** | 400 / 500 | Body text. Neutral, highly legible workhorse. |
| **Instrument Serif** | 400 + italic | Editorial accent only: the tagline *Every day is Saturday* in italic, pull-quotes, one flourish per viewport. |

Fallbacks: `system-ui` sans; `Georgia` serif.

**M&N Collective fonts (owner override, 2026-07-02):** Playfair Display (display serif) + Lato (body sans) replace Cormorant Garamond + Manrope throughout the M&N system; Pinyon Script flourish unchanged. Lato ships 400/700/900 — legacy weight 500 renders as 400, 600 as 700.

### 3.3 Shape & layout

- Full-bleed void canvas; chrome pushed to corners (top-left wordmark, top-right pill nav, bottom-right status label).
- Chamfered 45° corners (SS signature) on panels — subtle, 8–12px cuts, replacing ActiveTheory's 12px rounds.
- 8px grid; generous negative space — the 3D piece owns the field.
- 1px hairlines delineate zones; no resting shadows on the void.

---

## 4. Deliverable A — Logos (3 options × 3 marks, SVG)

All options delivered as clean hand-authored SVGs in `/assets/logos/options/`, plus a **`logo-gallery.html`** preview page (dark stage, renders every option at multiple sizes incl. 15mm-equivalent) so selection is a browser tab, not file-opening.

| Mark | Brief | Constraints |
|---|---|---|
| **Saturday Services** | The umbrella: most reduced S of the family. Full creative license; classy, scalable, timeless. Should read at favicon size and as the hero 3D extrusion. | Monochrome-first; accent applied as material, not fill dependency. |
| **Saturday Shakes** | Built on the **2-tin boston shaker forming an S** (preferred concept, per existing jpg). Explore adjacent refinements: line-weight variants, negative-space S, tin-seam as S-curve. | Copper/gold single-color capable; must survive as app icon. |
| **Saturday Solutions / Night Games** | S from game motifs: hexagonal tiles, dice pips, poker chips, or **S-face on a playing-card back**. One mark, two lockups (Solutions print / Night Games digital). | **Print-critical:** 1-color mono + reversed variants; legible at 15mm on a loyalty card; no gradients in the mono variant. |

Family coherence: shared S skeleton geometry (common spine curve/angle grammar documented in saturday-core Design.md) so the three read as siblings.

After Michael selects winners, the chosen marks get refined into final editable versions with full variant sets (mono, reversed, lockups, favicon) — **separate follow-up, out of scope for this build.**

## 5. Deliverable B — Design suites (`/design/`)

Mirrors the ActiveTheory kit format exactly — proven transferrable, agent-readable:

```
design/
├── saturday-core/      ← shared foundation all verticals inherit
│   ├── Design.md       (philosophy, palette, type, shape, do/don't, agent prompt guide)
│   ├── Tokens.json
│   ├── Variables.css
│   └── Theme.css
├── services/           ← same 4 files: core + electric-blue accent layer,
├── shakes/               copper material language, per-vertical motifs,
├── solutions/            component specs, app accent matrix
└── mn-collective/
    └── README.md       (pointer to canonical M&N system — never duplicated, never forked)
```

Each vertical Design.md includes an **Agent Prompt Guide** section (quick color/type/shape reference + example component prompts) so any future app is built by copying one folder and prompting against it.

## 6. Deliverable C — Landing page

> **Revision 2026-07-02 (post-launch, per Michael):** the 3D extruded hero was replaced by a
> centered metallic SATURDAY SERVICES wordmark (animated light sweep) that glides to the top-left
> corner on page change; one continuous starfield background across all pages; vertical
> scroll/arrow/Enter page-snapping with smooth transitions; ENTER buttons removed — logos are
> clickable (new tab) and carry accent glows; Shakes page = Backbar + Flavour Studio options;
> Solutions page headed "Saturday Solutions" with light hex mark; M&N page inverts to a daytime
> starfield with line-drawn Just Do Fin (bill) + Just Do I Do (rings) marks and a back-to-night
> control. The 3D pipeline (docs/3d-pipeline.md, js/scene.js) is retained for future use.

**Stack:** static `index.html` + CSS + vanilla JS, Three.js via CDN (pinned version, ES modules). No build step.

### 6.1 Structure & behavior

1. **Hero (full viewport):** 3D animated Saturday Services parent logo — SVG-extruded geometry, brushed-metal + emissive materials, slow idle rotation, subtle cursor parallax, sparse particle field. Corner chrome: wordmark top-left, `PROJECTS ↓` pill top-right, tagline in Instrument Serif italic. Scroll or click transitions down.
2. **Project deck (swipeable):** one full-viewport panel per `links.json` entry. Horizontal swipe/drag on touch, arrow keys + click-nav on desktop, snap scrolling. Each panel: vertical's logo (2D SVG, accent-lit), title in Space Grotesk, status badge (`LIVE` / `SOON` in Elms Sans pill), `ENTER →` link. Panel accent = vertical accent.
3. **Group panels:** an entry with `children` (M&N Collective) renders its child links as a list on its panel. M&N's panel is the exception surface: alabaster `#FDFBF7` plate, monogram, Playfair Display serif title, forest-green links — a page from their book placed on the dark stage.
4. **Fallback:** `prefers-reduced-motion`, WebGL-unavailable, or small/low-power devices get a pre-rendered static poster (PNG) of the 3D mark. Deck works identically without WebGL.

### 6.2 `links.json` schema

```json
{
  "$schema": "./docs/links.schema.json",
  "links": [
    { "title": "Saturday Shakes", "vertical": "shakes",
      "logo": "assets/logos/shakes.svg",
      "link": "https://saturdayshakes.vercel.app/", "status": "live" },
    { "title": "Flavour Lab", "vertical": "shakes",
      "logo": "assets/logos/shakes-lab.svg",
      "link": "https://the-lab-pearl-tau.vercel.app/app.html", "status": "live" },
    { "title": "Saturday Night Games", "vertical": "solutions",
      "logo": "assets/logos/solutions.svg",
      "link": null, "status": "soon" },
    { "title": "M&N Collective", "vertical": "mn",
      "logo": "assets/logos/mn-monogram.svg",
      "link": null, "status": "live",
      "children": [
        { "title": "Just-Do-Fin", "link": "https://just-do-fin.vercel.app/", "status": "live" },
        { "title": "Just Do I Do", "link": "https://mn-wedding.saturdayservices.workers.dev/", "status": "live" },
        { "title": "Just Write It Down", "link": null, "status": "soon" }
      ] }
  ]
}
```

**Adding a link = add one object, commit, push.** Vercel redeploys in ~30s. `docs/adding-links.md` documents this in 5 lines. Unknown `vertical` values fall back to the Services accent, so new verticals never break the page.

### 6.3 Non-functional

- `noindex, nofollow` meta + `X-Robots-Tag` header via `vercel.json`.
- Lighthouse-sane: Three.js lazy-loaded after first paint; poster shown until scene ready; total non-3D payload < 200KB.
- No analytics, no cookies, no consent chrome.

## 7. Deliverable D — 3D pipeline doc (`/docs/3d-pipeline.md`)

The repeatable recipe for turning **any future 2D SVG logo into a hub-grade animated 3D model**, written as prompt-ready instructions:

1. SVG authoring rules (closed paths, no strokes-as-outlines, single viewBox, hole-winding).
2. `SVGLoader` → `ExtrudeGeometry` (depth/bevel parameters standardized in saturday-core).
3. Material recipes: brushed-metal PBR, emissive accent pass per vertical accent token, environment lighting rig.
4. Animation grammar: idle rotation speed, cursor parallax amplitude, entry transition.
5. Poster fallback generation (offscreen render → PNG export).
6. A copy-paste future prompt template: *"Take `<new-logo>.svg`, follow docs/3d-pipeline.md, add entry to links.json."*

## 8. Repo structure

```
saturday-services/
├── index.html
├── links.json
├── logo-gallery.html
├── vercel.json
├── css/site.css
├── js/  main.js · scene.js · deck.js
├── assets/
│   ├── logos/          (final SVGs in use)
│   ├── logos/options/  (3×3 exploration SVGs)
│   └── posters/        (static fallbacks)
├── design/             (§5)
└── docs/  prd.md · 3d-pipeline.md · adding-links.md · links.schema.json
```

## 9. Deployment

1. Build everything locally in the working folder.
2. `git init` fresh history → single initial commit → **force push to `main`** of `SaturdayLim/saturday-services` using Michael's fine-grained PAT (Contents: R/W, this repo only).
3. Vercel auto-deploys from main. Verify live at `saturday-services.vercel.app` (fetch + visual check).
4. Michael revokes the PAT.

## 10. Execution plan (subagent tracks)

| Track | Work | Runs |
|---|---|---|
| A1–A3 | One subagent per mark: 3 logo options each, SVG + gallery entries | Parallel |
| B | Design suites: saturday-core then 3 vertical layers | Parallel with A |
| C | Landing page: HTML/CSS/JS + Three.js scene (placeholder mark until A lands, then swap) | Parallel with A/B |
| D | 3d-pipeline.md + poster generation | After C's scene stabilizes |
| E | Verification subagent: SVG render checks, URL validation, local page test, schema check | After A–D |
| F | Git push + deploy verification | Last |

Fable plans, reviews, and integrates; subagents execute parallel tracks.

## 11. Acceptance criteria

- [ ] 9 logo option SVGs render correctly in `logo-gallery.html`, incl. Solutions mono at 15mm-equivalent.
- [ ] All 4 design-suite folders complete, format-matched to the ActiveTheory kit.
- [ ] Hub renders 3D centerpiece on desktop Chrome/Firefox/Safari; poster fallback on reduced-motion/no-WebGL.
- [ ] Deck shows all 4 day-one panels; M&N panel uses its canonical light styling; all live links resolve (200)