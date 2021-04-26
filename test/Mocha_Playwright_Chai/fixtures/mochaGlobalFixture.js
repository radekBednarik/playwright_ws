"use strict";

const { chromium } = require("playwright");

/**
 * Creates global Setup function.
 * It runs only once before loading the tests.
 * It does NOT share it's context with tests (and root hooks)!
 * It shares context with global Teardown.
 */
exports.mochaGlobalSetup = async function () {
  this.browserServer = await chromium.launchServer({ headless: false });
  // assign websocket string to ENV variable, so we can use it
  // and connect to server from parallely executed root hooks and
  // spec files
  process.env.WS_ENDPOINT = this.browserServer.wsEndpoint();
  console.log(process.env.WS_ENDPOINT);
};
/**
 * Creates global Teardown function.
 * It runs after all tests are executed.
 */
exports.mochaGlobalTeardown = async function () {
  // after all is done, close the server
  await this.browserServer.close();
};
