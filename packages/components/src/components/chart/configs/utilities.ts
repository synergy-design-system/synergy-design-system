import type { ECConfig } from '../types.js';

// ---------------------------------------------------------------------------
// Low-level deep-merge primitives
// ---------------------------------------------------------------------------

/**
 * Plain object shape supported by the internal deep-merge helpers.
 */
type Mergeable = Record<string, unknown>;

/**
 * A single partial config contribution that can participate in a merge.
 */
type ConfigLayer = Partial<ECConfig> | null | undefined;

/**
 * Determines whether a value can be merged recursively.
 *
 * Arrays are intentionally excluded because they use a dedicated merge
 * strategy.
 *
 * @param value The value to inspect.
 * @returns True when the value is a non-null plain object.
 */
const isMergeableObject = (value: unknown): value is Mergeable => typeof value === 'object' && value !== null && !Array.isArray(value);

/**
 * Merges an object into the first entry of an array.
 *
 * @param arrayValue Base array to keep.
 * @param objectValue Object to merge into index 0.
 * @param objectAsSource Whether the object comes from the source layer.
 * @param mergeValue Recursive merge callback.
 * @returns A merged array.
 */
const mergeArrayWithObject = (
  arrayValue: unknown[],
  objectValue: Mergeable,
  objectAsSource: boolean,
  mergeValue: (targetValue: unknown, sourceValue: unknown) => unknown,
): unknown[] => {
  const mergedArray = arrayValue.slice();
  const firstEntry = mergedArray[0];

  if (isMergeableObject(firstEntry)) {
    mergedArray[0] = objectAsSource
      ? mergeValue(firstEntry, objectValue)
      : mergeValue(objectValue, firstEntry);
    return mergedArray;
  }

  mergedArray[0] = objectValue;
  return mergedArray;
};

/**
 * Merges two arrays by index.
 *
 * @param targetArray Existing array value.
 * @param sourceArray Incoming array value.
 * @param mergeValue Recursive merge callback.
 * @returns A merged array preserving non-overlapping entries.
 */
const mergeArraysByIndex = (
  targetArray: unknown[],
  sourceArray: unknown[],
  mergeValue: (targetValue: unknown, sourceValue: unknown) => unknown,
): unknown[] => {
  const maxLength = Math.max(targetArray.length, sourceArray.length);

  return Array.from({ length: maxLength }, (_, index) => {
    if (index >= sourceArray.length) {
      return targetArray[index];
    }

    if (index >= targetArray.length) {
      return sourceArray[index];
    }

    return mergeValue(targetArray[index], sourceArray[index]);
  });
};

type DeepMergeInput = object | unknown[];

/**
 * Deep-merges two config objects into a new object.
 *
 * Nested plain objects are merged recursively. Arrays are merged by index and
 * preserve non-overlapping entries.
 *
 * @param target The existing accumulated config object.
 * @param source The next config layer to merge into the target.
 * @returns A new merged object.
 */
export function mergeDeep(target: DeepMergeInput, source: DeepMergeInput): DeepMergeInput {
  if(!target) return source;
  if(!source) return target;

  const mergeValue = (targetValue: unknown, sourceValue: unknown): unknown => {
    if (Array.isArray(sourceValue)) {
      if (Array.isArray(targetValue)) {
        return mergeArraysByIndex(targetValue, sourceValue, mergeValue);
      }

      if (isMergeableObject(targetValue)) {
        return mergeArrayWithObject(sourceValue, targetValue, false, mergeValue);
      }

      return sourceValue.slice();
    }

    if (Array.isArray(targetValue) && isMergeableObject(sourceValue)) {
      return mergeArrayWithObject(targetValue, sourceValue, true, mergeValue);
    }

    if (isMergeableObject(targetValue) && isMergeableObject(sourceValue)) {
      const mergedObject = { ...targetValue };

      Object.entries(sourceValue).forEach(([key, nextSourceValue]) => {
        const nextTargetValue = mergedObject[key];
        mergedObject[key] = mergeValue(nextTargetValue, nextSourceValue);
      });

      return mergedObject;
    }

    return sourceValue;
  };

  return mergeValue(target, source) as DeepMergeInput;
}

/**
 * Merges multiple config layers into a single ECConfig.
 *
 * Nested plain objects are deep-merged recursively. Arrays are merged by
 * index, and object/array conflicts merge the object into the first array
 * element. Undefined or null layers are silently ignored, allowing
 * conditional config layers to be passed without pre-filtering.
 *
 * This is the primary low-level helper used inside ConfigModifier functions
 * and builder operations. When no layers are provided, returns an empty object.
 *
 * @param layers Variable number of config layers to merge, applied left-to-right.
 * @returns The fully merged chart configuration.
 *
 * @example
 * ```ts
 * // Basic merge
 * const myModifier: ConfigModifier = (config) =>
 *   mergeConfigs(config, { xAxis: { name: 'Days' } });
 *
 * // With conditional layers
 * const config = mergeConfigs(
 *   baseConfig,
 *   shouldAddTitle ? { title: { text: 'My Chart' } } : undefined,
 *   { yAxis: { name: 'Values' } }
 * );
 * ```
 */
export const mergeConfigs = (
  ...layers: ConfigLayer[]
): ECConfig => layers.reduce<ECConfig>((acc, layer) => (layer == null ? acc : mergeDeep(acc, layer) as ECConfig), {});

// ---------------------------------------------------------------------------
// Composition API
// ---------------------------------------------------------------------------

/**
 * The signature of a function that modifies a chart configuration.
 *
 * @example
 * ```ts
 * const myModifier: ConfigModifier = (config) =>
 *   mergeConfigs(config, { xAxis: { name: 'Days' } });
 * ```
 */
export type ConfigModifier = (config: ECConfig) => ECConfig;

/**
 * Composes multiple modifiers into a single `ConfigModifier`.
 * Modifiers are applied left-to-right, so later Modifiers override earlier ones.
 *
 * Each modifier is evaluated against the accumulated, merged config so composed
 * patch-style modifiers can depend on updates from earlier ones.
 *
 * @param modifiers The modifiers to apply in sequence.
 * @returns A single `ConfigModifier` representing the full composition.
 *
 * @example
 * ```ts
 * const combined = compose(axesShowSplitLines(), axesHideYLabels());
 * ```
 */
export const compose = (...modifiers: ConfigModifier[]): ConfigModifier => (config) => modifiers
  .reduce<ECConfig>((acc, modifier) => mergeConfigs(acc, modifier(acc)), config);

export const getAsArray = <T>(value: T | T[]): T[] => (Array.isArray(value) ? value : [value]);
