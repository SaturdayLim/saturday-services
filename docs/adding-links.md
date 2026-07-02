# Adding a link to the hub

1. Open `links.json`.
2. Add an object to the `links` array:

```json
{
  "title": "My New App",
  "vertical": "shakes",
  "logo": "assets/logos/shakes.svg",
  "link": "https://my-new-app.vercel.app/",
  "status": "live",
  "blurb": "One line about what it does."
}
```

3. Commit and push to `main`. Vercel redeploys automatically (~30s).

Field notes:

- `vertical`: `services` · `shakes` · `solutions` · `mn` — controls the accent color. Unknown values fall back to the Services blue, so new verticals never break the page.
- `link`: use `null` while the app isn't live yet — the panel shows COMING SOON.
- `status`: `live` or `soon` — controls the badge.
- `children`: optional array of `{title, link, status}` — renders the entry as a group panel (see the M&N Collective entry).
- Schema: `docs/links.schema.json`.
