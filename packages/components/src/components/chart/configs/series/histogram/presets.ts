import { getRealValueWithoutUnit as styleWithoutUnit } from '../../../themes/utilities.js';
import { type ConfigModifier, mergeConfigs, mergeDeep } from '../../utilities.js';
import type { BarSeriesOption } from '../bar/types.js';

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
    barCategoryGap: styleWithoutUnit('SynSpacing4xSmall'),
    barMaxWidth: '100%',
    type: 'bar',
  };
  return mergeConfigs(config, {
    series: options.map((option) => (mergeDeep(defaultBarOption, option) as BarSeriesOption)),
  }, { arrayStrategy: 'append' });
};
