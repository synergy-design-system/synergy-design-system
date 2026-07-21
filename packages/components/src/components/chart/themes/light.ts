import { PALETTE_TOKENS } from '../chart.palettes.js';
import { THEME } from '../configs/constants.js';
import { getRealStyleValue } from './utilities.js';
import { getDefaultAxisStyles } from '../configs/axes/utilities.js';
import { getDefaultLegendStyles } from '../configs/legend/utilities.js';

// TODO: Do we want to work with getComputedStyle, or just add a light / dark theme with explicit hex colors?
// To be able to use SSR we probably need to go with explicit colors in the theme
const getCategoricalColors = () => PALETTE_TOKENS.categorical.map(getRealStyleValue).filter(Boolean);

// Synergy ECharts Theme
export const getSynergyLightTheme = () => ({
  categoryAxis: getDefaultAxisStyles(),
  // Default color palette for charts, is categorical by default but can be overridden by setting the palette property on the chart component or by directly setting config.color
  color: getCategoricalColors(),
  darkMode: 'auto',
  grid: {
    bottom: 0,
    left: 0,
    // This is needed otherwise the last splitLine of the xAxis is cut off
    right: THEME.GRID_RIGHT_INSET,
    top: 0,
  },
  legend: getDefaultLegendStyles(),
  logAxis: getDefaultAxisStyles(),
  // Global font style
  textStyle: {
    color: getRealStyleValue('--syn-typography-color-text'),
    fontFamily: getRealStyleValue('--syn-font-sans'),
    fontSize: getRealStyleValue('--syn-font-size-small'),
    fontWeight: getRealStyleValue('--syn-font-weight-normal'),
  },
  timeAxis: getDefaultAxisStyles(),
  valueAxis: getDefaultAxisStyles(),
});
