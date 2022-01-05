import { chromium } from "@playwright/test";

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
  });
  const page = await context.newPage();

  // 1. Use GUI Playwright Inspector
  /**
   * Enable by setting ENV variable PWDEBUG=1
   * On Windows with Powershell, use command: $env:PWDEBUG=1
   * And then run the script you want to debug
   * To unset the ENV variable, either restart the console, or run command:
   * Remove-Item env:\PWDEBUG
   *
   * On Linux (Ubuntu), prepend ENV variable before command which executes the script:
   * PWDEBUG=1 node path/to/script.js
   * ENV variable will be set only for this one specific execution, no need to unset it.
   */

  // 2. Check selectors in developer tools console
  /**
   * Enable the console by setting the ENV variable PWDEBUG="console"
   * Set the breakpoint in the IDE
   * Start the execution and once the execution halts, open the console in the devtools
   * You can now access "playwright" object in the console and its methods
   */

  // 3. Enable Playwright logging to your console/shell
  /**
   * Set the ENV variable DEBUG="pw:api"
   * Execute the script.
   */

  const input = page.locator("form#input-example input");
  const button = page.locator("form#input-example button");

  await page.goto("https://the-internet.herokuapp.com/dynamic_controls", {
    waitUntil: "domcontentloaded",
    timeout: 10000,
  });

  await button.click();
  await input.fill("some text", { timeout: 15000 });
  await button.click();
  await input.isDisabled({ timeout: 15000 });

  await browser.close();
})();
