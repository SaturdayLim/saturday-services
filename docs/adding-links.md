# Adding to the hub

Each entry in `links.json` is one full-viewport **page** (after the hero). Edit, commit, push — Vercel redeploys in ~30s.

## Add a whole new page (vertical / collective)

```json
{
  "title": "Saturday Something",
  "vertical": "solutions",
  "logo": "assets/logos/solutions-light.svg",
  "link": null,
  "status": "soon",
  "blurb": "One line about it.",
  "options": []
}
```

## Add an app to an existing page (a sub-logo option)

Add one object to that page's `options` array — this is how each future game lands under Saturday Solutions:

```json
{ "title": "Trivia", "logo": "assets/logos/trivia.svg", "link": "https://trivia.example.app/", "status": "live" }
```

Field notes:

- `vertical`: `services` · `shakes` · `solutions` · `mn` — sets the accent + glow color. Unknown values fall back to services blue.
- `theme`: `"day"` flips that page to the light daytime inversion (used by M&N Collective). Omit for night.
- `link` on the page itself: only for single-app pages — the big logo becomes clickable. Use `null` when the page has `options`.
- Option logos: SVGs are inlined at runtime, so glows and embedded images work. Clicking a logo opens the app in a new tab.
- Schema: `docs/links.schema.json`.
