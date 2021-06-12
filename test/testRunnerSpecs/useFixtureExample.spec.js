/**
 * This test suite is written using
 * playwright test runner fixture capability.
 * Details can be found here:
 * https://playwright.dev/docs/test-intro#test-fixtures
 * https://playwright.dev/docs/test-fixtures
 *
 * We will use here a page object of the homepage
 * to demonstrate, how POM and fixtures can be used
 * together to achieve clearly written tests.
 */

const base = require("@playwright/test");
const {
  Homepage,
} = require("../Mocha_Playwright_Chai/pageobjects/homepage.page");
const {
  CookieManager,
} = require("../Mocha_Playwright_Chai/pageobjects/cookieManager.page");

/**
 * Fixtures are added by using `extend()` method of the `test`.
 * Since we are essentially adding and object, you can define and extend
 * the test by multiple fixtures and then use them in the `test()`
 */

const test = base.test.extend({
  // fixture representing homepage
  homepage: async ({ context, page }, use) => {
    const homepage = new Homepage(context, page);
    const cookieBanner = new CookieManager(context, page);
    await homepage.visit();
    await cookieBanner.clickBttnAcceptConsents();
    // after defining, what the fixture will do
    // we have to use() it
    await use(homepage);
    // here would be a teardown code, if necessary
  },
});

test("_ga cookie is stored", async ({ homepage }) => {
  test
    .expect(await homepage.isCookieStored("_ga", "https://www.tesena.com"))
    .toBe(true);
});
