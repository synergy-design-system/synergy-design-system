import { defineConfig } from 'eslint/config';
import { createCustomConfig } from '@synergy-design-system/eslint-config-syn/ts';
import wc from 'eslint-plugin-wc';
import lit from 'eslint-plugin-lit';
import litA11y from 'eslint-plugin-lit-a11y';
import playwright from 'eslint-plugin-playwright';

export default defineConfig([
  {
    ignores: ['dist/', 'dist/**/*', 'code-connect/icons/**/*'],
  },
  createCustomConfig({
    project: './tsconfig.lint.json',
  }),
  wc.configs['flat/recommended'],
  lit.configs['flat/recommended'],
  litA11y.configs.recommended,
  {
    plugins: {
      lit,
      'lit-a11y': litA11y,
      wc,
    },
  },
  // Add Playwright rules for test files
  {
    files: ['**/*.spec.ts', '**/*.test.ts', '**/*.spec.js', '**/*.test.js'],
    plugins: {
      playwright,
    },
    rules: {
      // Use playwright-test config instead of jest-playwright
      ...playwright.configs['playwright-test'].rules,
      'playwright/valid-expect': 'off', // Disabled due to bug in v2.4.0
      'playwright/no-skipped-test': ['warn', {
        allowConditional: true,
      }],
    },
  },
  {
    files: ['./src/**/*.test.ts'],
    rules: {
      '@typescript-eslint/await-thenable': 'off',
      '@typescript-eslint/no-unused-expressions': 'off',
      'import/no-extraneous-dependencies': 'off',
    },
  },
  {
    linterOptions: {
      reportUnusedDisableDirectives: 'off',
    },
    rules: {
      complexity: ['error', { max: 10 }],
      'no-unused-disable-directive': 'off',
    },
  },
]);
