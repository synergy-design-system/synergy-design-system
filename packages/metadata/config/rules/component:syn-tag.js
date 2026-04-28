// @ts-check

/** @type {import('../../src/config/types.js').ComponentRules} */
export default {
  component: 'syn-tag',
  related: {
    templates: [
      'Tag Group',
    ],
  },
  usageGuidelines: {
    behavior: [
      'Use the "removable" attribute to include a small close "x" button next to the label.',
      'Avoid using a standalone, non-removable tag, as its selected/unselected state could be unclear. Apply the "removable" attribute for those cases.',
    ],
    interactivity: [
      'Tags are interactive elements which trigger an action.',
    ],
    labels: [
      'Try to keep a similar text length for all labels, and specially avoid excessively long ones. If necessary, truncate the label and show the full text in a tooltip on hover.',
      'Don\'t use tags to indicate the status of a task, use syn-status-badge instead.',
    ],
  },
  useCases: [
    'Label and categorize items to help users filter and find relevant content.',
    'Highlight important keywords or attributes associated with an item.',
    'Allow users to filter content dynamically by clicking on tags.',
    'Display topics or categories associated with an article, post or product.',
  ],
};
