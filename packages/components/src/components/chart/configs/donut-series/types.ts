import type { ZRColor } from 'echarts/types/dist/shared.js';

/**
 * Series-level configuration for the donut chart.
 */
export type DonutSeriesConfig = {
  /** Color of the static inner track ring. */
  backgroundColor?: string;
};

/**
 * Fully normalized donut series options after defaults are resolved.
 */
export type ResolvedDonutSeriesConfig = Required<DonutSeriesConfig>;

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
  color?: string;
};

/**
 * The accepted value type for each donut data entry, either a raw number or a labeled object.
 */
export type DonutDataValue = number | DonutDataItem;

/**
 * Public series option shape for the custom synDonut chart type.
 */
export type SynergyDonutSeriesOption = {
  type: 'synDonut';
  data?: DonutDataValue[];
  name?: string;
} & DonutSeriesConfig;

/**
 * Input options for the donut chart preset before the type discriminator is added.
 */
export type DonutSeriesPresetOptions = Omit<SynergyDonutSeriesOption, 'type'>;

/**
 * ECharts model option structure for the donut series.
 */
export type DonutModelOption = {
  type: 'synDonut';
  data?: DonutDataValue[];
};

/**
 * Extends ECharts' registered series options with the custom donut series.
 */
declare module 'echarts/types/dist/shared.js' {
  interface RegisteredSeriesOption {
    synDonut: SynergyDonutSeriesOption;
  }
}
