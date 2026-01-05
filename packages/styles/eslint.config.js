import { defineConfig } from 'eslint/config';
import synergy from '@synergy-design-system/eslint-config-syn/ts';

export default defineConfig([
  ...synergy,
  {
    files: ['build/**/*.js'],
    rules: {
      'import/no-extraneous-dependencies': 'off',
      'no-console': 'off',
    },
  },
]);
