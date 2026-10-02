import type { ZRColor } from 'echarts/types/dist/shared.js';
import type {
  BackgroundStyle, ItemStyle, LayoutInsets, TextStyle,
} from '../../types.js';

/**
 * Visual styling applied to an individual segment wedge.
 */
export type WedgeStyle = {
  fill?: ZRColor;
  lineWidth?: number;
  stroke?: ZRColor;
};

/**
 * Geometric dimensions and angles used to render a segment wedge.
 */
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
export type SegmentSeriesConfig = LayoutInsets & BackgroundStyle & ItemStyle & {
  /** Minimum value used to normalize the segment fill ratio. Defaults to `0`. */
  min?: number;
  /** Maximum value used to normalize the segment fill ratio. Defaults to `100`. */
  max?: number;
  /** Fraction (0-1) of the full circle left empty, where the main `mainLabel` is rendered. Defaults to `0.3`. */
  gap?: number;
  /** Rotates the gap (and therefore the whole chart), in degrees. `0` centers the gap at the bottom. Defaults to `0`. */
  gapOrientation?: number;
  /** Optional SVG data URL rendered as an icon inside the static center circle. */
  icon?: string;
  /** Text style for the segment labels rendered outside each segment. */
  // TODO: make labelTextStyle work from root
  labelTextStyle?: TextStyle;
  /** Name rendered inside the gap. */
  name?: string;
  /** Text style for the name rendered inside the gap. */
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
export type SegmentDataItem = BackgroundStyle & ItemStyle & {
  /** Numeric value of the segment. Defines the amplitude of a segment. */
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
  /** Text style for the specific segment label rendered outside each segment. */
  labelTextStyle?: TextStyle;
  /**
   * Angular width for each segment. Missing entries default to `1`.
   */
  weight?: number;
};

/**
 * The accepted value type for each segment data entry, either a raw number or a labeled object.
 */
export type SegmentDataValue = number | SegmentDataItem;

/**
 * ECharts series options for the custom `synSegment` series.
 */
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
