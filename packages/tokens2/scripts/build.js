import StyleDictionary from 'style-dictionary';
import { register } from '@tokens-studio/sd-transforms';
import { cssVariableFormatter } from './formats/css-vars.js';
import {
  addColorPrefix,
  addFallbackFonts,
  addMissingQuotesForStrings,
  useCssCalc,
} from './transforms/index.js';

register(StyleDictionary);
StyleDictionary.registerTransform(addColorPrefix);
StyleDictionary.registerTransform(addFallbackFonts);
StyleDictionary.registerTransform(addMissingQuotesForStrings);
StyleDictionary.registerTransform(useCssCalc);
StyleDictionary.registerFormat(cssVariableFormatter);

const config = {
  buildPath: './dist/',
  prefix: 'syn-',
  source: [
    './src/figma-tokens/color/primitives.json',
    './src/figma-tokens/globals.json',
    './src/figma-tokens/semantic/*.json',
  ],
};

const dictionary = new StyleDictionary();

['dark', 'light'].forEach(async theme => {
  const themeInstance = await dictionary.extend({
    preprocessors: ['tokens-studio'],
    platforms: {
      css: {
        buildPath: `${config.buildPath}themes/`,
        files: [{
          destination: `${theme}.css`,
          filter(token) { return !token.filePath.includes('primitive'); },
          format: 'syn/css-variable-formatter',
          options: {
            // fileHeader: 'syn/header',
            theme,
            prefix: config.prefix,
          },
        }],
        transforms: [
          'ts/descriptionToComment',
          'ts/size/px',
          'ts/opacity',
          'ts/size/lineheight',
          'ts/typography/fontWeight',
          'ts/size/css/letterspacing',
          'ts/color/css/hexrgba',
          'ts/color/modifiers',
          'typography/css/shorthand',
          'fontFamily/css',
          'shadow/css/shorthand',
          'border/css/shorthand',
          'name/kebab',
          'syn/add-color-prefix',
          'syn/add-fallback-fonts',
          'syn/use-css-calc',
          'syn/add-missing-quotes-for-strings',
        ],
        transformGroup: 'css',
        prefix: 'syn-',
      },
    },
    source: config.source.concat(`./src/figma-tokens/color/${theme}.json`),
  });
  
  themeInstance.buildAllPlatforms();
});

