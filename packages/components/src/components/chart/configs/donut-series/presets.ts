import { type ConfigModifier, mergeConfigs } from '../utilities.js';
import { DONUT_SERIES } from '../constants.js';
import type { DonutSeriesPresetOptions, SynergyDonutSeriesOption } from './types.js';

/**
 * Adds a custom `synergyDonut` series.
 *
 * Renders a donut chart made of two concentric rings: a static inner track
 * ring and a segmented outer ring. The data values are distributed evenly
 * around the outer ring, with each segment sized proportionally to its value
 * (normalized to 360 degrees).
 *
 * @param {DonutSeriesPresetOptions} [options] Preset options.
 * @param {number[]} options.data Data values used to size the outer ring segments.
 * @param {string} [options.backgroundColor] Color of the static inner track ring.
 * @param {string[]} [options.colors] Colors for the outer data segments.
 * When fewer colors than data points are provided, colors are repeated cyclically.
 * When omitted, colors are taken from the chart's categorical color palette.
 * @param {DonutSegmentLabelOptions[]} [options.labels] Segment labels, aligned by index with `data`.
 * Each label is centered on its segment, outside the outer ring, and may include an `icon`
 * data URL rendered before the label text.
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
