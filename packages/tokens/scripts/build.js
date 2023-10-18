import { TokenBuilder } from './build-tokens.js';
import { addMissingTokens } from './add-missing-tokens.js';

const createThemes = async () => {
  const tokenBuilder = new TokenBuilder({
    buildPath: './dist/',
    prefix: 'syn-',
    sourcePaths: [
      '../src/figma-tokens/color/primitives.json',
      '../src/figma-tokens/globals.json',
      '../src/figma-tokens/semantic/*.json',
    ],
  });

  tokenBuilder.buildTokens();
  tokenBuilder.buildSCSSTokens();

  await addMissingTokens('syn');
  return Promise.resolve(true);
};

createThemes();
