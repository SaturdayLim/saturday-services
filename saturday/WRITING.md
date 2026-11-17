# Saturday Signature: writing voice (v2.0.0)

Status: sections 1 to 3 were **APPROVED by owner, 26 Oct 2026** and apply to everything in the kit, work and Saturday Services alike. Section 4 (house voices) is a **DRAFT for owner review** (27 Oct 2026). Work notation (F/C periods, 9Lc, Código names, dashboard samples) moved to `WORK.md` in v2.0.0, unchanged. When a rule and a sample disagree, the rule wins. To change the voice, edit a sample, update the matching rule, and bump the version.

## 1. Voice

1. **Plain and direct.** Say what it is or what to do. Short sentences.
2. **Numbers carry the point.** Lead with the figure, then the comparison, then the base in brackets.
3. **Brackets hold the qualifier.** Units, periods, bases, scope and formats go in round brackets: `(9Lc)`, `(F27)`, `(30,000)`, `(Employees Only)`, `(e.g. 48000)`.
4. **Shorthand is welcome when it is standard.** Use `=`, `+`, `<`, `>=` and the abbreviations in `WORK.md` section 1 (work pages) or the signature units in section 4 (houses). Spell out anything not in those lists.
5. **No verbal contractions.** Write "does not", "unable to", not "doesn't", "didn't". (Date forms like `Oct'26` are not contractions.)
6. **Honest about gaps.** Say what is not tested, partial or estimated.
7. **No filler.** No "please", "simply", "successfully", "just", no exclamation marks, no middle-dot chains.

## 2. Case

| Text | Case | Example |
|---|---|---|
| Page titles and subtitles | Title Case | `Stock Projection (F27)`, `World Markets` |
| Card and section titles | Sentence case | `Top markets (F26)`, `Volume by quarter` |
| Captions above values, table headers | UPPERCASE, qualifier in brackets keeps its own case | `STOCK COVER (months)`, `VOLUME (9Lc)` |
| Buttons | Sentence case | `Export report`, `Create event` |
| Body, tooltips, errors, empty states, status | Sentence case | `PIN does not match this event.` |
| Roles and named things | Capitalised | `Organiser`, `Judge`, `Events tab`, `"Now pouring" toggle` |

In HTML, wrap the bracketed qualifier of a caption or table header in `<span class="sat-qual">` so the CSS does not uppercase it: `<span class="sat-caption">Stock cover <span class="sat-qual">(months)</span></span>`. Do the same for a lowercase `v` in a table header: `<th><span class="sat-qual">v</span> F25</th>`.


## 3. Pattern rules

Applies to every page. Work-only patterns (deltas with periods, finding-first chart captions with F/C quarters, source lines) are in `WORK.md` section 0b; a Saturday Services page that shows data uses the same shapes with its own units.

- **Caption above a value:** UPPERCASE, 2 or 3 words, unit or basis in brackets. The period lives in the page subtitle, not the caption. The number below carries no unit of its own.
- **Caveats go in an info button (tip), not in a second caption line.**
- **Tooltips:** as many sentences or short paragraphs as needed for the reader to see how the figure is calculated without leaving the page, as long as the tip fits on one screen without scrolling. Formulas are fine: `Value = Invoiced revenue (USD) at the spot FX rate.`
- **Buttons:** verb first. Generated buttons say what you get (`Show 35 markets`). Fixed buttons stay short (`Show all`) and rely on their placement for scope.
- **Errors:** what is wrong, then what to do, with a format example in brackets.
- **Confirmations:** say where the result went (`Data Saved in local cache`, `Report exported to Downloads`).
- **Instructions:** heading with time in brackets, then numbered steps, one action each, even for two steps. Format hints and placeholders in brackets.
- **Summaries:** `Done: … Not yet verified: … Next: …`, or `Keep.` / `Changed.` followed by the reason.


## 4. House voices (DRAFT for owner review)

Every house keeps sections 1 to 3. Each one then turns a few dials. Proposed changes to approved rules are marked **(change)** and need owner sign-off before they ship.

| Dial | Saturday Services (parent) | Saturday Shakes | Saturday Solutions | M&N Collective |
|---|---|---|---|---|
| Sounds like | A trusted host who runs a tight weekend | The bartender who explains why | The friend who builds the tool and the game | Two people keeping a shared promise |
| Warmth (1-5) | 3 | 4 | 3 | 5 |
| Playfulness (1-5) | 2 | 3 | 4 | 2 |
| Detail | Outcomes first | Method and ratios | Specs and rules | Reassurance, then numbers |
| Contractions | Not allowed | **(change)** Allowed in menus, social and event copy | Not allowed in product UI; allowed in game flavour text | **(change)** Allowed in wedding guest copy |
| Exclamation marks | None | None | **(change)** One per screen, for game wins only (`Round won!`) | None |
| Signature units | Hours, sessions | ml, oz, ABV %, ratios `2:1:1`, dilution % | Dice notation `2d6+3`, players `3-6`, minutes per round | Currency `$1,240.00`, dates `Sat 14 Nov 2026` |

### Samples (draft)

- **Shakes, menu line:** `Saturday Sour. Rye, lemon, demerara, egg white (2:1:0.75). 16% ABV after dilution.`
- **Shakes, workshop button:** `Book a class (2 hours)`
- **Shakes, responsible line (every alcohol page footer):** `For guests of legal drinking age. Drink responsibly.`
- **Solutions, trivia host status:** `Round 3 of 6. 4 teams answered, 2 waiting.`
- **Solutions, card deck error:** `Deck has 51 cards. Add the missing card or reset to a standard 52.`
- **Solutions, D&D world page subtitle:** `Vaela, Third Age (world notes for 5e play)`
- **M&N, budget empty state:** heading `No spending yet this month` / body `Add your first expense to see where the month is going.` / button `Add expense`
- **M&N, RSVP confirmation:** `RSVP saved. We'll see you on Sat 14 Nov 2026.`
- **Parent, proposal footer:** `Saturday Services. Consulting, events and digital tools, made with care.`

### Naming

- New Saturday houses follow `Saturday + one word starting with S` (Shakes, Solutions; next could be Sessions, Studio, Stories).
- M&N Collective is a **named exception**: a personal house with its own name, endorsed by the parent line (`a Saturday Services house`) rather than by the Saturday prefix.
- Products inside a house use a plain name plus the house: `V-Deck by Saturday Solutions`, `Pour Notes by Saturday Shakes`.
