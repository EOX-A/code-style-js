import eslintConfigPrettier from "eslint-config-prettier";
import globals from "globals";
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import tsParser from "@typescript-eslint/parser";
import vueParser from "vue-eslint-parser";
import pluginCypress from "eslint-plugin-cypress";
import pluginChaiFriendly from "eslint-plugin-chai-friendly";
import pluginVue from "eslint-plugin-vue";
import pluginJsdoc from "eslint-plugin-jsdoc";

/**
 * Helper to dynamically convert error levels to warnings
 * so that new rules do not break existing CI pipelines.
 * @param {Array<object>|object} configs - ESLint configuration object(s)
 * @returns {Array<object>} The modified configs with errors downgraded to warnings
 */
function mapConfigsToWarn(configs) {
  if (!Array.isArray(configs)) {
    configs = [configs];
  }
  return configs.map((config) => {
    if (!config.rules) return config;
    const newRules = {};
    for (const [key, value] of Object.entries(config.rules)) {
      if (Array.isArray(value)) {
        if (value[0] === "error" || value[0] === 2) {
          newRules[key] = ["warn", ...value.slice(1)];
        } else {
          newRules[key] = value;
        }
      } else if (value === "error" || value === 2) {
        newRules[key] = "warn";
      } else {
        newRules[key] = value;
      }
    }
    return { ...config, rules: newRules };
  });
}

export const cypress = [
  pluginCypress.configs.recommended,
  {
    plugins: { "chai-friendly": pluginChaiFriendly },
    rules: {
      "chai-friendly/no-unused-expressions": "error",
    },
  },
];

export const js = [
  eslint.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser,
      },
    },
  },
];

export const typescript = [
  ...mapConfigsToWarn(tseslint.configs.recommended),
  {
    languageOptions: {
      parserOptions: {
        parser: tsParser,
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
      "@typescript-eslint/no-unused-expressions": "off",
    },
  },
];

export const vue3 = [
  ...mapConfigsToWarn(pluginVue.configs["flat/recommended"]),
  {
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tsParser,
        extraFileExtensions: [".vue"],
      },
    },
  },
];

export const jsdocRules = [
  ...mapConfigsToWarn([
    pluginJsdoc.configs["flat/recommended-typescript-flavor"],
  ]),
];

export const prettier = [eslintConfigPrettier];

export default [
  ...cypress,
  ...js,
  ...typescript,
  ...vue3,
  ...jsdocRules,
  ...prettier,
];
