### 1. CREATE CONFIGURATION FILE

- save in the root of the project file `playwright.config.js`

```
/**
 * This is an example of the configuration file.
 * All options and how-tos can be found here:
 * https://playwright.dev/docs/test-configuration
 */
const { devices } = require("playwright");
const { cpus } = require("os");

module.exports = {
  // global options, which will be used across all browsers/projects
  // in the use property you can set all options available for `browserType.launch([options])`
  // and `browser.newContext([options])`
  use: {
    // this is option for browser
    headless: false,
    // these are options for context
    viewport: { width: 1920, height: 1080 },
    ignoreHTTPSErrors: true,
    // also let's store some test artifacts
    // will be stored for each test always
    screenshot: "on",
    // for the workshop, we will always record
    // however, you have options to record only if fail, or retry
    // and retain the videos only on failure to save space
    video: "on",
  },
  // now we will just specify "project", aka browsers and maybe their configurations
  // we want the tests be run on
  projects: [
    {
      name: "Chromium Desktop",
      use: {
        browserName: "chromium",
      },
    },
    {
      name: "Firefox Desktop Small",
      use: {
        browserName: "firefox",
        viewport: { width: 800, height: 600 },
      },
    },
    {
      name: "Safari iPhone 11",
      use: {
        browserName: "webkit",
        ...devices["iPhone 11"],
      },
    },
  ],
  // here we are doing test runner setup
  // where to find test files
  testMatch: "**/testRunnerSpecs/**/*.spec.js",
  // we can specify retry globaly for all tests
  retries: 2,
  // number of workers to be run at parallel at max
  workers: process.env.CI ? 2 : cpus().length / 2,
};
```

### CREATE MOCHA-LIKE TEST SUITE

- create folder `test/testRunnerSpecs`
- create file `mochaLikeExample.spec.js`

```
/**
 * This test suite is written using
 * "standard" mocha-like syntax and hooks.
 * Details about what test runner supports can be found here:
 * https://playwright.dev/docs/test-intro#group-tests
 * https://playwright.dev/docs/test-intro#use-test-hooks
 */

const { test, expect } = require("@playwright/test");

// we will do some tests on the homepage

test.describe("homepage tests", () => {
  // here we are using direct access to the `page` instance of the browser
  // thanks to the test runner you do not have to care about setting it up
  // to be available
  test.beforeEach(async ({ page }) => {
    await page.goto("https://www.tesena.com/en");
  });

  test("accept button is visible", async ({ page }) => {
    expect(
      await page.isVisible("//button[contains(@class, 'btn-confirm')]")
    ).toBe(true);
  });

  // here we are using direct access to the `context` instance of the browser
  test("_ga cookie is stored", async ({ context }) => {
    const cookies = await context.cookies("https://www.tesena.com/en");
    expect(cookies).not.toHaveLength(0);
    const [aid_cookie] = cookies.filter((cookie) => {
      if (cookie.name === "_ga") {
        return cookie;
      }
    });
    // console.log(aid_cookie);
    expect(aid_cookie).not.toBeUndefined();
  });

  // last test - normally this would be separate test suite, but to
  // showcase using `context` and `page` together
  test("icon click opens LInkedIn tab", async ({ context, page }) => {
    const [secondPage] = await Promise.all([
      context.waitForEvent("page"),
      page.click("//a[@title='LinkedIn']"),
    ]);
    await secondPage.waitForLoadState("domcontentloaded");
    expect(secondPage.url()).toContain("linkedin");
  });
});
```

### 3. CREATE FIXTURE-USING TEST SUITE

- create file `useFixtureExample.spec.js`

```
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
```