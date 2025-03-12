import { deprecatedForV2 } from './deprecation.js';

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
      allowed: deprecatedForV2('Please use the `sharp` property instead.'),
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
      allowed: deprecatedForV2('Please use the `burger-menu` attribute instead.'),
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
  interactive: true,
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
  interactive: true,
};

/**
 * @type {import('html-validate').MetaElement}
 */
const SynSelect = {
  flow: true,
  focusable: true,
  formAssociated,
  interactive: true,
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
};

/**
 * @type {import('html-validate').MetaElement}
 */
const SynSwitch = {
  flow: true,
  focusable: true,
  formAssociated,
  interactive: true,
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
  interactive: true,
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

/**
 * Final list of all rules
 * @see createElements.js
 */
export const rules = {
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
