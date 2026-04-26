const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../data/products.ts');
let content = fs.readFileSync(filePath, 'utf8');

// Match products and their slugs to rebuild heroImageUrl
// This is a bit complex with regex, so I'll do a line-by-line or safer replace
const lines = content.split('\n');
let currentSlug = '';
const updatedLines = lines.map(line => {
  const slugMatch = line.match(/slug:\s+'([^']+)'/);
  if (slugMatch) {
    currentSlug = slugMatch[1];
  }
  
  if (line.includes('heroImageUrl:') && currentSlug) {
    return `    heroImageUrl: '/images/products/${currentSlug}-hero.jpeg',`;
  }
  return line;
});

fs.writeFileSync(filePath, updatedLines.join('\n'));
console.log('Successfully repaired products.ts image paths.');
