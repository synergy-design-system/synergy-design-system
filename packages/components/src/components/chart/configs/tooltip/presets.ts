import { type ConfigModifier, mergeConfigs } from '../utilities.js';
import type { ECConfig } from '../../types.js';

/**
 * Shows a tooltip
 *
 * @param {ECConfig['tooltip']} [option] Tooltip options
 *
 * @see https://echarts.apache.org/en/option.html#tooltip
 */
export const tooltipShow = (option?: ECConfig['tooltip']): ConfigModifier => (config) => mergeConfigs(config, {
  tooltip: {
    ...option,
  },
});
