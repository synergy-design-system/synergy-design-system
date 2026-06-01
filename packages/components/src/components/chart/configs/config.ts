import type { ECConfig } from '../types.js';

// ---------------------------------------------------------------------------
// Low-level deep-merge primitives
// ---------------------------------------------------------------------------

type Mergeable = Record<string, unknown>;
type ConfigLayer = Partial<ECConfig> | undefined;

const isMergeableObject = (value: unknown): value is Mergeable => typeof value === 'object' && value !== null && !Array.isArray(value);

export const mergeObjects = (target: Mergeable, source: Mergeable): Mergeable => {
  const merged = { ...target };

  Object.entries(source).forEach(([key, sourceValue]) => {
    const targetValue = merged[key];

    if (Array.isArray(sourceValue)) {
      // Arrays are replaced by the most recent layer.
      merged[key] = sourceValue.slice();
      return;
    }

    if (isMergeableObject(targetValue) && isMergeableObject(sourceValue)) {
      merged[key] = mergeObjects(targetValue, sourceValue);
      return;
    }

    merged[key] = sourceValue;
  });

  return merged;
};

const mergeConfigLayers = (layers: ConfigLayer[]): ECConfig => layers.reduce<ECConfig>((acc, layer) => (layer ? mergeObjects(acc, layer) : acc), {});

/**
 * Merges multiple config layers into a single ECConfig.
 * Nested objects are deep-merged; arrays are replaced by the latest layer.
 *
 * Primarily used as a building block inside ConfigModifier functions.
 *
 * @example
 * ```ts
 * const myModifier: ConfigModifier = (config) =>
 *   mergeConfigs(config, { xAxis: { name: 'Days' } });
 * ```
 */
export const mergeConfigs = (...layers: ConfigLayer[]): ECConfig => mergeConfigLayers(layers);

// ---------------------------------------------------------------------------
// Composition API
// ---------------------------------------------------------------------------

/**
 * A function that receives the current chart config and returns a new, enhanced config.
 * ConfigModifiers are the building blocks of the middleware-style composition system.
 *
 * @example
 * ```ts
 * const myModifier: ConfigModifier = (config) =>
 *   mergeConfigs(config, { xAxis: { name: 'Days' } });
 * ```
 */
export type ConfigModifier = (config: ECConfig) => ECConfig;

/**
 * Composes multiple ConfigModifiers into a single ConfigModifier.
 * Modifiers are applied left-to-right, so later modifiers override earlier ones.
 *
 * @example
 * ```ts
 * const combined = compose(showGridLines(), hideYAxisValues());
 * chart.config = enhanceConfig(baseConfig).with(combined).build();
 * ```
 */
export const compose = (...modifiers: ConfigModifier[]): ConfigModifier => (config) => modifiers
  .reduce<ECConfig>((acc, modifier) => modifier(acc), config);

/**
 * Public interface for the fluent config builder returned by `enhanceConfig`.
 */
export interface ConfigBuilder {
  /**
   * Applies a ConfigModifier to the accumulated config and returns the builder for chaining.
   */
  with(modifier: ConfigModifier): ConfigBuilder;
  /**
   * Returns the final, merged ECConfig after all modifiers have been applied.
   */
  build(): ECConfig;
}

class ConfigBuilderImpl implements ConfigBuilder {
  #config: ECConfig;

  constructor(base: ECConfig) {
    this.#config = base;
  }

  with(modifier: ConfigModifier): this {
    this.#config = modifier(this.#config);
    return this;
  }

  build(): ECConfig {
    return this.#config;
  }
}

/**
 * Creates a fluent builder for composing chart config modifiers in a middleware-style chain.
 * Each `.with()` call applies a ConfigModifier to the accumulated config.
 * Call `.build()` at the end to retrieve the final ECConfig.
 *
 * @example
 * ```ts
 * chart.config = enhanceConfig(baseConfig)
 *   .with(showGridLines())
 *   .with(xAxisWithIconLabels({ iconUrls }))
 *   .build();
 * ```
 *
 * Modifiers can themselves be composed using `compose`:
 * ```ts
 * const myModifier = compose(showGridLines(), hideYAxisValues());
 * chart.config = enhanceConfig(baseConfig).with(myModifier).build();
 * ```
 */
export const enhanceConfig = (base: ECConfig): ConfigBuilder => new ConfigBuilderImpl(base);
