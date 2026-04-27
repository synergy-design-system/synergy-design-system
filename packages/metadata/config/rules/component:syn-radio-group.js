// @ts-check

/** @type {import('../../src/config/types.js').ComponentRules} */
export default {
  accessibility: [
    'Ensure that the group label is short and concise as it may be read out when users enter the group.',
    'Ensure radios are easily tappable on touch devices.',
  ],
  component: 'syn-radio-group',
  related: {
    components: [
      'syn-radio',
      'syn-radio-button',
    ],
    templates: [
      'Forms',
    ],
  },
  usageGuidelines: {
    background: [
      'Use with light background options such as white, neutral-100, or primary-100.',
    ],
    grouping_and_labels: [
      'Group related options together using fieldsets and legends for better context and accessibility.',
      'Provide a group label that states the category or describes the actions to take.',
    ],
    selection_behavior: [
      'Provide a default selected option; never display options without a default selection.',
      'Do not disable all choices in a group; if a selection is not applicable, consider hiding the group instead.',
      'Use only when users need to select one option; for multiple selections, use checkboxes instead.',
    ],
  },
  useCases: [
    'Present options in forms where only one selection is allowed (e.g., gender selection, payment methods).',
    'Provide clear and concise choices in settings or configuration panels.',
    'Enable users to make a selection in surveys or questionnaires.',
    'Offer options in filter panels where only one filter can be applied at a time.',
  ],
};
