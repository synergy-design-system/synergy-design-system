/* eslint-disable no-underscore-dangle */
import type { PropertyValues } from 'lit';
import type SynergyElement from '../../internal/synergy-element.js';
import { type ComponentNamesWithDefaultValues } from './base.js';
import {
  addGlobalEventNotification,
  extractDefaultSettingsForElement,
  removeGlobalEventNotification,
} from './functions.js';
import type { SynDefaultChangedAttribute } from '../../events/events.js';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Constructor<T = object> = new (...args: any[]) => T;

/**
 * Global settings decorator for a synergy component
 * Used in conjunction with the global settings event
 *
 * @param name The components name. This is used to get the default values for the component
 * @returns Decorated class for usage with synergy components
 */
export function enableDefaultSettings(name: ComponentNamesWithDefaultValues) {
  return <T extends Constructor<SynergyElement>>(Proto: T): T => class extends Proto {
    #globalSettingsSetupComplete = false;

    #initialGlobalSettingEmptyProperties = new Map<string, unknown>();

    // eslint-disable-next-line class-methods-use-this
    get __originalDecoratedClassName() {
      return name;
    }

    /**
     * Override the global settings for the element
     * Called from the global settings event
     * @param changedProperties The properties that have changed
     */
    overrideGlobalSettings(changedProperties: SynDefaultChangedAttribute[]) {
      // Adjust the attribute if they where not initially set on the element
      changedProperties.forEach((prop) => {
        if (this.#initialGlobalSettingEmptyProperties.has(prop.attribute)) {
          // @ts-expect-error We don´t know the type of the key,
          // but are pretty sure it exists on the element
          this[prop.attribute as keyof this] = prop.newValue;
        }
      });
    }

    disconnectedCallback() {
      super.disconnectedCallback();
      // Always remove the component from the global notification list
      removeGlobalEventNotification(this);
    }

    protected willUpdate(changedProps: PropertyValues): void {
      super.willUpdate(changedProps);

      // Skip after the first run
      if (this.#globalSettingsSetupComplete) {
        return;
      }

      this.#globalSettingsSetupComplete = true;

      // Get the default settings
      const defaults = extractDefaultSettingsForElement(name);

      const systemDefaults = extractDefaultSettingsForElement(name, 'initial');

      // Set the default values for all items that have no current value set
      Object
        .entries(defaults)
        .forEach(([key, value]) => {
          const currentProp = this[key as keyof this];
          const originalDefaultSetting = systemDefaults[key];

          // On initial load, the attribute is not set, but the property is.
          // We have to check if the current PROPERTY is the same as the default value
          // If it is, we set the attribute to the default value and add a notification item
          // to the initialGlobalSettingEmptyProperties map
          if (currentProp === originalDefaultSetting) {
            this.#initialGlobalSettingEmptyProperties.set(key, currentProp);
            // @ts-expect-error We don´t know the type of the key,
            // but are pretty sure it exists on the element
            this[key] = value;
          }
        });

      // If there where any values, add the item to the global notification list
      if (this.#initialGlobalSettingEmptyProperties.size > 0) {
        addGlobalEventNotification(this);
      }
    }
  };
}
