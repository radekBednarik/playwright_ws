"use strict";

const { GeneralPage } = require("./page");

/**
 * Class representing Contact Us page.
 * @class
 */
class ContactUs extends GeneralPage {
  constructor(context, page) {
    super(context, page);
    /**
     * Page url
     * @property
     */
    this.url = "https://www.tesena.com/en/contact";
    /**
     * xPath selector of input field of "name"
     * @property
     */
    this.selectorInputName = '//form[@id="form_1"]//input[@id="field-name"]';
    /**
     * xPath selector of input field of "email"
     * @property
     */
    this.selectorInputEmail = '//form[@id="form_1"]//input[@id="field-email"]';
    /**
     * xPath selector of textarea of "message"
     * @property
     */
    this.selectorTextareaMessage =
      '//form[@id="form_1"]//textarea[@id="field-message"]';
    /**
     * xPath selector of button "send"
     * @property
     */
    this.selectorBttnSend = '//form[@id="form_1"]//button[@type="submit"]';
  }
  /**
   * Visit the page.
   * @async
   * @returns {Promise<void>}
   */
  async visit() {
    super.goto(this.url);
  }
}

module.exports = { ContactUs };
