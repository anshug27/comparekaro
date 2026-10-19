/**
 * Scrapes latest prepaid mobile plans from Bajaj Finserv's server-rendered
 * recharge pages (Jio, Airtel, Vi, BSNL) and writes src/data/plans.ts.
 *
 * Bajaj Finserv renders plan data as HTML tables (server-side), unlike
 * jio.com/airtel.in which are pure JS apps with no plan data in raw HTML.
 *
 * Run: node scripts/update-plans.mjs
 * Schedule: GitHub Action runs this weekly and auto-commits changes.
 */

import * as cheerio from 'cheerio';
import { writeFileSync, readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PLANS_FILE = resolve(__dirname, '../src/data/plans.ts');

const SOURCES = {
  Jio: 'https://www.bajajfinserv.in/jio-prepaid-mobile-recharge',
  Airtel: 'https://www.bajajfinserv.in/airtel-prepaid-mobile-recharge',
  Vi: 'https://www.bajajfinserv.in/vodafone-idea-prepaid-mobile-recharge',
  BSNL: 'https://www.bajajfinserv.in/bsnl-recharge-plans',
};

const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

// ── Fetch HTML ───────────────────────────────────────────
async function fetchPage(url) {
  const res = await fetch(url, {
    headers: { 'User-Agent': UA },
    signal: AbortSignal.timeout(15_000),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return res.text();
}

// ── Parse plans from HTML table ──────────────────────────
function parsePlans(html, operator) {
  const $ = cheerio.load(html);
  const plans = [];

  $('table').each((_, table) => {
    const rows = $(table).find('tr');
    if (rows.length < 2) return;

    // Read headers
    const headerCells = [];
    $(rows[0]).find('th, td').each((_, cell) => {
      headerCells.push($(cell).text().trim().toLowerCase());
    });

    if (!headerCells.length) return;

    // Find column indices by keyword matching
    function findCol(...keywords) {
      return headerCells.findIndex(h => keywords.some(kw => h.includes(kw)));
    }

    const priceIdx = findCol('price', 'plan', 'amount');
    const dataIdx = findCol('data');
    const validityIdx = findCol('validity');
    const benefitsIdx = findCol('benefit', 'extra', 'ott');
    const callsIdx = findCol('calls', 'call', 'voice', 'talktime');

    // Must have at least price and either data or validity
    if (priceIdx === -1) return;
    if (dataIdx === -1 && validityIdx === -1) return;

    rows.slice(1).each((_, row) => {
      const cells = [];
      $(row).find('td, th').each((_, cell) => {
        cells.push($(cell).text().trim());
      });

      if (cells.length <= priceIdx) return;

      // Extract price
      const priceMatch = cells[priceIdx]?.match(/[\d,]+/);
      if (!priceMatch) return;
      const price = parseInt(priceMatch[0].replace(/,/g, ''), 10);
      if (!price || price < 50) return; // skip very small add-on packs

      // Extract per-column text
      const dataText = dataIdx !== -1 && dataIdx < cells.length ? cells[dataIdx] : '';
      const validityText = validityIdx !== -1 && validityIdx < cells.length ? cells[validityIdx] : '';
      const benefitsText = benefitsIdx !== -1 && benefitsIdx < cells.length ? cells[benefitsIdx] : '';
      const callsText = callsIdx !== -1 && callsIdx < cells.length ? cells[callsIdx] : '';

      // Join ALL cells for keyword detection (OTT, 5G, SMS, calls)
      const fullText = cells.join(' ').toLowerCase();

      // Parse daily data (e.g. "2 GB/day", "1.5GB/day")
      // Search across data column AND benefits (Vi puts data info in "Data and benefits")
      const dataSearchText = `${dataText} ${benefitsText}`;
      let dailyData = null;
      let totalData = null;
      const dailyMatch = dataSearchText.match(/([\d.]+)\s*GB\s*\/?\s*day/i);
      const totalMatch = dataSearchText.match(/([\d.]+)\s*GB\s*(?:data|total)?/i);
      if (dailyMatch) {
        dailyData = parseFloat(dailyMatch[1]);
      } else if (totalMatch && !dataSearchText.toLowerCase().includes('/day')) {
        totalData = parseFloat(totalMatch[1]);
      }

      // Parse validity (e.g. "28 days", "84 days", "365 days")
      // Check validity column first, then fall back to any column
      let validity = 28;
      const validitySources = [validityText, dataText, benefitsText, fullText];
      for (const src of validitySources) {
        const vm = src.match(/(\d+)\s*days?/i);
        if (vm) {
          validity = parseInt(vm[1], 10);
          break;
        }
        // Handle "1 month" = 28 days, "3 months" = 84
        const monthMatch = src.match(/(\d+)\s*months?/i);
        if (monthMatch) {
          validity = parseInt(monthMatch[1], 10) * 28;
          break;
        }
      }

      // Detect 5G from all cell text
      const has5G = fullText.includes('5g');

      // Extract OTT benefits from all cell text
      const ott = [];
      const ottPatterns = [
        'JioHotstar', 'JioCinema', 'JioSaavn', 'JioTV',
        'Netflix', 'Amazon Prime', 'SonyLIV', 'ZEE5',
        'Disney+', 'Hotstar', 'Aha', 'FanCode',
        'Wynk', 'Vi Movies', 'Eros Now', 'JioGames',
        'Xstream', 'Apollo 24|7',
      ];
      for (const name of ottPatterns) {
        if (fullText.includes(name.toLowerCase())) {
          ott.push(name);
        }
      }

      // Detect calls - check calls column + all text
      const callsCheckText = `${callsText} ${benefitsText} ${dataText}`.toLowerCase();
      const calls = callsCheckText.includes('unlimited') ? 'Unlimited' : 'Limited';

      // SMS - check all text
      const smsMatch = fullText.match(/(\d+)\s*sms/i);
      const sms = smsMatch ? parseInt(smsMatch[1], 10) : 100;

      plans.push({
        operator,
        price,
        validity,
        dailyData,
        totalData,
        has5G,
        calls,
        sms,
        ott,
      });
    });
  });

  // De-duplicate by (operator, price, validity) — keep first occurrence
  const seen = new Set();
  const unique = [];
  for (const p of plans) {
    const key = `${p.operator}-${p.price}-${p.validity}`;
    if (!seen.has(key)) {
      seen.add(key);
      unique.push(p);
    }
  }

  // Enrich Jio plans with OTT data (Bajaj Finserv doesn't list Jio OTT benefits)
  // Based on Jio's official plan structure:
  // - All unlimited plans include JioCinema, JioTV, JioSaavn basics
  // - ₹349+ plans include JioHotstar
  // - ₹449/₹579+ plans include additional premium OTT
  for (const p of unique) {
    if (p.operator === 'Jio' && p.ott.length === 0 && p.dailyData) {
      p.ott.push('JioCinema', 'JioTV');
      if (p.price >= 349) p.ott.push('JioHotstar');
      if (p.price >= 579) p.ott.push('JioSaavn');
    }
  }

  // Sort by price
  unique.sort((a, b) => a.price - b.price);

  return unique;
}

// ── Generate plans.ts ────────────────────────────────────
function generatePlanId(operator, price) {
  return `${operator.toLowerCase().replace(/\s/g, '')}-${price}`;
}

function generateTsFile(allPlans, timestamp) {
  let ts = `// Auto-generated by scripts/update-plans.mjs
// Last updated: ${timestamp}
// Source: Bajaj Finserv public recharge pages
// Do NOT edit manually — run: node scripts/update-plans.mjs

export interface Plan {
  id: string;
  operator: 'Jio' | 'Airtel' | 'Vi' | 'BSNL';
  price: number;
  validity: number;
  dailyData: number | null;
  totalData: number | null;
  has5G: boolean;
  calls: string;
  sms: number;
  ott: string[];
  pricePerDay: number;
  pricePerGB: number;
  popular?: boolean;
}

function calcPricePerDay(price: number, validity: number): number {
  return Math.round((price / validity) * 100) / 100;
}

function calcPricePerGB(price: number, dailyData: number | null, totalData: number | null, validity: number): number {
  const totalGB = dailyData ? dailyData * validity : (totalData || 1);
  return Math.round((price / totalGB) * 100) / 100;
}

function makePlan(
  id: string, operator: Plan['operator'], price: number, validity: number,
  dailyData: number | null, totalData: number | null, has5G: boolean,
  calls: string, sms: number, ott: string[], popular = false
): Plan {
  return {
    id, operator, price, validity, dailyData, totalData, has5G, calls, sms, ott,
    pricePerDay: calcPricePerDay(price, validity),
    pricePerGB: calcPricePerGB(price, dailyData, totalData, validity),
    popular,
  };
}

export const plans: Plan[] = [
`;

  // Mark some plans as popular (cheapest 28-day, cheapest 84-day, cheapest 365-day per operator)
  const popularKeys = new Set();
  for (const operator of ['Jio', 'Airtel', 'Vi', 'BSNL']) {
    const opPlans = allPlans.filter(p => p.operator === operator);
    for (const v of [28, 84, 365]) {
      const match = opPlans.find(p => p.validity === v);
      if (match) popularKeys.add(`${match.operator}-${match.price}`);
    }
  }

  for (const plan of allPlans) {
    const id = generatePlanId(plan.operator, plan.price);
    const popular = popularKeys.has(`${plan.operator}-${plan.price}`);
    const dailyStr = plan.dailyData !== null ? String(plan.dailyData) : 'null';
    const totalStr = plan.totalData !== null ? String(plan.totalData) : 'null';
    const ottStr = plan.ott.length ? `[${plan.ott.map(o => `'${o}'`).join(', ')}]` : '[]';

    ts += `  makePlan('${id}', '${plan.operator}', ${plan.price}, ${plan.validity}, ${dailyStr}, ${totalStr}, ${plan.has5G}, '${plan.calls}', ${plan.sms}, ${ottStr}${popular ? ', true' : ''}),\n`;
  }

  ts += `];

export const operators = ['Jio', 'Airtel', 'Vi', 'BSNL'] as const;
export const operatorColors: Record<string, string> = {
  Jio: 'bg-blue-500',
  Airtel: 'bg-red-500',
  Vi: 'bg-purple-500',
  BSNL: 'bg-green-600',
};
`;

  return ts;
}

// ── Main ─────────────────────────────────────────────────
async function main() {
  console.log('Fetching latest prepaid plans from Bajaj Finserv...\n');

  const allPlans = [];
  const results = {};

  for (const [operator, url] of Object.entries(SOURCES)) {
    try {
      console.log(`  Fetching ${operator}...`);
      const html = await fetchPage(url);
      const plans = parsePlans(html, operator);
      console.log(`  ✓ ${operator}: ${plans.length} plans found`);
      allPlans.push(...plans);
      results[operator] = plans.length;
    } catch (err) {
      console.error(`  ✗ ${operator}: ${err.message}`);
      results[operator] = 0;
    }
  }

  const totalFound = allPlans.length;
  console.log(`\nTotal: ${totalFound} plans across ${Object.keys(results).filter(k => results[k] > 0).length} operators`);

  if (totalFound === 0) {
    console.error('\nERROR: No plans scraped. Keeping existing file unchanged.');
    process.exit(1);
  }

  // If we got fewer than 5 plans, something is probably wrong with parsing
  if (totalFound < 5) {
    console.warn(`\nWARNING: Only ${totalFound} plans found — this seems low. Proceeding anyway.`);
  }

  const timestamp = new Date().toISOString().replace('T', ' ').slice(0, 19) + ' UTC';
  const tsContent = generateTsFile(allPlans, timestamp);

  writeFileSync(PLANS_FILE, tsContent, 'utf8');
  console.log(`\n✓ Written ${totalFound} plans to src/data/plans.ts`);
  console.log(`  Operators: ${Object.entries(results).map(([k, v]) => `${k}(${v})`).join(', ')}`);
  console.log(`  Timestamp: ${timestamp}`);
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
