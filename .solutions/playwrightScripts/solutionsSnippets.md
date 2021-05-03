# Solutions

## CheckElementVisibility.spec.js

    const {firefox} = require("playwright");

    await page.goto("https://www.google.com", {waitUntil: "networkidle"});

    expect(await page.isHidden('//input[@name="btnK"]')).to.be.true;

## runOnChrome.spec.js

    await page.screenshot({ path: "screenshot.png", fullPage: true });

## spinUpContexts.spec.js

- Turn off debug pw:api debug mode
    ```
    Remove-Item Env:\DEBUG
    ```

- Turn on the `PWDEBUG=1` debug mode
    ```
    $env:PWDEBUG=1
    ```

- Turn off the `PWDEBUG=1` debug mode
    ```
    Remove-Item Env:\PWDEBUG
    ```

## navByClickSameTab.spec.js

    await Promise.all([
        page.waitForNavigation(),
        page.click("//nav[@id='menu-main']//a[contains(@href, 'events')]//span"),
    ]);
    await page.waitForLoadState();
    // pause, just to really see something when running this snippet ;)
    await page.waitForTimeout(3000);
    
- locator hint - `//nav[@id='menu-main']//a[contains(@href, 'events')]//span`

## navByClickNewWindow.spec.js

    const [secondPage] = await Promise.all([
        context.waitForEvent("page"),
        page.click('//a[@title="Youtube"]'),
    ]);
    await secondPage.waitForLoadState();
    await secondPage.waitForTimeout(5000);

- locator hint - `//a[@title="Youtube"]`

## iframes.spec.js

    const title = await iFrame.title();
    expect(title).not.to.equal("Twitter Widget Iframe");

## pageObjectPattern.spec.js

    async refresh() {
        await this.page.reload({waitUntil: "networkidle"});
    }

## listeners.spec.js

    page.on("close", () => {
        console.log("We are closing!")
    })

## codegen

    const { firefox } = require('playwright');

    (async () => {
    const browser = await firefox.launch({
        headless: false
    });
    const context = await browser.newContext();

    // Open new page
    const page = await context.newPage();

    // Go to https://www.amazon.com/
    await page.goto('https://www.amazon.com/');

    // Click [aria-label="Search"]
    await page.click('[aria-label="Search"]');

    // Fill [aria-label="Search"]
    await page.fill('[aria-label="Search"]', 'JavaScript for kids');

    // Press Enter
    await Promise.all([
        page.waitForNavigation(/*{ url: 'https://www.amazon.com/s?k=JavaScript+for+kids&ref=nb_sb_noss_2' }*/),
        page.press('[aria-label="Search"]', 'Enter')
    ]);

    // Click text=JavaScript for Kids: A Playful Introduction to Programming
    await page.click('text=JavaScript for Kids: A Playful Introduction to Programming');
    // assert.equal(page.url(), 'https://www.amazon.com/JavaScript-Kids-Playful-Introduction-Programming/dp/1593274084/ref=sr_1_1?dchild=1&keywords=JavaScript+for+kids&qid=1620043885&sr=8-1');

    // Click text=Kindle $23.09
    await page.click('text=Kindle $23.09');
    // assert.equal(page.url(), 'https://www.amazon.com/JavaScript-Kids-Playful-Introduction-Programming-ebook/dp/B00QL616QE/ref=tmm_kin_swatch_0?_encoding=UTF8&qid=1620043885&sr=8-1');

    // Click text=A Smarter Way to Learn JavaScript: The new approach that uses technology to cut
    await page.click('text=A Smarter Way to Learn JavaScript: The new approach that uses technology to cut ');
    // assert.equal(page.url(), 'https://www.amazon.com/Smarter-Way-Learn-JavaScript-technology-ebook/dp/B00H1W9I6C/ref=pd_sbs_1?pd_rd_w=2tlXb&pf_rd_p=98101395-b70f-4a52-af63-8fac2c513e02&pf_rd_r=8P4CA1X24S70J0Y7KKF1&pd_rd_r=c4a3724e-16b2-4aed-b4f0-39599438eee8&pd_rd_wg=UKF9v&pd_rd_i=B00H1W9I6C&psc=1');

    // Click [aria-label="Amazon"]
    await page.click('[aria-label="Amazon"]');
    // assert.equal(page.url(), 'https://www.amazon.com/ref=nav_logo');

    // ---------------------
    await context.close();
    await browser.close();
    })();