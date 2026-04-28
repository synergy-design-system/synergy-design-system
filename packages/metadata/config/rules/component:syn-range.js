// @ts-check

/** @type {import('../../src/config/types.js').ComponentRules} */
export default {
  accessibility: [
    'Always provide a label for the range so that screenreaders correctly announce the component.',
    'Provide alternative input methods like numeric input fields or a stepper, allowing users who struggle with dragging to manually set values.',
  ],
  component: 'syn-range',
  related: {
    components: [
      'syn-range-tick',
    ],
    templates: [
      'Forms',
    ],
  },
  usageGuidelines: {
    background: [
      'Use light background options like white, neutral-100 or primary-100.',
    ],
    context: [
      'Position the range component in an uncluttered area to facilitate easy interaction.',
      'Reserve the component for relevant, contextually meaningful ranges (e.g., price filters, time spans).',
    ],
    labels_and_value_display: [
      'Provide clear labels or tooltips indicating the current value or range.',
      'Pair the slider with text labels or numeric indicators for precise adjustments.',
      'Avoid relying solely on color or visuals; add a text representation for clarity.',
    ],
    range_definition: [
      'Choose realistic minimum and maximum values for the intended use case.',
      'Avoid extremely large intervals (e.g., 1 to 1,000,000) unless necessary, and label them thoroughly.',
      'Use appropriate step sizes for fine control (e.g., increments of 5 or 10 for a price slider).',
      'Enable two-handle sliders (min/max) if the scenario requires independent adjustments.',
    ],
  },
  useCases: [
    'Adjust settings within a defined range (e.g., volume, brightness).',
    'Filter results by specifying a price range or product parameters.',
    'Select time intervals for scheduling or reminder tasks.',
    'Set minimum and maximum inputs (e.g., age, quantity, distance).',
    'Visualize progress by assigning milestones within a larger goal or process.',
  ],
};
