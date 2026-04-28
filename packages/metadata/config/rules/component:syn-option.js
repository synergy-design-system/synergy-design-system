// @ts-check

/** @type {import('../../src/config/types.js').ComponentRules} */
export default {
  accessibility: [
    'Long option names can be difficult to understand and perceive, so it\'s best to keep them concise.',
    'Ensure that the beginning of each option is unique to avoid confusion, especially for screen reader users.',
    'Don\'t include headings or interactive elements like links, buttons, or checkboxes within dropdown options.',
  ],
  component: 'syn-option',
  related: {
    components: [
      'syn-select',
      'syn-combobox',
      'syn-optgroup',
    ],
    templates: [
      'Forms',
    ],
  },
  usageGuidelines: {
    behavior: [
      'Use the "checkbox" variant for multi-select and the "default" variant for single-select choices.',
      'Provide a reason or alternative if some choice is disabled.',
    ],
    content: [
      'Make sure all items in the list are mutually exclusive and unambiguous to help users understand what they are selecting.',
      'Provide a default choice where applicable to guide users.',
    ],
  },
  useCases: [
    'Provide options in selects or comboboxes.',
    'Allow users to select from a list of predefined choices in forms or settings, where they might choose one or more options.',
    'Present filter options in searches or data tables.',
  ],
};
