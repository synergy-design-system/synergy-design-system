import { getRealValueWithoutUnit as styleWithoutUnit } from '../../../themes/utilities.js';
import {
  type ConfigModifier,
  getRandomString,
  mergeConfigs,
  mergeDeep,
} from '../../utilities.js';
import type { BarSeriesOption, BarStackedOptions } from './types.js';

/**
 * Sets `series` entries as bar series and merges each passed option.
 *
 * @param {BarSeriesOption[]} options Bar series options to append. Individual options override the defaults.
 *
 * @see https://echarts.apache.org/en/option.html#series-bar
 */
export const seriesBar = (
  options: BarSeriesOption[],
): ConfigModifier => (config) => mergeConfigs(config, {
  series: options.map((option) => ({
    type: 'bar',
    ...option,
  })),
}, { arrayStrategy: 'append' });

/**
 * Appends stacked bar series with shared stack, border and label defaults, including minimum bar width and category spacing for readability.
 *
 * @param {BarSeriesOption[]} options Bar series options to append. Individual options override the defaults.
 * @param {BarStackedOptions} settings Stack and label configuration.
 * @param {string} settings.stackName Shared stack name. Defaults to an empty string, which generates a random name.
 * @param {'vertical' | 'horizontal'} settings.orientation Bar orientation, defaulting to 'vertical'. Determines label defaults only,
 * configure the chart axes separately.
 *
 *  @see https://echarts.apache.org/en/option.html#series-bar
 */
export const seriesBarStacked = (
  options: BarSeriesOption[],
  { stackName = '', orientation = 'vertical' }: BarStackedOptions = {},
): ConfigModifier => (config) => {
  const stack = stackName || getRandomString(8, 'stack-');
  const defaultBarOption: BarSeriesOption = {
    // `barCategoryGap` sets the space between category groups, while `barMinWidth` prevents bars from becoming too narrow to see. Together, they help keep stacked bars and their labels readable as categories get denser, but cannot compensate for too little chart space or long value labels.
    barCategoryGap: styleWithoutUnit('SynSpacingXLarge'),
    barMinWidth: styleWithoutUnit('SynSpacingSmall'),
    itemStyle: {
      borderColor: 'transparent',
      borderWidth: 1,
    },
    label: {
      color: 'inherit',
      position: orientation === 'vertical' ? 'left' : 'top',
      show: true,
    },
    stack,
    type: 'bar',
  };
  return mergeConfigs(config, {
    series: options.map((option) => (mergeDeep(defaultBarOption, option) as BarSeriesOption)),
  }, { arrayStrategy: 'append' });
};
