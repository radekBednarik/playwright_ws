"use strict";

const { chromium } = require("playwright");

/**
 * In real life scenario, we will not write tests using pure Playwright scripts,
 * but probably use some test runner, like Mocha.js, or Jest, ...
 * In case of Mocha, to achieve parallelization, we use native Mocha functionality.
 * Now, to keep the code DRY, we will use so-called Mocha global setup/teardown and also
 * mochaHooks.
 * To pass created Playwright server WebSocket string from setup to hook, which is started
 * for each in-parallel ran file, which do NOT share state with each other and also not with setup/teardown,
 * we can use Playwright functionality to start browser server and connect to it later.
 */
(async () => {
  /**
   * This would be done in Mocha's global setup.
   */
  const server = await chromium.launchServer({ headless: false });
  // store WebSocket connect string for later use
  // and we would pass it to ENV variable
  const wsString = server.wsEndpoint();
  /**
   * This would be done in Mocha's global root hook
   */
  const instancesPromises = [1, 2, 3].map(() => {
    return chromium.connect({ wsEndpoint: wsString });
  });
  const instances = await Promise.all(instancesPromises);
  // now we can spin up context, pages, do stuff and close everything
  const contextPromises = instances.map((instance) => {
    return instance.newContext({ viewport: { width: 800, height: 600 } });
  });
  const contexts = await Promise.all(contextPromises);
  const pagesPromises = contexts.map((context) => {
    return context.newPage();
  });
  const pages = await Promise.all(pagesPromises);
  /**
   * page, contexts would be passed to specs/test suites running
   * in parallel by Mocha test runner
   */
  const visitPromises = pages.map((page) => {
    return page.goto("https://www.tesena.com", { waitUntil: "networkidle" });
  });
  await Promise.all(visitPromises);
  /**
   * Shut down of context would be done by after root hook
   */
  const shutDownPromises = contexts.map((context) => {
    return context.close();
  });
  await Promise.all(shutDownPromises);
  /**
   * Shut down of server would be done by global teardown.
   */
  await server.close();
})();
