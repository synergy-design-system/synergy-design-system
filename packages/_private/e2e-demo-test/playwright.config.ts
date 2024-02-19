import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  timeout: 10 * 60 * 1000,
  testDir: './src',
  forbidOnly: false,// !!process.env.CI,
  retries: 0,
  workers: 1,
  reporter: [ ['html', { open: 'never' }], ['list'] ],
  
  use: {
    // baseURL: 'http://localhost:30004',/*process.env.PORT */
  },

  projects: [
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],
        contextOptions: {
          // chromium-specific permissions
          permissions: ['clipboard-read', 'clipboard-write'],
        },
      },
    },
/*
    {
      name: 'firefox',
      use: { 
        ...devices['Desktop Firefox'],
        launchOptions: {
          firefoxUserPrefs: {
            'dom.events.asyncClipboard.readText': true,
            'dom.events.testing.asyncClipboard': true,
          },
        }
      },
    }
    */
  ],
});
