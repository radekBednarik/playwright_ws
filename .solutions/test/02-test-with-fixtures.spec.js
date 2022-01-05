import { test as first, expect } from "@playwright/test";

const test = first.extend({
  page: async ({ page }, use) => {
    await page.goto("https://the-internet.herokuapp.com/dynamic_controls", {
      waitUntil: "domcontentloaded",
    });
    await use(page);
  },
});

test.describe("@withFixture - Elements are visible", () => {
  test("input is visible", async ({ page }) => {
    const input = page.locator("form#input-example input");
    await expect(input).toBeVisible();
  });

  test("button is visible", async ({ page }) => {
    const button = page.locator("form#input-example button");
    await expect(button).toBeVisible();
  });
});
