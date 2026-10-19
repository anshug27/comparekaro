# CompareKaro.in

India's smart comparison & tools platform. Free tools to compare mobile plans, calculate EMI, SIP, FD returns, and compare phones side by side.

**Hosting: Cloudflare Pages (FREE - $0/month)**

## Features

- **EMI Calculator** - Home loan, car loan, personal loan EMI with amortization schedule
- **SIP Calculator** - Mutual fund SIP returns with year-wise growth chart
- **FD Calculator** - Fixed deposit maturity with quarterly/monthly compounding
- **Rent vs Buy Calculator** - Compare total cost of renting vs buying a home
- **Mobile Plan Finder** - Filter & sort Jio, Airtel, Vi, BSNL prepaid plans by budget, data, validity
- **Phone Comparison** - Side-by-side spec comparison for 10+ popular phones
- **13 SEO Comparison Pages** - Auto-generated pages like "iPhone 16 vs Samsung S24"
- **Sitemap + Schema.org** - Full SEO with structured data on every page
- **AdSense Ready** - Placeholder ad units on every page

## Tech Stack

| Layer | Technology | Cost |
|-------|-----------|------|
| Framework | Astro 7 (Static) | $0 |
| Styling | Tailwind CSS 4 | $0 |
| Hosting | Cloudflare Pages | $0 |
| SEO | @astrojs/sitemap | $0 |
| Ads | Google AdSense | Revenue |
| **Total** | | **$0/month** |

## Commands

| Command | Action |
|:--------|:-------|
| `npm install` | Install dependencies |
| `npm run dev` | Start dev server (localhost:4321) |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run update-plans` | Scrape latest mobile plans from providers |

## Deploy to Cloudflare Pages

### Option 1: Git Integration (Recommended)

1. Push this repo to GitHub/GitLab
2. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/) > Pages > Create a project
3. Connect your GitHub/GitLab repo
4. Set build settings:
   - **Build command:** `npm run build`
   - **Build output directory:** `dist/client`
   - **Node.js version:** `22` (set in Environment Variables: `NODE_VERSION` = `22`)
5. Click "Save and Deploy"

### Option 2: Direct Upload

```bash
npm run build
npx wrangler pages deploy dist/client --project-name=comparekaro
```

### Custom Domain

1. In Cloudflare Pages project settings > Custom domains
2. Add `comparekaro.download` (or your domain)
3. Update DNS as instructed by Cloudflare

## After Deployment

### Enable AdSense

1. Apply for Google AdSense at https://www.google.com/adsense
2. Once approved, replace `ca-pub-XXXXXXX` with your publisher ID in:
   - `src/layouts/Layout.astro` (the script tag in `<head>`)
   - `src/components/AdUnit.astro` (uncomment the `<ins>` tag and remove the placeholder)
3. Update `public/ads.txt` with your publisher ID
4. Rebuild and redeploy

### Add Google Analytics

1. Get your GA4 Measurement ID from Google Analytics
2. Add the gtag.js script to `src/layouts/Layout.astro` `<head>`

## Project Structure

```
src/
├── layouts/
│   └── Layout.astro          # Main layout with nav, footer, SEO
├── components/
│   ├── AdUnit.astro           # AdSense ad placeholder
│   └── ToolCard.astro         # Tool card component
├── data/
│   ├── plans.ts               # Mobile recharge plan data
│   └── phones.ts              # Phone specs data
├── pages/
│   ├── index.astro            # Homepage
│   ├── about.astro            # About page
│   ├── privacy.astro          # Privacy policy
│   ├── contact.astro          # Contact form
│   ├── tools/
│   │   ├── index.astro        # Tools listing
│   │   ├── emi-calculator.astro
│   │   ├── sip-calculator.astro
│   │   ├── fd-calculator.astro
│   │   ├── rent-vs-buy.astro
│   │   └── plan-finder.astro
│   └── compare/
│       ├── index.astro        # Phone comparison tool
│       └── [slug].astro       # Auto-generated comparison pages
├── styles/
│   └── global.css             # Tailwind import
public/
├── favicon.svg
├── robots.txt
└── ads.txt
```

## Updating Data

### Mobile Plans (Automatic)

Plan data is **automatically scraped** from Bajaj Finserv's server-rendered recharge pages (Jio, Airtel, Vi, BSNL). This avoids the problem of jio.com/airtel.in being pure JS apps with no plan data in raw HTML.

- **Manual update:** `npm run update-plans`
- **Automatic:** GitHub Action runs every Monday and Thursday, scrapes latest plans, and auto-commits changes
- **Source:** Bajaj Finserv public recharge pages (server-side rendered HTML tables)
- **Data file:** `src/data/plans.ts` (auto-generated, do NOT edit manually)

The scraper (`scripts/update-plans.mjs`) handles:
- Fetching HTML from 4 Bajaj Finserv pages
- Parsing plan tables with cheerio (price, data, validity, OTT, 5G)
- De-duplicating and normalizing data
- Writing typed TypeScript output
- Graceful failure (keeps existing data if scrape fails)

### Other Data

- **Phone specs:** Edit `src/data/phones.ts` to add/update phones
- **Comparison pages:** Edit the `comparisons` array in `src/pages/compare/[slug].astro`
