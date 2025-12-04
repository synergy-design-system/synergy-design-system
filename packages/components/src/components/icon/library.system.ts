/* eslint-disable */
import type { IconLibrary } from './library.js';
import { icons as sick2018Icons } from './sick2018-system-icons.js';
import { icons as sick2025Icons } from './sick2025-system-icons.js';

export type AvailableSystemIcons = 'sick2018' | 'sick2025';

/**
 * The current system icon library.
 * Defaults to 2018 for Synergy V2, will point to 2025 for Synergy V3.
 * This can be changed at runtime, but should not be done in production.
 * The system icon library is used by Synergy components to ensure consistent icons across the application.
 */
let icons = sick2018Icons;

/**
 * Set the current system icon library.
 * @param library - The system icon library to set.
 */
export const setSystemIconLibrary = (library?: AvailableSystemIcons) => {
  switch (library) {
    case 'sick2025':
      icons = sick2025Icons;
      break;
    case 'sick2018':
    default:
      icons = sick2018Icons;
      break;
  }
};

// System icons are a separate library to ensure they're always available, regardless of how the default icon library is
// configured or if its icons resolve properly.
//
// All Synergy components must use the system library instead of the default library. For visual consistency, system
// icons are a subset of Synergy Icons.
const systemLibrary: IconLibrary = {
  name: 'system',
  resolver: (name: keyof typeof icons) => {
    if (name in icons) {
      return icons[name];
    }
    return '';
  }
};

export default systemLibrary;
