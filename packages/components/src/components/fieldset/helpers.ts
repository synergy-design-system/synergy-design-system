import { FIELDSET_TWO_COLUMN_BREAKPOINT } from './constants.js';
import type SynCheckboxGroup from '../checkbox-group/checkbox-group.component.js';
import type SynRadioGroup from '../radio-group/radio-group.component.js';

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

export type GroupedControlLayout = 'horizontal' | 'vertical';

const GROUPED_CONTROL_SELECTOR = 'syn-radio-group, syn-checkbox-group';

export const getGroupedControlLayout = (
  fieldsetLayout: 'one-column' | 'two-columns',
  fieldContainerWidth: number,
): GroupedControlLayout => {
  if (fieldsetLayout !== 'two-columns') {
    return 'vertical';
  }

  if (fieldContainerWidth < FIELDSET_TWO_COLUMN_BREAKPOINT) {
    return 'vertical';
  }

  return 'horizontal';
};

export const applyGroupedControlLayout = (
  context: Element,
  targetLayout: GroupedControlLayout,
) => {
  const groups = context.querySelectorAll<SynCheckboxGroup | SynRadioGroup>(GROUPED_CONTROL_SELECTOR);

  groups.forEach(group => {
    if (group.layout !== targetLayout) {
      // eslint-disable-next-line no-param-reassign
      group.layout = targetLayout;
    }
  });
};
