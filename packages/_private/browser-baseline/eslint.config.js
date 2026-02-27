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
    },
    plugins: {
      '@stylistic': stylistic,
      import: importPlugin,
    },
    rules: {
      '@stylistic/quote-props': 'off',
      '@stylistic/semi': ['error', 'always'],
      'arrow-body-style': ['error', 'as-needed'],
    },
  },
];
