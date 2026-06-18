import type { ConfigModifier } from '../config.js';
import { compose } from '../config.js';
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
 * ECharts reference: https://echarts.apache.org/en/option.html#yAxis.splitLine
 */
export const withYAxisSplitLines = ({ axisIndex }: AxisUpdateOptions = {}): ConfigModifier => (config) => ({
  yAxis: updateAxisConfig(config, 'yAxis', {
    splitLine: { show: true },
  }, { axisIndex }),
});

/**
 * Shows vertical split lines at each x-axis tick.
 *
 * ECharts reference: https://echarts.apache.org/en/option.html#xAxis.splitLine
 */
export const withXAxisSplitLines = ({ axisIndex }: AxisUpdateOptions = {}): ConfigModifier => (config) => ({
  xAxis: updateAxisConfig(config, 'xAxis', {
    splitLine: { show: true },
  }, { axisIndex }),
});

/**
 * Shows split lines on both xAxis and yAxis.
 *
 * ECharts reference:
 * - https://echarts.apache.org/en/option.html#xAxis.axisLine
 * - https://echarts.apache.org/en/option.html#yAxis.axisLine
 * - https://echarts.apache.org/en/option.html#xAxis.splitLine
 * - https://echarts.apache.org/en/option.html#yAxis.splitLine
 */
export const withAxesSplitLines = ({ xAxisIndex, yAxisIndex }: AxesUpdateOptions = {}): ConfigModifier => compose(
  withYAxisSplitLines({ axisIndex: yAxisIndex }),
  withXAxisSplitLines({ axisIndex: xAxisIndex }),
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
 * ECharts reference:
 * - https://echarts.apache.org/en/option.html#xAxis.axisLabel
 * - https://echarts.apache.org/en/option.html#xAxis.nameGap
 */
export const withHiddenXAxisLabels = ({ axisIndex }: AxisUpdateOptions = {}): ConfigModifier => (config) => ({
  xAxis: updateAxisConfig(config, 'xAxis', {
    axisLabel: { show: false },
    nameGap: getRealValueWithoutUnit('--syn-spacing-small'),
  }, { axisIndex }),
});

/**
 * Hides axis labels on y-axis.
 *
 * ECharts reference:
 * - https://echarts.apache.org/en/option.html#yAxis.axisLabel
 * - https://echarts.apache.org/en/option.html#yAxis.nameTextStyle
 */
export const withHiddenYAxisLabels = ({ axisIndex }: AxisUpdateOptions = {}): ConfigModifier => (config) => ({
  yAxis: updateAxisConfig(config, 'yAxis', {
    axisLabel: { show: false },
    nameTextStyle: { align: 'left' },
  }, { axisIndex }),
});

/**
 * Hides axis labels on x-axis and y-axis.
 */
export const withHiddenAxisLabels = ({ xAxisIndex, yAxisIndex }: AxesUpdateOptions = {}): ConfigModifier => compose(
  withHiddenXAxisLabels({ axisIndex: xAxisIndex }),
  withHiddenYAxisLabels({ axisIndex: yAxisIndex }),
);

export const withAxisLabelIcons = <T extends AxisKey>(
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
 * ECharts reference:
 *  - https://echarts.apache.org/en/option.html#xAxis.axisLabel
 *  - https://echarts.apache.org/en/option.html#xAxis.axisLabel.rich
 *  - https://echarts.apache.org/en/option.html#xAxis.axisLabel.formatter
 */
export const withXAxisLabelIcons = (options: AxisLabelIconOptions<'xAxis'>): ConfigModifier => withAxisLabelIcons('xAxis', options);

/**
 * Adds icons to y-axis labels.
 *
 * ECharts reference:
 *  - https://echarts.apache.org/en/option.html#yAxis.axisLabel
 *  - https://echarts.apache.org/en/option.html#yAxis.axisLabel.rich
 *  - https://echarts.apache.org/en/option.html#yAxis.axisLabel.formatter
 */
export const withYAxisLabelIcons = (options: AxisLabelIconOptions<'yAxis'>): ConfigModifier => withAxisLabelIcons('yAxis', options);
