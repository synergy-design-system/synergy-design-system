/* eslint-disable no-console */
import { mkdir } from 'fs/promises';
import path from 'path';
import url from 'url';
import chalk from 'chalk';
import { deleteAsync } from 'del';
import ora from 'ora';

const spinner = ora({ hideCursor: false });

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

export const runCleanup = job('Cleaning up artifacts...', async () => {
  const dir = getPath('./dist');
  await deleteAsync(dir);
  return mkdir(dir, {
    recursive: true,
  });
});
