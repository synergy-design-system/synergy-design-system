/**
 * ESLint preset for stricter complexity rules
 *
 * This preset is already applied in the base config (js.js) but can be
 * used to override if different complexity requirements are needed.
 *
 * Note: The base config already sets complexity to 10 and max-len to 150.
 * Only use this preset if you need to further customize these values.
 *
 * @example
 * import complexityPreset from '@synergy-design-system/eslint-config-syn/presets/complexity';
 *
 * export default [
 *   ...baseConfig,
 *   {
 *     ...complexityPreset,
 *     rules: {
 *       ...complexityPreset.rules,
 *       complexity: ['error', { max: 15 }], // Override if needed
 *     },
 *   },
 * ];
 */
export default {
  rules: {
    // Limit cyclomatic complexity to maintain code quality
    complexity: ['error', { max: 10 }],

    // Enforce reasonable line length
    'max-len': ['error', {
      code: 150,
      ignoreComments: true,
      ignoreTemplateLiterals: true,
    }],
  },
};
