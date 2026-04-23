#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const COLORS = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
  green: '\x1b[32m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
};

const log = {
  info: (msg) => console.log(`${COLORS.cyan}${msg}${COLORS.reset}`),
  success: (msg) => console.log(`${COLORS.green}${COLORS.bold}${msg}${COLORS.reset}`),
  warn: (msg) => console.log(`${COLORS.yellow}${msg}${COLORS.reset}`),
  error: (msg) => console.log(`${COLORS.red}${msg}${COLORS.reset}`),
  step: (msg) => console.log(`${COLORS.dim}  ${msg}${COLORS.reset}`),
};

function printBanner() {
  console.log(`
${COLORS.bold}${COLORS.blue}
   ██████╗ ██████╗  █████╗ ███╗   ██╗██╗   ██╗██╗      █████╗ ██████╗ 
  ██╔════╝ ██╔══██╗██╔══██╗████╗  ██║██║   ██║██║     ██╔══██╗██╔══██╗
  ██║  ███╗██████╔╝███████║██╔██╗ ██║██║   ██║██║     ███████║██████╔╝
  ██║   ██║██╔══██╗██╔══██║██║╚██╗██║██║   ██║██║     ██╔══██║██╔══██╗
  ╚██████╔╝██║  ██║██║  ██║██║ ╚████║╚██████╔╝███████╗██║  ██║██║  ██║
   ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝ ╚═════╝ ╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝
${COLORS.reset}
  ${COLORS.dim}JS-first framework with granular reactivity${COLORS.reset}
`);
}

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

function updatePackageJson(projectPath, projectName) {
  const pkgPath = path.join(projectPath, 'package.json');
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
  pkg.name = projectName;
  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');
}

function parseArgs(argv) {
  const flags = {};
  let projectName = null;
  for (const arg of argv) {
    if (arg.startsWith('--')) {
      const [key, val] = arg.slice(2).split('=');
      flags[key] = val ?? true;
    } else if (!projectName) {
      projectName = arg;
    }
  }
  return { projectName, flags };
}

async function main() {
  printBanner();

  const { projectName: rawName, flags } = parseArgs(process.argv.slice(2));
  const useSSR = !!flags.ssr;
  const useJSX = !!flags.jsx;
  let projectName = rawName;

  if (flags.help) {
    console.log(`  Usage: create-granular-app [project-name] [options]\n`);
    console.log(`  Options:`);
    console.log(`    --jsx     Scaffold a JSX SPA app (uses @granularjs/jsx)`);
    console.log(`    --ssr     Scaffold an SSR-ready app (Express + Vite SSR)`);
    console.log(`    --help    Show this help message\n`);
    process.exit(0);
  }

  if (useJSX && useSSR) {
    log.error('Error: --jsx and --ssr are mutually exclusive (for now).');
    process.exit(1);
  }

  if (!projectName) {
    projectName = 'my-granular-app';
    log.warn(`No project name specified, using "${projectName}"`);
  }

  const projectPath = path.resolve(process.cwd(), projectName);

  if (fs.existsSync(projectPath)) {
    log.error(`Error: Directory "${projectName}" already exists.`);
    process.exit(1);
  }

  const templateName = useSSR ? 'template-ssr' : useJSX ? 'template-jsx' : 'template';
  const label = useSSR ? 'SSR' : useJSX ? 'JSX SPA' : 'SPA';

  log.info(`\nCreating a new Granular ${label} app in ${COLORS.bold}${projectPath}${COLORS.reset}\n`);

  const templateDir = path.join(__dirname, '..', templateName);

  if (!fs.existsSync(templateDir)) {
    log.error(`Error: Template "${templateName}" not found.`);
    process.exit(1);
  }

  log.step('Copying template files...');
  copyDir(templateDir, projectPath);

  const packageLocal = path.join(projectPath, 'package.local.json');
  const viteLocal = path.join(projectPath, 'vite.config.local.js');
  if (fs.existsSync(packageLocal)) fs.unlinkSync(packageLocal);
  if (fs.existsSync(viteLocal)) fs.unlinkSync(viteLocal);

  log.step('Updating package.json...');
  updatePackageJson(projectPath, projectName);

  log.step('Installing dependencies...');
  try {
    execSync('npm install', {
      cwd: projectPath,
      stdio: 'inherit'
    });
  } catch (e) {
    log.warn('\nCould not install dependencies automatically.');
    log.warn('Please run "npm install" manually in the project directory.\n');
  }

  log.success(`\nSuccess! Your Granular ${label} app is ready.\n`);

  console.log(`  ${COLORS.bold}cd ${projectName}${COLORS.reset}`);
  console.log(`  ${COLORS.bold}npm run dev${COLORS.reset}\n`);

  if (useSSR) {
    console.log(`${COLORS.dim}  Dev server runs on http://localhost:3000 with SSR.`);
    console.log(`  Build for production: npm run build`);
    console.log(`  Run production server: npm run serve${COLORS.reset}\n`);
  }

  console.log(`${COLORS.dim}  Happy coding with Granular!${COLORS.reset}\n`);
}

main().catch((err) => {
  log.error(err.message);
  process.exit(1);
});
