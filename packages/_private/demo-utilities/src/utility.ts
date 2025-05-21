import type {
  AllowedModes,
  AllowedThemes,
  SideNavTypes,
  Theme,
} from './types.js';

/**
 * Capitalizes the first letter of a string
 * @param s string to be capitalized
 * @returns Capitalized string
 */
export const capitalize = (s: string) => s && s[0].toUpperCase() + s.slice(1);

export const noop = () => null;

export const currencyNumberFormatter = new Intl.NumberFormat('de-DE', {
  currency: 'EUR',
  maximumFractionDigits: 0,
  style: 'currency',
});

/**
 * Set the sidenav to one of the three possible layouts
 * @param layout The layout to use
 * @returns The next layout
 */
export const setNextSidenavLayout = (layout: SideNavTypes): SideNavTypes => {
  switch (layout) {
  case 'rail': return 'sticky';
  case 'sticky': return 'default';
  default: return 'rail';
  }
};

/**
 * Get the list of available themes
 * @returns List of available themes
 */
export const getAvailableThemes = (): Record<AllowedThemes, Theme> => ({
  2018: {
    modes: ['light', 'dark'],
    name: '2018',
    title: 'SICK 2018',
  },
  2025: {
    modes: ['light', 'dark'],
    name: '2025',
    title: 'SICK 2025',
  },
});

/**
 * Sets the body class to the given theme and mode
 * @param theme The theme to use. Either brand25 or synergy
 * @param mode The mode for the theme. Either light or dark
 */
export const setTheme = (theme: AllowedThemes, mode: AllowedModes) => {
  const nextClassName = `syn-sick-${theme}-${mode}`;

  const { body } = document;

  // Skip, there is nothing to do as its the same theme and mode
  if (body.classList.contains(nextClassName)) {
    return;
  }

  body.classList.remove('syn-sick-2018-light', 'syn-sick-2018-dark', 'syn-sick-2025-light', 'syn-sick-2025-dark');
  body.classList.add(nextClassName);
};

/**
 * Set the theme based on the given option string.
 * Usually called from a syn-select that holds the templates
 * @param optionString The option string to parse. It should be in the format of "theme-mode"
 * @throws Error if the option string is invalid
 */
export const setThemeFromOptionString = (optionString: string) => {
  const [theme, mode] = optionString.split('-') as [AllowedThemes, AllowedModes];

  if (!theme || !mode) {
    throw new Error(`Invalid theme or mode: ${optionString}`);
  }

  setTheme(theme, mode);
};
