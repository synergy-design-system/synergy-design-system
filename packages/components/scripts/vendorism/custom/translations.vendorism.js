const FILES_TO_TRANSFORM = [
  'translations/en.ts',
  'translations/de.ts',
  'utilities/localize.ts',
];

/**
 * Transform the translation type
 * @param {String} path
 * @param {String} originalContent
 * @returns
 */
const transformTranslationType = (path, originalContent) => {
  const content = originalContent.replaceAll(
    'showPassword: string;',
    `showPassword: string;
  sideNav: string;`,
  );
  return {
    content,
    path,
  };
};

/**
 * Transform the german translation file
 * @param {String} path
 * @param {String} originalContent
 * @returns
 */
const transformGerman = (path, originalContent) => {
  const content = originalContent.replaceAll(
    "showPassword: 'Passwort anzeigen',",
    `showPassword: 'Passwort anzeigen',
  sideNav: 'Seitennavigation',`,
  );
  return {
    content,
    path,
  };
};

/**
 * Transform the english translation file
 * @param {String} path
 * @param {String} originalContent
 * @returns
 */
const transformEnglish = (path, originalContent) => {
  const content = originalContent.replaceAll(
    "showPassword: 'Show password',",
    `showPassword: 'Show password',
  sideNav: 'Side navigation',`,
  );
  return {
    content,
    path,
  };
};

export const vendorTranslations = (path, content) => {
  const output = { content, path };

  // Skip for non select
  const isValidFile = !!FILES_TO_TRANSFORM.find(p => path.includes(p));

  if (!isValidFile) {
    return output;
  }

  if (path.endsWith('localize.ts')) {
    return transformTranslationType(path, content);
  }

  if (path.endsWith('de.ts')) {
    return transformGerman(path, content);
  }

  if (path.endsWith('en.ts')) {
    return transformEnglish(path, content);
  }

  return output;
};
