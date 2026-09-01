import type { ZRColor } from 'echarts/types/dist/shared.js';

/**
 * Series-level configuration for the donut chart.
 */
export type DonutSeriesConfig = {
  /** Color of the static inner track ring. */
  backgroundColor?: string;
  /** Center position inside the donut layout area, supports pixel or percentage values. */
  center?: [DonutLayoutValue, DonutLayoutValue];
  /** Outer radius of the donut, supports pixel or percentage values. */
  radius?: DonutLayoutValue;
  /** Top inset that reduces the donut layout area before center/radius are resolved. */
  top?: DonutLayoutValue;
  /** Right inset that reduces the donut layout area before center/radius are resolved. */
  right?: DonutLayoutValue;
  /** Bottom inset that reduces the donut layout area before center/radius are resolved. */
  bottom?: DonutLayoutValue;
  /** Left inset that reduces the donut layout area before center/radius are resolved. */
  left?: DonutLayoutValue;
};

/** Numeric pixel value or percentage string (e.g. '50%'). */
export type DonutLayoutValue = number | string;

/**
 * 2D point coordinates used when positioning labels and ring geometry.
 */
export type Point = {
  x: number;
  y: number;
};

/**
 * Geometry and styling information for a rendered donut ring segment.
 */
export type Sector = {
  centerX: number;
  centerY: number;
  innerRadius: number;
  outerRadius: number;
  startAngle: number;
  endAngle: number;
  color: ZRColor;
  z: number;
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
  value: number;
  name?: string;
  icon?: string;
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

/**
 * Public series option shape for the custom synDonut chart type.
 */
export type SynergyDonutSeriesOption = Omit<DonutSeriesOption, 'type'> & { type: 'synDonut' };

/**
 * Input options for the donut chart preset before the type discriminator is added.
 */
export type DonutSeriesPresetOptions = Omit<SynergyDonutSeriesOption, 'type' | 'colorBy'>;

/**
 * Extends ECharts' registered series options with the custom donut series.
 */
declare module 'echarts/types/dist/shared.js' {
  interface RegisteredSeriesOption {
    synDonut: SynergyDonutSeriesOption;
  }
}
