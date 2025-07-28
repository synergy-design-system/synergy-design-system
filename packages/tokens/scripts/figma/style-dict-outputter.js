/**
 * @typedef { import('@figma-export/types').StyleOutputter } StyleOutputter
 * @typedef { import('@figma-export/types').Style } Style
 * @typedef { import('@figma-export/types').StyleTypeText & Style } StyleTypeText
 * @typedef { import('@figma-export/types').StyleTypeEffect & Style } StyleTypeEffect
 */
import { writeFileSync } from 'node:fs';
import { setNestedProperty } from '../helpers.js';
import { isNewBrandOnlyVariableOrStyle, resolveAlias } from './helpers.js';

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
 * @param { Object } obj The object to write the style to
 * @param { string } comment The comment for the style, e.g. "Overflow Down"
 * @param { string } name The name of the style e.g. body/medium/regular
 * @param { string } value The CSS value of the style
 * @param { 'shadow' | 'typography' } type The type of the style
 */
const writeStyle = (obj, comment, name, value, type) => {
  if (value) {
    const keys = name.split('/');
    setNestedProperty(obj, keys, {
      comment: sanitizeComment(comment),
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
 * Processes EFFECT style type and writes shadow or blur values
 * @param {Object} result - The result object to write to
 * @param {StyleTypeEffect} style - The style object with effects
 */
const processEffectStyle = (result, style) => {
  const visibleEffects = style.effects.filter(
    (effect) => effect.visible,
  );

  const boxShadowValue = visibleEffects
    .filter(
      (effect) => effect.type === 'INNER_SHADOW'
          || effect.type === 'DROP_SHADOW',
    )
    .map((effect) => effect.value)
    .join(', ');

  const filterBlurValue = visibleEffects
    .filter((effect) => effect.type === 'LAYER_BLUR')
    .map((effect) => effect.value)
    .join(', ');

  // Shadow and Blur effects cannot be combined together since they use two different CSS properties.
  writeStyle(
    result,
    style.comment,
    style.name,
    boxShadowValue || filterBlurValue,
    'shadow',
  );
};

/**
 * Processes TEXT style type and writes typography values
 * @param {Object} result - The result object to write to
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
 * @param {Object} result - The result object to write to
 * @param {Style} style - The style object to process
 */
const processStyle = (result, style) => {
  switch (style.styleType) {
  // currently we only have style type EFFECT and TEXT
  case 'EFFECT': {
    processEffectStyle(result, style);
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

/**
 * This outputter writes the styles to a JSON file, which is compatible with style dictionary in the specified output path.
 *
 * @param { Object } obj
 * @param { string } obj.output - Path the file should be written to
 * @returns { StyleOutputter } the style dictionary outputter
 */
export const styleDictionaryOutputter = ({ output }) => async (styles) => {
  const result = {};

  styles
    .filter((style) => {
      // TODO: currently we do not want to export the new brand variables,
      //  but just get the old state with figma api fetching. This can be removed when the new brand variables are ready to be exported.
      const isNewBrandOnlyStyle = isNewBrandOnlyVariableOrStyle(style.name);
      return style.visible && !isNewBrandOnlyStyle;
    })
    .forEach((style) => {
      processStyle(result, style);
    });

  writeFileSync(
    output,
    JSON.stringify(result, undefined, 2),
  );
  return Promise.resolve();
};
