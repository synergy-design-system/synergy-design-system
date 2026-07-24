// @ts-check

/** @type {import('../../src/config/types.js').ComponentRules} */
export default {
  accessibility: [
    'Ensure that the group label is short and descriptive, as assistive technologies announce it when users enter the group.',
    'Provide a clear label for every checkbox option and avoid ambiguous wording.',
    'Ensure checkbox options are easily tappable on touch devices and that disabled states remain understandable in context.',
  ],
  component: 'syn-checkbox-group',
  related: {
    components: [
      'syn-checkbox',
    ],
    templates: [
      'Forms',
    ],
  },
  usageGuidelines: [
    {
      content: [
        'Group related checkboxes together in syn-checkbox-group to provide shared context and improve scannability.',
        'Provide a group label that describes the decision category and use help text when users need additional guidance.',
        'Use checkboxes in this group when users may select none, one, or multiple options.',
      ],
      id: 'grouping_and_labels',
      name: 'Grouping and Labels',
    },
    {
      content: [
        'Do not use checkbox-group when users must select exactly one option; use syn-radio-group instead.',
        'Allow empty groups when selection is optional and avoid forcing a default checked state unless business rules require it.',
        'Do not disable all choices in a group; if no option is currently applicable, consider hiding the group or explaining why options are unavailable.',
      ],
      id: 'selection_behavior',
      name: 'Selection Behavior',
    },
    {
      content: [
        'Use vertical layout as the default for most form scenarios, especially with longer labels or supporting help text.',
        'Use horizontal layout only when options are short, similar in length, and sufficient horizontal space is available.',
        'For long option lists, keep labels concise and consider splitting options into multiple logical groups to reduce scanning effort.',
      ],
      id: 'layout',
      name: 'Layout',
    },
  ],
  useCases: [
    'Collect multiple independent selections in forms, such as feature preferences or notification channels.',
    'Present optional add-ons where users can choose any combination of available options.',
    'Capture consent combinations (for example, different communication or policy confirmations).',
    'Offer grouped filter criteria where users may activate multiple filters at once.',
  ],
};
