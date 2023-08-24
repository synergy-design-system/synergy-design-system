module.exports = {
  env: {
    browser: true,
    es2023: true,
    node: true,
  },
  extends: [
    'airbnb-base',
  ],
  rules: {
    complexity: ['error', 5],
    'import/prefer-default-export': 0,
    'sort-imports': 2,
    'sort-keys': 'warn',
  },
};
