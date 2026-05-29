import type { ECConfig } from '../types.js';

/**
 * Colors an SVG data URL by replacing `currentColor` with the provided color string.
 * @param dataUrl - A data URL containing a base64-encoded SVG image.
 * @param color - The replacement color (e.g. `#ff0000` or `red`).
 * @returns A new SVG data URL with `currentColor` substituted.
 */
export function colorSvgDataUrl(dataUrl: string, color: string): string {
  const base64 = dataUrl.split(',')[1];
  const svg = atob(base64).replace(/currentColor/gi, color);
  return `data:image/svg+xml;base64,${btoa(svg)}`;
}

/**
 * Extracts the strings that will appear as y-axis labels from the current config.
 *
 * - Category axes: uses the explicit `yAxis.data` array.
 * - Value axes: approximates with the min/max of all numeric series data points,
 *   which tends to represent the widest labels ECharts will render.
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
 * @param texts - The strings to measure.
 * @param font - A CSS font string (e.g. `'12px sans-serif'`) matching the target rendering context.
 */
export function measureMaxTextWidth(texts: string[], font: string): number {
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
