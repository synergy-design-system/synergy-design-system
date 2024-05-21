import { addSectionAfter, addSectionBefore } from '../replace-section.js';

const FILES_TO_TRANSFORM = [
  'tab.component.ts',
];

/**
 * Transform the component code
 * @param {String} path
 * @param {String} originalContent
 * @returns
 */
const transformComponent = (path, originalContent) => {
  // Add prefix slot
  let content = addSectionBefore(
    originalContent,
    '<slot></slot>',
    '<slot name="prefix" part="prefix" class="tab__prefix"></slot>',
    { newlinesAfterInsertion: 2, tabsAfterInsertion: 4 },
  );

  // Add slots documentation
  content = addSectionAfter(
    content,
    '* @slot - The tab\'s label.',
    ' * @slot prefix - Used to prepend an icon or similar element to the tab.',
  );

  // Add css parts documentation
  content = addSectionAfter(
    content,
    '* @csspart close-button__base - The close button\'s exported `base` part.',
    ' * @csspart prefix - The prefix container.',
  );

  return {
    content,
    path,
  };
};

export const vendorTab = (path, content) => {
  const output = { content, path };

  // Skip for non select
  const isValidFile = !!FILES_TO_TRANSFORM.find(p => path.includes(p));

  if (!isValidFile) {
    return output;
  }

  if (path.endsWith('tab.component.ts')) {
    return transformComponent(path, content);
  }

  return output;
};
