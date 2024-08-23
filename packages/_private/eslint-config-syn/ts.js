const defaultCfg = require('./js');

module.exports = {
  ...defaultCfg,
  extends: [
    'airbnb-base',
    'airbnb-typescript/base',
    'plugin:@typescript-eslint/recommended-type-checked',
    'plugin:compat/recommended',
  ],
  rules: {
    ...defaultCfg.rules,
    '@typescript-eslint/indent': ['error', 2, {
      // This makes sure that indention works with lit and lit-html
      // @see https://stackoverflow.com/questions/68660115/ignore-the-indent-in-lit-html-html-function-with-typescript-eslint-lint-rule
      ignoredNodes: ['TemplateLiteral *'],
    }],
  },
};
