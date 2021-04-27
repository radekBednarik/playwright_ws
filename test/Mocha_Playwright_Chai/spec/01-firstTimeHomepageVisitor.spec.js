"use strict";

const { expect } = require("chai");
const { Homepage } = require("../pageobjects/homepage.page");
const { CookieManager } = require("../pageobjects/cookieManager.page");

let homepage;
let manager;

describe("Homepage tests", function () {
  before(async function () {
    /**
     * we already have started browser server and for
     * each spec.js file the root hook was run (when parallel execution is turned on)
     * so `this.browser`, `this.context` and `this.page` instances are available here
     */
    homepage = new Homepage(this.context, this.page);
    manager = new CookieManager(this.context, this.page);

    /**
     * Get to the state, we want to test
     */
    await homepage.visit();
    /**
     * purely "cosmetic" pause to see something when headless is off
     */
    await homepage.wait();
  });

  /**
   * Test that page title is as expected
   *
   */
  it(`- page title is correct`, async function () {
    expect(await homepage.getPageTitle()).to.be.equal(homepage.titleDefinition);
  });
  /**
   * Test that Accept button (and therefore the Consent banner) is visible
   */
  it("- Consent banner is visible", async function () {
    await manager.bttnAcceptConsents;
  });
});
