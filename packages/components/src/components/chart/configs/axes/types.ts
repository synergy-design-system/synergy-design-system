import type { TextCommonOption } from 'echarts/types/src/util/types.js';
import type { ECConfig } from '../../types.js';

export type AxisKey = 'xAxis' | 'yAxis';

type UnpackedArray<T> = T extends Array<infer U> ? U : T;

export type AxisOption<T extends AxisKey> = UnpackedArray<NonNullable<ECConfig[T]>>;

export type AxisIndexSelection = number | number[];

/**
 * Options for patching a single axis configuration.
 *
 * `axisIndex` can be provided as a single index or as a list of indices, to define which axis or axes should be updated.
 * If no index is set, the calling function can decide which axis or axes should be patched by default.
 */
export type AxisPatchOptions = {
  /**
   * Index or indices of the axis or axes to be patched. If not provided, the calling function can decide which axis or axes should be patched by default.
   */
  axisIndex?: AxisIndexSelection;
};

/**
 * Options for patching multiple axis configurations in a single step.
 *
 * Allows selecting X and Y axes independently via their respective indices to define which axes should be updated.
 * Both fields support either a single index or multiple indices.
 */
export type AxesPatchOptions = {
  /**
   * Index or indices of the X axis or axes to be patched. If not provided, the calling function can decide which X axis or axes should be patched by default.
   */
  xAxisIndex?: AxisIndexSelection;
  /**
   * Index or indices of the Y axis or axes to be patched. If not provided, the calling function can decide which Y axis or axes should be patched by default.
   */
  yAxisIndex?: AxisIndexSelection;
};

/**
 * Options for augmenting axis labels with icons.
 *
 * The icon position depends on the axis type:
 * - `xAxis`: `top` or `bottom`
 * - `yAxis`: `left` or `right`
 */
export type AxisLabelIconsOptions<T extends AxisKey> = {
  /**
   * Index or indices of the axis or axes to which the icons should be added. If not provided, the calling function can decide which axis or axes should be updated by default.
   */
  axisIndex?: AxisIndexSelection;
  /**
   * Color of the icons. If not provided, the synergy default is used.
   */
  iconColor?: string;
  /**
   * Position of the icons relative to the axis labels. For `xAxis`, valid values are `top` or `bottom`. For `yAxis`, valid values are `left` or `right`. If not provided, the synergy default is used.
   */
  iconPosition?: T extends 'xAxis' ? 'top' | 'bottom' : 'left' | 'right';
  /**
   * Array of icon svg data URLs to be added to the axis labels. The icons will be applied in order to the labels. If there are more labels than icons, the the other labels will not have icons.
   */
  iconUrls: string[];
  /**
   * Optional styles for the icons. This style will be applied to all icons.
   */
  iconsStyle?: TextCommonOption;
  /**
   * Optional styles for the labels. This style will be applied to all labels.
   */
  labelsStyle?: TextCommonOption;
};

type IconLabelPosition = 'top' | 'bottom' | 'left' | 'right';

export type AxisLabelIconsConfigOptions = Omit<AxisLabelIconsOptions<'xAxis'>, 'iconPosition' | 'axisIndex'> & {
  config: ECConfig;
  iconColor: string;
  iconPosition: IconLabelPosition;
};
