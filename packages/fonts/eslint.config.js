import { defineConfig } from 'eslint/config';
import jsConfig from '@synergy-design-system/eslint-config-syn';

export default defineConfig([
  ...jsConfig,
  {
    files: ['scripts/**/*.js'],
    rules: {
      'import/no-extraneous-dependencies': 'off',
      'no-console': 'off',
    },
  },
]);
