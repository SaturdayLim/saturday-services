# Saturday Services — Services Vertical (Hub / Parent Brand)
> *the umbrella mark, reduced to its simplest signal — one blue line in the dark*

**Theme:** dark
**Inherits:** `saturday-core`. This file defines the **Services layer only** — accent tokens, hub/parent-brand components, interactive states, and data-viz accent rules. All palette, type, spacing, chamfer, and elevation rules not restated here are inherited unchanged from `saturday-core/Design.md`. Read that file first.

Services is the parent-brand surface: the personal landing hub, and any future umbrella-level product. It is the most restrained vertical in the family — the one that most directly channels ActiveTheory's void-canvas discipline, because it is the front door to everything else. Electric Blue (`#00F0FF`) is its sole chromatic signal: the 3D centerpiece's emissive pass, the pill nav's active state, the project-deck's interactive affordances. Where Shakes gets warmth and Solutions gets play, Services stays coolest and quietest — a single blue instrument light in an obsidian room.

## Tokens — Colors

| Name | Value | Token | Role |
|------|-------|-------|------|
| Electric Blue | `#00F0FF` | `--accent-services` | The vertical's sole chromatic signal — 3D emissive pass, active nav, primary CTA, data-viz active-state lines |
| Electric Blue Dim | `rgba(0,240,255,0.12)` | `--accent-services-wash` | Whisper-faint active-row/selected-state background wash — the only tinted background permitted |
| Electric Blue Glow | `rgba(0,240,255,0.4)` | `--accent-services-glow` | Box-shadow glow color for hover/focus states on primary buttons and the 3D centerpiece rim light |

All other tokens (canvas, surface, text, hairline, typefaces, spacing, chamfer, radii) are inherited directly from `saturday-core` — see that file's Quick Start for the full custom-property set.

## Tokens — Typography

No new typefaces. Services uses the core three-typeface system as specified in `saturday-core`: Space Grotesk for the hub wordmark and section headings, Elms Sans for nav/pill/badge chrome, Inter for any body copy (rare on the hub — it is visual-first), Instrument Serif italic for the tagline "Every day is Saturday" — the hub's one editorial flourish, shown once on the hero.

### Type Scale

No new scale steps. The hub leans on `--text-display-lg` (64px) for the wordmark treatment where used as text, and `--text-editorial` (24px) for the tagline. Interior "app" screens under the Services umbrella use the standard core scale.

## Tokens — Spacing & Shapes

**Density:** sparse on the hub hero (one centerpiece, two nav labels, one tagline); moderate on interior app screens.

No new spacing or radius tokens — inherited from `saturday-core`. The chamfer cut size defaults to `--chamfer-hero` (12px) on the hub's project-deck panels, since they are large, hero-scale surfaces; interior app components use `--chamfer-compact` (8px).

## Components

### Hub Wordmark
**Role:** Top-left corner chrome, persistent across hero and deck

Space Grotesk 700, uppercase, `--text-label` (12px) scale, tracking 0.15em, `--color-text-main`. Positioned top-left at 24px margin, always visible. No background, no border — text alone, matching the ActiveTheory label-tag primitive.

### Project Deck Panel
**Role:** One full-viewport panel per `links.json` entry — the hub's core navigational unit

Full-viewport chamfered panel (`--chamfer-hero`, 12px cut), `--color-bg-base` fill, 1px hairline border. Contains, vertically centered: the vertical's 2D SVG logo (accent-lit in that vertical's own color — Services panels show Electric Blue, Shakes panels show Copper, etc.), a Space Grotesk uppercase title, a status badge (LIVE/SOON), and an "ENTER →" text link in the panel's own accent. Panel accent always matches the linked vertical's accent — this is the one place multiple accents legitimately coexist across a scrolling sequence, because only one is ever visible on screen at a time.

### 3D Parent Centerpiece
**Role:** Hero visual — the extruded Saturday Services parent mark

SVG-extruded geometry (per `docs/3d-pipeline.md`), brushed-titanium PBR base material, Electric Blue emissive pass on edge highlights and interior facets. Slow idle rotation (~4°/sec), subtle cursor-parallax (max 8px translate), sparse Electric Blue particle field at low density. Centered in the hero viewport, occupying roughly the central third. This is the one place emissive blue is allowed to feel expansive — it is still a single material pass, not a wash across the UI.

### Enter Link
**Role:** Deck panel's primary affordance — text link, not a button

Elms Sans 13px uppercase weight 600, `--accent-services` color, arrow glyph suffix ("ENTER →"). No pill, no fill, no border — an underline appears on hover only. This intentionally breaks from the primary-button pattern because the deck's real affordance is the whole panel (swipe/click), not a small control.

### Data-Viz Accent Line
**Role:** Any interior app chart, progress indicator, or active-path rule

Where the Services vertical needs to represent an active data path (progress bars, active step in a flow, a chart's primary series), use `--accent-services` at full opacity for the active/primary series and `--hairline` for all inactive/reference series. Never introduce a second chart color — comparative series are distinguished by line weight or dash pattern, not by additional hues.

### Group Panel (M&N passthrough)
**Role:** Deck entry whose `children` render as a sub-list — used only for the M&N Collective group

Renders as the one exception surface in the deck sequence: see `mn-collective/README.md`. The Services layer's job here is only to recognize the `children` array and defer entirely to M&N's own light-plate styling — do not apply Electric Blue, chamfer, or dark fill to this panel.

## Do's and Don'ts

### Do
- Use Electric Blue (`#00F0FF`) as the only chromatic accent anywhere on hub or Services-branded surfaces
- Let the 3D parent centerpiece own the hero viewport — keep all chrome (wordmark, nav, tagline) in the corners
- Use the "ENTER →" text-link pattern for deck navigation instead of a filled button — the panel itself is the click target
- Apply `--chamfer-hero` (12px) to full-viewport deck panels; drop to `--chamfer-compact` (8px) on smaller interior components
- Show the Instrument Serif tagline exactly once, on the hero — never repeat it on interior screens

### Don't
- Do not introduce a second accent color into any Services-branded screen, including charts or data visualizations
- Do not add persistent chrome beyond the wordmark, pill nav, and status label — the hub stays visually sparse
- Do not restyle the M&N group panel with Electric Blue, chamfer, or dark fill — it must render using its own canonical tokens
- Do not use filled pill buttons for primary deck navigation — reserve `.btn--primary` for true in-app actions, not the swipe deck
- Do not let the particle field around the 3D centerpiece become dense enough to read as decoration rather than atmosphere

## Surfaces

| Level | Name | Value | Purpose |
|-------|------|-------|---------|
| 0 | Void | `#0B0C10` | Hero canvas, deck panel background |
| 1 | Titanium Panel | `#1F2833` | Interior app elevated surfaces only — never used on the hub hero/deck |
| Accent | Electric Signal | `#00F0FF` | Emissive 3D pass, active nav state, primary link/CTA color, data-viz active series |

## Elevation

Identical to `saturday-core`: hairlines and chamfer cuts carry structure, no resting shadows on flat panels. The one Services-specific addition is the 3D centerpiece's rim light — a soft Electric Blue glow along the geometry's edges, achieved via the emissive material pass, not a CSS shadow. On hover, the primary Enter link and any `.btn--primary` instance may show a soft `--accent-services-glow` box-shadow — this is the vertical's only permitted interactive glow.

## Imagery

The hub's sole image subject is the 3D extruded parent mark. Deck panels show each vertical's flat 2D SVG logo, accent-lit in that vertical's color. No photography on the hub. Interior Services-branded app screens (should any exist beyond the hub) follow core imagery rules: hairline-framed, desaturated where photography is unavoidable, icons at 1–1.5px stroke weight in Electric Blue only when indicating an active/selected state, otherwise `--color-text-muted`.

## Layout

Hero is full-bleed, no max-width, single viewport. Deck panels are full-viewport, horizontally swipeable/scrollable, one per link entry, snap-scrolling. Corner chrome: wordmark top-left, pill nav top-right (`PROJECTS ↓` or deck position indicator), status label bottom-right. Interior app screens (if built under Services) adopt the core 1280px max-width content layout.

## Agent Prompt Guide

### Quick Color Reference
- background: `#0B0C10` (canvas)
- text: `#F0F3F4` (primary), `#8A9199` (muted)
- border: `rgba(192,192,192,0.18)` (hairline)
- accent: `#00F0FF` (Electric Blue — the ONLY chromatic color on this vertical)
- accent glow: `rgba(0,240,255,0.4)`
- accent wash (rare, selected-state only): `rgba(0,240,255,0.12)`

### Quick Type Reference
- Wordmark/headings: Space Grotesk 700, uppercase, 0.12–0.15em tracking
- Nav/badges/labels: Elms Sans 600, uppercase, 10–13px
- Tagline (once only): Instrument Serif italic, 24px

### Quick Shape Reference
- deck panels: `--chamfer-hero` (12px cut)
- interior components: `--chamfer-compact` (8px cut)
- buttons: 6px radius; badges: 999px pill

### Example Component Prompts

1. **3D Hero Centerpiece**: full-viewport WebGL scene, `#0B0C10` background, brushed-titanium extruded parent mark with `#00F0FF` emissive edge pass, idle rotation ~4°/sec, cursor parallax max 8px, sparse blue particle field. Wordmark top-left (Space Grotesk 700 uppercase 12px, 0.15em tracking), pill nav top-right, Instrument Serif italic tagline "Every day is Saturday" centered below the mark at 24px.

2. **Project Deck Panel**: full-viewport chamfered panel (`--chamfer-hero`, `#0B0C10` fill, 1px hairline border, 12px corner cuts top-right/bottom-left), centered vertical logo (accent-lit in the linked vertical's color), Space Grotesk uppercase title 32px, status badge (pill, Elms Sans 10px uppercase, LIVE = accent border/text or SOON = hairline border/muted text), "ENTER →" link in Elms Sans 13px uppercase weight 600, accent-colored, underline on hover only.

3. **Pill Nav (hub)**: fixed top-right, transparent background, two Elms Sans 12px uppercase labels ("PROJECTS ↓" / position indicator) separated by a 1px hairline, 8px vertical / 16px horizontal padding, active state text in `#00F0FF`.

4. **Data-Viz Progress Line**: 2px height, `--hairline` background track, `#00F0FF` fill representing progress percentage, 999px radius end-caps, no gradient, no glow at rest — glow only appears on hover/focus of an adjacent interactive control.

5. **Status Badge (LIVE)**: pill (999px), Elms Sans 10px uppercase weight 600, 0.1em tracking, padding 4px 12px, 1px `#00F0FF` border, `#00F0FF` text, transparent fill.

6. **Group Panel (M&N passthrough)**: do NOT style with Services tokens — render M&N's own alabaster plate per `mn-collective/README.md`; this panel is the deck's sole exception to Electric Blue accenting.

## Similar Brands

- **Vercel** — Dark hub UI with a single bright interactive accent and generous negative space
- **Linear** — Restrained parent-product surface, one accent color disciplined across every interactive state
- **Apple's product pages (dark mode)** — Single 3D hero object owning the viewport, chrome reduced to minimal corner labels
- **Framer** — Cool-toned dark marketing shell with sparse accent usage reserved for CTAs and active states

## Quick Start

### CSS Custom Properties

```css
:root {
  /* Services accent layer — extends saturday-core/Variables.css */
  --accent-services: #00F0FF;
  --accent-services-wash: rgba(0, 240, 255, 0.12);
  --accent-services-glow: rgba(0, 240, 255, 0.4);

  /* Set the active accent scope for this vertical */
  --accent-current: var(--accent-services);
}
```

### Tailwind v4

```css
@theme {
  /* Services accent layer — extends saturday-core/Theme.css @theme block */
  --color-accent-services: #00F0FF;
  --color-accent-services-wash: rgba(0, 240, 255, 0.12);
  --color-accent-services-glow: rgba(0, 240, 255, 0.4);
}
```
