import { graphic } from 'echarts/core.js';
import type { ZRColor } from 'echarts/types/dist/shared.js';
import { getRealStyleValue as style, getRealValueWithoutUnit as styleWithoutUnit } from '../themes/utilities.js';
import type { ECConfig } from '../types.js';
import { DEGREE_TO_RADIAN, FULL_CIRCLE_RADIAN } from './constants.js';
import type { Point } from './types.js';

// ---------------------------------------------------------------------------
// Low-level deep-merge primitives
// ---------------------------------------------------------------------------

/**
 * Plain object shape supported by the internal deep-merge helpers.
 */
type Mergeable = Record<string, unknown>;

/**
 * A single partial config contribution that can participate in a merge.
 */
type ConfigLayer = Partial<ECConfig> | null | undefined;

/**
 * Determines whether a value can be merged recursively.
 *
 * Arrays are intentionally excluded because they use a dedicated merge
 * strategy.
 *
 * @param value The value to inspect.
 * @returns True when the value is a non-null plain object.
 */
const isMergeableObject = (value: unknown): value is Mergeable => typeof value === 'object' && value !== null && !Array.isArray(value);

/**
 * Merges an object into the first entry of an array.
 *
 * @param arrayValue Base array to keep.
 * @param objectValue Object to merge into index 0.
 * @param objectAsSource Whether the object comes from the source layer.
 * @param mergeValue Recursive merge callback.
 * @returns A merged array.
 */
const mergeArrayWithObject = (
  arrayValue: unknown[],
  objectValue: Mergeable,
  objectAsSource: boolean,
  mergeValue: (targetValue: unknown, sourceValue: unknown) => unknown,
): unknown[] => {
  const mergedArray = arrayValue.slice();
  const firstEntry = mergedArray[0];

  if (isMergeableObject(firstEntry)) {
    mergedArray[0] = objectAsSource
      ? mergeValue(firstEntry, objectValue)
      : mergeValue(objectValue, firstEntry);
    return mergedArray;
  }

  mergedArray[0] = objectValue;
  return mergedArray;
};

/**
 * Merges two arrays by index.
 *
 * @param targetArray Existing array value.
 * @param sourceArray Incoming array value.
 * @param mergeValue Recursive merge callback.
 * @returns A merged array preserving non-overlapping entries.
 */
const mergeArraysByIndex = (
  targetArray: unknown[],
  sourceArray: unknown[],
  mergeValue: (targetValue: unknown, sourceValue: unknown) => unknown,
): unknown[] => {
  const maxLength = Math.max(targetArray.length, sourceArray.length);

  return Array.from({ length: maxLength }, (_, index) => {
    if (index >= sourceArray.length) {
      return targetArray[index];
    }

    if (index >= targetArray.length) {
      return sourceArray[index];
    }

    return mergeValue(targetArray[index], sourceArray[index]);
  });
};

type DeepMergeInput = object | unknown[];

export type ArrayMergeStrategy = 'merge' | 'append';

export type MergeDeepOptions = {
  arrayStrategy?: ArrayMergeStrategy;
};

const isMergeDeepOptions = (value: unknown): value is MergeDeepOptions => {
  if (!isMergeableObject(value) || !('arrayStrategy' in value)) {
    return false;
  }

  const strategy = value.arrayStrategy;
  return strategy === 'merge' || strategy === 'append';
};

/**
 * Deep-merges two config objects into a new object.
 *
 * Nested plain objects are merged recursively. Arrays are merged by index and
 * preserve non-overlapping entries.
 *
 * @param target The existing accumulated config object.
 * @param source The next config layer to merge into the target.
 * @param options Merge behavior options.
 * @returns A new merged object.
 */
export function mergeDeep(target: DeepMergeInput, source: DeepMergeInput, options: MergeDeepOptions = {}): DeepMergeInput {
  if (!target) return source;
  if (!source) return target;

  const { arrayStrategy = 'merge' } = options;

  const mergeValue = (targetValue: unknown, sourceValue: unknown): unknown => {
    if (Array.isArray(sourceValue)) {
      if (Array.isArray(targetValue)) {
        if (arrayStrategy === 'append') {
          return (targetValue as unknown[]).concat(sourceValue as unknown[]);
        }

        return mergeArraysByIndex(targetValue, sourceValue, mergeValue);
      }

      if (isMergeableObject(targetValue)) {
        return mergeArrayWithObject(sourceValue, targetValue, false, mergeValue);
      }

      return sourceValue.slice();
    }

    if (Array.isArray(targetValue) && isMergeableObject(sourceValue)) {
      return mergeArrayWithObject(targetValue, sourceValue, true, mergeValue);
    }

    if (isMergeableObject(targetValue) && isMergeableObject(sourceValue)) {
      const mergedObject = { ...targetValue };

      Object.entries(sourceValue).forEach(([key, nextSourceValue]) => {
        const nextTargetValue = mergedObject[key];
        mergedObject[key] = mergeValue(nextTargetValue, nextSourceValue);
      });

      return mergedObject;
    }

    return sourceValue;
  };

  return mergeValue(target, source) as DeepMergeInput;
}

/**
 * Merges multiple config layers into a single ECConfig.
 *
 * Nested plain objects are deep-merged recursively. Arrays are merged by
 * index, and object/array conflicts merge the object into the first array
 * element. Undefined or null layers are silently ignored, allowing
 * conditional config layers to be passed without pre-filtering.
 *
 * This is the primary low-level helper used inside ConfigModifier functions
 * and builder operations. When no layers are provided, returns an empty object.
 *
 * @param layers Variable number of config layers to merge, applied left-to-right.
 * @param options Optional merge behavior passed as the final argument.
 * @returns The fully merged chart configuration.
 *
 * @example
 * ```ts
 * // Basic merge
 * const myModifier: ConfigModifier = (config) =>
 *   mergeConfigs(config, { xAxis: { name: 'Days' } });
 *
 * // With conditional layers
 * const config = mergeConfigs(
 *   baseConfig,
 *   shouldAddTitle ? { title: { text: 'My Chart' } } : undefined,
 *   { yAxis: { name: 'Values' } }
 * );
 *
 * // Append arrays instead of index-based merging
 * const appendedSeries = mergeConfigs(
 *   { series: [{ id: 'base' }] },
 *   { series: [{ id: 'latest' }] },
 *   { arrayStrategy: 'append' }
 * );
 * ```
 */
export const mergeConfigs = (
  ...inputs: (ConfigLayer | MergeDeepOptions)[]
): ECConfig => {
  const lastInput = inputs.at(-1);
  const options = isMergeDeepOptions(lastInput) ? lastInput : undefined;
  const layers = (options == null ? inputs : inputs.slice(0, -1)) as ConfigLayer[];

  return layers.reduce<ECConfig>((acc, layer) => (layer == null ? acc : mergeDeep(acc, layer, options) as ECConfig), {});
};

// ---------------------------------------------------------------------------
// Composition API
// ---------------------------------------------------------------------------

/**
 * The signature of a function that modifies a chart configuration.
 *
 * @example
 * ```ts
 * const myModifier: ConfigModifier = (config) =>
 *   mergeConfigs(config, { xAxis: { name: 'Days' } });
 * ```
 */
export type ConfigModifier = (config: ECConfig) => ECConfig;

/**
 * Composes multiple modifiers into a single `ConfigModifier`.
 * Modifiers are applied left-to-right, so later Modifiers override earlier ones.
 *
 * Each modifier is evaluated against the accumulated, merged config so composed
 * patch-style modifiers can depend on updates from earlier ones.
 *
 * @param modifiers The modifiers to apply in sequence.
 * @returns A single `ConfigModifier` representing the full composition.
 *
 * @example
 * ```ts
 * const combined = compose(axesShowSplitLines(), axesHideYLabels());
 * ```
 */
export const compose = (...modifiers: ConfigModifier[]): ConfigModifier => (config) => modifiers
  .reduce<ECConfig>((acc, modifier) => mergeConfigs(acc, modifier(acc)), config);

export const getAsArray = <T>(value: T | T[]): T[] => (Array.isArray(value) ? value : [value]);

/**
 * Colors an `image://` prefixed SVG URI with URL-encoded SVG by replacing `currentColor` with the provided color string.
 * If current color is not available, the value of "fill" attribute will be replaced with the provided color string.
 * Returns the original URI unchanged if decoding or re-encoding fails.
 *
 * @param imageUri - An `image://` URI with URL-encoded SVG (e.g., `image://data:image/svg+xml,%3Csvg...%3E`).
 * @param color - The replacement color (e.g. `#ff0000` or `red`).
 * @returns A new `image://` URI with `currentColor` substituted.
 */
export function colorSvgImageUri(imageUri: string, color: string): string {
  try {
    const urlData = imageUri.slice(8); // Remove 'image://' prefix
    const [, encodedSvg] = urlData.split(',');
    if (!encodedSvg) return imageUri;

    const decodedSvg = decodeURIComponent(encodedSvg);
    const hasCurrentColor = decodedSvg.includes('currentColor');

    const svg = hasCurrentColor
      ? decodedSvg.replace(/currentColor/gi, color)
      : decodedSvg.replace(/fill=(?:"[^"]*"|'[^']*')/gi, `fill="${color}"`);

    return `image://data:image/svg+xml,${encodeURIComponent(svg)}`;
  } catch {
    return imageUri;
  }
}

/**
 * Colors an SVG data URL by replacing `currentColor` with the provided color string. If current color is not available the value of "fill" attribute will be replaced with the provided color string.
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
    const decodedSvg = atob(base64);
    const hasCurrentColor = decodedSvg.includes('currentColor');

    const svg = hasCurrentColor ? decodedSvg.replace(/currentColor/gi, color) : decodedSvg.replace(/fill=(?:"[^"]*"|'[^']*')/gi, `fill="${color}"`);
    return `data:image/svg+xml;base64,${btoa(svg)}`;
  } catch {
    return dataUrl;
  }
}

/** Creates an ECharts sector graphic element from the given sector descriptor. */
export const createSectorGraphic = ({
  centerX, centerY, innerRadius, outerRadius, startAngle, endAngle, color, z = 1,
}: {
  centerX: number;
  centerY: number;
  innerRadius: number;
  outerRadius: number;
  startAngle: number;
  endAngle: number;
  color: ZRColor;
  z?: number;
}): graphic.Sector => new graphic.Sector({
  shape: {
    clockwise: true,
    cx: centerX,
    cy: centerY,
    endAngle,
    r: outerRadius,
    r0: innerRadius,
    startAngle,
  },
  silent: true,
  style: {
    fill: color,
  },
  z,
});

/** Creates an ECharts text graphic element styled with the current design-token values. */
export const createTextGraphic = ({
  text,
  x,
  y,
  fontSize,
  fontWeight = styleWithoutUnit('SynFontWeightNormal'),
  align = 'center',
  verticalAlign = 'middle',
  z = 10,
}: {
  text: string;
  x: number;
  y: number;
  fontSize: number;
  fontWeight?: number | string;
  align?: 'left' | 'center' | 'right';
  verticalAlign?: 'top' | 'middle' | 'bottom';
  z?: number;
}): graphic.Text => new graphic.Text({
  silent: true,
  style: {
    align,
    fill: style('SynTypographyColorText'),
    fontFamily: style('SynFontSans'),
    fontSize,
    fontWeight: fontWeight as number,
    text,
    verticalAlign,
    x,
    y,
  },
  z,
});

/** Creates an ECharts image graphic element positioned at the given coordinates. */
export const createImageGraphic = ({
  image, x, y, width, height, z = 10,
}: {
  image: string;
  x: number;
  y: number;
  width: number;
  height: number;
  z?: number;
}): graphic.Image => new graphic.Image({
  silent: true,
  style: {
    height,
    image,
    width,
    x,
    y,
  },
  z,
});

/** Clamps `value` so it falls within the inclusive range `[minimum, maximum]`. */
export const clamp = (value: number, minimum: number, maximum: number): number => Math.min(Math.max(value, minimum), maximum);

/** Normalizes an angle in radians to the range `[0, 2π)`. */
export const normalizeAngle = (angle: number): number => {
  const normalized = angle % FULL_CIRCLE_RADIAN;
  return normalized < 0 ? normalized + FULL_CIRCLE_RADIAN : normalized;
};

/** Converts polar coordinates (center + radius + angle in radians) to a Cartesian `Point`. */
export const polarPoint = (centerX: number, centerY: number, radius: number, angle: number): Point => ({
  x: centerX + (Math.cos(angle) * radius),
  y: centerY + (Math.sin(angle) * radius),
});

/**
 * Converts an angle in degrees to radian.
 * @param degree the angle in degrees
 * @returns the angle in radians
 */
export const convertDegreeToRadian = (degree: number): number => degree * DEGREE_TO_RADIAN;
