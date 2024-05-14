import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  timeout: 10 * 60 * 1000,
  testDir: './src',
  forbidOnly: false,// !!process.env.CI,
  retries: 0,
  workers: 1,
  reporter: [
    ['html', {
      open: 'never',
      
    }],
    [process.env.CI ? 'github' : 'list'],
  ],
  projects: [


    {
      name: 'webkit',
      use: { 
        ...devices['Desktop Safari'],
      },
    },
    
  ],
});
