// @ts-ignore-next-line
import variablesJson from '../../src/figma-variables/tokens.json' with { type: 'json' };

/**
 * The fetching result of the Figma API for local variables.
 */
export const figmaVariables = variablesJson;

/**
 * Prefixes we use in figma for grouping variables
 */
const TOKENS_PREFIXES = ['primitive', 'component', 'semantic'];

/**
 * Renames a variable by removing the prefix or in case of type color with "primitive" prefix exchange it by "color"
 * E.g. instead of "primitive/spacing/4x-small" it becomes "spacing/4x-small"
 * @example renameVariable("primitive/spacing/4x-small", "spacing") // "spacing/4x-small"
 * @example renameVariable("primitive/primary/500", "color") // "color/primary/500"
 * @param {string} name Name of the variable
 * @param {string} type type of the variable
 * @returns {string} The renamed variable
 */
export const renameVariable = (name, type) => {
  if (name.startsWith('primitive/') && type === 'color') {
    const primitivePattern = new RegExp('^(primitive)');
    return name.replace(primitivePattern, 'color');
  }
  const prefixPattern = new RegExp(`^(${TOKENS_PREFIXES.join('/|')}/)`);
  return name.replace(prefixPattern, '');
};

/**
 * Resolves a variable alias by its ID.
 * @param {string} id The ID of the variable
 * @returns {{ value: string, type: string } | null} The resolved value and type of the variable, or null if not found.
 */
export const resolveAlias = (id) => {
  const aliasVar = Object.values(figmaVariables.variables).find(v => v.id === id);
  if (!aliasVar) return null;
  const aliasName = aliasVar.name.toLowerCase();

  const aliasType = aliasVar.resolvedType === 'FLOAT'
    ? getTypeForFloatVariable(aliasName)
    : aliasVar.resolvedType.toLowerCase();

  const renamedAlias = renameVariable(aliasName, aliasType);
  // The syntax for separators in style dictionary is ".", so all "/" are replaced with "."
  const replacedSeparator = renamedAlias.replaceAll('/', '.');

  return { value: `{${replacedSeparator}}`, type: aliasType };
};

/**
 * If the variable is from type FLOAT there are more specific types, which it needs to be mapped to.
 * This function returns the specific type for the float variable based on its name.
 *
 * @param { string } name The name of a variable
 * @returns { string } The specific type for the float variable
 */
export const getTypeForFloatVariable = (name) => {
  if (name.includes('opacity')) {
    return 'opacity';
  }
  if (name.includes('weight')) {
    return 'fontWeights';
  }
  if (name.includes('z-index')) {
    return 'number';
  }
  if (name.includes('line-height')) {
    return 'lineHeights';
  }
  if (name.includes('letter-spacing')) {
    return 'letterSpacing';
  }
  return 'sizing';
};

const OLD_BRAND_VARIABLES_REGEX = [
  // maybe the regexes need to be updated and be more specific, when the figma tokens evolve
  // figma variables
  /^component\/button\/font-size/,
  /^component\/(?:toggle|tooltip|panel|link|input)/,
  /^primitive\/(?:primary|neutral|error|warning|success|accent|border-radius|border-width|dimension|duration|font-weight|opacity|text-decoration|transition|z-index|font)\//,
  /^primitive\/letter-spacing\/(?:dense|denser|normal|loose|looser)$/,
  /^primitive\/line-height\/[^\d]/,
  /^primitive\/font-size\/(?:2x-large|2x-small|3x-large|4x-large|large|medium|small|x-large|x-small)$/,
  /^primitive\/spacing\/(?:2x-large|2x-small|3x-large|3x-small|4x-large|4x-small|5x-large|large|medium|medium-large|small|x-large|x-small)$/,
  /^semantic\/(?:focus-ring|overlay|typography)/,

  // figma styles
  /^body\/(x-small|small|medium|large)\/(regular|semibold|bold)/,
  /^heading\/(?:large|x-large|2x-large|3x-large)/,
  /^shadow\//,
];

/**
 * Filter out variables and styles that are only used for the new brand.
 *
 * @param {string} name The name of the variable / style
 * @returns true if it is only available in the new brand, false otherwise.
 */
export const isNewBrandOnlyVariableOrStyle = (name) => !OLD_BRAND_VARIABLES_REGEX.some(regex => regex.test(name));
