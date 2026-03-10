// Make sure chromatic supports dark mode
// @see https://www.chromatic.com/docs/themes/
export const SICK_2025_LIGHT = '🌞 SICK 2025 Light';
export const SICK_2025_DARK = '🌙 SICK 2025 Dark';

export const LIGHT_THEME = '🌞 SICK 2018 Light';
export const DARK_THEME = '🌙 SICK 2018 Dark';

/* eslint-disable sort-keys */
export const ChromaticModesSick2018 = {
  [LIGHT_THEME]: {
    theme: LIGHT_THEME,
  },
  [DARK_THEME]: {
    theme: DARK_THEME,
  },
};
/* eslint-enable sort-keys */

/* eslint-disable sort-keys */
export const ChromaticModesSick2025 = {
  [SICK_2025_LIGHT]: {
    theme: SICK_2025_LIGHT,
  },
  [SICK_2025_DARK]: {
    theme: SICK_2025_DARK,
  },
};
/* eslint-enable sort-keys */

export const ChromaticModesAll = {
  ...ChromaticModesSick2018,
  ...ChromaticModesSick2025,
};

export const SICK_2018_LIGHT_CLASS = 'syn-sick2018-light';
export const SICK_2018_DARK_CLASS = 'syn-sick2018-dark';
export const SICK_2025_LIGHT_CLASS = 'syn-sick2025-light';
export const SICK_2025_DARK_CLASS = 'syn-sick2025-dark';
