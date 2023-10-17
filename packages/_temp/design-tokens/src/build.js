import { readFileSync } from 'fs';
import { registerTransforms } from '@tokens-studio/sd-transforms';
import StyleDictionary from 'style-dictionary';
import { buildPath, prefix } from './config.js';
import { calc } from './transforms/index.js';
import { SDSTransformGroupDefault, SDSTransformGroupSASS } from './transformGroups.js';

const { author, name, version } = JSON.parse(readFileSync('./package.json'));

// Add support for sds custom transforms
StyleDictionary.registerTransform(calc);

// Use @tokens-studio/sd-transforms from Tokens.Studio Figma plugin
// Register them on StyleDictionary object
// that is installed as a dependency of this package.
// @see https://github.com/tokens-studio/sd-transforms
registerTransforms(StyleDictionary);

StyleDictionary.registerTransformGroup(SDSTransformGroupDefault);
StyleDictionary.registerTransformGroup(SDSTransformGroupSASS);

// Set up our custom file header for better comments
StyleDictionary.registerFileHeader({
  fileHeader: (defaultMsg) => [
    `${name} version ${version}`,
    `${author.name}`,
    ...defaultMsg,
  ],
  name: 'sdsHeader',
});

const sdsStyleDictionaryConfig = ({
  platforms: {
    css: {
      buildPath: `${buildPath}css/`,
      files: [{
        destination: 'tokens.css',
        format: 'css/variables',
        options: {
          fileHeader: 'sdsHeader',
          outputReferences: true,
        },
      }],
      prefix,
      transformGroup: SDSTransformGroupDefault.name,
    },
    js: {
      buildPath: `${buildPath}js/`,
      files: [
        {
          destination: 'index.js',
          format: 'javascript/es6',
          options: {
            fileHeader: 'sdsHeader',
          },
        },
        {
          destination: 'index.d.ts',
          format: 'typescript/es6-declarations',
          options: {
            fileHeader: 'sdsHeader',
          },
        },
      ],
      prefix,
      transformGroup: 'tokens-studio',
    },
    scss: {
      buildPath: `${buildPath}scss/`,
      files: [{
        destination: '_tokens.scss',
        format: 'scss/variables',
        options: {
          fileHeader: 'sdsHeader',
          outputReferences: true,
        },
      }],
      options: {
        themeable: true,
      },
      prefix,
      transformGroup: SDSTransformGroupSASS.name,
    },
  },
  source: [
    'tokens/core/*.json', // Core tokens
    'tokens/semantic/colors-light.json', // Currently, we only support default tokens
    'tokens/semantic/typography-default.json', // Currently, we only support default tokens
  ],
});

StyleDictionary
  .extend(sdsStyleDictionaryConfig)
  .buildAllPlatforms();
