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
        'Use a bullet chart when comparing an actual value with a target range; keep the range boundaries and actual-value marker distinguishable.',
        'For bullet charts, use one categorical or time axis and one numeric axis; out-of-range values should be clear in context.',
        'Each bullet datum requires numeric start, end, and current fields. Use current instead of the former value field for the actual-value marker. Custom formatters receive params.data.current as a number; params.value and params.data.value are ECharts dimension arrays ordered as [categoryIndex, start, end, current]. The named encode dimensions are category, start, end, and current. By default, category maps to the selected category or time axis and start, end, and current map to the other numeric axis; use encode to override those mappings.',
        'Bullet series use colorBy: data by default to assign palette colors per item; choose colorBy: series to use one palette color for the series. Ranges and markers are clipped to the coordinate-system area by default; set clip: false only when drawing outside that area is intentional.',
        'Bullet series support id for targeted updates, silent to disable pointer interaction, z for drawing order, zlevel for rendering layers, and series-level tooltip overrides. Prefer z when separate layers are not needed.',
        'Axis-triggered tooltips show the shared category axis heading and include bullet values alongside other series. A named bullet shows its item name on the actual-value row, or on the range row when current is not encoded. Item-triggered bullet tooltips show the item name as a heading, falling back to the category axis label, with unlabeled value rows. The default encode.tooltip includes current, start, and end; current shows the actual-value row and either start or end shows the complete range. Category alone or an empty encoding adds no value row. Both HTML and richText modes use a line in markerStyle.color for the actual value and a circle in the range color for the range. Global and series tooltip.formatter overrides remain supported; tooltip.valueFormatter formats the actual value and each endpoint separately.',
        'Bullet itemStyle controls range colors, borders, opacity, and shadows at series or item level. The actual-value marker uses markerStyle, with color defaulting to SynChartPlotLineColor.',
        'Use series-level markerStyle.width and markerStyle.height for physical marker dimensions in pixels, independent of chart orientation. Finite explicit sizes are clamped to at least 1 pixel; omitted or non-finite sizes use orientation-based defaults. Markers stay centered on the actual value and remain above the range during emphasis.',
        'Use markerStyle for marker color, borderColor, borderWidth, borderType, borderDashOffset, and opacity. Explicit marker dimensions are independent of barMinWidth and barMaxWidth, but still respect chart clipping.',
        'Bullet emphasis supports disabled and range itemStyle overrides at series or item level. Hovering an item changes only that item; other items remain unchanged.',
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
        'For bullet charts, use barMinWidth and barMaxWidth to constrain range and marker thickness in pixels or percentages of the full category band. The minimum defaults to 1 pixel and takes priority over the maximum, barWidth, and category spacing; large minimum widths may cause overlap.',
        'Bullet range widths follow ECharts bar sizing: omitted or zero barWidth uses the available category band minus barCategoryGap, capped by barMaxWidth. Synergy uses the same SynSpacing3xSmall category gap and SynSpacingLarge maximum as normal bar series. Explicit pixel or percentage barWidth ignores category spacing and may exceed the band, subject to barMinWidth and barMaxWidth.',
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
