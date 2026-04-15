/* eslint-disable import/no-extraneous-dependencies */
import { esbuildPlugin } from '@web/dev-server-esbuild';
import { globbySync } from 'globby';
import { playwrightLauncher } from '@web/test-runner-playwright';
import synTestPlugins from './scripts/tests/index.js';

// Always use concurrency of 1 in CI for all browsers to avoid issues
// @see https://github.com/modernweb-dev/web/issues/2374
const allBrowsers = [
  // @see https://github.com/modernweb-dev/web/issues/2374
  playwrightLauncher({
    concurrency: process.env.CI ? 1 : undefined,
    product: 'chromium',
  }),

  // 2 processes seems to work fine locally.
  playwrightLauncher({
    concurrency: process.env.CI ? 1 : 2,
    product: 'firefox',
  }),

  playwrightLauncher({
    concurrency: process.env.CI ? 1 : undefined,
    product: 'webkit',
  }),
];

const browsersToUse = process.env.BROWSERS
  ? process.env.BROWSERS.split(',').map(b => b.trim())
  : allBrowsers.map(b => b.product);

const browsers = process.env.BROWSERS
  ? allBrowsers.filter(b => browsersToUse.includes(b.product))
  : allBrowsers;

export default {
  browsers,
  concurrentBrowsers: 3,
  files: 'src/**/*.test.ts', // "default" group
  // Create a named group for every test file to enable running single tests. If a test file is `split-panel.test.ts`
  // then you can run `npm run test -- --group split-panel` to run only that component's tests.
  groups: globbySync('src/**/*.test.ts').map(path => {
    const groupName = path.match(/^.*\/(?<fileName>.*)\.test\.ts/).groups.fileName;
    return {
      files: path,
      name: groupName,
    };
  }),
  nodeResolve: {
    exportConditions: ['production', 'default'],
  },
  plugins: [
    ...synTestPlugins.plugins,
    esbuildPlugin({
      target: 'es2020',
      ts: true,
    }),
  ],
  rootDir: '.',
  testFramework: {
    config: {
      forbidOnly: !!process.env.CI,
      retries: 1,
      timeout: 3000,
    },
  },
  testRunnerHtml: testFramework => `
    <!DOCTYPE html><html lang="en-US">
      <head></head>
      <body>
        <link rel="stylesheet" href="dist/styles/index.css">
        <link rel="stylesheet" href="node_modules/@synergy-design-system/tokens/dist/themes/light.css">
        <script>
          window.process = {env: { NODE_ENV: "production" }}
        </script>
        <script type="module" src="${testFramework}"></script>
      </body>
    </html>
  `,
  testsFinishTimeout: 180000, // 3 minutes
};
