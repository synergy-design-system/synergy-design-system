import { type ConfigModifier, compose } from '../utilities.js';
import { getRealStyleValue, getRealValueWithoutUnit } from '../../themes/utilities.js';
import type {
  AxesUpdateOptions,
  AxisKey,
  AxisLabelIconOptions,
  AxisOption,
  AxisUpdateOptions,
} from './types.js';
import { buildAxisLabelConfigWithIcon, updateAxisConfig } from './utilities.js';

/**
 * Shows horizontal split lines at each y-axis tick.
 *
 * @param {AxisUpdateOptions} options Preset options.
 * @param {number | number[]} [options.axisIndex] Axis index or indices to update. If omitted, applies to the preset default axis selection.
 * @see https://echarts.apache.org/en/option.html#yAxis.splitLine
 */
export const axesShowYSplitLines = ({ axisIndex }: AxisUpdateOptions = {}): ConfigModifier => (config) => ({
  yAxis: updateAxisConfig(config, 'yAxis', {
    splitLine: { show: true },
  }, { axisIndex }),
});

/**
 * Shows vertical split lines at each x-axis tick.
 *
 * @param {AxisUpdateOptions} options Preset options.
 * @param {number | number[]} [options.axisIndex] Axis index or indices to update. If omitted, applies to the preset default axis selection.
 * @see https://echarts.apache.org/en/option.html#xAxis.splitLine
 */
export const axesShowXSplitLines = ({ axisIndex }: AxisUpdateOptions = {}): ConfigModifier => (config) => ({
  xAxis: updateAxisConfig(config, 'xAxis', {
    splitLine: { show: true },
  }, { axisIndex }),
});

/**
 * Shows split lines on both xAxis and yAxis.
 *
 * @param {AxesUpdateOptions} options Preset options.
 * @param {number | number[]} [options.xAxisIndex] X-axis index or indices to update. If omitted, applies to the preset default x-axis selection.
 * @param {number | number[]} [options.yAxisIndex] Y-axis index or indices to update. If omitted, applies to the preset default y-axis selection.
 * @see https://echarts.apache.org/en/option.html#xAxis.axisLine
 * @see https://echarts.apache.org/en/option.html#yAxis.axisLine
 * @see https://echarts.apache.org/en/option.html#xAxis.splitLine
 * @see https://echarts.apache.org/en/option.html#yAxis.splitLine
 */
export const axesShowSplitLines = ({ xAxisIndex, yAxisIndex }: AxesUpdateOptions = {}): ConfigModifier => compose(
  axesShowYSplitLines({ axisIndex: yAxisIndex }),
  axesShowXSplitLines({ axisIndex: xAxisIndex }),
  (config) => ({
    xAxis: updateAxisConfig(config, 'xAxis', {
      axisLine: { show: true },
    }, { axisIndex: xAxisIndex }),
    yAxis: updateAxisConfig(config, 'yAxis', {
      axisLine: { show: true },
    }, { axisIndex: yAxisIndex }),
  }),
);

/**
 * Hides axis labels on x-axis.
 *
 * @param {AxisUpdateOptions} options Preset options.
 * @param {number | number[]} [options.axisIndex] Axis index or indices to update. If omitted, applies to the preset default axis selection.
 * @see https://echarts.apache.org/en/option.html#xAxis.axisLabel
 * @see https://echarts.apache.org/en/option.html#xAxis.nameGap
 */
export const axesHideXLabels = ({ axisIndex }: AxisUpdateOptions = {}): ConfigModifier => (config) => ({
  xAxis: updateAxisConfig(config, 'xAxis', {
    axisLabel: { show: false },
    nameGap: getRealValueWithoutUnit('--syn-spacing-small'),
  }, { axisIndex }),
});

/**
 * Hides axis labels on y-axis.
 *
 * @param {AxisUpdateOptions} options Preset options.
 * @param {number | number[]} [options.axisIndex] Axis index or indices to update. If omitted, applies to the preset default axis selection.
 * @see https://echarts.apache.org/en/option.html#yAxis.axisLabel
 * @see https://echarts.apache.org/en/option.html#yAxis.nameTextStyle
 */
export const axesHideYLabels = ({ axisIndex }: AxisUpdateOptions = {}): ConfigModifier => (config) => ({
  yAxis: updateAxisConfig(config, 'yAxis', {
    axisLabel: { show: false },
    nameTextStyle: { align: 'left' },
  }, { axisIndex }),
});

/**
 * Hides axis labels on x-axis and y-axis.
 *
 * @param {AxesUpdateOptions} options Preset options.
 * @param {number | number[]} [options.xAxisIndex] X-axis index or indices to update. If omitted, applies to the preset default x-axis selection.
 * @param {number | number[]} [options.yAxisIndex] Y-axis index or indices to update. If omitted, applies to the preset default y-axis selection.
 */
export const axesHideLabels = ({ xAxisIndex, yAxisIndex }: AxesUpdateOptions = {}): ConfigModifier => compose(
  axesHideXLabels({ axisIndex: xAxisIndex }),
  axesHideYLabels({ axisIndex: yAxisIndex }),
);

const axesAddLabelIcons = <T extends AxisKey>(
  axisKey: T,
  options: AxisLabelIconOptions<T>,
): ConfigModifier => (config) => {
  const defaults = {
    iconColor: getRealStyleValue('--syn-color-neutral-950'),
    iconPosition: axisKey === 'xAxis' ? 'top' : 'left',
  } as const;

  const mergedOptions = { ...defaults, ...options };

  return {
    [axisKey]: updateAxisConfig(config, axisKey, {
      axisLabel: buildAxisLabelConfigWithIcon({
        config,
        iconColor: mergedOptions.iconColor,
        iconPosition: mergedOptions.iconPosition,
        iconsStyle: mergedOptions.iconsStyle,
        iconUrls: mergedOptions.iconUrls,
        labelsStyle: mergedOptions.labelsStyle,
      }),
    } as AxisOption<T>, { axisIndex: mergedOptions.axisIndex }),
  };
};

/**
 * Adds icons to x-axis labels.
 *
 * @param {AxisLabelIconOptions<'xAxis'>} options Preset options.
 * @param {string[]} options.iconUrls SVG data URLs applied to labels in label order.
 * @param {number | number[]} [options.axisIndex] Axis index or indices to update. If omitted, applies to the preset default axis selection.
 * @param {'top' | 'bottom'} [options.iconPosition] Position of the icon relative to labels. Defaults to `'top'`.
 * @param {string} [options.iconColor] Icon color. Should be a valid CSS color string (e.g. `#ff0000`, `rgb(255, 0, 0)`, `red`). Uses a Synergy default when omitted.
 * @param {AxisLabelRich} [options.iconsStyle] Rich style object applied to all icons.
 * @param {AxisLabelRich} [options.labelsStyle] Rich style object applied to all labels.
 * @see https://echarts.apache.org/en/option.html#xAxis.axisLabel
 * @see https://echarts.apache.org/en/option.html#xAxis.axisLabel.rich
 * @see https://echarts.apache.org/en/option.html#xAxis.axisLabel.formatter
 */
export const axesAddXLabelIcons = (options: AxisLabelIconOptions<'xAxis'>): ConfigModifier => axesAddLabelIcons('xAxis', options);

/**
 * Adds icons to y-axis labels.
 *
 * @param {AxisLabelIconOptions<'yAxis'>} options Preset options.
 * @param {string[]} options.iconUrls SVG data URLs applied to labels in label order.
 * @param {number | number[]} [options.axisIndex] Axis index or indices to update. If omitted, applies to the preset default axis selection.
 * @param {'left' | 'right'} [options.iconPosition] Position of the icon relative to labels. Defaults to `'left'`.
 * @param {string} [options.iconColor] Icon color. Should be a valid CSS color string (e.g. `#ff0000`, `rgb(255, 0, 0)`, `red`). Uses a Synergy default when omitted.
 * @param {AxisLabelRich} [options.iconsStyle] Rich style object applied to all icons.
 * @param {AxisLabelRich} [options.labelsStyle] Rich style object applied to all labels.
 * @see https://echarts.apache.org/en/option.html#yAxis.axisLabel
 * @see https://echarts.apache.org/en/option.html#yAxis.axisLabel.rich
 * @see https://echarts.apache.org/en/option.html#yAxis.axisLabel.formatter
 */
export const axesAddYLabelIcons = (options: AxisLabelIconOptions<'yAxis'>): ConfigModifier => axesAddLabelIcons('yAxis', options);
