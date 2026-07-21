import type { LegendComponentOption } from 'echarts/types/dist/shared.js';
import {
  type ConfigModifier,
  mergeConfigs,
  mergeDeep,
} from '../utilities.js';
import type { ECConfig } from '../../types.js';
import type { LegendShowOption } from './types.js';
import { getGridForLegendPosition, getLegendConfigForPosition, normalizeLegendPosition } from './utilities.js';

/**
 * Shows and positions a chart legend and automatically adds matching grid spacing.
 *
 * @param {LegendShowOption} [positionOrOptions] Legend position or preset options used to derive legend placement and optional legend overrides.
 * @param {ECConfig['grid']} [gridOptions] Grid config merged with the calculated legend spacing.
 *
 * @example legendShow() //  uses the default top position.
 * @example legendShow('left') // positions the legend depending on the position string.
 * @example legendShow({ position: 'right' }) // positions the legend depending on the position key.
 * @example legendShow({ position: 'right',  legend: { left: 16 } }, { top: 32 }}) // positions the legend to the right and merges custom legend and grid options.
 *
 * @see https://echarts.apache.org/en/option.html#legend
 * @see https://echarts.apache.org/en/option.html#grid
 */
export const legendShow = (
  positionOrOptions?: LegendShowOption,
  gridOptions?: ECConfig['grid'],
): ConfigModifier => (config) => {
  const position = normalizeLegendPosition(positionOrOptions);

  const defaultLegendConfig = getLegendConfigForPosition(position);

  let legendConfig = defaultLegendConfig;

  if (positionOrOptions && typeof positionOrOptions === 'object' && 'legend' in positionOrOptions) {
    const legendOptions = positionOrOptions.legend || {};
    // if selectedMode is disabled (this means legend items are not toggleable and therefore the visibility of the series is fixed), we need to remove the visibility icon. We only need it as indicator when the user can toggle the visibility of the series.
    if(legendOptions.selectedMode === false) {
      legendOptions.formatter = legendOptions.formatter || ((name: string) => name);
    }
    legendConfig = mergeDeep(defaultLegendConfig, legendOptions) as LegendComponentOption;
  }

  const gridFromSeriesNames = getGridForLegendPosition(position, legendConfig, config);
  const grid = mergeDeep(gridFromSeriesNames, gridOptions ?? {}) as NonNullable<ECConfig['grid']>;

  return mergeConfigs(config, {
    // We need to add padding to the grid depending where the legend position is, otherwise the legend will overlap with the chart
    grid,
    legend: legendConfig,
  });
};
