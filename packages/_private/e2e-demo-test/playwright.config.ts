/// <reference types="node" />
import { defineConfig, devices } from '@playwright/test';
import { frameworks } from './frameworks.config';

const minutesToMs = (minutes: number) => minutes * 60 * 1000;

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
  ],
  webServer: frameworks.map(({ customCommand, distDir, port }) => ({
    command: customCommand || `pnpm exec serve -s -p ${port} ${distDir}`,
    timeout: minutesToMs(2),
    url: `http://localhost:${port}`,
    reuseExistingServer: !process.env.CI,
  })),
});
