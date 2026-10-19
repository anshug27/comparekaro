/**
 * Scrapes live loan interest rates from BankBazaar.com and writes src/data/loans.ts.
 * BankBazaar renders rate tables as server-side HTML.
 *
 * Run: node scripts/update-loans.mjs
 */

import * as cheerio from 'cheerio';
import { writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const LOANS_FILE = resolve(__dirname, '../src/data/loans.ts');

const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

async function fetchPage(url) {
  const res = await fetch(url, {
    headers: { 'User-Agent': UA },
    signal: AbortSignal.timeout(20_000),
  });
  if (!res.ok) throw new Error(`${url} returned ${res.status}`);
  return cheerio.load(await res.text());
}

function parseRate(text) {
  // Extract lowest rate from strings like "7.25% p.a. onwards" or "7.20% p.a. to 8.95% p.a."
  const match = text.match(/([\d.]+)%/);
  return match ? parseFloat(match[1]) : 0;
}

function parseMaxRate(text) {
  const matches = [...text.matchAll(/([\d.]+)%/g)];
  if (matches.length >= 2) return parseFloat(matches[1][1]);
  return parseRate(text);
}

function cleanText(text) {
  return text.replace(/\s+/g, ' ').trim();
}

async function scrapeHomeLoanRates() {
  console.log('Scraping home loan rates from BankBazaar...');
  const $ = await fetchPage('https://www.bankbazaar.com/home-loan-interest-rate.html');

  const loans = [];
  $('table').first().find('tr').each(function () {
    const cells = [];
    $(this).find('td').each(function () { cells.push(cleanText($(this).text())); });
    if (cells.length < 3) return;

    const bank = cells[0];
    const rateText = cells[1];
    const feeText = cells[2];

    const minRate = parseRate(rateText);
    const maxRate = parseMaxRate(rateText);
    if (!minRate || minRate < 5 || minRate > 20) return; // sanity check

    // Skip obscure banks, keep top ones
    const skipBanks = ['Contact the Bank', 'Contact the NBFC', 'Contact Indian'];
    if (skipBanks.some(s => rateText.includes(s) || feeText.includes(s))) return;

    loans.push({ bank, minRate, maxRate, processingFee: feeText });
  });

  console.log(`  Found ${loans.length} home loan rates`);
  return loans.sort((a, b) => a.minRate - b.minRate);
}

async function scrapePersonalLoanRates() {
  console.log('Scraping personal loan rates from BankBazaar...');
  const $ = await fetchPage('https://www.bankbazaar.com/personal-loan-interest-rate.html');

  const loans = [];
  $('table').first().find('tr').each(function () {
    const cells = [];
    $(this).find('td').each(function () { cells.push(cleanText($(this).text())); });
    if (cells.length < 3) return;

    const bank = cells[0];
    const rateText = cells[1];
    const feeText = cells[2];

    const minRate = parseRate(rateText);
    const maxRate = parseMaxRate(rateText);
    if (!minRate || minRate < 5 || minRate > 30) return;

    loans.push({ bank, minRate, maxRate, processingFee: feeText });
  });

  console.log(`  Found ${loans.length} personal loan rates`);
  return loans.sort((a, b) => a.minRate - b.minRate);
}

async function main() {
  const [homeLoans, personalLoans] = await Promise.all([
    scrapeHomeLoanRates(),
    scrapePersonalLoanRates(),
  ]);

  if (homeLoans.length < 5) {
    console.warn('WARNING: Very few home loan rates found, keeping existing file');
    return;
  }

  const now = new Date().toISOString().split('T')[0];

  const ts = `// AUTO-GENERATED — do not edit by hand.
// Scraped from BankBazaar.com on ${now}
// Run: node scripts/update-loans.mjs

export interface LoanRate {
  bank: string;
  minRate: number;
  maxRate: number;
  processingFee: string;
}

export const lastUpdated = '${now}';

export const homeLoans: LoanRate[] = ${JSON.stringify(homeLoans, null, 2)};

export const personalLoans: LoanRate[] = ${JSON.stringify(personalLoans, null, 2)};
`;

  writeFileSync(LOANS_FILE, ts, 'utf8');
  console.log(`\nWrote ${LOANS_FILE}`);
  console.log(`  ${homeLoans.length} home loan rates, ${personalLoans.length} personal loan rates`);
}

main().catch(err => {
  console.error('Loan scraper failed:', err.message);
  process.exit(1);
});
