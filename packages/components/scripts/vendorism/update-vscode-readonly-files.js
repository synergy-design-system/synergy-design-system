/* eslint-disable no-restricted-syntax */
/* eslint-disable no-console */
/* eslint-disable complexity */
import fs from 'fs';
import path from 'path';
import { optimizePathForWindows } from 'vendorism/src/scripts/helpers.js';
import prettier from 'prettier';

// eslint-disable-next-line import/no-relative-packages
import prettierConfig from '../../../../prettier.config.js';

export async function updateVsCodeReadOnlyFiles(
  remove,
  add,
  settingsPath = '../../.vscode/settings.json',
) {
  try {
    // Default settings object
    let settings = {};

    // If settings.json exists, read and parse it
    if (fs.existsSync(settingsPath)) {
      console.log('📖 Reading existing settings.json file...');
      const rawData = fs.readFileSync(settingsPath, 'utf8');
      settings = JSON.parse(rawData);
    } else {
      console.log('settings.json does not exist.');
    }

    // Initialize files.readonlyInclude if it doesn't exist
    settings['files.readonlyInclude'] = settings['files.readonlyInclude'] || {};

    // Removes files from files.readonlyInclude
    for (const file of remove) {
      let optimizedFile = optimizePathForWindows(file).replace(/\/\//g, '/');
      const relativePathTest = /^\.?(\/|\\)/;
      const isRelative = relativePathTest.test(optimizedFile);
      const isAbsolute = path.isAbsolute(optimizedFile);

      if (isRelative) {
        console.error('⚠️  Ejected file should not start with an "." or "./". It should look like "src/declaration.d.ts"');
        optimizedFile = optimizedFile.replace(relativePathTest, '');
      } else if (isAbsolute) {
        console.error('⚠️  Ejected file should not be an absolute path. It should look like "src/declaration.d.ts".');
        const findPackage = optimizedFile.search(/packages\/components\//);
        optimizedFile = optimizedFile.slice(findPackage + 20);
      }

      // Special treatment for copied stories
      // We have to adjust the path again here
      if (file.startsWith('src/temp') && file.endsWith('stories.ts')) {
        optimizedFile = file.replace('src/temp', 'packages/docs/stories/components');
      }

      if (!settings['files.readonlyInclude'] || !settings['files.readonlyInclude'][`packages/components/${optimizedFile}`]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      delete settings['files.readonlyInclude'][`packages/components/${optimizedFile}`];

      if (isRelative || isAbsolute) {
        console.error('⚠️  A suitable entry was found and therefore removed anyway.');
      }
    }

    const readonlyFiles = {};
    for (const file of add) {
      // Special treatment for copied stories
      // We have to adjust the path again here
      if (file.startsWith('./src/temp') && file.endsWith('stories.ts')) {
        readonlyFiles[file.replace('./src/temp', 'packages/docs/stories/components')] = true;
      } else {
        readonlyFiles[`packages/components/${file}`] = true;
      }
    }

    // Override files.readonlyInclude with the provided files object
    settings['files.readonlyInclude'] = {
      ...readonlyFiles,
      ...settings['files.readonlyInclude'],
    };

    // Sort the files object alphabetically
    const sortedFiles = {};
    Object.keys(settings['files.readonlyInclude']).sort().forEach((key) => {
      sortedFiles[key] = settings['files.readonlyInclude'][key];
    });
    settings['files.readonlyInclude'] = sortedFiles;

    // Write the updated settings back to settings.json
    console.log('🖊️ Writing to settings.json file...');
    await fs.mkdirSync(settingsPath.split('/').slice(0, -1).join('/'), { recursive: true });
    await fs.writeFileSync(settingsPath, JSON.stringify(settings), 'utf8');

    const blob = fs.readFileSync(settingsPath);
    const formattedFile = await prettier.format(blob.toString(), {
      ...prettierConfig,
      parser: 'json',
    });

    await fs.writeFileSync(settingsPath, formattedFile, 'utf8');
  } catch (error) {
    console.error('An error occurred while updating settings:', error);
  }
}
