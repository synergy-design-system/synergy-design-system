import fs from 'fs/promises';
import path from 'path';
import {
  createHeader,
  formatFile,
  getExportsListFromFileSystem,
  getManifestData,
  job,
} from '../shared.js';

const getDefaultAttributes = attributes => attributes.filter(
  attr => attr.default !== undefined && !!attr.default && attr.default !== "''",
);

/**
 * Get an object representing the default settings for each component
 * @param {array} components The components
 * @param {string[]} whiteListedAttributes List of whitelisted attributes that should be in the map
 * @returns {object} The key value attributes object
 */
const createSynDefaultSettingsStructure = (components, whiteListedAttributes = []) => components
  // 1. Get a list of all items that have attributes with default values
  .filter(({ attributes }) => attributes && getDefaultAttributes(attributes).length > 0)
  // 2. Create a new array that contains the component name and the attributes with default values
  .map(({ attributes, name }) => ({
    attributes: getDefaultAttributes(attributes),
    name,
  }))
  // 3. Create an array that includes the component name and default attribute names
  .map(({ attributes, name }) => [name, attributes.map(attr => attr.name)])
  // 4: Reverse the map, create an object that has the attributes as key and components as values
  // Also make sure to only include whitelisted attributes!
  .reduce((acc, [name, attributes]) => {
    attributes.forEach(attr => {
      if (whiteListedAttributes.length && !whiteListedAttributes.includes(attr)) {
        return;
      }
      if (!acc[attr]) {
        acc[attr] = [];
      }
      acc[attr].push(name);
    });
    return acc;
  }, {});

/**
 * Create the typescript type for settings
 * @param {array} components The components to get the defaults for
 * @param {string[]} whiteListedAttributes List of attributes to whitelist
 * @returns {string} The created type as a string
 */
const createSynDefaultSettingsType = (components, whiteListedAttributes = []) => {
  const structure = Object
    .entries(createSynDefaultSettingsStructure(components, whiteListedAttributes))
    .reduce((acc, [attr, comp]) => {
      const componentTypes = comp.map(c => `${c}?: AllowedValueForDefaultSetting<${c}, '${attr}'>;`);
      return `${acc}${attr}: {
        ${componentTypes.join('\n')}
      },`;
    }, '');

  return `
    /**
     * Default settings map for all component values that have defaults set
     */
    export type SynDefaultSettings = {${structure}};
  `;
};

const createDefaultSettingsExport = (components, whiteListedAttributes = []) => {
  const structure = Object
    .entries(createSynDefaultSettingsStructure(components, whiteListedAttributes))
    // 1. Create a new array that includes
    // the attribute as key and a tuple of component names and default values as value
    .map(([attr, cList]) => {
      const componentListWithDefaults = cList.map(c => {
        const foundComponent = components.find(({ name }) => name === c);
        const defaultValue = foundComponent?.attributes.find(({ name }) => name === attr);
        return [c, defaultValue?.default];
      });
      return [attr, componentListWithDefaults];
    })
    // 2. Create the string representation of the object
    .reduce((acc, [attr, cList]) => `
      ${acc}${attr}: {
        ${cList.map(([c, d]) => `${c}: ${d},`).join('\n')}
      },
    `, '');

  return `
    /**
     * Default settings for all components
     */
    export const defaultSettings: SynDefaultSettings = {${structure}};

    /**
     * Initial default settings for all components
     */
    export const INITIAL_DEFAULT_SETTINGS: SynDefaultSettings = {${structure}};
  `;
};

const createDefaultExtractorExport = () => `
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
    // Check if we have the settings in cache
    // if (elementPropertyCache.has(component)) {
    //   return elementPropertyCache.get(component)!;
    // }

    const store = from === 'default' ? defaultSettings : INITIAL_DEFAULT_SETTINGS;

    const allElementSettings = Object
      .entries(store)
      .reduce((acc: Record<string, unknown>, [key, value]) => {
        const elementSetting = value[component as keyof SynDefaultSettings[keyof SynDefaultSettings]];
        if (elementSetting) {
          acc[key] = elementSetting;
        }
        return acc;
      }, ({}));
    elementPropertyCache.set(component, allElementSettings);
    return allElementSettings;
  };
`;

const createElementSetterExport = () => `
  /**
   * Set the default values for a given component
   * @param component The component to set the defaults for
   * @param newValues Map of new values to set
   */
  export const setDefaultSettingsForElement = <C extends SynergyElement>(
    component: ComponentNamesWithDefaultValues,
    newValues: Partial<ExtractSettingsForElement<C>>,
  ) => {
    Object
      .entries(newValues)
      .forEach(([key, value]) => {
        if (defaultSettings[key as keyof SynDefaultSettings]) {
          (defaultSettings[key as keyof SynDefaultSettings] as Record<string, unknown>)[component] = value as AllowedValueForDefaultSetting<C, keyof C>;
        }
      });

    return defaultSettings;
  };
`;

const createGlobalSetterExport = () => `
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
            defaultSettings[key as keyof SynDefaultSettings] as Record<
              string,
              unknown
            >
          )[component] = newValue;
        });
      }
    });

    // Fire the change event
    const event = new CustomEvent<typeof detail>("syn-default-settings-changed", {
      detail,
      bubbles: true,
    });
    dispatchEvent(event);

    return defaultSettings;
  };
`;

const createTypeImports = async (componentsHavingDefaults) => {
  const componentExports = await getExportsListFromFileSystem();

  const typeImports = componentExports
    .filter(c => componentsHavingDefaults.has(c.componentClass))
    .map(c => `import type ${c.componentClass} from '../${c.componentImportPath}';`);
  typeImports.push("import type SynergyElement from './synergy-element.js';");
  typeImports.push("import type { SynDefaultChangedAttribute } from '../events/events.js';");
  return typeImports;
};

export const createDefaultSettings = job('Synergy: Creating default settings helper...', async (
  componentDistDir,
  componentsDir,
) => {
  const defaultSettingsFile = path.join(componentsDir, 'src/internal/defaultSettings.ts');

  const metadata = await getManifestData(componentDistDir);

  // List of attributes we want to allow an override for
  const whiteListedAttributes = ['size', 'variant'];

  // Create a list of type imports
  // Make sure to just include files that acutally have defaults
  const componentsHavingDefaults = new Set(
    Object
      .values(createSynDefaultSettingsStructure(metadata, whiteListedAttributes))
      .flat()
      .sort(),
  );

  const typeImports = await createTypeImports(componentsHavingDefaults);

  // Create the needed types
  const coreTypes = [
    `
      /**
       * Allows for partial recursive types
       */
      type RecursivePartial<T> = {
        [P in keyof T]?: T[P] extends object ? RecursivePartial<T[P]> : T[P];
      };
    `,
    `
      /**
       * Allowed value for a default setting
       * Gets the value of a given attribute for a given component
       */
      type AllowedValueForDefaultSetting<Elm extends SynergyElement, Attr extends keyof Elm> = Elm[Attr];
    `,
    `
      /**
       * List of all components that have default values
       */
      export type ComponentNamesWithDefaultValues = ${Array.from(componentsHavingDefaults).map(c => `'${c}'`).join(' | ')};
    `,
    `
      /**
       * Extracts all available default settings for a given component
       */
      export type ExtractSettingsForElement<C extends SynergyElement> = {
        [key in keyof SynDefaultSettings]?: key extends keyof C ? AllowedValueForDefaultSetting<C, key> : never;
      };
    `,
    createSynDefaultSettingsType(metadata, whiteListedAttributes),
  ].filter(Boolean);

  const exports = [
    createDefaultSettingsExport(metadata, whiteListedAttributes),
    createDefaultExtractorExport(),
    createElementSetterExport(),
    createGlobalSetterExport(),
  ];

  const outFile = `
    /* eslint-disable @typescript-eslint/quotes, sort-keys, max-len, operator-linebreak, @typescript-eslint/indent */
    ${createHeader()}

    // Type imports
    ${typeImports.join('\n')}

    // Cache for speeding up lookups
    const elementPropertyCache = new Map<ComponentNamesWithDefaultValues, Record<string, unknown>>();

    // Core types
    ${coreTypes.join('\n')}

    // Exports
    ${exports.join('\n')}
  `;

  await fs.writeFile(defaultSettingsFile, outFile, 'utf-8');
  await formatFile(defaultSettingsFile, 'typescript');
});
