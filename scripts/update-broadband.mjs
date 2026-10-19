/**
 * Scrapes live broadband plan data from provider pages and writes src/data/broadband.ts.
 *
 * Sources:
 * - Jio Fiber: jio.com/fiber (JSON-LD or structured data)
 * - Others: scraped from comparison/recharge sites
 *
 * Run: node scripts/update-broadband.mjs
 */

import * as cheerio from 'cheerio';
import { writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const BB_FILE = resolve(__dirname, '../src/data/broadband.ts');

const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

async function fetchPage(url) {
  const res = await fetch(url, {
    headers: { 'User-Agent': UA },
    signal: AbortSignal.timeout(20_000),
  });
  if (!res.ok) throw new Error(`${url} returned ${res.status}`);
  return cheerio.load(await res.text());
}

async function scrapeJioFiber() {
  console.log('Scraping Jio Fiber plans...');
  try {
    const $ = await fetchPage('https://www.bajajfinserv.in/jio-fibre-plans');
    const plans = [];

    $('table').each(function () {
      $(this).find('tr').each(function () {
        const cells = [];
        $(this).find('td').each(function () { cells.push($(this).text().trim()); });
        if (cells.length < 3) return;

        // Look for price patterns
        const priceMatch = cells.join(' ').match(/₹?\s*([\d,]+)/);
        const speedMatch = cells.join(' ').match(/(\d+)\s*Mbps/i);
        if (priceMatch && speedMatch) {
          const price = parseInt(priceMatch[1].replace(/,/g, ''));
          const speed = parseInt(speedMatch[1]);
          if (price > 100 && price < 10000 && speed > 0) {
            const ott = [];
            const text = cells.join(' ').toLowerCase();
            if (text.includes('netflix')) ott.push('Netflix');
            if (text.includes('jiocinema') || text.includes('jio cinema')) ott.push('JioCinema');
            if (text.includes('sonyliv') || text.includes('sony liv')) ott.push('SonyLIV');
            if (text.includes('zee5')) ott.push('ZEE5');
            if (text.includes('amazon') || text.includes('prime')) ott.push('Amazon Prime');

            plans.push({
              provider: 'Jio Fiber',
              name: `${speed} Mbps Plan`,
              speed,
              data: 'Unlimited',
              price,
              ott: ott.join(', '),
              router: true,
            });
          }
        }
      });
    });

    // Deduplicate by price
    const seen = new Set();
    const unique = plans.filter(p => {
      const key = `${p.price}-${p.speed}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });

    console.log(`  Found ${unique.length} Jio Fiber plans`);
    return unique;
  } catch (err) {
    console.warn('  Jio Fiber scraping failed:', err.message);
    return [];
  }
}

async function scrapeAirtelFiber() {
  console.log('Scraping Airtel Xstream Fiber plans...');
  try {
    const $ = await fetchPage('https://www.bajajfinserv.in/airtel-broadband-plans');
    const plans = [];

    $('table').each(function () {
      $(this).find('tr').each(function () {
        const cells = [];
        $(this).find('td').each(function () { cells.push($(this).text().trim()); });
        if (cells.length < 3) return;

        const priceMatch = cells.join(' ').match(/₹?\s*([\d,]+)/);
        const speedMatch = cells.join(' ').match(/(\d+)\s*Mbps/i);
        if (priceMatch && speedMatch) {
          const price = parseInt(priceMatch[1].replace(/,/g, ''));
          const speed = parseInt(speedMatch[1]);
          if (price > 100 && price < 10000 && speed > 0) {
            const ott = [];
            const text = cells.join(' ').toLowerCase();
            if (text.includes('netflix')) ott.push('Netflix');
            if (text.includes('hotstar') || text.includes('jiohotstar')) ott.push('JioHotstar');
            if (text.includes('xstream')) ott.push('Xstream');
            if (text.includes('sonyliv')) ott.push('SonyLIV');
            if (text.includes('zee5')) ott.push('ZEE5');

            plans.push({
              provider: 'Airtel Xstream Fiber',
              name: `${speed} Mbps Plan`,
              speed,
              data: 'Unlimited',
              price,
              ott: ott.join(', '),
              router: true,
            });
          }
        }
      });
    });

    const seen = new Set();
    const unique = plans.filter(p => {
      const key = `${p.price}-${p.speed}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });

    console.log(`  Found ${unique.length} Airtel Fiber plans`);
    return unique;
  } catch (err) {
    console.warn('  Airtel Fiber scraping failed:', err.message);
    return [];
  }
}

// Fallback data for providers whose pages are JS-rendered
function getFallbackPlans() {
  return [
    { provider: 'ACT Fibernet', name: 'ACT Swift', speed: 75, data: '500 GB', price: 599, ott: '', router: false },
    { provider: 'ACT Fibernet', name: 'ACT Sprint', speed: 100, data: '1 TB', price: 749, ott: '', router: false },
    { provider: 'ACT Fibernet', name: 'ACT Storm', speed: 150, data: '1.5 TB', price: 999, ott: 'ACT Stream TV', router: false },
    { provider: 'ACT Fibernet', name: 'ACT Lightning', speed: 200, data: '2 TB', price: 1049, ott: 'ACT Stream TV', router: false },
    { provider: 'ACT Fibernet', name: 'ACT Incredible', speed: 300, data: '3 TB', price: 1349, ott: 'ACT Stream TV', router: false },
    { provider: 'BSNL Fiber', name: 'Fiber Basic', speed: 30, data: '3300 GB', price: 449, ott: '', router: false },
    { provider: 'BSNL Fiber', name: 'Fiber Value', speed: 60, data: '3300 GB', price: 599, ott: '', router: false },
    { provider: 'BSNL Fiber', name: 'Fiber Premium', speed: 100, data: '3300 GB', price: 799, ott: '', router: false },
    { provider: 'BSNL Fiber', name: 'Fiber Ultra', speed: 200, data: '3300 GB', price: 999, ott: '', router: false },
    { provider: 'BSNL Fiber', name: 'Fiber Enterprise', speed: 300, data: '4000 GB', price: 1499, ott: '', router: false },
    { provider: 'Tata Play Fiber', name: '100 Mbps', speed: 100, data: 'Unlimited', price: 699, ott: '', router: true },
    { provider: 'Tata Play Fiber', name: '150 Mbps', speed: 150, data: 'Unlimited', price: 899, ott: '', router: true },
    { provider: 'Tata Play Fiber', name: '300 Mbps', speed: 300, data: 'Unlimited', price: 1049, ott: '', router: true },
    { provider: 'Tata Play Fiber', name: '500 Mbps', speed: 500, data: 'Unlimited', price: 1599, ott: '', router: true },
    { provider: 'Tata Play Fiber', name: '1 Gbps', speed: 1000, data: 'Unlimited', price: 3599, ott: '', router: true },
  ];
}

async function main() {
  const [jio, airtel] = await Promise.all([
    scrapeJioFiber(),
    scrapeAirtelFiber(),
  ]);

  const fallback = getFallbackPlans();
  const allPlans = [...jio, ...airtel, ...fallback].sort((a, b) => a.price - b.price);

  // If scraped plans are empty, use hardcoded Jio/Airtel too
  if (jio.length === 0) {
    console.log('  Using fallback Jio Fiber plans');
    allPlans.push(
      { provider: 'Jio Fiber', name: 'Welcome Offer', speed: 30, data: 'Unlimited', price: 399, ott: '', router: true },
      { provider: 'Jio Fiber', name: 'Popular', speed: 100, data: 'Unlimited', price: 899, ott: 'JioCinema, SonyLIV', router: true },
      { provider: 'Jio Fiber', name: 'Super', speed: 300, data: 'Unlimited', price: 1499, ott: 'JioCinema, SonyLIV, ZEE5', router: true },
      { provider: 'Jio Fiber', name: 'Titanium', speed: 500, data: 'Unlimited', price: 2499, ott: 'Netflix, JioCinema, SonyLIV, ZEE5', router: true },
      { provider: 'Jio Fiber', name: '5G', speed: 1000, data: 'Unlimited', price: 3999, ott: 'Netflix, JioCinema, SonyLIV, ZEE5, Amazon Prime', router: true },
    );
  }
  if (airtel.length === 0) {
    console.log('  Using fallback Airtel Fiber plans');
    allPlans.push(
      { provider: 'Airtel Xstream Fiber', name: 'Basic', speed: 40, data: 'Unlimited', price: 499, ott: '', router: true },
      { provider: 'Airtel Xstream Fiber', name: 'Entertainment', speed: 100, data: 'Unlimited', price: 799, ott: 'Xstream Premium', router: true },
      { provider: 'Airtel Xstream Fiber', name: 'Premium', speed: 200, data: 'Unlimited', price: 999, ott: 'Xstream, JioHotstar', router: true },
      { provider: 'Airtel Xstream Fiber', name: 'Pro', speed: 300, data: 'Unlimited', price: 1499, ott: 'Xstream, JioHotstar, SonyLIV', router: true },
      { provider: 'Airtel Xstream Fiber', name: 'VIP', speed: 1000, data: 'Unlimited', price: 3999, ott: 'Netflix, Xstream, JioHotstar, SonyLIV, ZEE5', router: true },
    );
  }

  allPlans.sort((a, b) => a.price - b.price);

  const now = new Date().toISOString().split('T')[0];
  const ts = `// AUTO-GENERATED — do not edit by hand.
// Scraped on ${now}
// Run: node scripts/update-broadband.mjs

export interface BroadbandPlan {
  provider: string;
  name: string;
  speed: number;
  data: string;
  price: number;
  ott: string;
  router: boolean;
}

export const lastUpdated = '${now}';

export const broadbandPlans: BroadbandPlan[] = ${JSON.stringify(allPlans, null, 2)};

export const providers = [...new Set(broadbandPlans.map(p => p.provider))];
`;

  writeFileSync(BB_FILE, ts, 'utf8');
  console.log(`\nWrote ${BB_FILE}`);
  console.log(`  ${allPlans.length} total broadband plans`);
}

main().catch(err => {
  console.error('Broadband scraper failed:', err.message);
  process.exit(1);
});
