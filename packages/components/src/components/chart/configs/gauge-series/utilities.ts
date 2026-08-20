import type { PieSeriesOption } from 'echarts/types/dist/shared.js';
import { measureTextWidth, getRealStyleValue as style, getRealValueWithoutUnit as styleWithoutUnit } from '../../themes/utilities.js';
import { GAUGE_SERIES } from '../constants.js';
import { colorSvgDataUrl, mergeDeep } from '../utilities.js';
import type { ECConfig } from '../../types.js';
import type {
  GaugeSeriesPresetOptions, GraphicComponentImageOption, GraphicComponentTextOption, PieDataItem, ResolvedGaugeSeriesPresetOptions,
} from './types.js';

const DEFAULT_SECTION_COLORS = [
  style('SynNamurSuccessColor'),
  style('SynNamurWarningColor'),
  style('SynNamurErrorColor'),
];

const DEFAULT_SERIES_GAUGE_OPTIONS = {
  formatter: {
    max: String,
    min: String,
    value: String,
  },
  max: GAUGE_SERIES.MAX_VALUE,
  min: GAUGE_SERIES.MIN_VALUE,
  overrides: {},
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
  const resolvedColors = colors.length > 0 ? colors : DEFAULT_SECTION_COLORS;
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
const createSectionsPieData = (
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
  data: createSectionsPieData(sections, min, max),
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
 * Resolves the gauge value.
 * If no explicit value is given, it defaults to the midpoint between min and max.
 *
 * @param value Optional explicitly configured gauge value.
 * @param min Gauge minimum.
 * @param max Gauge maximum.
 * @returns Resolved gauge value, defaulting to the midpoint between {@link min} and {@link max}.
 */
const getValue = (
  value: number | undefined,
  min: number,
  max: number,
): number => value ?? (min + max) / 2;

/**
 * Creates a text-based graphic element with shared typography defaults.
 *
 * @param options Basic text element settings like position, size and content.
 * @param overrides Optional ECharts graphic overrides for this text element.
 * @returns A merged text graphic element option.
 */
const createTextGraphicElement = (
  options: {
    fontSize: number;
    fontWeight?: number;
    left?: string;
    right?: string;
    text: string;
    top: number | string;
  },
  overrides: Partial<GraphicComponentTextOption> | undefined,
): GraphicComponentTextOption => {
  const sharedFontStyles = {
    fill: style('SynTypographyColorText'),
    fontFamily: style('SynFontSans'),
    fontWeight: options.fontWeight ?? styleWithoutUnit('SynFontWeightBold'),
  };
  return mergeDeep({
    ...(options.left ? { left: options.left } : {}),
    ...(options.right ? { right: options.right } : {}),
    style: {
      ...sharedFontStyles,
      fontSize: options.fontSize,
      text: options.text,
    },
    top: options.top,
    type: 'text',
  }, overrides ?? {}) as GraphicComponentTextOption;
};

/**
 * Creates an image-based graphic element.
 *
 * @param options Basic image element settings like position, dimensions and source.
 * @param overrides Optional ECharts graphic overrides for this image element.
 * @returns A merged image graphic element option.
 */
const createImageGraphicElement = (
  options: {
    height: number;
    image: string;
    left?: string;
    top: number | string;
    width: number;
  },
  overrides: Partial<GraphicComponentImageOption> | undefined,
): GraphicComponentImageOption => mergeDeep({
  left: options.left,
  style: {
    height: options.height,
    image: options.image,
    width: options.width,
  },
  top: options.top,
  type: 'image',
}, overrides ?? {}) as GraphicComponentImageOption;

/**
 * Creates the trend indicator group shown above the center value.
 * The group contains a pill background, trend icon and trend value label.
 *
 * @param options Fully resolved gauge options containing trend data.
 * @param trendIconSize Icon size.
 * @param trendValueFontSize Font size for the trend label.
 * @param trendVerticalPadding Vertical inner spacing of the trend pill.
 * @returns A grouped graphic element containing all trend indicator parts.
 */
const createTrendGraphicElement = (
  options: ResolvedGaugeSeriesPresetOptions,
  trendIconSize: number,
  trendValueFontSize: number,
  trendVerticalPadding: number,
) => {
  const trendIcon = options.trend.direction === 'down' ? options.trend.iconDown : options.trend.iconUp;
  const trendValueFont = `${style('SynFontWeightBold')} ${trendValueFontSize}px ${style('SynFontSans')}`;
  const valueWidth = measureTextWidth(String(options.trend.value), trendValueFont);
  const trendHorizontalPadding = styleWithoutUnit('SynSpacingXSmall');
  const trendPillHeight = trendIconSize + (trendVerticalPadding * 2);
  const trendPillWidth = (trendHorizontalPadding * 2) + trendIconSize + trendVerticalPadding + valueWidth;

  return {
    children: [
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
      {
        style: {
          height: trendIconSize,
          image: colorSvgDataUrl(trendIcon, style('SynTypographyColorText')),
          width: trendIconSize,
        },
        type: 'image',
        x: trendHorizontalPadding,
        y: trendVerticalPadding,
      },
      {
        style: {
          fill: style('SynTypographyColorText'),
          font: trendValueFont,
          text: options.trend.value,
        },
        type: 'text',
        x: trendIconSize + trendHorizontalPadding + trendVerticalPadding,
        /**
         * ZRender measures text from the baseline rather than the visual center.
         * This small correction of 2px aligns the trend value label visually within its pill.
         */
        y: (trendPillHeight - trendValueFontSize) / 2 + 2,
      },
    ],
    left: 'center',
    top: GAUGE_SERIES.TREND_TOP,
    type: 'group',
  };
};

/**
 * Creates the graphic elements for labels and optional trend indicator.
 * The content is scaled according to the provided breakpoint.
 *
 * @param options Options controlling the gauge graphic layout and content.
 * @returns Graphic element descriptors for the gauge labels and icons.
 */
const createGraphicElement = (options: ResolvedGaugeSeriesPresetOptions, breakpoint: number): ECConfig['graphic'] => {
  // Scale factor based on the breakpoint. The "normal" styles are applied between 260 and 330
  const factor = breakpoint / GAUGE_SERIES.BREAKPOINT_DEFAULT;
  const iconSize = styleWithoutUnit('SynFontSize2xLarge') * factor; // 24
  const minMaxFontSize = styleWithoutUnit('SynFontSizeSmall') * factor; // 14
  const trendIconSize = styleWithoutUnit('SynFontSizeXLarge') * factor; // 24
  const trendValueFontSize = styleWithoutUnit('SynFontSizeMedium') * factor; // 16
  const trendVerticalPadding = styleWithoutUnit('SynSpacing2xSmall') * factor; // 4
  const unitFontSize = styleWithoutUnit('SynFontSizeMedium') * factor;
  const valueFontSize = styleWithoutUnit('SynFontSize3xLarge') * factor; // 40

  const valueLabelElement = createTextGraphicElement({
    fontSize: valueFontSize,
    fontWeight: styleWithoutUnit('SynFontWeightLight'),
    left: 'center',
    text: options.formatter.value(options.value),
    top: GAUGE_SERIES.LABEL_VALUE_TOP,
  }, options.overrides.valueText);

  const minLabelElement = createTextGraphicElement({
    fontSize: minMaxFontSize,
    left: GAUGE_SERIES.LABEL_MIN_MAX_HORIZONTAL,
    text: options.formatter.min(options.min),
    top: GAUGE_SERIES.LABEL_MIN_MAX_TOP,
  }, options.overrides.minText);

  const maxLabelElement = createTextGraphicElement({
    fontSize: minMaxFontSize,
    right: GAUGE_SERIES.LABEL_MIN_MAX_HORIZONTAL,
    text: options.formatter.max(options.max),
    top: GAUGE_SERIES.LABEL_MIN_MAX_TOP,
  }, options.overrides.maxText);

  const graphicElements: ECConfig['graphic'] = [
    valueLabelElement,
    minLabelElement,
    maxLabelElement,
  ];

  if (options.unit !== '') {
    graphicElements.push(createTextGraphicElement({
      fontSize: unitFontSize,
      left: 'center',
      text: options.unit,
      top: GAUGE_SERIES.LABEL_UNIT_TOP,
    }, options.overrides.unitText));
  }
  if (options.icon !== undefined && options.icon !== '') {
    graphicElements.push(createImageGraphicElement({
      height: iconSize,
      image: colorSvgDataUrl(options.icon, style('SynTypographyColorText')),
      left: 'center',
      top: (options.unit !== '' ? GAUGE_SERIES.LABEL_ICON_TOP_WITH_UNIT : GAUGE_SERIES.LABEL_ICON_TOP_WITHOUT_UNIT),
      width: iconSize,
    }, options.overrides.iconImage as Partial<GraphicComponentImageOption> | undefined));
  }

  if (options.showTrend) {
    graphicElements.push(createTrendGraphicElement(
      options,
      trendIconSize,
      trendValueFontSize,
      trendVerticalPadding,
    ));
  }

  return graphicElements;
};

/**
 * Builds responsive media graphics variants for gauge labels.
 * Breakpoints are applied from smallest to largest so that each successive
 * `minHeight` rule overrides the previous one via ECharts media cascade,
 * ensuring the largest matching breakpoint always wins.
 *
 * @param opts Options forwarded to {@link createGraphicElement} for every breakpoint.
 * @returns Media query entries with breakpoint-specific graphic options.
 */
const createMediaGraphics = (
  options: ResolvedGaugeSeriesPresetOptions,
): ECConfig['media'] => GAUGE_SERIES.BREAKPOINTS.map((breakpoint) => ({
  option: { graphic: createGraphicElement(options, breakpoint) },
  query: { minHeight: breakpoint },
}));

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
  media: ECConfig['media'];
  progress: PieSeriesOption;
  sections: PieSeriesOption;
} => {
  const resolvedOptions: ResolvedGaugeSeriesPresetOptions = {
    ...DEFAULT_SERIES_GAUGE_OPTIONS,
    ...options,
    formatter: {
      ...DEFAULT_SERIES_GAUGE_OPTIONS.formatter,
      ...options.formatter,
    },
    overrides: {
      ...DEFAULT_SERIES_GAUGE_OPTIONS.overrides,
      ...options.overrides,
    },
    sections: {
      ...DEFAULT_SERIES_GAUGE_OPTIONS.sections,
      ...options.sections,
    },
    trend: {
      ...DEFAULT_SERIES_GAUGE_OPTIONS.trend,
      ...options.trend,
    },
    value: getValue(options.value, options.min ?? DEFAULT_SERIES_GAUGE_OPTIONS.min, options.max ?? DEFAULT_SERIES_GAUGE_OPTIONS.max),
  };

  const resolvedSections = buildSectionsFromBoundariesAndColors(resolvedOptions.sections.boundaries, resolvedOptions.sections.colors);

  // Clamp to a valid value in the range [min, max] to avoid rendering issues with the pie series
  const clampedValue = clamp(resolvedOptions.value, resolvedOptions.min, resolvedOptions.max);
  // Exchange the value with the clamped value
  resolvedOptions.value = clampedValue;

  const resolvedProgressColor = getProgressColor(
    resolvedOptions.progressColor,
    resolvedSections,
    resolvedOptions.value,
    resolvedOptions.showSections,
  );

  const resolvedSectionSeries = createSectionsPieSeries(resolvedOptions.min, resolvedOptions.max, resolvedSections);
  const progressSeries = createProgressPieSeries(resolvedOptions.min, resolvedOptions.max, resolvedOptions.value, resolvedProgressColor);

  const graphic = createGraphicElement(resolvedOptions, GAUGE_SERIES.BREAKPOINT_DEFAULT);
  const media = createMediaGraphics(resolvedOptions);

  return {
    graphic,
    media,
    progress: mergeDeep(progressSeries, resolvedOptions.overrides.gaugeSeries ?? {}) as PieSeriesOption,
    sections: mergeDeep(resolvedSectionSeries, resolvedOptions.overrides.sectionsSeries ?? {}) as PieSeriesOption,
  };
};
