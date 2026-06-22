// @ts-check

/** @type {import('../../src/config/types.js').ComponentRules} */
export default {
  accessibility: [
    'Treat range ticks as supportive visual markers; do not rely on ticks alone to communicate critical values or state.',
    'Provide meaningful text labels for major ticks so users can understand the scale together with the range label and value output.',
    'Ensure tick labels have sufficient contrast and remain readable at all supported sizes and viewport widths.',
    'When subdivision ticks are unlabeled, ensure major labeled ticks still provide enough context for orientation.',
    'For precise input scenarios, provide an additional text or numeric input method because ticks are not interactive controls.',
  ],
  component: 'syn-range-tick',
  related: {
    components: [
      'syn-range',
    ],
    templates: [
      'Forms',
    ],
  },
  usageGuidelines: [
    {
      content: [
        'Use syn-range-tick inside the ticks slot of syn-range to visualize value intervals along the slider track.',
        'Align tick labels with actual slider values so visual markers and range behavior stay consistent.',
        'Use short, scannable labels for major points such as min, mid, and max values.',
      ],
      id: 'scale_mapping',
      name: 'Scale Mapping',
    },
    {
      content: [
        'Use subdivision ticks to improve orientation between major labeled ticks.',
        'Avoid labeling every subdivision when it creates visual clutter; prioritize key waypoints.',
        'Keep spacing patterns predictable to avoid implying incorrect value intervals.',
      ],
      id: 'subdivisions',
      name: 'Subdivisions',
    },
    {
      content: [
        'Keep tick density proportional to available width so labels do not overlap on smaller screens.',
        'Test responsive behavior when using uneven spacing or custom groupings to ensure labels remain readable.',
        'Do not use ticks as standalone indicators outside a range context where values cannot be interpreted reliably.',
      ],
      id: 'layout_and_density',
      name: 'Layout and Density',
    },
  ],
  useCases: [
    'Mark key values such as minimum, midpoint, and maximum on a range slider.',
    'Show meaningful breakpoints for pricing, durations, or configurable thresholds.',
    'Improve readability of uneven or grouped value scales in advanced range scenarios.',
    'Provide subdivision markers between primary ticks for better visual orientation.',
  ],
};
