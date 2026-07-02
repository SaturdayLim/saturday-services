# Saturday Services — Shakes Vertical (Bar Apps)
> *a boston shaker catching low light — warm metal on a dark counter*

**Theme:** dark
**Inherits:** `saturday-core`. This file defines the **Shakes layer only** — accent tokens, bar-app components (recipe cards, ingredient chips, measurement labels), warm metallic material rules, and flavour-pairing UI motifs. All palette, type, spacing, chamfer, and elevation rules not restated here are inherited unchanged from `saturday-core/Design.md`. Read that file first.

Shakes covers Michael's bar-craft apps — Saturday Shakes (recipes) and Flavour Lab (flavour-mixing). It is the warmest vertical in the family: Copper (`#B87333`) reads as a genuine material — brushed metal, a shaker tin catching light — rather than a flat UI color, with a lighter companion tone (`#D4975C`) for highlights and hover states. The mood is late-night bar-cart craftsmanship: precise measurement, warm light, a single well-made object per surface. Where Services stays cool and clinical, Shakes is tactile — but still obsidian-based, still hairline-disciplined, still one accent per surface.

## Tokens — Colors

| Name | Value | Token | Role |
|------|-------|-------|------|
| Copper | `#B87333` | `--accent-shakes` | The vertical's sole chromatic signal — ingredient-chip borders, active measurement labels, primary CTA, shaker-tin material base |
| Copper Light | `#D4975C` | `--accent-shakes-light` | Highlight tone — hover states, gradient tops on metallic surfaces, rim light on 3D shaker geometry |
| Copper Wash | `rgba(184,115,51,0.12)` | `--accent-shakes-wash` | Whisper-faint selected/active ingredient row background — the only tinted background permitted |
| Copper Glow | `rgba(184,115,51,0.4)` | `--accent-shakes-glow` | Box-shadow glow for hover/focus states and the shaker's emissive rim pass |

All other tokens (canvas, surface, text, hairline, typefaces, spacing, chamfer, radii) are inherited directly from `saturday-core`.

## Tokens — Typography

No new typefaces. Recipe titles and section headings use Space Grotesk per core rules. Ingredient names, measurement labels, and chip text use Elms Sans — its instrument-panel character suits precise measurement ("2 OZ", "0.5 TSP") well. Body copy (recipe method steps, tasting notes) uses Inter at 14–16px with 150%+ leading for comfortable reading during actual bar use. Instrument Serif italic is reserved for a single flourish per recipe screen — typically a tasting-note pull-quote ("bright, bitter, built to linger").

### Type Scale

No new scale steps beyond `saturday-core`. Measurement labels typically sit at `--text-label` (12px) or `--text-micro` (10px) depending on chip density.

## Tokens — Spacing & Shapes

**Density:** moderate — recipe cards need room for ingredient lists but should never feel like a spreadsheet.

No new spacing or radius tokens. Recipe cards default to `--chamfer-compact` (8px cut); the Flavour Lab's larger exploratory canvas panels may use `--chamfer-hero` (12px).

## Components

### Recipe Card
**Role:** The core content unit — one cocktail or mix per card

Chamfered panel (`--chamfer-compact`, 8px cut), `--color-bg-base` fill, 1px hairline border, 24px padding. Contains: a Space Grotesk uppercase title, a Copper-accented category micro-label (e.g. "CLASSIC — STIRRED"), an ingredient list rendered as ingredient chips, and a method summary in Inter body text. Hover: border resolves to Copper at reduced opacity (not full accent — this is a content card, not a button) plus optional 2px lift.

### Ingredient Chip
**Role:** Compact tag representing one ingredient + measurement within a recipe

Pill shape (999px radius), Elms Sans 11px uppercase weight 500, padding 4px 12px, 1px hairline border, `--color-text-main` text. The measurement portion (e.g. "2 OZ") is set in Copper (`--accent-shakes`) to separate quantity from ingredient name at a glance — the only place two text colors coexist within one chip, and it is a deliberate exception because it aids scannability during actual mixing.

### Measurement Label
**Role:** Standalone quantity callout — pour lines, ratios, timing

Elms Sans 12–14px weight 600, `--accent-shakes` color, tabular figures where the font supports them. Used inline within method steps or as a standalone callout beside a shaker illustration. Never uppercase-transformed when it contains numerals plus unit abbreviations (readability over strict system uppercasing).

### Flavour-Pairing Motif
**Role:** Visual grammar connecting complementary ingredients in Flavour Lab

A thin 1px connecting line in Copper Light (`--accent-shakes-light`) at 40% opacity, drawn between two ingredient nodes on the Flavour Lab canvas to indicate a suggested pairing. Nodes are small chamfered chips (4px cut); the connecting line brightens to full Copper opacity on hover/focus of either endpoint. No circuit-board grid — connections are direct, curved or straight single lines, never orthogonal routing.

### 3D Shaker Centerpiece
**Role:** Hero visual for the Shakes vertical mark and any bar-craft hero moment

SVG-extruded shaker-tin geometry (the two-tin Boston shaker forming an S, per the Shakes mark), brushed-copper PBR material with anisotropic highlights, warm rim light in Copper Light. Slow idle rotation, subtle parallax. This is the one place the copper "material" fully expresses itself — everywhere else, copper stays a disciplined UI accent.

### Tasting Note Flourish
**Role:** Single editorial moment per recipe screen

Instrument Serif italic, `--text-editorial` (24px), `--color-text-main`, positioned as a pull-quote near the recipe title or hero image. One per screen — if a second tasting note appears, set it in Inter body italic instead, not a second Instrument Serif instance.

## Do's and Don'ts

### Do
- Use Copper (`#B87333`) as the only chromatic accent on any Shakes-branded surface; reach for Copper Light only for highlights, hovers, and rim light — never as a second competing accent
- Set ingredient measurements in Copper within chips to aid at-a-glance scanning — this is the vertical's one sanctioned two-color-per-component exception
- Let the 3D shaker centerpiece carry real anisotropic brushed-metal material quality — this is where "material world" is most literal in the whole system
- Keep flavour-pairing connections as single direct lines, curved or straight — never orthogonal circuit-board routing
- Reserve the Instrument Serif tasting-note flourish to one per recipe screen

### Don't
- Do not introduce a second chromatic accent (no gold, no amber, no separate "warning" color) — Copper and Copper Light are the complete palette
- Do not render ingredient chips or recipe cards as data-dense tables — this is a bar-craft app, not a spreadsheet; keep generous padding and chip-based scanning
- Do not use circuit-board orthogonal routing for flavour-pairing connections — that motif belongs to the retired cyberpunk direction, not this system
- Do not apply emissive glow to flat UI chips or cards at rest — glow is reserved for the 3D centerpiece and active hover/focus states only
- Do not let the tasting-note flourish appear more than once per screen, or set it in any typeface other than Instrument Serif

## Surfaces

| Level | Name | Value | Purpose |
|-------|------|-------|---------|
| 0 | Void | `#0B0C10` | Recipe list background, Flavour Lab canvas |
| 1 | Titanium Panel | `#1F2833` | Recipe card elevated variant (optional, used sparingly for featured/pinned recipes) |
| Accent | Copper Signal | `#B87333` / `#D4975C` | Measurement labels, active chips, primary CTA, 3D shaker material |

## Elevation

Identical to `saturday-core`: hairlines and chamfer cuts carry structure. Recipe cards may gain a subtle 2px lift plus a Copper-tinted whisper shadow (`0 8px 24px rgba(184,115,51,0.15)`) on hover only — never at rest. The 3D shaker centerpiece's rim light is achieved via its emissive material pass, not a CSS effect.

## Imagery

Where the vertical uses photography (a poured drink, garnish detail), images sit inside a chamfered hairline frame (`--chamfer-compact`), slightly desaturated to hold against the obsidian canvas — consistent with core imagery rules. The shaker mark itself is the primary non-photographic image subject. Iconography (jigger, stirring spoon, ice cube) uses 1–1.5px line strokes, Copper only when indicating an active/selected ingredient or step, otherwise muted.

## Layout

Recipe list/grid uses the core 1280px max-width content layout with an 8px-grid card arrangement, 24px gutters. Flavour Lab uses a freer canvas layout (nodes positioned by flavour-affinity logic rather than a strict grid) but keeps the same obsidian canvas and hairline-chip visual language. Corner chrome (wordmark, nav) follows core rules.

## Agent Prompt Guide

### Quick Color Reference
- background: `#0B0C10` (canvas), `#1F2833` (elevated card variant, sparingly)
- text: `#F0F3F4` (primary), `#8A9199` (muted)
- border: `rgba(192,192,192,0.18)` (hairline)
- accent: `#B87333` (Copper — primary), `#D4975C` (Copper Light — highlights/hover only)
- accent glow: `rgba(184,115,51,0.4)`
- accent wash (rare): `rgba(184,115,51,0.12)`

### Quick Type Reference
- Recipe titles/headings: Space Grotesk 700, uppercase, 0.12–0.15em tracking
- Ingredient/measurement labels: Elms Sans 500–600, 11–14px
- Method/tasting body: Inter 400, 14–16px, 150%+ leading
- Tasting-note flourish (once per screen): Instrument Serif italic, 24px

### Quick Shape Reference
- recipe cards: `--chamfer-compact` (8px cut)
- Flavour Lab canvas panels: `--chamfer-hero` (12px cut)
- ingredient chips: 999px pill
- buttons: 6px radius

### Example Component Prompts

1. **Recipe Card**: chamfered panel (`--chamfer-compact`, `#0B0C10` fill, 1px hairline border, 8px corner cuts), 24px padding, Space Grotesk uppercase title 24px, Copper micro-label category tag above title, 3–5 ingredient chips in a wrapped row, Inter 14px method summary below (2–3 lines), hover: border shifts to Copper at 40% opacity + 2px lift + soft copper shadow.

2. **Ingredient Chip**: pill (999px radius), 1px hairline border, padding 4px 12px, Elms Sans 11px uppercase weight 500; ingredient name in `#F0F3F4`, measurement portion (e.g. "2 OZ") in `#B87333`, separated by a small gap.

3. **Measurement Callout**: Elms Sans 14px weight 600, `#B87333`, tabular figures, not uppercase-transformed (numerals stay natural case), used inline in a method step or as a standalone pour-line label.

4. **Flavour-Pairing Node + Line**: small chamfered chip (4px cut, hairline border, Elms Sans 10px uppercase ingredient name), connected to a paired node by a 1px `#D4975C` line at 40% opacity, brightening to full opacity on hover of either node. No orthogonal/circuit routing.

5. **3D Shaker Hero**: WebGL scene, `#0B0C10` background, brushed-copper extruded two-tin shaker-S geometry with anisotropic highlights, `#D4975C` rim light, idle rotation, subtle cursor parallax, no particle field (keep this centerpiece calmer/warmer than the Services blue variant).

6. **Tasting Note Flourish**: Instrument Serif italic, 24px, `#F0F3F4`, positioned as a pull-quote below a recipe title or beside a hero image, appearing once per screen only.

## Similar Brands

- **Death & Co. digital properties** — Warm dark bar-craft aesthetic with precise typographic measurement callouts
- **Kinfolk / Cereal-adjacent editorial food brands** — Restrained warm palette, single accent, generous whitespace around content
- **Teenage Engineering** — Brushed-metal material honesty applied to a calm, uncluttered dark interface (the shared material-world DNA with saturday-core)
- **Blue Bottle Coffee's product pages** — Warm-on-dark material photography discipline, single accent color, minimal chrome

## Quick Start

### CSS Custom Properties

```css
:root {
  /* Shakes accent layer — extends saturday-core/Variables.css */
  --accent-shakes: #B87333;
  --accent-shakes-light: #D4975C;
  --accent-shakes-wash: rgba(184, 115, 51, 0.12);
  --accent-shakes-glow: rgba(184, 115, 51, 0.4);

  /* Set the active accent scope for this vertical */
  --accent-current: var(--accent-shakes);
}
```

### Tailwind v4

```css
@theme {
  /* Shakes accent layer — extends saturday-core/Theme.css @theme block */
  --color-accent-shakes: #B87333;
  --color-accent-shakes-light: #D4975C;
  --color-accent-shakes-wash: rgba(184, 115, 51, 0.12);
  --color-accent-shakes-glow: rgba(184, 115, 51, 0.4);
}
```
