const fs = require('fs');
const path = require('path');

const sectionsDir = path.join(__dirname, 'src', 'components', 'sections');
const uiDir = path.join(__dirname, 'src', 'components', 'ui');
const filesToProcess = [];

function findFiles(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      findFiles(fullPath);
    } else if (fullPath.endsWith('.tsx')) {
      filesToProcess.push(fullPath);
    }
  }
}

findFiles(sectionsDir);
findFiles(uiDir);

let changedFilesCount = 0;

for (const file of filesToProcess) {
  let content = fs.readFileSync(file, 'utf8');
  const original = content;

  // Remove animate={{ y: [0, -10, 0] }}
  // Remove animate={{ y: [0, -8, 0] }}
  // Also remove transition if it immediately follows, or just let them stay but harmless.
  // Actually, we can just remove the animate prop.
  content = content.replace(/animate=\{\{\s*y:\s*\[0,\s*-\d+,\s*0\]\s*(?:,\s*rotateY:\s*\[0,\s*180,\s*360\]\s*)?\}\}/g, '');
  
  // Remove anim-float and anim-float-delayed from classNames
  content = content.replace(/\banim-float-delayed\b/g, '');
  content = content.replace(/\banim-float\b/g, '');

  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    console.log('Cleaned:', file);
    changedFilesCount++;
  }
}

console.log('Total files cleaned:', changedFilesCount);
