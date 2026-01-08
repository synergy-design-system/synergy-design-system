/**
 * @typedef {import('./types.js').OutputVariableChangeList} OutputVariableChangeList
 */

/**
 * The directory path where Figma variables are stored and processed.
 */
export const FIGMA_VARIABLES_DIR = './src/figma-variables';

/**
 * The output directory path where processed Figma variables will be written.
 */
export const OUTPUT_DIR = `${FIGMA_VARIABLES_DIR}/output`;

/**
 * The path to the JSON file where the fetched Figma styles will be written.
 */
export const FIGMA_FETCHED_STYLES_PATH = `${FIGMA_VARIABLES_DIR}/styleTokens.json`;

/**
 * The path to the JSON file where the fetched Figma variables will be written.
 */
export const FIGMA_FETCHED_VARIABLES_PATH = `${FIGMA_VARIABLES_DIR}/variableTokens.json`;

/**
 * Prefixes we use in figma for grouping variables
 */
export const FIGMA_TOKENS_PREFIXES = ['primitive', 'component', 'semantic'];

/**
 * The prefix used for color palette tokens.
 */
export const COLOR_PALETTE_PREFIX = '_color-palette';

/**
 * The file name for the 2018 light theme.
 */
export const LIGHT_2018_THEME = 'sick2018-light.json';

/**
 * The file name for the 2018 dark theme.
 */
export const DARK_2018_THEME = 'sick2018-dark.json';

/**
 * List of static changed to variables for specific themes and modes.
 * @type {{ global: OutputVariableChangeList } & Record<string, OutputVariableChangeList>}
 */
export const OUTPUT_VARIABLE_CHANGES = {
  global: {
    // filled button
    'syn-button-filled-color-text': 'var(--syn-color-neutral-0)',
    'syn-button-filled-color-text-active': 'var(--syn-color-neutral-0)',
    'syn-button-filled-color-text-hover': 'var(--syn-color-neutral-0)',

    // outlined button
    'syn-button-outline-color-text': 'var(--syn-color-primary-600)',
    'syn-button-outline-color-text-active': 'var(--syn-color-primary-950)',
    'syn-button-outline-color-text-hover': 'var(--syn-color-primary-900)',

    // text button
    'syn-button-text-color-text': 'var(--syn-button-color)',
    'syn-button-text-color-text-active': 'var(--syn-button-color-active)',
    'syn-button-text-color-text-hover': 'var(--syn-button-color-hover)',
  },
  sick2018_dark: {
    // outlined button
    'syn-button-outline-color-active': 'none',
    'syn-button-outline-color-hover': 'none',
  },
  sick2018_light: {
    // outlined button
    'syn-button-outline-color-active': 'none',
    'syn-button-outline-color-hover': 'none',
  },
  sick2025_dark: {
  },
  sick2025_light: {
  },
};
