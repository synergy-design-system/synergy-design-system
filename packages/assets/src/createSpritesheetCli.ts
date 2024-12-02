#! /usr/bin/env node
/* eslint-disable no-console */
import { createSpriteSheet } from './createSpritesheet.js';
import { defaultIcons } from './default-icons.js';

type Args = {
  icons?: Partial<keyof typeof defaultIcons>[];
  [key: string]: unknown;
};

/**
 * Creates a help message for the CLI.
 * @returns Help message
 */
const helpMessage = (usageError = '') => `Usage: syn-create-spritesheet --icons=icon1,icon2,icon3

Creates a spritesheet string from a list of icons.
Each icon identifier is a valid icon name for an icon in the synergy icon library.

Using to save the spritesheet string to a file:
syn-create-spritesheet --icons=a,b,c > icons.svg

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

// Check if the icons are valid
const allowedIconNames = Object.keys(defaultIcons);
const { icons } = argumentsObject;

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

console.log(createSpriteSheet(validIcons));
process.exit(0);
