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
 * @param {(number|{value:number,name?:string,icon?:string,color?:string})[]} options.data Data values/items used to size and label the outer ring segments.
 * Labels are taken from `data[i].name`, optional icons from `data[i].icon`, and optional segment colors from `data[i].color` when object items are used.
 * @param {string} [options.backgroundColor] Color of the static inner track ring.
 * When `data[i].color` is omitted, colors are taken from the chart's categorical color palette.
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
