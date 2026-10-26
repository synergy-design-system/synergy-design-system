import { type ConfigModifier, mergeConfigs, mergeDeep } from '../../utilities.js';
import type { BarSeriesOption } from './types.js';

/**
 * Creates histogram series using ECharts bar series and appends them to `series`.
 *
 * @param {BarSeriesOption[]} options Options for the underlying bar series. Individual options override the defaults.
 *
 * @see https://echarts.apache.org/en/option.html#series-bar
 */
export const seriesHistogram = (
  options: BarSeriesOption[],
): ConfigModifier => (config) => {
  const defaultBarOption: BarSeriesOption = {
    barCategoryGap: 1,
    type: 'bar',
  };
  return mergeConfigs(config, {
    series: options.map((option) => (mergeDeep(defaultBarOption, option) as BarSeriesOption)),
  }, { arrayStrategy: 'append' });
};
