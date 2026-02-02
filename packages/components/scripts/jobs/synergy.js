import * as jobs from './synergy/index.js';
import { getPath } from './shared.js';

export const runCreateSynergy = async ({
  componentDir,
  outDir,
  packageVersion,
}) => {
  await jobs.runPrepare(outDir);
  await jobs.runCreateEvents(componentDir);
  await jobs.runCreateExports(componentDir);
  await jobs.runCem();
  await jobs.createDefaultSettings(outDir, componentDir);
  await jobs.adjustComponentsForDefaultSettings(outDir, componentDir);
  await jobs.runTypeScript(outDir, './tsconfig.prod.json');
  await jobs.runEsBuildComponents(outDir, packageVersion);
  await jobs.runCreateStyles({ componentDistDir: outDir, stylesDir: getPath('../src/styles') });
};
