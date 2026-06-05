import { PALETTE_TOKENS } from '../chart.palettes.js';
import { getRealStyleValue } from './utilities.js';

// TODO: Do we want to work with getComputedStyle, or just add a light / dark theme with explicit hex colors?
// To be able to use SSR we probably need to go with explicit colors in the theme
const categoricalColors = PALETTE_TOKENS.categorical.map(getRealStyleValue).filter(Boolean);

const axisCommon = () => ({
  // This ensures that the number of ticks on multiple axes are the same
  alignTicks: true,
  axisLabel: {
    color: getRealStyleValue('--syn-typography-color-text-quiet'),
    fontFamily: getRealStyleValue('--syn-font-sans'),
    fontSize: getRealStyleValue('--syn-font-size-x-small'),
    fontWeight: getRealStyleValue('--syn-font-weight-normal'),
  },
  axisLine: {
    lineStyle: {
      color: getRealStyleValue('--syn-grid-lines-color'),
    },
    show: false,
  },
  minorSplitLine: {
    lineStyle: {
    },
  },
  nameTextStyle: {
    color: getRealStyleValue('--syn-typography-color-text'),
    fontSize: getRealStyleValue('--syn-font-size-small'),
    fontWeight: getRealStyleValue('--syn-font-weight-bold'),
  },
  splitLine: {
    lineStyle: {
      color: getRealStyleValue('--syn-grid-lines-color'),
    },
    show: false,
  },
});

// Synergy ECharts Theme
export const synergyLightTheme = {
  categoryAxis: axisCommon(),
  // Default color palette for charts, is categorical by default but can be overridden by setting the palette property on the chart component or by directly setting config.color
  color: categoricalColors,
  darkMode: 'auto',
  grid: {
    bottom: 0,
    left: 0,
    // This is needed otherwise the last splitLine of the xAxis is cut off
    right: 1,
    top: 0,
  },
  logAxis: axisCommon(),
  // Global font style
  textStyle: {
    color: getRealStyleValue('--syn-typography-color-text'),
    fontFamily: getRealStyleValue('--syn-font-sans'),
    fontSize: getRealStyleValue('--syn-font-size-small'),
    fontWeight: getRealStyleValue('--syn-font-weight-normal'),
  },
  timeAxis: axisCommon(),
  valueAxis: axisCommon(),
};
