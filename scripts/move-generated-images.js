const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const sourceDir = 'C:\\Users\\pete\\.gemini\\antigravity\\brain\\d84c5f5b-7571-4025-a263-612a6eddbd71';
const destDir = 'C:\\Users\\pete\\OneDrive\\Desktop\\Lumerra\\public\\images\\products';

const mappings = [
  { src: 'portofino_hero_1777212721840.png', dest: 'portofino-hero.jpeg' },
  { src: 'capri_hero_1777212970420.png', dest: 'capri-hero.jpeg' },
  { src: 'santorini_hero_1777213068929.png', dest: 'santorini-hero.jpeg' },
  { src: 'hekla_cube_hero_1777213216233.png', dest: 'hekla-cube-hero.jpeg' },
  { src: 'palermo_hero_1777213379666.png', dest: 'palermo-hero.jpeg' },
  { src: 'chill_tub_original_hero_1777213481892.png', dest: 'chill-tub-original-hero.jpeg' }
];

async function processImages() {
  for (const mapping of mappings) {
    const srcPath = path.join(sourceDir, mapping.src);
    const destPath = path.join(destDir, mapping.dest);
    
    if (fs.existsSync(srcPath)) {
      console.log(`Processing ${mapping.src} -> ${mapping.dest}`);
      await sharp(srcPath)
        .jpeg({ quality: 90 })
        .toFile(destPath);
      console.log(`[SUCCESS] Saved ${mapping.dest}`);
    } else {
      console.error(`[ERROR] Source file not found: ${srcPath}`);
    }
  }
}

processImages().then(() => console.log('Done.'));
