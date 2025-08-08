import { existsSync } from 'node:fs';
import { copyFile } from 'node:fs/promises';
import { basename, join } from 'node:path';
import ora from 'ora';
import {
  angularPath,
  createPath,
  getAbsolutePath,
  reactPath,
  vuePath,
} from '../utilities/index.js';

/**
 * List of static files that should be copied to the static metadata directory.
 */
const staticFilesToCopy = [
  // Angular specific documentation
  [
    getAbsolutePath('../../../../packages/angular/README.md'),
    angularPath,
  ],
  [
    getAbsolutePath('../../../../packages/angular/LIMITATIONS.md'),
    angularPath,
  ],
  // React specific documentation
  [
    getAbsolutePath('../../../../packages/react/README.md'),
    reactPath,
  ],
  [
    getAbsolutePath('../../../../packages/react/LIMITATIONS.md'),
    reactPath,
  ],
  // Vue specific documentation
  [
    getAbsolutePath('../../../../packages/vue/README.md'),
    vuePath,
  ],
  [
    getAbsolutePath('../../../../packages/vue/LIMITATIONS.md'),
    vuePath,
  ],
];

/**
 * Sets up all static data from the supported frameworks.
 */
export const buildFrameworkFiles = async () => {
  const spinner = ora({
    prefixText: 'Framework files:',
    text: 'Generating framework metadata...',
  }).start();

  try {
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
    spinner.fail(`Failed to generate framework metadata. Error: ${error as string}`);
    throw error;
  }
};
