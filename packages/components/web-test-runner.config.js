/**
 * ---------------------------------------------------------------------
 * 🔒 AUTOGENERATED BY VENDORISM
 * Removing this comment will prevent it from being managed by it.
 * ---------------------------------------------------------------------
 */

/* eslint-disable */
import { esbuildPlugin } from '@web/dev-server-esbuild';
import { globbySync } from 'globby';
import { playwrightLauncher } from '@web/test-runner-playwright';
import synTestPlugins from './scripts/tests/index.js';

export default {
  rootDir: '.',
  files: 'src/**/*.test.ts', // "default" group
  concurrentBrowsers: 3,
  nodeResolve: {
    exportConditions: ['production', 'default']
  },
  testFramework: {
    config: {
      timeout: 3000,
      forbidOnly: !!process.env.CI,
      retries: 1
    }
  },
  plugins: [
    ...synTestPlugins.plugins,
    esbuildPlugin({
      ts: true,
      target: 'es2020'
    })
  ],
  browsers: [
    
    // Use concurrency of 1 for webkit. It seems to happen the same problem like with firefox in the CI
    // @see https://github.com/modernweb-dev/web/issues/2374
    playwrightLauncher({ product: 'chromium', concurrency: process.env.CI ? 1 : undefined }),

    
    // Enable firefox, but use concurrency of 1
    // @see https://github.com/modernweb-dev/web/issues/2374
    playwrightLauncher({ product: 'firefox', concurrency: 1 }),

    
    // Use concurrency of 1 for webkit. It seems to happen the same problem like with firefox in the CI
    // @see https://github.com/modernweb-dev/web/issues/2374
    playwrightLauncher({ product: 'webkit', concurrency: process.env.CI ? 1 : undefined }),

  ],
  testRunnerHtml: testFramework => `
    <html lang="en-US">
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
  // Create a named group for every test file to enable running single tests. If a test file is `split-panel.test.ts`
  // then you can run `npm run test -- --group split-panel` to run only that component's tests.
  groups: globbySync('src/**/*.test.ts').map(path => {
    const groupName = path.match(/^.*\/(?<fileName>.*)\.test\.ts/).groups.fileName;
    return {
      name: groupName,
      files: path
    };
  })
};
