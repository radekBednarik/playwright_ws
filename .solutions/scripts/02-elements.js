import { chromium } from "@playwright/test";

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
  });
  const page = await context.newPage();

  // clicks

  await page.goto("https://the-internet.herokuapp.com/add_remove_elements/", {
    waitUntil: "domcontentloaded",
    timeout: 10000,
  });

  await page.click("div.example button");

  // or resolve element and then click
  const button = await page.waitForSelector("div.example button");
  await button.click();

  // checkboxes

  await page.goto("https://the-internet.herokuapp.com/checkboxes", {
    waitUntil: "domcontentloaded",
    timeout: 10000,
  });

  await page.check("form#checkboxes input >> nth=0");

  await page.waitForTimeout(2000);
  // uncheck second checkbox

  await page.uncheck("form#checkboxes input >> nth=1");

  await page.waitForTimeout(2000);

  // dropdowns

  await page.goto("https://the-internet.herokuapp.com/dropdown", {
    waitUntil: "domcontentloaded",
    timeout: 10000,
  });

  await page.selectOption("select#dropdown", { value: "1" });

  await page.waitForTimeout(2000);

  // inputs

  await page.goto("https://the-internet.herokuapp.com/inputs", {
    waitUntil: "domcontentloaded",
    timeout: 10000,
  });

  await page.fill("div.example input", "10");

  await page.waitForTimeout(2000);

  // drag and drop using page and selectors
  await page.goto("https://the-internet.herokuapp.com/drag_and_drop", {
    waitUntil: "domcontentloaded",
    timeout: 10000,
  });
  await page.dragAndDrop("div#column-a", "div#column-b");
  await page.waitForTimeout(5000);

  // drag to using locator (new in version 1.18)
  await page.goto("https://the-internet.herokuapp.com/drag_and_drop", {
    waitUntil: "domcontentloaded",
    timeout: 10000,
  });
  const locColumnA = page.locator("div#column-a");
  const locColumnB = page.locator("div#column-b");

  await locColumnA.dragTo(locColumnB);

  await page.waitForTimeout(5000);

  await browser.close();
})();
