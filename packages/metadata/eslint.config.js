import { createCustomConfig } from '@synergy-design-system/eslint-config-syn/ts';

export default [
  {
    ignores: ['data/**'],
  },
  ...createCustomConfig({
    project: './tsconfig.json',
    tsconfigRootDir: import.meta.dirname,
  }),
  // Build and utility scripts need relaxed rules
  {
    files: [
      'src/**/*.ts',
      'src/**/*.js',
    ],
    rules: {
      // There are some cases where we want to allow async functions that may appear to not have await, such as when they are used as callbacks or when they are required by an interface, and we don't want to enforce that all async functions must have an await
      '@typescript-eslint/require-await': 'off',

      // Its an etl pipeline, so we want to allow for more complex functions
      complexity: 'off',

      // ETL pipelines iterate over async operations (file I/O, validation loops)
      'no-await-in-loop': 'off',

      // Some patterns legitimately use continue for control flow
      'no-continue': 'off',

      // ETL pipelines use for loops for sequential processing
      'no-restricted-syntax': 'off',
    },
  },
  {
    files: [
      'src/internal/collectors/**/*.ts',
    ],
    rules: {
      // Collectors may rely on build-time-only parsing utilities.
      'import/no-extraneous-dependencies': 'off',
    },
  },
  {
    files: [
      'src/internal/cli/**/*.ts',
      'src/internal/cli/**/*.js',
    ],
    rules: {
      // CLI entrypoints intentionally print user-facing status and failures.
      'no-console': 'off',

      // CLI bootstrap pattern intentionally ignores returned Promise value.
      'no-void': 'off',

      // CLI utilities may use build-time-only validation dependencies.
      'import/no-extraneous-dependencies': 'off',
    },
  },
  {
    files: [
      'test/**/*.mjs',
    ],
    rules: {
      // Chai assertions rely on expression chains.
      '@typescript-eslint/no-unused-expressions': 'off',

      // Integration tests intentionally import dev-only tooling.
      'import/no-extraneous-dependencies': 'off',

      // Async validation loops in tests require await inside the loop.
      'no-await-in-loop': 'off',

      // Tests need to iterate and await async operations sequentially for validation.
      'no-restricted-syntax': 'off',

      // Node-style path helpers are acceptable in tests.
      'no-underscore-dangle': 'off',

      // Chai assertions rely on expression chains.
      'no-unused-expressions': 'off',
    },
  },
];
