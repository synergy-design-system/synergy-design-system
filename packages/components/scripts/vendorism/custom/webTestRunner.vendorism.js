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
    'dist/themes/light.css',
    'node_modules/@synergy-design-system/tokens/dist/themes/light.css',
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

  nextContent = nextContent.replace(
      `// Firefox started failing randomly so we're temporarily disabling it here. This could be a rogue test, not really
    // sure what's happening.
    // playwrightLauncher({ product: 'firefox' }),`,
      'playwrightLauncher({ product: \'firefox\' }),',
  );
  return {
    content: nextContent,
    path,
  };
};
