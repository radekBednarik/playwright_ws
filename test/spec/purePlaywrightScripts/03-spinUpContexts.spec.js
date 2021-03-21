const { chromium } = require("playwright");

/**
 * We can also start only browser
 * and than `spin up` as many separated `contexts` as we want.
 * This is great for parallel execution, since
 * contexts are light-weight and starts very fast.
 */
(async () => {
  const browser = await chromium.launch({ headless: false });
  /**
   * We have the browser running. Now, spin up as many contexts
   * as we need for parallel/asynchronous execution.
   */
  const contextPromises = [1, 2, 3].map(() => {
    return browser.newContext({
      viewport: { width: 800, height: 600 },
    });
  });
  const contexts = await Promise.all(contextPromises);
  // pages
  const pagesPromises = contexts.map((context) => {
    return context.newPage();
  });
  const pages = await Promise.all(pagesPromises);
  /**
   * visit sites on those pages.
   * For simplicity, visit same site
   */
  const visitPromises = await pages.map((page) => {
    return page.goto("https://www.tesena.com", { waitUntil: "networkidle" });
  });
  await Promise.all(visitPromises);
  /**
   * here we can do some actions in the page
   * after that, we can close context and leave the browser
   * running, or shutdown the browser and all context
   * automatically
   */
  const shutDownPromises = contexts.map((context) => {
    return context.close();
  });
  await Promise.all(shutDownPromises);
  // close server
  await browser.close();
})();
