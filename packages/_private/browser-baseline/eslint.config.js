import js from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import importPlugin from 'eslint-plugin-import';

export default [
  js.configs.recommended,
  stylistic.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        console: 'readonly',
        process: 'readonly',
        Buffer: 'readonly',
        global: 'readonly',
      },
    },
    plugins: {
      '@stylistic': stylistic,
      import: importPlugin,
    },
    rules: {
      '@stylistic/quote-props': 'off',
      '@stylistic/semi': ['error', 'always'],
      '@stylistic/brace-style': ['error', '1tbs'],
      'arrow-body-style': ['error', 'as-needed'],
    },
  },
  {
    files: ['src/baselines/**/*.js'],
    rules: {
      // Disable specific rules for generated baseline files
      '@stylistic/quotes': 'off',
      '@stylistic/comma-dangle': 'off',
      '@stylistic/no-trailing-spaces': 'off',
      '@stylistic/semi': 'off',
      'import/order': 'off',
    },
  },
];
