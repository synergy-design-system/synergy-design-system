import fs from 'fs';
import path from 'path';
// import * as jobs from './angular/index.js';
import { runAdjustPackageVersion } from './shared.js';

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
  const distDir = path.join(angularPackageDir, './dist');

  await runAdjustPackageVersion('Angular: Adjusting angular package.json version field...')(componentPackageDir, angularPackageDir);

  // await jobs.runPrepare(outDir, distDir);
  // await jobs.runCreateWrappers(metadata, outDir);
  // await jobs.runFormat(outDir, reactPackageDir);
  // await jobs.runEsBuild(distDir);
  // await jobs.runReactTypeScript(distDir, reactPackageDir);
};
