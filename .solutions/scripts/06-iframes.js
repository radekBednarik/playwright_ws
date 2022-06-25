import { webkit } from "@playwright/test";

(async () => {
  const browser = await webkit.launch({ headless: false });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
  });
  const page = await context.newPage();

  await page.goto("https://the-internet.herokuapp.com/nested_frames", {
    waitUntil: "domcontentloaded",
    timeout: 10000,
  });
  // like frame objects
  const frameLeft = page.frame("frame-left");
  const frameMiddle = page.frame("frame-middle");
  const frameRight = page.frame("frame-right");
  const frameBottom = page.frame("frame-bottom");

  console.log("Left Frame Name: ", frameLeft.name());
  console.log("Middle Frame Name: ", frameMiddle.name());
  console.log("Right Frame Name: ", frameRight.name());
  console.log("Bottom Frame Name: ", frameBottom.name());

  await page.waitForTimeout(2000);

  // like locators

  await page.goto("https://the-internet.herokuapp.com/iframe");

  const editorBodyText = page.frameLocator("#mce_0_ifr").locator("#tinymce p");
  await editorBodyText.evaluate(
    (element) => (element.innerText = "This is my text now.")
  );

  await page.waitForTimeout(5000);

  await browser.close();
})();
