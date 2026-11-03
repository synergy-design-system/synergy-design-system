import type { LineSeriesOption } from 'echarts/types/dist/shared';

/**
 * Type definitions for line series options in ECharts.
 */
export type { LineSeriesOption };

/**
 * Echarts does not export many types publicly, so we define our own minimal types for legend models and entries.
 */

/** Minimal item style shape used to patch legend entries. */
export type LegendItemStyle = Record<string, unknown>;

/** Minimal legend model API used to retrieve its entries. */
export type LegendModel = {
  getData(): LegendEntry[];
};

/** Minimal legend entry API used to read and update its option. */
export type LegendEntry = {
  get(path: string): unknown;
  mergeOption(option: { itemStyle: LegendItemStyle }): void;
  option: {
    [key: string]: unknown;
    icon?: string;
    itemStyle?: LegendItemStyle;
  };
};
