import type { ConfigModifier } from '../config.js';
import {
  withAxesSplitLines,
  withHiddenAxisLabels,
  withHiddenXAxisLabels,
  withHiddenYAxisLabels,
  withXAxisLabelIcons,
  withXAxisSplitLines,
  withYAxisLabelIcons,
  withYAxisSplitLines,
} from '../axes/index.js';

const presetFactories = {
  'axes.hide-labels': withHiddenAxisLabels,
  'axes.hide-x-labels': withHiddenXAxisLabels,
  'axes.hide-y-labels': withHiddenYAxisLabels,
  'axes.split-lines': withAxesSplitLines,
  'axes.x-label-icons': withXAxisLabelIcons,
  'axes.x-split-lines': withXAxisSplitLines,
  'axes.y-label-icons': withYAxisLabelIcons,
  'axes.y-split-lines': withYAxisSplitLines,
} as const;

export type SynChartPresetName = keyof typeof presetFactories;

export type SynChartPresetOptionsMap = {
  [K in SynChartPresetName]:
  Parameters<typeof presetFactories[K]>[0];
};

export type PresetTuple<K extends SynChartPresetName> =
  undefined extends SynChartPresetOptionsMap[K]
    ? [name: K, options?: SynChartPresetOptionsMap[K]]
    : [name: K, options: SynChartPresetOptionsMap[K]];

const applyPresetFactory = <
  TFactories extends Record<string, (options: unknown) => ConfigModifier>,
  TName extends keyof TFactories,
>(
  factories: TFactories,
  ...[name, options]: undefined extends Parameters<TFactories[TName]>[0]
    ? [name: TName, options?: Parameters<TFactories[TName]>[0]]
    : [name: TName, options: Parameters<TFactories[TName]>[0]]
): ConfigModifier => factories[name](options);

export const createPresetModifier = <K extends SynChartPresetName>(
  ...preset: PresetTuple<K>
): ConfigModifier => applyPresetFactory(presetFactories, preset[0], preset[1]);
