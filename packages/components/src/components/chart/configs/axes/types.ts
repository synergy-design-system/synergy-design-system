import type { TextCommonOption } from 'echarts/types/src/util/types.js';
import type { ECConfig } from '../../types.js';

export type AxisKey = 'xAxis' | 'yAxis';

type UnpackedArray<T> = T extends Array<infer U> ? U : T;

export type AxisOption<T extends AxisKey> = UnpackedArray<NonNullable<ECConfig[T]>>;

export type AxisIndexSelection = number | number[];

export type AxisPatchOptions = {
  axisIndex?: AxisIndexSelection;
};

export type AxesPatchOptions = {
  xAxisIndex?: AxisIndexSelection;
  yAxisIndex?: AxisIndexSelection;
};

export type AxisLabelIconsOptions<T extends AxisKey> = {
  axisIndex?: AxisIndexSelection;
  iconColor?: string;
  iconPosition?: T extends 'xAxis' ? 'top' | 'bottom' : 'left' | 'right';
  iconUrls: string[];
  iconsStyle?: TextCommonOption;
  labelsStyle?: TextCommonOption;
};

type IconLabelPosition = 'top' | 'bottom' | 'left' | 'right';

export type AxisLabelIconsConfigOptions = Omit<AxisLabelIconsOptions<'xAxis'>, 'iconPosition' | 'axisIndex'> & {
  config: ECConfig;
  iconColor: string;
  iconPosition: IconLabelPosition;
};
