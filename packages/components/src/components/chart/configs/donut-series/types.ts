import type { ZRColor } from 'echarts/types/dist/shared.js';

/**
 * Label rendered for a single donut segment.
 */
export type DonutSegmentLabelOptions = {
  /** Label text, centered on the segment. */
  text: string;
  /** Optional SVG data URL rendered before the label text. */
  icon?: string;
};

/**
 * Configuration options for the `synergyDonut` series.
 */
export type DonutSeriesConfig = {
  /** Color of the static inner track ring. */
  backgroundColor?: string;
  /** Colors used for the outer data segments, cycled when fewer colors than data points are provided. */
  colors?: string[];
  /** Segment labels, aligned by index with `data`. When omitted, no labels are rendered. */
  labels?: DonutSegmentLabelOptions[];
};

/**
 * Fully normalized donut series options after defaults are resolved.
 */
export type ResolvedDonutSeriesConfig = Required<DonutSeriesConfig>;

export type Point = {
  x: number;
  y: number;
};

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

export type SegmentRange = {
  startAngle: number;
  endAngle: number;
};

export type SynergyDonutSeriesOption = {
  type: 'synergyDonut';
  name?: string;
  color?: string;
  data?: number[];
} & DonutSeriesConfig;

/**
 * Input options for the `seriesDonut` preset.
 */
export type DonutSeriesPresetOptions = Omit<SynergyDonutSeriesOption, 'type'>;

export type DonutModelOption = {
  type: 'synergyDonut';
  data?: number[];
};

/**
 * Add the `synergyDonut` series type to the ECharts module.
 */
declare module 'echarts/types/dist/shared.js' {
  interface RegisteredSeriesOption {
    synergyDonut: SynergyDonutSeriesOption;
  }
}
