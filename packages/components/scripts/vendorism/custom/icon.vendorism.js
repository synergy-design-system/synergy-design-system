import { replaceSections } from '../replace-section.js';

const FILES_TO_TRANSFORM = [
  'icon.component.ts',
  'icon.test.ts',
];

/**
 * Transform the component file
 */
const transformComponent = (path, originalContent) => {
  const content = replaceSections([
    [
      // eslint-disable-next-line no-template-curly-in-string
      '<use part="use" href="${url}"></use>',
      // eslint-disable-next-line no-template-curly-in-string
      '<use part="use" href="${url}" width="100%" height="100%"></use>',
    ],
    // #806: Load system icons without using fetch
    [
      `try {
      fileData = await fetch(url, { mode: 'cors' });
      if (!fileData.ok) return fileData.status === 410 ? CACHEABLE_ERROR : RETRYABLE_ERROR;
    } catch {
      return RETRYABLE_ERROR;
    }`,
    `// #806: Make sure to not fetch system icons
    // as they are part of the bundle anyways.
    // This speeds up the loading of the icon.
    if (this.library === 'system') {
      // Skip the icon if the URL is empty
      if (!url) {
        return CACHEABLE_ERROR;
      }

      // If the URL is a system icon, we can just return it
      fileData = new Response(url, {
        status: 200,
      });
    } else {
      try {
        fileData = await fetch(url, { mode: 'cors' });
        if (!fileData.ok) return fileData.status === 410 ? CACHEABLE_ERROR : RETRYABLE_ERROR;
      } catch {
        return RETRYABLE_ERROR;
      }
    }`,
    ],
  ], originalContent);

  return {
    content,
    path,
  };
};

/**
 * Transform the test file
 */
const transformTests = (path, originalContent) => {
  const content = replaceSections([
    [
      'arrow-left',
      'refresh',
    ],
    [
      '/docs/assets/images/sprite.svg',
      '/public/sprite.svg',
    ],

  ], originalContent);

  return {
    content,
    path,
  };
};

export const vendorIcon = (path, content) => {
  const output = { content, path };

  // Skip for non icon
  const isValidFile = !!FILES_TO_TRANSFORM.find(p => path.includes(p));

  if (!isValidFile) {
    return output;
  }

  if (path.endsWith('icon.test.ts')) {
    return transformTests(path, content);
  }

  if (path.endsWith('icon.component.ts')) {
    return transformComponent(path, content);
  }

  return output;
};
