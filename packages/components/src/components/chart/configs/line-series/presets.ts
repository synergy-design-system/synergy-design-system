import {
  type ConfigModifier,
  mergeConfigs,
} from '../utilities.js';
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
