/**
 * @typedef {import('@figma/rest-api-spec').RGBA | import('@figma/rest-api-spec').RGB} Color
 */
import { existsSync, mkdirSync } from 'fs';
import chalk from 'chalk';
import variablesJson from '../../src/figma-variables/variableTokens.json' with { type: 'json' };
import { FIGMA_TOKENS_PREFIXES } from '../config.js';

/**
 * The fetching result of the Figma API for local variables.
 */
export const figmaVariables = variablesJson;

/**
 * Create a directory if it does not exist.
 * @param { string } dirPath the directory path
 */
export const createDirectory = (dirPath) => {
  if (!existsSync(dirPath)) {
    mkdirSync(dirPath, { recursive: true });
  }
};

/**
 * Renames a variable by removing the prefix or in case of type color with "primitive" prefix exchange it by "color"
 * E.g. instead of "primitive/spacing/4x-small" it becomes "spacing/4x-small"
 * @example renameVariable("primitive/spacing/4x-small", "spacing") // "spacing/4x-small"
 * @example renameVariable("primitive/primary/500", "color") // "color/primary/500"
 * @param {string} name Name of the variable
 * @param {string} type type of the variable
 * @returns {string} The renamed variable
 */
export const renameVariable = (name, type) => {
  if (name.startsWith('primitive/') && type === 'color') {
    const primitivePattern = /^primitive/;
    return name.replace(primitivePattern, 'color');
  }
  const prefixPattern = new RegExp(`^(${FIGMA_TOKENS_PREFIXES.join('/|')}/)`);
  return name.replace(prefixPattern, '');
};

/**
 * If the variable is from type FLOAT there are more specific types, which it needs to be mapped to.
 * This function returns the specific type for the float variable based on its name.
 *
 * @param { string } name The name of a variable
 * @returns { string } The specific type for the float variable
 */
// eslint-disable-next-line complexity
export const getTypeForFloatVariable = (name) => {
  const type = ['letter-spacing', 'line-height', 'opacity', 'weight', 'z-index']
    .find((key) => name.includes(key));

  switch (type) {
  case 'letter-spacing':
    return 'letterSpacing';
  case 'line-height':
    return 'lineHeights';
  case 'opacity':
    return 'opacity';
  case 'weight':
    return 'fontWeights';
  case 'z-index':
    return 'number';
  default:
    return 'sizing';
  }
};

/**
 * Resolves a variable alias by its ID.
 * @param {string} id The ID of the variable
 * @returns {{ value: string, type: string } | null} The resolved value and type of the variable, or null if not found.
 */
export const resolveAlias = (id) => {
  const aliasVar = Object.values(figmaVariables.variables).find(v => v.id === id);
  if (!aliasVar) return null;
  const aliasName = aliasVar.name.toLowerCase();

  const aliasType = aliasVar.resolvedType === 'FLOAT'
    ? getTypeForFloatVariable(aliasName)
    : aliasVar.resolvedType.toLowerCase();

  const renamedAlias = renameVariable(aliasName, aliasType);
  // The syntax for separators in style dictionary is ".", so all "/" are replaced with "."
  const replacedSeparator = renamedAlias.replaceAll('/', '.');

  return { type: aliasType, value: `{${replacedSeparator}}` };
};

/**
 * Gets the value of an alias variable in a specific mode.
 * @param { string } aliasId Id of the alias variable
 * @param { string } modeId Id of the mode
 * @returns {unknown | undefined} The value of the alias variable, or undefined if not found.
 */
// eslint-disable-next-line complexity
export const getAliasValue = (aliasId, modeId) => {
  const aliasVar = Object.values(figmaVariables.variables).find(v => v.id === aliasId);
  /** @type {Record<string, unknown> | undefined} */
  const valuesByMode = aliasVar?.valuesByMode;
  /** @type {unknown} */
  const newValue = valuesByMode?.[modeId];
  // If the current value is a variable alias, resolve it recursively
  if (
    newValue && typeof newValue === 'object' && 'type' in newValue
    && newValue.type === 'VARIABLE_ALIAS' && 'id' in newValue
  ) {
    return getAliasValue(/** @type {string} */ (newValue.id), modeId);
  }
  return newValue;
};

/**
 * Regex for checking if a variable / style is only available in figma
 */
const DESIGN_ONLY_VARIABLES_REGEX = [
  /**
   * Figma-only internal stuff
   */
  /_internal/,

  /**
   * Design-only needed shadow tokens, which build together the whole shadow style for dev
   * like different shadow levels, color, blur, ...
   */
  /primitive\/shadow.*\/(1st|2nd|3rd)/,

  /**
   * Color palettes that are currently not used
   */
  // Currently not used color palettes of critical
  // @TODO: Check with design if these are really needed and add it in dev or remove them in figma
  /primitive\/critical/,

  // Currently not used color palettes of muted
  // @TODO: Check with design if these are really needed and add it in dev or remove them in figma
  /primitive\/muted/,

  /**
   * Font Size
   */
  // Currently not used font sizes
  // @TODO: Check with design if these are really needed and add it in dev or remove them in figma
  /primitive\/font-size\/(0x-large|1_5x-large|1x-large|2_5x-large|medium-large)/,

  /**
   * Letter spacing
   */
  // Currently not used letter spacing values
  // @TODO: Check with design if these values are really needed and add it in dev or remove them in figma
  /letter-spacing\/(default|negative-05|positive-05|positive-2|positive-5)/,

  /**
   * Line height
   */
  // Currently not used line height
  // @TODO: Check with design if these are really needed and add it in dev or remove them in figma
  /line-height\/\d+/,

  /**
   * Spacing
   */
  // Currently not used spacing.
  // @TODO: Check with design if these are really needed and add it in dev or remove them in figma
  /primitive\/spacing\/(1_5x-large|3_5x-large)/,

  /**
   * Text Transform
   */
  // Currently not used text-transform.
  // @TODO: Check with design if these are really needed and add it in dev or remove them in figma
  /primitive\/text-transform\/(default|uppercase)/,

  /**
   * --syn-input-focus-ring-width
   */
  // Currently not used in dev
  // @TODO: Check with design if these are really needed and add it in dev or remove them in figma
  /component\/input\/focus-ring\/width/,

  /**
   * Radio-Button component tokens
   */
  // Not yet updated in dev
  /component\/radio-button-group/,

  /**
   * Button component tokens
   */
  // Not yet updated in dev
  /component\/button\/(border|color|filled|outline)/,
];
/* eslint-enable max-len */

/**
 * Filter out variables and styles that are only used in design.
 * @param {string} name The name of the variable / style
 * @returns true if it is only available in design, false otherwise.
 */
export const isDesignOnlyVariableOrStyle = (name) => DESIGN_ONLY_VARIABLES_REGEX
  .some(regex => regex.test(name));

/**
 * Formats a color object into a CSS-compatible color string.
 * formatColor({ r: 0.5, g: 0.5, b: 0.5, a: 0.8 }) // "rgba(128, 128, 128, 0.80)"
 * formatColor({ r: 0.5, g: 0.5, b: 0.5 }) // "#808080"
 * @param { Color } color Color object with r, g, b, and optional a properties.
 * @returns {string} The formatted color string.
 */
export const formatColor = (color) => {
  const { r, g, b } = color;
  const a = 'a' in color ? color.a : undefined;

  const red = Math.round(r * 255);
  const green = Math.round(g * 255);
  const blue = Math.round(b * 255);

  if (a !== undefined && a < 1) {
    return `rgba(${red}, ${green}, ${blue}, ${a.toFixed(2)})`;
  }

  // eslint-disable-next-line no-bitwise
  return `#${((1 << 24) + (red << 16) + (green << 8) + blue).toString(16).slice(1)}`;
};

/**
 * Gets the available themes from the Figma variables collection "Synergy Themes".
 * @returns {Array<{ id: string, name: string }>} An array of available themes with their IDs and names.
 */
export const getAvailableThemes = () => {
  const themes = Object.values(figmaVariables.variableCollections)
    .filter(({ name }) => name === 'Synergy Themes')
    .map(({ modes }) => Object.values(modes).map(({ modeId, name }) => ({
      id: modeId,
      name,
    })))
    .flat()
    // Skip exploration modes, as these are only for testing purposes on figma
    .filter(({ name }) => !name.includes('exploration'));
  if (themes.length === 0) {
    console.error(
      chalk.red('No themes found in Figma variables. Please check the variable collections.'),
    );
  }
  return themes;
};
