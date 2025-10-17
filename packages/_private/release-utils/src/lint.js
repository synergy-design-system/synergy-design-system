#!/usr/bin/env node
import { validateChangeset } from './create-changeset-from-git.js';

/**
 * Main function to execute the changeset creation
 */
async function main() {
  try {
    // Get package root from command line argument or use current directory
    const packageRoot = process.argv[2] || process.cwd();

    const { message, reason, valid } = await validateChangeset(packageRoot);

    if (valid) {
      console.log(`✅ Changeset is valid! (Code: ${reason})`);
      console.log(`Additional information:\n${message}`);
      process.exit(0);
    } else {
      console.log(`❌ Changeset validation failed: ${message} (Reason: ${reason})`);
      process.exit(1);
    }
  } catch (/* @type {any} */ error) {
    console.error('❌ Error creating changeset:', error);
    process.exit(1);
  }
}

main()
  .then(console.log)
  .catch(console.error);
