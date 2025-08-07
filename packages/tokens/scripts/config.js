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
