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
