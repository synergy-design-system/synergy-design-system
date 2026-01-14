import fs from 'node:fs/promises';
import { fileURLToPath } from 'url';
import path from 'path';
import { globby } from 'globby';
import { rimraf } from 'rimraf';
import ora from 'ora';
import {
  createPath,
  tokensPath,
} from '../utilities/index.js';

/**
 * List of relative paths to files that should be copied to the static metadata directory.
 */
const filesToCopy = [
  'README.md',
  'CHANGELOG.md',
  'dist/js/*.js',
  'dist/themes/*.css',
];

/**
 * Sets up all wanted data from the tokens package and adds it to the static metadata.
 */
export const buildTokens = async () => {
  const spinner = ora({
    prefixText: 'Tokens:',
    text: 'Generating static metadata...',
  }).start();

  try {
    spinner.text = 'Cleaning up old metadata...';
    await rimraf(tokensPath);

    spinner.succeed('Old metadata cleaned up.');

    spinner.text = 'Creating new metadata directory...';

    // Create the tokens directory if it doesn't exist
    await createPath(tokensPath);

    spinner.succeed('New metadata directory created.');
    spinner.text = 'Copying files to metadata directory...';

    // Get the module's root directory
    // Note that the default export resolves to dist/js/index.js,
    // so we need to go up two levels to get to the root of the package!
    const moduleUrl = import.meta.resolve('@synergy-design-system/tokens');
    const modulePath = fileURLToPath(moduleUrl);
    const moduleDir = path.join(path.dirname(modulePath), '../../');

    // Process the files (placeholder for actual logic)
    const contents = await globby(filesToCopy, {
      cwd: moduleDir,
      onlyFiles: true,
    });

    // Write the files to the tokens directory into a flat structure
    const copies = contents.map(file => {
      const sourcePath = path.join(moduleDir, file);
      const destPath = path.join(tokensPath, path.basename(file));
      return fs.copyFile(sourcePath, destPath);
    });
    await Promise.all(copies);

    spinner.succeed('Tokens metadata generated successfully.');
  } catch (error) {
    spinner.fail(`Failed to generate tokens metadata. Error: ${error as string}`);
    throw error; // Re-throw to handle it in the calling function
  }
};
