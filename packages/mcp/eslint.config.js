import { createCustomConfig } from '@synergy-design-system/eslint-config-syn/ts';

export default [
  // Global ignores - must come first
  {
    ignores: ['metadata/'],
  },
  ...createCustomConfig({
    project: './tsconfig.json',
    tsconfigRootDir: import.meta.dirname,
  }),
  // Build and utility scripts need relaxed rules
  {
    files: [
      'src/build/**/*.ts',
      'src/utilities/storybook/**/*.ts',
    ],
    rules: {
      'import/no-extraneous-dependencies': 'off',
      'no-console': 'off',
    },
  },
];
