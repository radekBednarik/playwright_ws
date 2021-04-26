# Solutions

## CheckElementVisibility.spec.js

    const {firefox} = require("playwright");

    await page.goto("https://www.google.com", {waitUntil: "networkidle"});

    expect(await page.isHidden('//input[@name="btnK"]')).to.be.true;

## runOnChrome.spec.js

    expect(
        await page.isVisible(
        '//div[@class="menu__wrapper"]//nav[contains(@class, "nav language-switcher")]'
        )
    ).to.be.true;

locator hint:

- `//div[@class="menu__wrapper"]//nav[contains(@class, "nav language-switcher")]`

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