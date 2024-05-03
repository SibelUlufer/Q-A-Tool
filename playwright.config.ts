import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,  /* Run tests in files in parallel */
  forbidOnly: !!process.env.CI,  /* Fail the build on CI if you accidentally left test.only in the source code. */
  //retries: process.env.CI ? 2 : 0, /* Retry on CI only */
  retries: 2,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  reporter: [['html', { outputFolder: 'test-reports' }]], // HTML reports file path
  use: {
    baseURL: 'http://localhost:8000/',
    headless: true,
    trace: 'on-first-retry',/* Collect trace when retrying the failed test. */
    screenshot: "on",
    video: 'retain-on-failure'
  },
  outputDir: 'test artifacts/',  /*For videos, screenshots on failure*/
  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    /* Test against mobile viewports. */
    {
      name: 'Mobile Chrome',
      use: { ...devices['iPhone 14'] },
    },
    {
      name: 'Google Chrome',
      use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    },
  ]
});
