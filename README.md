# EOX ESLint & Prettier config for JS projects

## About

This reusable config aims to be our default way of setting up linting and formatting for JS projects. It includes:

- eslint dependency
- prettier dependency
- typescript dependency
- recommended eslint config
- recommended typescript-eslint
- typescript-eslint parser
- vue-eslint parser
- eslint-plugin-vue (included natively as warnings)
- eslint-plugin-jsdoc (included natively as warnings)
- cypress rules
- chai friendly errors

The config also includes a minimal set of rules, defined in [index.js](./index.js).

## Installation

```js
npm install --save-dev @eox/eslint-config
```

## Usage

### The "One-Stop-Shop" Default

To include the complete standard EOX configuration (which includes Base JS, TypeScript, Vue 3, JSDoc, Cypress, and Prettier integrations), create a file called `eslint.config.mjs` in the app root:

```js
import eox from "@eox/eslint-config";

export default [...eox];
```

### Modular Imports

If you want more control or want to minimize the configuration for a specific project (e.g., a pure backend Node.js service that doesn't use Vue or Cypress), you can import the individual components of the configuration.

Available named exports:

- `js`
- `typescript`
- `vue3`
- `cypress`
- `jsdocRules`
- `prettier` (always apply this last)

```js
// eslint.config.mjs
import { js, typescript, jsdocRules, prettier } from "@eox/eslint-config";

export default [
  ...js,
  ...typescript,
  ...jsdocRules,
  ...prettier, // make sure this is at the end to disable conflicting formatting rules
];
```

Finally, to run ESLint with auto-fixing, use

```bash
npx eslint --fix .
```

Please refer to the [ESLint configuration docs](https://eslint.org/docs/latest/use/configure/) and [ESLint CLI docs](https://eslint.org/docs/latest/user-guide/command-line-interface) for further details.

### TypeScript

To use typescript checks, create a `tsconfig.json` in the project root and extend the centralized configuration:

```json
{
  "extends": "@eox/eslint-config/tsconfig.base.json",
  "include": ["src/**/*", "tests/**/*"]
}
```

and run the check with

```bash
npx tsc
```

## Ignoring files

not any longer -> only for prettier?

You can add a [.prettierignore](https://prettier.io/docs/en/ignore.html) file to ignore certain folders or files/patterns.

E.g.:

```
public
dist
*.min.js
*.bundle.js

# adapt according to your project needs
```

For ESlint, use the [`ignores` property in the config file](https://eslint.org/docs/latest/use/configure/migration-guide#ignoring-files). Example:

```js
  // other config
  { ignores: ["dist"] },
  // other config
```

## Custom configuration & rules

Both Prettier and ESLint allow for some rule customization. Please check the [Prettier configuration options](https://prettier.io/docs/en/options.html) and the [ESLint rules](https://eslint.org/docs/rules/) for an explanation of rules that could be added/modified to this file for individual projects.

BUT: please consider if this is really necessary, or if it could be included in the centralized config rather than in an individual project. Ideally, the individual projects should not use any custom rules.

## Extending the Config

Since `@eox/eslint-config` v2.1, Vue, Cypress, and JSDoc rules are natively included out-of-the-box. You no longer need to manually append `eslint-plugin-vue`.

If you need to override any rules or add specific plugins, you can do so by appending an object to the exported array:

```js
// eslint.config.mjs
import eox from "@eox/eslint-config";

export default [
  ...eox,
  {
    rules: {
      // override/add rules settings here
      "vue/no-v-html": "off",
    },
  },
];
```

## Checking for valid code

To check if your code is valid before committing or inside a CI pipeline, use

```bash
npx prettier --check .
npx eslint .
```

## Automation in VS Code (extension, settings)

### Prettier

Although you can use prettier via command line, in a pre-commit hook or in a CI pipeline, you can also use the VS Code extension to format files (or file sections) via a handy command or even automatically (e.g. on file save) right inside your code editor.

--> [Prettier - Code formatter extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

Please refer to the description about setting up and using the extension!

As a bare minimum, create a `.prettierrc.json` file in the app root to let the editor know prettier is used in this project

```js
echo {} > .prettierrc.json
```

### ESLint

As for ESLint, automatically running and fixing your code can be obtained by changing the settings in your workspace or dev container settings, e.g.:

```
"editor.codeActionsOnSave": {
  "source.fixAll.eslint": true
},
```
