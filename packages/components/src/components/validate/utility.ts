/**
 * List of enabled synergy form elements
 */
export const SYNERGY_FORM_ELEMENTS = [
  'syn-button',
  'syn-checkbox',
  'syn-input',
  'syn-radio',
  'syn-radio-group',
  'syn-range',
  'syn-select',
  'syn-textarea',
];

/**
 * List of native form elements
 */
export const NATIVE_FORM_ELEMENTS = [
  'button',
  'radio',
  'select',
  'input',
];

/**
 * List of all form enabled elements
 */
export const ENABLED_FORM_ELEMENTS = [
  ...SYNERGY_FORM_ELEMENTS,
  ...NATIVE_FORM_ELEMENTS,
];

const createEnabledElementFn = (list: string[]) => (element: HTMLElement) => list.includes(
  element.tagName.toLowerCase(),
);

/**
 * Check if a given element is a synergy form element
 */
export const getIsSynergyFormElement = createEnabledElementFn(ENABLED_FORM_ELEMENTS);

/**
 * Check if a given element is a native form element
 */
export const getIsNativeFormElement = createEnabledElementFn(NATIVE_FORM_ELEMENTS);
