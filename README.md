# EOX ESLint & Prettier config vor Vue
## Installation
```js
npm install --save-dev EOX-A/code-style-vue
or
npm install --save-dev https://git@github.com/EOX-A/code-style-vue.git
```
## Usage
### Prettier
To run prettier and format all your files in the current folder, use
```bash
npx prettier --write .
or
npx prettier --write "**/*"
```

Please refer to the [Prettier CLI docs](https://prettier.io/docs/en/cli.html) for further details.

### ESLint
To include ESLint in the project, create a file called `.eslintrc.js` in the app root:
```js
module.exports = {
  extends: '@eox'
}
```
Finally, to run ESLint with auto-fixing, use
```bash
npx eslint . --fix
```

Please refer to the [ESLint CLI docs](https://eslint.org/docs/latest/user-guide/command-line-interface) for further details.

## Ignoring files
You can add [.eslintignore](https://eslint.org/docs/latest/user-guide/configuring/ignoring-code) and [.prettierignore](https://prettier.io/docs/en/ignore.html) files to ignore certain folders or files/patterns.

Both ignore files should ideally have the same content, e.g.:

```
public
dist
*.min.js
*.bundle.js

# adapt according to your project needs
```

## Custom configuration & rules
Both Prettier and ESLint allow for some rule customization. Please check the [Prettier configuration options](https://prettier.io/docs/en/options.html) and the [ESLint rules](https://eslint.org/docs/rules/) for an explanation of rules that could be added/modified to this file for individual projects.

BUT: please consider if this is really necessary, or if it could be included in the centralized config rather than in an individual project. Ideally, the individual projects should not use any custom rules.

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
