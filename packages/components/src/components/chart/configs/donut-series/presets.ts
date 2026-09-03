import { type ConfigModifier, mergeConfigs } from '../utilities.js';
import { DONUT_SERIES } from '../constants.js';
import type { DonutSeriesPresetOptions, SynergyDonutSeriesOption } from './types.js';

/**
 * Adds a custom `synDonut` series.
 *
 * Renders a donut chart made of two concentric rings: a static inner track
 * ring and a segmented outer ring. The data values are distributed evenly
 * around the outer ring, with each segment sized proportionally to its value
 * (normalized to 360 degrees).
 *
 * @param {DonutSeriesPresetOptions} [options] Preset options.
 * @param {DonutDataItem[]} [options.data] Data values/items used to size and label the outer ring segments.
 * @param {number} [options.data[].value] Numeric value of the segment; determines the slice angle relative to the other values.
 * @param {string} [options.data[].name] Label shown for the segment.
 * @param {string} [options.data[].icon] Optional icon as SVG data url used to render a segment icon alongside the label.
 * @param {[number|string, number|string]} [options.center] Center position within the donut layout area. Each value accepts pixels or percentages.
 * @param {number|string} [options.radius] Outer donut radius in pixels/percentage.
 * @param {number|string} [options.top] Top inset that shrinks the donut layout area before center/radius are resolved.
 * @param {number|string} [options.right] Right inset that shrinks the donut layout area before center/radius are resolved.
 * @param {number|string} [options.bottom] Bottom inset that shrinks the donut layout area before center/radius are resolved.
 * @param {number|string} [options.left] Left inset that shrinks the donut layout area before center/radius are resolved.
 *
 * @see https://echarts.apache.org/en/option.html#series
 */
export const seriesDonut = (options: DonutSeriesPresetOptions): ConfigModifier => (config) => {
  const seriesOption: SynergyDonutSeriesOption = {
    ...options,
    type: DONUT_SERIES.TYPE_NAME,
  };

  return mergeConfigs(config, { series: [seriesOption] }, { arrayStrategy: 'append' });
};
