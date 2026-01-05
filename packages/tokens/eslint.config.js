import { defineConfig } from 'eslint/config';
import { createCustomConfig } from '@synergy-design-system/eslint-config-syn/ts';

export default defineConfig([
  ...createCustomConfig({
    project: './tsconfig.lint.json',
  }),
  {
    files: ['scripts/**/*.js'],
    rules: {
      'import/no-extraneous-dependencies': 'off',
      'no-console': 'off',
      'no-param-reassign': 'off',
    },
  },
  {
    rules: {
      complexity: ['error', { max: 10 }],
      'max-len': ['error', {
        code: 150,
        ignoreComments: true,
        ignoreTemplateLiterals: true,
      }],
    },
  },
]);
