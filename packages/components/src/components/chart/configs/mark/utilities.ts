import { type ThemeMode, getRealStyleValue as style, getRealValueWithoutUnit as styleWithoutUnit } from '../../themes/utilities.js';
import { MARK_AREA } from '../constants.js';
import { colorSvgImageUri } from '../utilities.js';

/**
 * Returns the default mark line style based on Synergy design tokens.
 *
 * @param {ThemeMode} mode Theme mode
 */
export const getDefaultMarkLineStyle = (mode: ThemeMode = 'auto') => ({
  emphasis: {
    disabled: true,
  },
  label: {
    backgroundColor: style('SynChartTooltipColor', mode),
    borderColor: style('SynPanelBorderColor', mode),
    borderRadius: styleWithoutUnit('SynTooltipBorderRadius', mode),
    borderWidth: style('SynBorderWidthSmall', mode),
    color: style('SynTypographyColorText', mode),
    distance: styleWithoutUnit('SynSpacingXSmall', mode),
    fontSize: styleWithoutUnit('SynFontSizeSmall', mode),
    fontWeight: style('SynFontWeightNormal', mode),
    padding: styleWithoutUnit('SynTooltipPadding', mode),
    position: 'start',
    // Shadow for the label: --syn-shadow-large. But we need to approximate it, as ECharts does not directly support CSS variables for shadows and does not support multiple shadow layers
    shadowBlur: 8,
    shadowColor: 'rgba(13, 13, 13, 0.16)',
    shadowOffsetX: 0,
    shadowOffsetY: 3,
    show: true,
  },
  lineStyle: {
    color: style('SynChartPlotLineColor', mode),
    // Design defined a dash of 8px width and 8px gap.
    type: styleWithoutUnit('SynSpacingXSmall', mode),
    width: styleWithoutUnit('SynBorderWidthMedium', mode),
  },
  silent: true,
  symbol: 'none',
});

/**
 * Returns the default mark area style based on Synergy design tokens.
 *
 * @param {ThemeMode} mode Theme mode
 */
export const getDefaultMarkAreaStyle = (mode: ThemeMode = 'auto') => ({
  emphasis: {
    disabled: false,
  },
  itemStyle: {
    color: {
      image: colorSvgImageUri(MARK_AREA.BACKGROUND_PATTERN, style('SynChartGridLinesColor', mode), false),
      repeat: 'repeat',
    },
  },
  label: {
    color: style('SynTypographyColorText', mode),
    distance: styleWithoutUnit('SynSpacingXSmall', mode),
    fontSize: styleWithoutUnit('SynFontSizeXSmall', mode),
    fontWeight: style('SynFontWeightSemibold', mode),
    position: 'insideLeft',
  },
  silent: true,
});
