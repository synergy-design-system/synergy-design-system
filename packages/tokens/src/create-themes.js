import {
  spinner,
} from '@clack/prompts';
import { TokenBuilder } from './build-tokens.js';
import { addMissingTokens } from './add-missing-tokens.js';
import 'dotenv/config';

export const createThemes = async (config) => {

  const s = spinner();
  s.start('Creating themes');

  const tokenBuilder = new TokenBuilder({
    sourcePaths: [
      './packages/tokens/src/figma-tokens/colors/primitives.json',
      './packages/tokens/src/figma-tokens/globals.json',
      './packages/tokens/src/figma-tokens/semantics/*.json'
    ],
    buildPath: 'packages/tokens/src/',
    prefix: config.libraryPrefix + '-',
  });
  tokenBuilder.buildTokens();

  await addMissingTokens(config.libraryPrefix);

  s.stop('Themes created');
  return Promise.resolve(true);
}
