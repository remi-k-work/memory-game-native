// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require("eslint/config");
const expoConfig = require("eslint-config-expo/flat");
require("eslint-config-prettier");

module.exports = defineConfig([
  expoConfig,
  "eslint-config-prettier",
  {
    ignores: ["dist/*"],
  },
]);
