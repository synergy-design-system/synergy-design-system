import {
  intro,
  outro,
  confirm,
  spinner,
  group,
  cancel,
  select,
} from '@clack/prompts';
import 'dotenv/config';
import { saveConfig } from '../basics/config.js';
import { createThemes } from './create-themes.js';
import fs from 'fs';

export const setupTokens = async (config) => {

  if (!config.tokensPath) {

    intro(`3/4 – 💬 Tokens`)

    await group(
      {
        tokensPath: async () => {
          config.tokensPath = await confirm({
            message: 'Do you want to setup the default configuration for tokens?',
          });
          if (config.tokensPath !== true) return Promise.resolve(false);
          config.tokensPath = './packages/tokens/src';
          // recursively create the directory
          fs.mkdirSync(config.tokensPath + '/figma-tokens', { recursive: true });
          saveConfig(config);
        },
        syncTokens: () => confirm({ message: 'Would you like to sync your tokens now?' }),
        tokenSyncMethod: async ({ results }) => {
          if (results.syncTokens) {
            return select({
              message: 'How would you like to sync the tokens?',
              options: [
                { value: 'export', label: 'File Export' },
                { value: 'git', label: 'Git Sync (recommended)' }
              ],
            });
          }
          return Promise.resolve(null);
        },
        tokensSynced: async ({ results }) => {
          if (results.syncTokens) {
            let instruction;
            if (results.tokenSyncMethod === 'export') {
              instruction = 'Open "Tokens Studio" in Figma. Click on "Tools" -> "Export to File Folder". Save directly into the `packages/tokens/src` folder. Confirm when your export is done.';
            } else {
              instruction = 'Open "Tokens Studio" in Figma. Click on "Settings" -> "Sync Providers" -> "Add Sync Provider" and provide the needed credentials. Confirm when your first sync is done.';
            }
            return confirm({ message: instruction });
          }
          return Promise.resolve(false);
        },
        themesCreationSpinner: async ({ results }) => {
          if (results.tokensSynced) {
            await createThemes(config);
          }
          return Promise.resolve(false);
        },
      },
      {
        onCancel: ({ results }) => {
          cancel('Operation cancelled.');
          process.exit(0);
        },
      }
    );

    outro('✅ Tokens done.')
  }
};
