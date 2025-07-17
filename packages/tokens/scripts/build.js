import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import StyleDictionary from 'style-dictionary';
import { register } from '@tokens-studio/sd-transforms';
import { cssVariableFormatter } from './formats/index.js';
import { createJS, createSCSS } from './outputs/index.js';
import {
  addFallbackFonts,
  addMissingQuotesForStrings,
} from './transforms/index.js';
import { addMissingTokens } from './add-missing-tokens.js';

await register(StyleDictionary);
StyleDictionary.registerTransform(addFallbackFonts);
StyleDictionary.registerTransform(addMissingQuotesForStrings);
StyleDictionary.registerFormat(cssVariableFormatter);

const config = {
  buildPath: './dist/',
  prefix: 'syn-',
};

/**
 * @type {{ author: Record<string, string>, name: string, version: string }} data
 */
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const data = JSON.parse(readFileSync('./package.json', 'utf-8'));
const { author, name, version } = data;

const dictionary = new StyleDictionary({});

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
const cssRuns = ['sick2018-dark', 'sick2018-light'].map(async theme => {
  const themeInstance = await dictionary.extend({
    platforms: {
      css: {
        buildPath: `${config.buildPath}themes/`,
        files: [{
          destination: `${theme}.css`,
          format: 'syn/css-variable-formatter',
          options: {
            fileHeader: 'syn/header',
            prefix: config.prefix,
            theme,
          },
        }],
        prefix: config.prefix,
        transformGroup: 'tokens-studio',
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
          'syn/add-fallback-fonts',
          'syn/add-missing-quotes-for-strings',
        ],
      },
    },
    preprocessors: ['tokens-studio'],
    source: [`./src/figma-variables/output-api/${theme}.json`, './src/figma-variables/styles.json'],
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
