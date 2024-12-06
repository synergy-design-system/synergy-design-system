import fs from 'fs';
import path from 'path';
import * as jobs from './react/index.js';
import {
  createRunFormat,
  createRunPrepare,
  runAdjustPackageVersion,
} from './shared.js';

const runFormat = createRunFormat('React: Running code formatter...');

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
  const typesDir = path.join(outDir, './types');
  const componentDir = path.join(reactPackageDir, '/src/components');

  await runAdjustPackageVersion('React: Adjusting react package.json version field...')(componentPackageDir, reactPackageDir);
  await createRunPrepare('React: Cleaning up artifacts...')(outDir, componentDir, distDir, typesDir);
  await jobs.runCreateWrappers(metadata, outDir);
  await jobs.runCreateIntrinsicElements(metadata, typesDir);
  await runFormat(outDir);
  await jobs.runEsBuild(distDir);
  await jobs.runReactTypeScript(distDir, reactPackageDir);
};
