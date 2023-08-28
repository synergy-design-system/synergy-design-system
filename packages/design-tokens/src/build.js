import { registerTransforms, transforms } from '@tokens-studio/sd-transforms';
import StyleDictionary from 'style-dictionary';
import { readFileSync } from 'fs';

const { author, name, version } = JSON.parse(readFileSync('./package.json'));
const buildPath = 'build/';

// Set sds as our global variable prefix
const tokenPrefix = 'sds';

// Set up our own custom transform group
const sdsTransformGroup = `${tokenPrefix}/tokens-studio`;

// Use @tokens-studio/sd-transforms from Tokens.Studio Figma plugin
// Register them on StyleDictionary object
// that is installed as a dependency of this package.
// @see https://github.com/tokens-studio/sd-transforms
registerTransforms(StyleDictionary);

// Register custom tokens-studio transform group
// to add 'name/cti/kebab' for the token names
StyleDictionary.registerTransformGroup({
  name: sdsTransformGroup,
  transforms: [...transforms, 'name/cti/kebab'],
});

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
        },
      }],
      prefix: tokenPrefix,
      transformGroup: sdsTransformGroup,
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
      prefix: tokenPrefix,
      transformGroup: 'tokens-studio',
    },
    scss: {
      buildPath: `${buildPath}scss/`,
      files: [{
        destination: '_tokens.scss',
        format: 'scss/variables',
        options: {
          fileHeader: 'sdsHeader',
        },
      }],
      options: {
        themeable: true,
      },
      prefix: tokenPrefix,
      transformGroup: sdsTransformGroup,
    },
  },
  source: ['tokens/**/*.json'],
});

StyleDictionary
  .extend(sdsStyleDictionaryConfig)
  .buildAllPlatforms();
