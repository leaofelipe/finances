const fs = require('fs')
const path = require('path')

const prettierOptions = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '.prettierrc'), 'utf8')
)

module.exports = {
  extends: ['standard', 'prettier'],
  plugins: ['prettier'],
  env: {
    node: true,
    es6: true
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  rules: {
    'prettier/prettier': ['error', prettierOptions],
    'arrow-body-style': [2, 'as-needed'],
    'class-methods-use-this': 0,
    'comma-dangle': ['error', 'never'],
    'dot-notation': ['error', { allowPattern: '_id' }],
    indent: [2, 2, { SwitchCase: 1 }],
    'max-len': 0,
    'newline-per-chained-call': 0,
    'no-confusing-arrow': 0,
    'no-console': 0,
    'no-unused-vars': 2,
    'no-use-before-define': 0,
    'prefer-template': 2
  }
}
