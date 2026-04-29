/**
 * @description Transforms fetched Figma variable JSON into Style-Dictionary-compatible token files.
 *
 * This module exports {@link transformFigmaVariables}, a reusable function that
 * converts a Figma variables JSON (as returned by the Figma REST API) into one
 * JSON file per mode (theme), written to a given output directory. All
 * configuration (input data, collection name, output directory) is accepted as
 * parameters so the same logic can be reused for different Figma files or
 * collections (e.g., component tokens and charting tokens).
 *
 * @typedef { import('@figma/rest-api-spec').GetLocalVariablesResponse['meta'] } VariablesAndCollections
 * @typedef { VariablesAndCollections['variables'][string] } Variable
 * @typedef { import('@figma/rest-api-spec').RGBA | import('@figma/rest-api-spec').RGB } Color
 */

import path from 'node:path';
import { writeFileSync } from 'node:fs';
import { sort } from '@tamtamchik/json-deep-sort';
import { setNestedProperty } from '../helpers.js';
import {
  createDirectory,
  formatColor,
  getTypeForFloatVariable,
  isDesignOnlyVariableOrStyle,
  renameVariable,
} from './helpers.js';
import componentsVariables from '../../src/figma-variables/variableTokens.json' with { type: 'json' };

/**
 * Extracts the Figma key from a key-based variable ID used in cross-collection
 * references. Cross-collection aliases use the format
 * `VariableID:<key>/<nodeId>` instead of the regular `VariableID:<nodeId>`.
 *
 * @param {string} id
 * @returns {string | null} The 40-character hex key, or `null` if not key-based.
 */
const extractKeyFromVariableId = (id) => {
  const match = id.match(/^VariableID:([0-9a-f]{40})\//i);
  return match ? match[1] : null;
};

/**
 * Finds a variable by ID within the current file's variables dataset.
 * Falls back to the bundled component variables (`variableTokens.json`) for
 * cross-file alias resolution (first by ID, then by Figma key).
 *
 * @param {VariablesAndCollections} variablesData
 * @param {string} id
 * @returns {Variable | undefined}
 */
const findVariableById = (variablesData, id) => {
  const { variables } = variablesData;
  const found = Object.values(variables).find(v => v.id === id);
  if (found) return found;

  const key = extractKeyFromVariableId(id);
  const fromComponents = Object.values(componentsVariables.variables).find(
    v => v.id === id || (key && v.key === key),
  );

  if (fromComponents) {
    return /** @type {Variable} */ (/** @type {unknown} */ (fromComponents));
  }

  return undefined;
};

/**
 * Maps a mode ID from the source variable collection to the corresponding mode
 * ID in the target variable's collection by matching mode names
 * (e.g. "sick2025-light", "sick2025-dark").
 *
 * This is necessary when charting tokens reference variables from a different
 * Figma file whose mode IDs differ.
 *
 * @param {VariablesAndCollections} variablesData - The variables data that owns the *source* mode.
 * @param {string} sourceModeId - The mode ID used in the source file.
 * @param {string} targetVariableCollectionId - The collection ID of the target variable.
 * @returns {string | undefined} The matching mode ID in the target collection, or `undefined`.
 */
const mapModeId = (variablesData, sourceModeId, targetVariableCollectionId) => {
  const { variableCollections } = variablesData;

  const sourceModes = Object.values(variableCollections).flatMap(c => c.modes);
  const sourceMode = sourceModes.find(m => m.modeId === sourceModeId);
  if (!sourceMode) return undefined;

  const targetCollection = Object.values(componentsVariables.variableCollections)
    .find(c => c.id === targetVariableCollectionId);
  if (!targetCollection) return undefined;

  const targetMode = targetCollection.modes.find(
    m => m.name.toLocaleLowerCase() === sourceMode.name.toLocaleLowerCase(),
  );
  return targetMode?.modeId;
};

/**
 * Recursively follows a variable alias chain until a concrete (non-alias)
 * value is found for the given mode.
 *
 * Used as a last resort when an alias cannot be expressed as a Style-Dictionary
 * reference, e.g. because it ultimately points to an internal palette variable
 * with no public SD token path.
 *
 * @param {VariablesAndCollections} variablesData
 * @param {string} aliasId - The ID of the alias variable to start from.
 * @param {string} modeId - The mode (theme) for which to resolve the value.
 * @returns {unknown | undefined} The concrete value (e.g. a hex string or number), or `undefined` if unresolvable.
 */
// eslint-disable-next-line complexity
const resolveAliasToConcreteValue = (variablesData, aliasId, modeId) => {
  const aliasVar = findVariableById(variablesData, aliasId);

  /** @type {Record<string, unknown> | undefined} */
  const valuesByMode = aliasVar?.valuesByMode;
  /** @type {unknown} */
  let resolvedValue = valuesByMode?.[modeId];

  // When the alias resolves to a variable from a different Figma file the mode
  // IDs may not match. Fall back to semantic mode-name matching.
  if (resolvedValue === undefined && aliasVar?.variableCollectionId) {
    const mappedModeId = mapModeId(variablesData, modeId, aliasVar.variableCollectionId);
    if (mappedModeId) {
      resolvedValue = valuesByMode?.[mappedModeId];
    }
  }

  if (
    resolvedValue && typeof resolvedValue === 'object' && 'type' in resolvedValue
    && resolvedValue.type === 'VARIABLE_ALIAS' && 'id' in resolvedValue
  ) {
    return resolveAliasToConcreteValue(variablesData, /** @type {string} */(resolvedValue.id), modeId);
  }

  return resolvedValue;
};

/**
 * Builds a Style-Dictionary reference token (e.g. `{ value: '{color.accent.200}', type: 'color' }`)
 * for a variable that has a public, non-internal name.
 *
 * @param {Variable} aliasVar - A resolved variable with a public name (does not start with `_`).
 * @returns {{ value: string, type: string }}
 */
const buildSdReference = (aliasVar) => {
  const aliasName = aliasVar.name.toLowerCase();
  const aliasType = aliasVar.resolvedType === 'FLOAT'
    ? getTypeForFloatVariable(aliasName)
    : aliasVar.resolvedType.toLowerCase();
  const renamedAlias = renameVariable(aliasName, aliasType);
  return { type: aliasType, value: `{${renamedAlias.replaceAll('/', '.')}}` };
};

/**
 * Returns `true` when a variable name indicates that the variable must **not**
 * be emitted as a Style-Dictionary reference and instead needs to be resolved
 * to the next reference or concrete value.
 *
 * This is the case for:
 * - **Internal Figma variables** – names starting with `_` (e.g. `_color-palette/red/500`).
 *   These are private palette intermediaries and have no public SD token path.
 * - **Always-resolved typography values** – `letter-spacing/default`,
 *   `letter-spacing/positive-2`, and any `line-height` variable.
 *   These must be emitted as plain values, not as `var()` references.
 *
 * @param {string} variableName - The Figma variable name to test.
 * @returns {boolean} `true` if the variable must be resolved to its next reference or value.
 */
const isInternalOrAlwaysResolvedVariable = (variableName) => {
  const INTERNAL_OR_ALWAYS_RESOLVE_REGEX = /^_|letter-spacing\/(?:default|positive-2)|(?:^|\/)line-height/;
  return INTERNAL_OR_ALWAYS_RESOLVE_REGEX.test(variableName);
};

/**
 * Resolves a variable's mode value, applying cross-file mode-name mapping when
 * the `modeId` is not directly present in the variable's `valuesByMode` map.
 *
 * @param {VariablesAndCollections} variablesData
 * @param {Variable} variable - The variable whose mode value is needed.
 * @param {string} modeId - The mode ID of the calling (source) collection.
 * @returns {unknown} The value for the resolved mode, or `undefined` if not found.
 */
const getModeValueForVar = (variablesData, variable, modeId) => {
  const { valuesByMode, variableCollectionId } = variable;
  const byMode = /** @type {Record<string, unknown>} */ (valuesByMode);
  let modeValue = byMode?.[modeId];
  if (modeValue === undefined && variableCollectionId) {
    const mappedModeId = mapModeId(variablesData, modeId, variableCollectionId);
    if (mappedModeId) modeValue = byMode?.[mappedModeId];
  }
  return modeValue;
};

/**
 * Traverses an alias chain, skipping over internal palette intermediaries
 * (variables whose names match {@link isInternalOrAlwaysResolvedVariable}),
 * until it reaches the first public variable.
 *
 * Returns a Style-Dictionary reference for that public variable
 * (e.g. `{ value: '{color.accent.200}', type: 'color' }`), which the
 * `cssVariableFormatter` later converts to `var(--syn-color-accent-200)`.
 *
 * This ensures that charting tokens referencing internal palette intermediaries
 * (e.g. `_primary-palette/accent/200`) are still emitted as semantic SD
 * references rather than as resolved hex strings.
 *
 * @param {VariablesAndCollections} variablesData
 * @param {string} aliasId - The variable ID to start traversing from.
 * @param {string} modeId - The mode (theme) in which to resolve the alias chain.
 * @returns {{ value: string, type: string } | null} An SD reference token, or `null` if the chain cannot be resolved.
 */
const followAliasChainToSdReference = (variablesData, aliasId, modeId) => {
  const aliasVar = findVariableById(variablesData, aliasId);
  if (!aliasVar) return null;

  // If the variable is public (not internal), emit its SD reference directly.
  if (!isInternalOrAlwaysResolvedVariable(aliasVar.name)) {
    return buildSdReference(aliasVar);
  }

  // Internal variable – follow its alias to the next variable in the chain.
  const modeValue = getModeValueForVar(variablesData, aliasVar, modeId);

  if (
    modeValue && typeof modeValue === 'object' && 'type' in modeValue
    && modeValue.type === 'VARIABLE_ALIAS' && 'id' in modeValue
  ) {
    return followAliasChainToSdReference(variablesData, /** @type {string} */ (modeValue.id), modeId);
  }

  return null;
};

/**
 * Looks up the variable referenced by `id` and returns a Style-Dictionary
 * reference token for it (e.g. `{ value: '{color.accent.200}', type: 'color' }`).
 *
 * Unlike {@link followAliasChainToSdReference} this function does **not**
 * traverse alias chains – it only resolves one level and returns the SD path
 * for the directly referenced variable.
 *
 * @param {VariablesAndCollections} variablesData
 * @param {string} id - The variable ID of the alias target.
 * @returns {{ value: string, type: string } | null} The SD reference token, or `null` if the variable cannot be found.
 */
const buildSdReferenceForAlias = (variablesData, id) => {
  const aliasVar = findVariableById(variablesData, id);
  if (!aliasVar) return null;

  const aliasName = aliasVar.name.toLowerCase();
  const aliasType = aliasVar.resolvedType === 'FLOAT'
    ? getTypeForFloatVariable(aliasName)
    : aliasVar.resolvedType.toLowerCase();

  const renamedAlias = renameVariable(aliasName, aliasType);
  const replacedSeparator = renamedAlias.replaceAll('/', '.');

  return { type: aliasType, value: `{${replacedSeparator}}` };
};

/**
 * Derives the Style-Dictionary `value` and `type` from a FLOAT variable.
 * The correct unit (px, %, or none) is inferred from the variable name.
 *
 * @param {string} name - The lowercased variable name.
 * @param {number} value - The raw numeric value from Figma.
 * @returns {{ value: string, type: string }}
 */
const resolveFloatValue = (name, value) => {
  const stringValue = `${value}`;
  const withUnit = (/** @type {string} */ unit) => `${stringValue.replace('NaN', '0')}${unit}`;

  const type = getTypeForFloatVariable(name);

  let resolvedValue;

  if (name.includes('opacity') || name.includes('line-height')) {
    resolvedValue = withUnit('%');
  } else if (name.includes('weight') || name.includes('z-index')) {
    resolvedValue = stringValue;
  } else if (name.includes('letter-spacing')) {
    const rounded = parseFloat(value.toFixed(2));
    resolvedValue = `${rounded}px`;
  } else {
    resolvedValue = withUnit('px');
  }

  return { type, value: resolvedValue };
};

/**
 * Resolves the final Style-Dictionary `{ value, type }` for a given variable
 * in a specific mode. Handles aliases, color values, FLOAT values, font
 * families, and text content.
 *
 * @param {VariablesAndCollections} variablesData
 * @param {Variable} variable - The variable to resolve.
 * @param {string} modeId - The mode to resolve the value for.
 * @returns {{ value: string, type: string } | undefined}
 */
// eslint-disable-next-line complexity
const resolveValue = (variablesData, variable, modeId) => {
  const {
    name, valuesByMode, resolvedType, scopes = [],
  } = variable;
  const cleanName = name.toLowerCase();

  const modeValuesMap = /** @type {Record<string, any>} */ (valuesByMode);
  let modeValue = modeValuesMap?.[modeId];
  let finalValue;
  let type;

  if (typeof modeValue === 'object' && 'type' in modeValue && modeValue.type === 'VARIABLE_ALIAS') {
    const aliasObject = /** @type {{ id: string; type: string }} */ (modeValue);
    const resolved = buildSdReferenceForAlias(variablesData, aliasObject.id);

    if (!resolved) {
      return undefined;
    }

    // Traverse internal palette intermediaries (e.g. `_primary-palette/*`) to
    // find the first public variable and emit its SD reference
    // (e.g. `{color.accent.200}`), which the cssVariableFormatter converts to
    // `var(--syn-color-accent-200)` in the final CSS output.
    const sdReference = followAliasChainToSdReference(variablesData, aliasObject.id, modeId);
    if (sdReference) {
      return sdReference;
    }

    // No public SD reference available – fall back to the resolved concrete value.
    modeValue = resolveAliasToConcreteValue(variablesData, aliasObject.id, modeId);
  }

  if (resolvedType === 'FLOAT') {
    const floatResult = resolveFloatValue(cleanName, /** @type {number} */ (modeValue));
    finalValue = floatResult.value;
    type = floatResult.type;
  } else if (resolvedType === 'COLOR') {
    finalValue = formatColor(/** @type {Color} */ (modeValue));
    type = 'color';
  } else if (scopes.includes('FONT_FAMILY')) {
    finalValue = modeValue;
    type = 'fontFamilies';
  } else if (scopes.includes('TEXT_CONTENT')) {
    finalValue = modeValue;
    type = 'content';
  } else {
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

/**
 * @typedef {object} TransformFigmaVariablesOptions
 * @property {VariablesAndCollections} variablesData
 *   Parsed JSON fetched from the Figma API (`{ variables, variableCollections }`).
 * @property {string} outputDir
 *   Directory where the per-mode JSON files are written (one file per theme).
 * @property {string} collectionName
 *   Name of the Figma variable collection whose modes are transformed
 *   (e.g. `'Synergy Themes'` or `'Chart Themes'`).
 */

/**
 * Transforms fetched Figma variables into Style-Dictionary-compatible JSON files.
 * One output file per mode (theme) is written to `outputDir`.
 *
 * @param {TransformFigmaVariablesOptions} options
 * @returns {void}
 */
export const transformFigmaVariables = ({
  collectionName,
  outputDir,
  variablesData,
}) => {
  const { variableCollections, variables } = variablesData;

  /** @type {Record<string, any>} */
  const transformed = {};

  Object.values(variables).forEach((variable) => {
    const { name, variableCollectionId } = variable;

    if (isDesignOnlyVariableOrStyle(name)) {
      return;
    }

    const collection = Object.values(variableCollections)
      .find(c => c.id === variableCollectionId && c.name === collectionName);

    if (!collection) {
      return;
    }

    Object.values(collection.modes).forEach((mode) => {
      const { modeId, name: modeName } = mode;

      if (modeName.includes('exploration')) {
        return;
      }

      if (!transformed[modeName]) transformed[modeName] = {};

      const variableValue = resolveValue(variablesData, variable, modeId);

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
    const outputPath = path.join(outputDir, `${sanitizedModeName}.json`);
    createDirectory(outputDir);
    writeFileSync(outputPath, JSON.stringify(sort(modeData), null, 2));
  });
};
