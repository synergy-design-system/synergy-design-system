import * as axes from '../axes/presets.js';
import * as legend from '../legend/presets.js';
import * as tooltip from '../tooltip/presets.js';
import * as series from '../series/series.js';

/**
 * Namespace containing all chart config preset functions.
 *
 * Each function accepts options and returns a `ConfigModifier` that can be applied to a chart configuration.
 */
export const ChartPresets = {
  ...axes,
  ...legend,
  ...tooltip,
  ...series,
} as typeof axes & typeof legend & typeof tooltip & typeof series;
