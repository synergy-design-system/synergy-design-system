/* eslint-disable no-console */
import {
  existsSync, mkdirSync, readFileSync, readdirSync,
} from 'node:fs';
import { dirname } from 'node:path';
import { OUTPUT_VARIABLE_CHANGES } from './config.js';

/**
 * Create a folder at provided path
 * @param {String} path The path to create
 * @returns {Boolean} True if the folder was created or exists, false otherwise
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
 * Creates a nested property in an object
 * @param {*} obj The object to modify
 * @param {Array<string>} keys The keys representing the path to the nested property
 * @param {unknown} value The value to set at the nested property
 */
export const setNestedProperty = (obj, keys, value) => {
  let current = obj;
  keys.slice(0, -1).forEach(key => {
    if (!current[key]) current[key] = {};
    current = current[key];
  });
  current[keys[keys.length - 1]] = value;
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
 * Get the list of available themes and modes
 * from the src/figma-variables/output folder.
 * To make this work, make sure to have the following folder structure:
 * src/figma-variables/output (The themes to use, e.g. sick2018-light, sick2018-dark, sick2025-light, sick2025-dark)
 * @returns {Array<{mode: string, theme: string}>} The list of available themes and modes
 */
export const getAvailableThemes = () => {
  const themes = readdirSync('./src/figma-variables/output');

  return themes.flatMap(theme => ({
    mode: theme.includes('light') ? 'light' : 'dark',
    theme: theme.replace('.json', ''),
  }));
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
 *  changeOutputValues: Record<string, string>,
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

  const usedTheme = theme.replaceAll('-', '_');
  const cssFileName = `${usedTheme}.css`;
  const cssSelectors = [
    ':root',
    `.syn-${theme}`,
  ];

  // The default theme will also use the default synergy selector
  if (usedTheme.includes(getDefaultTheme())) {
    cssSelectors.push(`.syn-theme-${mode}`);
  }

  // Create the list of selectors that should be changed
  // depending on the theme and mode.
  // Make sure to merge the global changes with the specific ones.
  const changeOutputValues = {
    ...OUTPUT_VARIABLE_CHANGES.global,
    ...(OUTPUT_VARIABLE_CHANGES[`${usedTheme}`] || {}),
  };

  return {
    changeOutputValues,
    cssFileName,
    cssSelectors,
    mode,
    theme,
  };
};
