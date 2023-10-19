import { readFileSync } from 'fs';
import StyleDictionary from 'style-dictionary';
import { registerTransforms } from '@tokens-studio/sd-transforms';
import {
  addColorName,
  addFallbackFonts,
  addQuotesForStrings,
  calc,
  createCssVariables,
  log,
} from './transforms/index.js';
import { addMissingTokens } from './add-missing-tokens.js';

const { author, name, version } = JSON.parse(readFileSync('./package.json'));

const config = {
  buildPath: './dist/',
  prefix: 'syn-',
  sourcePaths: [
    './src/figma-tokens/color/primitives.json',
    './src/figma-tokens/globals.json',
    './src/figma-tokens/semantic/*.json',
  ],
};

registerTransforms(StyleDictionary);
StyleDictionary.registerTransform(calc);
StyleDictionary.registerTransform(addColorName);
StyleDictionary.registerTransform(addFallbackFonts);
StyleDictionary.registerTransform(addQuotesForStrings);
StyleDictionary.registerTransform(createCssVariables);
StyleDictionary.registerTransform(log);

// Sets up custom file header
StyleDictionary.registerFileHeader({
  fileHeader: (defaultMsg) => [
    `${name} version ${version}`,
    `${author.name}`,
    ...defaultMsg,
  ],
  name: 'syn/header',
});

['dark', 'light'].forEach((theme) => {
  StyleDictionary.extend({
    platforms: {
      css: {
        buildPath: `${config.buildPath}css/`,
        files: [
          {
            destination: `${theme}.css`,
            filter(token) { return !token.filePath.includes('primitive'); },
            format: 'css/variables',
            options: {
              fileHeader: 'syn/header',
              outputReferences: true,
            },
          },
        ],
        prefix: config.prefix,
        transforms: [
          'ts/descriptionToComment',
          'ts/size/px',
          'ts/opacity',
          'ts/size/lineheight',
          'ts/typography/fontWeight',
          'ts/size/css/letterspacing',
          'ts/typography/css/fontFamily',
          'ts/typography/css/shorthand',
          'ts/border/css/shorthand',
          'ts/shadow/css/shorthand',
          'ts/color/css/hexrgba',
          'ts/color/modifiers',
          'name/cti/kebab',
          'syn/add-color-name',
          'syn/add-fallback-fonts',
          'syn/calc',
          'syn/add-missing-quotes-for-strings',
          'syn/create-css-variables',
        ],
      },
    },
    source: config.sourcePaths.concat(`./src/figma-tokens/color/${theme}.json`),
  }).buildAllPlatforms();
});

addMissingTokens('syn');
