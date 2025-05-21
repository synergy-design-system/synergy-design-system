/* eslint-disable no-console */
import { existsSync, mkdirSync, readFileSync } from 'node:fs';
import { dirname } from 'node:path';

/**
 * The default theme that will be used if no theme is provided
 */
export const DEFAULT_THEME = 'synergy24';

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
 * Get the mapped theme name for a specific theme
 * @param {string} theme The theme to get the mapped name for
 * @returns {string} The mapped theme name
 */
const getMappedThemeName = theme => {
  // Temporary matcher from brand to theme
  // This can be removed when the json files and references are updated
  switch (theme) {
  case 'brand25':
    return 'sick-2025';
  case 'synergy24':
    return 'sick-2018';
  default:
    return theme;
  }
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

  // Temporary matcher from brand to theme
  // This can be removed when the json files and references are updated
  const usedTheme = getMappedThemeName(theme);

  const cssFileName = `${usedTheme.replaceAll('-', '')}_${mode}.css`;
  const cssSelectors = [
    ':root',
    `.syn-${usedTheme}-${mode}`,
  ];

  // The default theme will also use the default synergy selector
  if (theme === 'synergy24') {
    cssSelectors.push(`.syn-theme-${mode}`);
  }

  return {
    cssFileName,
    cssSelectors,
    mode,
    theme: usedTheme,
  };
};
