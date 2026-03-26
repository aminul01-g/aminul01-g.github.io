const fs = require('fs');
const path = require('path');

const dirs = [
  path.join(__dirname, 'src', 'components'),
  path.join(__dirname, 'src', 'pages')
];

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // Replace text-gray-XXX, dark:text-gray-XXX, text-gray-XXX/YY, dark:text-white
  // with text-[var(--text-color)] for safe inheritance, EXCEPT in obvious buttons
  
  // A safe regex to replace these text colors if they are inside className=""
  // We'll replace them with text-[var(--text-color)]
  const regex = /\b(text-gray-\d{2,3}(?:\/\d{2})?|dark:text-gray-\d{2,3}|dark:text-white|text-white(?!\/))\b/g;
  
  // We need to be careful with text-white inside buttons which have gradients.
  // Actually, replacing text-white with text-[var(--text-color)] is fine for layout,
  // but if a button has bg-gradient it should remain white.
  // We will do a manual replace for the exact problematic strings we found in grep.

  content = content.replace(/text-gray-900\s+dark:text-white/g, 'text-[var(--text-color)]');
  content = content.replace(/text-gray-800\s+dark:text-white/g, 'text-[var(--text-color)]');
  content = content.replace(/text-gray-800\s+dark:text-gray-200/g, 'text-[var(--text-color)]');
  content = content.replace(/text-gray-700\s+dark:text-gray-200/g, 'text-[var(--text-color)]');
  content = content.replace(/text-gray-700\s+dark:text-gray-300/g, 'text-[var(--text-color)]');
  content = content.replace(/text-gray-600\s+dark:text-gray-300/g, 'text-[var(--text-color)] text-opacity-80');
  content = content.replace(/text-gray-600\s+dark:text-gray-400/g, 'text-[var(--text-color)] text-opacity-70');
  content = content.replace(/text-gray-500\s+dark:text-gray-300/g, 'text-[var(--text-color)] text-opacity-70');
  content = content.replace(/text-gray-500\s+dark:text-gray-400/g, 'text-[var(--text-color)] text-opacity-60');
  
  // Remove standalone dark:text-gray-xxx
  content = content.replace(/\bdark:text-white\b/g, 'text-[var(--text-color)]');
  content = content.replace(/\bdark:text-gray-[0-9]{3}\b/g, '');

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated: ${path.relative(__dirname, filePath)}`);
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
console.log('Sweep complete.');
