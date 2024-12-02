import StyleDictionary from 'style-dictionary';
import { register } from '@tokens-studio/sd-transforms';

register(StyleDictionary);

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
          format: 'css/variables',
        }],
        transforms: [
          'ts/descriptionToComment',
          'ts/size/px',
          'ts/opacity',
          'ts/size/lineheight',
          'ts/typography/fontWeight',
          'ts/size/css/letterspacing',
          // 'ts/typography/css/fontFamily',
          // 'ts/typography/css/shorthand',
          // 'ts/border/css/shorthand',
          // 'ts/shadow/css/shorthand',
          // 'ts/color/css/hexrgba',
          // 'ts/color/modifiers',
          // 'name/cti/kebab',
        ],
        transformGroup: 'css',
        prefix: 'syn-',
      },
    },
    source: config.source.concat(`./src/figma-tokens/color/${theme}.json`),
  });
  
  themeInstance.buildAllPlatforms();
});

