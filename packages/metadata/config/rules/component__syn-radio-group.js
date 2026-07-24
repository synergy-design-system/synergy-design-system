// @ts-check

/** @type {import('../../src/config/types.js').ComponentRules} */
export default {
  accessibility: [
    'Ensure that the group label is short and concise as it may be read out when users enter the group.',
    'Ensure radios are easily tappable on touch devices.',
  ],
  component: 'syn-radio-group',
  related: {
    components: [
      'syn-radio',
      'syn-radio-button',
    ],
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
        'Group related options together using fieldsets and legends for better context and accessibility.',
        'Provide a group label that states the category or describes the actions to take.',
      ],
      id: 'grouping_and_labels',
      name: 'Grouping and Labels',
    },
    {
      content: [
        'Provide a default selected option; never display options without a default selection.',
        'Do not disable all choices in a group; if a selection is not applicable, consider hiding the group instead.',
        'Use only when users need to select one option; for multiple selections, use checkboxes instead.',
      ],
      id: 'selection_behavior',
      name: 'Selection Behavior',
    },
    {
      content: [
        'Use the vertical layout as the default for most form scenarios, especially when labels are longer or when readability is more important than compactness.',
        'Use horizontal layout only when options are short, similar in length, and there is sufficient horizontal space.',
        'The layout setting applies to `syn-radio` options. `syn-radio-button` items are rendered in their own button-group and are not affected by this layout switch.',
      ],
      id: 'layout',
      name: 'Layout',
    },
  ],
  useCases: [
    'Present options in forms where only one selection is allowed (e.g., gender selection, payment methods).',
    'Provide clear and concise choices in settings or configuration panels.',
    'Enable users to make a selection in surveys or questionnaires.',
    'Offer options in filter panels where only one filter can be applied at a time.',
  ],
};
