/**
 * Synergy Build Steps
 */
import * as jobs from './jobs/index.js';
import { getPackageJSONAsObject, getPath } from './jobs/shared.js';

const { version } = getPackageJSONAsObject();

const packageVersion = JSON.stringify(version.toString());

// The directory we want our output to be stored
const outDir = getPath('../dist');

// Root component directory
const componentDir = getPath('../');

const angularPackageDir = getPath('../../angular');
const reactPackageDir = getPath('../../react');
const vuePackageDir = getPath('../../vue');

const args = process.argv.slice(2);

await jobs.runCreateSynergy({
  componentDir,
  outDir,
  packageVersion,
});

// If we pass --synergy, we just want to create the synergy package
if (args.includes('--synergy')) {
  process.exit(0);
}

await Promise.all([
  jobs.runCreateReactWrappers({
    componentDistDir: outDir,
    reactPackageDir,
  }),
  jobs.runCreateAngularWrappers({
    angularPackageDir,
    componentDistDir: outDir,
  }),
  jobs.runCreateVueWrappers({
    componentDistDir: outDir,
    vuePackageDir,
  }),
]);
