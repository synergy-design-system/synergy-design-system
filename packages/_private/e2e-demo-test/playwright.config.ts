/// <reference types="node" />
import { defineConfig, devices } from '@playwright/test';
import { frameworks, productFrameworks } from './frameworks.config';

const minutesToMs = (minutes: number) => minutes * 60 * 1000;

// #1300: Add support for beta testing
const futureBrowserProjects = process.env.PLAYWRIGHT_FUTURE_BROWSERS === 'true'
  ? [
    {
      name: 'chrome-beta',
      use: {
        ...devices['Desktop Chrome'],
        channel: 'chrome-beta',
      },
    },
  ]
  : [];

// Helper to get current framework from env
const createFrameworkConfig = () => {
  const framework = process.env.TEST_FRAMEWORK;

  if (!framework) {
    return productFrameworks;
  }

  const foundFramework = frameworks.find(f => f.name === framework);

  if (!foundFramework) {
    throw new Error(`Unknown framework: ${framework}. Available frameworks: ${frameworks.map(f => f.name).join(', ')}`);
  }

  return [foundFramework];
};

export default defineConfig({
  timeout: minutesToMs(1),
  testDir: './src',
  forbidOnly: !!process.env.CI,
  retries: 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['html', {
      open: 'never',
    }],
    [process.env.CI ? 'github' : 'list'],
  ],
  projects: [
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome']
      },
    },
    {
      name: 'firefox',
      use: { 
        ...devices['Desktop Firefox'],
      },
    },
    {
      name: 'webkit',
      use: { 
        ...devices['Desktop Safari'],
      },
    },
    ...futureBrowserProjects,
  ],
  webServer: createFrameworkConfig().map(({ customCommand, distDir, port }) => ({
    command: customCommand || `pnpm exec serve -s -p ${port} ${distDir}`,
    timeout: minutesToMs(2),
    url: `http://localhost:${port}`,
    reuseExistingServer: !process.env.CI,
  })),
});
