import type { PieSeriesOption } from 'echarts/types/dist/shared.js';
import type { MediaUnit } from 'echarts/types/src/util/types.js';
import {
  measureTextWidth,
  getRealStyleValue as style,
  getRealValueWithoutUnit as styleWithoutUnit,
} from '../../themes/utilities.js';
import { GAUGE_SERIES } from '../constants.js';
import { colorSvgDataUrl, mergeDeep } from '../utilities.js';
import type { ECConfig } from '../../types.js';
import type {
  GaugeSeriesPresetOptions,
  PieDataItem,
  ResolvedGaugeSeriesPresetOptions,
} from './types.js';

const DEFAULT_SECTION_COLORS = [
  style('SynNamurSuccessColor'),
  style('SynNamurWarningColor'),
  style('SynNamurErrorColor'),
];

const DEFAULT_SERIES_GAUGE_OPTIONS = {
  max: GAUGE_SERIES.MAX_VALUE,
  min: GAUGE_SERIES.MIN_VALUE,
  sections: {
    boundaries: GAUGE_SERIES.SECTIONS_BOUNDARIES,
    colors: DEFAULT_SECTION_COLORS,
  },
  showSections: false,
  showTrend: false,
  trend: {
    direction: 'up' as const,
    iconDown: GAUGE_SERIES.TREND_ICON_DOWN,
    iconUp: GAUGE_SERIES.TREND_ICON_UP,
    value: 'XX,XX',
  },
  unit: '',
};

const SHARED_PIE_SERIES_OPTION: PieSeriesOption = {
  endAngle: GAUGE_SERIES.END_ANGLE,
  label: { show: false },
  labelLine: { show: false },
  silent: true,
  startAngle: GAUGE_SERIES.START_ANGLE,
  type: 'pie',
};

/**
 * Restricts a numeric value to the inclusive interval between {@link min} and {@link max}.
 *
 * @param value The value to clamp.
 * @param min The lower boundary of the interval.
 * @param max The upper boundary of the interval.
 * @returns The clamped value.
 */
const clamp = (value: number, min: number, max: number): number => Math.min(max, Math.max(min, value));

/**
 * Resolves the section color for a segment index.
 * If no colors are provided, the default section colors are used.
 * If fewer colors than segments are provided, colors are repeated cyclically.
 *
 * @param colors Configured section colors.
 * @param segmentIndex Zero-based segment index.
 * @returns The color for the requested segment.
 */
const getColorForSection = (colors: readonly string[], segmentIndex: number): string => {
  let resolvedColors = [...colors];
  if (resolvedColors.length === 0) {
    resolvedColors = [...DEFAULT_SECTION_COLORS];
  }
  // If there are fewer colors than segments, repeat the colors from the start
  const colorIndex = segmentIndex % resolvedColors.length;
  return resolvedColors[colorIndex];
};

/**
 * Creates a pie slice data item.
 *
 * @param value Numeric slice value.
 * @param color Slice fill color.
 * @returns A pie data item consumable by ECharts.
 */
const createPieSlice = (value: number, color: string | undefined): PieDataItem => ({
  itemStyle: { color },
  value,
});

/**
 * Builds normalized section descriptors from section boundaries and colors.
 * Boundaries are sorted ascending before section construction.
 *
 * @param boundaries Section boundaries where each adjacent pair describes one section.
 * @param colors Colors used for sections.
 * @returns Section descriptors with start, end and resolved color.
 */
const buildSectionsFromBoundariesAndColors = (
  boundaries: number[],
  colors: string[],
): Array<{ color: string; end: number; start: number }> => {
  if (boundaries.length < 2) {
    return [];
  }
  const sortedBoundaries = [...boundaries].sort((left, right) => left - right);
  // TODO: Should we sort out out-of-range boundaries and clamp it to min / max value?
  return sortedBoundaries
    // remove the last index since it is the end of the last section
    .slice(0, -1)
    .map((start, index) => ({
      color: getColorForSection(colors, index),
      end: sortedBoundaries[index + 1],
      start,
    }));
};

/**
 * Converts normalized section descriptors into pie chart slices.
 * A transparent gap slice is inserted between neighboring sections.
 *
 * @param sections Normalized sections with start/end/value color mapping.
 * @param min Gauge minimum.
 * @param max Gauge maximum.
 * @returns Pie slices for the section series including transparent gap slices.
 */
const buildSectionsPieData = (
  sections: Array<{ color: string; end: number; start: number }>,
  min: number,
  max: number,
): PieDataItem[] => {
  const totalRange = max - min;
  const gapSize = GAUGE_SERIES.SECTIONS_GAP_RATIO * totalRange;
  const result: PieDataItem[] = [];

  for (let i = 0; i < sections.length; i += 1) {
    const section = sections[i];
    const isLast = i === sections.length - 1;

    // Shrink the section by the gap on its trailing edge (except for the last)
    const effectiveSize = isLast
      ? section.end - section.start
      : section.end - section.start - gapSize;

    result.push(createPieSlice(effectiveSize, section.color));

    // Transparent slice after every section except the last
    if (!isLast) {
      result.push(createPieSlice(gapSize, 'transparent'));
    }
  }

  return result;
};

/**
 * Resolves the section color for a concrete value.
 *
 * @param sections Section descriptors.
 * @param value Gauge value.
 * @returns Matching section color if a section contains the value.
 */
const getSectionColorForValue = (
  sections: Array<{ color: string; end: number; start: number }>,
  value: number,
): string | undefined => {
  const match = sections.find((section, index) => {
    const isLastSection = index === sections.length - 1;
    return isLastSection
      ? value >= section.start && value <= section.end
      : value >= section.start && value < section.end;
  });

  return match?.color;
};

/**
 * Resolves the color used for the progress arc.
 * If sections are shown and no explicit progress color is set,
 * the color is derived from the section that contains the value.
 *
 * @param explicitColor Optional explicit progress color.
 * @param sections Section descriptors.
 * @param value Gauge value.
 * @param showSections Whether section rendering is enabled.
 * @returns The resolved progress color.
 */
const getProgressColor = (
  explicitColor: string | undefined,
  sections: Array<{ color: string; end: number; start: number }>,
  value: number,
  showSections: boolean,
): string | undefined => {
  if (showSections && explicitColor === undefined) {
    return getSectionColorForValue(sections, value);
  }
  return explicitColor;
};

/**
 * Creates the pie series for the gauge sections.
 *
 * @param min Gauge minimum.
 * @param max Gauge maximum.
 * @param sections Section descriptors.
 * @returns Pie series option for section rendering.
 */
const createSectionsPieSeries = (
  min: number,
  max: number,
  sections: Array<{ color: string; end: number; start: number }>,
): PieSeriesOption => ({
  ...SHARED_PIE_SERIES_OPTION,
  data: buildSectionsPieData(sections, min, max),
  radius: [GAUGE_SERIES.SECTIONS_INNER_RADIUS, GAUGE_SERIES.SECTIONS_OUTER_RADIUS],
});

/**
 * Creates the pie series for the gauge progress arc and remaining track.
 *
 * @param min Gauge minimum.
 * @param max Gauge maximum.
 * @param value Clamped gauge value.
 * @param progressColor Resolved color of the progress arc.
 * @returns Pie series option for progress rendering.
 */
const createProgressPieSeries = (
  min: number,
  max: number,
  value: number,
  progressColor: string | undefined,
): PieSeriesOption => ({
  ...SHARED_PIE_SERIES_OPTION,
  data: [
    createPieSlice(value - min, progressColor),
    createPieSlice(max - value, style('SynProgressTrackColor')),
  ],
  radius: [GAUGE_SERIES.GAUGE_INNER_RADIUS, GAUGE_SERIES.GAUGE_OUTER_RADIUS],
});

/**
 * Resolves the gauge value from options.
 * If no value is given, it defaults to the midpoint between min and max.
 *
 * @param options Gauge preset options.
 * @returns Resolved gauge value.
 */
const getValue = (options: GaugeSeriesPresetOptions): number => {
  if (options.value !== undefined) {
    return options.value;
  }
  const min = options.min ?? DEFAULT_SERIES_GAUGE_OPTIONS.min;
  const max = options.max ?? DEFAULT_SERIES_GAUGE_OPTIONS.max;
  return (min + max) / 2;
};

/**
 * Creates the graphic elements for labels and optional trend indicator.
 * The content is scaled according to the provided breakpoint.
 *
 * @param value Current gauge value.
 * @param min Gauge minimum.
 * @param max Gauge maximum.
 * @param unit Unit label shown below the value.
 * @param showTrend Whether to render the trend pill.
 * @param trendLabelValue Trend label text.
 * @param trendIconDataUrl Data URL of the trend icon.
 * @param breakpoint Breakpoint used to scale typography and spacing.
 * @param icon Optional SVG data URL rendered below the unit, or below the value when no unit is set.
 * @returns ZRender graphic element descriptors for the gauge center labels.
 */
const createGraphicElement = (
  value: number,
  min: number,
  max: number,
  unit: string,
  showTrend: boolean,
  trendLabelValue: string,
  trendIconDataUrl: string,
  breakpoint: number,
  icon?: string,
) => {
  // Scale factor based on the breakpoint. The "normal" styles are applied between 260 and 330
  const factor = breakpoint / GAUGE_SERIES.BREAKPOINT_DEFAULT;
  const iconSize = styleWithoutUnit('SynFontSize2xLarge') * factor; // 24
  const minMaxFontSize = styleWithoutUnit('SynFontSizeSmall') * factor; // 14
  const trendIconSize = styleWithoutUnit('SynFontSizeXLarge') * factor; // 24
  const trendValueFontSize = styleWithoutUnit('SynFontSizeMedium') * factor; // 16
  const trendVerticalPadding = styleWithoutUnit('SynSpacing2xSmall') * factor; // 4
  const unitFontSize = styleWithoutUnit('SynFontSizeMedium') * factor;
  const valueFontSize = styleWithoutUnit('SynFontSize3xLarge') * factor; // 40

  const sharedFontStyles = {
    fill: style('SynTypographyColorText'),
    fontFamily: style('SynFontSans'),
    fontWeight: styleWithoutUnit('SynFontWeightBold'),
  };

  return [
    // Main value
    {
      left: 'center',
      style: {
        ...sharedFontStyles,
        fontSize: valueFontSize,
        fontWeight: styleWithoutUnit('SynFontWeightLight'),
        text: String(value),
      },
      top: GAUGE_SERIES.LABEL_VALUE_TOP,
      type: 'text',
    },
    // Unit label (omitted when empty)
    ...(unit !== ''
      ? [
        {
          left: 'center',
          style: {
            ...sharedFontStyles,
            fontSize: unitFontSize,
            text: unit,
          },
          top: GAUGE_SERIES.LABEL_UNIT_TOP,
          type: 'text',
        },
      ]
      : []),
    // Center icon (optional, shown below unit or below value when no unit is set)
    ...(icon !== undefined
      ? [
        {
          left: 'center',
          style: {
            height: iconSize,
            image: colorSvgDataUrl(icon, style('SynTypographyColorText')),
            width: iconSize,
          },
          top: (unit !== '' ? GAUGE_SERIES.LABEL_ICON_TOP_WITH_UNIT : GAUGE_SERIES.LABEL_ICON_TOP_WITHOUT_UNIT),
          type: 'image',
        },
      ]
      : []),
    // Min label
    {
      left: GAUGE_SERIES.LABEL_MIN_MAX_HORIZONTAL,
      style: {
        ...sharedFontStyles,
        fontSize: minMaxFontSize,
        text: String(min),
      },
      top: GAUGE_SERIES.LABEL_MIN_MAX_TOP,
      type: 'text',
    },
    // Max label
    {
      right: GAUGE_SERIES.LABEL_MIN_MAX_HORIZONTAL,
      style: {
        ...sharedFontStyles,
        fontSize: minMaxFontSize,
        text: String(max),
      },
      top: GAUGE_SERIES.LABEL_MIN_MAX_TOP,
      type: 'text',
    },
    ...(showTrend
      ? (() => {
        const trendValueFont = `${style('SynFontWeightBold')} ${trendValueFontSize}px ${style('SynFontSans')}`;
        const valueWidth = measureTextWidth(String(trendLabelValue), trendValueFont);
        const trendHorizontalPadding = styleWithoutUnit('SynSpacingXSmall');
        // The gap between the trend icon and the trend value label and the spacing on top and bottom of the content
        const trendPillHeight = trendIconSize + (trendVerticalPadding * 2);
        const trendPillWidth = (trendHorizontalPadding * 2) + trendIconSize + trendVerticalPadding + valueWidth;
        return [{
          children: [
            // Shared pill background for icon + value
            {
              shape: {
                height: trendPillHeight,
                r: styleWithoutUnit('SynBorderRadiusPill'),
                width: trendPillWidth,
                x: 0,
                y: 0,
              },
              style: {
                fill: style('SynChartTrackColor'),
              },
              type: 'rect',
              x: 0,
              y: 0,
            },
            // Trend icon
            {
              style: {
                height: trendIconSize,
                image: colorSvgDataUrl(trendIconDataUrl, style('SynTypographyColorText')),
                width: trendIconSize,
              },
              type: 'image',
              x: trendHorizontalPadding,
              y: trendVerticalPadding,
            },
            // Trend value label inside shared pill
            {
              style: {
                fill: style('SynTypographyColorText'),
                font: trendValueFont,
                text: trendLabelValue,
              },
              type: 'text',
              x: trendIconSize + trendHorizontalPadding + trendVerticalPadding,
              // not sure why we need +2 here. It seems like zrender does not center the text vertically
              y: (trendPillHeight - trendValueFontSize) / 2 + 2,
            },
          ],
          left: 'center',
          top: GAUGE_SERIES.TREND_TOP,
          type: 'group',
        }];
      })()
      : []),
  ];
};

/**
 * Builds responsive media graphics variants for gauge labels.
 *
 * @param value Current gauge value.
 * @param min Gauge minimum.
 * @param max Gauge maximum.
 * @param unit Unit label shown below the value.
 * @param showTrend Whether to render the trend pill.
 * @param trendLabelValue Trend label text.
 * @param trendIconDataUrl Data URL of the trend icon.
 * @param icon Optional SVG data URL rendered below the unit or value.
 * @returns Media query entries with breakpoint-specific graphic options.
 */
const createMediaGraphics = (
  value: number,
  min: number,
  max: number,
  unit: string,
  showTrend: boolean,
  trendLabelValue: string,
  trendIconDataUrl: string,
  icon?: string,
) => GAUGE_SERIES.BREAKPOINTS.map((breakpoint, index) => {
  let query;

  if (index === 0) {
    query = {
      minHeight: breakpoint,
    };
  } else {
    query = {
      maxHeight: breakpoint,
    };
  }

  return {
    option: {
      graphic: createGraphicElement(value, min, max, unit, showTrend, trendLabelValue, trendIconDataUrl, breakpoint, icon),
    },
    query,
  };
});

/**
 * Builds all pie-based gauge series artifacts (sections, progress and center graphics)
 * for the provided preset options.
 *
 * @param options Gauge series preset options.
 * @returns A configuration fragment containing graphic elements, responsive media options,
 * progress pie series and sections pie series.
 */
export const buildPieSeries = (
  options: GaugeSeriesPresetOptions,
): {
  graphic: ECConfig['graphic'];
  media: MediaUnit[];
  progress: PieSeriesOption;
  sections: PieSeriesOption;
} => {
  const {
    gaugeSeries, icon, min, max, progressColor, sections, sectionsSeries, showSections, showTrend, trend, unit, value,
  }: ResolvedGaugeSeriesPresetOptions = {
    ...DEFAULT_SERIES_GAUGE_OPTIONS,
    ...options,
    sections: {
      ...DEFAULT_SERIES_GAUGE_OPTIONS.sections,
      ...options.sections,
    },
    trend: {
      ...DEFAULT_SERIES_GAUGE_OPTIONS.trend,
      ...options.trend,
    },
    value: getValue(options),
  };

  const resolvedSections = buildSectionsFromBoundariesAndColors(sections.boundaries, sections.colors);

  // Clamp to a valid value in the range [min, max] to avoid rendering issues with the pie series
  const clampedValue = clamp(value, min, max);
  const resolvedProgressColor = getProgressColor(progressColor, resolvedSections, clampedValue, showSections);

  const trendIconDataUrl = trend.direction === 'down'
    ? trend.iconDown
    : trend.iconUp;

  const resolvedSectionSeries = createSectionsPieSeries(min, max, resolvedSections);
  const progressSeries = createProgressPieSeries(min, max, clampedValue, resolvedProgressColor);
  const graphic = createGraphicElement(
    clampedValue,
    min,
    max,
    unit,
    showTrend,
    trend.value,
    trendIconDataUrl,
    GAUGE_SERIES.BREAKPOINT_DEFAULT,
    icon,
  );
  const media = createMediaGraphics(clampedValue, min, max, unit, showTrend, trend.value, trendIconDataUrl, icon);

  return {
    graphic,
    media,
    progress: mergeDeep(progressSeries, gaugeSeries ?? {}) as PieSeriesOption,
    sections: mergeDeep(resolvedSectionSeries, sectionsSeries ?? {}) as PieSeriesOption,
  };
};
