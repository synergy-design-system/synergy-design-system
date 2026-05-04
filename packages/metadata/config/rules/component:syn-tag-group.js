// @ts-check

/** @type {import('../../src/config/types.js').ComponentRules} */
export default {
  accessibility: [
    'Ensure each tag has clear readable text and a meaningful remove action when removable.',
    'Expose group labeling context when tags represent selected filters or categories.',
    'Keep keyboard interaction predictable for tag focus and removal.',
  ],
  component: 'syn-tag-group',
  related: {
    components: [
      'syn-tag',
    ],
    templates: [
      'Tag-Group',
    ],
  },
  usageGuidelines: [
    {
      content: [
        'Use tag groups for sets of related tags such as active filters or selected labels.',
        'Keep tags short and consistent to avoid visual noise.',
        'Use label alignment and group labels to clarify the meaning of the collection.',
      ],
      id: 'grouping',
      name: 'Grouping Strategy',
    },
    {
      content: [
        'Use removable tags when users can directly edit a selection.',
        'Provide clear feedback when a tag is removed from the group.',
        'Avoid mixing non-removable and removable semantics without clear distinction.',
      ],
      id: 'interaction',
      name: 'Interaction',
    },
    {
      content: [
        'Use group size variants consistently with nearby controls.',
        'Wrap tags cleanly and preserve readable spacing in narrow layouts.',
        'Avoid excessive tag counts without offering collapse or summary behavior.',
      ],
      id: 'layout',
      name: 'Sizing and Layout',
    },
  ],
  useCases: [
    'Show currently active filters in search and table views.',
    'Display selected categories or labels in forms.',
    'Manage multi-select states with removable tag chips.',
  ],
};
