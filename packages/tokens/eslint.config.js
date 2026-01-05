import { createCustomConfig } from '@synergy-design-system/eslint-config-syn/ts';
import scriptsPreset from '@synergy-design-system/eslint-config-syn/presets/scripts';

export default [
  ...createCustomConfig({
    project: './tsconfig.lint.json',
  }),
  // Scripts need additional permissions for build tooling
  scriptsPreset,
  {
    files: ['scripts/**/*.js'],
    rules: {
      // Allow parameter reassignment in scripts for utility functions
      'no-param-reassign': 'off',
    },
  },
];
