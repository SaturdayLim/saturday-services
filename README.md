# Saturday Services — Hub

Personal project hub for the Saturday Services verticals (Shakes · Solutions/Night Games · M&N Collective).
Live at **saturday-services.vercel.app** — static site, no build step, auto-deploys from `main`.

*Every day is Saturday.*

## How it works

The hero is the metallic **SATURDAY SERVICES** wordmark on a continuous starfield; scrolling,
arrow keys, or Enter snap between full-viewport pages (one per `links.json` entry). The wordmark
glides to the top-left corner when you leave the hero. Clicking any glowing logo opens its app
in a new tab. The M&N Collective page inverts to daytime.

## Add a page or an app

Edit `links.json`, commit, push. Vercel redeploys in ~30s. Pages have `options` (sub-apps with
their own marks — how future games land under Saturday Solutions). See `docs/adding-links.md`.

## Swap a logo

Nine options live in `assets/logos/options/` (preview them at `/logo-gallery.html`).
The hub uses the finals in `assets/logos/`. To change a default:

```
cp assets/logos/options/services-b.svg      assets/logos/services.svg
cp assets/logos/options/services-b-mono.svg assets/logos/services-mono.svg
```

## Structure

```
index.html            the hub (starfield + page-snap navigation)
logo-gallery.html     logo option picker
links.json            THE file you edit to add pages/apps
css/ js/              site (main.js: starfield, pages, transitions)
js/scene.js           unused reference implementation for the 3D pipeline
assets/logos/         final marks (+ options/ = 3 explorations per mark)
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
