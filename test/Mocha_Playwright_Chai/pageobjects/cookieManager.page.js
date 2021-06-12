"use strict";

const { GeneralPage } = require("./page");

class CookieManager extends GeneralPage {
  constructor(context, page) {
    super(context, page);
    /**
     * xPath selector of Accept button of Consent bar
     * @property
     */
    this.selectorBttnAcceptConsents =
      '//button[contains(@class, "btn-confirm")]';
  }
  /**
   * Returns Promise of element handle of the
   * button.
   * @returns {Promise<ElementHandle>
   */
  get bttnAcceptConsents() {
    return this.page.waitForSelector(this.selectorBttnAcceptConsents, {
      state: "visible",
      timeout: 10000,
    });
  }
  /**
   * Clicks the Consent bar Accept button
   * and waits, until the button is hidden.
   * @async
   * @returns {Promise<void>}
   */
  async clickBttnAcceptConsents() {
    const elHndlr = await this.bttnAcceptConsents;
    await elHndlr.click({ button: "left" });
    // await elHndlr.waitForElementState("hidden");
  }
}

module.exports = { CookieManager };
