import type { LegendComponentOption } from 'echarts/types/dist/shared.js';
import type { ECConfig } from '../../types.js';
import { measureMaxTextWidth } from '../axes/utilities.js';
import { LEGEND } from '../constants.js';
import { type ThemeMode, getRealStyleValue as style, getRealValueWithoutUnit as styleWithoutUnit } from '../../themes/utilities.js';
import type { LegendOption, LegendPosition } from './types.js';
import { colorSvgDataUrl } from '../utilities.js';
import { icons } from '../../../icon/sick2025-system-icons.js';

const getVisibilityIconDataUrl = (isVisible: boolean, mode: ThemeMode = 'auto'): string => {
  const svg = isVisible ? icons.eye : icons['eye-slash'];
  const dataUrl = `data:image/svg+xml;base64,${btoa(svg)}`;
  return colorSvgDataUrl(dataUrl, style('SynTypographyColorTextQuiet', mode));
};

/**
 * Returns the default legend label text style based on Synergy design tokens.
 *
 * @param {ThemeMode} mode Theme mode
 */
const getDefaultLegendTextStyle = (mode: ThemeMode = 'auto') => ({
  color: style('SynTypographyColorTextQuiet', mode),
  fontFamily: style('SynFontSans', mode),
  fontSize: style('SynFontSizeSmall', mode),
  fontWeight: style('SynFontWeightNormal', mode),
  rich: {
    hideIcon: {
      backgroundColor: {
        image: getVisibilityIconDataUrl(false, mode),
      },
      height: styleWithoutUnit('SynSpacingMedium', mode),
      width: styleWithoutUnit('SynSpacingMedium', mode),
    },
    showIcon: {
      backgroundColor: {
        image: getVisibilityIconDataUrl(true, mode),
      },
      height: styleWithoutUnit('SynSpacingMedium', mode),
      width: styleWithoutUnit('SynSpacingMedium', mode),
    },
  },
});

/**
 * The default common legend styles based on Synergy design tokens.
 *
 * @param {ThemeMode} mode Theme mode
 */
export const getDefaultLegendStyles = (mode: ThemeMode = 'auto') => ({
  formatter: (name: string) => `${name}  {showIcon|}`,
  inactiveColor: style('SynChartDisabledColor', mode),
  itemGap: styleWithoutUnit('SynSpacingSmall', mode),
  itemHeight: styleWithoutUnit('SynSpacingSmall', mode),
  itemWidth: styleWithoutUnit('SynSpacingXLarge', mode),
  // The default legend position is top left
  left: 0,
  lineStyle: {
    inactiveColor: style('SynChartDisabledColor', mode),
  },
  textStyle: getDefaultLegendTextStyle(mode),
  // The default legend position is top left
  top: 0,
});

/**
 * Builds the default legend placement settings for a given position.
 *
 * @param {LegendPosition} position Legend position.
 * @returns Legend config fragment that places the legend for the requested position.
 */
export const getLegendConfigForPosition = (position: LegendPosition): LegendComponentOption => {
  const legendByPosition: Record<LegendPosition, LegendComponentOption> = {
    bottom: { bottom: 0 },
    left: { left: 0, orient: 'vertical' },
    right: { orient: 'vertical', right: 0 },
    top: { top: 0 },
  };

  return legendByPosition[position];
};

/**
 * Builds a compact CSS font shorthand from the legend text style config.
 * This helper resolves missing values from the Synergy defaults so legend item text widths can be calculated.
 *
 * @param {LegendComponentOption['textStyle'] | undefined} labelsStyle Legend label text style override.
 * @param {ThemeMode} mode Theme mode.
 * @returns A CSS font shorthand string suitable for `CanvasRenderingContext2D.font`.
 */
const getFontShorthand = (labelsStyle: LegendComponentOption['textStyle'] | undefined, mode: ThemeMode = 'auto'): string => {
  const defaultTextStyle = getDefaultLegendTextStyle(mode);
  const fontSizeValue = labelsStyle?.fontSize ?? defaultTextStyle.fontSize;
  const fontSize = typeof fontSizeValue === 'number' ? `${fontSizeValue}px` : String(fontSizeValue);
  const fontFamily = String(labelsStyle?.fontFamily ?? defaultTextStyle.fontFamily);
  const fontWeight = String(labelsStyle?.fontWeight ?? defaultTextStyle.fontWeight);

  return `${fontWeight} ${fontSize} ${fontFamily}`;
};

/**
 * Calculates the horizontal space required for a vertical legend.
 *
 * The width is based on the longest series name, the configured item width, and the fixed gaps
 * reserved for the item marker and the visibility icon.
 *
 * @param {LegendComponentOption} legendStyle Effective legend config used for size calculations.
 * @param {string[]} seriesNames Series names used to determine max label width.
 * @param {ThemeMode} mode Theme mode used to resolve the design tokens.
 * @returns Calculated legend width in pixels.
 */
const calculateLegendWidth = (legendStyle: LegendComponentOption, seriesNames: string[], mode: ThemeMode = 'auto'): number => {
  const fontShorthand = getFontShorthand(legendStyle?.textStyle, mode);
  const maxTextWidth = measureMaxTextWidth(seriesNames, fontShorthand);
  const defaultLegendStyle = getDefaultLegendStyles(mode);
  const itemWidth = legendStyle?.itemWidth ?? defaultLegendStyle.itemWidth;
  return maxTextWidth + itemWidth + LEGEND.ICON_TEXT_GAP + LEGEND.VISIBILITY_ICON_SPACE;
};

/**
 * Computes grid offsets required to avoid overlap between chart content and a positioned legend.
 *
 * For top/bottom legends, a fixed offset is returned.
 * For left/right legends, the offset is calculated from legend width and adjusted when a y-axis
 * exists on the same side.
 *
 * @param {LegendPosition} position Legend position.
 * @param {LegendComponentOption} legendStyle Effective legend style used for size calculations.
 * @param {ECConfig} config Current chart config used to derive series names and y-axis placement.
 * @param {ThemeMode} mode Theme mode
 * @returns Grid offset object for the requested position, or an empty object when no offset is required.
 */
export const getGridForLegendPosition = (
  position: LegendPosition,
  legendStyle: LegendComponentOption,
  config: ECConfig,
  mode: ThemeMode = 'auto',
// eslint-disable-next-line complexity
): NonNullable<ECConfig['grid']> => {
  const series = config?.series;
  if (!series) {
    return {};
  }

  // Early return for top and bottom positions, as we don't need to calculate the width for those positions

  if (position === 'top' || position === 'bottom') {
    return {
      [position]: LEGEND.GRID_OFFSET,
    };
  }

  const seriesEntries = Array.isArray(series) ? series : [series];

  const seriesNames = seriesEntries.map((entry) => (entry?.name ?? '').toString());

  // No need to calculate the width if there are no series names
  if (seriesNames.length === 0) {
    return {};
  }

  const verticalWidth = calculateLegendWidth(legendStyle, seriesNames, mode);

  // we need to add some additional spacing to left and / or right, because otherwise the legend overlaps with the chart
  // This is because we need to take into account where the y-axis is, as it affects the available space for the legend.
  const yAxis = Array.isArray(config.yAxis) ? config.yAxis : [config.yAxis];

  // If there is no position set, the default is left
  const hasLeftYAxis = yAxis.find(axis => axis?.position !== 'right');
  const hasRightYAxis = yAxis.find(axis => axis?.position === 'right');
  const axisOffset = (position === 'left' ? hasLeftYAxis : hasRightYAxis) ? LEGEND.GRID_OFFSET : 0;

  return {
    [position]: verticalWidth + axisOffset,
  };
};

/**
 * Normalizes the requested legend position and falls back to the default position for invalid values.
 *
 * @param {LegendPosition | LegendOption | undefined} positionOrOptions Position string or full legend options object.
 * @returns A valid legend position.
 */
export const normalizeLegendPosition = (
  positionOrOptions?: LegendPosition | LegendOption,
): LegendPosition => {
  const position = typeof positionOrOptions === 'string'
    ? positionOrOptions
    : positionOrOptions?.position;

  return (position === undefined || !['top', 'left', 'right', 'bottom'].includes(position))
    ? LEGEND.DEFAULT_POSITION
    : position;
};
