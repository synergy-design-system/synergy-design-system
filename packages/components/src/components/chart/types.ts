import type { EChartsOption } from 'echarts/types/dist/shared.js';
import {
  type ChartPresets,
} from './configs/presets/index.js';
import type { ChartConfigBuilder } from './configs/config.js';

export type ECConfig = EChartsOption;

export type ChartPresetFunctions = {
  [K in keyof typeof ChartPresets]: (...args: Parameters<(typeof ChartPresets)[K]>) => ChartConfigHandle;
};

export type ChartConfigHandle = ChartPresetFunctions & Omit<ChartConfigBuilder, 'build'>;

/**
 * Configuration callback for the chart `config` property.
 *
 * This callback is invoked with a configuration handle that provides preset functions
 * for building the chart configuration. Use the handle to call preset functions and
 * set the base configuration. The callback is responsible for configuring all aspects
 * of the chart before rendering.
 *
 * @example
 * ```typescript
 * config={(handle) => {
 *   handle.baseConfig({ ... });
 *   handle.axesShowSplitLines();
 *   handle.axesAddXLabelIcons({ ... });
 * }}
 * ```
 */
export type ChartConfigCallback = (handle: ChartConfigHandle) => void;

/**
 * Accepted input type for the `config` property on `<syn-chart>`.
 *
 * Can be either:
 * - A direct ECharts configuration object
 * - A callback function that configures the chart using preset functions
 */
export type ChartConfigType = ECConfig | ChartConfigCallback;

export type {
  AxisIndices,
  AxisUpdateOptions,
  AxesUpdateOptions,
  AxisLabelIconOptions,
} from './configs/axes/types.js';

export type {
  LegendOptions as LegendPresetOptions,
  LegendPosition as LegendPresetPosition,
} from './configs/legend/types.js';
