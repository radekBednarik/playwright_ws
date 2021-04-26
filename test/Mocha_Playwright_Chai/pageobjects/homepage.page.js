"use strict";

const { GeneralPage } = require("./page");

/**
 * Class representation of Homepage page object.
 * @class
 */
class Homepage extends GeneralPage {
  constructor(context, page) {
    super(context, page);
    /**
     * Homepage url
     * @property
     */
    this.url = "https://www.tesena.com/en";
    /**
     * Homepage title
     * @property
     */
    this.titleDefinition = "Home  — Tesena";
  }
  /**
   * Opens homepage.
   * @async
   * @returns {Promise<void>}
   */
  async visit() {
    await super.goto(this.url);
  }
}

module.exports = { Homepage };
