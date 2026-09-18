import type { LayoutValue } from '../../types.js';

/** Insets that define the usable bounds of the donut layout area. */
export type LayoutBounds = {
  top: number;
  right: number;
  bottom: number;
  left: number;
};

/** Optional horizontal and vertical center values for the donut layout. */
export type LayoutCenterInput = [LayoutValue, LayoutValue] | undefined;

/** Optional outer radius value for the donut layout. */
export type LayoutRadiusInput = LayoutValue | undefined;

/** Fully resolved pixel-based layout values used to render the donut. */
export type ResolvedLayout = {
  centerX: number;
  centerY: number;
  layoutWidth: number;
  layoutHeight: number;
  outerRadius: number;
  bounds: LayoutBounds;
};

/**
 * Series-level configuration for the donut chart.
 */
export type DonutSeriesConfig = {
  /** Center position inside the donut layout area, supports pixel or percentage values. */
  center?: [LayoutValue, LayoutValue];
  /** Outer radius of the donut, supports pixel or percentage values. */
  radius?: LayoutValue;
  /** Top inset that reduces the donut layout area before center/radius are resolved. */
  top?: LayoutValue;
  /** Right inset that reduces the donut layout area before center/radius are resolved. */
  right?: LayoutValue;
  /** Bottom inset that reduces the donut layout area before center/radius are resolved. */
  bottom?: LayoutValue;
  /** Left inset that reduces the donut layout area before center/radius are resolved. */
  left?: LayoutValue;
};

/**
 * Start and end angular bounds for a single donut segment.
 */
export type SegmentRange = {
  startAngle: number;
  endAngle: number;
};

/**
 * A single data item shown as a donut segment with optional label metadata.
 */
export type DonutDataItem = {
  /** Numeric value of the segment; determines the slice angle relative to the other values. */
  value: number;
  /**
   * Series item name used for displaying in legend.
   */
  name?: string | ((value: number) => string);
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
