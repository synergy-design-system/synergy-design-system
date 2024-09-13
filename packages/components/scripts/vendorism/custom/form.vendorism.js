import { addSectionBefore } from '../replace-section.js';

/**
 * Add custom support for file inputs in shoelaces form support
 * @param {string} path
 * @param {string} content
 * @returns {object} New content
 */
const vendorFormInternal = (path, content) => {
  const nextContent = addSectionBefore(
    content,
    `      if (Array.isArray(value)) {
        (value as unknown[]).forEach(val => {`,
    `      // Add support for file inputs
      if (value instanceof FileList) {
        const file = value as FileList;
        for (const f of file) {
          event.formData.append(name, f, f.name);
        }
        return;
      }
    `,
  );

  return {
    content: nextContent,
    path,
  };
};

export const vendorForm = (path, content) => {
  const output = { content, path };

  if (path !== 'src/internal/form.ts') {
    return output;
  }

  return vendorFormInternal(path, content);
};
