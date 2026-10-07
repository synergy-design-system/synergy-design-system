import type { ChartView, ZRColor, use } from 'echarts/types/dist/shared.js';
import type { graphic } from 'echarts/core.js';

/** Common visual style properties for chart elements. */
export type Style = {
  color?: ZRColor;
  borderColor?: ZRColor;
  borderWidth?: number;
};

/** Background styling applied to a chart or chart area. */
export type BackgroundStyle = {
  backgroundStyle?: Style;
};

/** Item styling applied to an individual chart data item. */
export type ItemStyle = {
  itemStyle?: Style;
};

/**
 * Makes selected keys required while preserving the remaining type shape.
 */
export type WithRequired<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;

/**
 * Overrides properties of a type with another type, while preserving the remaining type shape.
 */
export type Override<T, R> = Omit<T, keyof R> & R;

/**
 * Represents a point in 2D space with x and y coordinates.
 */
export type Point = {
  x: number;
  y: number;
};

/**
 * A point shifted tangentially (perpendicular to the radial direction) by a constant pixel distance from the ideal (un-shifted) angle, together with the angle at which it sits on
 * its own radius. Coordinates are relative to the shape's center.
 */
export type ShiftedPoint = Point & { angle: number };

/** Start and end angular bounds for a single chart segment. */
export type SegmentRange = {
  startAngle: number;
  endAngle: number;
};

/** Numeric pixel value or percentage string (e.g. '50%'). */
export type LayoutValue = number | string;

/** Parsed representation of a layout value, or an invalid input. */
export type ParsedLayoutValue =
  | { kind: 'pixel'; value: number }
  | { kind: 'percent'; value: number }
  | { kind: 'invalid' };

/** Insets that define the usable area of a chart layout. */
export type LayoutInsets = {
  /** Top inset */
  top?: LayoutValue;
  /** Right inset */
  right?: LayoutValue;
  /** Bottom inset */
  bottom?: LayoutValue;
  /** Left inset */
  left?: LayoutValue;
};

/** Pixel bounds of a resolved chart layout area. */
export type LayoutBounds = {
  top: number;
  right: number;
  bottom: number;
  left: number;
};

/** Optional horizontal and vertical center values for a circular layout. */
export type LayoutCenterInput = [LayoutValue, LayoutValue] | undefined;

/** Optional outer radius value for a circular layout. */
export type LayoutRadiusInput = LayoutValue | undefined;

/** Input values supported by the shared circular layout resolver. */
export type CircularLayoutInput = LayoutInsets & {
  center?: LayoutCenterInput;
  radius?: LayoutRadiusInput;
};

/** Fully resolved pixel-based layout values used to render a circular chart. */
export type ResolvedCircularLayout = {
  centerX: number;
  centerY: number;
  layoutWidth: number;
  layoutHeight: number;
  outerRadius: number;
  bounds: LayoutBounds;
};

/** ECharts model instance available during chart rendering and lifecycle hooks. */
export type GlobalModel = Parameters<ChartView['render']>[1];

/** ECharts extension API passed to custom view/render implementations. */
export type ExtensionAPI = Parameters<ChartView['render']>[2];

/** Custom ECharts extension installer callback type accepted by the chart runtime. */
export type EChartsExtensionInstaller = Exclude<Parameters<typeof use>[0], readonly unknown[] | { install: unknown }>;

/** Registry map produced by an ECharts extension installer for custom series options. */
export type EChartsExtensionInstallRegisters = Parameters<EChartsExtensionInstaller>[0];

/** Style options for a text element. */
export type TextStyle = graphic.Text['style'];
