/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */

/**
 * Removes the unwanted "dropShadow" prefix from the shadow value.
 * @type import('style-dictionary/types').ValueTransform addFallbackFonts
 */
export const adjustShadow = {
  filter: token => token.type === 'shadow',
  name: 'syn/adjust-shadow',
  /**
   * @returns {string}
   */
  transform: token => token.value.replaceAll('dropShadow ', ''),
  transitive: true,
  type: 'value',
};
