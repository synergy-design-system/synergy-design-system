// @ts-check

/** @type {import('../../src/config/types.js').ComponentRules} */
export default {
  accessibility: [
    'Provide accessible labels for progress context, especially when multiple bars are visible.',
    'Use determinate mode when actual progress is known and indeterminate only when unknown.',
    'Do not rely on color only to communicate progress status.',
  ],
  component: 'syn-progress-bar',
  related: {
    components: [
      'syn-progress-ring',
      'syn-spinner',
    ],
  },
  usageGuidelines: [
    {
      content: [
        'Use determinate mode for measurable tasks such as uploads or imports.',
        'Use indeterminate mode for short operations when duration cannot be estimated.',
        'Switch to determinate mode as soon as reliable progress information is available.',
      ],
      id: 'mode',
      name: 'Determinate vs Indeterminate',
    },
    {
      content: [
        'Provide descriptive labels that state what process is progressing.',
        'Show values when users benefit from precise completion feedback.',
        'Keep labeling consistent across similar processes.',
      ],
      id: 'labels',
      name: 'Labels and Values',
    },
    {
      content: [
        'Use custom heights carefully to preserve readability and visual balance.',
        'Maintain sufficient contrast between track and indicator.',
        'Avoid decorative overuse of animated progress indicators.',
      ],
      id: 'visuals',
      name: 'Visual Styling',
    },
  ],
  useCases: [
    'Show progress for uploads, downloads, or data processing.',
    'Indicate completion status in multi-step operations.',
    'Display background task progress in dashboards and forms.',
  ],
};
