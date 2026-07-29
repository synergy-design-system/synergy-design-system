import { PALETTE_TOKENS } from '../chart.palettes.js';
import { THEME } from '../configs/constants.js';
import { type Themes, getRealStyleValue, getRealValueWithoutUnit } from './utilities.js';
import { getDefaultAxisStyles } from '../configs/axes/utilities.js';
import { getDataZoomStyles } from '../configs/data-zoom/utilities.js';
import { getDefaultLegendStyles } from '../configs/legend/utilities.js';
import { getDefaultTooltipStyle } from '../configs/tooltip/utilities.js';

const getCategoricalColors = (mode: Themes) => PALETTE_TOKENS.categorical.map((token) => getRealStyleValue(token, mode)).filter(Boolean);

/**
 * Builds the default Synergy ECharts theme for the requested color mode.
 *
 * @param {Themes} mode Theme mode used to resolve the design tokens.
 */
// Synergy ECharts Theme
export const getSynergyTheme = (mode: Themes = 'light') => ({
  // Remove the starting animation for chart series
  animationDuration: 0,
  categoryAxis: getDefaultAxisStyles(mode),
  // Default color palette for charts, is categorical by default but can be overridden by setting the palette property on the chart component or by directly setting config.color
  color: getCategoricalColors(mode),
  darkMode: 'auto',
  // Default style for the zoom slider on the bottom of the chart
  dataZoom: getDataZoomStyles(mode),
  grid: {
    bottom: 0,
    left: 0,
    // This is needed otherwise the last splitLine of the xAxis or the dataZoom slider is cut off
    right: THEME.GRID_RIGHT_INSET,
    top: 0,
  },
  legend: getDefaultLegendStyles(mode),
  // Default line series styles
  line: {
    // Currently there is a bug in ECharts with symbol type 'none', where in the legend a filled circle is shown. This is a known bug in ECharts (https://github.com/apache/echarts/issues/20958)
    symbol: 'none',
    symbolSize: getRealValueWithoutUnit('SynSpacingXSmall', mode),
  },
  logAxis: getDefaultAxisStyles(mode),
  // Global font style
  textStyle: {
    color: getRealStyleValue('SynTypographyColorText', mode),
    fontFamily: getRealStyleValue('SynFontSans', mode),
    fontSize: getRealStyleValue('SynFontSizeSmall', mode),
    fontWeight: getRealStyleValue('SynFontWeightNormal', mode),
  },
  timeAxis: getDefaultAxisStyles(mode),
  tooltip: getDefaultTooltipStyle(mode),
  valueAxis: getDefaultAxisStyles(mode),
});
