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
export const FIGMA_STYLES_PATH = `${OUTPUT_DIR}/styles.json`;

/**
 * The name of the file where the fetched Figma variables are stored.
 */
export const FIGMA_VARIABLES_FILE = 'tokens.json';

/**
 * Prefixes we use in figma for grouping variables
 */
export const FIGMA_TOKENS_PREFIXES = ['primitive', 'component', 'semantic'];

/**
 * The prefix used for color palette tokens.
 */
export const COLOR_PALETTE_PREFIX = '_color-palette';
