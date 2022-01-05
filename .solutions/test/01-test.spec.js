import { test, expect } from "@playwright/test";

test.describe.parallel("Elements are visible", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/dynamic_controls", {
      waitUntil: "domcontentloaded",
    });
  });

  test("input is visible", async ({ page }) => {
    const input = page.locator("form#input-example input");
    await expect(input).toBeVisible();
  });

  test("button is visible", async ({ page }) => {
    const button = page.locator("form#input-example button");
    await expect(button).toBeVisible();
  });
});
