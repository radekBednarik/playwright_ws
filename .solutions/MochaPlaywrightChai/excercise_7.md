# create additional test - "Submit" button in the Contact Us form on the Homepage is enabled

## Extend page object "Homepage"

### Add selector prop

    /**
     * xPath selector of contact form submit button
     * @property
     */
    this.selectorBttnSubmit = '//form[@id="form_1"]//button[@type="submit"]';

### Add getter for the Submit button prop

    /**
    * Returns Promise of the button element handle.
    * @property
    * @returns {Promise<ElementHandle>}
    */
    get bttnSubmit() {
        return this.page.waitForSelector(this.selectorBttnSubmit, {
            state: "attached",
            timeout: 15000,
        });
    }

### Add method predicate validating, if button is enabled

    /**
    * Is Submit button enabled predicate.
    * @returns {Promise<boolean>}
    */
    async isSubmitBttnEnabled() {
        const elHndlr = await this.bttnSubmit;
        return await elHndlr.isEnabled();
    }

## Extend spec.js file for 'Homepage tests' suite

### Add test for the Submit button enabled state validation

    /**
    * Tests, whether the Contact Us submit button is enabled
    */
    it("- Contact Us form 'Submit' button is enabled", async function () {
        expect(await homepage.isSubmitBttnEnabled()).to.be.true;
    });