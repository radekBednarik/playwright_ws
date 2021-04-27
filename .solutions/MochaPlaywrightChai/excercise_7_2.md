# create new test suite for Contact Us page's contact form

## page object 'contactUs.page.js'

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
        * Returns Promise of the "name" input field element handle
        * @property
        * @returns {Promise<ElementHandle>}
        */
        get inputName() {
            return this.page.waitForSelector(this.selectorInputName, {
                state: "attached",
                timeout: 15000,
            });
        }
        /**
        * Returns Promise of the "email" input field element handle
        * @property
        * @returns {Promise<ElementHandle>}
        */
        get inputEmail() {
            return this.page.waitForSelector(this.selectorInputEmail, {
                state: "attached",
                timeout: 15000,
            });
        }
        /**
        * Returns Promise of the "message" input textarea element handle
        * @property
        * @returns {Promise<ElementHandle>}
        */
        get inputTextareaMessage() {
            return this.page.waitForSelector(this.selectorTextareaMessage, {
                state: "attached",
                timeout: 15000,
            });
        }
        /**
        * Returns Promise of the "send" bttn element handle.
        * @property
        * @returns {Promise<ElementHandle>}
        */
        get bttnSend() {
            return this.page.waitForSelector(this.selectorBttnSend, {
                state: "attached",
                timeout: 15000,
            });
        }
        /**
        * Visit the page.
        * @async
        * @returns {Promise<void>}
        */
        async visit() {
            super.goto(this.url);
        }
        /**
        * Predicate. Is input field "name" editable?
        * @async
        * @returns {Promise<boolean>}
        */
        async isInputNameEditable() {
            const elHndlr = await this.inputName;
            return await elHndlr.isEditable();
        }
        /**
        * Predicate. Is input field "email" editable?
        * @async
        * @returns {Promise<boolean>}
        */
        async isInputEmailEditable() {
            const elHndlr = await this.inputEmail;
            return await elHndlr.isEditable();
        }
        /**
        * Predicate. Is input textarea "message" editable?
        * @async
        * @returns {Promise<boolean>}
        */
        async isInputMessageEditable() {
            const elHndlr = await this.inputTextareaMessage;
            return await elHndlr.isEditable();
        }
        /**
        * Predicate. Is form "send" button enabled?
        * @returns {Promise<boolean>}
        */
        async isBttnSendEnabled() {
            const elHndlr = await this.bttnSend;
            return await elHndlr.isEnabled();
        }
    }

    module.exports = { ContactUs };

## spec file 'contactUsForm.spec.js'

    "use strict";

    const { expect } = require("chai");
    const { ContactUs } = require("../pageobjects/contactUs.page");

    describe("Contact Us form tests", function () {
        let contactPage;

        before(async function () {
            contactPage = new ContactUs(this.context, this.page);
            contactPage.visit();
        });

        it("input field 'name' is editable", async function () {
            expect(await contactPage.isInputNameEditable()).to.be.true;
        });

        it("input field 'email' is editable", async function () {
            expect(await contactPage.isInputEmailEditable()).to.be.true;
        });

        it("is input textarea 'message' editable", async function () {
            expect(await contactPage.isInputMessageEditable()).to.be.true;
        });

        it("is button 'Send' enabled", async function () {
            expect(await contactPage.isBttnSendEnabled()).to.be.true;
        });
    });