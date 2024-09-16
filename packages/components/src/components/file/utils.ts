/**
 * Sanitize an accept specifier according to specs
 * @param specifier The specifier to sanitize
 * @returns The sanitized specifier
 */
const sanitizeSpecifier = (specifier: string) => {
  const trimmed = specifier.trim();

  // Case 1: We have a mime type
  if (trimmed.includes('/')) {
    return trimmed;
  }

  // Case 2: We have a file extension
  if (trimmed.includes('.')) {
    const [, ...rest] = trimmed.split('.');
    const sanitizedValue = rest.map(s => s.trim()).join('');
    return `.${sanitizedValue}`;
  }

  return '';
};

/**
 * Check if a file matches a list of provided accept criteria
 * @see https://codepen.io/schilchSICKAG/pen/XWLKEyZ
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/accept
 * @param f The file to check
 * @param criteria The criteria to check against
 * @returns True if the file matches the criteria, false otherwise
 */
export const fileHasValidAcceptType = (f: File, accept: string[]) => {
  // Always allow empty accept attributes
  if (accept.length === 0) {
    return true;
  }

  const { type } = f;
  const [prefix, suffix] = type.split('/');

  if (!prefix || !suffix) {
    return false;
  }

  return accept.some(crit => {
    if (crit.endsWith('/*')) {
      const [critPrefix] = crit.split('/');
      return critPrefix === prefix;
    }
    return type === crit;
  });
};

/**
 * Get an array of strings representing accept criteria
 * @param accept The html attributes accept string
 * @returns String array of the accept criteria
 */
export const acceptStringToArray = (accept: string) => accept
  .trim()
  .split(',')
  .map(sanitizeSpecifier)
  .filter(Boolean);
