/* eslint-disable @typescript-eslint/quotes */
import { addSectionAfter } from "../replace-section.js";

const FILES_TO_TRANSFORM = [
  'checkbox.component.ts',
];

/**
 * Transform the component code
 * @param {String} path
 * @param {String} originalContent
 * @returns
 */
const transformComponent = (path, originalContent) => {
  // #783 Allow to see the title attribute in the checkbox
  const content = addSectionAfter(
    originalContent,
    `class="checkbox__control"`,
    // eslint-disable-next-line no-template-curly-in-string
    '            title=${this.title}',
  );

  return {
    content,
    path,
  };
};

export const vendorCheckbox = (path, content) => {
  const output = { content, path };

  // Skip for non select
  const isValidFile = !!FILES_TO_TRANSFORM.find(p => path.includes(p));

  if (!isValidFile) {
    return output;
  }

  if (path.endsWith('checkbox.component.ts')) {
    return transformComponent(path, content);
  }

  return output;
};
