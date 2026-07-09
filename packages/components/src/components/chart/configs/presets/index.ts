import * as axes from '../axes/presets.js';
import * as legend from '../legend/presets.js';

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
} as typeof axes & typeof legend;
