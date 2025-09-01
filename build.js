#!/usr/bin/env node

// Simple build script for Vercel deployment
const { exec } = require('child_process');
const path = require('path');

console.log('Starting Vercel build process...');

// Change to client directory and build
process.chdir(path.join(__dirname, 'client'));

console.log('Installing client dependencies...');
exec('npm install', (error1, stdout1, stderr1) => {
  if (error1) {
    console.error(`Error installing dependencies: ${error1}`);
    process.exit(1);
  }
  
  console.log('Building client...');
  exec('npx vite build --mode production --outDir ../dist/public', (error2, stdout2, stderr2) => {
    if (error2) {
      console.error(`Error building client: ${error2}`);
      process.exit(1);
    }
    
    console.log('Build completed successfully!');
    console.log(stdout2);
  });
});