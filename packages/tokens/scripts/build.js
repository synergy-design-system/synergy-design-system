import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import StyleDictionary from 'style-dictionary';
import { register } from '@tokens-studio/sd-transforms';
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
  source: [
    './src/figma-tokens/brand/synergy24.json',
    './src/figma-tokens/globals.json',
    './src/figma-tokens/semantic/*.json',
  ],
};

/**
 * @type {{ author: Record<string, string>, name: string, version: string }} data
 */
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const data = JSON.parse(readFileSync('./package.json', 'utf-8'));
const { author, name, version } = data;

const dictionary = new StyleDictionary();

// Sets up custom file header
StyleDictionary.registerFileHeader({
  fileHeader: (defaultMsg = []) => [
    `${name} version ${version}`,
    `${author.name}`,
    ...defaultMsg,
  ],
  name: 'syn/header',
});

// eslint-disable-next-line @typescript-eslint/no-misused-promises
const cssRuns = ['dark', 'light'].map(async theme => {
  const themeInstance = await dictionary.extend({
    platforms: {
      css: {
        buildPath: `${config.buildPath}themes/`,
        files: [{
          destination: `${theme}.css`,
          filter(token) { return !token.filePath.includes('brand'); },
          format: 'syn/css-variable-formatter',
          options: {
            fileHeader: 'syn/header',
            prefix: config.prefix,
            theme,
          },
        }],
        prefix: config.prefix,
        // transformGroup: 'tokens-studio',
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
    source: config.source.concat(`./src/figma-tokens/theme/${theme}.json`),
  });

  return themeInstance.buildAllPlatforms();
});

await Promise.all(cssRuns);

addMissingTokens(
  'syn',
  join(config.buildPath, 'themes'),
);

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
