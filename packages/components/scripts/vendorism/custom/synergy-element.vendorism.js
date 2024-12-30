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
