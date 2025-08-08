#! /usr/bin/env node
/* eslint-disable no-console */
import {
  type AllowedIconsets,
  type Icon2018Keys,
  type Icon2025Keys,
  createSpriteSheet,
} from './createSpritesheet.js';
import { defaultIcons as sick2018Icons } from './default-icons.js';
import { defaultIcons as sick2025Icons } from './default-icons-2025.js';

type Args = {
  icons?: Partial<keyof typeof sick2018Icons>[];
  iconset?: AllowedIconsets;
  list?: string;
  [key: string]: unknown;
};

/**
 * Creates a help message for the CLI.
 * @returns Help message
 */
const helpMessage = (usageError = '') => `Usage:

syn-create-spritesheet --icons=icon1,icon2,icon3 --iconset=sick2018 | sick2025
syn-create-spritesheet --iconset=sick2018 | sick2025 --list=a

Creates a spritesheet string from a list of icons.
Each icon identifier is a valid icon name for an icon in the synergy icon library.

Using to save the spritesheet string to a file:
syn-create-spritesheet --icons=a,b,c > icons.svg

List all available icons starting with the letter 'a' in sick2025:
syn-create-spritesheet --list=a --iconset=sick2025

List all available icons in sick2025:
syn-create-spritesheet --list=ALL --iconset=sick2025

Please have a look at https://synergy-design-system.github.io/?path=/docs/icon-search--docs for icon names
${usageError && `
Error: ${usageError}`}
`;

const args = process.argv.slice(2);

// Sanitize the arguments
const argumentsObject = args.reduce<Args>((acc, arg) => {
  const [originalKey, originalValue] = arg.trim().split('=');

  // Skip if the option does not have a value
  if (!originalValue) {
    return acc;
  }

  const key = originalKey.trim().replace(/^--/, '');

  const finalValue = originalValue.includes(',') || key === 'icons'
    ? originalValue.split(',').map((icon) => icon.trim())
    : originalValue.trim();

  acc[key] = finalValue;
  return acc;
}, ({} as Partial<Args>));

if (args.length === 0) {
  console.log(helpMessage('Please provide at least one icon.'));
  process.exit(1);
}

const {
  icons,
  iconset = 'sick2018',
  list,
} = argumentsObject;

const allowedIconNamesFor2018 = Object.keys(sick2018Icons);
const allowedIconNamesFor2025 = Object.keys(sick2025Icons);
const allowedIconNames = iconset === 'sick2018' ? allowedIconNamesFor2018 : allowedIconNamesFor2025;

// Check if the iconset is valid
if (!['sick2018', 'sick2025'].includes(iconset)) {
  console.log(helpMessage(`The iconset "${iconset}" is not valid. Please use "sick2018" or "sick2025".`));
  process.exit(3);
}

// If the list option is provided, we will list the icons
if (list) {
  const searchTerm = list === 'ALL' ? '' : list.toLowerCase();
  const availableIcons = allowedIconNames.filter(
    icon => icon.toLowerCase().startsWith(searchTerm),
  );
  if (availableIcons.length === 0) {
    console.log(helpMessage(`No icons found starting with "${list}".`));
    process.exit(4);
  }
  console.log(`Available icons starting with "${list}":\n\t- ${availableIcons.join('\n\t- ')}`);
  process.exit(0);
}

// Check if there are icons provided
if (!icons || icons.length === 0) {
  console.log(helpMessage('Please provide at least one icon.'));
  process.exit(2);
}

const validIcons = icons.filter((icon: string) => allowedIconNames.includes(icon));

if (validIcons?.length !== icons.length) {
  const invalidIcons = icons.filter((icon) => !allowedIconNames.includes(icon));
  console.log(helpMessage(`
Some icons are not valid!
The following icons could not be detected:
  - ${invalidIcons.join('\n\t- ')}

Please remove them and try again, e.g. by using the following command: syn-create-spritesheet --icons=${validIcons.join(',')}`));
  process.exit(-3);
}

let sheet;
if (iconset === 'sick2018') {
  sheet = createSpriteSheet(icons as Icon2018Keys[], 'sick2018');
} else {
  sheet = createSpriteSheet(icons as Icon2025Keys[], 'sick2025');
}

console.log(sheet);
process.exit(0);
