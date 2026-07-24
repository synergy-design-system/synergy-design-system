// @ts-check

/** @type {import('../../src/config/types.js').ComponentRules} */
export default {
  accessibility: [
    'Validation messages must be text based and clearly associated with the target field.',
    'Use live validation thoughtfully to avoid excessive announcement noise for screen readers.',
    'Provide specific corrective guidance instead of generic error statements.',
  ],
  component: 'syn-validate',
  related: {
    components: [
      'syn-input',
      'syn-select',
      'syn-textarea',
      'syn-file',
    ],
    templates: [
      'Forms',
    ],
  },
  usageGuidelines: [
    {
      content: [
        'Write actionable messages that tell users what to fix and how.',
        'Prefer field specific messages over generic form level errors.',
        'Use consistent wording for recurring validation rules.',
      ],
      id: 'messaging',
      name: 'Validation Messages',
    },
    {
      content: [
        'Use inline variant for persistent field level feedback.',
        'Use tooltip variant where space is constrained and interaction remains clear.',
        'Hide icons only when another strong error cue is present.',
      ],
      id: 'variants',
      name: 'Display Variants',
    },
    {
      content: [
        'Use eager validation for high risk fields that benefit from immediate feedback.',
        'Use submit time validation to reduce interruption in long forms.',
        'Support custom validation events when integrating non-standard controls.',
      ],
      id: 'timing',
      name: 'Validation Timing',
    },
  ],
  useCases: [
    'Display field validation for forms and wizards.',
    'Show custom validation messages for domain specific rules.',
    'Integrate consistent error handling across native and custom form controls.',
  ],
};
