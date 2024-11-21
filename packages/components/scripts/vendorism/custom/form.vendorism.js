import { addSectionsBefore, replaceSection } from '../replace-section.js';

/**
 * Add custom support for file inputs in shoelaces form support
 * @param {string} path
 * @param {string} content
 * @returns {object} New content
 */
const vendorFormInternal = (path, content) => {
  let nextContent = addSectionsBefore([
    [
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
    ],
    [
      'import type SynButton from \'../components/button/button.js\';',
      'import type SynValidate from \'../components/validate/validate.js\';',
    ],
  ], content);

  // Add invalid styling for form element, when used with syn-validate,
  // without data-user-invalid needed
  nextContent = replaceSection([
    'host.toggleAttribute(\'data-user-invalid\', !isValid && hasInteracted);',
    `const parent = host.parentElement;
    if (parent && parent.tagName.toLocaleUpperCase() === 'SYN-VALIDATE') {
      const isValidateValid = (parent as SynValidate).getValidity();
      host.toggleAttribute('data-user-invalid', !isValid && !isValidateValid);
    } else {
      host.toggleAttribute('data-user-invalid', !isValid && hasInteracted);
    }`], nextContent);

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
