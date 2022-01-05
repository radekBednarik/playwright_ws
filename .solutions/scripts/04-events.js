import { chromium } from "@playwright/test";

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
  });
  const page = await context.newPage();

  // wait for specific request

  const [request] = await Promise.all([
    page.waitForRequest("**/app.css"),
    page.goto("https://the-internet.herokuapp.com/", {
      waitUntil: "networkidle",
    }),
  ]);

  console.log("Request URL: ", request.url());

  // listen to requests continuosly
  const container = [];

  page.on("request", (request) => {
    container.push(request.url());
  });

  await page.goto("https://the-internet.herokuapp.com/context_menu", {
    waitUntil: "networkidle",
  });

  console.log("All requests URLs: ", JSON.stringify(container, null, 2));

  await browser.close();
})();
