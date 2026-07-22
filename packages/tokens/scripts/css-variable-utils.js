import { pascalCase, split } from 'change-case';
import { joinConsecutiveNumbers } from './helpers.js';

const CSS_VARIABLE_PATTERN = /(--syn-[^:]+):\s*([^;]+);/g;

/**
 * @param {string} cssVariable
 * @returns {string}
 */
export const cssVariableToTokenName = (cssVariable) => pascalCase(cssVariable.replace('--', ''), {
  mergeAmbiguousCharacters: true,
  split: (value) => joinConsecutiveNumbers(split(value)),
});

/**
 * @param {string} contents
 * @returns {{ property: string, value: string }[]}
 */
export const parseCssVariableEntries = (contents) => Array.from(
  contents.matchAll(CSS_VARIABLE_PATTERN),
  match => ({ property: match[1], value: match[2].trim() }),
);

/**
 * @param {string} contents
 * @returns {Record<string, string>}
 */
export const parseCssVariableMap = (contents) => Object.fromEntries(
  parseCssVariableEntries(contents).map(({ property, value }) => [property, value]),
);

/**
 * @param {string} contents
 * @returns {string[]}
 */
export const parseCssVariableNames = (contents) => parseCssVariableEntries(contents)
  .map(({ property }) => property);
