import type { ECConfig } from '../../types.js';

/**
 * Supported positions for the chart legend.
 */
export type LegendPosition = 'top' | 'bottom' | 'left' | 'right';

/**
 * Options for the `showLegend` preset.
 *
 * `legendOptions` and `gridOptions` can be either single ECharts config objects
 * or arrays, matching the ECharts API.
 */
export type LegendOptions = {
  /**
   * Legend position used to derive default legend placement and grid spacing.
   *
   * @default 'top'
   */
  position?: LegendPosition,
  /**
   * Custom legend configuration merged with the position defaults.
   */
  legendOptions?: ECConfig['legend'],
  /**
   * Custom grid configuration merged with the legend-derived grid offsets.
   */
  gridOptions?: ECConfig['grid'],
};
