import { type ConfigModifier, mergeConfigs } from '../../utilities.js';
import { SEGMENT_SERIES } from '../../constants.js';
import type { SegmentSeriesPresetOptions, SynergySegmentSeriesOption } from './types.js';

/**
 * Adds a custom `synSegment` series.
 *
 * Renders concentric-free segments around a static center circle: `data` defines each segment's
 * radial fill degree (from the center outward), normalized between `min` and `max`. `weights`
 * defines each segment's angular width, normalized to the angle left available by `gap`.
 *
 * @param {SegmentSeriesPresetOptions} [options] Preset options.
 * @param {number[]} options.data Fill degree for each segment, from the center outward.
 * @param {number[]} [options.data[].weight] Angular width for each segment. Missing entries default to `1`.
 * @param {number} [options.min] Minimum value used to normalize the segment fill ratio. Defaults to `0`.
 * @param {number} [options.max] Maximum value used to normalize the segment fill ratio. Defaults to `100`.
 * @param {number} [options.gap] Fraction (0-1) of the full circle left empty. Defaults to `0.3`.
 * @param {number} [options.gapOrientation] Rotates the gap, in degrees. `0` centers it at the bottom.
 * @param {string} [options.icon] SVG data URL rendered inside the static center circle.
 * @param {string} [options.name] Name rendered inside the gap.
 * @param {string[]} [options.data[].itemStyle.fill] Colors for the filled portion of each segment.
 * When omitted, colors are taken from the chart's categorical color palette.
 * @param {string[]} [options.data[].itemStyle.borderColor] Colors for each segment's border. Default: transparent
 * @param {string[]} [options.data[].itemStyle.borderWidth] Width for each segment's border. Default: 0.
 * @param {string[]} [options.backgroundStyle.fill] Colors for the unfilled background of each segment.
 * @param {string[]} [options.data[].label] Labels rendered outside each segment. Defaults to the segment's value.
 *
 * @see https://echarts.apache.org/en/option.html#series
 */
export const seriesSegment = (options: SegmentSeriesPresetOptions): ConfigModifier => (config) => {
  const seriesOption: SynergySegmentSeriesOption = {
    ...options,
    type: SEGMENT_SERIES.TYPE_NAME,
  };

  return mergeConfigs(config, { series: [seriesOption] }, { arrayStrategy: 'append' });
};
