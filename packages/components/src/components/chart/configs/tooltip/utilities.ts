import { type ThemeMode, getRealStyleValue as style, getRealValueWithoutUnit as styleWithoutUnit } from '../../themes/utilities.js';

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
      color: style('SynChartPlotLineColor', mode),
      type: 'solid',
    },
  },
  backgroundColor: style('SynTooltipColor', mode),
  borderColor: style('SynPanelBorderColor', mode),
  borderWidth: styleWithoutUnit('SynBorderWidthSmall', mode),
  // Overwrite the default box-shadow of the tooltip to use the design token for shadows
  extraCssText: `box-shadow: ${style('SynShadowLarge', mode)};`,
  padding: styleWithoutUnit('SynTooltipPadding', mode),
  textStyle: {
    color: style('SynTypographyColorTextQuiet', mode),
    fontFamily: style('SynFontSans', mode),
    fontSize: styleWithoutUnit('SynFontSizeSmall', mode),
    fontWeight: style('SynFontWeightNormal', mode),
  },
  trigger: 'axis',
});
