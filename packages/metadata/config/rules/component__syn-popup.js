// @ts-check

/** @type {import('../../src/config/types.js').ComponentRules} */
export default {
  accessibility: [
    'Ensure popup content remains reachable by keyboard when interactive elements are present.',
    'Do not hide critical information in popups that are hard to trigger on touch devices.',
    'Use clear trigger affordances so users understand where popup content comes from.',
  ],
  component: 'syn-popup',
  related: {
    components: [
      'syn-dropdown',
      'syn-tooltip',
    ],
  },
  usageGuidelines: [
    {
      content: [
        'Choose placements that keep popup content near the trigger and inside the viewport.',
        'Use distance and skidding to fine tune alignment in complex layouts.',
        'Use arrows when they help users relate popup content to its anchor.',
      ],
      id: 'placement',
      name: 'Placement',
    },
    {
      content: [
        'Use explicit activation logic for interactive popups and dismiss on outside interaction.',
        'Handle flip and shift options to avoid clipping in constrained containers.',
        'Prefer stable anchor elements and verify behavior when anchors resize.',
      ],
      id: 'behavior',
      name: 'Activation and Lifecycle',
    },
    {
      content: [
        'Keep popup content focused and short for quick understanding.',
        'Avoid placing long workflows inside simple popup containers.',
        'Use dialog or drawer for complex multi-step interactions.',
      ],
      id: 'content',
      name: 'Content and Scope',
    },
  ],
  useCases: [
    'Anchor floating menus to trigger controls.',
    'Display contextual information near data points.',
    'Implement custom positioned overlays in advanced layouts.',
  ],
};
