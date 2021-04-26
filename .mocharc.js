/**
 * Configuration file for mocha.js
 * This is the first file, the Mocha.js will load.
 * You can specify this file also as:
 * - json
 * - yaml
 * - or into the property "mocha" in the `package.json`
 * However, using `.js` format will allow to do various configuration
 * steps, like loading .dotenv files, if you need, etc...
 */
const { cpus } = require("os");

/**
 * Mocha config file
 * @exports MochaConfigFile
 *
 * Example of Mocha.js config file with list of available options:
 * @see https://github.com/mochajs/mocha/blob/master/example/config/.mocharc.js
 */
module.exports = {
  // default timeout of mocha is very low, needs to be increased
  timeout: 60000,
  // default slow threshold for tests is very low, needs to be increased
  slow: 30000,
  // default directory where Mocha should look for tests
  spec: ["test/Mocha_Playwright_Chai/spec/**/*.js"],
  // test interface (BDD)
  ui: "bdd",
  // run spec.js files in parallel?
  parallel: true,
  // how many files run in parallel at max?
  jobs: cpus().length / 2,
  reporter: ["spec"],
};
