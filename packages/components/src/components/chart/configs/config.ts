import type {
  ChartConfigHandle,
  ChartConfigType,
  ECConfig,
} from '../types.js';
import { type ConfigModifier, mergeConfigs } from './utilities.js';
import { ChartPresets } from './presets/index.js';

// ---------------------------------------------------------------------------
// Composition API
// ---------------------------------------------------------------------------

export class ChartConfigBuilder {
  #config: ECConfig;

  /**
   * Creates a new handle seeded with an empty chart configuration.
   *
   * @param base The initial config to extend.
   */
  constructor(base: ECConfig = {}) {
    this.#config = base;
    this.#registerPresetHandleMethods();
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
   * Sets the base chart config that subsequent preset calls extend.
   *
   * Calling `baseConfig()` again replaces the previous base config.
   */
  baseConfig(config: ECConfig): ChartConfigHandle {
    this.#config = mergeConfigs(config);
    return this as ChartConfigHandle;
  }

  /**
   * Registers all preset functions from the `ChartPresets` namespace as methods on this builder instance.
   *
   * Each method is named after the preset and accepts the same options as the preset function.
   * Calling a method applies the corresponding preset to the current config.
   */
  #registerPresetHandleMethods(): ChartConfigHandle {
    Object.entries(ChartPresets)
      .forEach(([modifierName, modifier]) => {
        Object.defineProperty(this, modifierName, {
          configurable: true,
          enumerable: false,
          // @ts-expect-error - Ignore it for now
          value: (options: Parameters<typeof modifier>[0]) => this.#with(modifier(options)),
          writable: false,
        });
      });
    return this as ChartConfigHandle;
  }

  /**
   * Returns the composed chart configuration.
   *
   * @returns The final merged ECConfig.
   */
  build(): ECConfig {
    return this.#config;
  }
}

/**
 * Resolves all supported chart config inputs to a final `ECConfig` object.
 *
 * When the input is a callback, the callback receives a typed handle and can
 * update the config via semantic helper methods.
 *
 * @param input Chart config object or callback handle input.
 * @returns The final chart option object.
 *
 * @example
 * ```ts
 * chart.config = handle => {
 *   handle.baseConfig(baseConfig);
 *   handle.axesShowSplitLines();
 *   handle.axesAddXLabelIcons({ iconUrls, iconPosition: 'top' });
 * };
 * ```
 */
export const resolveConfigInput = (input: ChartConfigType): ECConfig => {
  if (typeof input === 'function') {
    const builder = new ChartConfigBuilder();
    // @ts-expect-error - Ignore it for now
    input(builder);
    return builder.build();
  }

  return input;
};
