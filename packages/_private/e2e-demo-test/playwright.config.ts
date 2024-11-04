/// <reference types="node" />
import { defineConfig, devices } from '@playwright/test';
import { frameworks } from './frameworks.config';

const secondsToMs = (second: number) => second * 60 * 1000;

export default defineConfig({
  timeout: secondsToMs(60),
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
  ],
  webServer: frameworks.map(({ customCommand, distDir, port }) => ({
    command: customCommand || `pnpm exec serve -s -p ${port} ${distDir}`,
    timeout: secondsToMs(120),
    url: `http://localhost:${port}`,
    reuseExistingServer: !process.env.CI,
  })),
});
