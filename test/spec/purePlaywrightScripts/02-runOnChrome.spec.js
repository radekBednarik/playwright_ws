"use strict";

const os = require("os");
const { chromium } = require("playwright");
const { expect } = require("chai");

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
  // there is risk, that with not-bundled binary
  // the frameework will not be working as expected
  // try to change the predicate for `isHidden`
  // it should cause the node.js to throw on Win10 Chrome v.89
  expect(await page.isVisible('//button[contains(@class, "btn-confirm")]')).to
    .be.true;
  await browser.close();
})();
