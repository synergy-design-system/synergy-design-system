import type { CircularLayoutInput } from '../../types.js';

/**
 * Series-level configuration for the donut chart.
 */
export type DonutSeriesConfig = CircularLayoutInput;

/**
 * A single data item shown as a donut segment with optional label metadata.
 */
export type DonutDataItem = {
  /** Numeric value of the segment; determines the slice angle relative to the other values. */
  value: number;
  /**
   * Series item name used for displaying in legend.
   */
  name?: string;
  /**
   * Label shown for the segment.
   * If set to a function, it will be called with the segment value to generate the label.
   * If not set, the value will be used as the label.
   * To remove the label, set this to `undefined`.
   * */
  label?: string | ((value: number) => string);
  /** Optional prefix icon as SVG data url used to render a segment icon alongside the label. */
  prefixIcon?: string;
};

/**
 * The accepted value type for each donut data entry, either a raw number or a labeled object.
 */
export type DonutDataValue = number | DonutDataItem;

/**
 * ECharts series option shape for the custom synDonut chart type.
 */
export type DonutSeriesOption = DonutSeriesConfig & {
  type?: 'synDonut';
  data?: DonutDataValue[];
  name?: string;
  colorBy?: 'data';
};

export type ResolvedDonutDataItem = {
  /** Numeric value of the segment; determines the slice angle relative to the other values. */
  value: number;
  /**
   * Series item name used for displaying in legend.
   */
  name?: string;
  /**
   * Label shown for the segment.
   * */
  label?: string;
  /** Optional prefix icon as SVG data url used to render a segment icon alongside the label. */
  prefixIcon?: string;
};

/**
 * Public series option shape for the custom synDonut chart type.
 */
export type SynergyDonutSeriesOption = Omit<DonutSeriesOption, 'type'> & { type: 'synDonut' };

/**
 * Input options for the donut chart preset.
 */
export type DonutSeriesPresetOptions = Omit<SynergyDonutSeriesOption, 'type' | 'colorBy'>;

/**
 * Extends ECharts' registered series options with the custom donut series.
 * This keeps the custom series type discoverable by the chart runtime and by TypeScript consumers.
 */
declare module 'echarts/types/dist/shared.js' {
  interface RegisteredSeriesOption {
    synDonut: SynergyDonutSeriesOption;
  }
}
