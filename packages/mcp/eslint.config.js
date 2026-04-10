import { createCustomConfig } from '@synergy-design-system/eslint-config-syn/ts';

export default [
  ...createCustomConfig({
    project: './tsconfig.lint.json',
    tsconfigRootDir: import.meta.dirname,
  }),
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
