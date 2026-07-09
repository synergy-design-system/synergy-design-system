import type { LegendComponentOption } from 'echarts/types/dist/echarts.js';
import type { ECConfig } from '../../types.js';
import { measureMaxTextWidth } from '../axes/utilities.js';
import { getRealStyleValue, getRealValueWithoutUnit } from '../../themes/utilities.js';
import type { LegendPosition } from './types.js';

/**
 * Returns the default legend label text style based on Synergy design tokens.
 */
const getDefaultLegendTextStyle = () => ({
  color: getRealStyleValue('--syn-typography-color-text-quiet'),
  fontFamily: getRealStyleValue('--syn-font-sans'),
  fontSize: getRealStyleValue('--syn-font-size-small'),
  fontWeight: getRealStyleValue('--syn-font-weight-normal'),
});

/**
 * The default common legend styles based on Synergy design tokens.
 */
export const getDefaultLegendStyles = () => ({
  inactiveColor: getRealStyleValue('--syn-chart-disabled-color'),
  itemGap: getRealValueWithoutUnit('--syn-spacing-small'),
  itemHeight: getRealValueWithoutUnit('--syn-spacing-small'),
  itemWidth: getRealValueWithoutUnit('--syn-spacing-x-large'),
  // The default legend position is top left
  left: 0,
  lineStyle: {
    inactiveColor: getRealStyleValue('--syn-chart-disabled-color'),
  },
  textStyle: getDefaultLegendTextStyle(),
  // The default legend position is top left
  top: 0,
});

/**
 * Builds the default legend placement settings for a given position.
 *
 * @param {LegendPosition} position Legend position.
 * @returns Legend config fragment that places the legend for the requested position.
 */
export const getLegendConfigForPosition = (position: LegendPosition): NonNullable<ECConfig['legend']> => {
  const legendByPosition: Record<LegendPosition, NonNullable<ECConfig['legend']>> = {
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
 * @returns A CSS font shorthand string suitable for `CanvasRenderingContext2D.font`.
 */
const getFontShorthand = (labelsStyle: LegendComponentOption['textStyle'] | undefined): string => {
  const defaultTextStyle = getDefaultLegendTextStyle();
  const fontSizeValue = labelsStyle?.fontSize ?? defaultTextStyle.fontSize;
  const fontSize = typeof fontSizeValue === 'number' ? `${fontSizeValue}px` : String(fontSizeValue);
  const fontFamily = String(labelsStyle?.fontFamily ?? defaultTextStyle.fontFamily);
  const fontWeight = String(labelsStyle?.fontWeight ?? defaultTextStyle.fontWeight);

  return `${fontWeight} ${fontSize} ${fontFamily}`;
};

/**
 * Calculates the horizontal space required for a vertical legend.
 *
 * The width is based on the longest series name text width, the configured legend item width,
 * and a small fixed gap between item marker and label.
 *
 * @param {NonNullable<ECConfig['legend']>} legendStyle Legend config (single object or array; first item is used).
 * @param {string[]} seriesNames Series names used to determine max label width.
 * @returns Calculated legend width in pixels.
 */
const calculateLegendWidth = (legendStyle: NonNullable<ECConfig['legend']>, seriesNames: string[]): number => {
  const legendItem = Array.isArray(legendStyle) ? legendStyle[0] : legendStyle;
  const fontShorthand = getFontShorthand(legendItem?.textStyle);
  const maxTextWidth = measureMaxTextWidth(seriesNames, fontShorthand);
  const defaultLegendStyle = getDefaultLegendStyles();
  const itemWidth = legendItem?.itemWidth ?? defaultLegendStyle.itemWidth;
  // 6px additional padding between legend item and text
  return maxTextWidth + itemWidth + 6;
};

/**
 * Computes grid offsets required to avoid overlap between chart content and a positioned legend.
 *
 * For top/bottom legends, a fixed offset is returned.
 * For left/right legends, the offset is calculated from legend width and adjusted when a y-axis
 * exists on the same side.
 *
 * @param {LegendPosition} position Legend position.
 * @param {NonNullable<ECConfig['legend']>} legendStyle Effective legend style used for size calculations.
 * @param {ECConfig} config Current chart config used to derive series names and y-axis placement.
 * @returns Grid offset object for the requested position, or an empty object when no offset is required.
 */
export const getGridForLegendPosition = (position: LegendPosition, legendStyle: NonNullable<ECConfig['legend']>, config: ECConfig): NonNullable<ECConfig['grid']> => {
  const series = config?.series;
  if (!series) {
    return {};
  }

  // Early return for top and bottom positions, as we don't need to calculate the width for those positions
  if (position === 'top' || position === 'bottom') {
    return {
      [position]: 80,
    };
  }

  const seriesEntries = Array.isArray(series) ? series : [series];

  const seriesNames = seriesEntries.map((entry) => (entry?.name ?? '').toString());

  // No need to calculate the width if there are no series names
  if (seriesNames.length === 0) {
    return {};
  }

  const verticalWidth = calculateLegendWidth(legendStyle, seriesNames);

  // we need to add some additional spacing to left and / or right, because otherwise the legend overlaps with the chart
  // This is because we need to take into account where the y-axis is, as it affects the available space for the legend.
  const yAxis = Array.isArray(config.yAxis) ? config.yAxis : [config.yAxis];

  // If there is no position set, the default is left
  const hasLeftYAxis = yAxis.find(axis => axis?.position !== 'right');
  const hasRightYAxis = yAxis.find(axis => axis?.position === 'right');
  const axisOffset = (position === 'left' ? hasLeftYAxis : hasRightYAxis) ? 80 : 0;

  return {
    [position]: verticalWidth + axisOffset,
  };
};
