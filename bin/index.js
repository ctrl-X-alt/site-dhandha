#!/usr/bin/env node

/**
 * @fileoverview Primary runtime binary router execution file.
 * Establishes global shebang execution and handles argument routing.
 * @license MIT
 */

const [, , command] = process.argv;

async function execute() {
  switch (command) {
    case 'init': // [Added Feature Verification Alignment]
      try {
        const { handleEnvironmentInit } = await import('../src/commands/init.js');
        await handleEnvironmentInit();
      } catch (err) {
        console.error('[error] Failed to initialize project boundaries structures:', err.message);
        process.exit(1);
      }
      break;

    case 'login':
      try {
        const { handleCliLogin } = await import('../src/commands/login.js');
        await handleCliLogin();
      } catch (err) {
        console.error('[error] Run initialization failure during authentication loop:', err.message);
        process.exit(1);
      }
      break;

    case 'generate':
      try {
        const { handlePageGeneration } = await import('../src/commands/generate.js');
        await handlePageGeneration();
      } catch (err) {
        console.error('[error] Generation engine pipeline aborted unexpectedly:', err.message);
        process.exit(1);
      }
      break;

    case '--help':
    case '-h':
    default:
      console.log('Conversion AI Engine CLI [Alpha]');
      console.log('\nUsage:');
      console.log('  npx site-dhandha <command>');
      console.log('\nCommands:');
      console.log('  init      Verify local workspace layout and structure canvas folders');
      console.log('  login     Authenticate local environment securely via browser with GitHub');
      console.log('  generate  Initialize schema questionnaire loop to compile landing pages');
      console.log('\nOptions:');
      console.log('  -h, --help  Display system command manual details\n');
      process.exit(command ? 1 : 0);
  }
}

execute();
