// @ts-check

/** @type {import('../../src/config/types.js').ComponentRules} */
export default {
  accessibility: [
    'syn-radio is not a standalone control; always use syn-radio inside syn-radio-group so assistive technologies can interpret options as one exclusive choice set.',
    'Ensure each radio has a clear, unique visible label; avoid ambiguous labels such as "Option 1" without context.',
    'Use disabled or readonly states only when users can still understand why an option is unavailable.',
  ],
  component: 'syn-radio',
  related: {
    components: [
      'syn-radio-group',
    ],
    templates: [
      'Forms',
    ],
  },
  usageGuidelines: [
    {
      content: [
        'Do not use syn-radio on its own; slot it into syn-radio-group to get correct keyboard behavior, semantics, and form participation.',
        'Use radios when users must select exactly one option from a small, predefined list.',
        'Keep options mutually exclusive and avoid overlapping meanings between choices.',
        'Present options in a stable order and keep wording parallel to make comparison easier.',
      ],
      id: 'option_structure',
      name: 'Option Structure',
    },
    {
      content: [
        'Always provide a meaningful group label on the parent syn-radio-group.',
        'Use concise option labels and add help text when options need extra explanation.',
        'Prefer sentence case and domain terms users already know.',
      ],
      id: 'labels_and_guidance',
      name: 'Labels and Guidance',
    },
    {
      content: [
        'Set a sensible default when one option is expected in most cases, but avoid preselecting high-risk choices.',
        'If no safe default exists, require explicit user selection before submit.',
        'Do not mix radios and checkboxes for the same decision set.',
      ],
      id: 'selection_behavior',
      name: 'Selection Behavior',
    },
  ],
  useCases: [
    'Choose one delivery method from a short list.',
    'Select one billing frequency such as monthly or yearly.',
    'Pick one preference in settings where only a single active mode is allowed.',
    'Answer single-choice questions in forms and surveys.',
  ],
};
