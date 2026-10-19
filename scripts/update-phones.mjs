/**
 * Scrapes popular phone specs from 91mobiles.com and writes src/data/phones.ts.
 * Also auto-generates comparison pairs for src/pages/compare/[slug].astro.
 *
 * 91mobiles renders specs as server-side HTML with JSON-LD structured data,
 * making it scrapable without a headless browser.
 *
 * Run: node scripts/update-phones.mjs
 * Schedule: GitHub Action runs this weekly alongside plan updates.
 */

import * as cheerio from 'cheerio';
import { writeFileSync, readFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PHONES_FILE = resolve(__dirname, '../src/data/phones.ts');
const COMPARISONS_FILE = resolve(__dirname, '../src/data/comparisons.json');

const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

// We scrape the top popular phones from 91mobiles listing, then fetch each phone's detail page
const LISTING_URL = 'https://www.91mobiles.com/mobile-phones';

// Additional listing pages to scrape for more phone variety
const EXTRA_LISTING_URLS = [
  'https://www.91mobiles.com/best-phones-under-15000',
  'https://www.91mobiles.com/best-phones-under-20000',
  'https://www.91mobiles.com/best-phones-under-30000',
  'https://www.91mobiles.com/best-5g-phones',
];

// ── Fetch HTML ───────────────────────────────────────────
async function fetchPage(url) {
  const res = await fetch(url, {
    headers: { 'User-Agent': UA },
    signal: AbortSignal.timeout(20_000),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return res.text();
}

// ── Get popular phone URLs from listing page ─────────────
function getPopularPhoneUrls(html) {
  const $ = cheerio.load(html);
  const phones = [];
  const seen = new Set();

  // Extract from "most popular" section
  $('[data-ga*="most popular"]').each((_, el) => {
    const url = $(el).attr('data-href-url') || $(el).attr('href');
    if (url && url.includes('price-in-india') && !seen.has(url)) {
      seen.add(url);
      // Extract name from data-ga attribute: "web-catlanding:Mobile|Phone Name:id:cat|most popular"
      const ga = $(el).attr('data-ga') || '';
      const nameMatch = ga.match(/\|([^:]+):/);
      const name = nameMatch ? nameMatch[1] : '';
      phones.push({ url, name });
    }
  });

  return phones;
}

// ── Parse phone specs from detail page ───────────────────
function parsePhoneSpecs(html, url) {
  const $ = cheerio.load(html);

  // 1. Extract from JSON-LD (name, price, brand, images)
  let name = '', price = 0, brand = '', image = '';
  $('script[type="application/ld+json"]').each((_, el) => {
    try {
      const data = JSON.parse($(el).html());
      if (data['@type'] === 'Product') {
        name = data.name || '';
        brand = data.brand?.name || '';
        price = parseInt(data.offers?.lowPrice || data.offers?.price || '0', 10);
        image = Array.isArray(data.image) ? data.image[0] : (data.image || '');
      }
    } catch (e) {}
  });

  if (!name) {
    // Fallback: try title tag
    const titleText = $('title').text();
    const titleMatch = titleText.match(/^(.+?)\s*[-–]/);
    name = titleMatch ? titleMatch[1].trim() : '';
  }

  // 2. Extract specs from key-specs section
  const specs = {};
  $('.keyspec_container').each((_, container) => {
    const sectionTitle = $(container).find('.key-spec-ttl').first().text().trim().toLowerCase();
    const values = [];
    // 91mobiles uses malformed HTML: <td class="specs-td"> inside <ul>/<li>
    // Cheerio strips the invalid <td> tags, but .spl_text on <li> works
    $(container).find('.spl_text').each((_, li) => {
      const text = $(li).text().trim().replace(/\s+/g, ' ');
      if (text) values.push(text);
    });
    if (sectionTitle) specs[sectionTitle] = values;
  });

  // 3. Parse individual fields from spec sections
  const perf = specs['performance'] || [];
  const display = specs['display'] || [];
  const rearCam = specs['rear camera'] || [];
  const frontCam = specs['front camera'] || [];
  const battery = specs['battery'] || [];
  const general = specs['general'] || [];

  // Processor: first item in performance
  const processor = perf[0] || '';

  // RAM: find "X GB RAM" in performance
  const ramLine = perf.find(v => /\d+\s*GB\s*RAM/i.test(v)) || '';
  const ramMatch = ramLine.match(/(\d+\s*GB)\s*RAM/i);
  const ram = ramMatch ? ramMatch[1] : '';

  // Display: first item has size + type
  const displayLine = display[0] || '';
  const displaySizeMatch = displayLine.match(/([\d.]+)\s*inch/i);
  const displaySize = displaySizeMatch ? `${displaySizeMatch[1]}"` : '';
  const displayType = displayLine.replace(/[\d.]+\s*inches?\s*\([^)]*\)\s*;?\s*/i, '').trim() || displayLine;

  // Resolution
  const resLine = display.find(v => /\d+x\d+/i.test(v)) || '';

  // Refresh rate
  const refreshLine = display.find(v => /Hz/i.test(v)) || '';

  // Main camera: first rear camera line
  const mainCamLine = rearCam[0] || '';
  // Extract "48 MP + 12 MP" style from "Dual Camera Setup 48 MP ... 12 MP ..."
  const mpMatches = mainCamLine.match(/(\d+)\s*MP/gi) || [];
  const mainCamera = mpMatches.map(m => m.replace(/\s+/g, ' ')).join(' + ') || mainCamLine;

  // Selfie camera
  const selfieLine = frontCam[0] || '';
  const selfieMatch = selfieLine.match(/(\d+\s*MP)/i);
  const selfieCamera = selfieMatch ? selfieMatch[1] : selfieLine;

  // Battery capacity
  const batteryLine = battery[0] || '';
  const batteryMatch = batteryLine.match(/(\d+\s*mAh)/i);
  const batteryCapacity = batteryMatch ? batteryMatch[1] : batteryLine;

  // Charging
  const chargingLine = battery.find(v => /[Ww]\s*(Fast|Charg|USB|Wireless)/i.test(v)) || battery[1] || '';

  // OS from page
  const osDiv = $('.osname');
  const os = osDiv.text().trim().replace(/\s+/g, ' ') || '';

  // 5G
  const allText = general.join(' ').toLowerCase() + ' ' + perf.join(' ').toLowerCase();
  const has5G = allText.includes('5g');

  // Storage
  const storageLine = general.find(v => /\d+\s*GB.*storage|internal/i.test(v)) || '';
  const storageMatch = storageLine.match(/(\d+\s*GB)/i);
  const storage = storageMatch ? storageMatch[1] : '';

  // Weight from meta description or general specs
  const metaDesc = $('meta[name="description"]').attr('content') || '';
  // Match weight patterns like "195g", "195 g", "195 grams" but NOT "5G" (network)
  const weightMatch = metaDesc.match(/(\d{2,3}(?:\.\d+)?\s*(?:grams?|g(?:ms?)?))\b(?!\s*(?:ram|data|storage|hz|5g))/i)
    || general.join(' ').match(/(\d{2,3}(?:\.\d+)?\s*(?:grams?|g(?:ms?)?))\b/i);
  const weight = weightMatch ? weightMatch[1] : '';

  // Generate ID from name
  const id = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .replace(/-+/g, '-');

  return {
    id,
    name,
    brand,
    price,
    display: displayType || displayLine,
    displaySize,
    processor,
    ram,
    storage,
    mainCamera,
    selfieCamera,
    battery: batteryCapacity,
    charging: chargingLine,
    os,
    has5G,
    weight,
    rating: 0, // We don't scrape ratings
  };
}

// ── Generate phones.ts ───────────────────────────────────
function generatePhonesTs(phones, timestamp) {
  let ts = `// Auto-generated by scripts/update-phones.mjs
// Last updated: ${timestamp}
// Source: 91mobiles.com public phone spec pages
// Do NOT edit manually — run: node scripts/update-phones.mjs

export interface Phone {
  id: string;
  name: string;
  brand: string;
  price: number;
  display: string;
  displaySize: string;
  processor: string;
  ram: string;
  storage: string;
  mainCamera: string;
  selfieCamera: string;
  battery: string;
  charging: string;
  os: string;
  has5G: boolean;
  weight: string;
  rating: number;
}

export const phones: Phone[] = [
`;

  for (const p of phones) {
    const esc = (s) => s.replace(/'/g, "\\'");
    ts += `  {
    id: '${esc(p.id)}', name: '${esc(p.name)}', brand: '${esc(p.brand)}', price: ${p.price},
    display: '${esc(p.display)}', displaySize: '${esc(p.displaySize)}', processor: '${esc(p.processor)}',
    ram: '${esc(p.ram)}', storage: '${esc(p.storage)}', mainCamera: '${esc(p.mainCamera)}', selfieCamera: '${esc(p.selfieCamera)}',
    battery: '${esc(p.battery)}', charging: '${esc(p.charging)}', os: '${esc(p.os)}',
    has5G: ${p.has5G}, weight: '${esc(p.weight)}', rating: ${p.rating},
  },
`;
  }

  ts += `];

export const brands = [...new Set(phones.map(p => p.brand))];
`;

  return ts;
}

// ── Generate comparison pairs ────────────────────────────
function generateComparisonPairs(phones) {
  const pairs = [];
  const seen = new Set();

  // Group phones by similar price range (within 30% of each other)
  for (let i = 0; i < phones.length; i++) {
    for (let j = i + 1; j < phones.length; j++) {
      const a = phones[i];
      const b = phones[j];
      if (a.brand === b.brand) continue; // Skip same-brand comparisons

      const ratio = Math.max(a.price, b.price) / Math.min(a.price, b.price);
      if (ratio > 1.5) continue; // Skip if price difference > 50%

      const key = [a.id, b.id].sort().join('|');
      if (seen.has(key)) continue;
      seen.add(key);

      const slug = `${a.id}-vs-${b.id}`;
      pairs.push({ slug, phone1Id: a.id, phone2Id: b.id });
    }
  }

  // Limit to 30 most interesting pairs (sorted by closest price match)
  pairs.sort((a, b) => {
    const pa = phones.find(p => p.id === a.phone1Id);
    const pb = phones.find(p => p.id === a.phone2Id);
    const pc = phones.find(p => p.id === b.phone1Id);
    const pd = phones.find(p => p.id === b.phone2Id);
    if (!pa || !pb || !pc || !pd) return 0;
    const ratioA = Math.max(pa.price, pb.price) / Math.min(pa.price, pb.price);
    const ratioB = Math.max(pc.price, pd.price) / Math.min(pc.price, pd.price);
    return ratioA - ratioB;
  });

  return pairs.slice(0, 60);
}

// ── Main ─────────────────────────────────────────────────
async function main() {
  console.log('Fetching popular phones from 91mobiles...\n');

  // Step 1: Get popular phone URLs from main listing page + extra pages
  let phoneUrls = [];
  try {
    const listingHtml = await fetchPage(LISTING_URL);
    phoneUrls = getPopularPhoneUrls(listingHtml);
    console.log(`  Found ${phoneUrls.length} popular phones on main listing page`);
  } catch (err) {
    console.error(`  Failed to fetch main listing page: ${err.message}`);
  }

  // Scrape extra listing pages for more variety
  for (const extraUrl of EXTRA_LISTING_URLS) {
    try {
      const html = await fetchPage(extraUrl);
      const $ = cheerio.load(html);
      // These pages have different structures - look for phone links
      $('a[href*="price-in-india"]').each((_, el) => {
        const href = $(el).attr('href') || '';
        const fullUrl = href.startsWith('http') ? href : `https://www.91mobiles.com${href}`;
        if (fullUrl.includes('price-in-india') && !fullUrl.includes('list-of') && !fullUrl.includes('laptops')) {
          const text = $(el).text().trim();
          if (text && text.length > 3 && text.length < 80) {
            phoneUrls.push({ url: fullUrl, name: text });
          }
        }
      });
      console.log(`  Found phones from ${extraUrl.split('/').pop()}`);
      await new Promise(r => setTimeout(r, 300));
    } catch (err) {
      console.warn(`  Failed to fetch ${extraUrl}: ${err.message}`);
    }
  }

  console.log(`  Total found across all pages: ${phoneUrls.length}`);

  // Deduplicate by URL
  const seenUrls = new Set();
  const dedupedByUrl = phoneUrls.filter(p => {
    if (seenUrls.has(p.url)) return false;
    seenUrls.add(p.url);
    return true;
  });

  // Deduplicate by base phone model (skip storage variants like 512GB, 1TB)
  const dedupedUrls = [];
  const seenBaseModels = new Set();
  for (const phone of dedupedByUrl) {
    const baseModel = phone.name
      .replace(/\d+\s*(GB|TB)\s*(RAM)?/gi, '')
      .replace(/\s+/g, ' ')
      .trim();
    if (!seenBaseModels.has(baseModel)) {
      seenBaseModels.add(baseModel);
      dedupedUrls.push(phone);
    }
  }

  // Increase limit to 40 phones
  const phoneUrlsToScrape = dedupedUrls.slice(0, 40);
  console.log(`  Scraping ${phoneUrlsToScrape.length} unique phone models\n`);

  // Step 2: Fetch each phone's detail page and parse specs
  const phones = [];
  for (const { url, name } of phoneUrlsToScrape) {
    try {
      console.log(`  Fetching ${name || url}...`);
      const html = await fetchPage(url);
      const phone = parsePhoneSpecs(html, url);

      // Validate: must have at least name and price
      if (!phone.name || !phone.price) {
        console.log(`    ✗ Skipped (missing name or price)`);
        continue;
      }

      phones.push(phone);
      console.log(`    ✓ ${phone.name} - ₹${phone.price.toLocaleString()}`);

      // Be polite: small delay between requests
      await new Promise(r => setTimeout(r, 500));
    } catch (err) {
      console.error(`    ✗ Failed: ${err.message}`);
    }
  }

  console.log(`\nTotal: ${phones.length} phones scraped`);

  if (phones.length === 0) {
    console.error('\nERROR: No phones scraped. Keeping existing file unchanged.');
    process.exit(1);
  }

  // Step 3: Generate phones.ts
  const timestamp = new Date().toISOString().replace('T', ' ').slice(0, 19) + ' UTC';
  const tsContent = generatePhonesTs(phones, timestamp);
  writeFileSync(PHONES_FILE, tsContent, 'utf8');
  console.log(`\n✓ Written ${phones.length} phones to src/data/phones.ts`);

  // Step 4: Generate comparison pairs
  const pairs = generateComparisonPairs(phones);
  writeFileSync(COMPARISONS_FILE, JSON.stringify(pairs, null, 2), 'utf8');
  console.log(`✓ Generated ${pairs.length} comparison pairs in src/data/comparisons.json`);
  console.log(`  Timestamp: ${timestamp}`);
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
