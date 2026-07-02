# Saturday Services — Hub

Personal project hub for the Saturday Services verticals (Shakes · Solutions/Night Games · M&N Collective).
Live at **saturday-services.vercel.app** — static site, no build step, auto-deploys from `main`.

*Every day is Saturday.*

## Add a link

Edit `links.json`, add one object, commit, push. Vercel redeploys in ~30s. See `docs/adding-links.md`.

## Swap a logo

Nine options live in `assets/logos/options/` (preview them at `/logo-gallery.html`).
The hub uses the finals in `assets/logos/`. To change a default:

```
cp assets/logos/options/services-b.svg      assets/logos/services.svg
cp assets/logos/options/services-b-mono.svg assets/logos/services-mono.svg
```

The 3D hero extrudes `assets/logos/services-mono.svg` — swap that file and the sculpture changes with it.

## Structure

```
index.html            the hub (hero + swipeable project deck)
logo-gallery.html     logo option picker
links.json            THE file you edit to add projects
css/ js/              site + Three.js scene
assets/logos/         final marks (+ options/ = 3 explorations per mark)
assets/posters/       static fallback for reduced-motion / no-WebGL
design/               transferrable design suites (saturday-core + verticals)
docs/                 prd, 3d pipeline recipe, adding-links how-to
```

## Design suites

Every future app starts by copying `design/saturday-core/` plus its vertical folder
(`design/shakes/`, `design/solutions/`, …) and prompting against the Design.md inside.
M&N Collective's system is canonical elsewhere — see `design/mn-collective/README.md`.

## 3D pipeline

To turn any future 2D logo into a hub-grade animated 3D centerpiece, follow `docs/3d-pipeline.md`.

## Local preview

```
python -m http.server 8000
# open http://localhost:8000
```
