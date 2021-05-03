"use strict";

const os = require("os");
const { chromium } = require("playwright");
const { expect } = require("chai");

// here we handle the path to Chrome (not bundled Chromium) binary
// based on OS
const winPath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const linuxPath = "/usr/bin/google-chrome";
const executablePath = os.platform() === "win32" ? winPath : linuxPath;

(async () => {
  const browser = await chromium.launch({
    headless: false,
    executablePath: executablePath,
  });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
  });
  const page = await context.newPage();
  await page.goto("https://www.tesena.com/en", {
    waitUntil: "networkidle",
  });
  expect(await page.isVisible('//button[contains(@class, "btn-confirm")]')).to
    .be.true;

  await browser.close();
})();

/**
 * Excercise:
 * on this link, you will find the documentation for screenshot command:
 * https://playwright.dev/docs/api/class-page#pagescreenshotoptions
 * https://playwright.dev/docs/screenshots
 *
 * 1. Capture full page screenshot, before you will close the browser and
 * save it as "screenshot.png" to the root of the project.
 * The screenshot should be "interesting".
 */
