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

/**
 * Resolves the available preset factories lazily.
 *
 * Lazy initialization avoids early access issues during module evaluation while
 * still preserving exact preset-name and option inference for consumers.
 */
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

/**
 * Internal mapping of preset names to their corresponding factory functions.
 */
type PresetFactories = ReturnType<typeof getPresetFactories>;

/**
 * Union of all supported preset names that can be applied through the chart
 * config composition API.
 */
export type SynChartPresetName = keyof PresetFactories;

/**
 * Maps every preset name to the option object accepted by its factory
 * function.
 */
export type SynChartPresetOptionsMap = {
  [K in SynChartPresetName]:
  Parameters<PresetFactories[K]>[0];
};

/**
 * Tuple-shaped argument contract for a preset.
 *
 * Presets with optional options accept zero or one argument, while presets with
 * required options enforce a single argument.
 */
export type SynChartPresetOption<K extends SynChartPresetName> = undefined extends SynChartPresetOptionsMap[K]
  ? [options?: SynChartPresetOptionsMap[K]]
  : [options: SynChartPresetOptionsMap[K]];

/**
 * Internal factory signature used to normalize strongly typed preset factory
 * access by preset name.
 */
type PresetFactory<K extends SynChartPresetName> =
  (options: SynChartPresetOption<K>[0]) => ConfigModifier;

/**
 * Creates a config modifier from a named preset and its typed options.
 *
 * @param name The preset name
 * @param options The options passed through to the resolved preset factory.
 * @returns A config modifier that applies the selected preset.
 */
export const createPresetModifier = <K extends SynChartPresetName>(
  name: K,
  options: SynChartPresetOption<K>[0],
): ConfigModifier => {
  const presetFactories = getPresetFactories();
  const factory = presetFactories[name] as PresetFactory<K>;
  return factory(options);
};
