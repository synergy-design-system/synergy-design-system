// @ts-check

/** @type {import('../../src/config/types.js').ComponentRules} */
export default {
  accessibility: [
    'If multiple options can be selected, clearly announce this capability to screenreader users and offer a way to view all chosen items.',
    'Be aware that group labels in select components will be neglected by most assistive devices.',
    'Use the "visually disabled" attribute to keep disabled elements focusable, hoverable, and able to show tooltips, as they\'re otherwise removed from the tab order and inaccessible to screen readers.',
  ],
  component: 'syn-select',
  related: {
    components: [
      'syn-option',
      'syn-optgroup',
    ],
    templates: [
      'Forms',
    ],
  },
  usageGuidelines: {
    background: [
      'Use light background options such as white, neutral-100, or primary-100.',
    ],
    content_and_labels: [
      'Keep each option to a single line of text for readability.',
      'Ensure all options have consistent line lengths for easier scanning.',
      'Avoid using the same word or phrase at the beginning of options.',
      'Provide a meaningful placeholder option to guide users.',
    ],
    selection_behavior: [
      'Use for lists with more than five options; for fewer options, consider using syn-radio for single selection or syn-checkbox for multiple selection.',
      'Apply the "multiple" attribute when multiple selections are allowed, and pair it with "checkbox" for corresponding nested options.',
      'By default, the number of selected options is displayed after the text.',
      'Display selected options as tags within the field to help users track their selections.',
      'Consider limiting the maximum number of displayed selectable options to avoid overwhelming users. We recommend displaying 6-8 (with scrolling for additional results).',
    ],
  },
  useCases: [
    'Enable users to select one or more options from a list of predefined choices in forms.',
    'Implement in filter panels to allow users to refine search results or data views.',
    'Provide options in settings pages where users need to choose preferences from a list.',
    'Long or descriptive labels, helper text, or units are needed.',
    'Forms with many fields that users must scan quickly.',
    'Complex fields with adornments, counters, or tooltips.',
    'Compact layouts and simple fields.',
    'Short labels (1-3 words); minimal helper text.',
    'You want a clean look without duplicate placeholder text.',
  ],
};
