# 3D Pipeline — 2D SVG to Animated 3D Centerpiece

Repeatable recipe for turning any future Saturday mark into the extruded-metal
hero used on the hub. Written for a coding agent. Parameter values below are
the standard, not suggestions — reproduce them exactly unless told otherwise.

## 1. Purpose

Input: a flat 2D SVG logo (fills only, no stroke geometry). Output: an
animated 3D metal extrusion rendered full-viewport as the hub's hero
centerpiece, with idle rotation, cursor parallax, accent rim lighting, a glow
backdrop, and a particle field. It runs client-side, lazily, in
`index.html`'s hero section — entry point `js/scene.js`, invoked from
`js/main.js` after guard checks pass (§6). No build step, no offline render:
the browser extrudes the SVG every page load via Three.js `SVGLoader` +
`ExtrudeGeometry`.

## 2. SVG authoring rules

`SVGLoader.createShapes()` and `ExtrudeGeometry` operate on 2D path geometry
only — no concept of stroke width, blend modes, or CSS rendering tricks.
Anything that isn't a filled, closed path is silently wrong or dropped.

- **Closed filled paths only, no strokes.** `SVGLoader` reads `fill`, not
  `stroke` — open stroked lines produce no extrudable shape. Outline any
  line-weight glyph to a filled path before it reaches this pipeline.
- **`fill-rule="evenodd"` for counters/holes.** An enclosed negative space
  (bowl, counter, ring) needs the hole as a second sub-path inside the same
  `<path d="...">`, wound opposite the outer path, with `fill-rule="evenodd"`
  set. Without it, `ExtrudeGeometry` fills the hole solid and the counter
  disappears in 3D even though it looked fine flat. The current Meridian S
  (`services-mono.svg`) sidesteps this with three non-overlapping filled
  shapes (half-rings + seam patch) instead of a true evenodd hole — valid,
  but evenodd is the right tool for a genuine enclosed counter ("O", "A").
- **Single `viewBox="0 0 512 512"`.** Keeps scale/weight comparable across
  the family and keeps `loadMark()`'s scale-to-fit math (§3) predictable.
- **No gradients, filters, or masks.** `SVGLoader` extracts path fill
  *color*, not paint servers — `fill="url(#gradient)"` resolves to nothing
  usable; the 3D material (§4) supplies color regardless. Filters/masks
  aren't evaluated at all; the shape becomes its raw unfiltered outline.
- **No `<text>` elements.** Not paths. Convert lettering to outlines first.
- **Minimum feature width ~8 units** (on the 512×512 canvas). Below that,
  the 4-unit bevel (`bevelSize: 4`, §3) consumes the whole feature — a thin
  serif or hairline bevels into a rounded blob and loses definition.
- **Use the `-mono.svg` variant as the extrusion source.** Every mark ships
  a full-color version (`<mark>.svg`, used flat in deck panels) and a
  `<mark>-mono.svg` where every path is `fill="currentColor"`. `loadMark()`
  loads the mono file — single-fill geometry keeps `createShapes()`
  unambiguous, and the 3D material carries all the color.

## 3. The pipeline, step by step

Exactly what `loadMark()` in `js/scene.js` does (lines 80–111). Reproduce it
verbatim for a new mark; only the source URL and the rim-light hex change.

1. **`SVGLoader().loadAsync(url)`** — fetches/parses the SVG into
   `svg.paths` (one entry per `<path>`).
2. **`SVGLoader.createShapes(path)` per path** — converts each SVG path
   (which may itself hold multiple sub-paths/holes) into one or more
   `THREE.Shape` objects: `for (const path of svg.paths) { for (const shape
   of SVGLoader.createShapes(path)) { ... } }`.
3. **`ExtrudeGeometry` with the standard Saturday parameters** — same
   profile for every mark so the family reads as one material system:
   ```js
   new THREE.ExtrudeGeometry(shape, {
     depth: 44, bevelEnabled: true,
     bevelThickness: 6, bevelSize: 4, bevelSegments: 3, curveSegments: 24,
   });
   ```
   `depth: 44` = slab thickness. `bevelThickness: 6` / `bevelSize: 4` /
   `bevelSegments: 3` produce the chamfered edge that catches rim light
   (§4). `curveSegments: 24` = tessellation density on curved segments.
4. **Mesh + material array per shape** — `THREE.Mesh(geo, [material,
   edgeMaterial])`. `ExtrudeGeometry` assigns material group 0 to
   front/back faces and group 1 to extruded side walls, so this array puts
   the face material on flat faces and the edge material on the bevel/wall
   (values in §4). All meshes join one `THREE.Group`.
5. **Y-flip.** SVG space is Y-down; Three.js world space is Y-up.
   `group.scale.set(1, -1, 1)` flips the mark right-side-up. Must happen
   *before* centering — flipping after would undo the centering math.
6. **Box3 centering.** `new THREE.Box3().setFromObject(group)` bounds the
   geometry; `box.getCenter()` gives its centroid; `group.position.sub
   (center)` re-centers on the local origin so rotation (§5) spins in place
   instead of orbiting the SVG's top-left corner.
7. **Scale-to-fit via a wrapper group.** The centered `group` nests inside
   a fresh `wrapper`: `wrapper.add(group)`. The *wrapper*, not the inner
   group, gets the fit scale: `s = 300 / Math.max(size.x, size.y)`,
   `wrapper.scale.setScalar(s)`. This split matters — centering translates
   the inner group's local origin, so scale must apply outside that
   translation (on the wrapper), or it would amplify the centering offset
   instead of resizing the mark. `loadMark()` returns `wrapper`; that's
   what gets added to the scene and rotated in §5.

## 4. Material & lighting rig

Standard recipe, reproduced per vertical with only the rim-light hex swapped.

**Face material** (front/back faces, brushed-metal PBR):
`new THREE.MeshStandardMaterial({ color: 0xd8dee2, metalness: 0.88, roughness: 0.3 })`

**Edge material** (bevel + side walls — darker, shinier, so bevels read as a
distinct chamfer under rim light):
`new THREE.MeshStandardMaterial({ color: 0xaeb6bb, metalness: 0.92, roughness: 0.24 })`

**Lighting rig** (four lights, fixed positions, added once in `initScene()`):

| Light | Type | Color | Intensity | Position | Role |
|---|---|---|---|---|---|
| Ambient | `AmbientLight` | `0xffffff` | `0.28` | — | Floor light |
| Key | `DirectionalLight` | `0xffffff` | `2.4` | `(220, 260, 420)` | Primary form light |
| Rim | `PointLight` | vertical accent | `60000`, decay `2` | `(-300, 140, 220)` | Cool accent kiss-light |
| Warm fill | `PointLight` | `0xb87333` | `22000`, decay `2` | `(260, -200, 160)` | Warm fill opposite rim |

`PointLight` intensities are large (tens of thousands) because Three.js
lighting falls off with inverse-square distance at these ranges (~300–400
units) — `60000` is calibrated against `metalness: 0.88` and the ~560-unit
camera distance, not a typo.

**Rim light hex per vertical** — swap only `ACCENT` at the top of
`scene.js` (currently `const ACCENT = 0x00f0ff;`):

| Vertical | Accent hex |
|---|---|
| Services | `#00F0FF` |
| Shakes | `#B87333` |
| Solutions | `#FFE600` |

**Glow backdrop sprite** — `THREE.Sprite` behind the mark, canvas-drawn
radial gradient (accent color, opacity 0.30 → 0.08 → 0), scaled `760×760`,
`z: -140`, additive blending, no depth write. Regenerate gradient stops with
the vertical's accent hex; keep opacity stops and scale/position as-is.

**Particle field** — 260 points on a flattened sphere shell (`r = 260 +
random*320`, Y/Z scaled 0.6/0.5 for a shallow ellipsoid), `PointsMaterial`
color `0x9fdfe8`, size `2.4`, opacity `0.5`, additive blending, no depth
write. Rotates independently: `particles.rotation.y -= dt * 0.02` per
frame — not tied to the mark's spin.

## 5. Animation grammar

All per-frame logic lives in `tick()` inside `initScene()`.

- **Idle spin rate:** `spin += dt * 0.22` (rad/s accumulator). Y rotation
  target is `spin * 0.6 + targetRY` — the 0.6 multiplier softens idle spin
  relative to parallax so parallax dominates when the pointer is active.
- **Cursor parallax amplitude:** on `pointermove`, `targetRY = (clientX /
  innerWidth - 0.5) * 0.5` (±0.5 rad horizontal), `targetRX = (clientY /
  innerHeight - 0.5) * 0.35` (±0.35 rad vertical). Horizontal swing is
  deliberately wider.
- **Lerp factor:** both axes ease toward target at `0.06`/frame —
  `group.rotation.y += (target - current) * 0.06` — never snaps instantly.
- **`visibilitychange` pause:** `document.hidden` flips `running` false and
  the rAF loop stops rescheduling (`tick()` early-returns). On return,
  `clock.getDelta()` is called once to discard accumulated idle time (avoids
  a large `dt` spike jumping the spin forward), then `tick()` restarts.
- **DPR cap:** `renderer.setPixelRatio(Math.min(window.devicePixelRatio,
  2))` — never renders above 2x device pixel ratio, bounding GPU cost on
  high-DPI screens.

## 6. Poster fallback

**When it shows** — the poster (a static image under the canvas element) is
what's visible whenever the 3D scene never initializes. Per `js/main.js`:

```js
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const small = window.innerWidth < 680;
if (!reduced && !small) {
  import('./scene.js')
    .then((m) => m.initScene(document.getElementById('stage')))
    .catch(() => { /* poster remains */ });
}
```

Three conditions leave the poster in place: (1) `prefers-reduced-motion:
reduce` at the OS/browser level; (2) viewport width `< 680` — the 3D scene
is skipped, not attempted; (3) the dynamic `import('./scene.js')` rejects
for any reason — no WebGL context (`scene.js` throws `new Error('no
webgl')` when `window.WebGLRenderingContext` is absent), a network failure,
or a runtime error in `initScene()`. The `.catch()` is silent by design: no
error UI, poster stays visible.

**How to generate a new poster.** Reference: `assets/posters/services-poster.svg`
— an SVG, not a rasterized PNG, so it's trivial to regenerate. Structure:

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
<defs><radialGradient id="glow" cx="50%" cy="50%" r="50%">
<stop offset="0%" stop-color="#00F0FF" stop-opacity="0.22"/>
<stop offset="55%" stop-color="#00F0FF" stop-opacity="0.07"/>
<stop offset="100%" stop-color="#00F0FF" stop-opacity="0"/></radialGradient></defs>
<circle cx="256" cy="256" r="250" fill="url(#glow)"/>
<g>
  <!-- the mono mark's paths, pasted in verbatim, fill recolored to #F0F3F4 -->
</g></svg>
```

To build a new one: paste the target mark's `-mono.svg` paths into the
`<g>`, recolor every `fill="currentColor"` to `#F0F3F4` (the hub's ink
color — the mark stays neutral; only the backdrop glow carries the accent),
set the gradient's `stop-color` to the vertical's accent hex at the same
opacity stops (`0.22`/`0.07`/`0`) and same radius (`r="250"` on 512×512,
gradient `r="50%"`). Save as `assets/posters/<vertical>-poster.svg`. This is
a design-time artifact placed manually as the pre-3D-load background — not
generated by an offscreen Three.js render.

## 7. Copy-paste future prompt template

```
Take assets/logos/<new-mark>-mono.svg, follow docs/3d-pipeline.md to add it
as the 3D centerpiece:

1. Verify the SVG against docs/3d-pipeline.md §2 (closed filled paths,
   evenodd holes if any counters exist, single viewBox 0 0 512 512, no
   gradients/filters/masks/text, no feature under ~8 units wide).
2. In js/scene.js, change the loadMark() call to point at the new mono SVG.
3. Set const ACCENT = <vertical accent hex> at the top of scene.js so the
   rim PointLight and glow sprite pick it up automatically.
4. Do not change extrude/bevel parameters (depth 44, bevelThickness 6,
   bevelSize 4, bevelSegments 3, curveSegments 24), material values
   (metalness/roughness), light positions/intensities, or animation
   constants (spin 0.22, parallax 0.5/0.35, lerp 0.06) — these are the
   documented Saturday standards and stay identical across verticals.
5. Regenerate assets/posters/<vertical>-poster.svg per docs/3d-pipeline.md
   §6 (paste the mono mark's paths into the glow template, recolor fill to
   #F0F3F4, set gradient stop-color to the new accent hex).
6. Update the hero markup/CSS to reference the new poster as the pre-load
   fallback image.
7. Confirm the poster fallback still triggers correctly under
   reduced-motion and narrow viewport (docs/3d-pipeline.md §6).
```

## 8. Troubleshooting

- **Counters/holes render filled in (inverted counters).** Hole sub-path is
  missing `fill-rule="evenodd"`, or its winding matches the outer path
  instead of opposing it. Fix in the source SVG — `createShapes()` trusts
  the path's fill-rule and winding as authored.
- **Mark renders mirrored / upside-down.** The Y-flip
  (`group.scale.set(1, -1, 1)`) either wasn't applied, or was applied
  *after* Box3 centering instead of before — order matters (§3, step 5
  before step 6).
- **Mark too thin to read once extruded.** A feature is narrower than the
  ~8-unit minimum (§2); the 4-unit `bevelSize` eats disproportionately into
  it. Widen the feature in the source SVG — don't shrink `bevelSize`
  globally, that breaks the family's shared bevel language.
- **Z-fighting / flickering on coplanar shapes.** Two extruded shapes share
  exact Z depth and the renderer can't consistently resolve which face
  wins. Offset each mesh slightly in Z, keyed to its index in the shape
  loop (e.g. `mesh.position.z = i * 0.5`) rather than changing depth-test
  settings globally.
- **New vertical's 3D scene silently doesn't appear.** Check the three
  poster fallback conditions in §6 first (reduced-motion, `width < 680`,
  thrown/rejected import) before assuming the extrusion pipeline is broken
  — the failure mode is silent by design (poster stays, no console error
  surfaced to the user).
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   