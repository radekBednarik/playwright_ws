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
  expect(await page.isVisible('//button[contains(@class, "btn-confirm")]')).to
    .be.true;
  // close the browser
  await browser.close();
})();
