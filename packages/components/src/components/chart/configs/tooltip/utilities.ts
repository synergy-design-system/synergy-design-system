import { type ThemeMode, getRealStyleValue, getRealValueWithoutUnit } from '../../themes/utilities.js';

/**
 * The default common tooltip style based on Synergy design tokens.
 * @param {ThemeMode} mode Theme mode
 */
export const getDefaultTooltipStyle = (mode: ThemeMode = 'auto') => ({
  // The styling of the indicator line that follows the mouse when hovering over the chart
  axisPointer: {
    handle: {
      show: true,
    },
    label: {
      show: false,
    },
    lineStyle: {
      color: getRealStyleValue('SynChartPlotLineColor', mode),
      type: 'solid',
    },
  },
  backgroundColor: getRealStyleValue('SynTooltipColor', mode),
  borderColor: getRealStyleValue('SynPanelBorderColor', mode),
  borderWidth: getRealValueWithoutUnit('SynBorderWidthSmall', mode),
  // Overwrite the default box-shadow of the tooltip to use the design token for shadows
  extraCssText: `box-shadow: ${getRealStyleValue('SynShadowLarge', mode)};`,
  padding: getRealValueWithoutUnit('SynTooltipPadding', mode),
  textStyle: {
    color: getRealStyleValue('SynTypographyColorTextQuiet', mode),
    fontFamily: getRealStyleValue('SynFontSans', mode),
    fontSize: getRealValueWithoutUnit('SynFontSizeSmall', mode),
    fontWeight: getRealStyleValue('SynFontWeightNormal', mode),
  },
  trigger: 'axis',
});
