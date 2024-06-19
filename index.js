import eslintConfigPrettier from "eslint-config-prettier";
import globals from "globals";
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import tsParser from "@typescript-eslint/parser";
import vueParser from "vue-eslint-parser";
import pluginCypress from "eslint-plugin-cypress/flat";
import pluginChaiFriendly from "eslint-plugin-chai-friendly";

export default [
  pluginCypress.configs.recommended,
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  eslintConfigPrettier,
  {
    plugins: { "chai-friendly": pluginChaiFriendly },
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tsParser,
      },
      globals: {
        ...globals.node,
        ...globals.browser,
      },
    },
    rules: {
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          varsIgnorePattern: "^_",
          argsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/no-unused-expressions": "off", // disable original rule
      "chai-friendly/no-unused-expressions": "error",
    },
  },
];
