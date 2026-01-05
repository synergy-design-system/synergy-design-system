import { defineConfig } from 'eslint/config';
import tsConfig from '@synergy-design-system/eslint-config-syn/ts';

export default defineConfig([
  // Global ignores - must come first
  {
    ignores: ['dist/', 'dist/**/*'],
  },
  // Then apply configs
  ...tsConfig,
  {
    files: ['scripts/**/*.js'],
    rules: {
      'import/no-extraneous-dependencies': 'off',
      'no-console': 'off',
    },
  },
]);
