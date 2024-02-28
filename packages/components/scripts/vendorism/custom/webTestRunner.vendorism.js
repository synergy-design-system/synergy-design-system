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

  return {
    content: nextContent,
    path,
  };
};
