// what is strict mode? https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode
"use strict";

// commonJS syntax for modules: https://en.wikipedia.org/wiki/CommonJS
const { chromium } = require("playwright");
const { expect } = require("chai");

/**
 * IIFS (Immediately Invoked Func. Expression)
 * wrapper to be able to axecute async/await
 */
(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
  });
  const page = await context.newPage();
  // now visit
  await page.goto("https://www.tesena.com/en", { waitUntil: "networkidle" });
  // validate assertion
  const status = await page.isVisible(
    '//button[contains(@class, "btn-confirm")]'
  );

  // we have to use try/catch, otherwise in case the assertion throws,
  // the node.js will just stop
  try {
    expect(status).to.be.true;
  } catch (error) {
    console.warn(error);
  }
  // close the browser
  await browser.close();
})();

/**
 * Excercise:
 *
 * Take the code and adapt:
 * - use firefox or webkit
 * - open the `https://www.google.com
 * - check, that `Search` button is hidden
 *
 * Assert validation should FAIL
 */
