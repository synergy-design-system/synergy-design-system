// Make sure chromatic supports dark mode
// @see https://www.chromatic.com/docs/themes/
export const SICK_2025_LIGHT = '🌞 SICK 2025 Light';
export const SICK_2025_DARK = '🌙 SICK 2025 Dark';

export const LIGHT_THEME = '🌞 SICK 2018 Light';
export const DARK_THEME = '🌙 SICK 2018 Dark';

export const Chromatic_Modes_Sick_2018 = {
  [LIGHT_THEME]: {
    theme: LIGHT_THEME,
  },
  [DARK_THEME]: {
    theme: DARK_THEME,
  },
};

export const Chromatic_Modes_Sick_2025 = {
  [SICK_2025_LIGHT]: {
    theme: SICK_2025_LIGHT,
  },
  [SICK_2025_DARK]: {
    theme: SICK_2025_DARK,
  },
};

export const Chromatic_Modes_All = {
  ...Chromatic_Modes_Sick_2018,
  ...Chromatic_Modes_Sick_2025,
};
