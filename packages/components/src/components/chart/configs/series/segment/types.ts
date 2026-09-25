import type { ZRColor } from 'echarts/types/dist/shared.js';
import type { TextStyle } from '../../types.js';

export type WedgeStyle = {
  fill?: ZRColor;
  lineWidth?: number;
  stroke?: string;
};

export type SegmentWedgeShape = {
  centerX: number;
  centerY: number;
  innerRadius: number;
  outerRadius: number;
  startAngle: number;
  endAngle: number;
  halfGap: number;
};

/**
 * Configuration options for the `synSegment` series.
 */
export type SegmentSeriesConfig = {
  /** Minimum value used to normalize the segment fill ratio. Defaults to `0`. */
  min?: number;
  /** Maximum value used to normalize the segment fill ratio. Defaults to `100`. */
  max?: number;
  /** Fraction (0-1) of the full circle left empty, where the main `mainLabel` is rendered. Defaults to `0.3`. */
  // TODO: Does it make sense to have it valued by 0-1 or would it be better from 0-360 degree?
  gap?: number;
  /** Rotates the gap (and therefore the whole chart), in degrees. `0` centers the gap at the bottom. */
  gapOrientation?: number;
  /** Optional SVG data URL rendered as an icon inside the static center circle. */
  icon?: string;
  // TODO: Reicht es, wenn man nur für alle gleichezitig die Background color einstellen kann?
  backgroundStyle?: {
    /** Colors for the unfilled background of each segment's radial band, aligned by index with `data`. */
    color?: ZRColor;
    borderColor?: ZRColor;
    borderWidth?: number;
  },
  itemStyle?: {
    /** Colors used for the filled portion of each segment, cycled when fewer colors than data points are provided.
 * When omitted, colors are taken from the chart's categorical color palette. */
    color?: ZRColor;
    /** Colors for each segment's 1px outline, aligned by index with `data`. No outline is drawn when omitted. */
    borderColor?: ZRColor;
    borderWidth?: number;
  },
  labelTextStyle?: TextStyle;
  /** Main name rendered inside the gap. */
  name?: string;
  nameTextStyle?: TextStyle;
};

/**
 * Fully normalized segment chart options after defaults are resolved.
 */
export type ResolvedSegmentChartSeriesConfig = Required<Omit<SegmentSeriesConfig, 'icon'>> & {
  icon?: SegmentSeriesConfig['icon'];
};

/**
 * A single data item shown as a segment item with optional label metadata.
 */
export type SegmentDataItem = {
  /** Numeric value of the segment; determines the slice angle relative to the other values. */
  value: number;
  /**
   * Series item name used for displaying in legend.
   */
  name?: string;
  /**
   * Label shown for the segment item.
   * If set to a function, it will be called with the segment value to generate the label.
   * If not set, the value will be used as the label.
   * To remove the label, set this to `undefined`.
   * */
  label?: string | ((value: number) => string);
  labelTextStyle?: TextStyle;
  backgroundStyle?: {
    /** Colors for the unfilled background of each segment's radial band, aligned by index with `data`. */
    color?: ZRColor;
    borderColor?: ZRColor;
    borderWidth?: number;
  };
  itemStyle?: {
    /** Colors used for the filled portion of each segment, cycled when fewer colors than data points are provided.
 * When omitted, colors are taken from the chart's categorical color palette. */
    color?: ZRColor;
    /** Colors for each segment's 1px outline, aligned by index with `data`. No outline is drawn when omitted. */
    borderColor?: ZRColor;
    borderWidth?: number;
  };
  /**
 * Angular width of each segment, aligned by index with `data`. Normalized to the available
 * angle (360 degrees minus the `gap`), analogous to the donut series. When omitted, or when
 * shorter than `data`, missing entries default to an equal weight of `1`.
 */
  weight: number;
};

/**
 * The accepted value type for each segment data entry, either a raw number or a labeled object.
 */
export type SegmentDataValue = number | SegmentDataItem;

export type SegmentSeriesOption = SegmentSeriesConfig & {
  type?: 'synSegment';
  name?: string;
  colorBy?: 'data';
  data?: SegmentDataValue[];
};

/**
 * Public series option shape for the custom synSegment chart type.
 */
export type SynergySegmentSeriesOption = Omit<SegmentSeriesOption, 'type'> & { type: 'synSegment' };

/**
 * Input options for the `seriesSegment` preset.
 */
export type SegmentSeriesPresetOptions = Omit<SegmentSeriesOption, 'type' | 'colorBy'>;

/**
 * Add the `synSegment` series type to the ECharts module.
 */
declare module 'echarts/types/dist/shared.js' {
  interface RegisteredSeriesOption {
    synSegment: SynergySegmentSeriesOption;
  }
}
