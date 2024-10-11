import { addSectionBefore } from '../replace-section.js';

export const vendorEvents = (path, content) => {
  if (!path.startsWith('src/events/')) {
    return {
      content,
      path,
    };
  }

  // Make sure to add a comment before the export type
  // This is needed as otherwise the documentation will
  // just display a vendorism vendor message
  // @see https://github.com/synergy-design-system/synergy-design-system/issues/609
  const finalContent = addSectionBefore(
    content,
    'export type',
    `
/**
 * Synergy custom event
 */`.trim(),
    {
      newlinesAfterInsertion: 1,
    },
  );

  return {
    content: finalContent,
    path,
  };
};
