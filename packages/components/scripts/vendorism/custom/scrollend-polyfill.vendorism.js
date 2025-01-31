import { addSectionsBefore } from '../replace-section.js';

export const vendorScrollEndPolyFill = (path, content) => {
  if (!path.endsWith('scrollend-polyfill.ts')) {
    return { content, path };
  }

  // #763: Make sure the scrollend polyfill is only applied on the client side
  const newContent = addSectionsBefore([
    [
      'const isSupported',
      `
// #763: Make sure the scrollend polyfill is only applied on the client side
(() => {
  // SSR environments should not apply the polyfill
  if (typeof window === 'undefined') {
    return;
  }
      `,
    ],
    [
      '// Without',
      '})();',
    ],
  ], content);

  return {
    content: newContent,
    path,
  };
};
