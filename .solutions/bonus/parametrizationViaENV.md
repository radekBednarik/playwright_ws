# parametrization via ENV variables

## install dotenv from npm

    npm i dotenv

## create .env file

    # select browser from 'chromium | webkit | firefox'
    BROWSER="chromium"

## load the .env file as early as possible

- in the .mocharc.js put on top of imports

    ```
    require("dotenv").config()
    ```

## change the mochaGlobalFixture.js

    "use strict";

    const { chromium, webkit, firefox } = require("playwright");

    const BROWSER = process.env.BROWSER;

    /**
    * Creates global Setup function.
    * It runs only once before loading the tests.
    * It does NOT share it's context with tests (and root hooks)!
    * It shares context with global Teardown.
    */
    exports.mochaGlobalSetup = async function () {
        this.browserServer = await {chromium, webkit, firefox}[BROWSER].launchServer({ headless: false });
        // assign websocket string to ENV variable, so we can use it
        // and connect to server from parallely executed root hooks and
        // spec files
        process.env.WS_ENDPOINT = this.browserServer.wsEndpoint();
    };
    /**
    * Creates global Teardown function.
    * It runs after all tests are executed.
    */
    exports.mochaGlobalTeardown = async function () {
        // after all is done, close the server
        await this.browserServer.close();
    };