import {
  type ConfigModifier,
  mergeConfigs,
} from '../utilities.js';
import type { LineSeriesOption } from './types.js';

/**
 */
export const seriesLine = (
  options: LineSeriesOption[],
): ConfigModifier => (config) => mergeConfigs(config, {
  series: options.map((option) => ({
    type: 'line',
    ...option,
  })),
});
