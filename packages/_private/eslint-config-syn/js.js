/* eslint-disable no-underscore-dangle */
import path from 'path';
import { fileURLToPath } from 'url';

import { FlatCompat } from '@eslint/eslintrc';
import { defineConfig } from 'eslint/config';
import js from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import importPlugin from 'eslint-plugin-import';
import globals from 'globals';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

/**
 * Base JavaScript config (equivalent to the old js.js)
 * Uses Airbnb base rules via compatibility layer
 */
export default defineConfig([
  js.configs.recommended,
  ...compat.extends('airbnb-base'),
  ...compat.plugins('compat'),
  {
    languageOptions: {
      ecmaVersion: 2022,
      globals: {
        ...globals.browser,
        ...globals.es2022,
        ...globals.node,
      },
      sourceType: 'module',
    },
    plugins: {
      '@stylistic': stylistic,
      import: importPlugin,
    },
    rules: {
      // Disabled as we use it for templating a lot
      'arrow-parens': 'off',

      complexity: ['error', 5],

      // Rule disabled, we use node imports and node imports always need extensions
      'import/extensions': 'off',

      'import/order': ['error', {
        groups: [
          'builtin',
          'external',
          'internal',
        ],
      }],

      // Rule disabled, it is better for tree shaking to just stick with named exports
      'import/prefer-default-export': 'off',

      'sort-imports': ['error', {
        ignoreDeclarationSort: true,
      }],

      'sort-keys': 'warn',
    },
    settings: {
      // Support browserslist without package.json
      browsers: ['defaults and supports es6-module'],
    },
  },
  {
    rules: {
      'comma-dangle': 'off', // Use @stylistic version
      indent: 'off', // Use @stylistic version,
      quotes: 'off', // Use @stylistic version
    },
  },
  // Allow self referencing of eslint.config
  {
    files: ['eslint.config.js'],
    rules: {
      'import/no-extraneous-dependencies': 'off',
    },
  }
]);
