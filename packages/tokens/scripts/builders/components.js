import { join } from 'node:path';
import { addMissingTokens } from '../add-missing-tokens.js';
import { COMPONENTS_OUTPUT_DIR, OUTPUT_VARIABLE_CHANGES } from '../config.js';
import { getCssSelectors, getDefaultTheme } from '../helpers.js';
import { copyDefaultThemeAliases, runBuildPipeline } from './shared.js';

const DEFAULT_THEME = getDefaultTheme();

/**
 * Returns full theme metadata for a base-component theme.
 * @param {string} theme - e.g. "sick2025-light"
 * @param {string} mode - e.g. "light"
 */
const getThemeInformation = (theme, mode) => {
  if (!theme || !mode) throw new Error('Theme and mode are required');
  const usedTheme = theme.replaceAll('-', '_');
  return {
    changeOutputValues: {
      ...OUTPUT_VARIABLE_CHANGES.global,
      ...(OUTPUT_VARIABLE_CHANGES[usedTheme] || {}),
    },
    cssFileName: `${usedTheme}.css`,
    cssSelectors: getCssSelectors(theme, mode),
    mode,
    theme,
  };
};

export const buildComponents = async () => runBuildPipeline({
  buildPath: './dist/',
  copyToDefault: (themesDir) => copyDefaultThemeAliases(themesDir, DEFAULT_THEME),
  getThemeInformation,
  postProcess: (themesDir) => addMissingTokens(join(themesDir)),
  prefix: 'syn-',
  sourceDir: COMPONENTS_OUTPUT_DIR,
  transforms: [
    'syn/fix-figma-background-blur',
    'syn/add-fallback-fonts',
    'syn/add-missing-quotes-for-strings',
    'syn/change-output-values',
    'syn/convert-letter-spacing-to-normal',
  ],
});
