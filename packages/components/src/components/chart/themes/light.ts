import { PALETTE_TOKENS } from '../chart.palettes.js';
import { THEME } from '../configs/constants.js';
import { getRealStyleValue } from './utilities.js';
import { getDefaultAxisStyles } from '../configs/axes/utilities.js';
import { getDefaultLegendStyles } from '../configs/legend/utilities.js';

const getCategoricalColors = () => PALETTE_TOKENS.categorical.map((token) => getRealStyleValue(token)).filter(Boolean);

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
    color: getRealStyleValue('SynTypographyColorText'),
    fontFamily: getRealStyleValue('SynFontSans'),
    fontSize: getRealStyleValue('SynFontSizeSmall'),
    fontWeight: getRealStyleValue('SynFontWeightNormal'),
  },
  timeAxis: getDefaultAxisStyles(),
  valueAxis: getDefaultAxisStyles(),
});
