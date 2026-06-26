/**
 * Get all form elements within a given context.
 * This includes both native form elements and custom Synform components.
 * @param context The element to check in
 * @returns List of all form elements within the context
 */
export const getFormElements = (context: Element): Element[] => {
  const selector = [
    'button',
    'fieldset',
    'input',
    'select',
    'textarea',

    // Synergy elements
    'syn-button',
    'syn-checkbox',
    'syn-combobox',
    'syn-dropdown',
    'syn-fieldset',
    'syn-file',
    'syn-icon-button',
    'syn-input',
    'syn-radio-group',
    'syn-radio',
    'syn-range',
    'syn-select',
    'syn-switch',
    'syn-textarea',
  ].join(',');

  return Array.from(context.querySelectorAll(selector));
};

/**
 * Checks if an element is a form element that can be disabled.
 * @param element The element to check.
 * @returns True if the element can be disabled, false otherwise.
 */
export const isDisabledElement = (
  element: Element,
): element is Element & { disabled: boolean } => 'disabled' in element;
