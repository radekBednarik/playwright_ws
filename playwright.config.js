/**
 * This is an example of the configuration file.
 * All options and how-tos can be found here:
 * https://playwright.dev/docs/test-configuration
 */
const { devices } = require("playwright");

module.exports = {
  // global options, which will be used across all browsers/projects
  // in the use property you can set all options available for `browserType.launch([options])`
  // and `browser.newContext([options])`
  use: {
    // this is option for browser
    headless: false,
    // these are options for context
    viewport: { width: 1920, height: 1080 },
    ignoreHTTPSErrors: true,
    // also let's store some test artifacts
    // will be stored for each test always
    screenshot: "on",
    // for the workshop, we will always record
    // however, you have options to record only if fail, or retry
    // and retain the videos only on failure to save space
    video: "on",
  },
  // now we will just specify "project", aka browsers and maybe their configurations
  // we want the tests be run on
  projects: [
    {
      name: "Chromium Desktop",
      use: {
        browserName: "chromium",
      },
    },
    {
      name: "Firefox Desktop Small",
      use: {
        browserName: "firefox",
        viewport: { width: 800, height: 600 },
      },
    },
    {
      name: "Safari iPhone 11",
      use: {
        browserName: "webkit",
        ...devices["iPhone 11"],
      },
    },
  ],
};
