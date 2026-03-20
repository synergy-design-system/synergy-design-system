import { createCustomConfig } from '@synergy-design-system/eslint-config-syn/ts';

export default [
  ...createCustomConfig({
    project: './tsconfig.json',
    tsconfigRootDir: import.meta.dirname,
  }),
  // Build and utility scripts need relaxed rules
  {
    files: [
      'src/**/*.ts',
    ],
    rules: {
      // There are some cases where we want to allow async functions that may appear to not have await, such as when they are used as callbacks or when they are required by an interface, and we don't want to enforce that all async functions must have an await
      '@typescript-eslint/require-await': 'off',

      // Its an etl pipeline, so we want to allow for more complex functions
      complexity: 'off',

      // We use for of loops in some places for better readability and performance, and we don't use the features that these rules prevent
      'no-restricted-syntax': ['error', 'ForInStatement', 'LabeledStatement', 'WithStatement'],
    },
  },
];
