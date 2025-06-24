#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

// Ensure dist directory exists
if (!fs.existsSync('dist')) {
  console.error('❌ dist directory not found. Run "npm run build" first.');
  process.exit(1);
}

// Create ZIP file
const output = fs.createWriteStream('dist/copy-docs.zip');
const archive = archiver('zip', {
  zlib: { level: 9 } // Maximum compression
});

output.on('close', () => {
  const sizeInMB = (archive.pointer() / 1024 / 1024).toFixed(2);
  console.log(`🎉 Extension packaged successfully!`);
  console.log(`📦 Size: ${sizeInMB} MB (${archive.pointer()} bytes)`);
  console.log(`📁 Package: dist/copy-docs.zip`);
});

archive.on('error', (err) => {
  console.error('❌ Error creating package:', err);
  process.exit(1);
});

archive.pipe(output);

// Add all files from dist directory except the zip file itself
archive.directory('dist/', false, (data) => {
  // Exclude the zip file itself and any other unwanted files
  if (data.name.endsWith('.zip') || data.name.startsWith('.')) {
    return false;
  }
  return data;
});

archive.finalize();