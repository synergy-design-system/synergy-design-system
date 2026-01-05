import { defineConfig } from 'eslint/config';
import jsConfig from './js.js';

export default defineConfig([
  ...jsConfig,
  // Override for config files in this package only
  {
    files: ['*.js', 'js.js', 'ts.js'],
    rules: {
      'import/no-unresolved': 'off',
    },
  },
]);
