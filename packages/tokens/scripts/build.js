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
import { FIGMA_STYLES_PATH, OUTPUT_DIR } from './config.js';

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

const availableThemes = [
  {
    input: 'sick2018-light',
    theme: 'light',
  },
  {
    input: 'sick2018-dark',
    theme: 'dark',
  },
];

// eslint-disable-next-line @typescript-eslint/no-misused-promises
const cssRuns = availableThemes.map(async ({ input, theme }) => {
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
          'syn/add-fallback-fonts',
          'syn/add-missing-quotes-for-strings',
        ],
      },
    },
    preprocessors: ['tokens-studio'],
    source: [
      `${OUTPUT_DIR}/${input}.json`,
      FIGMA_STYLES_PATH,
    ],
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
