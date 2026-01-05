import tsConfig from '@synergy-design-system/eslint-config-syn/ts';
import playwrightPlugin from 'eslint-plugin-playwright';

export default [
  // Base TypeScript config from synergy
  ...tsConfig,

  // Add Playwright rules for test files
  {
    files: ['**/*.spec.ts', '**/*.test.ts', '**/*.spec.js', '**/*.test.js'],
    plugins: {
      playwright: playwrightPlugin,
    },
    rules: {
      // Use playwright-test config instead of jest-playwright
      ...playwrightPlugin.configs['playwright-test'].rules,
      'playwright/expect-expect': 'off', // We have custom expect usage
      'playwright/no-skipped-test': ['warn', {
        allowConditional: true,
      }],
    },
  },

  // Override for JavaScript files - disable type-checked rules
  {
    files: ['**/*.js', '**/*.mjs', '**/*.cjs'],
    rules: {
      // Disable type-checked TypeScript rules for JS files
      '@typescript-eslint/await-thenable': 'off',
      '@typescript-eslint/no-floating-promises': 'off',
      '@typescript-eslint/no-misused-promises': 'off',
      '@typescript-eslint/require-await': 'off',
      '@typescript-eslint/unbound-method': 'off',
    },
  },

  // Custom rules for all files
  {
    rules: {
      '@typescript-eslint/await-thenable': 'off',
      'import/no-relative-packages': 'off',
      // Used everywhere in locators
      'no-param-reassign': 'off',
    },
  },

  // Global ignores (equivalent to ignorePatterns)
  {
    ignores: ['*.config.ts', '*.config.js'],
  },
];
