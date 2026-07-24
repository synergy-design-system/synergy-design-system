// @ts-check

/** @type {import('../../src/config/types.js').ComponentRules} */
export default {
  accessibility: [
    'Ensure textarea fields are part of a logical tab order and provide a clearly visible focus state when focused.',
    'Always provide a descriptive label. Placeholder text may support the label but must not replace it.',
    'Ensure textarea fields remain usable across all screen sizes, including touch devices with sufficiently large touch targets.',
    'Inform users about input constraints such as minimum or maximum character limits, and expose validation feedback clearly.',
    'Use helper and error text that can be announced by assistive technologies (e.g., by linking descriptions and errors to the field).',
    'Prefer keeping the field enabled by default and validate on submit or during input instead of blocking input unnecessarily.',
  ],
  component: 'syn-textarea',
  related: {
    templates: [
      'Forms',
    ],
  },
  usageGuidelines: [
    {
      content: [
        'Provide real-time validation to help users correct errors as they type.',
        'Provide a visible scrollbar when text overflows.',
        'Adapt the size of the field to the expected length of user input.',
        'Avoid including a "clear" button to prevent unwanted loss of user input.',
      ],
      id: 'behavior_and_interaction',
      name: 'Behavior and Interaction',
    },
    {
      content: [
        'Inform users whenever minimum or maximum lengths are set; use the field\'s help text for this.',
        'Use placeholder text as an addition to label as it should not include essential information required to complete the field correctly.',
        'Use help text to provide hints or examples of expected inputs.',
      ],
      id: 'content_and_guidance',
      name: 'Content and Guidance',
    },
  ],
  useCases: [
    'Collect detailed user feedback or comments.',
    'Enable users to write comprehensive reviews of products or services.',
    'Gather extensive information about issues or requests.',
    'Capture detailed responses in surveys or questionnaires.',
  ],
};
