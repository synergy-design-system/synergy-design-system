/**
 * ESLint preset for build scripts and utility scripts
 *
 * Use this preset for JavaScript files in scripts/, build/, or similar directories
 * that need relaxed rules for development and build tooling.
 *
 * @example
 * import scriptsPreset from '@synergy-design-system/eslint-config-syn/presets/scripts';
 *
 * export default [
 *   ...baseConfig,
 *   scriptsPreset,
 * ];
 */
export default {
  files: ['scripts/**/*.js', 'build/**/*.js'],
  rules: {
    // Allow devDependencies to be imported in scripts
    'import/no-extraneous-dependencies': 'off',
    // Console logging is acceptable in build scripts
    'no-console': 'off',
  },
};
