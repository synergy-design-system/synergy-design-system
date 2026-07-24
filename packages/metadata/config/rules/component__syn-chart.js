// @ts-check

/** @type {import('../../src/config/types.js').ComponentRules} */
export default {
  accessibility: [
    'Do not rely on color alone to distinguish data series; use labels, markers, or patterns where helpful.',
    'Provide a text alternative or data table for users who cannot interpret visualizations reliably.',
    'Ensure chart context is available in surrounding text, including what is shown and why it matters.',
  ],
  component: 'syn-chart',
  usageGuidelines: [
    {
      content: [
        'Use charts when visual pattern recognition (trends, peaks, outliers) is more helpful than raw tables.',
        'Keep the chart goal specific and clear (for example trend over time, comparison, distribution).',
        'Avoid using charts when exact value lookup is the primary task; provide a table or value list as a complement.',
      ],
      id: 'data-and-purpose',
      name: 'Data and Purpose',
    },
    {
      content: [
        'Use clear axis labels, units, and legends so users can understand the data context immediately.',
        'Limit the number of simultaneously visible series to reduce visual noise.',
        'Choose palettes that maintain sufficient contrast between series and background.',
        'Avoid excessive decoration and effects that do not add analytical value.',
      ],
      id: 'visual-clarity',
      name: 'Visual Clarity',
    },
    {
      content: [
        'Ensure labels, tooltips, and legends remain readable at small viewport sizes.',
        'Prevent overlapping labels and crowded markers by simplifying or reducing displayed data where needed.',
        'Keep chart dimensions appropriate for the amount and complexity of the data shown.',
      ],
      id: 'responsiveness-and-density',
      name: 'Responsiveness and Density',
    },
  ],
  useCases: [
    'Display time-based trends such as sensor values, throughput, or production metrics.',
    'Compare multiple data series in dashboards to identify differences and anomalies.',
    'Present historical data to support analysis, reporting, and decision-making.',
    'Visualize key performance indicators where users need a fast visual overview.',
  ],
};
