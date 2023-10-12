import { TokenBuilder } from './build-tokens.js';
import { addMissingTokens } from './add-missing-tokens.js';

const createThemes = async () => {
  const tokenBuilder = new TokenBuilder({
    sourcePaths: [
      '../src/figma-tokens/color/primitives.json',
      '../src/figma-tokens/globals.json',
      '../src/figma-tokens/semantic/*.json',
    ],
    buildPath: '../dist/',
    prefix: 'sds-',
  });
  tokenBuilder.buildTokens();

  await addMissingTokens('sds');
  return Promise.resolve(true);
};

createThemes();
