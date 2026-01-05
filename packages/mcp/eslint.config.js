import { defineConfig } from 'eslint/config';
import tsConfig from '@synergy-design-system/eslint-config-syn/ts';

export default defineConfig([
  // Global ignores - must come first
  {
    ignores: ['metadata/'],
  },
  ...tsConfig,
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
  {
    rules: {
      complexity: ['error', {
        max: 10,
      }],
    },
  },
]);
