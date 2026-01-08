/**
 * @typedef { import('@figma-export/types').Style } Style
 * @typedef { import('@figma-export/types').StyleTypeText & Style } StyleTypeText
 * @typedef { import('@figma-export/types').StyleTypeEffect & Style } StyleTypeEffect
 * @typedef { import('@figma-export/types').EffectStyleShadow & import('@figma-export/types').EffectStyle } EffectStyleShadow
 * @typedef { import('@figma/rest-api-spec').Effect} Effect
 * @typedef { import('@figma/rest-api-spec').DropShadowEffect} DropShadowEffect
 * @typedef { { radius?: number, spread?: number, color?: string, offsetX?: number, offsetY?: number } } DropShadowObject
 * @typedef {import('@figma/rest-api-spec').RGBA | import('@figma/rest-api-spec').RGB} Color
 */
import { existsSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { setNestedProperty } from '../helpers.js';
import {
  createDirectory, formatColor, getAliasValue, getAvailableThemes, resolveAlias,
} from './helpers.js';
import stylesJson from '../../src/figma-variables/styleTokens.json' with { type: 'json' };
import { OUTPUT_DIR } from '../config.js';

/**
 * The fetching result of the Figma API for styles.
 */
/** @type {Style[]} */
export const figmaStyles = JSON.parse(JSON.stringify(stylesJson));

/**
 * Sanitizes the figma comment
 *
 * @param {string} message - The message to sanitize.
 * @returns {string | undefined} - Returns the comment string or undefined if the message is empty.
 */
const sanitizeComment = (message) => {
  if (!message || message === '') {
    return undefined;
  }

  return message.replace(/\*\//g, '').split('\n').join(' ');
};

/**
 * Writes a style to the given object.
 *
 * @param { * } obj The object to write the style to
 * @param { string } comment The comment for the style, e.g. "Overflow Down"
 * @param { string } name The name of the style e.g. body/medium/regular
 * @param { string } value The CSS value of the style
 * @param { 'shadow' | 'typography' } type The type of the style
 */
const writeStyle = (obj, comment, name, value, type) => {
  if (value) {
    const keys = name.split('/');
    setNestedProperty(obj, keys, {
      description: sanitizeComment(comment),
      type,
      value,
    });
  }
};

/**
 * Returns the alias or value for a style property.
 *
 * Note: Currently is is not possible to set the line height in Figma via variable-alias.
 * @param { Style & StyleTypeText } style
 * @param { 'fontWeight' | 'fontFamily' | 'fontSize' | 'lineHeight'} key
 */
const getAliasOrValueForStyle = (style, key) => {
  const boundVariable = style.originalNode.boundVariables?.[key]?.[0];
  if (!boundVariable) {
    return style.style[key];
  }

  const alias = resolveAlias(boundVariable.id);
  if (alias) {
    return alias.value;
  }
  throw new Error(`No alias and value found for the style ${style.name} with id ${key}`);
};

/**
 * Gets the real value in a nested variable alias structure.
 * If the alias is a variable alias, it recursively resolves the value.
 * @param { string } aliasId Id of the alias variable
 * @param { string } modeId Id of the mode
 * @returns {unknown | undefined} The value of the alias variable, or undefined if not found.
 */
const getRealValueFromAlias = (aliasId, modeId) => {
  const alias = getAliasValue(aliasId, modeId);
  if (
    alias && typeof alias === 'object' && 'type' in alias
    && 'id' in alias && alias.type === 'VARIABLE_ALIAS'
  ) {
    return getRealValueFromAlias(/** @type {string} */(alias.id), modeId);
  }
  return alias;
};

/**
 * Filters effects to only include supported DROP_SHADOW effects.
 * Logs a warning for unsupported effect types.
 * Works with both Effect and EffectStyle objects.
 * @param {Effect | import('@figma-export/types').EffectStyle} effect - The effect object to check
 * @returns {boolean} - Returns true if the effect is a supported DROP_SHADOW
 */
const isDropShadowEffect = (effect) => {
  const isDropShadow = effect.type === 'DROP_SHADOW';
  if (!isDropShadow) {
    // Currently we only have DROP_SHADOW effects. Adapt the code as soon as other effects are added.
    console.warn(
      'Currently only DROP_SHADOW effects are supported. '
      + `Adapt code for new effect ${effect.type}`,
    );
  }
  return isDropShadow;
};

/**
 * Returns the values of the bound variables for the effect styles.
 * @param {StyleTypeEffect} style - The style object with effects
 * @param {string} modeId
 * @return {Array<DropShadowObject>} - Returns an array of objects with the bound variables for the effect styles.
 */
const getBoundVariablesEffectStyles = (style, modeId) => {
  if (style.originalNode.type !== 'RECTANGLE') {
    return [];
  }

  /** @type {Array<DropShadowEffect>} */
  // @ts-expect-error We can be sure, that the effects are DropShadowEffects, as the isDropShadowEffect function filters them.
  const dropShadowEffects = (style.originalNode.effects)
    // Currently we only have DROP_SHADOW effects. Adapt the code as soon as another effects are added.
    .filter(isDropShadowEffect)
    .filter(effect => 'visible' in effect && effect.visible);

  const boxShadowValue = dropShadowEffects
    .map((effect) => {
      const boundingVariables = Object.fromEntries(Object.entries(effect.boundVariables || {})
        .map(([key, value]) => {
          const aliasValue = getRealValueFromAlias(value.id, modeId);
          const alias = resolveAlias(value.id);
          if (alias?.type === 'color') {
            const color = formatColor(/** @type {Color} */(aliasValue));
            return [key, color];
          }
          return [key, aliasValue];
        }));
      return boundingVariables;
    });
  return boxShadowValue;
};

/**
 * Processes EFFECT style type and writes shadow or blur values
 * @param {*} result - The result object to write to
 * @param {StyleTypeEffect} style - The style object with effects
 * @param {string} modeId - The mode ID for the style
 */
const processEffectStyle = (result, style, modeId) => {
  /** @type {Array<DropShadowObject>} */
  let boundValues = [];
  // Check if the style has bound variables
  if (style.originalNode.boundVariables?.effects && 'effects' in style.originalNode) {
    boundValues = getBoundVariablesEffectStyles(style, modeId);
  }

  // if no variables are bound or only some, add the others
  /** @type {Array<EffectStyleShadow>} */
  // @ts-expect-error We can be sure, that the effects are EffectStyleShadow, as the isDropShadowEffect function filters them.
  const dropShadowEffects = style.effects
    // Currently we only have DROP_SHADOW effects. Adapt the code as soon as another effects are added.
    .filter(isDropShadowEffect)
    .filter(effect => effect.visible);

  const boxShadowValue = dropShadowEffects
    // eslint-disable-next-line complexity
    .map((effect, index) => {
      if (boundValues.length === 0) {
        return effect.value;
      }
      const boundIndex = boundValues.length - index - 1;
      const pixelValues = [
        boundValues[boundIndex]?.offsetX || effect.offset.x,
        boundValues[boundIndex]?.offsetY || effect.offset.y,
        boundValues[boundIndex]?.radius || effect.blurRadius,
        boundValues[boundIndex]?.spread || effect.spreadRadius,
      ];
      const color = boundValues[boundIndex]?.color || effect.color.rgba || '';
      const pixelSting = pixelValues
        .filter((value) => value !== undefined)
        .join('px ').concat('px');

      return `${pixelSting} ${color}`.trim();
    })
    .join(', ');

  writeStyle(
    result,
    style.comment,
    style.name,
    boxShadowValue,
    'shadow',
  );
};

/**
 * Processes TEXT style type and writes typography values
 * @param {*} result - The result object to write to
 * @param {StyleTypeText} style - The style object with text properties
 */
const processTextStyle = (result, style) => {
  const fontSize = getAliasOrValueForStyle(style, 'fontSize');
  const fontFamily = getAliasOrValueForStyle(style, 'fontFamily');
  const fontWeight = getAliasOrValueForStyle(style, 'fontWeight');
  let lineHeight = getAliasOrValueForStyle(style, 'lineHeight');

  // Round the line height to the nearest integer as figma returns it with several decimal places.
  lineHeight = Number(lineHeight).toFixed(1);

  const textStyles = `${fontWeight} ${fontSize}/${lineHeight} ${fontFamily}`;
  writeStyle(
    result,
    style.comment,
    style.name,
    `${textStyles}`,
    'typography',
  );
};

/**
 * Processes a single style and adds it to the result object
 * @param {*} result - The result object to write to
 * @param {Style} style - The style object to process
 * @param {string} modeId - The mode ID for the style
 */
const processStyle = (result, style, modeId) => {
  switch (style.styleType) {
  // currently we only have style type EFFECT and TEXT
  case 'EFFECT': {
    processEffectStyle(result, style, modeId);
    break;
  }
  case 'TEXT': {
    processTextStyle(result, style);
    break;
  }
  default:
    // No processing for unknown style types
    console.warn(`Unknown style type: ${style.styleType} for style ${style.name}`);
    break;
  }
};

const transformFigmaStyles = () => {
  /** @type {Record <string, any>} */
  const result = {};
  console.log('Transforming Figma styles...');

  const themes = getAvailableThemes();

  figmaStyles.forEach((style) => {
    themes.forEach(({ id, name }) => {
      if (!result[name]) result[name] = {};

      processStyle(result[name], style, id);
    });
  });

  Object.entries(result).forEach(([name, styles]) => {
    const targetFilePath = join(OUTPUT_DIR, `${name}.json`);
    if (!existsSync(targetFilePath)) {
      console.warn(`Target file ${targetFilePath} does not exist. Creating a new file.`);
      createDirectory(OUTPUT_DIR);
      writeFileSync(targetFilePath, '{}', 'utf-8');
    }
    const fileData = readFileSync(targetFilePath, 'utf-8');
    const object = JSON.parse(fileData);
    const updatedData = Object.assign(object, styles);
    writeFileSync(targetFilePath, JSON.stringify(updatedData, null, 2));
  });
};

transformFigmaStyles();
