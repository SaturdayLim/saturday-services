# Saturday Services — Solutions Vertical (Game Night / Print)
> *a single yellow chip on a dark felt table — the whole game hinges on it*

**Theme:** dark
**Inherits:** `saturday-core`. This file defines the **Solutions layer only** — accent tokens, game-night components (score chips, player badges, trivia timers), print production rules, and the hexagonal tile motif grammar. All palette, type, spacing, chamfer, and elevation rules not restated here are inherited unchanged from `saturday-core/Design.md`. Read that file first.

Solutions is the catch-all vertical, currently expressed through Saturday Night Games (a trivia/game hub, in development) and its printed companions (loyalty cards, board/card games). Neon Yellow (`#FFE600`) is its sole chromatic signal — a genuine spotlight color, used exactly the way a single overhead lamp lights a game table: score chips, active-player states, timer urgency, the one CTA per screen. This is also the only vertical with hard print-production requirements, since Solutions produces physical loyalty cards and game components alongside its digital surface. The game motif grammar is a hexagonal tile system — not a circuit board, not a data grid — echoing dice, poker chips, and card-back geometry.

## Tokens — Colors

| Name | Value | Token | Role |
|------|-------|-------|------|
| Neon Yellow | `#FFE600` | `--accent-solutions` | The vertical's sole chromatic signal — score chips, active-player state, timer urgency, primary CTA, print mark |
| Neon Yellow Wash | `rgba(255,230,0,0.12)` | `--accent-solutions-wash` | Whisper-faint active-row/selected-player background wash — the only tinted background permitted |
| Neon Yellow Glow | `rgba(255,230,0,0.4)` | `--accent-solutions-glow` | Box-shadow glow for hover/focus states and timer-urgency pulse |

**Print note:** `#FFE600` converts to approximately **C0 M6 Y97 K0** in CMYK. Always proof against the actual print vendor's profile before production — on-screen neon yellow and printed yellow will never match exactly, and this vertical's yellow leans warmer once printed than it appears on an emissive dark-mode screen.

All other tokens (canvas, surface, text, hairline, typefaces, spacing, chamfer, radii) are inherited directly from `saturday-core`.

## Tokens — Typography

No new typefaces. Game titles and section headings use Space Grotesk. Score numerals, player tags, and timer digits use Elms Sans — set tabular where the font supports it, since score displays must not visually jitter as digits change. Trivia questions and rules text use Inter at 16px with generous leading for readability at a glance during live play. Instrument Serif italic is reserved for a single flourish per screen, typically a category header or a round's theme line.

### Type Scale

No new scale steps. Timer digits and score numerals may scale up to `--text-display` (48px) in Space Grotesk for high-visibility game-night display moments (e.g. a shared-screen leaderboard), while remaining Elms Sans at the smaller `--text-heading-sm` (24px) scale in compact player-facing UI.

## Tokens — Spacing & Shapes

**Density:** moderate on setup/menu screens; sparse and high-contrast during live play (a game night screen should be readable from across a room).

### Hexagonal Tile Grammar

The Solutions motif is a flat-top hexagon used as the base shape for game tiles, category selectors, and print-mark geometry. Hex tile proportions: width : height ratio of 1 : 0.866 (standard flat-top hex). Tiles tessellate edge-to-edge with a 1px hairline seam, never a gap — the tile field should read as a single connected board, not scattered chips. No circuit-trace lines connect tiles; adjacency itself carries the relationship.

## Components

### Score Chip
**Role:** Compact display of a player's current score

Pill shape (999px radius) for in-UI score chips, Elms Sans weight 700 tabular numerals, `--color-bg-surface` fill, 1px hairline border, Neon Yellow text when the chip represents the current leader; `--color-text-main` otherwise. Padding 6px 16px. Only ever one leader-highlighted chip per screen — ties render both in `--color-text-main` until broken, avoiding a two-yellow-chip conflict.

### Player Badge
**Role:** Identifies a player/team, attached to their score chip or turn indicator

Small chamfered tag (`--chamfer-compact` at half-size, ~4px cut) or simple pill, Elms Sans 11px uppercase weight 600, `--color-text-main` on `--color-bg-surface`, 1px hairline border. Active-turn state: border resolves to Neon Yellow, plus a subtle glow (`--accent-solutions-glow`). Inactive players stay hairline-only — the glow is the sole signal of whose turn it is.

### Trivia Timer
**Role:** Countdown display during a live question

A circular or hex-capped progress ring, `--hairline` track, Neon Yellow fill representing time remaining, draining clockwise. Numeral center display in Space Grotesk 700, tabular, scaling from `--text-heading` up to `--text-display` depending on screen role (host display vs. player device). Below 25% time remaining, the ring and numeral may pulse gently (opacity 100%→70%→100%, 600ms ease) as an urgency signal — the system's only sanctioned "blinking" UI, and it must stop the instant time expires rather than continuing indefinitely.

### Hex Tile
**Role:** Base unit for category boards, game menus, and tessellated print/digital motifs

Flat-top hexagon via `clip-path: polygon(...)`, `--color-bg-surface` or `--color-bg-base` fill, 1px hairline edge. Selected/active state: Neon Yellow edge, optional low-opacity Neon Yellow fill wash (`--accent-solutions-wash`) — never a solid yellow fill, which would break the single-signal discipline at tile scale. Tiles may contain a category label (Elms Sans uppercase) or an icon.

### Loyalty Card (print)
**Role:** Physical print component — the vertical's hardest production constraint

Standard card format, 1-color monochrome mark (Neon Yellow ink, or black ink on yellow stock as the reversed variant) with a **15mm minimum** clear-space mark size — below that, the S-mark geometry loses legibility when printed. No gradients permitted in the mono print variant; the digital emissive treatment does not translate to ink. CMYK build value: **C0 M6 Y97 K0** as a starting proof value — confirm against the print vendor's actual swatch book before final approval, since coated vs. uncoated stock shifts yellow saturation noticeably.

### Primary CTA (game-night context)
**Role:** The one high-stakes action per screen — "Start Round", "Lock In Answer", "Reveal"

Standard `.btn--primary` per core rules, accent bound to Neon Yellow, dark text (`#0B0C10`) for contrast against the bright fill. Given game-night screens are often viewed from a distance, this CTA may scale up to a larger touch target (min 48px height) beyond the core button spec's default padding.

## Do's and Don'ts

### Do
- Use Neon Yellow (`#FFE600`) as the only chromatic accent on any Solutions-branded surface, digital or print
- Use the hexagonal flat-top tile as the vertical's structural motif for boards, category selectors, and print marks
- Reserve the timer-urgency pulse as the system's only sanctioned blinking/flashing UI — stop it immediately at zero
- Proof the print CMYK build (`C0 M6 Y97 K0`) against the actual vendor swatch book before approving any print run
- Respect the 15mm minimum mark size on the loyalty card — test legibility at that size before finalizing print art
- Keep only one leader-highlighted score chip active per screen; ties stay neutral until broken

### Don't
- Do not use circuit-board orthogonal routing, crosshair reticles, or data-grid decoration anywhere in this vertical — the game motif is hexagonal tiles and card/chip geometry, not telemetry
- Do not fill hex tiles solid Neon Yellow at rest — use edge color + low-opacity wash only; a field of solid yellow tiles reads as wallpaper, which breaks the system's core discipline
- Do not use gradients in the 1-color mono print variant of the loyalty card or any print-only asset
- Do not let more than one element pulse/blink on screen simultaneously — the timer-urgency pulse is a singular signal
- Do not introduce a second accent (no orange, no red "danger" state) for timer urgency — Neon Yellow's pulse animation carries the urgency, not a color change
- Do not assume on-screen yellow will match printed yellow — always proof physical samples

## Surfaces

| Level | Name | Value | Purpose |
|-------|------|-------|---------|
| 0 | Void | `#0B0C10` | Game menu background, live-play backdrop |
| 1 | Titanium Panel | `#1F2833` | Score chips, hex tiles at rest, player badges |
| Accent | Neon Signal | `#FFE600` | Leader score chip, active-turn badge, timer fill, primary CTA, print mark |

## Elevation

Identical to `saturday-core`: hairlines and chamfer cuts carry structure at rest. The trivia timer's urgency pulse is the vertical's one animated elevation-adjacent effect — an opacity pulse, not a shadow. Active player badges and the leader score chip may show the standard `--accent-solutions-glow` box-shadow, consistent with core's "glow on focused interactive signals only" rule.

## Imagery

The hexagonal tile is the primary non-photographic visual motif — used for category boards, transitions, and print-pattern backgrounds (a sparse tessellated field at low opacity, never dense enough to read as a data wall). Where photography appears (game-night event photos, prize imagery), it sits in a hex-clipped or hairline-framed container per core imagery rules. Iconography (dice, cards, chips) uses 1–1.5px line strokes, Neon Yellow only for the active/selected state.

## Layout

Digital game screens use the core 1280px max-width layout for menus/setup, expanding to full-bleed for live-play/shared-screen moments where visibility from a distance matters. Print layouts (loyalty card, box art) follow standard print-production grids and bleed/safe-zone conventions per the vendor's spec — outside the scope of the core 8px digital grid, but should still reflect the hex-tile and hairline visual language wherever the format allows.

## Agent Prompt Guide

### Quick Color Reference
- background: `#0B0C10` (canvas), `#1F2833` (score chips, hex tiles, badges)
- text: `#F0F3F4` (primary), `#8A9199` (muted)
- border: `rgba(192,192,192,0.18)` (hairline)
- accent: `#FFE600` (Neon Yellow — the ONLY chromatic color on this vertical)
- accent glow: `rgba(255,230,0,0.4)`
- accent wash (rare): `rgba(255,230,0,0.12)`
- print CMYK: `C0 M6 Y97 K0` (proof against vendor swatch before approval)

### Quick Type Reference
- Game titles/headings: Space Grotesk 700, uppercase, 0.12–0.15em tracking
- Score/timer numerals: Space Grotesk or Elms Sans 700, tabular figures
- Player badges/labels: Elms Sans 600, uppercase, 10–13px
- Trivia/rules body: Inter 400, 16px, generous leading

### Quick Shape Reference
- hex tiles: flat-top hexagon, 1 : 0.866 width:height, `clip-path` polygon
- score chips/badges: 999px pill (or ~4px chamfer for tag-style badges)
- print mark minimum size: 15mm
- buttons: 6px radius, min 48px touch target in game-night contexts

### Example Component Prompts

1. **Score Chip**: pill (999px), `#1F2833` fill, 1px hairline border, Elms Sans 700 tabular numerals, padding 6px 16px; leader state: `#FFE600` text; non-leader/tied: `#F0F3F4` text. Only one leader-colored chip visible at a time.

2. **Trivia Timer**: circular progress ring, `rgba(192,192,192,0.18)` track, `#FFE600` fill draining clockwise, center numeral in Space Grotesk 700 tabular (scales 32–48px by context); below 25% remaining, ring + numeral pulse opacity 100%→70%→100% over 600ms, stopping immediately at zero.

3. **Hex Tile (category selector)**: flat-top hexagon via `clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)`, `#1F2833` fill, 1px hairline edge, Elms Sans uppercase category label centered; selected state: `#FFE600` edge + `rgba(255,230,0,0.12)` fill wash, no solid yellow fill.

4. **Player Badge (active turn)**: small tag, ~4px chamfer cut, `#1F2833` fill, Elms Sans 11px uppercase weight 600, `#F0F3F4` text, 1px hairline border; active state: border `#FFE600` + soft glow `0 0 12px rgba(255,230,0,0.4)`.

5. **Primary CTA (game-night)**: 6px radius, `#FFE600` fill, `#0B0C10` text, Elms Sans 13px uppercase weight 600, min-height 48px, padding 14px 28px, soft glow on hover.

6. **Loyalty Card (print, mono)**: 1-color Neon Yellow ink (or black-on-yellow reversed) S-mark, no gradients, minimum 15mm mark height with clear space equal to 25% of mark height on all sides; CMYK build C0 M6 Y97 K0, proof against vendor swatch before final approval.

## Similar Brands

- **Codenames / modern board-game packaging** — Bold single-accent print + digital cohesion, hex/tile-based motifs, high legibility at a glance
- **Jackbox Games** — Dark shared-screen game UI with one saturated signal color and large legible score/timer displays
- **Bicycle playing cards (modern editions)** — Restrained print production discipline, single spot-color mark, precise minimum-size legibility rules
- **Kahoot (dark-mode adjacent concepts)** — Timer-urgency and score-chip UI patterns built around one high-visibility accent color

## Quick Start

### CSS Custom Properties

```css
:root {
  /* Solutions accent layer — extends saturday-core/Variables.css */
  --accent-solutions: #FFE600;
  --accent-solutions-wash: rgba(255, 230, 0, 0.12);
  --accent-solutions-glow: rgba(255, 230, 0, 0.4);

  /* Set the active accent scope for this vertical */
  --accent-current: var(--accent-solutions);

  /* Hex tile proportions (flat-top) */
  --hex-ratio: 0.866;

  /* Print production reference (do not use in digital CSS — proof-only note) */
  --print-cmyk-solutions: "C0 M6 Y97 K0";
  --print-min-mark-mm: 15mm;
}
```

### Tailwind v4

```css
@theme {
  /* Solutions accent layer — extends saturday-core/Theme.css @theme block */
  --color-accent-solutions: #FFE600;
  --color-accent-solutions-wash: rgba(255, 230, 0, 0.12);
  --color-accent-solutions-glow: rgba(255, 230, 0, 0.4);
}
```
