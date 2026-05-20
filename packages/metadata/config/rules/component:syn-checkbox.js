// @ts-check

/** @type {import('../../src/config/types.js').ComponentRules} */
export default {
  accessibility: [
    'Checkboxes should always look like checkboxes to meet user\'s expectations.',
    'Nesting other interactive elements like links inside labels should be avoided.',
    'An error-text with a warning icon should be placed underneath an invalid checkbox. Error messages should always provide hints for solutions.',
  ],
  component: 'syn-checkbox',
  related: {
    components: [
    ],
    templates: [
      'Forms',
    ],
  },
  usageGuidelines: [
    {
      content: [
        'Provide a clear, descriptive label for each selection to avoid confusion.',
        'Frame labels positively, such as "Enable notifications" instead of "Disable notifications."',
      ],
      id: 'content',
      name: 'Content',
    },
    {
      content: [
        'Ensure each selection operates independently unless used for bulk actions.',
        'List selections in a logical order, such as alphabetical or numerical.',
        'Refrain from using a single checkbox when the action should take effect immediately - use syn-switch instead.',
      ],
      id: 'interaction_and_usage',
      name: 'Interaction and Usage',
    },
  ],
  useCases: [
    'Used for selections that don\'t immediately trigger an action.',
    'Selecting an option like "Agree to Terms and Conditions" before submitting a registration form.',
    'Opt-in/Opt-out of notifications or subscriptions.',
  ],
};
