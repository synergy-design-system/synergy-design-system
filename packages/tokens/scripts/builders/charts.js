import { CHARTS_OUTPUT_DIR, COMPONENTS_OUTPUT_DIR } from '../config.js';
import { getCssSelectors, getDefaultTheme } from '../helpers.js';
import { copyDefaultThemeAliases, runBuildPipeline } from './shared.js';

const DEFAULT_THEME = getDefaultTheme();

/**
 * Returns full theme metadata for a chart theme.
 * @param {string} theme - e.g. "sick2025-light"
 * @param {string} mode - e.g. "light"
 */
const getThemeInformation = (theme, mode) => {
  if (!theme || !mode) throw new Error('Theme and mode are required');
  const usedTheme = theme.replaceAll('-', '_');
  return {
    additionalSources: [`${COMPONENTS_OUTPUT_DIR}/${theme}.json`],
    changeOutputValues: {},
    cssFileName: `${usedTheme}.css`,
    cssSelectors: getCssSelectors(theme, mode),
    mode,
    theme,
  };
};

export const buildCharts = async () => runBuildPipeline({
  buildPath: './dist/charts/',
  copyToDefault: (themesDir) => copyDefaultThemeAliases(themesDir, DEFAULT_THEME),
  // For charting tokens we need to include the component tokens in the build for resolving references,
  // but we don't want to output them in the charting CSS files since they're not used directly.
  filter: ({filePath}) => filePath.includes('figma-charts'),
  getThemeInformation,
  prefix: 'syn-',
  sourceDir: CHARTS_OUTPUT_DIR,
});
