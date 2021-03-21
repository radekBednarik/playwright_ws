"use strict";

const { chromium } = require("playwright");

/**
 * When navigating to page in same window via click on some element,
 * then you have to ensure, that there are
 * no racing condition.
 */
(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage({
    viewport: { width: 1920, height: 1080 },
  });
  await page.goto("https://www.tesena.com/en", { waitUntil: "networkidle" });

  await Promise.all([
    page.waitForNavigation(),
    page.click("//nav[@id='menu-main']//a[contains(@href, 'services')]//span"),
  ]);
  await page.waitForLoadState();
  await page.waitForTimeout(3000);

  await browser.close();
})();
