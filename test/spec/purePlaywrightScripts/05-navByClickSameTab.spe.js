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

  // open Services page
  await Promise.all([
    page.waitForNavigation(),
    page.click("//nav[@id='menu-main']//a[contains(@href, 'services')]//span"),
  ]);
  await page.waitForLoadState();
  // pause, just to really see something when running this snippet ;)
  await page.waitForTimeout(3000);

  await browser.close();
})();

/**
 * Excercise:
 *
 * - after the Services page is opened, extend
 * the script by opening the Events page
 * - hint - locator for Services nav "button"
 * //nav[@id='menu-main']//a[contains(@href, 'events')]//span
 */
