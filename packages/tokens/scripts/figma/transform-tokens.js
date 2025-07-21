/**
 * @typedef { typeof figmaVariables.variables[keyof typeof figmaVariables.variables]} Variable
 * @typedef { keyof Variable['valuesByMode'] } ModeId
 * @typedef { typeof figmaVariables.variableCollections[keyof typeof figmaVariables.variableCollections] } VariableCollection
 * @typedef { VariableCollection['modes'] } Modes
 * @typedef {import('@figma/rest-api-spec').GetLocalVariablesResponse['meta']} VariablesAndCollections
 */
import path from 'path';
import { promises as fs } from 'fs';
import { sort } from '@tamtamchik/json-deep-sort';
import { setNestedProperty } from '../helpers.js';
import {
  figmaVariables, getTypeForFloatVariable, isNewBrandOnlyVariableOrStyle,
  renameVariable, resolveAlias,
} from './helpers.js';

const OUTPUT_DIR = './src/figma-variables/output';
const COLOR_PALETTE_PREFIX = '_color-palette';

/**
 * Create a directory if it does not exist.
 * @param { string } dirPath the directory path
 */
const createDirectory = async (dirPath) => {
  await fs.mkdir(dirPath, { recursive: true });
};

/**
 * Formats a color object into a CSS-compatible color string.
 * formatColor({ r: 0.5, g: 0.5, b: 0.5, a: 0.8 }) // "rgba(128, 128, 128, 0.80)"
 * formatColor({ r: 0.5, g: 0.5, b: 0.5 }) // "#808080"
 * @param {{r: number, g: number, b: number, a?: number}} color Color object with r, g, b, and optional a properties.
 * @returns {string} The formatted color string.
 */
const formatColor = ({
  r, g, b, a,
}) => {
  const red = Math.round(r * 255);
  const green = Math.round(g * 255);
  const blue = Math.round(b * 255);

  if (a !== undefined && a < 1) {
    return `rgba(${red}, ${green}, ${blue}, ${a.toFixed(2)})`;
  }

  // eslint-disable-next-line no-bitwise
  return `#${((1 << 24) + (red << 16) + (green << 8) + blue).toString(16).slice(1)}`;
};

/**
 * Gets the value of an alias variable in a specific mode.
 * @param { string } aliasId Id of the alias variable
 * @param { ModeId } modeId Id of the mode
 * @returns {any | undefined} The value of the alias variable, or undefined if not found.
 */
const getAliasValue = (aliasId, modeId) => {
  const aliasVar = Object.values(figmaVariables.variables).find(v => v.id === aliasId);
  const modeValue = aliasVar?.valuesByMode?.[modeId];
  return modeValue;
};

/**
 * Check if the alias value should be used.
 * @param {string} name The name of the variable
 * @returns {boolean} True if the alias value should be used, false otherwise.
 */
const shouldUseAliasValue = (name) => {
  // Exchange the _color-palette alias with the real values, as they should not show up in the json
  // TODO: Exchange the letter-spacing and line-height aliases with the real values. They are currently only available for the new brand
  const NO_ALIAS_VALUE_REGEX = new RegExp(
    `^{(?:${COLOR_PALETTE_PREFIX}|letter-spacing|line-height)`,
  );
  return !NO_ALIAS_VALUE_REGEX.test(name);
};

/**
 * Get the correct value and type of a float variable for Style Dictionary.
 * @param { string } name The name of the variable
 * @param { number } value The value of the variable
 * @returns {{ value: string, type: string }} The resolved value and type of the variable.
 */
const getFloatValueFromName = (name, value) => {
  const stringValue = `${value}`;
  const valueWithUnit = (/** @type string */ unit) => `${stringValue.replace('NaN', '0')}${unit}`;

  const type = getTypeForFloatVariable(name);

  let newValue;

  if (name.includes('opacity') || name.includes('line-height')) {
    newValue = valueWithUnit('%');
  } else if (name.includes('weight') || name.includes('z-index')) {
    newValue = stringValue;
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
 * @param {ModeId} modeId
 * @returns {{ value: string, type: string } | undefined} The resolved value and type of the variable, if it could not be resolved, returns undefined.
 */
// eslint-disable-next-line complexity
const resolveValue = (variable, modeId) => {
  const {
    name, valuesByMode, resolvedType, scopes = [],
  } = variable;
  const cleanName = name.toLowerCase();
  let modeValue = valuesByMode?.[modeId];
  let finalValue;
  let type;

  if (typeof modeValue === 'object' && 'type' in modeValue && modeValue.type === 'VARIABLE_ALIAS') {
    const resolved = resolveAlias(modeValue.id);
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

    modeValue = getAliasValue(modeValue.id, modeId);
  }

  if (resolvedType === 'FLOAT') {
    if (typeof modeValue === 'object') {
      throw new Error(
        `Expected a number or string for FLOAT variable ${name}, but got an object: `
        + `${JSON.stringify(modeValue)}`,
      );
    }
    const numberValue = typeof modeValue === 'number' ? modeValue : parseFloat(modeValue);
    const floatValue = getFloatValueFromName(cleanName, numberValue);
    finalValue = floatValue.value;
    type = floatValue.type;
  } else if (modeValue && typeof modeValue === 'object' && 'r' in modeValue) {
    finalValue = formatColor(modeValue);
    type = 'color';
  } else if (scopes.includes('FONT_FAMILY')) {
    // Add type to fonts
    finalValue = modeValue;
    type = 'fontFamilies';
  } else if (scopes.includes('TEXT_CONTENT')) {
    // Add type to text content like "*"
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
const transformFigmaVariables = async () => {
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
      .find(c => c.id === variableCollectionId);

    if (!collection) {
      console.warn(
        `Variable collection with id ${variableCollectionId} not found for variable `
        + `${name}`,
      );
      return;
    }

    // The _color-palette tokens should not appear in the generated json file
    if (name.startsWith(COLOR_PALETTE_PREFIX)) {
      return;
    }

    Object.values(collection.modes).forEach(mode => {
      const { modeId, name: modeName } = mode;
      // Skip the sick2025 modes, as we currently don't want it
      if (modeName.startsWith('sick2025')) {
        return;
      }

      if (!transformed[modeName]) transformed[modeName] = {};

      const variableValue = resolveValue(variable, /** @type {ModeId} */ (modeId));

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

  await Promise.all(
    Object.entries(transformed).map(async ([modeName, modeData]) => {
      const sanitizedModeName = modeName.toLowerCase().replace(/\s+/g, '-');
      const outputPath = path.join(OUTPUT_DIR, `${sanitizedModeName}.json`);
      await createDirectory(OUTPUT_DIR);
      await fs.writeFile(outputPath, JSON.stringify(sort(modeData), null, 2));
    }),
  );
};

transformFigmaVariables().catch(error => {
  console.error('Error transforming Figma variables:', error);
});
