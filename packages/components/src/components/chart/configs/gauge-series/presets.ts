import { type ConfigModifier, mergeConfigs } from '../utilities.js';
import type { GaugeSeriesPresetOptions } from './types.js';
import { buildPieSeries } from './utilities.js';

/**
 * Adds a pie-based gauge preset with an optional outer sections ring.
 *
 * Uses pie series for both the optional outer sections ring and the progress arc,
 * and renders value, unit, min/max labels, and an optional trend indicator
 * as ECharts graphic elements.
 *
 * The provided value is clamped to the inclusive range between `min` and `max`.
 * When `showSections` is enabled and `progressColor` is omitted, the progress
 * color is derived from the section that contains the current value.
 *
 * @param {GaugeSeriesPresetOptions} [options] Preset options.
 * @param {string} [options.icon] SVG data URL rendered as an image below the unit label, or below the value when no unit is set.
 * @param {number} [options.min] Minimum value for the gauge scale.
 * @param {number} [options.max] Maximum value for the gauge scale.
 * @param {number} [options.value] Current gauge value. Defaults to the midpoint between `min` and `max`.
 * @param {string} [options.unit] Unit displayed below the gauge value.
 * @param {GaugeFormatterOptions} [options.formatter] Formatter functions for the displayed gauge labels.
 * @param {(value: number) => string} [options.formatter.value] Formatter applied to the displayed gauge value.
 * @param {(value: number) => string} [options.formatter.min] Formatter applied to the displayed minimum label.
 * @param {(value: number) => string} [options.formatter.max] Formatter applied to the displayed maximum label.
 * @param {string} [options.progressColor] Gauge progress color.
 * When `showSections` is `true` and this option is omitted, the color is
 * automatically derived from the section that contains the current value.
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
 * @param {GaugeSeriesOverridesOptions} [options.overrides] ECharts overrides for gauge series and gauge graphic elements.
 * @param {PieSeriesOption} [options.overrides.sectionsSeries] ECharts overrides for the outer arc pie series.
 * @param {PieSeriesOption} [options.overrides.gaugeSeries] ECharts overrides for the main progress pie series.
 * @param {GaugeGraphicTextOption} [options.overrides.valueText] ECharts graphic overrides for the value label. Overriding `fontSize` disables responsive text sizing.
 * @param {GaugeGraphicTextOption} [options.overrides.unitText] ECharts graphic overrides for the unit label. Overriding `fontSize` disables responsive text sizing.
 * @param {GaugeGraphicImageOption} [options.overrides.iconImage] ECharts graphic overrides for the center icon image. Overriding `width` or `height` disables responsive icon sizing.
 * @param {GaugeGraphicTextOption} [options.overrides.minText] ECharts graphic overrides for the minimum label. Overriding `fontSize` disables responsive text sizing.
 * @param {GaugeGraphicTextOption} [options.overrides.maxText] ECharts graphic overrides for the maximum label. Overriding `fontSize` disables responsive text sizing.
 *
 * @see https://echarts.apache.org/en/option.html#series-pie
 * @see https://echarts.apache.org/en/option.html#graphic.elements-text
 */
export const seriesGauge = (options: GaugeSeriesPresetOptions = {}): ConfigModifier => (config) => {
  const {
    graphic,
    media,
    progress,
    sections,
  } = buildPieSeries(options);

  const seriesConfig = {
    graphic,
    media,
    series: options.showSections
      ? [sections, progress]
      : [progress],
  };

  return mergeConfigs(config, seriesConfig, { arrayStrategy: 'append' });
};
