import StyleDictionary from 'style-dictionary';
import { registerTransforms } from '@tokens-studio/sd-transforms';
import { calc } from './transforms/index.js';
import { readFileSync } from 'fs';
import { SDSTransformGroupDefault, SDSTransformGroupSASS } from './transformGroups.js';

const { author, name, version } = JSON.parse(readFileSync('./package.json'));

function registerFormat(prefix) {
  const { fileHeader, formattedVariables } = StyleDictionary.formatHelpers;

  /**
   * tokens-to-recursive-css-variables
   */
  StyleDictionary.registerFormat({
    name: 'tokens-to-recursive-css-variables',
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
    }
  });

  StyleDictionary.registerFormat({
    name: 'tokens-to-scss-variables',
    formatter({ dictionary, file, options }) {
      const { outputReferences } = options;

      const isTokenColor = (token) => {
        return token?.original?.value && typeof token.original.value === 'string' && token.original.value.includes('{');
      };

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

      const convertOriginalToScssVarRecursive = (dict) => {
        Object.keys(dict).forEach((key) => {
          if (dict[key].value) {
            dict[key] = convertOriginalToCssVar(dict[key]);
          } else if (typeof dict[key] === 'object') {
            convertOriginalToScssVarRecursive(dict[key]);
          }
        });
      };

      convertOriginalToScssVarRecursive(dictionary.properties);

      let scssString = formattedVariables({ dictionary, format: 'scss', outputReferences });
      scssString = scssString.split('\n')
        .map(line => {
          if (line.trim() === '') return line; 
          return `$${line.trim().replace(' =', ':')};`; 
        })
        .join('\n');

      return `${fileHeader({ file })}${scssString}`;
    }
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
      transformer: (token) => token.value,
      type: 'value',
    });
  }

  buildTokens() {
    return ['dark', 'light'].forEach((theme) => {
      const sd = StyleDictionary.extend({
        platforms: {
          css: {
            buildPath: `${this.buildPath}css/`,
            files: [
              {
                destination: `${theme}.css`,
                filter(token) { return !token.filePath.includes('primitive'); },
                format: 'tokens-to-recursive-css-variables',
                options: {
                  fileHeader: 'sdsHeader',
                  outputReferences: true,
                },
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

  //move to dist/ folder
  buildSCSSTokens() {
    const sdsStyleDictionaryConfig = ({
      platforms: {
        scss: {
          buildPath: `${this.buildPath}scss/`,
          files: [
            {
            destination: `tokens.scss`,
            filter(token) { return !token.filePath.includes('primitive') && !token.filePath.includes('dark') && !token.filePath.includes('_docs'); },
            format: 'tokens-to-scss-variables',
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
      source: ['src/figma-tokens/**/*.json'],
    });

    StyleDictionary
      .extend(sdsStyleDictionaryConfig)
      .buildAllPlatforms();
  }
}

export default TokenBuilder;
