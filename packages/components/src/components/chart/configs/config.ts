import type { ECConfig } from '../types.js';
import { createPresetModifier } from './presets/index.js';
import type { SynChartPresetName, SynChartPresetOption } from './presets/index.js';

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
 * Chart config builder that supports applying reusable named presets in a middleware-style chain.
 * The builder merges each step against the current accumulated config.
 */
class ChartConfigBuilder {
  #config: ECConfig;

  /**
   * Creates a new builder seeded with a base chart configuration.
   *
   * @param base The initial config to extend.
   */
  constructor(base: ECConfig) {
    this.#config = base;
  }

  /**
   * Applies a modifier to the current config and stores the merged result.
   *
   * @param modifier The modifier to apply to the current config.
   * @returns The current builder instance for chaining.
   */
  #with(modifier: ConfigModifier): this {
    this.#config = mergeConfigs(this.#config, modifier(this.#config));
    return this;
  }

  /**
   * Applies a named preset to enhance the current chart configuration.
   *
   * Presets are reusable modifier bundles that encapsulate common chart
   * configurations.
   *
   * @param name The preset name to apply.
   * @param options Optional or required preset options depending on the preset.
   * @returns The current builder instance for chaining.
   */
  apply<K extends SynChartPresetName>(
    name: K,
    ...options: SynChartPresetOption<K>
  ): this {
    return this.#with(createPresetModifier(name, options[0]));
  }

  /**
   * Returns the fully composed chart configuration.
   *
   * @returns The final merged ECConfig after all presets have
   * been applied.
   */
  build(): ECConfig {
    return this.#config;
  }
}

/**
 * A function that enhances a chart configuration by receiving a current config, modifying it and returning a new enhanced config.
 *
 * @example
 * ```ts
 * const myModifier: ConfigModifier = (config) =>
 *   mergeConfigs(config, { xAxis: { name: 'Days' } });
 * ```
 */
export type ConfigModifier = (config: ECConfig) => ECConfig;

/**
 * Composes multiple modifiers into a single modifier.
 * Modifiers are applied left-to-right, so later modifiers override earlier ones.
 *
 * Each modifier is evaluated against the accumulated, merged config so composed
 * patch-style modifiers can depend on updates from earlier modifiers.
 *
 * @param modifiers The modifiers to apply in sequence.
 * @returns A single modifier representing the full composition.
 *
 * @example
 * ```ts
 * const combined = compose(withAxesSplitLines(), withHiddenYAxisLabels());
 * chart.config = createConfig(baseConfig).with(combined).build();
 * ```
 */
export const compose = (...modifiers: ConfigModifier[]): ConfigModifier => (config) => modifiers
  .reduce<ECConfig>((acc, modifier) => mergeConfigs(acc, modifier(acc)), config);

/**
 * Creates a configuration builder for composing chart presets in a middleware-style chain.
 * Each `.apply(name, options)` call applies a named, reusable preset bundle.
 * Call `.build()` at the end to retrieve the final ECConfig.
 *
 * @param base The initial chart configuration.
 * @returns A new chart config builder instance.
 *
 * @example
 * ```ts
 * chart.config = createConfig(baseConfig)
 *   .apply('axes.split-lines')
 *   .apply('axes.x-label-icons', { iconUrls })
 *   .build();
 * ```
 */
export const createConfig = (base: ECConfig): ChartConfigBuilder => new ChartConfigBuilder(base);
