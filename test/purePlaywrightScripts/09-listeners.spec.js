"use strict";

const { expect } = require("chai");
const { chromium } = require("playwright");

(async () => {
  const container = [];
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
  });
  const page = await context.newPage();

  /**
   * Let's say, we want to listen for Google Analytics request
   * and store it in the array for some further testing
   * NOTICE: listener must start before we do the action
   * which may trigger the event we want to listen to!!!
   */
  page.on("request", (request) => {
    const gaRegexp = new RegExp(
      /^https:\/\/www\.google-analytics.com.*$/,
      "gm"
    );
    const url = request.url();

    if (gaRegexp.test(url)) {
      container.push(url);
    }
  });

  await page.goto("https://www.tesena.com/en", {
    waitUntil: "networkidle",
    timeout: 30000,
  });
  await page.waitForTimeout(5000);

  try {
    expect(container).not.to.be.empty;
    console.log(container);
  } catch (error) {
    console.warn(error);
  }

  await browser.close();
})();

/**
 * Excercise:
 *
 * - add listener for `close` event of the page
 * - when this event is triggered, message "We are closing!" should be logged into the console :)
 *
 * hint:
 * documentation link: https://playwright.dev/docs/api/class-page#pageonclose
 */
