#!/usr/bin/env node

/**
 * @typedef {import('./types.js').CommandLineArgs} CommandLineArgs
 */

/**
 * Command line utility to create browser baselines
 * Usage: node syn-create-baseline.js --baseline "not-dead" --path "./somewhere" --version 3.1.0 --allow-replace
 */
import fs from 'node:fs';
import { createBaseline } from './utilities/index.js';
import { usedBaseline, baselines } from './config.js';

/**
 * Parse command line arguments
 * @param {string[]} args Process arguments
 * @returns {CommandLineArgs} Parsed arguments
 */
function parseArgs(args) {
  /**
   * @type {CommandLineArgs}
   */
  const parsed = {
    allowReplace: false,
    baseline: undefined,
    help: false,
    path: undefined,
    version: undefined,
  };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];

    switch (arg) {
      case '--baseline':
        parsed.baseline = args[i + 1];
        i++; // Skip next argument as it's the value
        break;
      case '--path':
        parsed.path = args[i + 1];
        i++; // Skip next argument as it's the value
        break;
      case '--version':
        parsed.version = args[i + 1];
        i++; // Skip next argument as it's the value
        break;
      case '--allow-replace':
        parsed.allowReplace = true;
        break;
      case '--help':
      case '-h':
        parsed.help = true;
        break;
      default:
        if (arg.startsWith('--')) {
          console.error(`Unknown option: ${arg}`);
          process.exit(1);
        }
        break;
    }
  }

  return parsed;
}

/**
 * Show help message
 */
function showHelp() {
  console.log(`
syn-create-baseline - Create browser baseline configurations

Usage:
  node syn-create-baseline.js [options]

Options:
  --baseline <query>     Browserslist query (optional, defaults to config)
  --path <directory>     Directory to store baseline files (optional, defaults to config)
  --version <version>    Version number for the baseline (required)
  --allow-replace        Allow overwriting existing baseline files
  --help, -h            Show this help message

Examples:
  node syn-create-baseline.js --version 3.1.0
  node syn-create-baseline.js --baseline "not dead" --version 3.1.0
  node syn-create-baseline.js --baseline "last 2 versions" --path "./custom" --version 3.1.0
  node syn-create-baseline.js --version 3.1.0 --allow-replace
`);
}

/**
 * Validate required arguments
 * @param {CommandLineArgs} args Parsed arguments
 * @returns {boolean} True if valid
 */
function validateArgs(args) {
  if (!args.version) {
    console.error('Error: --version is required');
    return false;
  }

  // Validate version format (basic semver check)
  const versionPattern = /^\d+\.\d+\.\d+$/;
  if (!versionPattern.test(args.version)) {
    console.error('Error: Version must be in semver format (e.g., 3.1.0)');
    return false;
  }

  return true;
}

/**
 * Check if baseline file already exists
 * @param {string} path Directory path
 * @param {string} version Version string
 * @returns {boolean} True if file exists
 */
function baselineExists(path, version) {
  const filePath = `${path}/${version}.js`;
  return fs.existsSync(filePath);
}

/**
 * Main CLI function
 */
function main() {
  const args = parseArgs(process.argv.slice(2));

  if (args.help) {
    showHelp();
    process.exit(0);
  }

  if (!validateArgs(args)) {
    showHelp();
    process.exit(1);
  }

  // Set defaults
  const options = {
    baseline: args.baseline || usedBaseline,
    path: args.path || baselines,
    version: /** @type {string} */ (args.version), // We know it exists due to validateArgs check
  };

  // Check if baseline already exists
  if (baselineExists(options.path, options.version) && !args.allowReplace) {
    console.error(`Error: Baseline for version ${options.version} already exists at ${options.path}/${options.version}.js`);
    console.error('Use --allow-replace to overwrite existing baselines');
    process.exit(1);
  }

  try {
    console.log(`Creating baseline for version ${options.version}...`);
    console.log(`Baseline query: ${options.baseline}`);
    console.log(`Output path: ${options.path}`);

    const success = createBaseline(options);

    if (success) {
      console.log(`✅ Successfully created baseline for version ${options.version}`);
      console.log(`📄 File: ${options.path}/${options.version}.js`);
    } else {
      console.error('❌ Failed to create baseline');
      process.exit(1);
    }
  } catch (e) {
    const error = /** @type {Error} */ (e);
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
}

main();
