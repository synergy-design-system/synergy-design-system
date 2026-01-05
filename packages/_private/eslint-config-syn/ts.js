import { defineConfig } from 'eslint/config';
import stylistic from '@stylistic/eslint-plugin';
import tseslint from 'typescript-eslint';

import jsConfig from './js.js';

/**
 * TypeScript config (equivalent to the old ts.js)
 * Extends the JavaScript config with TypeScript-specific rules
 * Note: We skip airbnb-typescript to avoid plugin conflicts,
 * but the base airbnb-base rules from jsConfig still apply
 */
export default defineConfig([
  ...jsConfig,
  ...tseslint.configs.recommendedTypeChecked,
  {
    // files: ['**/*.ts', '**/*.tsx', '**/*.mts', '**/*.cts'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        // Don't set project here - let consuming packages override this
        projectService: true, // Use TypeScript's project service for automatic tsconfig detection
      },
    },
    plugins: {
      '@stylistic': stylistic,
    },
    rules: {
      // Disable base rules that conflict with TypeScript equivalents
      '@stylistic/arrow-parens': 'off', // Disabled for templating
      '@stylistic/comma-dangle': ['error', 'always-multiline'],
      '@stylistic/indent': ['error', 2, {
        // Support for lit-html templates
        ignoredNodes: ['TemplateLiteral *'],
      }],
      '@stylistic/jsx-closing-bracket-location': ['error', 'line-aligned'],
      '@stylistic/jsx-tag-spacing': ['error', {
        afterOpening: 'never',
        beforeClosing: 'never',
        beforeSelfClosing: 'always',
        closingSlash: 'never',
      }],
      '@stylistic/jsx-wrap-multilines': ['error', {
        arrow: 'parens-new-line',
        assignment: 'parens-new-line',
        declaration: 'parens-new-line',
        return: 'parens-new-line',
      }],
      '@stylistic/quotes': ['error', 'single', { avoidEscape: true }],
      '@stylistic/semi': ['error', 'always'],
      '@typescript-eslint/no-shadow': ['error'],
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-use-before-define': ['error'],
      'import/no-unresolved': 'off', // TypeScript handles import resolution better
      'no-shadow': 'off',
      'no-undef': 'off', // TypeScript handles this
      'no-unused-vars': 'off',
      'no-use-before-define': 'off',
    },
  },
  // Disable type-checked rules for plain JS files (like this config file itself)
  {
    files: ['**/*.js', '**/*.mjs', '**/*.cjs'],
    ...tseslint.configs.disableTypeChecked,
  },
]);
