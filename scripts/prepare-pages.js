const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const outDir = path.join(root, 'build');

function copyRecursive(src, dest) {
  if (!fs.existsSync(src)) return;
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
    for (const item of fs.readdirSync(src)) {
      copyRecursive(path.join(src, item), path.join(dest, item));
    }
  } else {
    const dir = path.dirname(dest);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.copyFileSync(src, dest);
  }
}

function main() {
  if (fs.existsSync(outDir)) fs.rmSync(outDir, { recursive: true, force: true });
  fs.mkdirSync(outDir, { recursive: true });

  // Required files/directories for the static site
  const items = [
    'index.html',
    'dist',
    'src',
    'resume',
  ];

  for (const item of items) {
    copyRecursive(path.join(root, item), path.join(outDir, item));
  }

  // Small README for the artifact root
  fs.writeFileSync(
    path.join(outDir, 'README.txt'),
    'This folder is the static artifact published to GitHub Pages.'
  );
}

main();


