/**
 * @typedef { typeof figmaVariables.variables[keyof typeof figmaVariables.variables]} Variable
 * @typedef { typeof figmaVariables.variableCollections[keyof typeof figmaVariables.variableCollections] } VariableCollection
 * @typedef { VariableCollection['modes'] } Modes
 * @typedef {import('@figma/rest-api-spec').GetLocalVariablesResponse['meta']} VariablesAndCollections
 * @typedef {import('@figma/rest-api-spec').RGBA | import('@figma/rest-api-spec').RGB} Color
 */
import path from 'path';
import { writeFileSync } from 'fs';
import { sort } from '@tamtamchik/json-deep-sort';
import { setNestedProperty } from '../helpers.js';
import {
  createDirectory, figmaVariables, formatColor, getAliasValue,
  getTypeForFloatVariable, isNewBrandOnlyVariableOrStyle,
  renameVariable, resolveAlias,
} from './helpers.js';
import { COLOR_PALETTE_PREFIX, OUTPUT_DIR } from '../config.js';

/**
 * Check if the alias value should be used.
 * @param {string} name The name of the variable
 * @returns {boolean} True if the alias value should be used, false otherwise.
 */
const shouldUseAliasValue = (name) => {
  const NO_ALIAS_VALUE_REGEX = new RegExp(
    // Replace the _color-palette alias with the real values, as they should not show up in the json
    `^{(?:${COLOR_PALETTE_PREFIX}`
    // TODO: Replace the letter-spacing/default ( for value of input/letter-spacing), the letter-spacing/positive-2 (for value of letter-spacing/looser)
    // and line-height aliases with the real values. They are currently only available for the new brand
    + '|letter-spacing.default|letter-spacing.positive-2|line-height'
    // as we may rename the primitive/muted palette, we will print the real values here, so they are not getting published officially
    + '|color.muted)',
  );
  return !NO_ALIAS_VALUE_REGEX.test(name);
};

/**
 * Get the correct value and type of a float variable for Style Dictionary.
 * @param { string } name The name of the variable
 * @param { number } value The value of the variable
 * @returns {{ value: string, type: string }} The resolved value and type of the variable.
 */
// eslint-disable-next-line complexity
const getFloatValueFromName = (name, value) => {
  const stringValue = `${value}`;
  const valueWithUnit = (/** @type string */ unit) => `${stringValue.replace('NaN', '0')}${unit}`;

  const type = getTypeForFloatVariable(name);

  let newValue;

  if (name.includes('opacity') || name.includes('line-height')) {
    newValue = valueWithUnit('%');
  } else if (name.includes('weight') || name.includes('z-index')) {
    newValue = stringValue;
  } else if (name.includes('letter-spacing')) {
    // Fix value to be only two decimals after the point, e.g. -0.48 instead of -0.47999998927116394
    // This is needed as Figma returns letter spacing values with many unnecessary decimals
    const roundedValue = parseFloat(value.toFixed(2));
    newValue = `${roundedValue}px`;
  } else {
    newValue = valueWithUnit('px');
  }

  return {
    type,
    value: newValue,
  };
};

/**
 * Get the value and type of a variable in a specific mode.
 * @param {Variable} variable
 * @param {string} modeId
 * @returns {{ value: string, type: string } | undefined} The resolved value and type of the variable, if it could not be resolved, returns undefined.
 */
// eslint-disable-next-line complexity
const resolveValue = (variable, modeId) => {
  const {
    name, valuesByMode, resolvedType, scopes = [],
  } = variable;
  const cleanName = name.toLowerCase();

  // Access valuesByMode with proper type handling
  const modeValuesMap = /** @type {Record<string, any>} */ (valuesByMode);
  let modeValue = modeValuesMap?.[modeId];
  let finalValue;
  let type;

  if (typeof modeValue === 'object' && 'type' in modeValue && modeValue.type === 'VARIABLE_ALIAS') {
    const aliasObject = /** @type {{ id: string; type: string }} */ (modeValue);
    const resolved = resolveAlias(aliasObject.id);
    if (!resolved) {
      console.log(`Not able to resolve css variable ${name} in mode ${modeId}`);
      return undefined;
    }

    const useAliasValue = shouldUseAliasValue(resolved.value);

    if (useAliasValue) {
      return {
        type: resolved.type,
        value: resolved.value,
      };
    }

    modeValue = getAliasValue(aliasObject.id, modeId);
  }

  if (resolvedType === 'FLOAT') {
    /** @type { number } FLOAT types have a number as value */
    const numberValue = modeValue;
    const floatValue = getFloatValueFromName(cleanName, numberValue);
    finalValue = floatValue.value;
    type = floatValue.type;
  } else if (resolvedType === 'COLOR') {
    /** @type { Color } COLOR types have an object with rgba as value */
    const colorValue = modeValue;
    finalValue = formatColor(colorValue);
    type = 'color';
  } else if (scopes.includes('FONT_FAMILY')) {
    // Add type to fonts
    finalValue = modeValue;
    type = 'fontFamilies';
  } else if (scopes.includes('TEXT_CONTENT')) {
    finalValue = modeValue;
    type = 'content';
  } else {
    // For all other variables, just return the value as is
    finalValue = modeValue;
    type = resolvedType.toLowerCase();
  }

  if (typeof finalValue === 'object') {
    throw new Error(
      `Expected a string for variable ${name}, but got an object: `
      + `${JSON.stringify(modeValue)}`,
    );
  }

  return {
    type,
    value: typeof finalValue === 'string' ? finalValue : String(finalValue),
  };
};

// --- Main Transformation ---
const transformFigmaVariables = () => {
  /** @type {Record <string, any>} */
  const transformed = {};

  Object.values(figmaVariables.variables).forEach(variable => {
    const { name, variableCollectionId } = variable;

    // TODO: currently we do not want to export the new brand variables,
    //  but just get the old state with figma api fetching. This can be removed when the new brand variables are ready to be exported.
    if (isNewBrandOnlyVariableOrStyle(name)) {
      return;
    }

    const collection = Object.values(figmaVariables.variableCollections)
      .find(c => c.id === variableCollectionId && c.name === 'Synergy Themes');

    // If the collection is not found, because it is not available or not from "Synergy Themes" collection, skip the variable
    if (!collection) {
      return;
    }

    // The _color-palette tokens should not appear in the generated json file
    if (name.startsWith(COLOR_PALETTE_PREFIX)) {
      return;
    }

    Object.values(collection.modes).forEach(mode => {
      const { modeId, name: modeName } = mode;

      if (!transformed[modeName]) transformed[modeName] = {};

      const variableValue = resolveValue(variable, modeId);

      if (!variableValue) {
        return;
      }

      const { value, type } = variableValue;

      const cleanName = name.toLowerCase();
      const renamedToken = renameVariable(cleanName, type);
      const keys = renamedToken.split('/');

      const description = variable.description || undefined;

      setNestedProperty(transformed[modeName], keys, { description, type, value });
    });
  });

  Object.entries(transformed).forEach(([modeName, modeData]) => {
    const sanitizedModeName = modeName.toLowerCase().replace(/\s+/g, '-');
    const outputPath = path.join(OUTPUT_DIR, `${sanitizedModeName}.json`);
    createDirectory(OUTPUT_DIR);
    writeFileSync(outputPath, JSON.stringify(sort(modeData), null, 2));
  });
};

transformFigmaVariables();
