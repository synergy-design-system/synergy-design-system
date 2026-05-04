// @ts-check

/** @type {import('../../src/config/types.js').ComponentRules} */
export default {
  accessibility: [
    'Provide clear labels for ring progress when meaning is not obvious from context.',
    'Use determinate values for measurable tasks and avoid ambiguous visual states.',
    'Ensure color choices meet contrast requirements against the background.',
  ],
  component: 'syn-progress-ring',
  related: {
    components: [
      'syn-progress-bar',
      'syn-spinner',
    ],
  },
  usageGuidelines: [
    {
      content: [
        'Use progress rings when a compact circular indicator fits the layout better than a bar.',
        'Use determinate mode when the progress value is known.',
        'Avoid using rings for long verbose progress explanations.',
      ],
      id: 'mode',
      name: 'Progress Semantics',
    },
    {
      content: [
        'Adjust size based on container density and reading distance.',
        'Use track and indicator width values that keep the ring legible at small sizes.',
        'Keep sizing consistent across similar components in one view.',
      ],
      id: 'sizing',
      name: 'Size and Stroke',
    },
    {
      content: [
        'Include labels or nearby text describing the operation.',
        'Show percentage values when users need exact feedback.',
        'Use concise text to avoid crowding around the ring.',
      ],
      id: 'labels',
      name: 'Labels and Values',
    },
  ],
  useCases: [
    'Compact progress indication in cards or widgets.',
    'Show operation progress in dashboards and modal dialogs.',
    'Indicate completion state in space constrained UI areas.',
  ],
};
