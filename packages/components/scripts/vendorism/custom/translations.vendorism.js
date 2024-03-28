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
    (acc, [key, value]) => `${acc}${key}: '${value}',\n`,
    '',
  );

/**
 * Add additional translations to the localize types file
 * @param {string} content The content of the localize file
 * @param {string[]} additionalItems Additional items to add
 * @returns {string}
 */
const vendorLocalize = (content, additionalItems) => {
  const additionalTypes = additionalItems.map(item => `  ${item}: string;`).join('\n');
  return content.replace(
    '$code',
    `${additionalTypes}\n$code`,
  );
};

/**
 * Handle vendoring of custom translations and localize types
 * @param {string} path
 * @param {string} content
 * @returns {Object}
 */
export const vendorTranslations = (path, content) => {
  if (
    !path.includes('translations')
    && !path.endsWith('localize.ts')
  ) {
    return {
      content,
      path,
    };
  }

  // Get the language code from the path
  const usedLanguage = path.split('/').at(-1).split('.').at(0);
  const additionalTranslations = getTranslationsForLanguage(usedLanguage);
  const additonalTranslationsAsString = getTranslationTableAsString(additionalTranslations);

  // Handle the localize files types
  if (path.endsWith('localize.ts')) {
    return {
      content: vendorLocalize(content, Object.keys(additionalTranslations)),
      path,
    };
  }

  // Adjust the translation table automatically
  const finalContent = content.replace(
    `'
};`,
    `',
  ${additonalTranslationsAsString}};`,
  );

  return {
    content: finalContent,
    path,
  };
};
