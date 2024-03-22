import { execSync } from 'child_process';
import * as jobs from '../jobs/index.js';
import { getPackageJSONAsObject, getPath } from '../jobs/shared.js';

const componentDir = getPath('../');
const outDir = getPath('../dist');
const temporaryOutDir = getPath('../dist.testrunner');

const { version } = getPackageJSONAsObject();

// eslint-disable-next-line no-underscore-dangle
const __PACKAGE_VERSION__ = JSON.stringify(version.toString());

const synRefreshComponentBundle = () => {
  const name = 'syn-refresh-component-bundle';

  const rebuildSynergy = async () => {
    // Create the build in its own directory
    await jobs.runPrepare(temporaryOutDir);
    await jobs.runCreateEvents(componentDir);
    await jobs.runCreateExports(componentDir);
    await jobs.runTypeScript(temporaryOutDir, './tsconfig.prod.json');
    await jobs.runEsBuildComponents(temporaryOutDir, __PACKAGE_VERSION__);
    await jobs.runCopyFiles(
      getPath('../src/themes'),
      getPath('../dist/themes'),
      () => true,
    );

    // Finally, remove the dist folder completely
    // and move the contents of the temporary folder into it
    await jobs.runPrepare(outDir);
    execSync(`mv ${temporaryOutDir}/* ${outDir}`);
  };

  return {
    name,
    serverStart: async ({ fileWatcher }) => {
      // Make sure we always have correct initial data by running the build
      await rebuildSynergy();

      // Whenever one of our component files has changed,
      // make sure to recreate our bundle
      fileWatcher.add('./src/components/**/!(*.(test)).ts');

      // Make sure to only rebuild our components if a component and its associates did change
      fileWatcher.on('change', async (changedFile) => {
        const isATest = changedFile.endsWith('.test.ts');
        const isADistFile = changedFile.includes('dist/');

        // Skip the tests, they should do nothing here
        // Make sure to skip the currently generated bundle.
        // It will lead to recursive errors otherwise!
        if (isATest || isADistFile) {
          return;
        }

        await rebuildSynergy();
      });
    },
    serverStop: async () => {
      await jobs.runPrepare(temporaryOutDir);
    },
  };
};

export default {
  plugins: [synRefreshComponentBundle()],
};
