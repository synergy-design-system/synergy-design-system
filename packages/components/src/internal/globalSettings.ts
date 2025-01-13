/* eslint-disable @typescript-eslint/no-explicit-any */
import type { PropertyValues } from 'lit';
import type SynergyElement from './synergy-element.js';
import { type ComponentNamesWithDefaultValues, extractDefaultSettingsForElement } from './defaultSettings.js';
import type { SynDefaultSettingsChangedEvent } from '../events/events.js';

type Constructor<T = object> = new (...args: any[]) => T;

export function globalSettingsDecorator() {
  return <T extends Constructor<SynergyElement>>(Proto: T): T => class extends Proto {
    #globalSettingsSetupComplete = false;

    #initialGlobalSettingEmptyProperties = new Map<string, unknown>();

    #overrideWithGlobalSettings = (e: SynDefaultSettingsChangedEvent) => {
      const { detail } = e;
      const component = Proto.name as ComponentNamesWithDefaultValues;

      // Skip if the component is not in the event
      if (!detail[component]) {
        return;
      }

      const newValues = detail[component];

      // Adjust the attribute if they where not initially set on the element
      newValues.forEach((prop) => {
        if (this.#initialGlobalSettingEmptyProperties.has(prop.attribute)) {
          // @ts-expect-error We don´t know the type of the key,
          // but are pretty sure it exists on the element
          this[prop.attribute as keyof this] = prop.newValue;
          // this.setAttribute(prop.attribute, prop.newValue as string);
        }
      });
    };

    connectedCallback() {
      super.connectedCallback();

      const defaults = extractDefaultSettingsForElement(
        Proto.name as ComponentNamesWithDefaultValues,
      );

      if (Object.keys(defaults).length > 0) {
        window.addEventListener('syn-default-settings-changed', this.#overrideWithGlobalSettings, {
          capture: true,
        });
      }
    }

    disconnectedCallback() {
      window.removeEventListener(
        'syn-default-settings-changed',
        this.#overrideWithGlobalSettings,
        {
          capture: true,
        },
      );
    }

    protected willUpdate(changedProps: PropertyValues): void {
      super.willUpdate(changedProps);

      // Skip after the first run
      if (this.#globalSettingsSetupComplete) {
        return;
      }

      this.#globalSettingsSetupComplete = true;

      // Get the default settings
      const defaults = extractDefaultSettingsForElement(
        Proto.name as ComponentNamesWithDefaultValues,
      );

      const systemDefaults = extractDefaultSettingsForElement(
        Proto.name as ComponentNamesWithDefaultValues,
        'initial',
      );

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
    }
  };
}
