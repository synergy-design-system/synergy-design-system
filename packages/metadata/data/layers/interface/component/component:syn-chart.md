# syn-chart

## Summary

The `<syn-chart>` component is a container for displaying charts. It provides a structured layout and styling for chart elements, allowing for consistent presentation across different types of charts. The chart component is based on [Apache ECharts](https://echarts.apache.org)

## Documentation

- [Component Documentation](https://synergy-design-system.github.io/?path=/docs/charting-syn-chart--docs)
- [Figma Examples](https://www.figma.com/design/9IpXnDH4GFziUH9sOpnK8V/Chart-Library?node-id=0-1&p=f&t=PkQKC2p7WIr2k0og-0)

## Class Information

- **Tag Name:** `syn-chart`
- **Import Example:** `import SynChart from '@synergy-design-system/components/components/chart/chart.js';`

## Usage Information

- **Status:** experimental
- **Since:** 0.0.0

## Available Properties

### option

attribute: -
reflects: -
type: `ECOption`
default: `{}`

The ECharts configuration option object. This property maps 1:1 to the ECharts `option` parameter passed to `setOption()`. Consult the [ECharts option documentation](https://echarts.apache.org/en/option.html) and assign the object directly to this property. > **Note:** Currently only **line charts** (`series[].type: 'line'`) are supported. > Support for additional chart types (bar, pie, etc.) will be added in future releases or can be requested. Assigning a new object completely replaces the previous chart configuration (`notMerge: true`). To update only parts of the chart, access the underlying ECharts instance directly and call `setOption()` with custom merge options.

### palette

attribute: `palette`
reflects: yes
type: `SynChartPalette`
default: `'categorical'`

The color palette to apply to chart series. - `categorical` (default) — 12 distinct colors for comparing unrelated data series - `sequential-01` … `sequential-07` — 10-step single-hue ramps: `01`=primary, `02`=accent, `03`=muted, `04`=purple, `05`=teal, `06`=magenta, `07`=neutral - `sequential-status-critical`, `sequential-status-error`, `sequential-status-info`, `sequential-status-success`, `sequential-status-warning` — 10-step status ramps The palette sets the ECharts `color` array. If `option.color` is explicitly provided, it takes precedence over the palette.

## Available Methods

### getInstance()

parameters: -
returns: `void`

Returns the underlying ECharts instance, giving direct access to the full
[ECharts API](https://echarts.apache.org/en/api.html#echartsInstance).

Use this when the `option` property alone is not sufficient — for example to
imperatively call `setOption()` with custom merge flags, listen to ECharts events,
trigger actions, or retrieve chart data.

Returns `undefined` if called before the component has been connected to the DOM
(i.e. before `firstUpdated` has run).

## Available CSS Parts

- `base`: The component's base wrapper.
