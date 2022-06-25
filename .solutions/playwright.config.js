import { join } from "path";
import { cpus } from "os";
import { devices } from "@playwright/test";

const config = {
  reporter: "html",
  // global configuration of browser and context
  use: {
    headless: false,
    viewport: { width: 1920, height: 1080 },
    ignoreHTTPSErrors: true,
    // record video, screenshots and trace of tests
    video: "on",
    screenshot: "on",
    trace: "on",
  },
  // test runner options
  // testDir: join(process.cwd(), "test"),
  // or use testMatch
  testMatch: "**/*.spec.js",
  workers: cpus().length / 2,
  // test configurations - each test file will run on each configuration
  projects: [
    {
      name: "Chromium Desktop",
      use: {
        ...devices["Desktop Chrome"],
      },
    },
    {
      name: "Webkit Desktop",
      use: {
        ...devices["Desktop Safari"],
      },
    },
    {
      name: "Webkit iPhone 12",
      use: {
        browserName: "webkit",
        ...devices["iPhone 12"],
      },
    },
  ],
};

export default config;
