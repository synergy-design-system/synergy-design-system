import * as axes from '../axes/presets.js';
import * as legend from '../legend/presets.js';
import * as lineSeries from '../line-series/presets.js';
import * as tooltip from '../tooltip/presets.js';

/**
 * Namespace containing all chart config preset functions.
 *
 * Each function accepts options and returns a `ConfigModifier` that can be applied to a chart configuration.
 */
// This eslint disable is needed, so the user gets the correct JSDOC and types of the functions.
// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
export const ChartPresets = {
  ...axes,
  ...legend,
  ...lineSeries,
  ...tooltip,
} as typeof axes & typeof legend & typeof lineSeries & typeof tooltip;
