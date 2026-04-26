const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const dir = path.join(__dirname, '../public/images/products');

async function fixImages() {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    if (file.endsWith('.jpg')) {
      const filePath = path.join(dir, file);
      const tempPath = path.join(dir, 'temp_' + file);
      try {
        console.log(`Converting ${file}...`);
        await sharp(filePath).jpeg().toFile(tempPath);
        fs.unlinkSync(filePath);
        fs.renameSync(tempPath, filePath);
        console.log(`[SUCCESS] Fixed ${file}`);
      } catch (err) {
        console.error(`[ERROR] Failed to convert ${file}:`, err.message);
        if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
      }
    }
  }
}

fixImages().then(() => console.log('Done.'));
