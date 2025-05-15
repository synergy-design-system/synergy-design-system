import { type SideNavTypes } from './types.js';

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
