import type { LegendComponentOption } from 'echarts/types/dist/echarts.js';
import type { ECConfig } from '../../types.js';
import { measureMaxTextWidth } from '../axes/utilities.js';
import { getRealStyleValue, getRealValueWithoutUnit } from '../../themes/utilities.js';
import type { LegendPosition } from './types.js';
import { colorSvgDataUrl } from '../utilities.js';

const VISIBILITY_ICON = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7.99984 3C4.6665 3 1.81984 5.07333 0.666504 8C1.81984 10.9267 4.6665 13 7.99984 13C11.3332 13 14.1798 10.9267 15.3332 8C14.1798 5.07333 11.3332 3 7.99984 3ZM7.99984 11.3333C6.15984 11.3333 4.6665 9.84 4.6665 8C4.6665 6.16 6.15984 4.66667 7.99984 4.66667C9.83984 4.66667 11.3332 6.16 11.3332 8C11.3332 9.84 9.83984 11.3333 7.99984 11.3333ZM7.99984 6C6.89317 6 5.99984 6.89333 5.99984 8C5.99984 9.10667 6.89317 10 7.99984 10C9.1065 10 9.99984 9.10667 9.99984 8C9.99984 6.89333 9.1065 6 7.99984 6Z" fill="#0D0D0D"/>
</svg>
`;
const VISIBILITY_OFF_ICON = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.00326 4.33329C9.84326 4.33329 11.3366 5.82663 11.3366 7.66663C11.3366 8.09996 11.2499 8.50663 11.0966 8.88663L13.0433 10.8333C14.0499 9.99329 14.8433 8.90663 15.3299 7.66663C14.1766 4.73996 11.3299 2.66663 7.99659 2.66663C7.06326 2.66663 6.16992 2.83329 5.34326 3.13329L6.78326 4.57329C7.16326 4.41996 7.56992 4.33329 8.00326 4.33329ZM1.33659 2.51329L3.16326 4.33996C2.05659 5.19996 1.18992 6.34663 0.669922 7.66663C1.82326 10.5933 4.66992 12.6666 8.00326 12.6666C9.03659 12.6666 10.0233 12.4666 10.9233 12.1066L11.2033 12.3866L13.1566 14.3333L14.0033 13.4866L2.18326 1.66663L1.33659 2.51329ZM5.02326 6.19996L6.05659 7.23329C6.02326 7.37329 6.00326 7.51996 6.00326 7.66663C6.00326 8.77329 6.89659 9.66663 8.00326 9.66663C8.14992 9.66663 8.29659 9.64663 8.43659 9.61329L9.46992 10.6466C9.02326 10.8666 8.52992 11 8.00326 11C6.16326 11 4.66992 9.50663 4.66992 7.66663C4.66992 7.13996 4.80326 6.64663 5.02326 6.19996ZM7.89659 5.67996L9.99659 7.77996L10.0099 7.67329C10.0099 6.56663 9.11659 5.67329 8.00992 5.67329L7.89659 5.67996Z" fill="#0D0D0D"/>
</svg>
`;

const getVisibilityIconDataUrl = (isVisible: boolean): string => {
  const svg = isVisible ? VISIBILITY_ICON : VISIBILITY_OFF_ICON;
  const dataUrl = `data:image/svg+xml;base64,${btoa(svg)}`;
  return colorSvgDataUrl(dataUrl, getRealStyleValue('--syn-typography-color-text-quiet'));
};

/**
 * Returns the default legend label text style based on Synergy design tokens.
 */
const getDefaultLegendTextStyle = () => ({
  color: getRealStyleValue('--syn-typography-color-text-quiet'),
  fontFamily: getRealStyleValue('--syn-font-sans'),
  fontSize: getRealStyleValue('--syn-font-size-small'),
  fontWeight: getRealStyleValue('--syn-font-weight-normal'),
  rich: {
    hideIcon: {
      backgroundColor: {
        image: getVisibilityIconDataUrl(false),
      },
      height: getRealValueWithoutUnit('--syn-spacing-medium'),
      width: getRealValueWithoutUnit('--syn-spacing-medium'),
    },
    showIcon: {
      backgroundColor: {
        image: getVisibilityIconDataUrl(true),
      },
      height: getRealValueWithoutUnit('--syn-spacing-medium'),
      width: getRealValueWithoutUnit('--syn-spacing-medium'),
    },
  },
});

/**
 * The default common legend styles based on Synergy design tokens.
 */
export const getDefaultLegendStyles = () => ({
  formatter: (name: string) => `${name}  {showIcon|}`,
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
  // 6px additional padding between legend item and text + 20px for the visibilitiy icon width and spacing
  return maxTextWidth + itemWidth + 6 + 20;
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
