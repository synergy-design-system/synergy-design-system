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
};

/**
 * @type {{ author: Record<string, string>, name: string, version: string }} data
 */
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const data = JSON.parse(readFileSync('./package.json', 'utf-8'));
const { author, name, version } = data;

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

const cssRuns = ['brand25', 'synergy24'].map(brand => ['dark', 'light']
  .map(async theme => {
    // Make sure to save the original synergy themes as "light" and "dark"
    // and the new ones as "brand25-light" and "brand25-dark".
    // For the next major release, we will remove the old theme names for a unified file name.
    const initialName = brand === 'synergy24' ? theme : `${brand}-${theme}`;
    const destination = `${initialName}.css`;
    const selector = `.syn-theme-${initialName}`;

    const themeInstance = await dictionary.extend({
      platforms: {
        css: {
          buildPath: `${config.buildPath}themes/`,
          files: [{
            destination,
            filter(token) { return !token.filePath.includes('brand'); },
            format: 'syn/css-variable-formatter',
            options: {
              fileHeader: 'syn/header',
              prefix: config.prefix,
              selector,
              theme,
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
        `./src/figma-tokens/brand/${brand}.json`,
        './src/figma-tokens/globals.json',
        './src/figma-tokens/semantic/*.json',
        `./src/figma-tokens/theme/${theme}.json`,
      ],
    });

    return themeInstance.buildAllPlatforms();
  }))
  .flat();

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
