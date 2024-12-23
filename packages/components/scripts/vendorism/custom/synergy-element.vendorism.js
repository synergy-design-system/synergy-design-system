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
      "import { extractSettingsForElement, type ComponentNamesWithDefaultValues } from './defaultSettings.js';",
    ],
    // Create the overrideGlobal method
    [
      '#hasRecordedInitialProperties = false;',
      `
  private overrideWithGlobalSettings() {
    // Set the default settings for the element
    const defaultSettings = extractSettingsForElement(this.constructor.name as ComponentNamesWithDefaultValues);
    Object
      .entries(defaultSettings)
      .forEach(([prop, value]) => {
        (this as Record<string, unknown>)[prop] = value;
      });
  }
      `,
    ],
    // Add the override to attributeChangedCallback
    [
      'this.#hasRecordedInitialProperties = true;',
      'this.overrideWithGlobalSettings();',
    ],
  ], content);

  return {
    content: newContent,
    path,
  };
};
