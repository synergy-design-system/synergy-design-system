import {
  type ConfigModifier,
  mergeConfigs,
} from '../../utilities.js';
import type { BarSeriesOption } from './types.js';

/**
 * Sets `series` entries as bar series and merges each passed option.
 *
 * @param options Bar series options to append.
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

// TODO: check should there be a seriesBarStacked preset? Or should it directly be integrated into seriesBar via an additional option?
