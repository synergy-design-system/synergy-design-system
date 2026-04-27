// @ts-check

/** @type {import('../../src/config/types.js').ComponentRules} */
export default {
  accessibility: [
    'Provide meaningful alternative text for icon-only radio buttons.',
    'Communicate the group\'s function-such as filtering or view switching-through clear context or labels.',
    'Use the "visually disabled" attribute to keep disabled elements focusable, hoverable, and able to show tooltips, as they\'re otherwise removed from the tab order and inaccessible to screen readers.',
  ],
  component: 'syn-radio-button',
  related: {
    components: [
      'syn-radio',
      'syn-radio-group',
    ],
    templates: [
      'Forms',
    ],
  },
  usageGuidelines: {
    background: [
      'Use with light background options such as white, neutral-100, or primary-100.',
    ],
    behavior: [
      'Don\'t use as input method in forms, for they are not form elements. Use syn-radio instead.',
      'Slot inside of an syn-radio-group.',
      'Use only in groups, as they are designed to allow the user to activate one of several options. To work with a single option, use syn-checkbox instead.',
      'Pre-select always a "default" value; there is no invalid state.',
      'Limit the number of options in the group. Users should be able to retain all options available and not be overwhelmed by them.',
    ],
    content: [
      'Include icons to support each option visually if possible.',
      'Label each choice clearly.',
    ],
    styling: [
      'All radio buttons in the group must be styled similarly, e.g., each one is labelled with both text and icon.',
      'Avoid styling options only with icons if they are not common symbols, to prevent ambiguous interpretations.',
    ],
  },
  useCases: [
    'Select one option from a group where one is already preselected.',
    'Switch between groups of settings.',
    'Filter views by a parent category.',
  ],
};
