/**
 * @typedef { import('@figma-export/types').StyleOutputter } StyleOutputter
 */
import { writeFileSync } from 'node:fs';
import { isNewBrandOnlyVariableOrStyle } from './helpers.js';

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
      // TODO: currently we do not want to export the new brand variables,
      //  but just get the old state with figma api fetching. This can be removed when the new brand variables are ready to be exported.
      const isNewBrandOnlyStyle = isNewBrandOnlyVariableOrStyle(style.name);
      return style.visible && !isNewBrandOnlyStyle;
    });

  writeFileSync(
    output,
    JSON.stringify(filteredStyles, undefined, 2),
  );
  return Promise.resolve();
};
