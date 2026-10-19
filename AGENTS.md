## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Verification

- Build: `npm run build`
- Build output directory: `dist/client`
- Deploy: `npx wrangler pages deploy dist/client --project-name=comparekaro`

## Data Automation

- `npm run update-plans` — Scrape mobile plans from Bajaj Finserv (Jio/Airtel/Vi/BSNL)
- `npm run update-phones` — Scrape phone specs from 91mobiles + auto-generate comparison pairs
- `npm run update-all` — Run both scrapers
- GitHub Action runs Mon+Thu at 6 AM IST: scrapes data, commits changes, builds, deploys

Data files (auto-generated, do NOT edit manually):
- `src/data/plans.ts` — Mobile plan data
- `src/data/phones.ts` — Phone specs
- `src/data/comparisons.json` — Auto-generated comparison page pairs

## Project Notes

- Static output mode (`output: 'static'`) with Cloudflare Pages adapter
- All calculator logic is client-side JavaScript (no server APIs needed)
- SEO comparison pages generated from `[slug].astro` using `comparisons.json`
- AdSense placeholders in `Layout.astro` and `AdUnit.astro` - replace `ca-pub-XXXXXXX` after approval

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
