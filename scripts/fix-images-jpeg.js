const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const dir = path.join(__dirname, '../public/images/products');

async function fixImages() {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    if (file.endsWith('.jpg')) {
      const filePath = path.join(dir, file);
      const newFilePath = path.join(dir, file.replace('.jpg', '.jpeg'));
      try {
        const buffer = fs.readFileSync(filePath);
        await sharp(buffer).jpeg().toFile(newFilePath);
        console.log(`[SUCCESS] Converted ${file} to ${newFilePath}`);
      } catch (err) {
        console.error(`[ERROR] Failed to convert ${file}:`, err.message);
      }
    }
  }
}

fixImages().then(() => console.log('Done.'));
