// @ts-check

/** @type {import('../../src/config/types.js').ComponentRules} */
export default {
  accessibility: [
    'Ensure that the group label is short and concise as it may be read out when users enter the group.',
  ],
  component: 'syn-optgroup',
  related: {
    components: [
      'syn-select',
      'syn-combobox',
      'syn-option',
    ],
    templates: [
      'Forms',
    ],
  },
  usageGuidelines: {
    behavior: [
      'Provide a reason or alternative if some choice is disabled.',
    ],
    content: [
      'Make sure all items in the list are mutually exclusive and unambiguous to help users understand what they are selecting.',
      'Provide a default choice where applicable to guide users.',
      'Use the optional grouping label and/or divider attributes to visually identify the groups.',
    ],
  },
  useCases: [
    'Provide options in selects or comboboxes.',
    'Allow users to select from a list of predefined choices in forms or settings, where they might choose one or more options.',
    'Present filter options in searches or data tables.',
  ],
};
