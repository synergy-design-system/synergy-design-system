import type { XAXisOption } from 'echarts/types/dist/shared';
import type { ECConfig } from '../../types.js';

export type AxisLabel = NonNullable<XAXisOption['axisLabel']>;
export type AxisLabelRich = NonNullable<AxisLabel['rich']>[string];

export type AxisKey = 'xAxis' | 'yAxis';

type UnpackedArray<T> = T extends Array<infer U> ? U : T;

export type AxisOption<T extends AxisKey> = UnpackedArray<NonNullable<ECConfig[T]>>;

/**
 * A single axis index or a list of axis indices.
 */
export type AxisIndices = number | number[];

/**
 * Options for presets that update one axis type (e.g. x-axis) at a time.
 */
export type AxisUpdateOptions = {
  /**
   * Axis index or indices to update.
   *
   * When omitted, the preset applies its own default axis selection.
   */
  axisIndex?: AxisIndices;
};

/**
 * Options for presets that can update x-axis and y-axis configurations in one step.
 */
export type AxesUpdateOptions = {
  /**
   * X-axis index or indices to update.
   *
   * When omitted, the preset applies its own default x-axis selection.
   */
  xAxisIndex?: AxisIndices;
  /**
   * Y-axis index or indices to update.
   *
   * When omitted, the preset applies its own default y-axis selection.
   */
  yAxisIndex?: AxisIndices;
};

/**
 * Options for adding icons to axis labels.
 */
export type AxisLabelIconOptions<T extends AxisKey> = {
  /**
   * Axis index or indices whose labels should receive icons.
   *
   * When omitted, the preset applies its own default axis selection.
   */
  axisIndex?: AxisIndices;
  /**
   * Icon color. Should be a valid CSS color string (e.g. `#ff0000`, `rgb(255, 0, 0)`, `red`).
   *
   * When omitted, the Synergy default color is used.
   */
  iconColor?: string;
  /**
   * Position of the icons relative to the axis labels.
   *  The generic axis type determines which icon positions are allowed:
   * - `xAxis`: `top` or `bottom`
   * - `yAxis`: `left` or `right`
   *
   * When omitted, the Synergy default position is used.
   */
  iconPosition?: T extends 'xAxis' ? 'top' | 'bottom' : 'left' | 'right';
  /**
   * SVG data URLs applied to labels in label order.
   *
   * If there are fewer icons than labels, the remaining labels stay unchanged.
   */
  iconUrls: string[];
  /**
   * Optional styles applied to all icons.
   */
  iconsStyle?: AxisLabelRich;
  /**
   * Optional styles applied to all labels.
   */
  labelsStyle?: AxisLabelRich;
};

type IconLabelPosition = 'top' | 'bottom' | 'left' | 'right';

export type AxisLabelIconsConfig = Omit<AxisLabelIconOptions<'xAxis'>, 'iconPosition' | 'axisIndex'> & {
  config: ECConfig;
  iconColor: string;
  iconPosition: IconLabelPosition;
};
