const fs = require("fs")
const path = require("path")

const isIncludes = (arr, target) => arr.some(el => target.includes(el));
const ext = [".js", ".ts", ".mjs", ".cjs"]

const files = fs.readdirSync(path.resolve(__dirname, "./")).map(file => { // list files in the folder.
  if(isIncludes(ext, file)) {
    return file
  }
}).filter((file) => file != null);

module.exports = {
  // ...
  extends: [
    // ...
    "airbnb-base",
    "airbnb-typescript/base",
    "plugin:astro/recommended",
    "plugin:prettier/recommended"
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
  },
  rules: {
    "import/prefer-default-export": "off",
  },
  ignorePatterns: [
    ...files
  ],
  settings: {
    "import/resolver": {
      typescript: {},
    },
  },
  // ...
  overrides: [
    {
      // Define the configuration for `.astro` file.
      files: ["*.astro"],
      // Allows Astro components to be parsed.
      parser: "astro-eslint-parser",
      // Parse the script in `.astro` as TypeScript by adding the following configuration.
      // It's the setting you need when using TypeScript.
      parserOptions: {
        parser: "@typescript-eslint/parser",
        extraFileExtensions: [".astro"],
        project: "./tsconfig.json",
      },
      rules: {
        // override/add rules settings here, such as:
        // "astro/no-set-html-directive": "error"
      },
    },
    // ...
  ],
}
