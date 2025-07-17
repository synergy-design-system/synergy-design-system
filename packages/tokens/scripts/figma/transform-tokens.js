/**
 * @typedef { typeof figmaVariables.variables[keyof typeof figmaVariables.variables]} Variable
 */
import path from 'path';
import { promises as fs } from 'fs';
import { sort } from '@tamtamchik/json-deep-sort';
import { setNestedProperty } from '../helpers.js';
import { figmaVariables, renameVariable } from './helpers.js';

const OUTPUT_DIR = './src/figma-variables/output-api';
const COLOR_PALETTE_PREFIX = '_color-palette'


/**
 * Create a directory if it does not exist.
 * @param { string } dirPath the directory path
 */
const createDirectory = async (dirPath) => {
  try {
    await fs.mkdir(dirPath, { recursive: true });
  } catch ( err ) {
    if ( err.code !== 'EEXIST') throw err;
  }
};


/**
 * Formats a color object into a CSS-compatible color string.
 * formatColor({ r: 0.5, g: 0.5, b: 0.5, a: 0.8 }) // "rgba(128, 128, 128, 0.80)"
 * formatColor({ r: 0.5, g: 0.5, b: 0.5 }) // "#808080"
 * @param {{r: number, g: number, b: number, a?: number}} color Color object with r, g, b, and optional a properties.
 * @returns {string} The formatted color string.
 */
const formatColor = ({ r, g, b, a }) => {
  const red = Math.round(r * 255);
  const green = Math.round(g * 255);
  const blue = Math.round(b * 255);

  if (a !== undefined && a < 1) {
    return `rgba(${red}, ${green}, ${blue}, ${a.toFixed(2)})`;
  }
  return `#${((1 << 24) + (red << 16) + (green << 8) + blue).toString(16).slice(1)}`;
};

/**
 * Resolves a variable alias by its ID.
 * @param {string} id The ID of the variable
 * @returns {{ value: string, type: string } | null} The resolved value and type of the variable, or null if not found.
 */
const resolveAlias = (id) => {
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

/**
 * Gets the value of an alias variable in a specific mode.
 * @param { string } aliasId Id of the alias variable
 * @param { string } modeId Id of the mode
 * @returns {string | undefined} The value of the alias variable, or undefined if not found.
 */
const getAliasValue = (aliasId, modeId) => {
  const aliasVar = Object.values(figmaVariables.variables).find(v => v.id === aliasId);
  const modeValue = aliasVar?.valuesByMode?.[modeId];
  return modeValue;
}


/**
 * Get the value and type of a variable in a specific mode.
 * @param {Variable} variable 
 * @param {string} modeId
 * @returns {{ value: string, type: string } | undefined} The resolved value and type of the variable, if it could not be resolved, returns undefined.
 */
const resolveValue = (variable, modeId) => {
  const { name, valuesByMode, resolvedType, scopes } = variable;
  const cleanName = name.toLowerCase();
  let modeValue = valuesByMode?.[modeId];
  let finalValue;
  let type;

  if (modeValue?.type === 'VARIABLE_ALIAS') {
    const resolved = resolveAlias(modeValue.id);
    if (!resolved) {
      console.log(`Not able to resolve css variable ${name} in mode ${modeId}`);
      return undefined;
    }

    if (!resolved.value.startsWith(`{${COLOR_PALETTE_PREFIX}`)) {
      return {
        value: resolved.value,
        type: resolved.type,
      }
    }
    // Exchange the _color-palette alias with the real values, as they should not show up in the json 
    modeValue = getAliasValue(modeValue.id, modeId);
  }

  if (resolvedType === 'FLOAT') {
    if (cleanName.includes('opacity')) {
      finalValue = `${parseFloat(modeValue)}%`.replace('NaN', '0');
      type = 'opacity';
    } else if (cleanName.includes('weight')) {
      finalValue = `${parseFloat(modeValue)}`;
      type = 'fontWeights';
    } else {
      finalValue = `${parseFloat(modeValue)}px`.replace('NaN', '0');
      type = 'sizing';
    }
  } else if (modeValue && typeof modeValue === 'object' && modeValue.r !== undefined) {
    finalValue = formatColor(modeValue);
    type = 'color';
  } else if (scopes.includes('FONT_FAMILY')) {
    // Add type to fonts
    finalValue = modeValue;
    type = 'fontFamily';
  } else if (scopes.includes('TEXT_CONTENT')) {
    // Add type to text content like "*"
    finalValue = modeValue;
    type = 'content';
  }
  else {
    finalValue = modeValue;
    type = resolvedType.toLowerCase();
  }
  return {
    value: finalValue,
    type: type,
  }

}

// --- Main Transformation ---
const transformFigmaVariables = async () => {
  const transformed = {};

  Object.values(figmaVariables.variables).forEach(variable => {
    const { name, variableCollectionId } = variable;
    const collection = Object.values(figmaVariables.variableCollections)
      .find(c => c.id === variableCollectionId);

    if(!collection) {
      console.warn(`Variable collection with id ${variableCollectionId} not found for variable ${name}`);
      return;
    }

    // The _color-palette tokens should not appear in the generated json file
    if(name.startsWith(COLOR_PALETTE_PREFIX)) {
      return;
    }

    Object.values(collection.modes).forEach(mode => {
      const { modeId, name: modeName } = mode;
      if (!transformed[modeName]) transformed[modeName] = {};
      
      const { value, type } = resolveValue(variable, modeId);

      const cleanName = name.toLowerCase();
      const renamedToken = renameVariable(cleanName, type);
      const keys = renamedToken.split('/');
      
      setNestedProperty(transformed[modeName], keys, { value, type });
    });
  });

  await Promise.all(
    Object.entries(transformed).map(async ([modeName, modeData]) => {
      const sanitizedModeName = modeName.toLowerCase().replace(/\s+/g, '-');
      const outputPath = path.join(OUTPUT_DIR, `${sanitizedModeName}.json`);
      await createDirectory(OUTPUT_DIR);
      await fs.writeFile(outputPath, JSON.stringify(sort(modeData), null, 2));
    })
  );
};

transformFigmaVariables();
