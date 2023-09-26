import {
  intro,
  outro,
  confirm,
  spinner,
  group,
  cancel,
} from '@clack/prompts';
import { fetchAssets } from '../assets/fetch-assets.js';
import 'dotenv/config';
import { saveConfig } from '../basics/config.js';

export const setupAssets = async (config) => {

  if (!config.assetsPath) {

    intro(`2/4 – 📎 Assets`)

    // Step 2: Assets
    await group(
      {
        assetsPath: async () => {
          if (!config.assetsPath) {
            config.assetsPath = await confirm({
              message: 'Do you want to setup the default configuration for assets?',
            });
            config.assetsPath = './packages/assets/src';
            saveConfig(config);
          }
        },
        downloadAssets: async () => {
          const downloadAll = await confirm({
            message: 'Would you like to download all assets found in the Figma file?',
          });
          if (downloadAll) {
            await fetchAssets({
              // figmaPersonalToken: config.figmaPersonalToken,
              figmaFileId: config.figmaFileId,
              assetsPath: config.assetsPath,
            });
          }
        }
      },
      {
        onCancel: () => {
          cancel('Operation cancelled.');
          process.exit(0);
        },
      }
    );

    outro('✅ Assets done.')

  }

};
