# test functions reusability

## create 'testLibrary.js' module
This module will export wrapper functions, which can be than imported
to spec.js files and used.

    "use strict";
    /**
    * Test library with wrapper function for
    * Mocha.js "it()" functions.
    */

    const { expect } = require("chai");

    /**
    * Wrapper for test function "page title is correct"
    * @returns {void}
    */
    exports.test_PageTitleIsCorrect = function () {
        // we need to work with page object inside this wrapper
        // the sure-to-work way to do this, is to create Mocha
        // context property `this.property` of the pageobject, which
        // we will use inside the wrapper.
        // importing variables from wrapper to mocha `it()` does
        // NOT always work, unfortunately
        it("- page title is correct", async function () {
            const pageObject = this.pageObject;
            expect(await pageObject.getPageTitle()).to.be.equal(
                pageObject.titleDefinition
            );
        });
    };

## modify the 'homepage tests' spec.js file

### in the 'before' callback, add at the end:

    this.pageObject = homepage;

### import the testLibrary

    const testLibrary = require("../modules/testLibrary");

### comment out it(' - page title is correct')

### use the wrapper function for the test from the library

    testLibrary.test_PageTitleIsCorrect();