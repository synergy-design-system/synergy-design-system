/**
 * Synergy Build Steps
 */
import { readFileSync } from 'fs';
import * as jobs from './jobs/index.js';
import { getPath } from './jobs/shared.js';

const { version } = JSON.parse(readFileSync(getPath('../package.json')), 'utf-8');

// eslint-disable-next-line no-underscore-dangle
const __PACKAGE_VERSION__ = JSON.stringify(version.toString());

// The directory we want our output to be stored
const componentDir = getPath('../');
const outDir = getPath('../dist');
const reactPackageDir = getPath('../../react');

await jobs.runPrepare(outDir);
await jobs.runCreateEvents(componentDir);
await jobs.runTypeScript(outDir, './tsconfig.prod.json');
await jobs.runEsBuildComponents(outDir, __PACKAGE_VERSION__);
await jobs.runCem();
await jobs.runCreateReactWrappers({
  componentDistDir: outDir,
  componentPackageDir: componentDir,
  reactPackageDir,
});
