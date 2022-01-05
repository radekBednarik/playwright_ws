import { chromium } from "@playwright/test";

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
  });
  const page = await context.newPage();

  const locLink = page.locator("div.example a");

  await page.goto("https://the-internet.herokuapp.com/windows", {
    waitUntil: "domcontentloaded",
    timeout: 10000,
  });

  const [secondPage] = await Promise.all([
    context.waitForEvent("page"),
    locLink.click(),
  ]);

  // we have second page and now can work with both
  // pages directly, now "focus" switching is needed

  console.log("URL of the first page: ", page.url());
  console.log("URL of the second page: ", secondPage.url());

  await secondPage.waitForTimeout(5000);

  await browser.close();
})();
