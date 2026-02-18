#!/usr/bin/env node

/**
 * Script to create a new Granular app using local development packages.
 * Use this when developing Granular itself.
 * 
 * Usage: node scripts/create-local.js [project-name]
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

const projectName = process.argv[2] || 'my-granular-app';
const projectPath = path.resolve(process.cwd(), projectName);
const templateDir = path.join(ROOT, 'template');

if (fs.existsSync(projectPath)) {
  console.error(`Error: Directory "${projectName}" already exists.`);
  process.exit(1);
}

console.log(`\nCreating local Granular app: ${projectName}\n`);

copyDir(templateDir, projectPath);

const packageLocal = path.join(projectPath, 'package.local.json');
const viteLocal = path.join(projectPath, 'vite.config.local.js');
if (!fs.existsSync(packageLocal) || !fs.existsSync(viteLocal)) {
  console.error('Error: Template is missing package.local.json or vite.config.local.js.');
  process.exit(1);
}

fs.unlinkSync(path.join(projectPath, 'package.json'));
fs.unlinkSync(path.join(projectPath, 'vite.config.js'));

fs.renameSync(packageLocal, path.join(projectPath, 'package.json'));
fs.renameSync(viteLocal, path.join(projectPath, 'vite.config.js'));

const pkgPath = path.join(projectPath, 'package.json');
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
pkg.name = projectName;
fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');

console.log('Installing dependencies...\n');
try {
  execSync('npm install', { cwd: projectPath, stdio: 'inherit' });
} catch (e) {
  console.log('\nRun "npm install" manually in the project directory.\n');
}

console.log(`
Done! To get started:

  cd ${projectName}
  npm run dev

`);
