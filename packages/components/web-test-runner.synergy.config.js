/**
 * This is the runtime configuration for synergy.
 * It exists because we want to be able to control which browsers
 * are used for testing based on environment variables and extends
 * the default web-test-runner config.
 */

// eslint-disable-next-line import/no-extraneous-dependencies
import { playwrightLauncher } from '@web/test-runner-playwright';
import defaultConfig from './web-test-runner.config.js';

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
  ...defaultConfig,
  browsers,
};
