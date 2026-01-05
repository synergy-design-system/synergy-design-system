import { createCustomConfig } from '@synergy-design-system/eslint-config-syn/ts';
import testsPreset from '@synergy-design-system/eslint-config-syn/presets/tests';
import wc from 'eslint-plugin-wc';
import lit from 'eslint-plugin-lit';
import litA11y from 'eslint-plugin-lit-a11y';

export default [
  {
    ignores: ['dist/', 'dist/**/*', 'code-connect/icons/**/*'],
  },
  ...createCustomConfig({
    project: './tsconfig.lint.json',
  }),
  // Web Components and Lit-specific rules
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
  // Playwright test configuration (includes all test-specific rules)
  testsPreset,
  // Disable unused directive reporting for this package
  {
    linterOptions: {
      reportUnusedDisableDirectives: 'off',
    },
    rules: {
      'no-unused-disable-directive': 'off',
    },
  },
];
