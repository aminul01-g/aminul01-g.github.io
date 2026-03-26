const fs = require('fs');
const path = require('path');

const dirs = [
  path.join(__dirname, 'src', 'components'),
  path.join(__dirname, 'src', 'pages')
];

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // Replace the wrong variable --text-color with the correct --theme-text-primary
  content = content.replace(/var\(--text-color\)/g, 'var(--theme-text-primary)');

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated CSS variable to --theme-text-primary in: ${path.relative(__dirname, filePath)}`);
  }
}

function traverse(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      traverse(fullPath);
    } else if (fullPath.endsWith('.tsx')) {
      processFile(fullPath);
    }
  }
}

dirs.forEach(traverse);
console.log('Pass 3 Complete.');
