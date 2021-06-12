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
  /**
   * Returns page title
   * @returns {Promise<string>} page title
   */
  async getPageTitle() {
    return await this.page.title();
  }
  /**
   * Predicate.
   *
   * If cookie of the `cookieName` is stored for given `url`, then return `true`. Else `false`.
   * @async
   * @param {string} cookieName name of the cookie
   * @param {string} url full url for which the cookie is set
   * @returns {boolean}
   */
  async isCookieStored(cookieName, url) {
    const cookies = await this.context.cookies(url);

    if (cookies.length === 0) {
      return false;
    }

    const [cookie] = cookies.filter((cookie) => {
      if (cookie.name === cookieName) {
        return cookie;
      }
    });

    const status = typeof cookie === "undefined" ? false : true;

    return status;
  }
}

module.exports = { GeneralPage };
