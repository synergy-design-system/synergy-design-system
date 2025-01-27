import path from 'path';
import * as jobs from './vue/index.js';
import {
  createRunFormat,
  createRunPrepare,
  getManifestData,
  runAdjustPackageVersion,
} from './shared.js';

const runFormat = createRunFormat('Vue: Running code formatter...');

/**
 * Run all steps to create new react components
 * @param {String} settings.componentDistDir The absolute path to the component dist
 * @param {String} settings.componentPackageDir The absolute path to the component root
 * @param {String} settings.vuePackageDir The absolute path to the react package root
 */
export const runCreateVueWrappers = async ({
  componentDistDir,
  componentPackageDir,
  vuePackageDir,
}) => {
  const metadata = await getManifestData(componentDistDir);

  // Internal vue package paths for usage in sub packages
  const outDir = path.join(vuePackageDir, './src');
  const distDir = path.join(vuePackageDir, './dist');
  const componentDir = path.join(vuePackageDir, '/src/components');

  await runAdjustPackageVersion('Vue: Adjusting vue package.json version field...')(componentPackageDir, vuePackageDir);
  await createRunPrepare('Vue: Cleaning up artifacts...')(outDir, componentDir, distDir);
  await jobs.runCreateWrappers(metadata, outDir);
  await runFormat(outDir);

  await jobs.runVueBuild();
};
