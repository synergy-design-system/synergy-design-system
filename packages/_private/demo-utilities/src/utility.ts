import type {
  AllowedModes,
  AllowedThemes,
  SideNavTypes
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
 * Sets the body class to the given theme and mode
 * @param theme The theme to use. Either brand25 or synergy
 * @param mode The mode for the theme. Either light or dark
 */
export const setTheme = (theme: AllowedThemes, mode: AllowedModes) => {
  const nextClassName = theme === 'brand25'
    ? `syn-theme-brand25-${mode}`
    : `syn-theme-${mode}`;

  const { body } = document;

  // Skip, there is nothing to do as its the same theme and mode
  if (body.classList.contains(nextClassName)) {
    return;
  }

  body.classList.remove('syn-theme-light', 'syn-theme-dark', 'syn-theme-brand25-light', 'syn-theme-brand25-dark');
  body.classList.add(nextClassName);
};


