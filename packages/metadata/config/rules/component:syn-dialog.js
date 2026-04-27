// @ts-check

/** @type {import('../../src/config/types.js').ComponentRules} */
export default {
  accessibility: [
    'Always provide a headline for the dialog.',
    'Always include a visible and easily accessible close button within the modal.',
  ],
  component: 'syn-dialog',
  knownIssues: [
    {
      browser: 'Firefox / Chrome',
      description: 'When the headline is set by slot instead of attribute, the dialog name is not being announced by VoiceOver in Chrome and Firefox.',
    },
  ],
  related: {
    templates: [
    ],
  },
  usageGuidelines: {
    actions: [
      'Ensure a clear user journey by using a single primary button for the main action and secondary buttons for less important actions.',
      'Provide an action to close the interaction if a close button is not present in the top-right corner.',
      'Avoid having multiple primary action buttons within the same dialog.',
    ],
    headline_and_content: [
      'Use clear and concise headlines that describe the purpose.',
      'Avoid displaying content unrelated to the current workflow.',
      'Refrain from using dialogs for complex forms or large amounts of information.',
    ],
    slots: [
      'Use the "headline" slot to add a headline.',
      'Add main content on the "default" slot. The "default" slot is always scrollable.',
      'Use the "footer" slot to add action elements. The "footer" slot is always fixed.',
    ],
    user_interaction: [
      'Require users to take an action before they can continue interacting with the rest of the interface.',
      'Provide multiple ways to close the dialog, such as an "X" button, a cancel button, or clicking outside the dialog.',
      'Avoid excessive use of dialogs, as they can be disruptive to the user experience.',
    ],
  },
  useCases: [
    'Confirm an action which can have significant consequences and explicit user approval or input is needed (e.g. deleting a file).',
    'Present important information that must be seen and acknowledged before proceeding (e.g., session expired and renewed login required).',
    'Require users to enter information or select from multiple options before continuing.',
    'For non-critical content or information that doesn\'t require immediate user input, please use syn-notification to avoid workflow disruption.',
  ],
};
