module.exports = {
  env: {
    browser: true,
    es2023: true,
    node: true,
  },
  extends: [
    'airbnb-base',
    'plugin:compat/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2023,
  },
  plugins: [
    'compat',
  ],
  rules: {

    // Disabled as we use it for templating a lot
    'arrow-parens': 0,

    complexity: ['error', 5],

    // Rule disabled, we use node imports and node imports always need extensions
    'import/extensions': 0,

    'import/order': ['error', {
      groups: [
        'builtin',
        'external',
        'internal',
      ],
    }],

    // Rule disabled, it is better for tree shaking to just stick with named exports
    'import/prefer-default-export': 0,

    'sort-imports': ['error', {
      ignoreDeclarationSort: true,
    }],

    'sort-keys': 'warn',
  },
  settings: {
    // Support browserslist without package.json
    browsers: ['defaults and supports es6-module'],
  },
};
