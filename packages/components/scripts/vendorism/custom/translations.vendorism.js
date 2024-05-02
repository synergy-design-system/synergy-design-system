/**
 * Static translations table
 */
const translations = {
  closeMenu: {
    de: 'Menu schließen',
    en: 'Close menu',
  },
  danger: {
    de: 'Gefahr',
    en: 'Danger',
  },
  notification: {
    de: 'Benachrichtigung',
    en: 'Notification',
  },
  menu: {
    de: 'Menu',
    en: 'Menu',
  },
  openMenu: {
    de: 'Menu öffnen',
    en: 'Open menu',
  },
  sideNav: {
    de: 'Seitennavigation',
    en: 'Side navigation',
  },
  success: {
    de: 'Erfolg',
    en: 'Success',
  },
  warning: {
    de: 'Warnung',
    en: 'Warning',
  },
};

/**
 * Get a translation table for a given key and language
 * Will automatically fall back to english if no language string can be found
 * @param {string} language
 * @returns Object of key value pairs for the given language
 */
const getTranslationsForLanguage = (language) => Object
  .entries(translations)
  .reduce((acc, [key, value]) => ({
    ...acc,
    [key]: value[language] ?? value.en,
  }), {});

/**
 * Get a translation table as a string
 * @param {Object} table The translation table to convert
 * @returns {string}
 */
const getTranslationTableAsString = (table) => Object
  .entries(table)
  .reduce(
    (acc, [key, value]) => `${acc}${key}: '${value}',\n  `,
    '',
  );

/**
 * Add additional translations to the localize types file
 * @param {string} path The path of the file
 * @param {string} originalContent The content of the localize file
 * @returns {string}
 */
export const vendorLocalize = (path, originalContent) => {
  if (!path.endsWith('localize.ts')) {
    return {
      content: originalContent,
      path,
    };
  }

  const additionalItems = Object.keys(getTranslationsForLanguage('en')).sort();
  const additionalTypes = additionalItems.map((item, index) => `${index > 0 ? '  ' : ''}${item}: string;`).join('\n');

  const content = originalContent.replace(
    '$code',
    `${additionalTypes}\n\n  $code`,
  );

  return {
    content,
    path,
  };
};

/**
 * Handle vendoring of custom translations and localize types
 * @param {string} path
 * @param {string} content
 * @returns {Object}
 */
export const vendorTranslations = (path, content) => {
  if (!path.includes('translations')) {
    return {
      content,
      path,
    };
  }

  // Get the language code from the path
  const usedLanguage = path.split('/').at(-1).split('.').at(0);
  const additionalTranslations = getTranslationsForLanguage(usedLanguage);
  const additionalTranslationsAsString = getTranslationTableAsString(additionalTranslations);

  // Adjust the translation table automatically
  const finalContent = content.replace(
    `'
};`,
    `',

  // Automatically generated custom translations.
  // @see scripts/vendorism/translations.vendorism.js
  ${additionalTranslationsAsString.trimRight()}
};`,
  );

  return {
    content: finalContent,
    path,
  };
};
