import tsConfig from '@synergy-design-system/eslint-config-syn/ts';
import testsPreset from '@synergy-design-system/eslint-config-syn/presets/tests';

export default [
  // Base TypeScript config from synergy
  ...tsConfig,

  // Playwright test configuration with all test-specific rules
  testsPreset,

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

  // E2E test-specific overrides
  {
    rules: {
      // Allow relative package imports in test demo
      'import/no-relative-packages': 'off',
      // Allow parameter reassignment in test utilities and page objects
      'no-param-reassign': 'off',
    },
  },

  // Global ignores (equivalent to ignorePatterns)
  {
    ignores: ['*.config.ts', '*.config.js'],
  },
];
