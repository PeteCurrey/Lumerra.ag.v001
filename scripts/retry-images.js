const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const axios = require('axios');

const products = [
  { term: 'Portcril Calma hot tub', file: 'calma-hero.jpg' },
  { term: 'Portcril Aspen hot tub', file: 'aspen-hero.jpg' },
  { term: 'Portcril Brook hot tub', file: 'brook-hero.jpg' },
  { term: 'Portcril Eden hot tub', file: 'eden-hero.jpg' },
  { term: 'Portcril Zenith hot tub', file: 'zenith-hero.jpg' },
  { term: 'Portcril Serenity hot tub', file: 'serenity-hero.jpg' },
  { term: 'Portcril Vacation Brook hot tub', file: 'vacation-brook-hero.jpg' },
  { term: 'Portcril Ria hot tub', file: 'ria-hero.jpg' },
  { term: 'Hekla Infrared Cabin sauna', file: 'hekla-infrared-hero.jpg' },
  { term: 'Polar Recovery Arctic Pro Inflatable', file: 'arctic-pro-hero.jpg' },
  { term: 'Brass Monkey Zen Chiller System', file: 'zen-chiller-hero.jpg' }
];

const DIR = path.join(__dirname, '../public/images/products');

async function downloadImage(url, filename) {
  try {
    const dest = path.join(DIR, filename);
    const response = await axios({ url, responseType: 'stream', timeout: 10000 });
    return new Promise((resolve, reject) => {
      const writer = fs.createWriteStream(dest);
      response.data.pipe(writer);
      let error = null;
      writer.on('error', err => { error = err; writer.close(); reject(err); });
      writer.on('close', () => { if (!error) resolve(true); });
    });
  } catch (err) { return false; }
}

async function scrape() {
  const browser = await puppeteer.launch({ headless: "new", args: ['--no-sandbox'] });
  const page = await browser.newPage();
  
  for (const product of products) {
    try {
      console.log(`Searching for: ${product.term}`);
      const searchUrl = `https://www.bing.com/images/search?q=${encodeURIComponent(product.term)}&form=HDRSC3`;
      await page.goto(searchUrl, { waitUntil: 'domcontentloaded', timeout: 15000 });
      await page.waitForSelector('img.mimg', { timeout: 5000 }).catch(() => {});
      
      const imageUrls = await page.evaluate(() => {
        const imgs = Array.from(document.querySelectorAll('img.mimg'));
        return imgs.map(img => img.src || img.getAttribute('data-src')).filter(src => src && src.startsWith('http'));
      });

      if (imageUrls.length > 0) {
        await downloadImage(imageUrls[0], product.file);
        console.log(`[SUCCESS] Saved ${product.file}`);
      } else {
        console.log(`[FAILED] ${product.term}`);
      }
      await new Promise(r => setTimeout(r, 2000));
    } catch (err) {
      console.log(`[ERROR] ${product.term}`);
    }
  }
  await browser.close();
}

scrape().then(() => console.log('Done.'));
