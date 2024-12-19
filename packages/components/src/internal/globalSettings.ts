import type * as SynTypes from '../synergy.js';

type Setting = Partial<Record<keyof typeof SynTypes | 'default', string>>;

export type SynSettings = Record<string, Setting>;

/**
 * Global settings object for all components.
 * This object is used to set default values for all components.
 */
const globalSettings: SynSettings = {
  size: {
    default: 'medium',
    SynButton: 'small',
  },
};

/**
 * Get all settings
 * @returns The global settings object.
 */
export const getSettings = () => globalSettings;

/**
 * Get a specific setting
 * @param element The element to get the setting for.
 * @param key The key of the setting to get.
 * @returns The setting value.
 */
export const getSetting = (element: keyof typeof SynTypes, key: keyof Setting) => {
  const elementSetting = globalSettings?.[key]?.[element];
  return elementSetting ?? globalSettings?.[key]?.default;
};

export const extractSettingsForElement = (element: keyof typeof SynTypes) => {
  const allElementSettings = Object
    .entries(globalSettings)
    .reduce((acc, [key, value]) => {
      const elementSetting = value[element];
      if (elementSetting) {
        acc[key] = elementSetting;
      }
      return acc;
    }, {});
  return allElementSettings;
};
