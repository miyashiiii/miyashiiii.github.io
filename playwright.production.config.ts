import { defineConfig, devices } from "@playwright/test";

/**
 * Production monitoring configuration.
 * This config is used for monitoring the production site (https://miyashiiii.com).
 * No local dev server is needed since tests access the production URL directly.
 */
export default defineConfig({
  testDir: "./e2eTests",
  testMatch: "production-monitoring.spec.ts",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  use: {
    trace: "on-first-retry",
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],

  // No webServer needed - tests access production URL directly
});
