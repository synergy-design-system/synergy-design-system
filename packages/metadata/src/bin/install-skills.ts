#!/usr/bin/env node
/* eslint-disable no-console */
/**
 * CLI entry point: install-skills
 *
 * Usage:
 *   npx @synergy-design-system/metadata install-skills --path .github/skills
 *   npx @synergy-design-system/metadata install-skills --path=/absolute/path
 */
import { resolve } from 'node:path';
import { generateSkillBundle } from '../public/index.js';

const SYNERGY_LOGO = `
  +------------------------------+
  |----+++++++--------+++++++----|
  |---++------+*---*-+------++---|
  |---++---------%*---------++---|
  |---++---------++---------++---|
  |---++-----*+++**+++%-----*+---|
  |----**----*---++---*----++----|
  |------****%********%****------|
  |----++----*---++---*----**----|
  |---+*-----%+++**+++*-----++---|
  |---++---------++---------++---|
  |---++---------*%---------++---|
  |---++------+-*---*+------++---|
  |----+++++++--------+++++++----|
  +------------------------------+
`;

interface CliOptions {
  path?: string;
}

/**
 * Parse command line arguments into options.
 */
function parseArgs(args: string[]): CliOptions {
  return args.reduce<CliOptions>((opts, arg, index) => {
    if (arg === '--path' && index + 1 < args.length) {
      return { ...opts, path: args[index + 1] };
    }
    if (arg.startsWith('--path=')) {
      return { ...opts, path: arg.substring('--path='.length) };
    }
    return opts;
  }, {});
}

/**
 * Validate parsed options and throw if required fields are missing.
 */
function validateOptions(opts: CliOptions): asserts opts is Required<CliOptions> {
  if (!opts.path) {
    throw new Error('--path argument is required\nUsage: install-skills --path <directory>');
  }
}

async function main() {
  try {
    const opts = parseArgs(process.argv.slice(2));
    validateOptions(opts);

    const absolutePath = resolve(process.cwd(), opts.path);
    console.log(`Installing Synergy skills to: ${absolutePath}`);

    await generateSkillBundle({ outputPath: absolutePath });

    console.log(SYNERGY_LOGO);
    console.log('✓ Synergy skills installed successfully\n');
    console.log('Next steps:');
    console.log('  1. In VS Code, reference the skill with: @synergy-component');
    console.log('  2. Ask questions like: "How do I use syn-button?"');
    console.log(`\nSkill location: ${absolutePath}`);
  } catch (error) {
    if (error instanceof Error && error.message.startsWith('--path')) {
      throw new Error(`Error: ${error.message}`);
    } else {
      throw new Error(`Error installing skills: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((e: Error) => {
    console.error(e.message);
    process.exit(1);
  });
