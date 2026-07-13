import type { LegendComponentOption } from 'echarts/types/dist/shared.js';

/**
 * Supported positions for the chart legend.
 */
export type LegendPosition = 'top' | 'bottom' | 'left' | 'right';

/**
 * Options for the `legendShow` preset.
 *
 * Use this when calling `legendShow({ position, legend })`.
 */
export type LegendOption = {
  /**
   * Legend position used to derive the default legend placement and grid spacing.
   *
   * @default 'top'
   */
  position?: LegendPosition,
  /**
   * Custom legend configuration merged with the derived position defaults.
   */
  legend?: LegendComponentOption,
};

/**
 * Accepted input for `legendShow`.
 *
 * Supports either a position string (`'top'`, `'bottom'`, `'left'`, `'right'`)
 * or an options object with `position` and optional `legend` overrides.
 */
export type LegendPresetOption = LegendOption | LegendPosition;
