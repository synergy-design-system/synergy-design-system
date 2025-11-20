/**
 * @typedef { import('@figma-export/types').StyleOutputter } StyleOutputter
 */
import { writeFileSync } from 'node:fs';
import { isDesignOnlyVariableOrStyle } from './helpers.js';

/**
 * This outputter writes the styles to a JSON file in the specified output path.
 *
 * @param { Object } obj
 * @param { string } obj.output - Path the file should be written to
 * @returns { StyleOutputter } the style dictionary outputter
 */
export const styleDictionaryOutputter = ({ output }) => async (styles) => {
  const filteredStyles = styles
    .filter((style) => {
      // TODO: currently we do not want to export all new brand variables or some are design only variables
      const isDesignOnlyStyle = isDesignOnlyVariableOrStyle(style.name);
      return style.visible && !isDesignOnlyStyle;
    });

  writeFileSync(
    output,
    JSON.stringify(filteredStyles, undefined, 2),
  );
  return Promise.resolve();
};
