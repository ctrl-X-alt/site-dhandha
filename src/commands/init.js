/**
 * @fileoverview Scans local developer environments to verify framework configurations
 * and initializes target landing page components directories.
 * @license MIT
 */

import fs from 'fs';
import path from 'path';

/**
 * Validates baseline framework configurations and structures output folders.
 */
export async function handleEnvironmentInit() {
  console.log('[info] Scanning project root directory parameters...');
  const activeDirectory = process.cwd();

  // Check 1: Enforce presence of a package.json file to confirm a valid Node repository context
  if (!fs.existsSync(path.join(activeDirectory, 'package.json'))) {
    console.error('[error] Execution Failure: This folder does not appear to be an active Node.js repository.');
    console.error('        Please run "npm init" or setup your Next.js project before initializing.');
    process.exit(1);
  }

  // Check 2: Evaluate target landing layout directories paths
  const componentsPath = path.join(activeDirectory, 'components', 'cro-landing');
  
  if (fs.existsSync(componentsPath)) {
    console.log('[info] Verified target layout path directories: /components/cro-landing already exists.');
    console.log('[success] Project environment remains initialized and optimized for generation models.');
    return;
  }

  try {
    console.log('[info] Structuring layout canvas folders: /components/cro-landing...');
    fs.mkdirSync(componentsPath, { recursive: true });
    
    console.log('[success] Architecture initialization complete.');
    console.log('          Execute "npx site-dhandha generate" to begin page compilation.');
  } catch (error) {
    console.error('[error] Disk interrupt preventing scaffolding directories creation:', error.message);
    process.exit(1);
  }
}
