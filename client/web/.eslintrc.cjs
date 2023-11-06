/* eslint-env node */
/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  env: {
    browser: true,
    es202: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended-type-checked",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs", "vite.config.ts"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
    tsconfigRootDir: __dirname,
  },
  plugins: ["@typescript-eslint"],
};
