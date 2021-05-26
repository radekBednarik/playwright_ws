"use strict";

const { chromium } = require("playwright");

/**
 * We can also start only browser
 * and than `spin up` as many separated `contexts` as we want.
 * This is great for parallel execution, since
 * contexts are light-weight and starts very fast.
 *
 * in PowerShell, activate Playwright debug console dump
 * via `$env:DEBUG="pw:api"` command. Then execute the script.
 * 
 * in Windows command line, activate debug via:
 * `set DEBUG=pw:api`
 *
 * to remove ENV variable in PowerShell, use:
 * Remove-Item Env:\DEBUG
 *
 * in linux shell, just prepend the `DEBUG=pw:api` before the node command
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
  const visitPromises = pages.map((page) => {
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
  // close browser
  await browser.close();
})();

/**
 * Excercise:
 *
 * - Turn off the `pw:api` debug mode
 * - Turn on the `PWDEBUG=1` debug mode
 * - update the script, so only one context is spinned up from the browser instance
 * NOT three
 * - run this script in debug mode step by step using inspector tool
 * (notice, that each context will have its own inspector tool stacked on top of each other)
 * - Turno off the debug mode
 */
