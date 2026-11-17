# Saturday Services: brand handbook (v2.0.0)

Status: **DRAFT for owner review** (27 Oct 2026). Tokens, skins and contrast are built and passing; marks are v0 sketches; house voices are proposals (see `WRITING.md` section 4).

This kit now serves two tracks that share one engine and nothing else.

| | Saturday Services | Work |
|---|---|---|
| What | Your own brand family: consulting, events, products, personal apps | Employer and portfolio work: dashboards, reports, staff events |
| Skins | `saturday` (parent), `shakes`, `solutions`, `mn` | `desk`, `codigo` |
| Rules | This file + `SIGNATURE.md` + `WRITING.md` | `WORK.md` + `SIGNATURE.md` + `WRITING.md` sections 1 to 3 |
| Marks | Saturday sun, shaker, die, linked rings | Employer or project wordmark only |
| Notation | House units (ml, ABV, 2d6, $) | F/C periods, 9Lc, `v F25 (base)` deltas |
| Never | F26Q3, 9Lc or Código on a house page | A house mark, house font or house voice on a work page |

The shared engine is the part people will feel as "the same hand": glass surfaces, the 4px grid, the component set, the caption pattern, Geist for UI text, Geist Mono for figures, the motion timings, the contrast check and the phone rules.

## 1. Brand architecture

**Endorsed houses.** Saturday Services is the parent. Each house has its own name, colour, display face and mark, and carries the parent as an endorsement line set in Instrument Serif italic: *a Saturday Services house*.

```
Saturday Services (parent: proposals, invoices, website hub, consulting)
├── Saturday Shakes       bartending, premade cocktails, drinks research and education, alcohol services
├── Saturday Solutions    tech solutions and games
│   ├── Workbench         forensic Excel, automation, AI-assisted analysis
│   ├── Table             card decks (V-Deck), poker cards, printed tabletop games, trivia hosting software
│   └── Worlds            D&D universe creation (Vaela)
└── M&N Collective        finance tracking, wedding apps (named exception: no Saturday prefix)
```

- Solutions lines share the Solutions skin. A line may shift the accent for its own pages (for example Worlds uses the Vaela material system for in-world content), but its product chrome stays Solutions.
- **In-world vs out-of-world rule.** A game world or a client brand owns its *content*; the house owns the *chrome* around it (navigation, settings, pricing, credits). Vaela pages wear the Vaela Material System inside a Solutions frame.
- **Client work.** When Solutions builds for a client, the client brand leads and the footer carries `Built by Saturday Solutions` in the endorsement style.
- **Forensic Excel.** Reposition as *Workbench*: spreadsheet rescue, model audits and AI-assisted analysis. The craft is still valuable when it checks what an AI produced.

## 2. Signature constants (never change per house)

1. Glass recipe, levels and limits (`SIGNATURE.md` section 2).
2. 4px spacing grid and the spacing steps.
3. Geist for UI and body text, Geist Mono for figures, IDs and codes.
4. Caption pattern: UPPERCASE, 2 or 3 words, qualifier in brackets keeps its case.
5. Endorsement line: Instrument Serif italic, muted colour.
6. Mark construction: one stroke weight (1.75px in UI), round caps, **two breaks on the S diagonal** (upper right and lower left). Every house mark follows this.
7. Motion timings (120 / 200 / 320ms) and ease.
8. Touch rules: 44px targets, bottom bar, bottom sheets, nothing hover-only.
9. Contrast: 4.5:1 text, 3:1 marks, on every surface, both themes. `node tools/check-contrast.js` must pass.

## 3. House variables (set per skin in `tokens/tokens.json`)

| | Saturday Services | Saturday Shakes | Saturday Solutions | M&N Collective |
|---|---|---|---|---|
| `data-skin` | `saturday` (default) | `shakes` | `solutions` | `mn` |
| Idea | Weekend calm, considered | Back bar after dark | Game night workshop | Two people, one plan |
| Display face | Instrument Serif 400 | Bodoni Moda 500 | Bricolage Grotesque 650 | Cormorant Garamond 500 |
| Accent (light / dark) | Teal `#1A7A74` / `#4FC1B8` | Vermouth `#8E2F3C` / Rosé `#E8939C` | Cobalt `#2B4FC7` / `#8EA6FF` | Eucalyptus `#3F5E4B` / `#9CC5A8` |
| Mesh | Teal, sky, mint | Amber, campari, citrus peel | Cobalt, butter, sky | Sage, blush, lavender |
| Mark colour | Teal-gold | Shaker gold `#8C7440` / `#CDB98A` | Cobalt | Rosewood `#9A5A66` / `#E3A6B0` |
| Display size | 44 to 72px | 48 to 84px (menus want drama) | 40 to 64px | 48 to 80px |
| Card radius | 22px | 24px | 16px (tighter, tool-like) | 26px (softest) |
| Mark | Saturday sun (draft) | Shaker (final) | Die showing three (draft) | Linked rings (draft) |

Change only these through `tokens/tokens.json`, then run `node tools/build-tokens.js` and `node tools/check-contrast.js`.

**Shakes and Código.** Both are alcohol-adjacent. Shakes keeps gold for its mark only and uses vermouth red as its accent, so a Shakes page never reads as a Código page.

## 4. Calibration: iPhone 16 Pro Max first, desktop second

| | Value | What to do with it |
|---|---|---|
| Viewport | 440 × 956 pt (1320 × 2868 px at 3x) | Draw phone comps at 440 wide. Also check 375 (smallest supported) and 393 (iPhone 16 / 16 Pro). |
| Top safe area | 62pt (Dynamic Island) | Sticky headers use `top: env(safe-area-inset-top)`. Nothing tappable in the top 62pt. |
| Bottom safe area | 34pt (home indicator) | `.sat-bottombar` sits at `12px + env(safe-area-inset-bottom)`. |
| Landscape sides | 62pt | Side gutters use `max(16px, env(safe-area-inset-left))`. |
| Thumb zone | Bottom third (about 320pt) | Primary action, tab bar and sheet handles live here. |
| Body text | 16px minimum on touch | Stops iOS zooming into inputs. Already in the tokens. |
| Home screen | `apple-touch-icon` 180px, `theme-color` per skin and mode | `saturday.js` already updates `theme-color` from `--sat-theme-color`. |
| Desktop | 1280 comp, 1200 max content | Same components, mouse targets, three-way theme toggle. |

Required in every page `<head>`: `<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">`.

## 5. Components you have, and the ones still missing

**Have (v1 engine):** glass levels, header with mark, buttons, switch, segmented control, chips, theme toggle, inputs, info tips, table, badge, KPI tile, sheet, bottom bar, swatch, entrance motion, print styles, contrast checker, Tailwind presets, one-file inliner.

**Added in v2.0.0:** four house skins and a work skin, per-house type sizes and radii, display weight per skin, endorsement line and lockup classes, three draft house marks, house font loader, `skins-all.css`, device calibration tokens, this handbook, `WORK.md`.

**Missing, by priority.** P1 = before the first public house launch. P2 = before a second product ships. P3 = when it pays for itself.

### Identity
| Item | Priority |
|---|---|
| Refine the three draft marks with a designer; keep the two-break construction | P1 |
| Lockup files per house: horizontal, stacked, mark only, with and without endorsement | P1 |
| Clear space and minimum size per mark (shaker rule exists: 24px, clear space = mark width) | P1 |
| App icon set per house: iOS 1024 master with light, dark and tinted variants, PWA 192 and 512, favicon SVG and 32px | P1 |
| Social avatars (circle-safe) and share image template 1200 × 630 per house | P1 |
| Named swatches (Back Bar, Vermouth, Felt, Eucalyptus) for print and conversation | P3 |

### Product UI (phone first)
| Item | Priority |
|---|---|
| Tab bar (bottom, up to 5 items) and large-title navigation header | P1 |
| Toast, loading skeleton and progress components | P1 |
| Empty, error and offline states written per house | P1 |
| Chart palette per house: 5 categorical colours plus a sequential ramp (today charts only get the accent) | P1 |
| Stepper (guest count, ml), currency input, date picker styling | P2 |
| Swipe-to-act list rows (transactions, guest list) | P2 |
| Onboarding (3 screens max), sign-in, settings, about and credits screens | P2 |
| Pricing and package cards, booking form | P2 |
| Launch screen per house | P2 |
| Haptics and sound guidance for native wrappers | P3 |

### House modules
| House | Item | Priority |
|---|---|---|
| Shakes | Recipe card spec (ml and oz, method, glass, garnish, ABV after dilution) | P1 |
| Shakes | Age gate and responsible-drinking footer | P1 |
| Shakes | Cocktail menu: A5 print and QR phone menu | P1 |
| Shakes | Batch and dilution calculator, class booking page, research note template | P2 |
| Solutions | Card templates: poker 63 × 88mm, bridge 57 × 89mm, tarot 70 × 120mm, 3mm bleed, 3mm safe area, card back pattern | P1 |
| Solutions | Trivia host kit: 16:9 projector screen, player phone view, live scoreboard | P1 |
| Solutions | Rulebook layout, tuck box and game box dielines | P2 |
| Solutions | Workbench deliverable: Excel cover sheet, cell styles (input, formula, output, check), audit report | P2 |
| Solutions | Worlds: compendium page, stat block, map legend, handout (inside the in-world rule) | P2 |
| M&N | Personal finance views: monthly budget, transaction list, savings goal, shared accounts. These use M&N styling, not Desk | P1 |
| M&N | Wedding suite: save the date, invitation, RSVP flow, guest list, seating chart, day-of timeline | P1 |
| M&N | Privacy note for finance data (what is stored, where, who can see it) | P1 |

### Print and business
| Item | Priority |
|---|---|
| Email signature (HTML) per house | P1 |
| Proposal, quote and invoice templates (parent brand, house endorsement) | P1 |
| Business cards 90 × 54mm per house | P2 |
| Slide template 16:9 per house (talks, workshops, trivia) | P2 |
| Print colour values (CMYK and nearest Pantone) per house | P2 |
| Letterhead A4 | P3 |

### Governance
| Item | Priority |
|---|---|
| Trademark search for Saturday Services, Saturday Shakes, Saturday Solutions, M&N Collective | P1 |
| D&D wording: say "5e compatible" and follow the SRD 5.1 (CC BY 4.0) attribution; never use the Dungeons & Dragons trademark as a product name | P1 |
| Alcohol marketing check for each market you sell in (age gate, no appeal to minors, local advertising rules) | P1 |
| Bundle house fonts locally (today `css/fonts-houses.css` loads them from Google Fonts) | P2 |
| Icon set at the mark's stroke weight (1.75px, round caps) | P2 |
| Photography and illustration direction per house | P2 |
| Motion signature per house: Shakes *pour* (slow fill), Solutions *snap* (spring), M&N *drift* (slow fade) | P2 |
| Tokens export for Figma (Tokens Studio JSON) | P2 |
| Asset folder and file naming convention, licence register (fonts, icons, photos) | P2 |
| Domains, social handles and email addresses per house | P2 |

## 6. Adding a new house (checklist)

1. Name it `Saturday + S-word`, or record why it is a named exception.
2. Write its idea in four words and its voice dials (`WRITING.md` section 4).
3. Copy a house block in `tokens/tokens.json`. Pick a display face (OFL, Google Fonts), an accent that differs from every other skin in hue, a mesh, and size and radius overrides.
4. Run `node tools/build-tokens.js` then `node tools/check-contrast.js`. It must pass.
5. Draw the mark with one stroke and two breaks on the S diagonal.
6. Add a row to section 3 above and a line to the README changelog. Bump the minor version.
