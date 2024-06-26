/**
 * Synergy Build Steps
 */
import * as jobs from './jobs/index.js';
import { getPackageJSONAsObject, getPath } from './jobs/shared.js';

const { version } = getPackageJSONAsObject();

// eslint-disable-next-line no-underscore-dangle
const __PACKAGE_VERSION__ = JSON.stringify(version.toString());

// The directory we want our output to be stored
const componentDir = getPath('../');
const outDir = getPath('../dist');

const angularPackageDir = getPath('../../angular');
const reactPackageDir = getPath('../../react');
const vuePackageDir = getPath('../../vue');

await jobs.runPrepare(outDir);
await jobs.runCreateEvents(componentDir);
await jobs.runCreateExports(componentDir);
await jobs.runTypeScript(outDir, './tsconfig.prod.json');
await jobs.runEsBuildComponents(outDir, __PACKAGE_VERSION__);
await jobs.runCem();
await jobs.runCreateStyles({ componentDistDir: outDir, stylesDir: getPath('../src/styles') });

await Promise.all([
  jobs.runCreateReactWrappers({
    componentDistDir: outDir,
    componentPackageDir: componentDir,
    reactPackageDir,
  }),
  jobs.runCreateAngularWrappers({
    angularPackageDir,
    componentDistDir: outDir,
    componentPackageDir: componentDir,
  }),
  jobs.runCreateVueWrappers({
    componentDistDir: outDir,
    componentPackageDir: componentDir,
    vuePackageDir,
  }),
]);
