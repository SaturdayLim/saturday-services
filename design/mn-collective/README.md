# M&N Collective — Pointer, Not a Design System

This folder intentionally holds no `Design.md`, `Tokens.json`, `Variables.css`, or `Theme.css`. M&N Collective is a **guest brand** inside the Saturday Services hub, and it keeps its own canonical identity. It is never restyled, never re-derived, and never forked into a Saturday-flavored variant.

**Canonical source:** `M&N Collective/design/design-direction.md` (in the sibling `M&N Collective` project folder). That file is the single source of truth for every M&N-branded surface — the hub's M&N panel, and every partnership app (Maison, Ledger, Slate, and whatever comes next). If you are building or touching anything M&N-branded, read that file directly. Do not copy its values into this repo, and do not let this README's summary substitute for it — treat the numbers below as a quick-reference only, and defer to the source doc if they ever drift out of sync.

## Why M&N is excluded from the Saturday token system

Saturday Services' core discipline (obsidian canvas, chamfered corners, Space Grotesk/Elms Sans/Inter, per-vertical neon/copper/blue accents) is a deliberate *dark, energetic-but-classy* material world. M&N Collective is the opposite temperament by design: a warm, alabaster "quiet luxury" system built around restraint, serif editorial type, and a single forest-green signal. The PRD is explicit that Saturday tokens win conflicts everywhere **except** M&N — M&N's system is canonical on its own terms and is only ever *consumed*, never restyled, by the hub.

## M&N's non-negotiables (summary only — verify against the source doc)

- **Canvas:** Alabaster Linen `#FDFBF7` — warm off-white, never pure white, never dark. This is the M&N panel's background inside the otherwise-dark hub.
- **Single signal:** Forest Green `#2C4C38` is the only chromatic, fillable color in the entire M&N system — primary actions, active links, key icon accents. Dusty Lilac `#C8B9CE` exists as a rare, non-interactive soft indicator, used at most once or twice per screen.
- **Structure:** Hairlines (`rgba(74,60,49,0.2)`, 0.5–1px) replace card chrome entirely — no resting shadows except a whisper shadow (`0 5px 25px rgba(26,26,26,0.06)`) reserved for hover states and floating elements.
- **Shape:** The two-shape rule — buttons/badges/pills at 999px radius, cards/containers/inputs at 0–4px (near-sharp). Nothing in between; no 8–12px Saturday-style chamfers here.
- **Whitespace:** A hard minimum of 40% of any frame stays empty. This is the first thing to check in review.
- **Composition:** Asymmetric, editorial — offset headlines, uneven columns, hanging captions.

## Font override — recorded 2026-07-02 (Michael, owner sign-off)

The M&N canonical doc's original typefaces are superseded as of this date. This override is recorded here for hub-build reference; the authoritative record lives in the source doc's own changelog.

| Role | Was | Now |
|---|---|---|
| Display serif | Cormorant Garamond | **Playfair Display** (400, 500; italic 400) |
| System sans | Manrope | **Lato** (400, 700, 900 — legacy weight 500 renders as 400, legacy 600 renders as 700) |
| Signature script | Pinyon Script | **Unchanged** — Pinyon Script (400), single-word flourishes only |

All other M&N typographic rules (type scale, tracking, the eyebrow pattern) carry over unchanged onto the new families — only the font-family declarations shift.

## How the hub renders the M&N panel

The Services-vertical deck (see `../services/Design.md`, "Group Panel (M&N passthrough)") treats the M&N entry in `links.json` as a **light plate placed on the dark stage**: when the deck scrolls to the M&N panel, that single viewport switches to M&N's own tokens — Alabaster Linen background, Obsidian text, Forest Green links, Playfair Display title, hairline structure — while every other panel around it stays on Saturday's obsidian/chamfer/neon system. No Saturday accent color, chamfer cut, or dark fill is applied to this panel. The effect should read as if a page from M&N's own book was physically set down on the hub's dark table — a deliberate, visible seam, not a blend.

Implementation note for the hub build: scope M&N's CSS custom properties (`--color-alabaster-linen`, `--color-forest`, `--font-display: 'Playfair Display'`, etc., per the canonical doc's Quick Start block) to the M&N panel's container only, so they never leak into sibling Saturday panels, and so Saturday's `--color-bg-base`/`--accent-*` tokens never leak into the M&N panel.

## What to do if you need to build an M&N-branded app

Copy the pattern used by Maison, Ledger, and Slate: read `M&N Collective/design/design-direction.md` directly, apply its tokens as-is (with the 2026-07-02 font override above), and do not introduce any Saturday Services token, component, or motif. If a future M&N app needs something this system doesn't cover, extend the canonical doc itself — do not patch around it from inside the Saturday design suite.
