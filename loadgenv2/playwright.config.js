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
};

module.exports = config;
