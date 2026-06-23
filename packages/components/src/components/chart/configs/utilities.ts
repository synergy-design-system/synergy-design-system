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
type ConfigLayer = Partial<ECConfig> | undefined;

/**
 * Determines whether a value can be merged recursively.
 *
 * Arrays are intentionally excluded because config arrays are replaced instead
 * of merged item-by-item.
 *
 * @param value The value to inspect.
 * @returns True when the value is a non-null plain object.
 */
const isMergeableObject = (value: unknown): value is Mergeable => typeof value === 'object' && value !== null && !Array.isArray(value);

/**
 * Deep-merges two config objects into a new object.
 *
 * Nested plain objects are merged recursively. Arrays are copied from the
 * source and replace any existing target arrays.
 *
 * @param target The existing accumulated config object.
 * @param source The next config layer to merge into the target.
 * @returns A new merged object.
 */
const mergeDeep = (target: Mergeable, source: Mergeable): Mergeable => {
  const merged = { ...target };

  Object.entries(source).forEach(([key, sourceValue]) => {
    const targetValue = merged[key];

    if (Array.isArray(sourceValue)) {
      // Arrays are replaced by the most recent layer.
      merged[key] = sourceValue.slice();
      return;
    }

    if (isMergeableObject(targetValue) && isMergeableObject(sourceValue)) {
      merged[key] = mergeDeep(targetValue, sourceValue);
      return;
    }

    merged[key] = sourceValue;
  });

  return merged;
};

/**
 * Merges multiple config layers into a single ECConfig.
 *
 * Nested plain objects are deep-merged recursively. Arrays are always
 * replaced by the rightmost (latest) value that provides them. Undefined
 * or null layers are silently ignored, allowing conditional config layers
 * to be passed without pre-filtering.
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
): ECConfig => layers.reduce<ECConfig>((acc, layer) => (layer ? mergeDeep(acc, layer) : acc), {});

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
