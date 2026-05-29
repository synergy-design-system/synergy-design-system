/* eslint-disable complexity */
import type { TextCommonOption } from 'echarts/types/src/util/types.js';
import { getRealStyleValue, getRealValueWithoutUnit } from '../themes/utilities.js';
import { type ConfigModifier, compose, mergeConfigs } from './config.js';
import { colorSvgDataUrl, extractYAxisLabelTexts, measureMaxTextWidth } from './utilities.js';

/**
 * Enables horizontal grid lines across the chart by showing the `yAxis.splitLine`.
 */
export const showHorizontalGridLines: ConfigModifier = (config) => mergeConfigs(config, {
  yAxis: {
    splitLine: {
      show: true,
    },
  },
});

/**
 * Enables vertical grid lines across the chart by showing the `xAxis.splitLine`.
 */
export const showVerticalGridLines: ConfigModifier = (config) => mergeConfigs(config, {
  xAxis: {
    splitLine: {
      show: true,
    },
  },
});

/**
 * Enables grid lines in both directions and makes the `xAxis` and `yAxis` baseline visible.
 * Composes `showHorizontalGridLines` and `showVerticalGridLines`.
 */
export const showGridLines: ConfigModifier = compose(
  showHorizontalGridLines,
  showVerticalGridLines,
  (config) => mergeConfigs(config, {
    xAxis: {
      axisLine: {
        show: true,
      },
    },
    yAxis: {
      axisLine: {
        show: true,
      },
    },
  }),
);

/**
 * Hides the x-axis tick labels. Adjusts `nameGap` to compensate for the removed label space.
 */
export const hideXAxisValues: ConfigModifier = (config) => mergeConfigs(config, {
  xAxis: {
    axisLabel: {
      show: false,
    },
    nameGap: 12,
  },
});

/**
 * Hides the y-axis tick labels. Left-aligns the axis name text when labels are hidden.
 */
export const hideYAxisValues: ConfigModifier = (config) => mergeConfigs(config, {
  yAxis: {
    axisLabel: {
      show: false,
    },
    nameTextStyle: {
      align: 'left',
    },
  },
});

/**
 * Hides tick labels on both the x-axis and y-axis.
 * Composes `hideXAxisValues` and `hideYAxisValues`.
 */
export const hideAxisValues: ConfigModifier = compose(hideXAxisValues, hideYAxisValues);

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
 */
export const xAxisWithIconLabels = ({
  iconColor = getRealStyleValue('--syn-color-neutral-950'),
  iconPosition = 'top',
  iconUrls,
  iconsStyle,
  labelsStyle,
}: {
  iconColor?: string;
  iconPosition?: 'top' | 'bottom';
  iconUrls: Array<string>;
  iconsStyle?: TextCommonOption;
  labelsStyle?: TextCommonOption;
}): ConfigModifier => {
  const mergedIconsStyle: TextCommonOption = {
    height: getRealValueWithoutUnit('--syn-spacing-large'),
    width: getRealValueWithoutUnit('--syn-spacing-large'),
    ...iconsStyle,
  };
  const mergedLabelsStyle: TextCommonOption = {
    // We need to set the default font stylings here again, because for *rich* otherwise the global text style default are used
    color: getRealStyleValue('--syn-typography-color-text-quiet'),
    fontFamily: getRealStyleValue('--syn-font-sans'),
    fontSize: getRealStyleValue('--syn-font-size-x-small'),
    fontWeight: getRealStyleValue('--syn-font-weight-normal') as TextCommonOption['fontWeight'],
    padding: iconPosition === 'top' ? [4, 0, 0, 0] : [0, 0, 4, 0],
    ...labelsStyle,
  };
  return (config) => mergeConfigs(config, {
    xAxis: {
      axisLabel: {
        formatter: (value: string, index: number) => {
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
    },
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
 */
export const yAxisWithIconLabels = ({
  iconColor = getRealStyleValue('--syn-color-neutral-950'),
  iconPosition = 'left',
  iconUrls,
  iconsStyle,
  labelsStyle,
}: {
  iconColor?: string;
  iconPosition?: 'left' | 'right';
  iconUrls: Array<string>;
  iconsStyle?: TextCommonOption;
  labelsStyle?: TextCommonOption;
}): ConfigModifier => (config) => {
  const mergedIconsStyle: TextCommonOption = {
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
      const fontWeight = labelsStyle?.fontWeight ?? getRealStyleValue('--syn-font-weight-normal');
      const texts = extractYAxisLabelTexts(config);
      const measured = texts.length > 0 ? measureMaxTextWidth(texts, `${fontWeight} ${fontSize} ${fontFamily}`) : 0;
      effectiveWidth = measured > 0 ? measured : 30;
    }
  }

  const mergedLabelsStyle: TextCommonOption = {
    // We need to set the default font stylings here again, because for *rich* otherwise the global text style default are used
    color: getRealStyleValue('--syn-typography-color-text-quiet'),
    fontFamily: getRealStyleValue('--syn-font-sans'),
    fontSize: getRealStyleValue('--syn-font-size-x-small'),
    fontWeight: getRealStyleValue('--syn-font-weight-normal') as TextCommonOption['fontWeight'],
    padding: iconPosition === 'left' ? [0, 0, 0, 4] : [0, 4, 0, 0],
    width: effectiveWidth,
    ...labelsStyle,
  };

  return mergeConfigs(config, {
    yAxis: {
      axisLabel: {
        formatter: (value: string, index: number) => {
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
      },
    },
  });
};
