"use strict";

const { chromium } = require("playwright");

/**
 * Playwright supports Page Object Patterns.
 * This way you can abstract code for pages
 * under classes/objects.
 */
class Homepage {
  constructor(context, page) {
    this.context = context;
    this.page = page;
  }
  /**
   * We will get elementHandlers dynamically.
   * Since we cannot use getter with async/await
   * this returns a promise, which needs to be awaited
   */
  get linkedInLink() {
    return this.page.waitForSelector('//a[@title="LinkedIn"]', {
      state: "attached",
    });
  }

  async visitLinkedPage() {
    const elHndlr = await this.linkedInLink;
    const [newPage] = await Promise.all([
      this.context.waitForEvent("page"),
      elHndlr.click({ button: "left" }),
    ]);
    await newPage.waitForLoadState();
    return newPage;
  }

  async visit() {
    await this.page.goto("https://www.tesena.com/en", {
      waitUntil: "networkidle",
    });
  }

  async wait(timeout = 3000) {
    await this.page.waitForTimeout(timeout);
  }

  async closeBrowser() {
    const browser = await this.context.browser();
    await browser.close();
  }
}

/**
 * Execute the example:
 */
(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
  });
  const page = await context.newPage();
  /**
   * Create instance of Page Object
   */
  const homepage = new Homepage(context, page);

  await homepage.visit();
  await homepage.visitLinkedPage();
  await homepage.wait();
  await homepage.closeBrowser();
})();
