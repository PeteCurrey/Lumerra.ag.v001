const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const axios = require('axios');

const products = [
  // Platinum Spas
  { term: 'site:platinum-spas.com Palermo hot tub', file: 'palermo-hero.jpg' },
  { term: 'site:platinum-spas.com Santorini hot tub', file: 'santorini-hero.jpg' },
  { term: 'site:platinum-spas.com Positano hot tub', file: 'positano-hero.jpg' },
  { term: 'site:platinum-spas.com Capri hot tub', file: 'capri-hero.jpg' },
  { term: 'site:platinum-spas.com Sicily hot tub', file: 'sicily-hero.jpg' },
  { term: 'site:platinum-spas.com Barcelona hot tub', file: 'barcelona-hero.jpg' },
  { term: 'site:platinum-spas.com Oslo hot tub', file: 'oslo-hero.jpg' },
  { term: 'site:platinum-spas.com St Tropez hot tub', file: 'st-tropez-hero.jpg' },
  { term: 'site:platinum-spas.com Tahiti hot tub', file: 'tahiti-hero.jpg' },
  
  // AquaSolus
  { term: 'site:aquasolus.com Eros swim spa', file: 'eros-hero.jpg' },
  { term: 'site:aquasolus.com Helios swim spa', file: 'helios-hero.jpg' },
  
  // Portcril
  { term: 'site:portcril.com Vacation Lounge hot tub', file: 'vacation-lounge-hero.jpg' },
  { term: 'site:portcril.com Calma hot tub', file: 'calma-hero.jpg' },
  { term: 'site:portcril.com Aspen hot tub', file: 'aspen-hero.jpg' },
  { term: 'site:portcril.com Brook hot tub', file: 'brook-hero.jpg' },
  { term: 'site:portcril.com Eden hot tub', file: 'eden-hero.jpg' },
  { term: 'site:portcril.com Zenith hot tub', file: 'zenith-hero.jpg' },
  { term: 'site:portcril.com Serenity hot tub', file: 'serenity-hero.jpg' },
  { term: 'site:portcril.com Vacation Brook hot tub', file: 'vacation-brook-hero.jpg' },
  { term: 'site:portcril.com Lounge Divine hot tub', file: 'lounge-divine-hero.jpg' },
  { term: 'site:portcril.com Mirage 3020 swim spa', file: 'mirage-3020-hero.jpg' },
  { term: 'site:portcril.com Diva Pool 42 plunge pool', file: 'diva-pool-42-hero.jpg' },
  { term: 'site:portcril.com Ria hot tub', file: 'ria-hero.jpg' },

  // Chill Tubs
  { term: 'site:chilltubs.com Chill Tub Original', file: 'chill-tub-original-hero.jpg' },

  // Hekla Saunas
  { term: 'site:heklasaunas.com Barrel Sauna 4 Person', file: 'hekla-barrel-4-hero.jpg' },
  { term: 'site:heklasaunas.com Barrel Sauna 6 Person', file: 'hekla-barrel-6-hero.jpg' },
  { term: 'site:heklasaunas.com Cube Sauna', file: 'hekla-cube-hero.jpg' },
  { term: 'site:heklasaunas.com Infrared Cabin', file: 'hekla-infrared-hero.jpg' },

  // Polar Recovery
  { term: 'site:polar-recovery.com Arctic Pro Inflatable', file: 'arctic-pro-hero.jpg' },
  
  // Brass Monkey
  { term: 'site:brassmonkey.co.uk Zen Chiller System', file: 'zen-chiller-hero.jpg' }
];

const DIR = path.join(__dirname, '../public/images/products');

async function downloadImage(url, filename) {
  try {
    if (!fs.existsSync(DIR)) {
      fs.mkdirSync(DIR, { recursive: true });
    }
    const dest = path.join(DIR, filename);
    if (fs.existsSync(dest)) {
      console.log(`[SKIP] ${filename} already exists.`);
      return true;
    }
    const response = await axios({ url, responseType: 'stream', timeout: 10000 });
    return new Promise((resolve, reject) => {
      const writer = fs.createWriteStream(dest);
      response.data.pipe(writer);
      let error = null;
      writer.on('error', err => {
        error = err;
        writer.close();
        reject(err);
      });
      writer.on('close', () => {
        if (!error) resolve(true);
      });
    });
  } catch (err) {
    console.error(`[DOWNLOAD ERROR] Failed to download ${url}:`, err.message);
    return false;
  }
}

async function scrape() {
  const browser = await puppeteer.launch({ headless: "new", args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36');

  for (const product of products) {
    try {
      console.log(`\nSearching for: ${product.term}`);
      const searchUrl = `https://www.bing.com/images/search?q=${encodeURIComponent(product.term)}&form=HDRSC3`;
      await page.goto(searchUrl, { waitUntil: 'domcontentloaded', timeout: 15000 });
      
      // Wait for image results
      await page.waitForSelector('img.mimg', { timeout: 5000 }).catch(() => {});
      
      const imageUrls = await page.evaluate(() => {
        const imgs = Array.from(document.querySelectorAll('img.mimg'));
        return imgs.map(img => img.src || img.getAttribute('data-src')).filter(src => src && src.startsWith('http'));
      });

      if (imageUrls.length > 0) {
        console.log(`Found image: ${imageUrls[0]}`);
        const success = await downloadImage(imageUrls[0], product.file);
        if (success) {
          console.log(`[SUCCESS] Saved to ${product.file}`);
        }
      } else {
        console.log(`[FAILED] No images found for ${product.term}`);
      }
      
      // Delay to avoid rate limiting
      await new Promise(r => setTimeout(r, 2000));
    } catch (err) {
      console.error(`[ERROR] Processing ${product.term}:`, err.message);
    }
  }

  await browser.close();
}

scrape().then(() => console.log('Done.')).catch(console.error);
