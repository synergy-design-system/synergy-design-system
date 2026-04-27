// @ts-check

/** @type {import('../../src/config/types.js').ComponentRules} */
export default {
  accessibility: [
    'Checkboxes should always look like checkboxes to meet user\'s expectations.',
    'Nesting other interactive elements like links inside labels should be avoided.',
    'An error-text with a warning icon should be placed underneath an invalid checkbox or, if used in a group, underneath the checkbox group. Error messages should always provide hints for solutions.',
    'Use the "visually disabled" attribute to keep disabled elements focusable, hoverable, and able to show tooltips, as they\'re otherwise removed from the tab order and inaccessible to screen readers.',
    'In Figma use an asterisk with a blank before ( \\*) at the end of its label when designing a mandatory checkbox. In code use the "required" boolean.',
  ],
  component: 'syn-checkbox',
  related: {
    components: [
      'syn-checkbox-group',
    ],
    templates: [
      'Forms',
    ],
  },
  usageGuidelines: {
    content: [
      'Provide a clear, descriptive label for each selection to avoid confusion.',
      'Frame labels positively, such as "Enable notifications" instead of "Disable notifications."',
    ],
    interaction_and_usage: [
      'Ensure each selection operates independently unless used for bulk actions.',
      'List selections in a logical order, such as alphabetical or numerical.',
      'Refrain from using a single checkbox when the action should take effect immediately - use syn-switch instead.',
    ],
  },
  useCases: [
    'Used for selections that don\'t immediately activate.',
    'Selecting an option like "Agree to Terms and Conditions" before submitting a registration form.',
    'Opt-in/Opt-out of notifications or subscriptions.',
    'Check syn-checkbox-group for group use cases and usage guidelines.',
  ],
};
