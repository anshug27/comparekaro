/**
 * Gold & Silver Price Scraper
 * Source: goodreturns.in
 * Updates src/pages/tools/gold-silver-price.astro with live prices
 */

import * as cheerio from 'cheerio';
import { readFileSync, writeFileSync } from 'fs';

const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

async function fetchGoldPrices() {
  console.log('Fetching gold prices from goodreturns.in...');

  const res = await fetch('https://www.goodreturns.in/gold-rates/', {
    headers: { 'User-Agent': UA },
    signal: AbortSignal.timeout(15000),
  });

  const html = await res.text();
  const $ = cheerio.load(html);

  // The intro paragraph contains: "₹14,804 per gram for 24 karat ... ₹13,570 per gram for 22 karat ... ₹11,103 per gram for 18 karat"
  const introText = $('#gr_intro_content').text() || $('body').text();

  // Extract prices from intro text
  const match24k = introText.match(/₹([\d,]+)\s*per\s*gram\s*for\s*24\s*karat/i)
    || introText.match(/&#8377;([\d,]+)\s*per\s*gram\s*for\s*24\s*karat/i);
  const match22k = introText.match(/₹([\d,]+)\s*per\s*gram\s*for\s*22\s*karat/i)
    || introText.match(/&#8377;([\d,]+)\s*per\s*gram\s*for\s*22\s*karat/i);
  const match18k = introText.match(/₹([\d,]+)\s*per\s*gram\s*for\s*18\s*karat/i)
    || introText.match(/&#8377;([\d,]+)\s*per\s*gram\s*for\s*18\s*karat/i);

  const gold24k = match24k ? parseInt(match24k[1].replace(/,/g, '')) : null;
  const gold22k = match22k ? parseInt(match22k[1].replace(/,/g, '')) : null;
  const gold18k = match18k ? parseInt(match18k[1].replace(/,/g, '')) : null;

  console.log(`  24K: ₹${gold24k}/g, 22K: ₹${gold22k}/g, 18K: ₹${gold18k}/g`);

  // Now fetch silver price
  console.log('Fetching silver prices...');
  const silverRes = await fetch('https://www.goodreturns.in/silver-rates/', {
    headers: { 'User-Agent': UA },
    signal: AbortSignal.timeout(15000),
  });
  const silverHtml = await silverRes.text();
  const $s = cheerio.load(silverHtml);
  const silverIntro = $s('#gr_intro_content').text() || $s('body').text();

  // "₹97,000 per kg" or "₹97 per gram"
  const silverPerKg = silverIntro.match(/₹([\d,]+)\s*per\s*kg/i)
    || silverIntro.match(/&#8377;([\d,]+)\s*per\s*kg/i);
  const silverPerGram = silverIntro.match(/₹([\d,]+)\s*per\s*gram/i)
    || silverIntro.match(/&#8377;([\d,]+)\s*per\s*gram/i);

  let silver;
  if (silverPerGram) {
    silver = parseInt(silverPerGram[1].replace(/,/g, ''));
  } else if (silverPerKg) {
    silver = Math.round(parseInt(silverPerKg[1].replace(/,/g, '')) / 1000);
  }

  console.log(`  Silver: ₹${silver}/g`);

  if (!gold24k || !gold22k || !gold18k) {
    console.error('ERROR: Could not parse gold prices. Aborting.');
    process.exit(1);
  }

  return { gold24k, gold22k, gold18k, silver: silver || 97 };
}

function updateAstroFile(prices) {
  const filePath = 'src/pages/tools/gold-silver-price.astro';
  let content = readFileSync(filePath, 'utf-8');

  const today = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

  content = content.replace(/const gold24k = \d+;/, `const gold24k = ${prices.gold24k};`);
  content = content.replace(/const gold22k = \d+;/, `const gold22k = ${prices.gold22k};`);
  content = content.replace(/const gold18k = \d+;/, `const gold18k = ${prices.gold18k};`);
  content = content.replace(/const silver = \d+;/, `const silver = ${prices.silver};`);
  content = content.replace(/const lastUpdated = '[^']+';/, `const lastUpdated = '${today}';`);

  writeFileSync(filePath, content, 'utf-8');
  console.log(`\n✓ Updated ${filePath}`);
  console.log(`  Gold 24K: ₹${prices.gold24k}/g | 22K: ₹${prices.gold22k}/g | 18K: ₹${prices.gold18k}/g`);
  console.log(`  Silver: ₹${prices.silver}/g`);
  console.log(`  Date: ${today}`);
}

const prices = await fetchGoldPrices();
updateAstroFile(prices);
