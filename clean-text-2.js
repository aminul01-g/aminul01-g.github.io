const fs = require('fs');
const path = require('path');

const dirs = [
  path.join(__dirname, 'src', 'components'),
  path.join(__dirname, 'src', 'pages')
];

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // Replace raw text-gray utilities with dynamic opacity mapping
  content = content.replace(/\btext-gray-200\b/g, 'text-[var(--theme-text-primary)] text-opacity-90');
  content = content.replace(/\btext-gray-300\b/g, 'text-[var(--theme-text-primary)] text-opacity-80');
  content = content.replace(/\btext-gray-400\b/g, 'text-[var(--theme-text-primary)] text-opacity-70');
  content = content.replace(/\btext-gray-500\b/g, 'text-[var(--theme-text-primary)] text-opacity-60');
  content = content.replace(/\btext-gray-600\b/g, 'text-[var(--theme-text-primary)] text-opacity-60');
  content = content.replace(/\btext-gray-700\b/g, 'text-[var(--theme-text-primary)]');
  content = content.replace(/\btext-gray-800\b/g, 'text-[var(--theme-text-primary)]');
  content = content.replace(/\btext-gray-900\b/g, 'text-[var(--theme-text-primary)]');
  
  // Headers explicitly using text-white
  content = content.replace(/\btext-white drop-shadow-/g, 'text-[var(--theme-text-primary)] drop-shadow-');
  
  // Specific Opacity replacements text-white/50 -> text-[var(--theme-text-primary)] text-opacity-50
  content = content.replace(/\btext-white\/([0-9]{2})\b/g, (match, op) => `text-[var(--theme-text-primary)] text-opacity-[0.${op}]`);

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated 2nd Pass: ${path.relative(__dirname, filePath)}`);
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
console.log('Pass 2 Complete.');
