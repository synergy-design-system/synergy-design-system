# syn-chart

## Summary

The `<syn-chart>` component is a container for displaying charts. It provides a structured layout and styling for chart elements, allowing for consistent presentation across different types of charts. The chart component is based on [Apache ECharts](https://echarts.apache.org)

## Common Use Cases

- Display time-based trends such as sensor values, throughput, or production metrics.
- Compare multiple data series in dashboards to identify differences and anomalies.
- Present historical data to support analysis, reporting, and decision-making.
- Visualize key performance indicators where users need a fast visual overview.

## Usage Guidelines

### Data and Purpose

- Use charts when visual pattern recognition (trends, peaks, outliers) is more helpful than raw tables.
- Keep the chart goal specific and clear (for example trend over time, comparison, distribution).
- Avoid using charts when exact value lookup is the primary task; provide a table or value list as a complement.

### Choosing a Chart Type

- Use line charts for trends across ordered data, such as time or sequence; avoid connecting categories that have no meaningful order.
- Use area charts to emphasize magnitude across an ordered sequence. Prefer lines when overlapping filled areas would obscure comparisons.
- Use area-range charts to show lower and upper bounds, such as a minimum-to-maximum range or uncertainty band.
- Use bars to compare discrete categories; group bars for side-by-side series comparisons and stack them when each category total and its parts are meaningful.
- Use histograms to show the distribution of a continuous measure grouped into value intervals, not to compare unrelated categories.
- Use a donut chart to show a small number of categories as proportions of one whole; use bars or a table when precise comparisons between values matter.
- Use a gauge for one current value against a defined scale or thresholds, rather than to show a time trend.
- Use a bullet chart to compare an actual value with its displayed range, such as a target or acceptable range.
- Use a segment chart for several independent radial progress indicators; do not imply that the segments are parts of one whole.

### Visual Clarity

- Use clear axis labels, units, and legends so users can understand the data context immediately.
- Limit the number of simultaneously visible series to reduce visual noise.
- Choose palettes that maintain sufficient contrast between series and background.
- Avoid excessive decoration and effects that do not add analytical value.

### Responsiveness and Density

- Ensure labels, tooltips, and legends remain readable at small viewport sizes.
- Prevent overlapping labels and crowded markers by simplifying or reducing displayed data where needed.
- Keep chart dimensions appropriate for the amount and complexity of the data shown.

## Accessibility

- Do not rely on color alone to distinguish data series; use labels, markers, or patterns where helpful.
- Provide a text alternative or data table for users who cannot interpret visualizations reliably.
- Ensure chart context is available in surrounding text, including what is shown and why it matters.
