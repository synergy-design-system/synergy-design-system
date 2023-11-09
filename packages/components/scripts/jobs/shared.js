/* eslint-disable no-console */
import fs from 'fs/promises';
import path from 'path';
import url from 'url';
import { exec } from 'child_process';
import util from 'util';
import { deleteAsync } from 'del';
import chalk from 'chalk';
import ora from 'ora';

const spinner = ora({ hideCursor: false });

/**
 * Create a job that when run executes the given actions
 * @param {String} label The label to show
 * @param {Function} action The action to run
 * @returns {Function} A function with bound arguments useable in the build pipeline
 */
export const job = (label, action) => async (...args) => {
  spinner.text = label;
  spinner.start();

  try {
    await action(...args);
    spinner.stop();
    console.log(`${chalk.green('✔')} ${label}`);
  } catch (err) {
    spinner.stop();
    console.error(`${chalk.red('✘')} ${err}`);
    if (err.stdout) console.error(chalk.red(err.stdout));
    if (err.stderr) console.error(chalk.red(err.stderr));
    process.exit(1);
  }
};

/**
 * Creates an async version of exec
 */
export const execPromise = util.promisify(exec);

/**
 * Get the absolute path of one to many path parts,
 * relative to the `components/scripts` directory
 *
 * @param {String} wantedPath
 * @returns {String} The absolute path to the components/scripts directory
 */
export const getPath = (wantedPath) => path.join(
  path.dirname(path.join(url.fileURLToPath(import.meta.url), '..')),
  wantedPath,
);

/**
 * Sync the package.json version field located in outputPackageDir
 * with the one provided from componentsPackageDir
 * @param {string} label The label
 * @returns {job}
 */
export const runAdjustPackageVersion = (label) => job(label, async (
  componentsPackageDir,
  outputPackageDir,
) => {
  // Get the version field from the components package.json
  const componentPackageAsString = await fs.readFile(path.join(componentsPackageDir, 'package.json'), {
    encoding: 'utf-8',
  });
  const { version } = JSON.parse(componentPackageAsString);

  // Get the react packages package.json
  const reactPackageAsString = await fs.readFile(path.join(outputPackageDir, 'package.json'));
  const reactPackageAsJSON = JSON.parse(reactPackageAsString);

  // Write out the changed package.json file with adjusted version
  return await fs.writeFile(
    path.join(outputPackageDir, 'package.json'),
    [
      JSON.stringify({ ...reactPackageAsJSON, version }, null, 2).trim(),
      '',
    ].join('\n'),
  );
});

/**
 * Prepares directories by removing them and creating them anew
 * @param {string} label The label to use
 * @returns {job}
 */
export const createRunPrepare = (label) => job(label, async (...dirs) => {
  // Remove all directories
  await Promise.all(
    dirs.map(dir => deleteAsync(dir, { force: true })),
  );

  // Create all directories
  await Promise.all(
    dirs.map(dir => fs.mkdir(dir, {
      recursive: true,
    })),
  );
});
