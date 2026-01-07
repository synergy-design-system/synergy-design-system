import {
  removeSections,
} from '../remove-section.js';

const FILES_TO_TRANSFORM = [
  'tooltip.component.ts',
];

/**
 * Transform the components file
 * @param {String} path
 * @param {String} originalContent
 * @returns
 */
const transformComponent = (path, originalContent) => {
  // Get a 4px spacing between nupsi and anchor
  let content = originalContent.replace(
    '@property({ type: Number }) distance = 8;',
    '@property({ type: Number }) distance = 13;',
  );

  // #1149: Remove deprecated 'hoist' property
  content = removeSections([
    [
      `/**
   * Enable this option to prevent the tooltip from being clipped when`,
      'hoist = false;',
    ],
    [
      'strategy=${this.hoist',
      "'absolute'}",
    ],
    [
      "'hoist'",
      ', ',
    ],
  ], content);

  return {
    content,
    path,
  };
};

export const vendorTooltip = (path, content) => {
  const output = { content, path };

  // Skip for non select
  const isValidFile = !!FILES_TO_TRANSFORM.find(p => path.includes(p));

  if (!isValidFile) {
    return output;
  }

  if (path.endsWith('tooltip.component.ts')) {
    return transformComponent(path, content);
  }

  return output;
};
