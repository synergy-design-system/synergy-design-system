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

  // Adjust the path to the theme to make sure we always fetch
  // the latest version from the package
  let nextContent = content.replaceAll(
    '<link rel="stylesheet" href="dist/themes/light.css">',
    `<link rel="stylesheet" href="node_modules/@synergy-design-system/tokens/dist/themes/light.css">
        <link rel="stylesheet" href="dist/styles/index.css">`,
  );

  // Add the synergy test plugins to the mix
  nextContent = nextContent.replaceAll(
    "runner-playwright';",
    `runner-playwright';
import synTestPlugins from './scripts/tests/index.js';`,
  );

  nextContent = nextContent.replaceAll(
    'esbuildPlugin({',
    `...synTestPlugins.plugins,
    esbuildPlugin({`,
  );

  // Enable testing with firefox.
  // TODO: As soon as shoelace enabled it on their side, this can be removed
  // TODO: We add concurrency: 1 to prevent the issue at https://github.com/modernweb-dev/web/issues/2374
  nextContent = nextContent.replace(
      `// Firefox started failing randomly so we're temporarily disabling it here. This could be a rogue test, not really
    // sure what's happening.
    // playwrightLauncher({ product: 'firefox' }),`,
      `
    // Enable firefox, but use concurrency of 1
    // @see https://github.com/modernweb-dev/web/issues/2374
    playwrightLauncher({ product: 'firefox', concurrency: 1 }),
`,
  );
  return {
    content: nextContent,
    path,
  };
};
