import StyleDictionary from 'style-dictionary';
import { registerTransforms } from '@tokens-studio/sd-transforms';
import { calc } from './transforms/index.js';
import { readFileSync } from 'fs';
import { SDSTransformGroupDefault, SDSTransformGroupSASS } from './transformGroups.js';

const { author, name, version } = JSON.parse(readFileSync('./package.json'));

function registerFormat(prefix) {
  const { fileHeader, formattedVariables } = StyleDictionary.formatHelpers;

  StyleDictionary.registerFormat({
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
      const convertOriginalToCssVarRecursive = (dict) => {
        Object.keys(dict).forEach((key) => {
          if (!dict[key].hasOwnProperty('original') && !dict[key].hasOwnProperty('value')) {
            convertOriginalToCssVarRecursive(dict[key]);
          } else {
            dict[key] = convertOriginalToCssVar(dict[key]);
          }
        });
      };
      convertOriginalToCssVarRecursive(dictionary);

      return `${fileHeader({ file })}:root {${formattedVariables({ dictionary, format: 'css', outputReferences })}}`;
    },
    name: 'myCustomFormat',
  });
}

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
    registerFormat(this.prefix);
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
      matcher: (token) => token.type === 'color',
      name: 'eds/add-color-name',
      transformer: (token) => {
        if (token.type === 'color' && !token.filePath.includes('semantic')) {
          token.name = token.name.replace(this.prefix, `${this.prefix}color-`);
        }
        return token.name;
      },
      type: 'name',
    });

    StyleDictionary.registerTransform({
      matcher: (token) => token.type === 'fontFamilies',
      name: 'eds/add-fallback-fonts',
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
      type: 'value',
    });

    StyleDictionary.registerTransform({
      matcher: () => true,
      name: 'logger',
      transformer: (token) => token.value, // <- transform as needed
      type: 'value',
    });
  }

  buildTokens() {
    return ['dark', 'light'].forEach((theme) => {
      const sd = StyleDictionary.extend({
        platforms: {
          css: {
            buildPath: this.buildPath,
            files: [
              {
                destination: `${theme}.css`,
                filter(token) { return !token.filePath.includes('primitive'); },
                format: 'myCustomFormat',
              },
            ],
            prefix: this.prefix,
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
          },
        },
        source: this.sourcePaths.concat(`./packages/tokens/src/figma-tokens/color/${theme}.json`),
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
