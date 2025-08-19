/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { kebabCase } from 'change-case';
import * as tokens from '@synergy-design-system/tokens';

/**
 * Parse size patterns like "2xlarge", "xlarge", "large", etc.
 * @param sizeStr The size string to parse
 * @returns An object containing the base size, whether it's small, and the multiplier
 */
const parseSize = (sizeStr: string): { base: string; isSmall: boolean; multiplier: number } => {
  // Match patterns like "2xlarge", "xlarge", "large", "2xsmall", "xsmall", "small"
  // Also handle dash variants: "2x-large", "x-large", etc.
  const match = sizeStr.match(/^(?:(\d+)x-?)?(?:(x)-?)?(.+)$/);

  if (!match) {
    return {
      base: sizeStr,
      isSmall: false,
      multiplier: 0,
    };
  }

  const [, numPrefix, xPrefix, baseName] = match;

  let multiplier = 0;
  if (numPrefix) {
    multiplier = parseInt(numPrefix, 10);
  } else if (xPrefix) {
    multiplier = 1;
  }

  const isSmall = baseName === 'small';

  return {
    base: baseName,
    isSmall,
    multiplier,
  };
};

/**
 * Get base value for a size category
 */
const getBaseValue = (base: string): number => {
  const baseValues: Record<string, number> = {
    large: 200,
    medium: 100,
    small: 0,
  };
  return baseValues[base] ?? 0;
};

/**
 * Calculate multiplier-based sort value
 * @param multiplier The multiplier extracted from the size
 * @param baseValue The base value for the size category
 * @param isSmall Whether the size is small
 * @returns The calculated sort value
 */
const getMultiplierValue = (multiplier: number, baseValue: number, isSmall: boolean): number => {
  if (isSmall) {
    // For small: x-small = -10, 2x-small = -20, etc.
    return baseValue - (multiplier * 10);
  }
  // For large: x-large = 210, 2x-large = 220, etc.
  return baseValue + (multiplier * 10);
};

/**
 * Handle special cases for size sorting e.g. 'circle', 'pill', 'none', etc.
 * @param size The size string to check
 * @returns Special case value or null if not a special case
 */
// eslint-disable-next-line complexity
const getSpecialCaseValue = (size: string): number | null => {
  switch (size) {
  case 'circle':
    return 1000;
  case 'pill':
    return 1001;
  case 'none':
    return -1000; // none should be first
  case 'mediumlarge':
    return 150; // between medium (100) and large (200)
  default:
    if (size.includes('overflow')) return 1002; // overflow sizes should be at the end
    return null;
  }
};

/**
 * Calculate sort order for a size string
 * @param size The size string to calculate the order for (e.g. 'small', 'xlarge', 'pill', etc.)
 */
const getSortOrder = (size: string): number => {
  // Check for special cases first
  const specialValue = getSpecialCaseValue(size);
  if (specialValue !== null) return specialValue;

  const {
    multiplier,
    base,
    isSmall,
  } = parseSize(size);

  const baseValue = getBaseValue(base);

  // Calculate final sort value
  if (multiplier === 0) {
    // Simple case: small, medium, large
    return baseValue;
  }

  return getMultiplierValue(multiplier, baseValue, isSmall);
};

type TokenKind = 'SynBorderRadius' | 'SynBorderWidth' | 'SynSpacing' | 'SynShadow' | 'SynFontSize';

/**
 * Get the css variable name from a design token
 * @param token The token to get the css name for
 * @returns The css token name
 */
export const getCSSToken = (token: string) => `--${kebabCase(token)}`.replace(/([a-z])([A-Z0-9])/g, '$1-$2');

/**
 * Get the sass variable name from a design token
 * @param token The token to get the css name for
 * @returns The sass token name
 */
export const getSASSToken = (token: string) => `$${token}`;

/**
 * Get the raw value of a style property from an element
 * @param styleProperty The token to get the value from
 * @param element The element to get the value from
 * @returns The found value or false otherwise
 */
export const getRawValueFromStyleProperty = (styleProperty: string, element: HTMLElement) => {
  const rawValue = getComputedStyle(element).getPropertyValue(styleProperty);
  return rawValue ?? 'unknown!';
};

/**
 * Get the raw token value from a design token
 * @param token The token to get the value from
 * @param parentElement The parent element to search from. Will try to get the closest theme
 *  enabled element
 * @returns The found value or false otherwise
 */
export const getRawValueFromToken = (token: string, parentElement?: HTMLElement) => {
  const themeClasses = ['.syn-sick2018-dark', '.syn-sick2018-light', '.syn-sick2025-dark', '.syn-sick2025-light'].join(',');
  const elementWithClass = parentElement ? parentElement.closest(themeClasses) : document.body;
  const finalElement = elementWithClass ?? document.body;

  return getRawValueFromStyleProperty(token, finalElement as HTMLElement);
};

/**
 * Get all tokens from a category as array of key value pairs
 * @param category The category to search for
 * @param useFullTokenName Optionally preserve the token name
 * @returns Returns the complete tokens category
 */
export const getTokensByCategory = (category: string, useFullTokenName = false): [string, string][] => Object.entries(tokens)
  .filter(([token]) => token.toLowerCase().startsWith(`syn${category}`))
  .map(([token, value]) => [
    useFullTokenName ? token : token.toLowerCase().replace('syn', ''),
    value,
  ]);

/**
 * Get the raw value of a css property from an element
 * @param cssProperty The css property to get the value from
 * @param element The element to search from.
 * @returns The found value or false otherwise
 */
export const getRawValueFromCssProperty = (cssProperty: string, element: HTMLElement) => {
  const rawValue = getComputedStyle(element).getPropertyValue(cssProperty);
  return rawValue ?? '';
};

type SortingParameter =
  | { sortType?: 'number'; replaceString: string }
  | { sortType: 'order'; orderArray: string[]; replaceString: string }
  | { sortType: 'size'; extractSizeFor: TokenKind };

/**
 * Handle order-based sorting
 *
 * @param tokenA First token to compare
 * @param tokenB Second token to compare
 * @param orderArray The order array to use for sorting
 * @param replaceString The string to replace in the token name
 */
const sortByOrder = (tokenA: string, tokenB: string, orderArray: string[], replaceString: string): number => {
  const aValue = orderArray.indexOf(tokenA.toLowerCase().replaceAll(replaceString, '').trim());
  const bValue = orderArray.indexOf(tokenB.toLowerCase().replaceAll(replaceString, '').trim());

  if (bValue > aValue) return -1;
  if (bValue < aValue) return 1;
  return 0;
};

/**
 * Handle number-based sorting
 * @param tokenA First token to compare
 * @param tokenB Second token to compare
 * @param replaceString The string to replace in the token name
 * @returns Sort comparison result
 */
const sortByNumber = (tokenA: string, tokenB: string, replaceString: string): number => {
  const aValue = parseInt(tokenA.toLowerCase().replaceAll(replaceString, '').trim(), 10);
  const bValue = parseInt(tokenB.toLowerCase().replaceAll(replaceString, '').trim(), 10);

  if (bValue > aValue) return -1;
  if (bValue < aValue) return 1;
  return 0;
};

/**
 * This function sorts tokens based on their size, using a custom logic that handles
 * different size patterns and returns a numeric value for sorting.
 * It extracts the size from the token names, determines their order based on predefined
 * rules, and returns a comparison value that can be used in sorting algorithms.
 *
 * @param tokenA First token to compare
 * @param tokenB Second token to compare
 * @param tokenKind The kind of token to sort
 * @returns Sort comparison result
 */
const sortbySize = (tokenA: string, tokenB: string, tokenKind: TokenKind): number => {
  // Extract the size part from token names (e.g. remove 'SynBorderRadius' prefix)
  const getSizeName = (name: string) => name.replace(new RegExp(`^${tokenKind}`, 'i'), '').toLowerCase().trim();

  const aSize = getSizeName(tokenA);
  const bSize = getSizeName(tokenB);

  const aOrder = getSortOrder(aSize);
  const bOrder = getSortOrder(bSize);

  return aOrder - bOrder;
};

/**
 * Sort tokens depending on sort mechanism
 * @param tokenA TokenA which should be sorted
 * @param tokenB TokenB which should be sorted
 * @param sortingParameters parameters for sorting
 * @returns
 */
export const sortTokens = (tokenA: [string, string], tokenB: [string, string], sortingParameters: SortingParameter): number => {
  const [aName] = tokenA;
  const [bName] = tokenB;
  // Handle size sorting
  if (sortingParameters.sortType === 'size') {
    return sortbySize(aName, bName, sortingParameters.extractSizeFor);
  }

  // Handle order sorting
  if (sortingParameters.sortType === 'order') {
    const { orderArray = [], replaceString = '' } = sortingParameters;
    return sortByOrder(aName, bName, orderArray, replaceString);
  }

  // Handle number sorting (default)
  const { replaceString = '' } = sortingParameters;
  return sortByNumber(aName, bName, replaceString);
};
