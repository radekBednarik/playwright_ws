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
    await homepage.visit();
    // after defining, what the fixture will do
    // we have to use() it
    await use(homepage);
    // here would be a teardown code, if necessary
  },
  // fixture representing Cookie Manager
  // it will get passed in the homepage  to ensure the correct order
  // of using the fixtures
  cookieManager: async ({ context, page, homepage }, use) => {
    const cookieManager = new CookieManager(context, page);
    await homepage;
    await cookieManager.clickBttnAcceptConsents();
    await use(cookieManager);
  },
});

test("_ga cookie is stored", async ({ context, cookieManager }) => {
  const cookies = await context.cookies("https://www.tesena.com/en");
  test.expect(cookies).not.toHaveLength(0);

  const [aid_cookie] = cookies.filter((cookie) => {
    if (cookie.name === "_ga") {
      return cookie;
    }
  });
  // console.log(aid_cookie);
  test.expect(aid_cookie).not.toBeUndefined();
});
