import { existsSync } from 'node:fs';
import { copyFile } from 'node:fs/promises';
import { basename, join } from 'node:path';
import { rimraf } from 'rimraf';
import ora from 'ora';
import {
  createPath,
  fontsPath,
  getAbsolutePath,
} from '../utilities/index.js';

/**
 * List of relative paths to files that should be copied to the static metadata directory.
 */
const staticFilesToCopy = [
  'README.md',
  'CHANGELOG.md',
  'package.json',
].map(file => ([
  getAbsolutePath(`../../../../packages/fonts/${file}`),
  join(fontsPath, ''),
]));

/**
 * Sets up all wanted data from the fonts package and adds it to the static metadata.
 */
export const buildFonts = async () => {
  const spinner = ora({
    prefixText: 'Fonts:',
    text: 'Generating static metadata...',
  }).start();

  try {
    spinner.text = 'Cleaning up old metadata...';
    await rimraf(fontsPath);

    spinner.succeed('Old metadata cleaned up.');

    spinner.text = 'Creating new metadata directory...';

    // Create the fonts directory if it doesn't exist
    await createPath(fontsPath);

    spinner.succeed('New metadata directory created.');
    spinner.text = 'Copying files to metadata directory...';

    const staticFiles = staticFilesToCopy
      .filter(file => existsSync(file.at(0)!))
      .map(async ([staticFile, target]) => {
        await createPath(target);
        return copyFile(staticFile, join(target, basename(staticFile)));
      });

    await Promise.all(staticFiles);
    spinner.succeed('Framework metadata generated successfully.');

    spinner.succeed('Generation of metadata generated successfully.');
  } catch (error) {
    spinner.fail(`Failed to generate fonts metadata. Error: ${error as string}`);
    throw error; // Re-throw to handle it in the calling function
  }
};
