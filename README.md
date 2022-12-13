# EOX Vue ESLint config
## Installation
```js
npm install --save-dev EOX-A/eslint-config-vue
```
## Usage
To include this on a project, add to `.eslintrc.js`:
```js
module.exports = {
  extends: ['@eox/eslint-config-vue']
}
```
Also, create a `.prettierrc.json` file to let the editor know prettier is used in this project
```js
echo {} > .prettierrc.json
```

Please check this [link](https://eslint.org/docs/rules/) for the meaning of all the rules.