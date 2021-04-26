"use strict";

const { chromium } = require("playwright");

/**
 * When navigating to page to the new window/tab
 * via click, you have to ensure, that there are no
 * racing conditions.
 */
(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
  });
  const page = await context.newPage();
  await page.goto("https://www.tesena.com", { waitUntil: "networkidle" });

  const [newPage] = await Promise.all([
    context.waitForEvent("page"),
    page.click('//a[@title="LinkedIn"]'),
  ]);
  await newPage.waitForLoadState();
  /**
   * We can now work with different pages
   * by using `page` or `newPage` variables
   * No need to do the manual "focus" switching
   * like in the selenium.
   */
  await newPage.waitForTimeout(5000);
  await browser.close();
})();

/**
 * Excercise:
 * - modify the script, so that after the LinkedIn page is opened in the new tab,
 * you will open Tesena YouTube page in the another tab
 * and then wait on that page for 5 seconds
 */
