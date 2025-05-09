import { addSectionsAfter, replaceSections } from '../replace-section.js';

/**
 * Adjust the web-test-runner config
 */
export const vendorWebTestRunnerConfig = (path, content) => {
  if (path !== 'web-test-runner.config.js') {
    return {
      content,
      path,
    };
  }

  let nextContent = addSectionsAfter([
    // Add the synergy test plugins to the imports
    [
      "runner-playwright';",
      "import synTestPlugins from './scripts/tests/index.js';",
    ],
    // Add the synergy test plugins to the plugins
    [
      'plugins: [',
      '...synTestPlugins.plugins,',
      { tabsBeforeInsertion: 2 },
    ],
    // Add the synergy theme to the test runner html
    [
      '<link rel="stylesheet" href="dist/themes/light.css">',
      '<link rel="stylesheet" href="node_modules/@synergy-design-system/tokens/dist/themes/light.css">',
      { tabsBeforeInsertion: 4 },
    ],
    // add mocha config to fail if somewhere is `.only` used in a test
    [
      'timeout: 3000,',
      'forbidOnly: !!process.env.CI,',
      { tabsBeforeInsertion: 3 },
    ],
  ], content);

  nextContent = replaceSections([
    // Add a doctype to make sure the tests don´t run in quirks mode
    [
      '<html lang="en-US">',
      '<!DOCTYPE html><html lang="en-US">',
    ],
    // Adjust the path to the theme to make sure we always fetch the latest version from the package
    [
      '<link rel="stylesheet" href="dist/themes/light.css">',
      '<link rel="stylesheet" href="dist/styles/index.css">',
    ],
    // Enable testing with firefox.
    // TODO: As soon as shoelace enabled it on their side, this can be removed
    // TODO: We add concurrency: 1 to prevent the issue at https://github.com/modernweb-dev/web/issues/2374
    [
      `// Firefox started failing randomly so we're temporarily disabling it here. This could be a rogue test, not really
    // sure what's happening.
    // playwrightLauncher({ product: 'firefox' }),`,
      `
    // Enable firefox, but use concurrency of 1
    // @see https://github.com/modernweb-dev/web/issues/2374
    playwrightLauncher({ product: 'firefox', concurrency: 1 }),
`,
    ],

    // It seems that the webkit test are also flaky like the firefox ones in out CI right now
    // TODO: We add concurrency: 1 to prevent the issue at https://github.com/modernweb-dev/web/issues/2374
    [
      'playwrightLauncher({ product: \'webkit\' })',
      `
    // Use concurrency of 1 for webkit. It seems to happen the same problem like with firefox in the CI
    // @see https://github.com/modernweb-dev/web/issues/2374
    playwrightLauncher({ product: 'webkit', concurrency: process.env.CI ? 1 : undefined }),
`,
    ],

    // It seems that the chrome test are also flaky like the firefox ones in out CI right now
    // TODO: We add concurrency: 1 to prevent the issue at https://github.com/modernweb-dev/web/issues/2374
    [
      'playwrightLauncher({ product: \'chromium\' }),',
      `
    // Use concurrency of 1 for webkit. It seems to happen the same problem like with firefox in the CI
    // @see https://github.com/modernweb-dev/web/issues/2374
    playwrightLauncher({ product: 'chromium', concurrency: process.env.CI ? 1 : undefined }),
`,
    ],
  ], nextContent);

  // add mocha config to fail if somewhere is `.only` used in a test
  // );
  return {
    content: nextContent,
    path,
  };
};
