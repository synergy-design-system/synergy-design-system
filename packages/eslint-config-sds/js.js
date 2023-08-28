module.exports = {
  env: {
    browser: true,
    es2023: true,
    node: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 2023,
  },
  rules: {
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
};
