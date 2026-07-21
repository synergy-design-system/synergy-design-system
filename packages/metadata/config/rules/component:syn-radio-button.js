// @ts-check

/** @type {import('../../src/config/types.js').ComponentRules} */
export default {
  accessibility: [
    'syn-radio-button is not a standalone control; use it only inside syn-radio-group so assistive technologies interpret it as part of one exclusive choice set.',
    'Provide meaningful alternative text for icon-only radio buttons using the label attribute.',
    'Communicate the group\'s function—such as filtering or view switching—through clear context or labels.',
    'Ensure each button option has a unique, non-ambiguous label to help assistive technology users understand their choices.',
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
  usageGuidelines: [
    {
      content: [
        'Do not use syn-radio-button on its own; it must be slotted into syn-radio-group.',
        'Use syn-radio-button when you need button-style appearance for single option selection.',
        'Use syn-radio for traditional radio button appearance.',
        'Both work as form inputs when slotted inside syn-radio-group; the difference is visual presentation.',
        'Choose syn-radio-button for use cases like filtering, view switching, or category selection where button styling enhances UX.',
        'Slot inside syn-radio-group to participate in form submission and group state management.',
        'Use only in groups, as they are designed to allow the user to activate one of several options. For single options, use syn-checkbox instead.',
      ],
      id: 'when_to_use',
      name: 'When to Use',
    },
    {
      content: [
        'Always pre-select a "default" value. There is no invalid state; one option must always be selected.',
        'Limit the number of options in the group. Users should be able to retain all options available and not be overwhelmed by them.',
      ],
      id: 'behavior',
      name: 'Behavior',
    },
    {
      content: [
        'Include icons to support each option visually if possible.',
        'Label each choice clearly.',
      ],
      id: 'content',
      name: 'Content',
    },
    {
      content: [
        'All radio buttons in the group must be styled similarly, e.g., each one is labelled with both text and icon.',
        'Avoid styling options only with icons if they are not common symbols, to prevent ambiguous interpretations.',
      ],
      id: 'styling',
      name: 'Styling',
    },
  ],
  useCases: [
    'Filter or switch between views with button-style appearance and icon support.',
    'Select one option from a group where one is already preselected and no invalid state exists.',
    'Switch between groups of settings with visual button presentation.',
    'Display categorization choices with prominent, icon-enhanced options.',
    'Preference or mode selection in UI controls where traditional form input is not needed.',
  ],
};
