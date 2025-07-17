// @ts-ignore-next-line
import variablesJson from '../../src/figma-variables/tokensApi.json' with { type: 'json' };

/**
 * The fetching result of the Figma API for local variables.
 * 
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
  if(name.startsWith('primitive/') && type === "color") {
    const primitivePattern = new RegExp(`^(primitive)`);
    return name.replace(primitivePattern, 'color');
  }
  const prefixPattern = new RegExp(`^(${TOKENS_PREFIXES.join('/|')}/)`);
  return name.replace(prefixPattern, '');
}

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
  ? 'sizing'
  : aliasVar.resolvedType.toLowerCase();

  const renamedAlias = renameVariable(aliasName, aliasType);
  // The syntax for separators in style dictionary is ".", so all "/" are replaced with "."
  const replacedSeparator = renamedAlias.replaceAll('/', '.');

  return { value: `{${replacedSeparator}}`, type: aliasType };
};



const BRAND_ONLY_VARIABLES_REGEX = [
  // figma variables
  /^primitive\/info/,
  /^primitive\/font-size\/(?:0x|1_5x|1x|2_5x|medium)-large/,
  /^primitive\/letter-spacing\/(?:negative-05|default|positive-05|positive-2|positive-5)/,
  /^primitive\/line-height\/\d+?/,
  /^primitive\/text-transform\/(?:default|uppercase)/,
  /^primitive\/spacing\/(?:1_5x|3_5x)-large/,

  // figma styles
  /^body\/2x-small\//,
  /^heading\/(?:medium|4x-large)/,
];

/**
 * Filter out variables and styles that are only used for the new brand.
 * 
 * @param {string} name The name of the variable / style 
 * @returns true if it is only available in the new brand, false otherwise.
 */
export const isNewBrandOnlyVariableOrStyle = (name) => {
  return BRAND_ONLY_VARIABLES_REGEX.some(regex => regex.test(name));
};
