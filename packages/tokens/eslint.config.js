import { createCustomConfig } from '@synergy-design-system/eslint-config-syn/ts';
import scriptsPreset from '@synergy-design-system/eslint-config-syn/presets/scripts';

export default [
  ...createCustomConfig({
    project: './tsconfig.lint.json',
    tsconfigRootDir: import.meta.dirname,
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
  {
    files: ['dist/js/**/*.{js,ts}', 'dist/charts/js/**/*.{js,ts}'],
    rules: {
      // Allow underscores before a number in the middle of variable names, as two consecutive numbers are separated by an underscore (e.g. SynSpacing1_5xLarge)
      camelcase: ['error', {
        allow: ['^[A-Za-z][A-Za-z0-9]*(?:_[0-9]+[A-Za-z0-9]*)+$'],
      }],
    },
  },
];
