/**
 * Synergy Build Steps
 */
import fs from 'fs/promises';
import { readFileSync } from 'fs';
import path from 'path';
import url from 'url';
import util from 'util';
import { exec } from 'child_process';
import chalk from 'chalk';
import { deleteAsync } from 'del';
import esbuild from 'esbuild';
import { replace } from 'esbuild-plugin-replace';
import { globby } from 'globby';
import ora from 'ora';

const execPromise = util.promisify(exec);

/**
 * Get the absolute path of one to many path parts,
 * relative to the `components/scripts` directory
 * 
 * @param {String} wantedPath
 * @returns String
 */
const getPath = (wantedPath) => path.join(
  path.dirname(url.fileURLToPath(import.meta.url)),
  wantedPath,
);

/**
 * Called on SIGINT or SIGTERM to cleanup the build and child processes.
 */
const handleCleanup = () => {
  buildResults.forEach(result => result.dispose());

  if (childProcess) {
    childProcess.kill('SIGINT');
  }

  process.exit();
}

let packageData = JSON.parse(readFileSync(getPath('../package.json')), 'utf-8');
const __PACKAGE_VERSION__ = JSON.stringify(packageData.version.toString());

// The directory we want our output to be stored
const outDir = getPath('../dist');

let buildResults = [];

const spinner = ora({ hideCursor: false }).start();

async function buildSource() {

  const esbuildConfig = {
    bundle: true,
    chunkNames: 'chunks/[name].[hash]',
    define: {
      'process.env.NODE_ENV': '"production"'
    },
    entryPoints: [
      // The whole shebang
      './src/synergy.ts',
      // The auto-loader
      './src/synergy-autoloader.ts',
      // Components
      ...(await globby('./src/components/**/!(*.(style|test)).ts')),
      // Translations
      ...(await globby('./src/translations/**/*.ts')),
      // Public utilities
      ...(await globby('./src/utilities/**/!(*.(style|test)).ts')),
    ],
    external: undefined,
    format: 'esm',
    minify: false,
    outdir: outDir,
    packages: 'external',
    plugins: [
      replace({
        __PACKAGE_VERSION__,
      }),
    ],
    splitting: true,
    target: 'es2017',
  };

  return await Promise.all([
    esbuild.build(esbuildConfig),
  ]);
} 

async function buildCEM() {
  return execPromise('cem analyze --litelement --outdir dist', { stdio: 'inherit' });
}

/**
 * 
 * @param {String} label 
 * @param {Function} action The asynchronous action to perform
 */
async function nextTask(label, action) {
  spinner.text = label;
  spinner.start();

  try {
    await action();
    spinner.stop();
    console.log(`${chalk.green('✔')} ${label}`);
  } catch (err) {
    spinner.stop();
    console.error(`${chalk.red('✘')} ${err}`);
    if (err.stdout) console.error(chalk.red(err.stdout));
    if (err.stderr) console.error(chalk.red(err.stderr));
    process.exit(1);
  }
}

await nextTask('Cleaning up the previous build', async () => {
  await Promise.all([
    deleteAsync(outDir),
  ]);
  await fs.mkdir(outDir, { recursive: true });
});

await nextTask('Running the TypeScript compiler', () => {
  return execPromise(`tsc --project ./tsconfig.prod.json --outdir "${outDir}"`, { stdio: 'inherit' });
});

await nextTask('Building source files', async () => {
  buildResults = await buildSource();
});


await nextTask('Building CEM', async () => {
  buildResults = await buildCEM();
});

await nextTask('Creating react wrappers', () => {
  return execPromise('pnpm run --filter react build');
});

// Cleanup on exit
process.on('SIGINT', handleCleanup);
process.on('SIGTERM', handleCleanup);
