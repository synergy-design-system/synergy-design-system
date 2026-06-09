import type { TextCommonOption } from 'echarts/types/src/util/types.js';
import type { CategoryAxisBaseOption } from 'echarts/types/src/coord/axisCommonTypes.js';
import {
  getRealStyleValue, getRealValueWithoutUnit, normalizeArray, setDefaultValueIfNotAvailable,
} from '../../themes/utilities.js';
import type { ECConfig } from '../../types.js';
import { mergeConfigs } from '../config.js';
import type {
  AxisKey,
  AxisLabelIconsConfigOptions,
  AxisOption,
  AxisPatchOptions,
} from './types.js';

/**
 * Colors an SVG data URL by replacing `currentColor` with the provided color string.
 * Returns the original data URL unchanged if decoding or re-encoding fails.
 *
 * @param dataUrl - A data URL containing a base64-encoded SVG image.
 * @param color - The replacement color (e.g. `#ff0000` or `red`).
 * @returns A new SVG data URL with `currentColor` substituted.
 */
export function colorSvgDataUrl(dataUrl: string, color: string): string {
  try {
    const [, base64] = dataUrl.split(',');
    if (!base64) return dataUrl;
    const svg = atob(base64).replace(/currentColor/gi, color);
    return `data:image/svg+xml;base64,${btoa(svg)}`;
  } catch {
    return dataUrl;
  }
}

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
 * Applies a partial patch to one chart axis (`xAxis` or `yAxis`) and returns
 * the patched axis config for that axis key.
 *
 * Supports both single-axis objects and axis arrays:
 * - If the axis config is an array, only selected indices are patched.
 * - If the axis config is a single object, index `0` is used for selection.
 *
 * @param config ECharts config object.
 * @param axisKey Axis key to patch (`xAxis` or `yAxis`).
 * @param patch Partial axis values that should be merged into the selected axis entries.
 * @param options Optional axis selection settings.
 * @returns The patched config section at `config[axisKey]` with the same structural shape
 * as before (single object or array).
 *
 * @example
 * ```ts
 * const nextXAxis = patchAxisConfig(
 *   config,
 *   'xAxis',
 *   { axisLabel: { show: false } },
 *   { axisIndex: [0, 2] },
 * );
 *
 * // resulting object
 * {
 *   xAxis: [
 *     { ...config.xAxis[0], axisLabel: { ...config.xAxis[0].axisLabel, show: false } },
 *     config.xAxis[1],
 *     { ...config.xAxis[2], axisLabel: { ...config.xAxis[2].axisLabel, show: false } },
 *     ...restOfXAxisArray
 *   ],
 *   // other config entries remain unchanged
 * }
 * ```
 */
export const patchAxisConfig = <T extends AxisKey>(
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
        if (!shouldPatchIndex(index)) return axis;
        return mergeSingleAxis(axis as AxisOption<T>);
      }) as ECConfig[T];
  }

  if (!shouldPatchIndex(0)) return axisConfig;
  return mergeSingleAxis((axisConfig ?? {}) as AxisOption<T>);
};

/**
 * Default styles for axis labels
 */
const getDefaultAxisLabelStyle = (): TextCommonOption => ({
  color: getRealStyleValue('--syn-typography-color-text-quiet'),
  fontFamily: getRealStyleValue('--syn-font-sans'),
  fontSize: getRealStyleValue('--syn-font-size-x-small'),
  fontWeight: getRealStyleValue('--syn-font-weight-normal') as TextCommonOption['fontWeight'],
});

/**
 * Default styles for axis label icons
 */
const getDefaultAxisIconStyle = (): TextCommonOption => ({
  height: getRealValueWithoutUnit('--syn-spacing-large'),
  width: getRealValueWithoutUnit('--syn-spacing-large'),
});

/**
 * Builds a compact CSS font shorthand from the effective rich-label styles.
 * This helper resolves missing values from the Synergy defaults so y-axis label widths can be measured consistently.
 *
 * @param labelsStyle - Optional rich-text overrides for the label part.
 * @returns A CSS font shorthand string suitable for `CanvasRenderingContext2D.font`.
 */
const getFontShorthand = (labelsStyle: TextCommonOption | undefined): string => {
  const defaultAxisLabelStyle = getDefaultAxisLabelStyle();
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
 * @returns An explicit width value for the label block.
 */
const getYAxisLabelEffectiveWidth = (
  labelsStyle: TextCommonOption | undefined,
  config: ECConfig,
): number | string | undefined => {
  if (labelsStyle?.width !== undefined) return labelsStyle.width;

  const texts = extractYAxisLabelTexts(config);
  const measured = texts.length > 0
    ? measureMaxTextWidth(texts, getFontShorthand(labelsStyle))
    : 0;

  return measured > 0 ? measured : 30;
};

/**
 * Creates formatter and spacing settings for the selected icon-to-label layout.
 * Only left-positioned y-axis icons require a fixed label width so icons align vertically.
 *
 * @param iconPosition - Desired icon placement relative to the label text.
 * @param labelsStyle - Optional rich-text overrides for the label part.
 * @param config - The current chart config, used when width auto-calculation is required.
 * @returns Formatter, padding and optional width for the rich label definition.
 */
const createPositionConfig = (
  iconPosition: AxisLabelIconsConfigOptions['iconPosition'],
  labelsStyle: TextCommonOption | undefined,
  config: ECConfig,
) => {
  switch (iconPosition) {
    case 'bottom':
      return {
        formatter: (value: string, i: number) => `{label|${value}}\n{icon_${i}|}`,
        padding: [0, 0, 4, 0],
        width: undefined,
      };
    case 'right':
      return {
        formatter: (value: string, i: number) => `{label|${value}}{icon_${i}|}`,
        padding: [0, 4, 0, 0],
        width: undefined,
      };
    case 'top':
      return {
        formatter: (value: string, i: number) => `{icon_${i}|}\n{label|${value}}`,
        padding: [4, 0, 0, 0],
        width: undefined,
      };
    default:
      return {
        formatter: (value: string, i: number) => `{icon_${i}|}{label|${value}}`,
        padding: [0, 0, 0, 4],
        width: getYAxisLabelEffectiveWidth(labelsStyle, config),
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
}: AxisLabelIconsConfigOptions): CategoryAxisBaseOption['axisLabel'] => {
  const positionConfig = createPositionConfig(iconPosition, labelsStyle, config);

  const mergedLabelsStyle = {
    // ECharts rich labels do not inherit all text defaults from the global textStyle.
    ...getDefaultAxisLabelStyle(),
    padding: positionConfig.padding,
    width: positionConfig.width,
    ...labelsStyle,
  };

  const mergedIconsStyle = {
    ...getDefaultAxisIconStyle(),
    ...iconsStyle,
  };

  return {
    formatter: positionConfig.formatter,
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
};

const getDefaultXAxisStyle = () => ({
  'axisLabel.margin': getRealValueWithoutUnit('--syn-spacing-small'),
  nameGap: 32,
  nameLocation: 'center',
});

const getDefaultYAxisStyle = () => ({
  'axisLabel.margin': getRealValueWithoutUnit('--syn-spacing-medium'),
  nameGap: getRealValueWithoutUnit('--syn-spacing-medium'),
  'nameTextStyle.align': 'right',
  'nameTextStyle.padding': [0, getRealValueWithoutUnit('--syn-spacing-medium'), 0, 0],
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
 * Default styling for all axes.
 * This is done as function to ensure that the real style values are read at runtime and not at build time, which allows them to be dynamic based on the current theme.
 */
export const axisCommonStyles = () => ({
  // This ensures that the number of ticks on multiple axes are the same
  alignTicks: true,
  axisLabel: {
    color: getRealStyleValue('--syn-typography-color-text-quiet'),
    fontFamily: getRealStyleValue('--syn-font-sans'),
    fontSize: getRealStyleValue('--syn-font-size-x-small'),
    fontWeight: getRealStyleValue('--syn-font-weight-normal'),
  },
  axisLine: {
    lineStyle: {
      color: getRealStyleValue('--syn-grid-lines-color'),
    },
    show: false,
  },
  minorSplitLine: {
    lineStyle: {
    },
  },
  nameTextStyle: {
    color: getRealStyleValue('--syn-typography-color-text'),
    fontSize: getRealStyleValue('--syn-font-size-small'),
    fontWeight: getRealStyleValue('--syn-font-weight-bold'),
  },
  splitLine: {
    lineStyle: {
      color: getRealStyleValue('--syn-grid-lines-color'),
    },
    show: false,
  },
});
