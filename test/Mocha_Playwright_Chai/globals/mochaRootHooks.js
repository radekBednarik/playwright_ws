/**
 * These hooks are executed for each test spec, if they are run in parallel.
 * If tests are running sequentially, hooks will be executed only ONCE!
 */

const { chromium } = require("playwright");

exports.mochaHooks = function () {
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
        this.browser = await chromium.connect({
          wsEndpoint: process.env.WS_ENDPOINT,
        });
        this.context = await this.browser.newContext({
          viewport: { width: 1920, height: 1080 },
        });
        this.page = await this.context.newPage();
      },
    ],
    afterAll: [
      async function () {
        await this.context.close();
      },
    ],
  };
};
