import fs from 'fs/promises';
import path from 'path';
import {
  createHeader,
  formatFile,
  getExportsListFromFileSystem,
  getManifestData,
  job,
} from '../shared.js';

/**
 * List of attributes we want to allow an override for
 */
export const ALLOWED_ATTRIBUTES = [
  'delimiter',
  'size',
  'variant',
];

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
    .toSorted() // Make sure the order is always the same
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
    .toSorted() // Make sure the order is always the same
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

const createTypeImports = async (componentsHavingDefaults) => {
  const componentExports = await getExportsListFromFileSystem();

  const typeImports = componentExports
    .filter(c => componentsHavingDefaults.has(c.componentClass))
    .map(c => `import type ${c.componentClass} from '../../${c.componentImportPath}';`);
  typeImports.push("import type SynergyElement from '../../internal/synergy-element.js';");
  typeImports.push("import type { SynDefaultChangedAttribute } from '../../events/events.js';");
  return typeImports;
};

/**
 * Create a list of type imports
 * Make sure to just include files that acutally have defaults
 */
export const getComponentsWithDefaultSettings = (metadata) => new Set(
  Object
    .values(createSynDefaultSettingsStructure(metadata, ALLOWED_ATTRIBUTES))
    .flat()
    .sort(),
);

export const createDefaultSettings = job(`Synergy: Creating default settings helper for properties ${ALLOWED_ATTRIBUTES.join(', ')}...`, async (
  componentDistDir,
  componentsDir,
) => {
  const defaultSettingsFile = path.join(componentsDir, 'src/utilities/defaultSettings/base.ts');

  const metadata = await getManifestData(componentDistDir);

  // Create a list of type imports
  // Make sure to just include files that actually have defaults
  const componentsHavingDefaults = getComponentsWithDefaultSettings(metadata);

  const typeImports = await createTypeImports(componentsHavingDefaults);

  // Create the needed types
  const coreTypes = [
    `
      /**
       * Custom helper type that adds decorated properties from
       * the globalSettings helper.
       */
      export type GlobalSettingsEnabledElement = SynergyElement & {
        __originalDecoratedClassName: string;
        overrideGlobalSettings: (changedProperties: SynDefaultChangedAttribute[]) => void;
      };

      /**
       * Allows for partial recursive types
       */
      export type RecursivePartial<T> = {
        [P in keyof T]?: T[P] extends object ? RecursivePartial<T[P]> : T[P];
      };
    `,
    `
      /**
       * Allowed value for a default setting
       * Gets the value of a given attribute for a given component
       */
      export type AllowedValueForDefaultSetting<Elm extends SynergyElement, Attr extends keyof Elm> = Elm[Attr];
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
    createSynDefaultSettingsType(metadata, ALLOWED_ATTRIBUTES),
  ].filter(Boolean);

  const exports = [
    createDefaultSettingsExport(metadata, ALLOWED_ATTRIBUTES),
  ];

  const outFile = `
    /* eslint-disable @typescript-eslint/quotes */
    ${createHeader()}

    // Type imports
    ${typeImports.join('\n')}

    // Core types
    ${coreTypes.join('\n')}

    // Exports
    ${exports.join('\n')}
  `;

  await fs.writeFile(defaultSettingsFile, outFile, 'utf-8');
  await formatFile(defaultSettingsFile, 'typescript');
});
