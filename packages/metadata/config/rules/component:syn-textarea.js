// @ts-check

/** @type {import('../../src/config/types.js').ComponentRules} */
export default {
  component: 'syn-textarea',
  related: {
    templates: [
      'Forms',
    ],
  },
  usageGuidelines: [
    {
      content: [
        'Use with light background options such as white, neutral-100, or primary-100.',
      ],
      id: 'background',
      name: 'Background',
    },
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
