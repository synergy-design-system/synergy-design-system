/* eslint-disable complexity */
import type { TextCommonOption } from 'echarts/types/src/util/types.js';
import type { ECConfig } from '../types.js';
import { getRealStyleValue, getRealValueWithoutUnit } from '../themes/utilities.js';
import { type ConfigModifier, compose, mergeConfigs } from './config.js';
import { colorSvgDataUrl, extractYAxisLabelTexts, measureMaxTextWidth } from './utilities.js';

type AxisKey = 'xAxis' | 'yAxis';
type UnpackedArray<T> = T extends Array<infer U> ? U : T;
type AxisOption<T extends AxisKey> = UnpackedArray<NonNullable<ECConfig[T]>>;
type AxisIndexSelection = number | number[];
type AxisPatchOptions = {
  axisIndex?: AxisIndexSelection;
};
type GridLinesOptions = {
  xAxisIndex?: AxisIndexSelection;
  yAxisIndex?: AxisIndexSelection;
};

const patchAxisConfig = <T extends AxisKey>(
  config: ECConfig,
  axisKey: T,
  patch: AxisOption<T>,
  options: AxisPatchOptions = {},
): ECConfig[T] => {
  const { axisIndex } = options;
  const shouldPatchIndex = (index: number): boolean => {
    if (axisIndex === undefined) return true;
    if (Array.isArray(axisIndex)) return axisIndex.includes(index);
    return axisIndex === index;
  };

  const mergeSingleAxis = (axisOption: AxisOption<T>): AxisOption<T> => {
    const merged = mergeConfigs(
      { [axisKey]: axisOption },
      { [axisKey]: patch },
    );

    return merged[axisKey] as AxisOption<T>;
  };

  const axisConfig = config[axisKey];
  if (Array.isArray(axisConfig)) {
    return axisConfig
      .map((axis, index) => {
        if (!shouldPatchIndex(index)) {
          return axis;
        }

        return mergeSingleAxis(axis as AxisOption<T>);
      }) as ECConfig[T];
  }

  if (!shouldPatchIndex(0)) {
    return axisConfig;
  }

  return mergeSingleAxis((axisConfig ?? {}) as AxisOption<T>);
};

/**
 * Enables horizontal grid lines across the chart by showing the `yAxis.splitLine`.
 * If `axisIndex` is omitted, all y-axes are patched.
 * Provide a number or number[] to patch one or several y-axis indexes.
 */
export const showHorizontalGridLines = ({ axisIndex }: AxisPatchOptions = {}): ConfigModifier => (config) => mergeConfigs(config, {
  yAxis: patchAxisConfig(config, 'yAxis', {
    splitLine: {
      show: true,
    },
  }, { axisIndex }),
});

/**
 * Enables vertical grid lines across the chart by showing the `xAxis.splitLine`.
 * If `axisIndex` is omitted, all x-axes are patched.
 * Provide a number or number[] to patch one or several x-axis indexes.
 */
export const showVerticalGridLines = ({ axisIndex }: AxisPatchOptions = {}): ConfigModifier => (config) => mergeConfigs(config, {
  xAxis: patchAxisConfig(config, 'xAxis', {
    splitLine: {
      show: true,
    },
  }, { axisIndex }),
});

/**
 * Enables grid lines in both directions and makes the `xAxis` and `yAxis` baseline visible.
 * Composes `showHorizontalGridLines` and `showVerticalGridLines`.
 * If no index options are provided, all x- and y-axes are patched.
 */
export const showGridLines = ({ xAxisIndex, yAxisIndex }: GridLinesOptions = {}): ConfigModifier => compose(
  showHorizontalGridLines({ axisIndex: yAxisIndex }),
  showVerticalGridLines({ axisIndex: xAxisIndex }),
  (config) => mergeConfigs(config, {
    xAxis: patchAxisConfig(config, 'xAxis', {
      axisLine: {
        show: true,
      },
    }, { axisIndex: xAxisIndex }),
    yAxis: patchAxisConfig(config, 'yAxis', {
      axisLine: {
        show: true,
      },
    }, { axisIndex: yAxisIndex }),
  }),
);

/**
 * Hides the x-axis tick labels. Adjusts `nameGap` to compensate for the removed label space.
 * If `axisIndex` is omitted, all x-axes are patched.
 */
export const hideXAxisValues = ({ axisIndex }: AxisPatchOptions = {}): ConfigModifier => (config) => mergeConfigs(config, {
  xAxis: patchAxisConfig(config, 'xAxis', {
    axisLabel: {
      show: false,
    },
    nameGap: 12,
  }, { axisIndex }),
});

/**
 * Hides the y-axis tick labels. Left-aligns the axis name text when labels are hidden.
 * If `axisIndex` is omitted, all y-axes are patched.
 */
export const hideYAxisValues = ({ axisIndex }: AxisPatchOptions = {}): ConfigModifier => (config) => mergeConfigs(config, {
  yAxis: patchAxisConfig(config, 'yAxis', {
    axisLabel: {
      show: false,
    },
    nameTextStyle: {
      align: 'left',
    },
  }, { axisIndex }),
});

/**
 * Hides tick labels on both the x-axis and y-axis.
 * Composes `hideXAxisValues` and `hideYAxisValues`.
 * If no index options are provided, all x- and y-axes are patched.
 */
export const hideAxesValues = ({ xAxisIndex, yAxisIndex }: GridLinesOptions = {}): ConfigModifier => compose(
  hideXAxisValues({ axisIndex: xAxisIndex }),
  hideYAxisValues({ axisIndex: yAxisIndex }),
);

/**
 * Builds an ECharts `xAxis.axisLabel` config that renders a custom icon above
 * each axis label. Pass an array of SVG data URLs, one per x-axis value.
 *
 * @example
 * \`\`\`ts
 * const iconUrls = ['data:image/svg+xml;base64,...', ...];
 * chart.config = enhanceConfig(baseConfig).with(xAxisWithIconLabels({ iconUrls })).build();
 * \`\`\`
 *
 * @param options.iconUrls - An array of SVG data URLs, one per x-axis value.
 * @param options.iconPosition - Whether icons appear above or below the label (default: \`'top'\`).
 * @param options.iconColor - Icon fill color used to replace \`currentColor\` in the SVG (default: \`--syn-color-neutral-950\`).
 * @param options.iconsStyle - ECharts \`TextCommonOption\` styles applied to each icon.
 * @param options.labelsStyle - ECharts \`TextCommonOption\` styles applied to each label.
 * @param options.axisIndex - Optional x-axis index (number) or indexes (number[]) to patch. If omitted, all x-axes are patched.
 */
export const xAxisWithIconLabels = ({
  iconColor = getRealStyleValue('--syn-color-neutral-950'),
  iconPosition = 'top',
  axisIndex,
  iconUrls,
  iconsStyle,
  labelsStyle,
}: {
  axisIndex?: AxisIndexSelection;
  iconColor?: string;
  iconPosition?: 'top' | 'bottom';
  iconUrls: Array<string>;
  iconsStyle?: TextCommonOption;
  labelsStyle?: TextCommonOption;
}): ConfigModifier => {
  const defaultFontWeightValue = getRealStyleValue('--syn-font-weight-normal');
  const defaultFontWeight = /^\d+$/.test(defaultFontWeightValue)
    ? Number(defaultFontWeightValue)
    : defaultFontWeightValue as TextCommonOption['fontWeight'];

  const mergedIconsStyle = {
    height: getRealValueWithoutUnit('--syn-spacing-large'),
    width: getRealValueWithoutUnit('--syn-spacing-large'),
    ...iconsStyle,
  };
  const mergedLabelsStyle = {
    // We need to set the default font stylings here again, because for *rich* otherwise the global text style default are used
    color: getRealStyleValue('--syn-typography-color-text-quiet'),
    fontFamily: getRealStyleValue('--syn-font-sans'),
    fontSize: getRealStyleValue('--syn-font-size-x-small'),
    fontWeight: defaultFontWeight,
    padding: iconPosition === 'top' ? [4, 0, 0, 0] : [0, 0, 4, 0],
    ...labelsStyle,
  };
  return (config) => mergeConfigs(config, {
    xAxis: patchAxisConfig(config, 'xAxis', {
      axisLabel: {
        formatter: (value: string | number, index: number) => {
          if (iconPosition === 'top') {
            return `{icon_${index}|}\n{label|${value}}`;
          }
          return `{label|${value}}\n{icon_${index}|}`;
        },
        rich: {
          label: mergedLabelsStyle,
          ...Object.fromEntries(
            iconUrls.map((url, index) => [
                `icon_${index}`,
                {
                  ...mergedIconsStyle,
                  backgroundColor: { image: colorSvgDataUrl(url, iconColor) },
                },
            ]),
          ),
        },
      },
    }, { axisIndex }),
  });
};

/**
 * Builds an ECharts \`yAxis.axisLabel\` config that renders a custom icon next to
 * each axis label. Pass an array of SVG data URLs, one per y-axis value.
 *
 * The label box width is calculated automatically from the widest label in the
 * config so icons stay aligned regardless of label length. Override by passing
 * \`labelsStyle.width\`.
 *
 * @example
 * \`\`\`ts
 * const iconUrls = ['data:image/svg+xml;base64,...', ...];
 * chart.config = enhanceConfig(baseConfig).with(yAxisWithIconLabels({ iconUrls })).build();
 * \`\`\`
 *
 * @param options.iconUrls - An array of SVG data URLs, one per y-axis value.
 * @param options.iconPosition - Whether icons appear to the left or right of the label (default: \`'left'\`).
 * @param options.iconColor - Icon fill color used to replace \`currentColor\` in the SVG (default: \`--syn-color-neutral-950\`).
 * @param options.iconsStyle - ECharts \`TextCommonOption\` styles applied to each icon.
 * @param options.labelsStyle - ECharts \`TextCommonOption\` styles applied to each label.
 * @param options.axisIndex - Optional y-axis index (number) or indexes (number[]) to patch. If omitted, all y-axes are patched.
 */
export const yAxisWithIconLabels = ({
  iconColor = getRealStyleValue('--syn-color-neutral-950'),
  iconPosition = 'left',
  axisIndex,
  iconUrls,
  iconsStyle,
  labelsStyle,
}: {
  axisIndex?: AxisIndexSelection;
  iconColor?: string;
  iconPosition?: 'left' | 'right';
  iconUrls: Array<string>;
  iconsStyle?: TextCommonOption;
  labelsStyle?: TextCommonOption;
}): ConfigModifier => (config) => {
  const defaultFontWeightValue = getRealStyleValue('--syn-font-weight-normal');
  const defaultFontWeight = /^\d+$/.test(defaultFontWeightValue)
    ? Number(defaultFontWeightValue)
    : defaultFontWeightValue as TextCommonOption['fontWeight'];

  const mergedIconsStyle = {
    height: getRealValueWithoutUnit('--syn-spacing-large'),
    width: getRealValueWithoutUnit('--syn-spacing-large'),
    ...iconsStyle,
  };

  // Dynamically calculate the label box width so all icons align regardless of
  // label length. Skipped for 'right' position; caller can override via labelsStyle.width.
  let effectiveWidth: number | undefined;
  if (iconPosition !== 'right') {
    if (labelsStyle?.width !== undefined) {
      effectiveWidth = labelsStyle.width as number;
    } else {
      let fontSize = labelsStyle?.fontSize ?? getRealStyleValue('--syn-font-size-x-small');
      fontSize = typeof fontSize === 'number' ? `${fontSize}px` : fontSize;
      const fontFamily = labelsStyle?.fontFamily ?? getRealStyleValue('--syn-font-sans');
      const fontWeight = labelsStyle?.fontWeight ?? defaultFontWeight;
      const texts = extractYAxisLabelTexts(config);
      const measured = texts.length > 0 ? measureMaxTextWidth(texts, `${fontWeight} ${fontSize} ${fontFamily}`) : 0;
      effectiveWidth = measured > 0 ? measured : 30;
    }
  }

  const mergedLabelsStyle = {
    // We need to set the default font stylings here again, because for *rich* otherwise the global text style default are used
    color: getRealStyleValue('--syn-typography-color-text-quiet'),
    fontFamily: getRealStyleValue('--syn-font-sans'),
    fontSize: getRealStyleValue('--syn-font-size-x-small'),
    fontWeight: defaultFontWeight,
    padding: iconPosition === 'left' ? [0, 0, 0, 4] : [0, 4, 0, 0],
    width: effectiveWidth,
    ...labelsStyle,
  };

  const axisLabelPatch = {
    formatter: (value: string | number, index: number) => {
      if (iconPosition === 'left') {
        return `{icon_${index}|}{label|${value}}`;
      }
      return `{label|${value}}{icon_${index}|}`;
    },
    rich: {
      label: mergedLabelsStyle,
      ...Object.fromEntries(
        iconUrls.map((url, index) => [
            `icon_${index}`,
            {
              ...mergedIconsStyle,
              backgroundColor: { image: colorSvgDataUrl(url, iconColor) },
            },
        ]),
      ),
    },
  };

  return mergeConfigs(config, {
    yAxis: patchAxisConfig(config, 'yAxis', {
      axisLabel: axisLabelPatch,
    }, { axisIndex }),
  });
};
