import fs from 'fs';
import path from 'path';
import { deleteAsync } from 'del';
import * as jobs from './angular/index.js';
import {
  createRunFormat,
  createRunPrepare,
  runAdjustPackageVersion,
} from './shared.js';

const runFormat = createRunFormat('Angular: Running code formatter...');

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

  // Internal angular package paths for usage in sub packages
  const outDir = path.join(angularPackageDir);
  const componentsDir = path.join(outDir, 'components');
  const modulesDir = path.join(outDir, 'modules');
  const directivesDir = path.join(outDir, 'directives');

  const distDir = path.join(angularPackageDir, './dist');
  const indexFile = path.join(outDir, 'index.ts');

  await runAdjustPackageVersion('Angular: Adjusting angular package.json version field...')(componentPackageDir, angularPackageDir);
  await createRunPrepare('Angular: Cleaning up artifacts...')(distDir, modulesDir, componentsDir, directivesDir);
  // Remove old index file
  await deleteAsync(indexFile, { force: true });

  await jobs.runCreateComponents(metadata, componentsDir);
  await jobs.runCreateNgModule(metadata, modulesDir);
  await jobs.runCreateFormsModule(modulesDir);
  await jobs.runCreateValidatorDirectives(directivesDir);
  await jobs.runCreateExports(outDir);
  // Run format for all subfolders
  await runFormat(componentsDir);
  await runFormat(modulesDir);
  await runFormat(directivesDir);
  await jobs.runAngularBuild();
  await jobs.runAdjustPackageExports('Angular: Adjusting angular package exports...')(distDir);
};
