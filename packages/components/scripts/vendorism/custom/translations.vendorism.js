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
  const content = originalContent
    // Add translation for the side navigation
    .replace(
      'showPassword: string;',
      `showPassword: string;
  sideNav: string;`,
    )

    // Add translation for the open burger menu icon of header
    .replace(
      'numOptionsSelected: (num: number) => string;',
      `numOptionsSelected: (num: number) => string;
  openMenu: string;`,
    )

    // Add translation for the close burger menu icon of header
    .replace(
      'close: string;',
      `close: string;
  closeMenu: string;`,
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
  const content = originalContent
    // Add translation for the side navigation
    .replace(
      "showPassword: 'Passwort anzeigen',",
      `showPassword: 'Passwort anzeigen',
  sideNav: 'Seitennavigation',`,
    )

    // Add translation for the open burger menu icon of header
    .replace(
      `    return \`\${num} Optionen ausgewählt\`;
  },`,
  `    return \`\${num} Optionen ausgewählt\`;
  },
  openMenu: 'Menü öffnen',`,
    )

    // Add translation for the close burger menu icon of header
    .replace(
      "close: 'Schließen',",
      `close: 'Schließen',
  closeMenu: 'Menü schließen',`,
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
  const content = originalContent
    // Add translation for the side navigation
    .replace(
      "showPassword: 'Show password',",
      `showPassword: 'Show password',
  sideNav: 'Side navigation',`,
    )

    // Add translation for the open burger menu icon of header
    .replace(
      `    return \`\${num} options selected\`;
  },`,
  `    return \`\${num} options selected\`;
  },
  openMenu: 'Open menu',`,
    )

    // Add translation for the close burger menu icon of header
    .replace(
      "close: 'Close',",
      `close: 'Close',
  closeMenu: 'Close menu',`,
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
