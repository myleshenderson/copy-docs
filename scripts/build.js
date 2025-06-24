#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Read package.json to get version
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const version = packageJson.version;

// Read manifest.json
const manifestPath = 'manifest.json';
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

// Update manifest version to match package.json
manifest.version = version;

// Write updated manifest
fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));

console.log(`✅ Updated manifest.json version to ${version}`);

// Create dist directory
const distDir = 'dist';
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// Copy all necessary files to dist directory
const filesToCopy = [
  'manifest.json',
  'content.js',
  'background.js',
  'popup.html',
  'popup.js',
  'styles.css',
  'sites/',
  'icons/'
];

function copyRecursive(src, dest) {
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    const files = fs.readdirSync(src);
    files.forEach(file => {
      copyRecursive(path.join(src, file), path.join(dest, file));
    });
  } else {
    fs.copyFileSync(src, dest);
  }
}

filesToCopy.forEach(file => {
  const srcPath = file;
  const destPath = path.join(distDir, file);
  
  if (fs.existsSync(srcPath)) {
    if (fs.statSync(srcPath).isDirectory()) {
      copyRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
    console.log(`✅ Copied ${file} to dist/`);
  } else {
    console.log(`⚠️  File not found: ${file}`);
  }
});

console.log(`🎉 Build complete! Extension built in dist/ directory`);