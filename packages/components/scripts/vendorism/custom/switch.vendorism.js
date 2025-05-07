/* eslint-disable @typescript-eslint/quotes */
import { replaceSection } from "../replace-section.js";

const FILES_TO_TRANSFORM = [
  'switch.component.ts',
];

/**
 * Transform the component code
 * @param {String} path
 * @param {String} originalContent
 * @returns
 */
const transformComponent = (path, originalContent) => {
  // #783 Allow to see the title attribute in the checkbox
  const content = replaceSection([
    "@property() title = '';",
    "@property({ reflect: true }) title = '';",
  ], originalContent);

  return {
    content,
    path,
  };
};

export const vendorSwitch = (path, content) => {
  const output = { content, path };

  // Skip for non select
  const isValidFile = !!FILES_TO_TRANSFORM.find(p => path.includes(p));

  if (!isValidFile) {
    return output;
  }

  if (path.endsWith('switch.component.ts')) {
    return transformComponent(path, content);
  }

  return output;
};
