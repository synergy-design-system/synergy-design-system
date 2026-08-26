import { type ConfigModifier, mergeConfigs } from '../utilities.js';
import { GAUGE_SERIES } from '../constants.js';
import type { GaugeSeriesPresetOptions, SynergyGaugeSeriesOption } from './types.js';

/**
 * Adds a `synergyGauge` series.
 *
 * The preset forwards all supported gauge config fields to the synergy gauge.
 * For convenience, it accepts a `value` option that is converted into the first
 * `data` entry of the generated series option.
 *
 * @param {GaugeSeriesPresetOptions} [options] Preset options.
 * @param {number} [options.value] Current value of the gauge.
 * @param {number} [options.min] Minimum value for the gauge scale.
 * @param {number} [options.max] Maximum value for the gauge scale.
 * @param {string} [options.icon] SVG data URL rendered as an image below the value.
 * @param {GaugeFormatterOptions} [options.formatter] Formatter functions for the displayed gauge labels.
 * @param {(value: number) => string} [options.formatter.value] Formatter applied to the displayed gauge value.
 * @param {(value: number) => string} [options.formatter.min] Formatter applied to the displayed minimum label.
 * @param {(value: number) => string} [options.formatter.max] Formatter applied to the displayed maximum label.
 * @param {boolean} [options.showSections] Whether to render the outer sections ring.
 * @param {GaugeSectionsOptions} [options.sections] Outer section boundaries and colors.
 * @param {number[]} [options.sections.boundaries] Outer section boundaries.
 * Adjacent boundary pairs form ranges.
 * @param {string[]} [options.sections.colors] Colors for each outer section range.
 * When fewer colors than ranges are provided, colors are repeated cyclically.
 * @param {boolean} [options.showTrend] Whether to render the trend indicator label.
 * @param {GaugeTrendOptions} [options.trend] Trend indicator text and icon options.
 * @param {'up' | 'down'} [options.trend.direction] Direction of the trend indicator.
 * Defaults to `up`.
 * @param {string} [options.trend.iconUp] Icon data URL used for upward trends.
 * @param {string} [options.trend.iconDown] Icon data URL used for downward trends.
 * @param {string} [options.trend.value] Trend label text shown in the indicator pill.
 */
export const seriesGauge = (options: GaugeSeriesPresetOptions): ConfigModifier => (config) => {
  const { value, ...seriesConfig } = options;

  const seriesOption: SynergyGaugeSeriesOption = {
    ...seriesConfig,
    data: [value],
    type: GAUGE_SERIES.TYPE_NAME,
  };

  return mergeConfigs(config, { series: [seriesOption] }, { arrayStrategy: 'append' });
};
