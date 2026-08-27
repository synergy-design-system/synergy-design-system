import type { ZRColor } from 'echarts/types/dist/shared.js';

/**
 * Configuration options for the `synergySegmentChart` series.
 */
export type SegmentChartSeriesConfig = {
  /**
   * Angular width of each segment, aligned by index with `data`. Normalized to the available
   * angle (360 degrees minus the `gap`), analogous to the donut series. When omitted, or when
   * shorter than `data`, missing entries default to an equal weight of `1`.
   */
  weights?: number[];
  /** Minimum value used to normalize the segment fill ratio. Defaults to `0`. */
  min?: number;
  /** Maximum value used to normalize the segment fill ratio. Defaults to `100`. */
  max?: number;
  /** Fraction (0-1) of the full circle left empty, where the main `mainLabel` is rendered. Defaults to `0.3`. */
  gap?: number;
  /** Rotates the gap (and therefore the whole chart), in degrees. `0` centers the gap at the bottom. */
  gapOrientation?: number;
  /** Optional SVG data URL rendered as an icon inside the static center circle. */
  icon?: string;
  /** Main label rendered inside the gap. */
  mainLabel?: string;
  /** Color of the static center circle. */
  backgroundColor?: string;
  /** Colors used for the filled portion of each segment, cycled when fewer colors than data points are provided.
   * When omitted, colors are taken from the chart's categorical color palette. */
  segmentColors?: string[];
  /** Colors for the unfilled background of each segment's radial band, aligned by index with `data`. */
  segmentBackgroundColors?: string[];
  /** Colors for each segment's 1px outline, aligned by index with `data`. No outline is drawn when omitted. */
  segmentOutlineColor?: string[];
  /** Labels rendered outside each segment, aligned by index with `data`. Defaults to the segment's value. */
  segmentLabels?: string[];
  /** Colors for each segment label, aligned by index with `data`. */
  segmentLabelColors?: string[];
};

/**
 * Fully normalized segment chart options after defaults are resolved.
 */
export type ResolvedSegmentChartSeriesConfig = Required<SegmentChartSeriesConfig>;

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

export type SynergySegmentChartSeriesOption = {
  type: 'synergySegmentChart';
  name?: string;
  color?: string;
  data?: number[];
} & SegmentChartSeriesConfig;

/**
 * Input options for the `seriesSegmentChart` preset.
 */
export type SegmentChartSeriesPresetOptions = Omit<SynergySegmentChartSeriesOption, 'type'>;

export type SegmentChartModelOption = {
  type: 'synergySegmentChart';
  data?: number[];
};

/**
 * Add the `synergySegmentChart` series type to the ECharts module.
 */
declare module 'echarts/types/dist/shared.js' {
  interface RegisteredSeriesOption {
    synergySegmentChart: SynergySegmentChartSeriesOption;
  }
}
