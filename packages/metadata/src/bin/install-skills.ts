#!/usr/bin/env node
/* eslint-disable no-console */
/**
 * CLI entry point: install-skills
 *
 * Usage:
 *   npx @synergy-design-system/metadata install-skills --path .github/skills
 *   npx @synergy-design-system/metadata install-skills --path=/absolute/path
 *   npx @synergy-design-system/metadata install-skills --path .github/skills --skills component,intents
 */
import { resolve } from 'node:path';
import { generateSkillBundle, getSynergyLogo } from '../public/index.js';
import type { SkillName } from '../public/index.js';

const VALID_SKILLS: SkillName[] = ['component', 'templates', 'intents'];

interface CliOptions {
  path?: string;
  skills?: SkillName[];
}

function parseSkills(value: string): SkillName[] {
  const skills = value.split(',').map((skill) => skill.trim()).filter(Boolean);
  const invalidSkills = skills.filter((skill): skill is string => !VALID_SKILLS.includes(skill as SkillName));
  if (skills.length === 0 || invalidSkills.length > 0) {
    throw new Error(`Invalid --skills value. Choose one or more of: ${VALID_SKILLS.join(', ')}`);
  }
  return skills as SkillName[];
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
    if (arg === '--skills' && index + 1 < args.length) {
      return { ...opts, skills: parseSkills(args[index + 1]) };
    }
    if (arg.startsWith('--skills=')) {
      return { ...opts, skills: parseSkills(arg.substring('--skills='.length)) };
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

    await generateSkillBundle({ outputPath: absolutePath, skills: opts.skills });

    console.log(getSynergyLogo());
    console.log('✓ Synergy skills installed successfully\n');
    console.log('Next steps:');
    const installedSkills = opts.skills ?? VALID_SKILLS;
    installedSkills.forEach((skill, index) => {
      let skillName: string;
      switch (skill) {
        case 'component':
          skillName = 'synergy-component';
          break;
        case 'templates':
          skillName = 'synergy-templates';
          break;
        case 'intents':
          skillName = 'synergy-intent-policy';
          break;
        default:
          throw new Error(`Unsupported skill: ${skill as string}`);
      }
      console.log(`  ${index + 1}. In VS Code, reference the skill with: /${skillName}`);
    });
    if (installedSkills.includes('component')) {
      console.log(`  ${installedSkills.length + 1}. Ask questions like: "How do I use syn-button?"`);
    }
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
