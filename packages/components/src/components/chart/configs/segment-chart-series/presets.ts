import { type ConfigModifier, mergeConfigs } from '../utilities.js';
import { SEGMENT_CHART_SERIES } from '../constants.js';
import type { SegmentChartSeriesPresetOptions, SynergySegmentChartSeriesOption } from './types.js';

/**
 * Adds a custom `synergySegmentChart` series.
 *
 * Renders concentric-free segments around a static center circle: `data` defines each segment's
 * radial fill degree (from the center outward), normalized between `min` and `max`. `weights`
 * defines each segment's angular width, normalized to the angle left available by `gap`.
 *
 * @param {SegmentChartSeriesPresetOptions} [options] Preset options.
 * @param {number[]} options.data Fill degree for each segment, from the center outward.
 * @param {number[]} [options.weights] Angular width for each segment. Missing entries default to `1`.
 * @param {number} [options.min] Minimum value used to normalize the segment fill ratio. Defaults to `0`.
 * @param {number} [options.max] Maximum value used to normalize the segment fill ratio. Defaults to `100`.
 * @param {number} [options.gap] Fraction (0-1) of the full circle left empty. Defaults to `0.3`.
 * @param {number} [options.gapOrientation] Rotates the gap, in degrees. `0` centers it at the bottom.
 * @param {string} [options.icon] SVG data URL rendered inside the static center circle.
 * @param {string} [options.mainLabel] Main label rendered inside the gap.
 * @param {string} [options.backgroundColor] Color of the static center circle.
 * @param {string[]} [options.segmentColors] Colors for the filled portion of each segment.
 * When omitted, colors are taken from the chart's categorical color palette.
 * @param {string[]} [options.segmentBackgroundColors] Colors for the unfilled background of each segment.
 * @param {string[]} [options.segmentOutlineColor] Colors for each segment's 1px outline. No outline when omitted.
 * @param {string[]} [options.segmentLabels] Labels rendered outside each segment. Defaults to the segment's value.
 * @param {string[]} [options.segmentLabelColors] Colors for each segment label.
 *
 * @see https://echarts.apache.org/en/option.html#series
 */
export const seriesSegmentChart = (options: SegmentChartSeriesPresetOptions): ConfigModifier => (config) => {
  const seriesOption: SynergySegmentChartSeriesOption = {
    ...options,
    type: SEGMENT_CHART_SERIES.TYPE_NAME,
  };

  return mergeConfigs(config, { series: [seriesOption] }, { arrayStrategy: 'append' });
};
