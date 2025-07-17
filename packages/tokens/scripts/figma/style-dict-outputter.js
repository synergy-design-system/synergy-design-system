/**
 * @typedef { import('@figma-export/types').StyleOutputter } StyleOutputter
 * @typedef { typeof figmaVariables.variables[keyof typeof figmaVariables.variables]} Variable
 */
import { writeFileSync } from 'node:fs';
import { setNestedProperty } from '../helpers.js';
import { figmaVariables, resolveAlias } from './helpers.js';

/**
 * Sanitizes the figma comment
 * 
 * @param {string} message - The message to sanitize.
 * @returns {string | undefined} - Returns the comment string or undefined if the message is empty.
 */
const sanitizeComment = (message) => {
  if (message === '') {
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
const writeStyle = ( obj, comment, name, value, type ) => {
  if (value) {
    const keys = name.split('/');
    setNestedProperty(obj, keys, {
      comment: sanitizeComment(comment),
      value,
      type,
    });
  }
};

/**
 * Returns the alias or value for a style property.
 * 
 * Note: Currently is is not possible to set the line height in Figma via variable-alias.
 * @param { import('@figma-export/types').Style & import('@figma-export/types').StyleTypeText } style 
 * @param { 'fontWeight' | 'fontFamily' | 'fontSize' | 'lineHeight'} key 
 */
const getAliasOrValueForStyle = (style, key) => {
  const boundVariable = style.originalNode.boundVariables?.[key]?.[0];
  if(!boundVariable) {
    return style.style[key];
  }
  
  const alias = resolveAlias(boundVariable.id);
  if (alias) {
    return alias.value;
  }
  throw new Error(`No alias and value found for the style ${style.name} with id ${key}`);
}

/**
 * This outputter writes the styles to a JSON file, which is compatible with style dictionary in the specified output path.
 * 
 * @param { Object } obj
 * @param { string } obj.output - Path the file should be written to
 * @returns { StyleOutputter } the style dictionary outputter
 */
export const styleDictionaryOutputter = ({output}) => async (styles) => {
  const result = {};

  for (const style of styles) {
    if (style.visible) {
      switch (style.styleType) {
        // currently we only have style type EFFECT and TEXT
        case 'EFFECT': {
          const visibleEffects = style.effects.filter(
            (effect) => effect.visible,
          );

          const boxShadowValue = visibleEffects
            .filter(
              (effect) =>
                effect.type === 'INNER_SHADOW' ||
                effect.type === 'DROP_SHADOW',
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

          break;
        }

        case 'TEXT': {
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
          break;
        }
      }
    }
  }

  writeFileSync(
    output,
    JSON.stringify(result, undefined, 2),
  );
}
