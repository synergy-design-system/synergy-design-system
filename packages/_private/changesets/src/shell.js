#!/usr/bin/env node
/* eslint-disable no-console */
import { createChangesetFileFromGit } from './create-changeset-from-git.js';

/**
 * Main function to execute the changeset creation
 */
async function main() {
  try {
    // Get package root from command line argument or use current directory
    const packageRoot = process.argv[2] || process.cwd();

    const success = await createChangesetFileFromGit(packageRoot);

    if (success) {
      console.log('✅ Changeset created successfully!');
      process.exit(0);
    } else {
      console.log('ℹ️  No changeset was created (no changes detected or file already exists)');
      process.exit(0);
    }
  } catch (/* @type {any} */ error) {
    console.error('❌ Error creating changeset:', error);
    process.exit(1);
  }
}

main()
  .then(console.log)
  .catch(console.error);
