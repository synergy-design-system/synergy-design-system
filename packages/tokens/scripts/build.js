import { readFileSync } from 'fs';
import StyleDictionary from 'style-dictionary';
import { registerTransforms } from '@tokens-studio/sd-transforms';
import { calc, addColorName, addFallbackFonts, log, transformTokenNameForScss, transformTokenValueForScss, transformTokenValueForCss } from './transforms/index.js';
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
StyleDictionary.registerTransform(transformTokenNameForScss);
StyleDictionary.registerTransform(transformTokenValueForScss);
StyleDictionary.registerTransform(transformTokenValueForCss);
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
          'ts/resolveMath',
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
          'syn/transform-token-value-for-css'
        ],
      },
    },
    source: config.sourcePaths.concat(`./src/figma-tokens/color/${theme}.json`),
  }).buildAllPlatforms();
});

StyleDictionary.extend({
  platforms: {
    scss: {
      buildPath: `${config.buildPath}scss/`,
      files: [
        {
        destination: `tokens.scss`,
        filter(token) { return !token.filePath.includes('primitive') && !token.filePath.includes('dark') && !token.filePath.includes('_docs'); },
          format: 'scss/variables',
        options: {
          fileHeader: 'syn/header',
          outputReferences: true,
        },
      }],
      options: {
        themeable: true,
      },
      prefix: config.prefix,
      transforms: [
        'name/cti/kebab',
        'syn/add-color-name',
        'syn/transform-token-name-for-scss',
        'syn/transform-token-value-for-scss'
      ],
    },
  },
  source: ['./src/figma-tokens/**/*.json'],
}).buildAllPlatforms();

addMissingTokens('syn');
