import StyleDictionary from 'style-dictionary';
import { registerTransforms } from '@tokens-studio/sd-transforms';
import { calc } from './transforms/index.js';
import { readFileSync } from 'fs';
import { SDSTransformGroupDefault, SDSTransformGroupSASS } from './transformGroups.js';

const { author, name, version } = JSON.parse(readFileSync('./package.json'));

export class TokenBuilder {
  constructor({ sourcePaths, buildPath, prefix = 'es-' }) {
    this.sourcePaths = sourcePaths;
    this.buildPath = buildPath;
    this.prefix = prefix;

    this.init();
  }

  init() {
    this.registerBaseTransforms();
    this.registerTransforms();
    this.registerFormat(this.prefix);
  }

  registerBaseTransforms() {
    StyleDictionary.registerTransform(calc);
    registerTransforms(StyleDictionary);
    StyleDictionary.registerTransformGroup(SDSTransformGroupDefault);
    StyleDictionary.registerTransformGroup(SDSTransformGroupSASS);

    // Sets up custom file header
    StyleDictionary.registerFileHeader({
      fileHeader: (defaultMsg) => [
        `${name} version ${version}`,
        `${author.name}`,
        ...defaultMsg,
      ],
      name: 'sdsHeader',
    });
  }

  registerTransforms() {
    StyleDictionary.registerTransform({
      type: 'name',
      name: 'eds/add-color-name',
      matcher: (token) => token.type === 'color',
      transformer: (token) => {
        if (token.type === 'color' && !token.filePath.includes('semantic')) {
          token.name = token.name.replace(this.prefix, `${this.prefix}color-`);
        }
        return token.name;
      },
    });

    StyleDictionary.registerTransform({
      type: 'value',
      name: 'eds/add-fallback-fonts',
      matcher: (token) => token.type === 'fontFamilies',
      transformer: (token) => {
        if (token.name.includes('sans')) {
          token.value += `, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif,
    'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'`;
        } else if (token.name.includes('serif')) {
          token.value += ', Georgia, \'Times New Roman\', Times, serif';
        } else if (token.name.includes('mono')) {
          token.value += ', SFMono-Regular, Consolas, \'Liberation Mono\', Menlo, monospace';
        }
        return token.value;
      },
    });

    StyleDictionary.registerTransform({
      type: 'value',
      name: 'logger',
      matcher: (token) => true,
      transformer: (token) => token.value, // <- transform as needed
    });
  }

  registerFormat(prefix) {
    const { fileHeader, formattedVariables } = StyleDictionary.formatHelpers;

    StyleDictionary.registerFormat({
      name: 'myCustomFormat',
      formatter({ dictionary, file, options }) {
        const { outputReferences } = options;

        const isTokenColor = (token) => !token?.name.includes(`${prefix}color`) && typeof token?.original?.value === 'string' && token.original.value.includes('{');

        const convertOriginalToCssVar = (token) => {
          if (isTokenColor(token)) {
            token.value = `var(--${prefix}${token.original.type === 'color' && !token.original.value.includes('color') ? 'color-' : ''}${token.original.value
              .replace('{', '')
              .replace('}', '')
              .replace('.', '-')
              })`;
          }
          return token;
        };

        // eslint-disable-next-line max-len
        // go recursively through every dictionary.property, check if it has an original value and if it does, convert it to a css var
        const convertOriginalToCssVarRecursive = (dictionary) => {
          Object.keys(dictionary).forEach((key) => {
            if (!dictionary[key].hasOwnProperty('original') && !dictionary[key].hasOwnProperty('value')) {
              convertOriginalToCssVarRecursive(dictionary[key]);
            } else {
              dictionary[key] = convertOriginalToCssVar(dictionary[key]);
            }
          });
        };
        convertOriginalToCssVarRecursive(dictionary);

        return `${fileHeader({ file })}:root {${formattedVariables({ format: 'css', dictionary, outputReferences })}}`;
      },
    });
  }

  buildTokens() {
    return ['dark', 'light'].map((theme) => {
      const sd = StyleDictionary.extend({
        source: this.sourcePaths.concat(`./packages/tokens/src/figma-tokens/color/${theme}.json`),
        platforms: {
          css: {
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
              'eds/add-color-name',
              'eds/add-fallback-fonts',
            ],
            prefix: this.prefix,
            buildPath: this.buildPath,
            files: [
              {
                destination: `${theme}.css`,
                filter(token) { return !token.filePath.includes('primitive'); },
                format: 'myCustomFormat',
              },
            ],
          },
        },
      });
      sd.buildAllPlatforms();
    });
  }

  buildSCSSTokens() {
    const sdsStyleDictionaryConfig = ({
      platforms: {
        scss: {
          buildPath: `${this.buildPath}scss/`,
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
          prefix: this.prefix,
          transformGroup: SDSTransformGroupSASS.name,
        },
      },
      source: ['tokens/**/*.json'],
    });

    StyleDictionary
      .extend(sdsStyleDictionaryConfig)
      .buildAllPlatforms();
  }
}

export default TokenBuilder;
