import type * as SynTypes from '../synergy.js';

type SettingKey = keyof typeof SynTypes | 'default';
type Setting = Partial<Record<SettingKey, string>>;
type ElementSettings = Record<keyof typeof globalSettings, string>;

export type SynSettings = Record<string, Setting>;

/**
 * Global settings object for all components.
 * This object is used to set default values for all components.
 */
const globalSettings: SynSettings = {
  /**
   * Sets the default size for all components.
   */
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
    }, ({} as ElementSettings));
  return allElementSettings;
};

/**
 * Set a new value for a specific setting
 * @param key The key of the setting to set.
 * @param value The value to set.
 * @param element The element to set the value for.
 * @returns True if the setting was set, false if the setting does not exist.
 */
export const setSetting = (
  key: keyof typeof globalSettings,
  value?: string | undefined,
  element: SettingKey = 'default',
) => {
  if (!globalSettings[key]) {
    return false;
  }
  globalSettings[key][element] = value;
  return true;
};
