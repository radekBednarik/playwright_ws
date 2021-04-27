module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    node: true,
    mocha: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:mocha/recommended",
    "plugin:chai-expect/recommended",
  ],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {},
  overrides: [
    {
      files: ["testLibrary.js", "*.spec.js"],
      rules: { "mocha/no-exports": "off", "mocha/no-setup-in-describe": "off" },
    },
  ],
  plugins: ["mocha", "chai-expect"],
};
