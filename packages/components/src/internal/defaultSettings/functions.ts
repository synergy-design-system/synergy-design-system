/* eslint-disable no-underscore-dangle */
import type SynergyElement from '../synergy-element.js';
import {
  type AllowedValueForDefaultSetting,
  type ComponentNamesWithDefaultValues,
  type ExtractSettingsForElement,
  type GlobalSettingsEnabledElement,
  INITIAL_DEFAULT_SETTINGS,
  type RecursivePartial,
  type SynDefaultSettings,
  defaultSettings,
} from './base.js';
import type { SynDefaultChangedAttribute, SynDefaultSettingsChangedEvent } from '../../events/events.js';

/**
 * Whether to emit events when the default settings change
 */
let SYNERGY_EXPERIMENTAL_SETTING_EMIT_EVENTS = false;

/**
 * Internal flag to check if the global event listeners have been set up
 */
let hasGlobalEventSetup = false;

// Cache for speeding up lookups
const elementPropertyCache = new Map<ComponentNamesWithDefaultValues, Record<string, unknown>>();

/**
 * List of all components that have default values
 */
const globalEventNotificationMap = new Set<GlobalSettingsEnabledElement>();

/**
 * The default setting update handler that is bound to the global event
 * @param e The syn-default-settings-change-event emitted
 */
function defaultSettingsHandler(e: SynDefaultSettingsChangedEvent) {
  const { detail } = e;
  Object.entries(detail).forEach(([componentName, changes]) => {
    globalEventNotificationMap.forEach(element => {
      if (
        element.__originalDecoratedClassName !== 'undefined'
        && element.__originalDecoratedClassName === componentName
      ) {
        element.overrideGlobalSettings(changes);
      }
    });
  });
}

/**
 * Enables or disables the experimental setting to emit events when the default settings change
 * @param enabled Whether to enable or disable the experimental setting
 */
export const enableExperimentalSettingEmitEvents = (enabled = true) => {
  SYNERGY_EXPERIMENTAL_SETTING_EMIT_EVENTS = enabled;

  if (!enabled) {
    hasGlobalEventSetup = false;
    window.removeEventListener('syn-default-settings-changed', defaultSettingsHandler, {
      capture: true,
    });
    return;
  }

  if (enabled && !hasGlobalEventSetup) {
    hasGlobalEventSetup = true;
    window.addEventListener('syn-default-settings-changed', defaultSettingsHandler, {
      capture: true,
    });
  }
};

/**
 * Adds an element to the global event notification map
 * Does not have any effect when SYNERGY_EXPERIMENTAL_SETTING_EMIT_EVENTS is false
 * @param element The element to add
 */
export const addGlobalEventNotification = (
  element: GlobalSettingsEnabledElement,
) => {
  if (
    SYNERGY_EXPERIMENTAL_SETTING_EMIT_EVENTS
    && !globalEventNotificationMap.has(element)
  ) {
    globalEventNotificationMap.add(element);
  }
};

/**
 * Removes an element from the global event notification map
 * Does not have any effect when SYNERGY_EXPERIMENTAL_SETTING_EMIT_EVENTS is false
 * @param element The element to remove
 */
export const removeGlobalEventNotification = (
  element: GlobalSettingsEnabledElement,
) => {
  if (
    SYNERGY_EXPERIMENTAL_SETTING_EMIT_EVENTS
    && globalEventNotificationMap.has(element)
  ) {
    globalEventNotificationMap.delete(element);
  }
};

/**
 * Extracts all available default settings for a given component
 * @param component The name of the component to get the settings for
 * @param from The source to get the settings from
 * @returns key value pair of found settings for the given component
 */
export const extractDefaultSettingsForElement = (
  component: ComponentNamesWithDefaultValues,
  from: 'default' | 'initial' = 'default',
) => {
  const store = from === 'default' ? defaultSettings : INITIAL_DEFAULT_SETTINGS;

  // When we have settings in the cache, make sure to use them to speed them up when possible.
  // This is only available when using the default source!
  if (from === 'default') {
    const cachedSettings = elementPropertyCache.get(component);
    if (typeof cachedSettings !== 'undefined') {
      return cachedSettings;
    }
  }

  const allElementSettings = Object.entries(store).reduce(
    (acc: Record<string, unknown>, [key, value]) => {
      const elementSetting = value[component as keyof SynDefaultSettings[keyof SynDefaultSettings]];
      if (elementSetting) {
        acc[key] = elementSetting;
      }
      return acc;
    },
    {},
  );

  // Set the cache item when we are using the default source
  if (from === 'default') {
    elementPropertyCache.set(component, allElementSettings);
  }

  return allElementSettings;
};

/**
 * Set the default values for a given component
 * @param component The component to set the defaults for
 * @param newValues Map of new values to set
 */
export const setDefaultSettingsForElement = <C extends SynergyElement>(
  component: ComponentNamesWithDefaultValues,
  newValues: Partial<ExtractSettingsForElement<C>>,
) => {
  // List of all changes in the default settings
  const detail = {
    [component]: [] as SynDefaultChangedAttribute[],
  } as Record<string, SynDefaultChangedAttribute[]>;

  Object.entries(newValues).forEach(([key, value]) => {
    if (
      defaultSettings[key as keyof SynDefaultSettings]
      && typeof (
        defaultSettings[key as keyof SynDefaultSettings] as Record<string, unknown>
      )[component] !== 'undefined'
    ) {
      detail[component].push({
        attribute: key,
        newValue: value,
        oldValue:
          defaultSettings[key as keyof SynDefaultSettings][
            component as keyof SynDefaultSettings[keyof SynDefaultSettings]
          ],
      });

      (
        defaultSettings[key as keyof SynDefaultSettings] as Record<string, unknown>
      )[component] = value as AllowedValueForDefaultSetting<C, keyof C>;
    }
  });

  // Make sure to clean up the cache when we change the default settings
  const cachedItem = elementPropertyCache.get(component);
  if (typeof cachedItem !== 'undefined') {
    detail[component].forEach(change => {
      cachedItem[change.attribute] = change.newValue;
    });
  }

  // Fire the change event
  if (SYNERGY_EXPERIMENTAL_SETTING_EMIT_EVENTS) {
    const event = new CustomEvent<typeof detail>('syn-default-settings-changed', {
      bubbles: true,
      detail,
    });
    dispatchEvent(event);
  }

  return defaultSettings;
};

/**
 * Set the global default settings
 * @param newSettings The new settings to set
 */
export const setGlobalDefaultSettings = (
  newSettings: RecursivePartial<SynDefaultSettings>,
) => {
  // List of all changes in the default settings
  const detail = {} as Record<string, SynDefaultChangedAttribute[]>;

  Object.entries(newSettings).forEach(([key, value]) => {
    if (defaultSettings[key as keyof SynDefaultSettings]) {
      Object.entries(value).forEach(([component, newValue]) => {
        // Create the component part of details if it does not exist yet
        if (!detail[component]) {
          detail[component] = [];
        }

        // Add the changed attribute to the detail object
        detail[component].push({
          attribute: key,
          newValue: newValue as unknown,
          oldValue:
            defaultSettings[key as keyof SynDefaultSettings][
              component as keyof SynDefaultSettings[keyof SynDefaultSettings]
            ],
        });

        // Set the new value
        (
          defaultSettings[key as keyof SynDefaultSettings] as Record<string, unknown>
        )[component] = newValue;
      });
    }
  });

  // Make sure to update the cache when we change a default settings
  Object
    .entries(detail)
    .forEach(([component, changes]) => {
      const cachedItem = elementPropertyCache.get(component as ComponentNamesWithDefaultValues);
      if (typeof cachedItem !== 'undefined') {
        changes.forEach(change => {
          cachedItem[change.attribute] = change.newValue;
        });
      }
    });

  // Fire the change event
  if (SYNERGY_EXPERIMENTAL_SETTING_EMIT_EVENTS) {
    const event = new CustomEvent<typeof detail>('syn-default-settings-changed', {
      bubbles: true,
      detail,
    });
    dispatchEvent(event);
  }

  return defaultSettings;
};
