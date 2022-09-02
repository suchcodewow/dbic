// @ts-check
/** @type {import('@playwright/test').PlaywrightTestConfig} */

import { devices } from "@playwright/test";

const config = {
  use: {
    baseURL: "http://52.251.67.123",
    browserName: "chromium",
    headless: true,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    actionTimeout: 10 * 1000,
    navigationTimeout: 10 * 1000,
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
  ],
  expect: {
    timeout: 10 * 1000,
  },
};

module.exports = config;
