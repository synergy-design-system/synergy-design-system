import fs from 'fs';
import path from 'path';

const currentDirname = path.dirname(new URL(import.meta.url).pathname);
const metadataPath = path.resolve(currentDirname, '../node_modules/@synergy-design-system/components/dist/custom-elements.json');
const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf-8'));

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
  sectioning: true,
};

/**
 * @type {import('html-validate').MetaElement}
 */
const SynCheckbox = {
  focusable: true,
  formAssociated,
  interactive: true,
  phrasing: true,
};

/**
 * @type {import('html-validate').MetaElement}
 */
const SynCombobox = {
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
      boolean: true,
      deprecated: 'This attribute was deprecated in Synergy@2.0',
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
  focusable: true,
  formAssociated,
  phrasing: true,
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
  focusable: true,
  formAssociated,
};

/**
 * @type {import('html-validate').MetaElement}
 */
const SynSelect = {
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
      if (attr.type.text === 'boolean') {
        return {
          [attr.name]: {
            boolean: true,
          },
        };
      }

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

const createMetaElement = (declaration) => ({
  ...defaults[declaration.name],
  attributes: {
    ...defaults[declaration.name]?.attributes,
    ...createAttributes(declaration),
  },
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

createMetaData();
