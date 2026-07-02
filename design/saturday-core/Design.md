# Saturday Services — Core Design System
> *every day is Saturday — a single instrument glowing in obsidian, chrome held to the corners*

**Theme:** dark
**Status:** Canonical shared foundation. Every vertical (`services/`, `shakes/`, `solutions/`) inherits this file and layers only an accent + a handful of motifs on top. `mn-collective/` is the one exception — it never inherits from here; see its README.

Saturday Services stages its hub and every vertical app on a near-black obsidian canvas — never pure `#000000` — with chrome pushed to the corners and one 3D or interactive centerpiece owning the field, in the manner of ActiveTheory's void-canvas discipline. But where ActiveTheory is achromatic and cool, Saturday Services runs warmer and carries real material presence: brushed titanium panels, a single emissive accent per surface, chamfered 45° corners as a house signature instead of ActiveTheory's soft rounds. The ruling that shaped this system: **Saturday Services tokens win on palette, but execution stays restrained — energy, but classy.** That means no data-dense telemetry walls, no circuit-board decoration, no neon-as-wallpaper. Emissive glow is earned — it lives on 3D materials and focused interactive signals, never on body text or backgrounds. Three typefaces carry three distinct jobs (display, instrument-label UI, reading body), with an italic serif reserved for exactly one editorial flourish per viewport. Hairlines replace card chrome throughout; when a border is needed, it is 1px and barely there.

## Tokens — Colors

| Name | Value | Token | Role |
|------|-------|-------|------|
| Obsidian | `#0B0C10` | `--color-bg-base` | Page canvas — never pure black. The deep matte base every surface sits on. |
| Titanium | `#1F2833` | `--color-bg-surface` | Elevated panels and structural containers, used sparingly — most surfaces stay canvas-flat with a hairline, not a fill lift. |
| High-Def White | `#F0F3F4` | `--color-text-main` | Primary text, headings, nav labels, button text on dark fills. |
| Slate Muted | `#8A9199` | `--color-text-muted` | Secondary text, micro-labels at rest, timestamps, helper copy. |
| Hairline Chrome | `rgba(192,192,192,0.18)` | `--hairline` | 1px rules that replace card chrome — the primary structural device across every surface. |
| Electric Blue | `#00F0FF` | `--accent-services` | Services vertical + hub interactive states. A signal, never wallpaper. |
| Copper | `#B87333` | `--accent-shakes` | Shakes vertical. Reads as a brushed-metal material in 3D, not a flat UI color. |
| Copper Light | `#D4975C` | `--accent-shakes-light` | Copper's lighter companion — highlights, hover states, gradient tops on metallic surfaces. |
| Neon Yellow | `#FFE600` | `--accent-solutions` | Solutions/Night Games vertical. Signal only — CTAs, active states, print mark. |
| Forest Green (reference) | `#2C4C38` | `--accent-mn` | M&N Collective's own accent, referenced here only so the hub can render its panel correctly. Never used inside a Saturday-branded surface. |

**One accent per surface.** A vertical's page uses *its* accent only — Services pages never borrow copper, Shakes pages never borrow electric blue. The hub (parent) uses Electric Blue as its own interactive signal since it is the Services-adjacent umbrella experience.

## Tokens — Typography

### Space Grotesk — Display + headings typeface. Sharp geometric neo-grotesque with just enough personality to feel designed, not generic. H1/H2 set in uppercase with expanded tracking give it an instrument-panel authority; this is the voice that says "Saturday" at a glance. · `--font-display`
- **Substitute:** Archivo, General Sans
- **Weights:** 400, 500, 700
- **Sizes:** 14, 16, 24, 32, 48, 64
- **Line height:** 1.05, 1.15, 1.3
- **Letter spacing:** 0.12em–0.15em on uppercase H1/H2; natural otherwise
- **Role:** Display + headings. H1/H2 always uppercase at 0.12–0.15em tracking. Weight 700 for hero-scale display, 500 for section headings, 400 rarely (large decorative moments only).

### Elms Sans — UI, navigation, and micro-label typeface. A utilitarian geometric instrument voice: uppercase 10–12px labels at tight tracking read like panel markings rather than conventional UI chrome. This is the workhorse that carries nav, buttons, badges, and status tags. · `--font-ui`
- **Substitute:** Archivo Expanded, IBM Plex Sans
- **Weights:** 400, 500, 600, 700 (variable font, 400–700 range used)
- **Sizes:** 10, 11, 12, 13, 14
- **Line height:** 1.2, 1.4
- **Letter spacing:** 0.08em–0.14em on uppercase labels; normal on sentence-case UI copy
- **Role:** Nav labels, buttons, micro-labels, status badges, form labels, table headers. Always the first choice for anything that is UI chrome rather than reading content.

### Inter — Body reading typeface. Neutral, highly legible workhorse for paragraph copy, descriptions, and any block of text meant to be read rather than scanned. · `--font-body`
- **Substitute:** system-ui, -apple-system, Segoe UI
- **Weights:** 400, 500
- **Sizes:** 14, 16
- **Line height:** 1.5, 1.6 (150%+ leading is the rule)
- **Letter spacing:** normal
- **Role:** Body copy, descriptions, longer-form reading content. 14px default, 16px for lead paragraphs. Never used for headings or UI chrome — that boundary is what keeps the three-typeface system legible as a system.

### Instrument Serif — Editorial flourish typeface, italic. Reserved for exactly one moment per viewport: the tagline, a pull-quote, a single evocative line. Its rarity is the point — if it shows up twice on a screen, the system has failed. · `--font-editorial`
- **Substitute:** Georgia italic, Times New Roman italic
- **Weights:** 400, 400 italic
- **Sizes:** 18, 24, 32
- **Line height:** 1.2, 1.3
- **Letter spacing:** normal
- **Role:** Editorial flourish only — e.g. the tagline "Every day is Saturday" in italic. One per viewport, maximum. Never body copy, never UI, never a headline substitute.

### Type Scale

| Role | Size | Line Height | Letter Spacing | Token |
|------|------|-------------|----------------|-------|
| micro-label | 10px | 1.2 | 0.10em | `--text-micro` |
| label | 12px | 1.4 | 0.08em | `--text-label` |
| ui | 13px | 1.4 | normal | `--text-ui` |
| body | 14px | 1.6 | normal | `--text-body` |
| body-lg | 16px | 1.6 | normal | `--text-body-lg` |
| heading-sm | 24px | 1.3 | 0.05em | `--text-heading-sm` |
| heading | 32px | 1.15 | 0.12em (uppercase) | `--text-heading` |
| display | 48px | 1.1 | 0.15em (uppercase) | `--text-display` |
| display-lg | 64px | 1.05 | 0.15em (uppercase) | `--text-display-lg` |
| editorial | 24px | 1.3 | normal (italic) | `--text-editorial` |

## Tokens — Spacing & Shapes

**Density:** moderate — generous negative space around a spare set of instrument-panel controls.

### Spacing Scale

| Name | Value | Token |
|------|-------|-------|
| 4 | 4px | `--spacing-4` |
| 8 | 8px | `--spacing-8` |
| 16 | 16px | `--spacing-16` |
| 24 | 24px | `--spacing-24` |
| 32 | 32px | `--spacing-32` |
| 48 | 48px | `--spacing-48` |
| 64 | 64px | `--spacing-64` |
| 96 | 96px | `--spacing-96` |

### Border Radius & Chamfer

| Element | Value |
|---------|-------|
| panels (chamfer cut) | 8–12px 45° chamfer, corners cut via `clip-path` — not `border-radius` |
| buttons | 6px |
| pill badges / pill buttons | 999px |
| inputs | 6px |

### Layout

- **Card padding:** 24–32px
- **Element gap:** 12–16px
- **Grid:** strict 8px base unit
- **Chamfer cut size:** 8px (compact panels), 12px (hero-scale panels)

## Components

### Chamfered Panel
**Role:** The house signature container — replaces the rounded card across every Saturday surface

A rectangular panel with two or four corners cut at 45° via `clip-path`, 8–12px cut size depending on panel scale. Fill is `--color-bg-base` or `--color-bg-surface` (used sparingly, only where real elevation is needed), bounded by a 1px `--hairline` border. No resting shadow — hairline and the chamfer cut do all the structural work. Padding 24–32px. This is the primitive every vertical's cards, quote blocks, and content panels build from.

### Primary Accent Button
**Role:** The single most important action on a surface

6px radius, filled with the surface's one accent color (Electric Blue / Copper / Neon Yellow depending on vertical), dark text (`#0B0C10`) for contrast against the bright fill, Elms Sans 13px uppercase weight 600, tracking 0.08em. Padding 12px vertical, 24px horizontal. Emissive glow permitted: a soft outer box-shadow in the accent color at low opacity, signaling interactivity — not decoration. One per view.

### Ghost Hairline Button
**Role:** Secondary action

Transparent fill, 1px `--hairline` border, `--color-text-main` text, same 6px radius and padding as the primary button. Hover: border resolves to the vertical's accent at full opacity, text shifts to accent color. No fill change on hover — the system favors line-weight and color shifts over surface lifts.

### Pill Nav
**Role:** Primary site/app navigation, top-right corner

Floating top-right, transparent background, Elms Sans 11–12px uppercase labels at 0.1em tracking, separated by 1px hairline connectors or simple gap spacing. 999px capsule implied by padding and label rhythm rather than a heavy fill. Padding 8px vertical, 16px horizontal per label group.

### Status Badge (LIVE / SOON)
**Role:** Project/feature state indicator

Pill (999px radius), Elms Sans 10px uppercase weight 600, tracking 0.1em, padding 4px 12px. `LIVE` state: 1px border in the vertical's accent, accent-colored text, transparent fill. `SOON` state: 1px `--hairline` border, `--color-text-muted` text. Never a solid saturated fill — badges signal via line and text color only.

### Instrument Micro-Label
**Role:** Section markers, metadata, figure captions

Elms Sans 10px uppercase, weight 400–500, `--color-text-muted`, tracking 0.1em. No background, no border. Used the way architectural drawings annotate components — sparse, precise, always near the element it describes.

### Hairline Divider
**Role:** Structural separation replacing card chrome and section dividers

1px solid `rgba(192,192,192,0.18)`. The default way to separate any two zones — nav from content, card from card, footer from page. Fills and shadows are the exception; hairlines are the rule.

### Glass Overlay
**Role:** Modals, popovers, and any element genuinely detached from the page flow

The only place glassmorphism is permitted in the system. `backdrop-filter: blur(12px)`, fill `rgba(31,40,51,0.6)` (Titanium at reduced opacity), 1px hairline border. No resting glass on standard content surfaces — this effect is reserved for true overlays.

### 3D / Emissive Centerpiece
**Role:** Hero visual — the page's actual subject, per vertical

A single WebGL-rendered artifact (extruded vertical mark, product visualization, or similar), brushed-metal PBR base material with an emissive pass in the vertical's accent color. Centered on the void canvas, occupying roughly the central third of the viewport. Idle rotation and cursor parallax are the only permitted ambient motion. No fixed dimensions — responsive to canvas. This is where emissive bloom belongs; it does not belong on flat UI.

### Chamfer Utility Corner
**Role:** Decorative corner mark reinforcing the chamfer motif without adding a full panel

A small 8–12px 45°-cut accent shape or bracket, placed at panel corners or section boundaries in `--hairline` or the vertical accent at low opacity. Never crosshair reticles, never circuit-trace decoration — a single clean cut, nothing busier.

## Do's and Don'ts

### Do
- Use `#0B0C10` as the base canvas across every surface — never introduce pure black or a light background outside the M&N exception panel
- Cut panel corners at 45° (8–12px) via `clip-path` as the house signature shape — reserve `border-radius` for buttons, badges, and inputs only
- Use 1px hairlines (`rgba(192,192,192,0.18)`) to separate zones instead of card fills, borders, or shadows
- Restrict each surface to exactly one chromatic accent — Electric Blue on Services, Copper on Shakes, Neon Yellow on Solutions — never mix accents on one screen
- Set all UI chrome (nav, buttons, badges, labels) in Elms Sans uppercase at 10–13px; reserve Inter for reading body copy only
- Use Instrument Serif italic for exactly one editorial flourish per viewport — a tagline, a pull-quote — never more
- Let emissive glow live only on 3D materials and focused interactive signals (button hover, active nav state) — never on text blocks or backgrounds
- Apply glassmorphism (`blur(12px)` + hairline) only to true overlays: modals, popovers, toasts

### Don't
- Do not build data-dense telemetry walls, dashboards-as-decoration, or circuit-board trace patterns anywhere on the hub or vertical apps
- Do not use crosshair reticles, glowing grid overlays, or neon-as-wallpaper — chroma is a signal, not an atmosphere
- Do not round panel corners — chamfer is the system's shape signature; a rounded card reads as off-brand immediately
- Do not use more than one accent color on a single surface, even across two different verticals' components shown together
- Do not use monospace "hacker terminal" typefaces anywhere in this system — Elms Sans carries the technical-label role, not JetBrains Mono or similar
- Do not apply resting shadows to flat content panels — hairlines and chamfer cuts carry all structural differentiation
- Do not stack multiple emissive glows on one screen — one focused signal per surface, matching the single-accent rule
- Do not use Instrument Serif for UI text, body copy, or more than one flourish per viewport

## Surfaces

| Level | Name | Value | Purpose |
|-------|------|-------|---------|
| 0 | Void | `#0B0C10` | Full-bleed page canvas, hero background, default surface for nearly everything |
| 1 | Titanium Panel | `#1F2833` | Elevated cards and structural containers — used sparingly, only where real content grouping needs a fill lift |
| 2 | Glass Overlay | `rgba(31,40,51,0.6)` + blur(12px) | Modals, popovers, toasts — the only surface permitted glassmorphism |

## Elevation

Elevation is expressed through hairlines and chamfer cuts, not shadows. A chamfered panel at rest is: canvas or Titanium fill, a 1px hairline border, generous padding — no drop shadow. The one exception is the accent button's focused emissive glow (a soft low-opacity box-shadow in the accent color), which signals interactivity rather than depth. Glass overlays are the only surfaces permitted a conventional shadow, and even then it should stay subtle — the void-canvas discipline means nothing should feel like it's floating far above the page; it should feel like a cutout in the same darkness, consistent with ActiveTheory's original elevation philosophy.

## Imagery

The visual language favors a single WebGL-rendered 3D centerpiece per surface — an extruded vertical mark or product visualization in brushed metal with an emissive accent pass — over photography, stock imagery, or illustration. Where imagery is unavoidable (e.g. a recipe photo in Shakes), it sits inside a chamfered hairline frame, desaturated slightly to sit comfortably against the obsidian canvas. Iconography is minimal: simple geometric line icons at 1–1.5px stroke weight, never filled, never more than one accent color. Particle or ambient atmosphere around the centerpiece is sparse and low-density — it provides depth cues, not visual noise. Imagery-to-text ratio stays high on hero moments, then normalizes to a content-first ratio on interior/app screens.

## Layout

Full-bleed void canvas with no max-width container on hero/landing moments; interior app screens may adopt a comfortable reading measure (max 1200–1280px) once content density increases. Chrome is pushed to corners: wordmark top-left, pill nav top-right, status/utility labels bottom-right. Section rhythm on marketing surfaces is defined by full-viewport scenes; app interiors use an 8px-grid card layout with generous 24–32px gutters. There is no drop-shadow card grid — chamfered panels separated by hairlines and negative space do the organizing work. Navigation stays minimal and persistent. Content density is intentionally kept low on hero moments and moderate (never dense) on interior screens — the "no telemetry wall" rule applies everywhere.

## Agent Prompt Guide

### Quick Color Reference
- background: `#0B0C10` (canvas, never pure black), `#1F2833` (elevated panels, sparingly)
- text: `#F0F3F4` (primary), `#8A9199` (muted)
- border: `rgba(192,192,192,0.18)` (hairline — the default structural device)
- accent (pick ONE per surface): `#00F0FF` (Services), `#B87333` / `#D4975C` (Shakes), `#FFE600` (Solutions)
- overlay fill: `rgba(31,40,51,0.6)` + `blur(12px)`

### Quick Type Reference
- Display/headings: Space Grotesk 700/500, uppercase, 0.12–0.15em tracking
- UI/nav/labels: Elms Sans 400–700, uppercase 10–13px, 0.08–0.14em tracking
- Body: Inter 400/500, 14–16px, 150%+ leading
- Editorial flourish (once per viewport only): Instrument Serif italic, 18–32px

### Quick Shape Reference
- panels: 8–12px 45° chamfer via `clip-path`, never `border-radius`
- buttons/inputs: 6px radius
- badges/pills: 999px radius
- grid: 8px base unit

### Example Component Prompts

1. **Chamfered Panel**: `#0B0C10` fill (or `#1F2833` if elevated), 1px hairline border `rgba(192,192,192,0.18)`, top-right and bottom-left corners cut at 45° via `clip-path` (10px cut), 28px padding, no shadow.

2. **Primary Accent Button**: 6px radius, fill in the surface's single accent color (e.g. `#00F0FF` for Services), text `#0B0C10`, Elms Sans 13px uppercase weight 600 at 0.08em tracking, padding 12px 24px, soft outer glow on hover (`box-shadow: 0 0 16px [accent]40`).

3. **Ghost Hairline Button**: transparent fill, 1px border `rgba(192,192,192,0.18)`, text `#F0F3F4`, 6px radius, same padding as primary; hover shifts border and text to the vertical accent, no fill change.

4. **Status Badge**: pill (999px), Elms Sans 10px uppercase weight 600 at 0.1em tracking, padding 4px 12px; LIVE = 1px accent border + accent text, transparent fill; SOON = 1px hairline border + `#8A9199` text.

5. **Instrument Micro-Label**: Elms Sans 10px uppercase weight 400, `#8A9199`, 0.1em tracking, no background or border, positioned inline near the element it annotates.

6. **Glass Overlay Modal**: `rgba(31,40,51,0.6)` fill, `backdrop-filter: blur(12px)`, 1px hairline border, 10px chamfer on two corners, 32px padding, centered with a soft ambient shadow — the only surface in the system permitted this treatment.

## Similar Brands

- **ActiveTheory** — Direct stage-discipline ancestor: void canvas, corner chrome, hairlines over card fills, one centerpiece owning the field
- **Framer's dark marketing sites** — Restrained single-accent dark UI with generous negative space and instrument-label micro-typography
- **Teenage Engineering** — Industrial-instrument material language (brushed metal, chamfered hardware) applied to a calm, uncluttered interface
- **Vercel (dark mode)** — Obsidian-adjacent canvas, hairline-first component chrome, one bright accent used sparingly for interactive state
- **Linear** — Restrained dark UI, sharp geometric type pairing, single-accent interaction color disciplined across an entire product surface

## Quick Start

### CSS Custom Properties

```css
:root {
  /* Colors — Core */
  --color-bg-base: #0B0C10;
  --color-bg-surface: #1F2833;
  --color-text-main: #F0F3F4;
  --color-text-muted: #8A9199;
  --hairline: rgba(192, 192, 192, 0.18);

  /* Colors — Vertical Accents (one per surface) */
  --accent-services: #00F0FF;
  --accent-shakes: #B87333;
  --accent-shakes-light: #D4975C;
  --accent-solutions: #FFE600;
  --accent-mn: #2C4C38; /* reference only — never used on Saturday surfaces */

  /* Colors — Overlay */
  --overlay-glass: rgba(31, 40, 51, 0.6);
  --overlay-blur: 12px;

  /* Typography — Font Families */
  --font-display: 'Space Grotesk', Archivo, ui-sans-serif, system-ui, sans-serif;
  --font-ui: 'Elms Sans', 'Archivo Expanded', ui-sans-serif, system-ui, sans-serif;
  --font-body: 'Inter', ui-sans-serif, system-ui, -apple-system, sans-serif;
  --font-editorial: 'Instrument Serif', Georgia, 'Times New Roman', serif;

  /* Typography — Scale */
  --text-micro: 10px;      --leading-micro: 1.2;   --tracking-micro: 0.10em;
  --text-label: 12px;      --leading-label: 1.4;   --tracking-label: 0.08em;
  --text-ui: 13px;         --leading-ui: 1.4;
  --text-body: 14px;       --leading-body: 1.6;
  --text-body-lg: 16px;    --leading-body-lg: 1.6;
  --text-heading-sm: 24px; --leading-heading-sm: 1.3;  --tracking-heading-sm: 0.05em;
  --text-heading: 32px;    --leading-heading: 1.15;    --tracking-heading: 0.12em;
  --text-display: 48px;    --leading-display: 1.1;     --tracking-display: 0.15em;
  --text-display-lg: 64px; --leading-display-lg: 1.05; --tracking-display-lg: 0.15em;
  --text-editorial: 24px;  --leading-editorial: 1.3;

  /* Typography — Weights */
  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;

  /* Spacing (8px base unit) */
  --spacing-4: 4px;
  --spacing-8: 8px;
  --spacing-16: 16px;
  --spacing-24: 24px;
  --spacing-32: 32px;
  --spacing-48: 48px;
  --spacing-64: 64px;
  --spacing-96: 96px;

  /* Layout */
  --card-padding: 28px;
  --element-gap: 16px;
  --page-max-width: 1280px;

  /* Border Radius */
  --radius-button: 6px;
  --radius-input: 6px;
  --radius-full: 999px;

  /* Chamfer (used via clip-path, not border-radius) */
  --chamfer-compact: 8px;
  --chamfer-hero: 12px;

  /* Surfaces */
  --surface-void: #0B0C10;
  --surface-titanium: #1F2833;
  --surface-glass: rgba(31, 40, 51, 0.6);
}
```

### Tailwind v4

```css
@theme {
  /* Colors — Core */
  --color-bg-base: #0B0C10;
  --color-bg-surface: #1F2833;
  --color-text-main: #F0F3F4;
  --color-text-muted: #8A9199;
  --color-hairline: rgba(192, 192, 192, 0.18);

  /* Colors — Vertical Accents */
  --color-accent-services: #00F0FF;
  --color-accent-shakes: #B87333;
  --color-accent-shakes-light: #D4975C;
  --color-accent-solutions: #FFE600;
  --color-accent-mn: #2C4C38;

  /* Typography */
  --font-display: 'Space Grotesk', Archivo, ui-sans-serif, system-ui, sans-serif;
  --font-ui: 'Elms Sans', 'Archivo Expanded', ui-sans-serif, system-ui, sans-serif;
  --font-body: 'Inter', ui-sans-serif, system-ui, -apple-system, sans-serif;
  --font-editorial: 'Instrument Serif', Georgia, 'Times New Roman', serif;

  /* Typography — Scale */
  --text-micro: 10px;
  --text-label: 12px;
  --text-ui: 13px;
  --text-body: 14px;
  --text-body-lg: 16px;
  --text-heading-sm: 24px;
  --text-heading: 32px;
  --text-display: 48px;
  --text-display-lg: 64px;
  --text-editorial: 24px;

  /* Spacing */
  --spacing-4: 4px;
  --spacing-8: 8px;
  --spacing-16: 16px;
  --spacing-24: 24px;
  --spacing-32: 32px;
  --spacing-48: 48px;
  --spacing-64: 64px;
  --spacing-96: 96px;

  /* Border Radius */
  --radius-button: 6px;
  --radius-full: 999px;
}
```
