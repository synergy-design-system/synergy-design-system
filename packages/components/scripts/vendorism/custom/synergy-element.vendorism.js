import { addSectionsAfter } from '../replace-section.js';

export const vendorSynergyElement = (path, content) => {
  if (!path.endsWith('synergy-element.ts')) {
    return {
      content,
      path,
    };
  }

  const newContent = addSectionsAfter([
    // Add default setting export
    [
      "'lit/decorators.js';",
      "import { extractDefaultSettingsForElement, type ComponentNamesWithDefaultValues } from './defaultSettings.js';",
    ],
    // Create the overrideGlobal method
    [
      '#hasRecordedInitialProperties = false;',
      `
  private overrideWithGlobalSettings() {
    // Set the default settings for the element
    const defaultSettings = extractDefaultSettingsForElement(this.constructor.name as ComponentNamesWithDefaultValues);
    Object
      .entries(defaultSettings)
      .forEach(([prop, value]) => {
        (this as Record<string, unknown>)[prop] = value;
      });
  }
      `,
    ],
    // Add the initialDefaultProperties map
    [
      'initialReflectedProperties: Map<string, unknown> = new Map();',
      `
  // List of properties that are set to their default values
  initialDefaultProperties: Map<string, unknown> = new Map();
      `,
    ],
    // Add initial property setting
    [
      'if (!this.#hasRecordedInitialProperties) {',
      `
      // Set the initial properties.
      // We keep track of the initial properties so we can revert them if the default settings change.
      const defaultSettings = extractDefaultSettingsForElement(this.constructor.name as ComponentNamesWithDefaultValues);
      Object
        .entries(defaultSettings)
        .forEach(([prop, value]) => {
          if (this[prop as keyof typeof this & string] !== value) {
            this.initialDefaultProperties.set(prop, this[prop as keyof typeof this & string]);
          }
      });
    `,
    ],
    // Add the event listener for the default settings change
    [
      'this.#hasRecordedInitialProperties = true;',
      `
      window.addEventListener('syn-default-settings-changed', e => {
        const { detail } = e;
        const component = this.constructor.name as ComponentNamesWithDefaultValues;

        if (!detail[component]) {
          return;
        }

        const newValues = detail[component];

        // Adjust the initialReflectedProperties to match the new default settings
        newValues.forEach((prop) => {
          if (this.initialReflectedProperties.has(prop.attribute)) {
            this.initialReflectedProperties.set(prop.attribute, prop.newValue);
          }
        });

        // Adjust the attribute if they are not already set
        newValues.forEach((prop) => {        
          if (
            !this.initialDefaultProperties.has(prop.attribute) &&
            this[prop.attribute as keyof typeof this & string] !== prop.newValue
          ) {
            (this as Record<string, unknown>)[prop.attribute] = prop.newValue;
          }
        });
      }, {
        capture: true,
      });
      `,
    ],
    // Add the override to connectedCallback
    [
      `super.attributeChangedCallback(name, oldValue, newValue);
  }`,
      `  connectedCallback(): void {
    super.connectedCallback();
    this.overrideWithGlobalSettings();
  }`,
    ],
  ], content);

  return {
    content: newContent,
    path,
  };
};
