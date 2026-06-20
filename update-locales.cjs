const fs = require('fs');
const path = require('path');

const localesDir = path.join(__dirname, 'src', 'locales');
let inputData = '';

process.stdin.on('data', chunk => {
  inputData += chunk;
});

process.stdin.on('end', () => {
  try {
    const newStrings = JSON.parse(inputData);
    for (const [lang, strings] of Object.entries(newStrings)) {
      const filePath = path.join(localesDir, `${lang}.json`);
      let existing = {};
      if (fs.existsSync(filePath)) {
        existing = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
      }
      const merged = { ...existing, ...strings };
      fs.writeFileSync(filePath, JSON.stringify(merged, null, 2));
    }
    console.log('Locales updated successfully.');
  } catch (err) {
    console.error('Failed to parse or write JSON:', err);
    process.exit(1);
  }
});
