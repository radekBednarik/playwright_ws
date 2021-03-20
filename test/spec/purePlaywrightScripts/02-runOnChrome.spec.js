const { chromium } = require("playwright");
const { expect } = require("chai");

(async () => {
  const browser = await chromium.launch({
    headless: false,
    executablePath:
      "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
  });
  const page = await context.newPage();
  await page.goto("https://www.tesena.com/en", {
    waitUntil: "networkidle",
  });
  // there is risk, that with not-bundled binary
  // the frameework will not be working as expected
  // try to change the predicate for `isHidden`
  // it should cause the node.js to throw
  expect(await page.isVisible('//button[contains(@class, "btn-confirm")]')).to
    .be.true;
  await browser.close();
})();
