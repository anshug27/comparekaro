import { createCanvas, GlobalFonts } from '@napi-rs/canvas';
import { writeFileSync, mkdirSync } from 'fs';

mkdirSync('public/og', { recursive: true });

function createOGImage(filename, { title, subtitle, emoji, gradient }) {
  const w = 1200, h = 630;
  const canvas = createCanvas(w, h);
  const ctx = canvas.getContext('2d');

  // Background
  const bg = ctx.createLinearGradient(0, 0, w, h);
  bg.addColorStop(0, gradient[0]);
  bg.addColorStop(1, gradient[1]);
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  // Subtle grid pattern
  ctx.strokeStyle = 'rgba(255,255,255,0.04)';
  ctx.lineWidth = 1;
  for (let x = 0; x < w; x += 60) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke(); }
  for (let y = 0; y < h; y += 60) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke(); }

  // Glow circles
  const glow1 = ctx.createRadialGradient(200, 150, 0, 200, 150, 300);
  glow1.addColorStop(0, 'rgba(99,102,241,0.25)');
  glow1.addColorStop(1, 'transparent');
  ctx.fillStyle = glow1;
  ctx.fillRect(0, 0, w, h);

  const glow2 = ctx.createRadialGradient(900, 450, 0, 900, 450, 250);
  glow2.addColorStop(0, 'rgba(236,72,153,0.2)');
  glow2.addColorStop(1, 'transparent');
  ctx.fillStyle = glow2;
  ctx.fillRect(0, 0, w, h);

  // Emoji
  ctx.font = '80px serif';
  ctx.fillText(emoji, 80, 180);

  // Title
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 52px sans-serif';
  // Word wrap
  const words = title.split(' ');
  let line = '';
  let y = 280;
  for (const word of words) {
    const test = line + word + ' ';
    const metrics = ctx.measureText(test);
    if (metrics.width > w - 160 && line) {
      ctx.fillText(line.trim(), 80, y);
      line = word + ' ';
      y += 65;
    } else {
      line = test;
    }
  }
  ctx.fillText(line.trim(), 80, y);

  // Subtitle
  ctx.fillStyle = 'rgba(255,255,255,0.6)';
  ctx.font = '24px sans-serif';
  const subWords = subtitle.split(' ');
  line = '';
  y += 60;
  for (const word of subWords) {
    const test = line + word + ' ';
    if (ctx.measureText(test).width > w - 160 && line) {
      ctx.fillText(line.trim(), 80, y);
      line = word + ' ';
      y += 35;
    } else {
      line = test;
    }
  }
  ctx.fillText(line.trim(), 80, y);

  // Brand bar at bottom
  ctx.fillStyle = 'rgba(0,0,0,0.3)';
  ctx.fillRect(0, h - 70, w, 70);
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 22px sans-serif';
  ctx.fillText('CompareKaro', 80, h - 28);
  ctx.fillStyle = 'rgba(255,255,255,0.5)';
  ctx.font = '18px sans-serif';
  ctx.fillText('comparekaro.download', w - 280, h - 28);

  // Accent line
  const accent = ctx.createLinearGradient(0, h - 70, w, h - 70);
  accent.addColorStop(0, '#6366f1');
  accent.addColorStop(1, '#ec4899');
  ctx.fillStyle = accent;
  ctx.fillRect(0, h - 72, w, 2);

  writeFileSync(`public/og/${filename}`, canvas.toBuffer('image/png'));
  console.log(`Created: public/og/${filename}`);
}

// Default / Homepage
createOGImage('default.png', {
  title: 'CompareKaro - Smart Comparison Tools for India',
  subtitle: 'Compare phones, calculate EMI, SIP, find best mobile plans, and 20+ free tools. Made for India.',
  emoji: '✅',
  gradient: ['#0a0a2e', '#1a0a2e'],
});

// Phone Comparison
createOGImage('phones.png', {
  title: 'Compare 100+ Phones with Real Amazon & Flipkart Prices',
  subtitle: 'Samsung, Apple, OnePlus, Xiaomi, Vivo, Realme — side-by-side specs and prices from trusted retailers.',
  emoji: '📱',
  gradient: ['#0a1628', '#0a0a2e'],
});

// Tools
createOGImage('tools.png', {
  title: 'Free Online Tools & Calculators for India',
  subtitle: 'EMI Calculator, SIP Calculator, FD Calculator, GST Calculator, BMI Calculator, Currency Converter & more.',
  emoji: '🛠️',
  gradient: ['#0a0a2e', '#1a0a20'],
});

// Finance
createOGImage('finance.png', {
  title: 'Financial Calculators - EMI, SIP, FD, Tax, GST',
  subtitle: 'Free financial tools for Indian users. Calculate EMI, SIP returns, FD maturity, income tax, and GST.',
  emoji: '💰',
  gradient: ['#0a1a1a', '#0a0a2e'],
});

// Study
createOGImage('study.png', {
  title: 'AI Study Tools - Quiz, Flashcards, Summarizer, Math Solver',
  subtitle: 'Free AI-powered study tools for JEE, NEET, UPSC, Board Exams. Powered by StudyGenie & Google Gemini.',
  emoji: '🎓',
  gradient: ['#0a1a1a', '#0a2a1a'],
});

// Compare / Laptops
createOGImage('laptops.png', {
  title: 'Compare Laptops & Tablets Side by Side',
  subtitle: 'MacBook, Dell, HP, Lenovo, ASUS laptops and iPad, Samsung tablets — specs, prices, and recommendations.',
  emoji: '💻',
  gradient: ['#1a0a28', '#0a0a2e'],
});

// Cars
createOGImage('cars.png', {
  title: 'Compare Cars - Specs, Mileage & Prices',
  subtitle: 'Maruti, Hyundai, Tata, Mahindra, Kia, Toyota — compare 28+ cars side by side with real prices.',
  emoji: '🚗',
  gradient: ['#1a1a0a', '#0a0a2e'],
});

console.log('\nAll OG images generated!');
