import type { ChartView, use } from 'echarts/types/dist/shared.js';
import type { graphic } from 'echarts/core.js';

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

/** ECharts model instance available during chart rendering and lifecycle hooks. */
export type GlobalModel = Parameters<ChartView['render']>[1];

/** ECharts extension API passed to custom view/render implementations. */
export type ExtensionAPI = Parameters<ChartView['render']>[2];

/** Custom ECharts extension installer callback type accepted by the chart runtime. */
export type EChartsExtensionInstaller = Exclude<Parameters<typeof use>[0], readonly unknown[] | { install: unknown }>;

/** Registry map produced by an ECharts extension installer for custom series options. */
export type EChartsExtensionInstallRegisters = Parameters<EChartsExtensionInstaller>[0];

/** Style options for an text element */
export type TextStyle = graphic.Text['style'];
