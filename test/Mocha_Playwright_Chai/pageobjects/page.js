"use strict";

/**
 * Class representation of Page Object of general Page.
 * This page object is not intendend to be instantiated itself,
 * but always extend by concrete page object of given page.
 * This class should therefore containt properties and methods
 * which are intended to be reusable across multiple page objects.
 * @class
 */
class GeneralPage {
  constructor(context, page) {
    /**
     * Property containing browser context
     * @property
     */
    this.context = context;
    /**
     * Property containing browser context page
     * @property
     */
    this.page = page;
  }

  /**
   * Returns Promise of page.title()
   * @returns {Promise<string>}
   */
  get title() {
    return this.page.title();
  }

  /**
   * Goes to the given url.
   * @param {string} url url to visit
   * @param {number} [timeout=30000] time to wait until timeout thrown
   * @param {string} [waitUntil="networkidle"] wait until network is idle
   * @returns {Promise<void>}
   */
  async goto(url, timeout = 30000, waitUntil = "networkidle") {
    await this.page.goto(url, { timeout: timeout, waitUntil: waitUntil });
  }
  /**
   * Wait method.
   * @param {number} [timeout=5000] timeout to wait
   * @returns {Promise<void>}
   */
  async wait(timeout = 5000) {
    await this.page.waitForTimeout(timeout);
  }
}

module.exports = { GeneralPage };
