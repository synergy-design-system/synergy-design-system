import { existsSync } from 'node:fs';
import { copyFile } from 'node:fs/promises';
import { basename, join } from 'node:path';
import ora from 'ora';
import {
  componentMigrationPath,
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
    setupPath,
  ],
  // Copy prerequisites as it includes information about font setup
  [
    getAbsolutePath('../../../../packages/docs/src/static/prerequisites.md'),
    setupPath,
  ],
  // Copy the migration guide
  [
    getAbsolutePath('../../../../packages/components/BREAKING_CHANGES.md'),
    componentMigrationPath,
  ],
  // Copy the v3 migration guide
  [
    getAbsolutePath('../../../../packages/docs/src/static/migration-synergy-v3.md'),
    componentMigrationPath,
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
    // Create the wanted directories if they don't exist
    const createAllPaths = Promise.all(
      staticFilesToCopy.map(([, target]) => createPath(target)),
    );
    await createAllPaths;

    const staticFiles = staticFilesToCopy
      .filter(file => existsSync(file.at(0)!))
      .map(([staticFile, target]) => {
        const targetFileName = join(target, basename(staticFile));
        return copyFile(staticFile, targetFileName);
      });

    await Promise.all(staticFiles);
    spinner.succeed('Static metadata generated successfully.');

    spinner.succeed('Generation of metadata generated successfully.');
  } catch (error) {
    spinner.fail(`Failed to generate components metadata. Error: ${error as string}`);
    throw error;
  }
};
