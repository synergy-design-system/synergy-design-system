import playwrightPlugin from 'eslint-plugin-playwright';

/**
 * ESLint preset for Playwright test files
 *
 * Configures rules for Playwright test files, including the Playwright plugin
 * and relaxed TypeScript rules commonly needed in test contexts.
 *
 * Note: Requires eslint-plugin-playwright as a peer dependency
 *
 * @example
 * import testsPreset from '@synergy-design-system/eslint-config-syn/presets/tests';
 *
 * export default [
 *   ...baseConfig,
 *   testsPreset,
 * ];
 */
export default {
  files: ['**/*.spec.ts', '**/*.test.ts', '**/*.spec.js', '**/*.test.js'],
  plugins: {
    playwright: playwrightPlugin,
  },
  rules: {
    // Apply Playwright recommended rules
    ...playwrightPlugin.configs['playwright-test'].rules,

    // Relaxed rules for test files
    '@typescript-eslint/await-thenable': 'off', // Tests often have complex async patterns
    '@typescript-eslint/no-unused-expressions': 'off', // Chai-style assertions use expressions
    'import/no-extraneous-dependencies': 'off', // Test files can import devDependencies
    'no-param-reassign': 'off', // Locators and test utilities often reassign params

    // Playwright-specific overrides
    'playwright/expect-expect': 'off', // Allow custom expect usage patterns
    'playwright/no-skipped-test': ['warn', {
      allowConditional: true, // Allow conditional test.skip()
    }],
    'playwright/valid-expect': 'off', // Disabled due to bug in playwright plugin v2.4.0
  },
};
