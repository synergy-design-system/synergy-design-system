// @ts-check

/** @type {import('../../src/config/types.js').ComponentRules} */
export default {
  accessibility: [
    'Always provide a label for the drawer so that screenreaders correctly announce the component.',
    'Make sure that the close button is always visible to ensure users are able to close the drawer.',
  ],
  component: 'syn-drawer',
  related: {
    templates: [
      'Application Shell',
    ],
  },
  usageGuidelines: {
    content: [
      'Ensure the content is supplementary and does not include critical information that users must see immediately such as notifications or alerts; instead, use syn-notification or syn-dialog for those purposes.',
      'Check that the drawer content is fully visible and readable, even at larger font sizes.',
    ],
    interaction_and_behavior: [
      'Maintain the state of the content when it is reopened.',
      'Avoid opening automatically without user interaction.',
      'Provide multiple ways to close the interface for easy dismissal, such as a close button or clicking outside of it.',
    ],
    layout: [
      'Ensure it does not cover critical content or actions on the main screen.',
      'If using a tertiary action in the header, adjust the left padding to 0px for proper alignment.',
    ],
    slots: [
      'Use the "header" slot to add navigation and/or action elements if desired.',
      'Use the "default" slot to add main content. The "default" slot is always scrollable. For simplicity, syn-scrollable is integrated into the component as a wrapper for the slot in Figma, but will need to be used in code if desired.',
      'Use the "footer" slot to add action elements if desired. The "footer" slot is always fixed.',
    ],
  },
  useCases: [
    'Display supplementary information or options without navigating away from the main screen.',
    'Provide contextual help or guidance related to the current screen.',
    'House navigation menus on smaller devices.',
    'Present filter options, forms or settings that users can interact with without losing their place.',
  ],
};
