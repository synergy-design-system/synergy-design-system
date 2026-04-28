import { join } from 'node:path';
import { copyFileSync, readdirSync } from 'node:fs';
import { styleText } from 'node:util';
import StyleDictionary from 'style-dictionary';
import { register } from '@tokens-studio/sd-transforms';
import { cssVariableFormatter } from './formats/index.js';
import { createJS, createSCSS } from './outputs/index.js';
import {
  addFallbackFonts,
  addMissingQuotesForStrings,
  changeOutputValues,
  convertLetterSpacingValue,
  fixFigmaBackgroundBlur,
} from './transforms/index.js';
import { getPackageInformation } from './helpers.js';

let isStyleDictionaryInitialized = false;

/**
 * Initializes the shared StyleDictionary transforms and formats.
 * Only runs once.
 */
const initStyleDictionary = async () => {
  if (isStyleDictionaryInitialized) return;
  await register(StyleDictionary);
  StyleDictionary.registerTransform(addFallbackFonts);
  StyleDictionary.registerTransform(addMissingQuotesForStrings);
  StyleDictionary.registerTransform(changeOutputValues);
  StyleDictionary.registerTransform(convertLetterSpacingValue);
  StyleDictionary.registerTransform(fixFigmaBackgroundBlur);
  StyleDictionary.registerFormat(cssVariableFormatter);
  isStyleDictionaryInitialized = true;
};

/**
 * @typedef {import('style-dictionary').File['filter']} Filter
 */
/**
 * @typedef {Object} ThemeInfo
 * @property {string} theme - Full theme name, e.g. "sick2025-light"
 * @property {string[]} [additionalSources] - If the theme JSON depends on additional JSON files, list them here
 * @property {string} mode - Theme mode, e.g. "light" or "dark"
 * @property {string} cssFileName - Output CSS filename, e.g. "sick2025_light.css"
 * @property {string[]} cssSelectors - CSS selectors to wrap the variables in
 * @property {Record<string, string>} changeOutputValues - Output value overrides
 */

/**
 * @typedef {Object} PipelineConfig
 * @property {string} sourceDir - Directory containing the theme JSON files
 * @property {string} buildPath - Output base path (e.g. "./dist/")
 * @property {string} prefix - CSS variable prefix (e.g. "syn-")
 * @property {Filter} [filter] - Optional filter function to exclude tokens from CSS output (e.g. for charting tokens need the component tokens for resolving, but don't want to output them in the CSS)
 * @property {(theme: string, mode: string) => ThemeInfo} getThemeInformation - Returns theme metadata
 * @property {(themesDir: string) => void} [postProcess] - Optional post-processing step (e.g. addMissingTokens)
 * @property {(themesDir: string) => void} [copyToDefault] - Optional copy step for light/dark aliases
 * @property {boolean} [createJsOutput=true] - Whether to create JS/TS exports
 * @property {boolean} [createScssOutput=true] - Whether to create SCSS exports
 */

/**
 * Returns the list of available themes from the given source directory.
 * @param {string} sourceDir - Directory containing JSON theme files
 * @returns {Array<{mode: string, theme: string}>}
 */
export const getAvailableThemesFromDir = (sourceDir) => {
  const themes = readdirSync(sourceDir);
  return themes.flatMap(theme => ({
    mode: theme.includes('light') ? 'light' : 'dark',
    theme: theme.replace('.json', ''),
  }));
};

/**
 * Copies the default theme (light + dark) CSS files to aliases in the themes folder.
 * @param {string} themesDir - The themes output directory
 * @param {string} defaultThemeName - Base name of the default theme (e.g. "sick2025")
 */
export const copyDefaultThemeAliases = (themesDir, defaultThemeName) => {
  const modes = ['light', 'dark'];
  modes.forEach(mode => {
    const srcFile = join(themesDir, `${defaultThemeName}_${mode}.css`);
    const destFile = join(themesDir, `${mode}.css`);
    try {
      copyFileSync(srcFile, destFile);
      console.log(styleText('green', `✔︎ Copied ${srcFile} → ${destFile}`));
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      console.warn(styleText('yellow', `⚠ Could not copy ${srcFile}: ${msg}`));
    }
  });
};

/**
 * Runs a full Style Dictionary build pipeline for a given set of theme JSON files.
 *
 * @param {PipelineConfig} config
 */
export const runBuildPipeline = async (config) => {
  const {
    buildPath,
    copyToDefault,
    createJsOutput = true,
    createScssOutput = true,
    filter,
    getThemeInformation,
    postProcess,
    prefix,
    sourceDir,
  } = config;

  await initStyleDictionary();

  const { author, name, version } = getPackageInformation();
  const verbosity = process.env.CI ? 'default' : 'verbose';

  const dictionary = new StyleDictionary({ log: { verbosity } });

  const fileHeaderName = `syn/header/${buildPath}`;
  StyleDictionary.registerFileHeader({
    fileHeader: (defaultMsg = []) => [
      `${name} version ${version}`,
      `${author.name}`,
      ...defaultMsg,
    ],
    name: fileHeaderName,
  });

  const themes = getAvailableThemesFromDir(sourceDir);
  const themesOutputPath = `${buildPath}themes/`;

  const cssRuns = themes.map(async ({ mode, theme }) => {
    const themeInformation = getThemeInformation(theme, mode);
    const themeInstance = await dictionary.extend({
      platforms: {
        css: {
          buildPath: themesOutputPath,
          files: [{
            destination: themeInformation.cssFileName,
            filter,
            format: 'syn/css-variable-formatter',
            options: {
              fileHeader: fileHeaderName,
              prefix,
              themeInformation,
              verbosity,
            },
          }],
          options: {
            changeOutputValues: themeInformation.changeOutputValues,
          },
          prefix,
          transformGroup: 'tokens-studio',
          transforms: [
            'name/kebab',
            'ts/size/px',
            'ts/opacity',
            'ts/size/lineheight',
            'ts/typography/fontWeight',
            'ts/size/css/letterspacing',
            'typography/css/shorthand',
            'fontFamily/css',
            'border/css/shorthand',
            'ts/color/css/hexrgba',
            'ts/color/modifiers',
            'shadow/css/shorthand',

            'syn/add-fallback-fonts',
            'syn/add-missing-quotes-for-strings',
            'syn/change-output-values',
            'syn/convert-letter-spacing-to-normal',
            'syn/fix-figma-background-blur',
          ],
        },
      },
      preprocessors: ['tokens-studio'],
      source: [`${sourceDir}/${themeInformation.theme}.json`, ...(themeInformation.additionalSources ?? [])],
    });

    return themeInstance.buildAllPlatforms();
  });

  await Promise.all(cssRuns);

  const themesDir = join(buildPath, 'themes');

  if (postProcess) {
    postProcess(themesDir);
  }

  if (copyToDefault) {
    copyToDefault(themesDir);
  }

  const fileHeader = await StyleDictionary.hooks.fileHeaders[fileHeaderName]();
  const lightCssFile = join(themesDir, 'light.css');

  if (createJsOutput) {
    createJS(
      fileHeader,
      lightCssFile,
      join(buildPath, 'js', 'index.js'),
    );
  }

  if (createScssOutput) {
    createSCSS(
      fileHeader,
      lightCssFile,
      join(buildPath, 'scss', '_tokens.scss'),
    );
  }
};
