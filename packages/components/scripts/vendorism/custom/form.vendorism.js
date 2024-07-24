import { addSectionBefore, replaceSections } from '../replace-section.js';

const FILES_TO_TRANSFORM = [
  'src/internal/form.ts',
  'src/utilities/form.ts',
];

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

/**
 * Changes the way form data is serialized to support file inputs
 * @param {string} path
 * @param {string} content
 * @returns {object}
 */
const vendorFormUtils = (path, content) => {
  const nextContent = addSectionBefore(
    content,
    '  formData.forEach((value, key) => {',
    `  const getValue = (value: unknown) => value instanceof File
    ? value.name
    : value;
    `,
  );

  // Make sure the new getValue function is used
  const finalContent = replaceSections([
    [
      'entry.push(value)',
      'entry.push(getValue(value))',
    ],
    [
      'object[key] = [object[key], value]',
      'object[key] = [object[key], getValue(value)]',
    ],
    [
      'object[key] = value',
      'object[key] = getValue(value)',
    ],
  ], nextContent);

  return {
    content: finalContent,
    path,
  };
};

export const vendorForm = (path, content) => {
  const output = { content, path };

  // Skip for non select
  const isValidFile = !!FILES_TO_TRANSFORM.find(p => path.includes(p));

  if (!isValidFile) {
    return output;
  }

  switch (path) {
  case 'src/internal/form.ts': return vendorFormInternal(path, content);
  case 'src/utilities/form.ts': return vendorFormUtils(path, content);
  default: return output;
  }
};
