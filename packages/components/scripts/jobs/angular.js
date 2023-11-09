import fs from 'fs';
import path from 'path';
import * as jobs from './angular/index.js';
import { createRunPrepare, runAdjustPackageVersion } from './shared.js';

/**
 * Run all steps to create new react components
 * @param {String} settings.componentDistDir The absolute path to the component dist
 * @param {String} settings.componentPackageDir The absolute path to the component root
 * @param {String} settings.angularPackageDir The absolute path to the angular package root
 */
export const runCreateAngularWrappers = async ({
  componentDistDir,
  componentPackageDir,
  angularPackageDir,
}) => {
  // Get the manifest information
  const manifest = path.join(componentDistDir, '/custom-elements.json');
  const metadata = JSON.parse(fs.readFileSync(manifest, 'utf8'));

  // Internal react package paths for usage in sub packages
  const outDir = path.join(angularPackageDir, './src');
  const componentsDir = path.join(outDir, 'components');
  const distDir = path.join(angularPackageDir, './dist');

  await runAdjustPackageVersion('Angular: Adjusting angular package.json version field...')(componentPackageDir, angularPackageDir);
  // await createRunPrepare('Angular: Cleaning up artifacts...')(outDir, distDir);
  await jobs.runCreateComponents(metadata, componentsDir);
  // await jobs.runFormat(outDir, reactPackageDir);
  // await jobs.runEsBuild(distDir);
  // await jobs.runReactTypeScript(distDir, reactPackageDir);
};
