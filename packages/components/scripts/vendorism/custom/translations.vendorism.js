/**
 * Static translations table
 */
const translations = {
  closeMenu: {
    de: 'Menü schließen',
    en: 'Close menu',
  },
  danger: {
    de: 'Gefahr',
    en: 'Danger',
  },
  menu: {
    de: 'Menü',
    en: 'Menu',
  },
  notification: {
    de: 'Benachrichtigung',
    en: 'Notification',
  },
  openMenu: {
    de: 'Menü öffnen',
    en: 'Open menu',
  },
  rangeMax: {
    de: 'Maximum',
    en: 'Maximum',
  },
  rangeMin: {
    de: 'Minimum',
    en: 'Minimum',
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
    (acc, [key, value]) => {
      const val = typeof value === 'function' ? value : `'${value}'`;
      return `${acc}${key}: ${val},\n  `;
    },
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
  const additionalTypes = additionalItems.map((item, index) => {
    const extendedType = translations[item].type ?? 'string';
    return `${index > 0 ? '  ' : ''}${item}: ${extendedType};`;
  }).join('\n');

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
