import { pascalCase, split } from 'change-case';
import { joinConsecutiveNumbers } from './helpers.js';

const CSS_VARIABLE_PATTERN = /(--syn-[^:]+):\s*([^;]+);/g;

/**
 * Converts a CSS custom property name into the PascalCase token name
 * used by the generated JavaScript outputs.
 *
 * Example: `--syn-color-primary-500` becomes `SynColorPrimary500`.
 *
 * @param {string} cssVariable
 * @returns {string}
 */
export const cssVariableToTokenName = (cssVariable) => pascalCase(cssVariable.replace('--', ''), {
  mergeAmbiguousCharacters: true,
  split: (value) => joinConsecutiveNumbers(split(value)),
});

/**
 * Extracts all CSS custom property declarations from a CSS source string.
 *
 * Each match returns the variable name as `property` and its raw CSS value as
 * `value`, trimmed from surrounding whitespace.
 *
 * @param {string} contents
 * @returns {{ property: string, value: string }[]}
 */
export const parseCssVariableEntries = (contents) => Array.from(
  contents.matchAll(CSS_VARIABLE_PATTERN),
  match => ({ property: match[1], value: match[2].trim() }),
);

/**
 * Parses CSS custom property declarations into an object map keyed by
 * the CSS variable name.
 *
 * @param {string} contents
 * @returns {Record<string, string>}
 */
export const parseCssVariableMap = (contents) => Object.fromEntries(
  parseCssVariableEntries(contents).map(({ property, value }) => [property, value]),
);

/**
 * Returns the names of all CSS custom properties found in a CSS
 * source string.
 *
 * @param {string} contents
 * @returns {string[]}
 */
export const parseCssVariableNames = (contents) => parseCssVariableEntries(contents)
  .map(({ property }) => property);
