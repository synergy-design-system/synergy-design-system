import type { BarSeriesOption } from 'echarts/types/dist/shared';

/**
 * Bar series options type.
 */
export type { BarSeriesOption };

/**
 * Settings for the stacked bar series preset, including the shared stack name
 * and bar orientation used to determine label defaults.
 */
export type BarStackedOptions = {
  /**
   * Shared stack name. An empty string generates a random name.
   * @default ''
   */
  stackName?: string;
  /**
   * Bar orientation used to determine label defaults, does not configure chart axes.
   * @default 'vertical'
   */
  orientation?: 'vertical' | 'horizontal';
};
