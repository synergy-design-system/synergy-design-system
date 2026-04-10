import { createCustomConfig } from '@synergy-design-system/eslint-config-syn/ts';

export default [
  ...createCustomConfig({
    project: './tsconfig.lint.json',
    tsconfigRootDir: import.meta.dirname,
  }),
  {
    files: [
      'test/**/*.ts',
    ],
    rules: {
      '@typescript-eslint/no-floating-promises': 'off',
    },
  },
  {
    files: [
      'src/tools/*.ts',
    ],
    rules: {
      complexity: ['error', {
        max: 15,
      }],
    },
  },
];
