// @ts-check

/** @type {import('../../src/config/types.js').ComponentRules} */
export default {
  accessibility: [
    'Use the "visually disabled" attribute to keep disabled elements focusable, hoverable, and able to show tooltips, as they\'re otherwise removed from the tab order and inaccessible to screen readers.',
  ],
  component: 'syn-textarea',
  related: {
    templates: [
      'Forms',
    ],
  },
  usageGuidelines: {
    background: [
      'Use with light background options such as white, neutral-100, or primary-100.',
    ],
    behavior_and_interaction: [
      'Provide real-time validation to help users correct errors as they type.',
      'Provide a visible scrollbar when text overflows.',
      'Adapt the size of the field to the expected length of user input.',
      'Avoid including a "clear" button to prevent unwanted loss of user input.',
    ],
    content_and_guidance: [
      'Inform users whenever minimum or maximum lengths are set; use the field\'s help text for this.',
      'Use placeholder text as an addition to label as it should not include essential information required to complete the field correctly.',
      'Use help text to provide hints or examples of expected inputs.',
    ],
  },
  useCases: [
    'Collect detailed user feedback or comments.',
    'Enable users to write comprehensive reviews of products or services.',
    'Gather extensive information about issues or requests.',
    'Capture detailed responses in surveys or questionnaires.',
    'Long or descriptive labels, helper text, or units are needed.',
    'Forms with many fields that users must scan quickly.',
    'Complex fields with adornments, counters, or tooltips.',
    'Compact layouts and simple fields.',
    'Short labels (1-3 words); minimal helper text.',
    'You want a clean look without duplicate placeholder text.',
  ],
};
