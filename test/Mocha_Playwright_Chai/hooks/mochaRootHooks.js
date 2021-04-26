"use strict";

/**
 * These hooks are executed for each test spec, if they are run in parallel.
 * If tests are running sequentially, hooks will be executed only ONCE!
 */

const { chromium } = require("playwright");

exports.mochaHooks = () => {
  return {
    /**
     * in the beforeAll hook we connect to browser server
     * create the browser context and new page.
     * This will be done by the hook for each .spec.js file
     * we will run (IN PARALLEL), so we will reduce boilerplate.
     * Also, creating contexts for parallel runs is cheaper
     * on resources.
     */
    beforeAll: [
      async function () {
        const browser = await chromium.connect({
          wsEndpoint: process.env.WS_ENDPOINT,
        });
        console.log(browser);
        this.context = await browser.newContext({
          viewport: { width: 1920, height: 1080 },
        });
        this.page = await this.context.newPage();
      },
    ],
    /**
     * AfterAll hook will close the browser context
     * after all test in the test suite spec.js file are executed.
     */
    afterAll: [
      async function () {
        await this.context.close();
      },
    ],
  };
};
