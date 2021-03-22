"use strict";

const { chromium } = require("playwright");

/**
 * Working with iframes is quite simple.
 * Just resolve the iframe into variable and then
 * work with it directly.
 * No need to switch "focus" between page and iframe
 * like in the selenium.
 */
(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage({
    viewport: { width: 1920, height: 1080 },
  });
  await page.goto("https://ihned.cz", { waitUntil: "networkidle" });
  /**
   * Wait for element to be attached
   * the return the handler
   */
  const frameElHndlr = await page.waitForSelector(
    '//iframe[contains(@title, "Twitter settings iframe")]',
    { state: "attached" }
  );
  /**
   * Return the content, which you can now work with
   */
  const iFrame = await frameElHndlr.contentFrame();
  /**
   * Just print out the content to console
   */
  console.log(await iFrame.content());

  await browser.close();
})();