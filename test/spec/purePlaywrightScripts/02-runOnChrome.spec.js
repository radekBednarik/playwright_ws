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
  // expect(await page.isVisible('//button[contains(@class, "btn-confirm")]')).to
  //   .be.true;
  expect(
    await page.isVisible(
      '//div[@class="menu__wrapper"]//nav[contains(@class, "nav language-switcher")]'
    )
  ).to.be.true;
  await browser.close();
})();

/**
 * Excercise:
 * verify, that the language switcher element (in the upper right part of the page)
 * is visible
 * - hint (element locator: //div[@class="menu__wrapper"]//nav[contains(@class, "nav language-switcher")])
 */
