/**
 * This test suite is written using
 * "standard" mocha-like syntax and hooks.
 * Details about what test runner supports can be found here:
 * https://playwright.dev/docs/test-intro#group-tests
 * https://playwright.dev/docs/test-intro#use-test-hooks
 */

const { test, expect } = require("@playwright/test");

// we will do some tests on the homepage

test.describe("homepage test", () => {
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
