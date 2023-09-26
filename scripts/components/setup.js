import {
  intro,
  outro,
  text,
  confirm,
  spinner,
  group,
  cancel,
} from '@clack/prompts';
import fs from 'fs';
import path from 'path';
import 'dotenv/config';
import { saveConfig } from '../basics/config.js';


const s = spinner();

export const setupComponents = async (config) => {

  if (!config.componentsPath) {
    intro(`4/4 – 🧩 Components`)

    await group(
      {
        setup: async () => {
          config.componentsPath = await confirm({
            message: 'Do you want to setup the default configuration for components?',
          });
          config.componentsPath = './packages/components';
          config.lockFilesForVSCode = true;
          config.updateGitignore = false;

          saveConfig(config);
        },
      },
      {
        onCancel: ({ results }) => {
          cancel('Operation cancelled.');
          process.exit(0);
        },
      }
    );

    function copyFolderRecursiveSync(source, target) {
      if (!fs.existsSync(target)) {
        fs.mkdirSync(target);
      }

      if (fs.lstatSync(source).isDirectory()) {
        fs.readdirSync(source).forEach(file => {
          const curSource = path.join(source, file);
          if (fs.lstatSync(curSource).isDirectory()) {
            copyFolderRecursiveSync(curSource, path.join(target, file));
          } else {
            fs.copyFileSync(curSource, path.join(target, file));
          }
        });
      }
    }
    const s = spinner();

    s.start('Copying files...')

    const sourceFolder = './scripts/components/template';
    const targetFolder = config.componentsPath;

    copyFolderRecursiveSync(sourceFolder, targetFolder);

    s.stop('Files copied.')

    outro('✅ Components setup done.')
  }
};
