/* eslint-disable no-console */
import {
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
} from 'node:fs';
import { dirname } from 'node:path';
import { snakeCase, splitSeparateNumbers } from 'change-case';

/**
 * Get the list of available themes and modes
 * from the src/figma/tokens folder.
 * To make this work, make sure to have the following folder structure:
 * src/figma-tokens/theme (The themes to use, e.g. sick2018, sick2025)
 * src/figma-tokens/mode (The modes to use, e.g. dark, light)
 * @returns {Array<{mode: string, theme: string}>} The list of available themes and modes
 */
export const getAvailableThemes = () => {
  const themes = readdirSync('./src/figma-tokens/theme');
  const modes = readdirSync('./src/figma-tokens/mode');

  return themes
    .map(theme => modes.map(mode => ({
      mode: mode.replace('.json', ''),
      theme: snakeCase(theme.replace('.json', ''), {
        delimiter: '-',
        split: splitSeparateNumbers,
      }),
    })))
    .flat();
};

/**
 * Create a folder at provided path
 * @param {string} path The path to create
 * @returns {boolean} True if the folder was created or exists, false otherwise
 */
export const createFolder = (path) => {
  const dirName = dirname(path);
  try {
    if (!existsSync(dirName)) {
      mkdirSync(dirName);
    }
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

/**
 * Creates a header string from the provided string parts
 * @param {string[]} parts The parts that should be created as comment lines
 * @returns {string} The final header string
 */
export const createHeaderComment = (parts) => {
  const lines = parts.map(part => ` * ${part}`);
  return `
/**
${lines.join('\n')}
 */
  `.trim();
};

/**
 * Get the package information from the package.json file
 * @returns {{
 *  author: Record<string, string>,
 *  name: string,
 *  version: string
 * }} The package information
 */
export const getPackageInformation = () => {
  const data = JSON.parse(readFileSync('./package.json', 'utf-8'));
  const { author, name, version } = data;
  return {
    author,
    name,
    version,
  };
};

/**
 * Get the default theme that should be used,
 * depending on the package.json major version
 */
export const getDefaultTheme = () => {
  const { version } = getPackageInformation();
  const majorVersion = parseInt(version.split('.')[0], 10);

  let defaultTheme = 'sick2018';

  if (!majorVersion || Number.isNaN(majorVersion)) {
    console.error('Could not parse version number');
    return defaultTheme;
  }

  if (majorVersion >= 3) {
    defaultTheme = 'sick2025';
  }
  return defaultTheme;
};

/**
 * Get information for a specific theme
 * Used to get all needed parameters to build the theme
 * @param {string} theme The theme to get information for
 * @param {string} mode The mode of the theme. Usually dark or light
 * @returns {{
 *  cssFileName: string,
 *  cssSelectors: string[],
 *  theme: string,
 *  mode: string,
 * }} The information for the theme
 * @throws {Error} If the theme or mode is not found
 */
export const getInformationForTheme = (theme, mode) => {
  if (!theme || !mode) {
    throw new Error('Theme and mode are required');
  }

  const usedTheme = theme.replaceAll('-', '');
  const cssFileName = `${usedTheme}_${mode}.css`;
  const cssSelectors = [
    ':root',
    `.syn-${theme}-${mode}`,
  ];

  // The default theme will also use the default synergy selector
  if (usedTheme === getDefaultTheme()) {
    cssSelectors.push(`.syn-theme-${mode}`);
  }

  return {
    cssFileName,
    cssSelectors,
    mode,
    theme: usedTheme,
  };
};
