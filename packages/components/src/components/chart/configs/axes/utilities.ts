import {
  type ThemeMode, getRealStyleValue, getRealValueWithoutUnit, normalizeArray,
  setDefaultValueIfNotAvailable,
} from '../../themes/utilities.js';
import type { ECConfig } from '../../types.js';
import { colorSvgDataUrl, mergeConfigs } from '../utilities.js';
import { AXIS } from '../constants.js';
import type {
  AxisKey,
  AxisLabel,
  AxisLabelIconsConfig,
  AxisLabelRich,
  AxisOption,
  AxisUpdateOptions,
} from './types.js';

const getDataFromAxis = (axis: unknown): string[] => {
  if (
    axis
    && typeof axis === 'object'
    && 'data' in axis
    && Array.isArray((axis as Record<string, unknown>).data)
  ) {
    return ((axis as Record<string, unknown>).data as unknown[]).map(String);
  }
  return [];
};

/**
 * Extracts the strings that will appear as y-axis labels from the current config.
 *
 * - Category axes: uses the explicit `yAxis.data` array.
 * - Value axes: approximates with the min/max of all numeric series data points,
 *   which tends to represent the widest labels ECharts will render.
 * - Multiple y-axes: combines label candidates from all configured y-axis entries.
 *
 * @param config - The current chart config.
 * @returns Label texts that can be used for width estimation of rich y-axis labels.
 */
export function extractYAxisLabelTexts(config: ECConfig): string[] {
  const { yAxis } = config;
  const fromAxis = Array.isArray(yAxis)
    ? yAxis.flatMap(getDataFromAxis)
    : getDataFromAxis(yAxis);

  if (fromAxis.length) return fromAxis;

  // Value axis fallback: approximate from series min/max
  const { series } = config;
  if (Array.isArray(series)) {
    const values: number[] = series.flatMap((item: unknown) => {
      if (
        item
        && typeof item === 'object'
        && 'data' in item
        && Array.isArray((item as Record<string, unknown>).data)
      ) {
        return ((item as Record<string, unknown>).data as unknown[]).filter(
          (v): v is number => typeof v === 'number',
        );
      }
      return [];
    });
    if (values.length) {
      return [String(Math.min(...values)), String(Math.max(...values))];
    }
  }

  return [];
}

/**
 * Measures the maximum rendered pixel width of the given strings using a canvas.
 * Returns `0` if the canvas API is unavailable (e.g. SSR or test environments).
 *
 * @param texts - The strings to measure.
 * @param font - A CSS font string (e.g. `'12px sans-serif'`) matching the target rendering context.
 * @returns The ceiling of the widest measured text in CSS pixels.
 */
export function measureMaxTextWidth(texts: string[], font: string): number {
  if (texts.length === 0) return 0;

  try {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return 0;
    ctx.font = font;
    return Math.ceil(Math.max(...texts.map((t) => ctx.measureText(t).width)));
  } catch {
    return 0;
  }
}

/**
 * Merges a partial patch into one axis config (`xAxis` or `yAxis`) and returns
 * the updated value for that axis key.
 *
 * Supports both single-axis objects and axis arrays. When `axisIndex` is set,
 * only the selected axis entries are updated. For non-array axis configs,
 * index `0` is used.
 *
 * @param config - ECharts config object.
 * @param axisKey - Axis key to update (`xAxis` or `yAxis`).
 * @param patch - Partial axis config merged into the selected axis entries.
 * @param options - Optional axis selection settings.
 * @returns The updated axis config at `config[axisKey]`, preserving its original shape.
 *
 * @example
 * ```ts
 * const nextXAxis = updateAxisConfig(
 *   config,
 *   'xAxis',
 *   { axisLabel: { show: false } },
 *   { axisIndex: [0, 2] },
 * );
 *
 * // nextXAxis
 * [
 *   { ...config.xAxis[0], axisLabel: { ...config.xAxis[0].axisLabel, show: false } },
 *   config.xAxis[1],
 *   { ...config.xAxis[2], axisLabel: { ...config.xAxis[2].axisLabel, show: false } },
 * ]
 * ```
 */
export const updateAxisConfig = <T extends AxisKey>(
  config: ECConfig,
  axisKey: T,
  patch: AxisOption<T>,
  options: AxisUpdateOptions = {},
): ECConfig[T] => {
  const { axisIndex } = options;

  const shouldUpdateIndex = (index: number): boolean => {
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
        if (!shouldUpdateIndex(index)) return axis;
        return mergeSingleAxis(axis as AxisOption<T>);
      }) as ECConfig[T];
  }

  if (!shouldUpdateIndex(0)) return axisConfig;
  return mergeSingleAxis((axisConfig ?? {}) as AxisOption<T>);
};

/**
 * Default text styles for axis labels.
 *
 * @param mode - Theme mode
 */
const getDefaultAxisLabelStyle = (mode: ThemeMode = 'auto') => ({
  color: getRealStyleValue('SynTypographyColorTextQuiet', mode),
  fontFamily: getRealStyleValue('SynFontSans', mode),
  fontSize: getRealStyleValue('SynFontSizeXSmall', mode),
  fontWeight: getRealStyleValue('SynFontWeightNormal', mode) as AxisLabelRich['fontWeight'],
});

/**
 * Default styles for axis label icons.
 *
 * @param mode - Theme mode
 */
const getDefaultAxisIconStyle = (mode: ThemeMode = 'auto'): AxisLabelRich => ({
  height: getRealValueWithoutUnit('SynSpacingLarge', mode),
  width: getRealValueWithoutUnit('SynSpacingLarge', mode),
});

/**
 * Builds a compact CSS font shorthand from the effective rich-label styles.
 * This helper resolves missing values from the Synergy defaults so y-axis label widths can be measured consistently.
 *
 * @param labelsStyle - Optional rich-text overrides for the label part.
 * @param mode - Theme mode
 * @returns A CSS font shorthand string suitable for `CanvasRenderingContext2D.font`.
 */
const getFontShorthand = (labelsStyle: AxisLabelRich | undefined, mode: ThemeMode = 'auto'): string => {
  const defaultAxisLabelStyle = getDefaultAxisLabelStyle(mode);
  const fontSizeValue = labelsStyle?.fontSize ?? defaultAxisLabelStyle.fontSize;
  const fontSize = typeof fontSizeValue === 'number' ? `${fontSizeValue}px` : String(fontSizeValue);
  const fontFamily = String(labelsStyle?.fontFamily ?? defaultAxisLabelStyle.fontFamily);
  const fontWeight = String(labelsStyle?.fontWeight ?? defaultAxisLabelStyle.fontWeight);

  return `${fontWeight} ${fontSize} ${fontFamily}`;
};

/**
 * Resolves the width to use for y-axis label rich text when icons are placed on the left.
 *
 * If the caller already provided `labelsStyle.width`, that explicit width wins.
 * Otherwise the width is derived from the widest candidate y-axis label text. When
 * measurement is unavailable, a small fallback width is used to keep icon alignment stable.
 *
 * @param labelsStyle - Optional rich-text overrides for the label part.
 * @param config - The current chart config used to derive y-axis label candidates.
 * @param mode - Theme mode
 * @returns An explicit width value for the label block.
 */
const getYAxisLabelEffectiveWidth = (
  labelsStyle: AxisLabelRich | undefined,
  config: ECConfig,
  mode: ThemeMode = 'auto',
): number | string | undefined => {
  if (labelsStyle?.width !== undefined) return labelsStyle.width;

  const texts = extractYAxisLabelTexts(config);
  const measured = texts.length > 0
    ? measureMaxTextWidth(texts, getFontShorthand(labelsStyle, mode))
    : 0;

  return measured > 0 ? measured : AXIS.LABEL_FALLBACK_WIDTH;
};

/**
 * Creates formatter and spacing settings for the selected icon-to-label layout.
 * Only left-positioned y-axis icons require a fixed label width so icons align vertically.
 *
 * @param iconPosition - Desired icon placement relative to the label text.
 * @param labelsStyle - Optional rich-text overrides for the label part.
 * @param config - The current chart config, used when width auto-calculation is required.
 * @param mode - Theme mode
 * @returns Formatter, padding and optional width for the rich label definition.
 */
const createPositionConfig = (
  iconPosition: AxisLabelIconsConfig['iconPosition'],
  labelsStyle: AxisLabelRich | undefined,
  config: ECConfig,
  mode: ThemeMode = 'auto',
) => {
  switch (iconPosition) {
    case 'bottom':
      return {
        formatter: (value: string, i: number) => `{label|${value}}\n{icon_${i}|}`,
        padding: [0, 0, AXIS.LABEL_ICON_PADDING, 0],
        width: undefined,
      };
    case 'right':
      return {
        formatter: (value: string, i: number) => `{label|${value}}{icon_${i}|}`,
        padding: [0, AXIS.LABEL_ICON_PADDING, 0, 0],
        width: undefined,
      };
    case 'top':
      return {
        formatter: (value: string, i: number) => `{icon_${i}|}\n{label|${value}}`,
        padding: [AXIS.LABEL_ICON_PADDING, 0, 0, 0],
        width: undefined,
      };
    default:
      return {
        align: 'left' as const,
        formatter: (value: string, i: number) => `{icon_${i}|}{label|${value}}`,
        padding: [0, 0, 0, AXIS.LABEL_ICON_PADDING],
        width: getYAxisLabelEffectiveWidth(labelsStyle, config, mode),
      };
  }
};

/**
 * Builds an ECharts `axisLabel` config that renders a per-tick SVG icon next to the label text.
 *
 * The function merges Synergy defaults with caller overrides, colorizes each icon by replacing
 * `currentColor` in the provided SVG data URLs, and emits a rich-text configuration compatible
 * with ECharts axis label formatting.
 *
 * @param options - Fully resolved icon-label configuration, including chart config and position.
 * @returns An `axisLabel` object ready to be merged into an x-axis or y-axis config.
 */
export const buildAxisLabelConfigWithIcon = ({
  config,
  iconColor,
  iconPosition,
  iconsStyle,
  iconUrls,
  labelsStyle,
}: AxisLabelIconsConfig): AxisLabel => {
  const positionConfig = createPositionConfig(iconPosition, labelsStyle, config);

  const mergedLabelsStyle = {
    // ECharts rich labels do not inherit all text defaults from the global textStyle.
    ...getDefaultAxisLabelStyle(),
    padding: positionConfig.padding,
    width: positionConfig.width,
    ...(positionConfig.align ? { align: positionConfig.align } : {}),
    ...labelsStyle,
  };

  const mergedIconsStyle = {
    ...getDefaultAxisIconStyle(),
    // We need to set both to "align: 'left'", the label style and the icon style. As otherwise the label does not apply the left alignment for some reason.
    ...(positionConfig.align ? { align: positionConfig.align } : {}),
    ...iconsStyle,
  };

  return {
    formatter: positionConfig.formatter,
    rich: {
      label: mergedLabelsStyle,
      ...Object.fromEntries(
        iconUrls.flatMap((url, index) => {
          // If the URL is null or undefined, skip creating a style for this icon and the formatter will render only the label for this index.
          if (url == null) return [];

          return [[
            `icon_${index}`,
            {
              ...mergedIconsStyle,
              backgroundColor: { image: colorSvgDataUrl(url, iconColor) },
            },
          ]];
        }),
      ),
    },
  };
};

const getDefaultXAxisStyle = (mode: ThemeMode = 'auto') => ({
  'axisLabel.margin': getRealValueWithoutUnit('SynSpacingSmall', mode),
  nameGap: AXIS.X_NAME_GAP,
  nameLocation: 'center',
});

const getDefaultYAxisStyle = (mode: ThemeMode = 'auto') => ({
  'axisLabel.margin': getRealValueWithoutUnit('SynSpacingMedium', mode),
  nameGap: getRealValueWithoutUnit('SynSpacingMedium', mode),
  'nameTextStyle.align': 'right',
  'nameTextStyle.padding': [0, getRealValueWithoutUnit('SynSpacingMedium', mode), 0, 0],
});

/**
 * Mutation helper to apply default styles to all entries of the specified axis key in the config.
 * This is used by the `applyAxisDefaultsPreprocessor` to set Synergy-specific defaults for x and y axes.
 * @param axisKey - The axis key to apply defaults for ('xAxis' or 'yAxis').
 * @param axisOption - The axis option object or array of objects to apply defaults to.
 */
const applyAxisDefaults = <T extends AxisKey>(axisKey: T, axisOption: ECConfig[T]) => {
  if (!axisOption) return;
  const axes = normalizeArray<ECConfig[T]>(axisOption);
  const axisDefaults = axisKey === 'xAxis' ? getDefaultXAxisStyle() : getDefaultYAxisStyle();
  axes.forEach((axis) => {
    Object.entries(axisDefaults).forEach(([keyPath, value]) => {
      setDefaultValueIfNotAvailable(axis as Record<string, unknown>, keyPath, value);
    });
  });
};

/**
 * Preprocessor to apply default styles to x and y axes based on the Synergy theme.
 * This is needed because ECharts does not provide a way to set specific styles for x and y axis, only for axis types.
 * If the user already provided specific styles for these properties, those will be respected and not overridden.
 *
 * @param option - The ECharts config option object that is being processed before rendering.
 */
export const applyAxisDefaultsPreprocessor = (option: ECConfig) => {
  if (!option || (!option.xAxis && !option.yAxis)) return;

  if (option.xAxis) {
    applyAxisDefaults('xAxis', option.xAxis);
  }
  if (option.yAxis) {
    applyAxisDefaults('yAxis', option.yAxis);
  }
};

/**
 * Shared default style object for all axis types.
 *
 * This is implemented as a function so token values are resolved at runtime
 * instead of build time, allowing theme changes to be reflected dynamically.
 *
 * @param mode - Theme mode
 */
export const getDefaultAxisStyles = (mode: ThemeMode = 'auto') => ({
  // This ensures that the number of ticks on multiple axes are the same
  alignTicks: true,
  axisLabel: getDefaultAxisLabelStyle(mode),
  axisLine: {
    lineStyle: {
      color: getRealStyleValue('SynChartGridLinesColorEmphasize', mode),
      width: getRealValueWithoutUnit('SynBorderWidthMedium', mode),
    },
    show: false,
  },
  minorSplitLine: {
    lineStyle: {
      color: getRealStyleValue('SynChartGridLinesColorEmphasize', mode),
    },
  },
  nameTextStyle: {
    color: getRealStyleValue('SynTypographyColorText', mode),
    fontSize: getRealStyleValue('SynFontSizeSmall', mode),
    fontWeight: getRealStyleValue('SynFontWeightBold', mode),
  },
  splitLine: {
    lineStyle: {
      color: getRealStyleValue('SynChartGridLinesColor', mode),
    },
    show: false,
  },
});
