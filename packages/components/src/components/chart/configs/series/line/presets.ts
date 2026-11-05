import { getRealValueWithoutUnit as styleWithoutUnit} from '../../../themes/utilities.js';
import {
  type ConfigModifier,
  getRandomString,
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

/**
 * Appends a filled area range represented by a lower and upper value for each category.
 * Each tuple in `data` has the form `[lower, upper]`.
 *
 * The range is rendered as two stacked line series: the first contains the lower values, and the second contains
 * the difference between the upper and lower values. This lets the second series' area
 * fill the space between the boundaries.
 *
 * Both series share a name and stack so they use the same palette color and remain
 * coupled in the legend. By default, a unique stack is generated for each call. Set
 * `options.name` or `options.stack` to control the shared name or stack. The lower
 * boundary is hidden from the tooltip, while the upper boundary's default tooltip shows
 * the original `[lower, upper]` interval.
 *
 * @param {Array<[number, number]>} data Lower and upper values for each category, in that order.
 * @param {LineSeriesOption} options Line series options shared by both boundaries. Defaults to `{}`.
 *
 * @see https://echarts.apache.org/en/option.html#series-line
 * @see https://echarts.apache.org/en/option.html#series-line.areaStyle
 */
export const seriesAreaRange = (
  data: Array<[number, number]>,
  options: LineSeriesOption = {},
): ConfigModifier => (config) => {
  const stack = options.stack || getRandomString(8, 'area-range');
  const mergedOptions: LineSeriesOption = mergeDeep({
    name: options.name ?? stack,
    stack,
    stackStrategy: 'all',
    type: 'line',
  }, options) as LineSeriesOption;
  const lowerData = data.map(([lower]) => lower);

  const upperData = data.map(([_, upper]) => upper);
  const calculatedUpperData = data.map(([lower, upper]) => upper - lower);

  const mergedAreaStyle = mergeDeep({
    opacity: styleWithoutUnit('SynChartOpacity20'),
  }, options.areaStyle ?? {}) as LineSeriesOption['areaStyle'];

  const series: LineSeriesOption[] = [
    {
      ...mergedOptions,
      data: lowerData,
      tooltip: {
        show: false,
      },
    },
    {
      ...mergedOptions,
      areaStyle: mergedAreaStyle,
      data: calculatedUpperData,
      tooltip: {
        valueFormatter: (_, dataIndex: number) => `${lowerData[dataIndex]} - ${upperData[dataIndex]}`,
      },
    },
  ];

  return mergeConfigs(config, { series }, { arrayStrategy: 'append' });
};
