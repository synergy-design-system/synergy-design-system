import { TokenBuilder } from './build-tokens.js';
import { addMissingTokens } from './add-missing-tokens.js';
import 'dotenv/config';

export const createThemes = async (config) => {
  const tokenBuilder = new TokenBuilder({
    sourcePaths: [
      '../src/colors/figma-tokens/primitives.json',
      '../src/colors/figma-tokens/globals.json',
      '../src/colors/figma-tokens/semantics/*.json',
    ],
    buildPath: '../dist/',
    prefix: `${config.libraryPrefix}-`,
  });
  tokenBuilder.buildTokens();

  await addMissingTokens(config.libraryPrefix);
  return Promise.resolve(true);
};
