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

// Define factories lazily to ensure all imported functions are available
const getPresetFactories = () => ({
  'axes.hide-labels': withHiddenAxisLabels,
  'axes.hide-x-labels': withHiddenXAxisLabels,
  'axes.hide-y-labels': withHiddenYAxisLabels,
  'axes.split-lines': withAxesSplitLines,
  'axes.x-label-icons': withXAxisLabelIcons,
  'axes.x-split-lines': withXAxisSplitLines,
  'axes.y-label-icons': withYAxisLabelIcons,
  'axes.y-split-lines': withYAxisSplitLines,
}) as const;

type PresetFactories = ReturnType<typeof getPresetFactories>;

export type SynChartPresetName = keyof PresetFactories;

export type SynChartPresetOptionsMap = {
  [K in SynChartPresetName]:
  Parameters<PresetFactories[K]>[0];
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
): ConfigModifier => applyPresetFactory(getPresetFactories(), preset[0], preset[1]);
