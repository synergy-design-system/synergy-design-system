/* eslint-disable no-underscore-dangle */
import path from 'path';
import { fileURLToPath } from 'url';

import { FlatCompat } from '@eslint/eslintrc';
import { defineConfig } from 'eslint/config';
import js from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import importPlugin from 'eslint-plugin-import';
import globals from 'globals';

/**
 * Base JavaScript ESLint Configuration for Synergy Design System
 *
 * This configuration provides the foundation for all JavaScript linting in the project.
 * It extends Airbnb's base style guide and integrates with the @stylistic plugin for
 * consistent code formatting.
 *
 * Key features:
 * - Airbnb base rules via compatibility layer (for ESLint 9)
 * - @stylistic plugin for code style (replacing deprecated ESLint style rules)
 * - Browser compatibility checking via eslint-plugin-compat
 * - Import/export validation
 * - Complexity and code quality rules
 *
 * @see https://github.com/airbnb/javascript
 * @see https://eslint.style/
 */

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

/**
 * Base JavaScript config
 *
 * Architecture:
 * 1. ESLint recommended rules (core JS best practices)
 * 2. Airbnb base style guide (via compatibility layer for ESLint 9)
 * 3. Compat plugin (browser compatibility warnings)
 * 4. Custom rule overrides (Synergy-specific conventions)
 * 5. Style rule cleanup (@stylistic migration)
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
      // === Code Style Rules ===
      // Disabled as we use it for templating a lot
      'arrow-parens': 'off',

      // === Code Quality Rules ===
      // Increased from default 5 to allow more complex functions
      complexity: ['error', 10],

      // === Import/Export Rules ===
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

      // === Readability Rules ===
      // Enforce reasonable line length to maintain readability
      'max-len': ['error', {
        code: 150,
        ignoreComments: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
      }],

      'sort-imports': ['error', {
        ignoreDeclarationSort: true,
      }],

      // Enforce alphabetical key ordering for better maintainability
      'sort-keys': 'warn',
    },
    settings: {
      // Support browserslist without package.json
      browsers: ['defaults and supports es6-module'],
    },
  },
  // Disable base style rules that have @stylistic equivalents
  // This prevents conflicts between Airbnb's style rules and @stylistic plugin
  // See: https://eslint.style/guide/migration
  {
    rules: {
      'brace-style': 'off', // Use @stylistic/brace-style
      'comma-dangle': 'off', // Use @stylistic/comma-dangle
      'comma-spacing': 'off', // Use @stylistic/comma-spacing
      'func-call-spacing': 'off', // Use @stylistic/func-call-spacing
      indent: 'off', // Use @stylistic/indent
      'key-spacing': 'off', // Use @stylistic/key-spacing
      'keyword-spacing': 'off', // Use @stylistic/keyword-spacing
      'object-curly-spacing': 'off', // Use @stylistic/object-curly-spacing
      quotes: 'off', // Use @stylistic/quotes
      semi: 'off', // Use @stylistic/semi
      'space-before-blocks': 'off', // Use @stylistic/space-before-blocks
      'space-before-function-paren': 'off', // Use @stylistic/space-before-function-paren
      'space-infix-ops': 'off', // Use @stylistic/space-infix-ops
    },
  },
  // Allow self-referencing the config in its own eslint.config.js
  {
    files: ['eslint.config.js'],
    rules: {
      'import/no-extraneous-dependencies': 'off',
    },
  }
]);
