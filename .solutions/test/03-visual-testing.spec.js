import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("https://the-internet.herokuapp.com/", {
    waitUntil: "domcontentloaded",
  });
});

test("@compare - homepage", async ({ page }) => {
  expect(await page.screenshot()).toMatchSnapshot("homepage.png");
});

test("@compare - page title", async ({ page }) => {
  expect(await page.title()).toMatchSnapshot("page-title.txt");
});

test("@compare - element screenshot", async ({ page }) => {
  const locElement = page.locator("ul li").nth(0);
  expect(await locElement.screenshot()).toMatchSnapshot("element.png");
});
