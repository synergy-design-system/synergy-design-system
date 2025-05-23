import { join } from 'node:path';
import StyleDictionary from 'style-dictionary';
import { register } from '@tokens-studio/sd-transforms';
import {
  getAvailableThemes,
  getInformationForTheme,
  getPackageInformation,
} from './helpers.js';
import { cssVariableFormatter } from './formats/index.js';
import { createJS, createSCSS } from './outputs/index.js';
import {
  addColorPrefix,
  addFallbackFonts,
  addMissingQuotesForStrings,
  adjustShadow,
  useCssCalc,
} from './transforms/index.js';
import { addMissingTokens } from './add-missing-tokens.js';
import { copyToDefaultLocation } from './copyToDefault.js';

await register(StyleDictionary);
StyleDictionary.registerTransform(addColorPrefix);
StyleDictionary.registerTransform(addFallbackFonts);
StyleDictionary.registerTransform(addMissingQuotesForStrings);
StyleDictionary.registerTransform(adjustShadow);
StyleDictionary.registerTransform(useCssCalc);

StyleDictionary.registerFormat(cssVariableFormatter);

const config = {
  buildPath: './dist/',
  prefix: 'syn-',
};

const { author, name, version } = getPackageInformation();

const dictionary = new StyleDictionary({
  log: {
    verbosity: 'verbose',
  },
});

// Sets up custom file header
StyleDictionary.registerFileHeader({
  fileHeader: (defaultMsg = []) => [
    `${name} version ${version}`,
    `${author.name}`,
    ...defaultMsg,
  ],
  name: 'syn/header',
});

// @todo: Draw from file system!
const cssRuns = getAvailableThemes().map(async ({ theme, mode }) => {
  const themeInformation = getInformationForTheme(theme, mode);
  const themeInstance = await dictionary.extend({
    platforms: {
      css: {
        buildPath: `${config.buildPath}themes/`,
        files: [{
          destination: themeInformation.cssFileName,
          filter(token) { return !token.filePath.includes('brand'); },
          format: 'syn/css-variable-formatter',
          options: {
            fileHeader: 'syn/header',
            prefix: config.prefix,
            themeInformation,
          },
        }],
        prefix: config.prefix,
        transforms: [
          'name/kebab',
          'ts/descriptionToComment',
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
          'syn/add-color-prefix',
          'syn/add-fallback-fonts',
          'syn/use-css-calc',
          'syn/add-missing-quotes-for-strings',
          'syn/adjust-shadow',
        ],
      },
    },
    preprocessors: ['tokens-studio'],
    source: [
      `./src/figma-tokens/theme/${themeInformation.theme}.json`,
      './src/figma-tokens/globals.json',
      './src/figma-tokens/semantic/*.json',
      `./src/figma-tokens/mode/${mode}.json`,
    ],
  });

  return themeInstance.buildAllPlatforms();
});

await Promise.all(cssRuns);

addMissingTokens(
  'syn',
  join(config.buildPath, 'themes'),
);

copyToDefaultLocation(join(config.buildPath, 'themes'));

const fileHeader = await StyleDictionary.hooks.fileHeaders['syn/header']();
createJS(
  fileHeader,
  join(config.buildPath, 'themes', 'light.css'),
  join(config.buildPath, 'js', 'index.js'),
);

createSCSS(
  fileHeader,
  join(config.buildPath, 'themes', 'light.css'),
  join(config.buildPath, 'scss', '_tokens.scss'),
);
