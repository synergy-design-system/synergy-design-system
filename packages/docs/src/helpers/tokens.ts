/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { kebabCase } from 'change-case';
import * as tokens from '@synergy-design-system/tokens';

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
  const elementWithClass = parentElement ? parentElement.closest('.syn-theme-dark,.syn-theme-light') : document.body;
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

type SortingParameter = {
  orderArray?: string[],
  replaceString?: string,
  sortType?: 'number' | 'order'
};

/**
 * Sort tokens depending on sort mechanism
 * @param tokenA TokenA which should be sorted
 * @param tokenB TokenB which should be sorted
 * @param sortingParameters parameters for sorting
 * @returns
 */
export const sortTokens = (tokenA: [string, string], tokenB: [string, string], sortingParameters: SortingParameter): number => {
  const { replaceString = '', orderArray = [], sortType = 'number' } = sortingParameters;
  const [aName] = tokenA;
  const [bName] = tokenB;

  let aValue = 0;
  let bValue = 0;
  if (sortType === 'number') {
    aValue = parseInt(aName.toLowerCase().replaceAll(replaceString, '').trim(), 10);
    bValue = parseInt(bName.toLowerCase().replaceAll(replaceString, '').trim(), 10);
  } else {
    aValue = orderArray.indexOf(aName.toLowerCase().replaceAll(replaceString, '').trim());
    bValue = orderArray.indexOf(bName.toLowerCase().replaceAll(replaceString, '').trim());
  }

  if (bValue > aValue) return -1;
  if (bValue < aValue) return 1;
  return 0;
};
