import { type ConfigModifier, mergeConfigs, mergeDeep } from '../utilities.js';
import type { ECConfig } from '../../types.js';
import { getGridForLegendPosition, getLegendConfigForPosition } from './utilities.js';
import type { LegendOptions } from './types.js';

/**
 * Shows and positions a chart legend and applies matching grid spacing.
 *
 * This preset is a convenience helper: by default it adds one positioned legend
 * and the corresponding grid offset to avoid overlap.
 *
 * For full flexibility you can pass full ECharts legend/grid configs, including arrays
 * for multiple legends or grids. The position only applies to the first legend in the array.
 *
 * @param {LegendOptions} options Preset options.
 * @param {'top' | 'bottom' | 'left' | 'right'} [options.position='top'] Position used to derive default legend placement and grid offsets.
 * @param {ECConfig['legend']} [options.legendOptions] Custom legend configuration merged onto the position defaults.
 * @param {ECConfig['grid']} [options.gridOptions] Custom grid configuration merged onto the computed legend-safe offsets.
 * @see https://echarts.apache.org/en/option.html#legend
 * @see https://echarts.apache.org/en/option.html#grid
 */
export const legendShow = ({
  position = 'top',
  legendOptions = {},
  gridOptions = {},
}: LegendOptions = {}): ConfigModifier => (config) => {
  const legendConfig = mergeDeep(getLegendConfigForPosition(position), legendOptions) as NonNullable<ECConfig['legend']>;

  const gridFromSeriesNames = getGridForLegendPosition(position, legendConfig, config);
  const grid = mergeDeep(gridFromSeriesNames, gridOptions) as NonNullable<ECConfig['grid']>;
  return mergeConfigs(config, {
    // We need to add padding to the grid depending where the legend position is, otherwise the legend will overlap with the chart
    grid,
    legend: legendConfig,
  });
};
