/**
 * Creates a deprecation message for a given synergy version
 * @param {string} version The Synergy Version the attribute will be deprecated in
 * @param {string} reason [optional]
 * @returns {string} The final deprecation message
 */
export const willDeprecateInRelease = (version, reason = '') => `
  This attribute is deprecated and will be removed in Synergy version ${version}!
  ${reason}
`.trim();

/**
 * Creates a deprecation message for a given synergy version
 * @param {string} version The Synergy Version the attribute was deprecated in
 * @param {string} reason [optional]
 * @returns {string} The final deprecation message
 */
export const deprecatedForRelease = (version, reason = '') => `
This attribute was deprecated in Synergy version ${version}!
${reason}
Further information can be found at https://github.com/synergy-design-system/synergy-design-system/blob/main/packages/components/BREAKING_CHANGES.md#version-${version.replaceAll('.', '')} for further information.
`.trim();

// Utility classes for deprecation.
// Please add one deprecation warning per major version.
// Also note that you have to return a function that calls
// deprecateIn, otherwise the message will not be displayed.
export const deprecatedForV2 = (reason = '') => () => deprecatedForRelease('2.0', reason);
