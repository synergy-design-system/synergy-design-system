/**
 * @typedef {import('./types.js').OutputVariableChangeList} OutputVariableChangeList
 */

/**
 * The directory path where Figma variables from components are stored and processed.
 */
export const FIGMA_VARIABLES_DIR = './src/figma-variables';

/**
 * The output directory path where processed Figma variables from components will be written.
 */
export const COMPONENTS_OUTPUT_DIR = `${FIGMA_VARIABLES_DIR}/output`;

/**
 * The path to the JSON file where the fetched Figma styles will be written.
 */
export const FIGMA_FETCHED_STYLES_PATH = `${FIGMA_VARIABLES_DIR}/styleTokens.json`;

/**
 * The path to the JSON file where the fetched Figma variables from components will be written.
 */
export const FIGMA_FETCHED_VARIABLES_PATH = `${FIGMA_VARIABLES_DIR}/variableTokens.json`;

/**
 * The directory path where Figma variables are stored and processed.
 */
export const FIGMA_CHARTS_DIR = './src/figma-charts';

/**
 * The output directory path where processed Figma charting variables will be written.
 */
export const CHARTS_OUTPUT_DIR = `${FIGMA_CHARTS_DIR}/output`;

/**
 * The path to the JSON file where the fetched Figma charting variables will be written.
 */
export const FIGMA_FETCHED_CHARTING_VARIABLES_PATH = `${FIGMA_CHARTS_DIR}/chartTokens.json`;

/**
 * Prefixes we use in figma for grouping variables
 */
export const FIGMA_TOKENS_PREFIXES = ['primitive', 'component', 'semantic'];

/**
 * The name of the variable collection in Figma that contains the Synergy themes for base components.
 */
export const COMPONENTS_COLLECTION_NAME = 'Synergy Themes';

/**
 * The name of the variable collection in Figma that contains the Synergy themes for charting.
 */
export const CHART_COLLECTION_NAME = 'Chart Themes';

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
