import fs from 'fs';
import path from 'path';
import { getPath } from './shared.js';
import { runTypeScript } from './tsc.js';
import * as jobs from './react/index.js';

/**
 * Run all steps to create new react components
 * @param {String} settings.componentDistDir The absolute path to the component dist
 * @param {String} settings.componentPackageDir The absolute path to the component root
 * @param {String} settings.reactPackageDir The absolute path to the react package root
 */
export const runCreateReactWrappers = async ({
  componentDistDir,
  componentPackageDir,
  reactPackageDir,
}) => {
  // Get the manifest information
  const manifest = path.join(componentDistDir, '/custom-elements.json');
  const metadata = JSON.parse(fs.readFileSync(manifest, 'utf8'));

  // Internal react package paths for usage in sub packages
  const outDir = path.join(reactPackageDir, './src');
  const distDir = path.join(reactPackageDir, './dist');

  await jobs.runAdjustPackageVersion(componentPackageDir, reactPackageDir);
  await jobs.runPrepare(outDir, distDir);
  await jobs.runCreateWrappers(metadata, outDir);
  await jobs.runFormat(outDir);
  await jobs.runEsBuild(distDir);
  await runTypeScript(distDir, getPath('../tsconfig.react.json'));
};
