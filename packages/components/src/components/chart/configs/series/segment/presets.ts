import { type ConfigModifier, mergeConfigs } from '../../utilities.js';
import { SEGMENT_SERIES } from '../../constants.js';
import type { SegmentSeriesPresetOptions, SynergySegmentSeriesOption } from './types.js';

/**
 * Adds a custom `synSegment` series.
 *
 * Renders concentric-free segments around a static center circle: `data` defines each segment's
 * radial fill degree (from the center outward), normalized between `min` and `max`. Each item's `weight`
 * defines each segment's angular width, normalized to the angle left available by `gap`.
 *
 * @param {SegmentSeriesPresetOptions} [options] Preset options.
 * @param {number} [options.min] Minimum value used to normalize the segment fill ratio. Defaults to `0`.
 * @param {number} [options.max] Maximum value used to normalize the segment fill ratio. Defaults to `100`.
 * @param {number} [options.gap] Fraction (0-1) of the full circle left empty. Defaults to `0.3`.
 * @param {number} [options.gapOrientation] Rotates the gap (and therefore the whole chart), in degrees. `0` centers the gap at the bottom. Defaults to `0`.
 * @param {string} [options.icon] SVG data URL rendered inside the static center circle.
 * @param {string} [options.name] Name rendered inside the gap.
 * @param {TextStyle} [options.nameTextStyle] Text style for the name rendered inside the gap.
 * @param {TextStyle} [options.labelTextStyle] Text style for the segment labels rendered outside each segment.
 * @param {ItemStyle} [options.itemStyle] Item style for each segment, including fill color, border color, and border width.
 * @param {string} [options.itemStyle.color] Fill color for each segment.
 * @param {string} [options.itemStyle.borderColor] Border color for each segment.
 * @param {number} [options.itemStyle.borderWidth] Border width for each segment.
 * @param {BackgroundStyle} [options.backgroundStyle] Background style for each segment, including fill color, border color, and border width.
 * @param {string} [options.backgroundStyle.color] Fill color for the background of each segment.
 * @param {string} [options.backgroundStyle.borderColor] Border color for the background of each segment.
 * @param {number} [options.backgroundStyle.borderWidth] Border width for the background of each segment.
 * @param {number|string} [options.top] Top inset of the drawable area in pixels or percent.
 * @param {number|string} [options.right] Right inset of the drawable area in pixels or percent.
 * @param {number|string} [options.bottom] Bottom inset of the drawable area in pixels or percent.
 * @param {number|string} [options.left] Left inset of the drawable area in pixels or percent.
 * @param {(number|SegmentDataItem)[]} [options.data] Array of segment values or objects containing segment metadata.
 * @param {number} [options.data[].value] Numeric value of the segment. Defines the amplitude of a segment
 * @param {number} [options.data[].weight] Angular width for each segment. Missing entries default to `1`.
 * @param {string} [options.data[].name] Series item name used for displaying in legend.
 * @param {string | ((value: number) => string)} [options.data[].label] Label shown for the segment item. If set to a function, it will be called with the segment value to generate the label. If not set, the value will be used as the label. To remove the label, set this to `undefined`.
 * @param {TextStyle} [options.data[].labelTextStyle] Text style for the segment label rendered outside each segment.
 *
 * @param {BackgroundStyle} [options.data[].backgroundStyle] Background style for the specific segment, including fill color, border color, and border width.
 * @param {string} [options.data[].backgroundStyle.fill] Fill color for the background of the specific segment.
 * @param {string} [options.data[].backgroundStyle.borderColor] Border color for the background of the specific segment.
 * @param {string} [options.data[].backgroundStyle.borderWidth] Border width for the background of the specific segment.
 * @param {ItemStyle} [options.data[].itemStyle] Item style for the specific segment, including fill color, border color, and border width.
 * @param {string} [options.data[].itemStyle.color] Fill color for the specific segment.
 * @param {string} [options.data[].itemStyle.borderColor] Border color for the specific segment.
 * @param {number} [options.data[].itemStyle.borderWidth] Border width for the specific segment. Defaults to `0`.
 *
 */
export const seriesSegment = (options: SegmentSeriesPresetOptions): ConfigModifier => (config) => {
  const seriesOption: SynergySegmentSeriesOption = {
    ...options,
    type: SEGMENT_SERIES.TYPE_NAME,
  };

  return mergeConfigs(config, { series: [seriesOption] }, { arrayStrategy: 'append' });
};
