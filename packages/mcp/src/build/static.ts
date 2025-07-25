import { existsSync } from 'node:fs';
import { copyFile } from 'node:fs/promises';
import { join } from 'node:path';
import ora from 'ora';
import {
  createPath,
  getAbsolutePath,
  setupPath,
} from '../utilities/index.js';

/**
 * List of static files that should be copied to the static metadata directory.
 */
const staticFilesToCopy = [
  // The icon usage documentation needs to be copied to the static metadata directory
  [
    getAbsolutePath('../../../../packages/docs/src/static/icon-usage.md'),
    join(setupPath, 'icon-usage.md'),
  ],
  // Copy prerequisites as it includes information about font setup
  [
    getAbsolutePath('../../../../packages/docs/src/static/prerequisites.md'),
    join(setupPath, 'prerequisites.md'),
  ],
];

/**
 * Sets up all data from the components and framework packages and adds them to the static metadata.
 */
export const buildStaticFiles = async () => {
  const spinner = ora({
    prefixText: 'Static files:',
    text: 'Generating static metadata...',
  }).start();

  try {
    // Create the setup directory if it doesn't exist
    await createPath(setupPath);

    const staticFiles = staticFilesToCopy
      .filter(file => existsSync(file.at(0)!))
      .map(([staticFile, target]) => copyFile(staticFile, target));

    await Promise.all(staticFiles);
    spinner.succeed('Static metadata generated successfully.');

    spinner.succeed('Generation of metadata generated successfully.');
  } catch (error) {
    spinner.fail(`Failed to generate components metadata. Error: ${error as string}`);
    throw error;
  }
};
