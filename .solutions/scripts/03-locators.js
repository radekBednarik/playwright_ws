import { firefox } from "@playwright/test";

(async () => {
  const browser = await firefox.launch({ headless: false });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
  });
  const page = await context.newPage();

  const menuItems = page.locator("div.example li");
  let elements;
  let elementCount;

  await page.goto("https://the-internet.herokuapp.com/disappearing_elements", {
    waitUntil: "domcontentloaded",
    timeout: 10000,
  });

  elements = await menuItems.elementHandles();
  elementCount = elements.length;
  console.log("First load >> Number of menu items: ", elementCount);

  await page.reload({ waitUntil: "domcontentloaded" });

  elements = await menuItems.elementHandles();
  elementCount = elements.length;
  console.log("Second load >> Number of menu items: ", elementCount);

  await browser.close();
})();
