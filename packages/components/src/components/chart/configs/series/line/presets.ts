import { getRealValueWithoutUnit as styleWithoutUnit} from '../../../themes/utilities.js';
import {
  type ConfigModifier,
  mergeConfigs,
  mergeDeep,
} from '../../utilities.js';
import type { LineSeriesOption } from './types.js';

/**
 * Sets `series` entries as line series and merges each passed option.
 *
 * @param options Line series options to append.
 *
 * @see https://echarts.apache.org/en/option.html#series-line
 */
export const seriesLine = (
  options: LineSeriesOption[],
): ConfigModifier => (config) => mergeConfigs(config, {
  series: options.map((option) => ({
    type: 'line',
    ...option,
  })),
}, { arrayStrategy: 'append' });

/**
 * Appends area series with default styling.
 *
 * @param {LineSeriesOption[]} options Area series options to append.
 *
 * @see https://echarts.apache.org/en/option.html#series-line.areaStyle
 */
export const seriesArea = (options: LineSeriesOption[]): ConfigModifier => (config) => {
  const defaultAreaOptions: LineSeriesOption = {
    areaStyle: {
      opacity: styleWithoutUnit('SynChartOpacity20'),
    },
    type: 'line',
  };

  return mergeConfigs(config, {
    series: options.map((option) => (mergeDeep(defaultAreaOptions, option) as LineSeriesOption)),
  }, { arrayStrategy: 'append' });
};
