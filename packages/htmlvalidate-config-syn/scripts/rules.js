import fs from 'fs';
import path from 'path';

const currentDirname = path.dirname(new URL(import.meta.url).pathname);
const metadataPath = path.resolve(currentDirname, '../node_modules/@synergy-design-system/components/dist/custom-elements.json');
const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf-8'));

/**
 * Creates a deprecation message for a given synergy version
 * @param {string} version The Synergy Version the attribute was deprecated in
 * @param {string} reason [optional]
 * @returns {string} The final deprecation message
 */
const deprecateIn = (version, reason = '') => `
This attribute was deprecated in Synergy version ${version}!
${reason}
Further information can be found at https://github.com/synergy-design-system/synergy-design-system/blob/main/packages/components/BREAKING_CHANGES.md#version-${version.replaceAll('.', '')} for further information.
`.trim();

// Utility classes for deprecation.
// Please add one deprecation warning per major version.
// Also note that you have to return a function that calls
// deprecateIn, otherwise the message will not be displayed.
const deprecatedInSyn2 = (reason = '') => () => deprecateIn('2.0', reason);

// Shared settings for form associated elements
const formAssociated = {
  disablable: true,
  listed: true,
};

/**
 * @type {import('html-validate').MetaElement}
 */
const SynAccordion = {
  focusable: true,
  interactive: true,
  sectioning: true,
};

/**
 * @type {import('html-validate').MetaElement}
 */
const SynAlert = {
  focusable: true,
  sectioning: true,
};

/**
 * @type {import('html-validate').MetaElement}
 */
const SynBadge = {
  phrasing: true,
};

/**
 * @type {import('html-validate').MetaElement}
 */
const SynBreadcrumbItem = {
  focusable: true,
  phrasing: true,
};

/**
 * @type {import('html-validate').MetaElement}
 */
const SynBreadcrumb = {
  sectioning: true,
};

/**
 * @type {import('html-validate').MetaElement}
 */
const SynButton = {
  aria: {
    implicitRole: 'button',
  },
  flow: true,
  focusable: true,
  formAssociated,
  interactive: true,
  phrasing: true,
};

/**
 * @type {import('html-validate').MetaElement}
 */
const SynButtonGroup = {
  flow: true,
  focusable: true,
  formAssociated,
  interactive: true,
  phrasing: true,
};

/**
 * @type {import('html-validate').MetaElement}
 */
const SynCard = {
  attributes: {
    nested: {
      allowed: deprecatedInSyn2('Please use the `sharp` property instead.'),
      boolean: true,
    },
  },
  flow: true,
  sectioning: true,
};

/**
 * @type {import('html-validate').MetaElement}
 */
const SynCheckbox = {
  flow: true,
  focusable: true,
  formAssociated,
  interactive: true,
  phrasing: true,
};

/**
 * @type {import('html-validate').MetaElement}
 */
const SynCombobox = {
  flow: true,
  focusable: true,
  formAssociated,
  interactive: true,
  phrasing: true,
};

/**
 * @type {import('html-validate').MetaElement}
 */
const SynDetails = {
  focusable: true,
  interactive: true,
};

/**
 * @type {import('html-validate').MetaElement}
 */
const SynDialog = {
  flow: true,
  focusable: true,
};

/**
 * @type {import('html-validate').MetaElement}
 */
const SynDivider = {
  flow: true,
};

/**
 * @type {import('html-validate').MetaElement}
 */
const SynDrawer = {
  focusable: true,
  sectioning: true,
};

/**
 * @type {import('html-validate').MetaElement}
 */
const SynDropdown = {
  flow: true,
  focusable: true,
};

/**
 * @type {import('html-validate').MetaElement}
 */
const SynFile = {
  flow: true,
  focusable: true,
  formAssociated,
  interactive: true,
  phrasing: true,
};

/**
 * @type {import('html-validate').MetaElement}
 */
const SynHeader = {
  attributes: {
    'show-burger-menu': {
      allowed: deprecatedInSyn2('Please use the `burger-menu` attribute instead.'),
      boolean: true,
    },
  },
  flow: true,
  heading: true,
  sectioning: true,
};

/**
 * @type {import('html-validate').MetaElement}
 */
const SynIconButton = {
  focusable: true,
  formAssociated,
  interactive: true,
  phrasing: true,
};

/**
 * @type {import('html-validate').MetaElement}
 */
const SynIcon = {
  embedded: true,
  phrasing: true,
};

/**
 * @type {import('html-validate').MetaElement}
 */
const SynInput = {
  flow: true,
  focusable: true,
  formAssociated,
  interactive: true,
};

/**
 * @type {import('html-validate').MetaElement}
 */
const SynMenuItem = {
  focusable: true,
  phrasing: true,
};

/**
 * @type {import('html-validate').MetaElement}
 */
const SynMenuLabel = {
  phrasing: true,
};

/**
 * @type {import('html-validate').MetaElement}
 */
const SynMenu = {
  focusable: true,
  sectioning: true,
};

/**
 * @type {import('html-validate').MetaElement}
 */
const SynNavItem = {
  focusable: true,
  interactive: true,
  phrasing: true,
};

/**
 * @type {import('html-validate').MetaElement}
 */
const SynOptgroup = {};

/**
 * @type {import('html-validate').MetaElement}
 */
const SynOption = {
  focusable: true,
};

/**
 * @type {import('html-validate').MetaElement}
 */
const SynPrioNav = {
  focusable: true,
  sectioning: true,
};

/**
 * @type {import('html-validate').MetaElement}
 */
const SynProgressBar = {
  formAssociated,
  phrasing: true,
};

/**
 * @type {import('html-validate').MetaElement}
 */
const SynProgressRing = {
  formAssociated,
  phrasing: true,
};

/**
 * @type {import('html-validate').MetaElement}
 */
const SynRadioGroup = {
  flow: true,
  focusable: true,
  formAssociated,
};

/**
 * @type {import('html-validate').MetaElement}
 */
const SynRadio = {
  focusable: true,
  formAssociated,
  phrasing: true,
};

/**
 * @type {import('html-validate').MetaElement}
 */
const SynRangeTick = {
  flow: true,
  phrasing: true,
};

/**
 * @type {import('html-validate').MetaElement}
 */
const SynRange = {
  flow: true,
  focusable: true,
  formAssociated,
};

/**
 * @type {import('html-validate').MetaElement}
 */
const SynSelect = {
  flow: true,
  focusable: true,
  formAssociated,
};

/**
 * @type {import('html-validate').MetaElement}
 */
const SynSideNav = {
  flow: true,
  focusable: true,
  sectioning: true,
};

/**
 * @type {import('html-validate').MetaElement}
 */
const SynSpinner = {
  formAssociated,
};

/**
 * @type {import('html-validate').MetaElement}
 */
const SynSwitch = {
  flow: true,
  focusable: true,
  formAssociated,
};

/**
 * @type {import('html-validate').MetaElement}
 */
const SynTabGroup = {
  focusable: true,
  sectioning: true,
};

/**
 * @type {import('html-validate').MetaElement}
 */
const SynTabPanel = {
  sectioning: true,
};

/**
 * @type {import('html-validate').MetaElement}
 */
const SynTab = {
  focusable: true,
};

/**
 * @type {import('html-validate').MetaElement}
 */
const SynTag = {};

/**
 * @type {import('html-validate').MetaElement}
 */
const SynTextarea = {
  flow: true,
  focusable: true,
  formAssociated,
};

/**
 * @type {import('html-validate').MetaElement}
 */
const SynTooltip = {};

/**
 * @type {import('html-validate').MetaElement}
 */
const SynValidate = {
  flow: true,
  formAssociated,
};

const defaults = {
  SynAccordion,
  SynAlert,
  SynBadge,
  SynBreadcrumb,
  SynBreadcrumbItem,
  SynButton,
  SynButtonGroup,
  SynCard,
  SynCheckbox,
  SynCombobox,
  SynDetails,
  SynDialog,
  SynDivider,
  SynDrawer,
  SynDropdown,
  SynFile,
  SynHeader,
  SynIcon,
  SynIconButton,
  SynInput,
  SynMenu,
  SynMenuItem,
  SynMenuLabel,
  SynNavItem,
  SynOptgroup,
  SynOption,
  SynPrioNav,
  SynProgressBar,
  SynProgressRing,
  SynRadio,
  SynRadioGroup,
  SynRange,
  SynRangeTick,
  SynSelect,
  SynSideNav,
  SynSpinner,
  SynSwitch,
  SynTab,
  SynTabGroup,
  SynTabPanel,
  SynTag,
  SynTextarea,
  SynTooltip,
  SynValidate,
};

/**
 * Creates the attributes for a given declaration
 * @returns {import('html-validate').MetaElement}
 */
const createAttributes = (declaration) => {
  const attributes = (declaration.attributes || [])
    .filter(attr => !!attr?.type?.text)
    .map(attr => {
      // Special case for boolean attributes
      if (attr.type.text === 'boolean') {
        return {
          [attr.name]: {
            boolean: true,
          },
        };
      }

      // Special case for attributes that have a fixed set of values
      if (attr.type.text.includes('|')) {
        const values = attr
          .type
          .text
          .split('|')
          .filter(value => value.includes("'"))
          .map(value => value.trim().replaceAll("'", ''))
          .filter(Boolean);

        if (values.length === 0) {
          return {
            [attr.name]: {},
          };
        }

        return {
          [attr.name]: {
            enum: values,
            omit: true,
          },
        };
      }

      // Default case, just return the attribute
      return {
        [attr.name]: {},
      };
    })
    .filter(Boolean)
    .reduce((acc, curr) => ({
      ...acc,
      ...curr,
    }), {});

  return attributes;
};

const createTextContent = (declaration) => {
  const { slots } = declaration;

  // If the element does not have slots, disallow text content
  if (!slots || slots.length === 0) {
    return 'none';
  }
  return 'default';
};

const createMetaElement = (declaration) => ({
  ...defaults[declaration.name],
  attributes: {
    ...defaults[declaration.name]?.attributes,
    ...createAttributes(declaration),
  },
  textContent: createTextContent(declaration),
});

export const createMetaData = () => {
  const elements = metadata
    .modules
    .filter(module => module.declarations.filter(kind => kind === 'class'))
    .map(module => module.declarations)
    .flatMap(declaration => declaration)
    .map(declaration => {
      const name = declaration.tagName;
      // if (typeof defaults[declaration.name] === 'undefined') {
      //   console.error('Not found:', declaration.name);
      // }
      return [name, createMetaElement(declaration)];
    });

  const output = Object.fromEntries(elements);
  // console.log(JSON.stringify(output, null, 2));
  return output;
};

// Enable for debugging
// console.log(createMetaData());
