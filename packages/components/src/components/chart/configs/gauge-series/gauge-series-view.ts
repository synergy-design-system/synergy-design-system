import { ChartView, graphic } from 'echarts/core.js';
import type GlobalModel from 'echarts/types/src/model/Global.js';
import type ExtensionAPI from 'echarts/types/src/core/ExtensionAPI.js';
import type { ZRColor } from 'echarts/types/dist/shared.js';
import type { SynergyGaugeSeriesModel } from './gauge-series-model.js';
import type {
  GaugeSeriesConfig,
  ImageInput,
  ResolvedGaugeSeriesConfig,
  Sector,
  SynergyGaugeSeriesOption,
  TextInput,
} from './types.js';
import { GAUGE_SERIES } from '../constants.js';
import { measureTextWidth, getRealStyleValue as style, getRealValueWithoutUnit as styleWithoutUnit } from '../../themes/utilities.js';
import {
  clamp, colorSvgDataUrl, convertDegreeToRadian, normalizeAngle, polarPoint,
} from '../utilities.js';

/** Returns the default resolved configuration for a Synergy gauge series. */
const getDefaultGaugeConfig = (): ResolvedGaugeSeriesConfig => ({
  backgroundColor: style('SynChartTrackColor'),
  color: undefined,
  formatter: {
    max: String,
    min: String,
    value: String,
  },
  icon: '',
  max: 100,
  min: 0,
  sections: {
    boundaries: [0, 20, 60, 100],
    colors: [style('SynNamurSuccessColor'), style('SynNamurWarningColor'), style('SynNamurErrorColor')],
  },
  showSections: false,
  showTrend: false,
  trend: {
    direction: 'up',
    iconDown: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSdjdXJyZW50Q29sb3InPjxwYXRoIGQ9Ik0xMS4yNSA0LjV2MTIuMTI3bC01LjY5Ni01LjY5Nkw0LjUgMTJsNy41IDcuNSA3LjUtNy41LTEuMDU0LTEuMDctNS42OTYgNS42OTdWNC41eiIvPjwvc3ZnPg==',
    iconUp: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSdjdXJyZW50Q29sb3InPjxwYXRoIGQ9Ik0xMS4yNSAxOS41VjcuMzczbC01LjY5NiA1LjY5Nkw0LjUgMTIgMTIgNC41bDcuNSA3LjUtMS4wNTQgMS4wNy01LjY5Ni01LjY5N1YxOS41eiIvPjwvc3ZnPg==',
    value: '',
  },
});

/** Linearly interpolates between `start` and `end` by the normalized `progress` factor (0–1). */
const interpolate = (start: number, end: number, progress: number): number => start + ((end - start) * progress);

/** Creates an ECharts `Sector` graphic element from the given sector descriptor. */
const createSector = ({
  centerX, centerY, innerRadius, outerRadius, startAngle, endAngle, color, z,
}: Sector): graphic.Sector => new graphic.Sector({
  shape: {
    clockwise: true,
    cx: centerX,
    cy: centerY,
    endAngle,
    r: outerRadius,
    r0: innerRadius,
    startAngle,
  },
  silent: true,
  style: {
    fill: color,
  },
  z,
});

/** Creates an ECharts `Text` graphic element styled with the current design-token values. */
const createText = ({
  text,
  x,
  y,
  fontSize,
  fontFamily = style('SynFontSans'),
  fontWeight = styleWithoutUnit('SynFontWeightNormal'),
  align = 'center',
  verticalAlign = 'middle',
  z = 10,
}: TextInput): graphic.Text => (
  new graphic.Text({
    silent: true,
    style: {
      align,
      fill: style('SynTypographyColorText'),
      fontFamily,
      fontSize,
      fontWeight: fontWeight as number,
      text,
      verticalAlign,
      x,
      y,
    },
    z,
  })
);

/** Creates an ECharts `Image` graphic element positioned at the given coordinates. */
const createImage = ({
  image, x, y, width, height, z = 10,
}: ImageInput): graphic.Image => (
  new graphic.Image({
    silent: true,
    style: {
      height,
      image,
      width,
      x,
      y,
    },
    z,
  })
);

/**
 * Normalizes and validates a raw boundaries array, clamping every entry to `[minimum, maximum]`
 * and ensuring both endpoints are present. Falls back to `[minimum, maximum]` when the input is
 * absent or has fewer than two entries.
 */
const getSectionBoundaries = (boundaries: number[] | undefined, minimum: number, maximum: number): number[] => {
  if (!boundaries || boundaries.length < 2) {
    return [minimum, maximum];
  }

  const normalized = boundaries
    .filter(Number.isFinite)
    .map((boundary) => clamp(boundary, minimum, maximum))
    .sort((first, second) => first - second);

  const unique = [...new Set(normalized)];

  if (unique[0] !== minimum) {
    unique.unshift(minimum);
  }

  if (unique[unique.length - 1] !== maximum) {
    unique.push(maximum);
  }

  return unique;
};

/**
 * Resolves the fill color for the progress arc. When sections are visible and no explicit
 * `color` override is set, the color of the section that contains `value` is returned.
 * Otherwise falls back to `config.color`.
 */
const getAutoProgressColor = (
  config: ResolvedGaugeSeriesConfig,
  value: number,
): ZRColor | undefined => {
  if (!config.showSections || config.color !== undefined) {
    return config.color;
  }

  const boundaries = getSectionBoundaries(config.sections.boundaries, config.min, config.max);
  const { colors } = config.sections;

  if (boundaries.length < 2 || colors.length === 0) {
    return config.color;
  }

  for (let index = 0; index < boundaries.length - 1; index += 1) {
    const rangeStart = boundaries[index];
    const rangeEnd = boundaries[index + 1];
    const isLastRange = index === boundaries.length - 2;

    if (value >= rangeStart && (value < rangeEnd || (isLastRange && value <= rangeEnd))) {
      return colors[index % colors.length];
    }
  }

  return config.color;
};

/**
 * Builds the outer colored-section ring as an array of `Sector` elements. Each segment
 * receives a small gap on its shared boundary with adjacent segments.
 */
const createSections = ({
  config, centerX, centerY, startAngle, endAngle, outerRadius, sectionThickness,
}: {
  config: ResolvedGaugeSeriesConfig;
  centerX: number;
  centerY: number;
  startAngle: number;
  endAngle: number;
  outerRadius: number;
  sectionThickness: number;
}): graphic.Sector[] => {
  const sectionGap = GAUGE_SERIES.SECTIONS_GAP;
  const boundaries = getSectionBoundaries(config.sections.boundaries, config.min, config.max);
  const { colors } = config.sections;

  const valueRange = config.max - config.min;
  return boundaries.slice(0, -1).map<graphic.Sector>((sectionStart, index) => {
    const sectionEnd = boundaries[index + 1];

    const sectionStartRatio = valueRange === 0 ? 0 : (sectionStart - config.min) / valueRange;
    const sectionEndRatio = valueRange === 0 ? 0 : (sectionEnd - config.min) / valueRange;

    const rawStartAngle = interpolate(startAngle, endAngle, sectionStartRatio);
    const rawEndAngle = interpolate(startAngle, endAngle, sectionEndRatio);

    const isFirst = index === 0;
    const isLast = index === boundaries.length - 2;

    const sectionStartAngle = rawStartAngle + (isFirst ? 0 : sectionGap);
    const sectionEndAngle = rawEndAngle - (isLast ? 0 : sectionGap);

    return createSector({
      centerX,
      centerY,
      // If there are fewer colors than segments, repeat the colors from the start
      color: colors[index % colors.length],
      endAngle: sectionEndAngle,
      innerRadius: outerRadius - sectionThickness,
      outerRadius,
      startAngle: sectionStartAngle,
      z: 1,
    });
  });
};

/**
 * Builds the trend-indicator pill that appears above the value label. The pill contains a
 * directional icon (up/down) and the formatted trend value string.
 */
const createTrendElement = ({
  config,
  centerX,
  centerY,
  valueFontSize,
  factor,
}: {
  config: ResolvedGaugeSeriesConfig;
  centerX: number;
  centerY: number;
  valueFontSize: number;
  factor: number;
}): graphic.Group => {
  const trendValue = config.trend.value;
  const iconSource = config.trend.direction === 'up' ? config.trend.iconUp : config.trend.iconDown;
  const fontSize = styleWithoutUnit('SynFontSizeMedium') * factor;
  const iconSize = styleWithoutUnit('SynFontSizeXLarge') * factor;
  const trendValueFont = `${styleWithoutUnit('SynFontWeightBold')} ${fontSize}px ${style('SynFontSans')}`;
  const valueWidth = measureTextWidth(String(trendValue), trendValueFont);

  const verticalPadding = styleWithoutUnit('SynSpacing2xSmall') * factor;
  const horizontalPadding = styleWithoutUnit('SynSpacingXSmall') * factor;
  const pillHeight = iconSize + (verticalPadding * 2);
  const pillWidth = (horizontalPadding * 2) + iconSize + verticalPadding + valueWidth;

  const pillX = centerX - (pillWidth / 2);
  const pillY = centerY - (pillHeight / 2) - (valueFontSize + horizontalPadding);

  const contentStartX = pillX + horizontalPadding;
  const iconY = pillY + ((pillHeight - iconSize) / 2);

  const group = new graphic.Group({
    silent: true,
  });

  group.add(new graphic.Rect({
    shape: {
      height: pillHeight,
      r: pillHeight / 2,
      width: pillWidth,
      x: pillX,
      y: pillY,
    },
    silent: true,
    style: {
      fill: style('SynChartTrackColor'),
    },
    z: 20,
  }));

  if (iconSource) {
    const coloredIcon = colorSvgDataUrl(iconSource, style('SynTypographyColorText'));
    group.add(createImage({
      height: iconSize,
      image: coloredIcon,
      width: iconSize,
      x: contentStartX,
      y: iconY,
      z: 21,
    }));
  }

  group.add(createText({
    align: iconSource ? 'left' : 'center',
    // This is a work around as our SICK Intl font is visually  not aligned with the icon, as it's font baseline is not centered.
    fontFamily: 'sans-serif',
    fontSize,
    fontWeight: styleWithoutUnit('SynFontWeightSemibold'),
    text: trendValue,
    x: iconSource ? contentStartX + iconSize + verticalPadding : centerX,
    y: pillY + (pillHeight / 2),
    z: 21,
  }));

  return group;
};

/**
 * Assembles the complete gauge visualization as an ECharts `Group`. This includes the
 * background arc, progress arc, optional section ring, value labels, min/max labels,
 * optional icon, and optional trend indicator.
 *
 * @param rawValue   - The raw data value to display.
 * @param inputConfig - User-supplied gauge series configuration.
 * @param width       - Available render width in pixels.
 * @param height      - Available render height in pixels.
 * @param paletteColor - Fallback color taken from the ECharts color palette.
 */
const buildGaugeGroup = (
  rawValue: number,
  inputConfig: GaugeSeriesConfig,
  width: number,
  height: number,
  paletteColor: ZRColor,
  // eslint-disable-next-line complexity
): graphic.Group => {
  const config = inputConfig;
  const defaultConfig = getDefaultGaugeConfig();
  const mergedConfig: ResolvedGaugeSeriesConfig = {
    ...defaultConfig,
    ...config,
    formatter: {
      ...defaultConfig.formatter,
      ...config.formatter,
    },
    sections: {
      ...defaultConfig.sections,
      ...config.sections,
    },
    trend: {
      ...defaultConfig.trend,
      ...config.trend,
    },
  };

  // Switch min and max if they are reversed, to ensure the gauge renders correctly.
  const normalizedMin = Math.min(mergedConfig.min, mergedConfig.max);
  const normalizedMax = Math.max(mergedConfig.min, mergedConfig.max);
  mergedConfig.min = normalizedMin;
  mergedConfig.max = normalizedMax;

  const shortestSide = Math.min(width, height);
  const centerX = width / 2;
  const centerY = height / 2;

  // At an height of 280px the font sizes are of factor 1 and then scale linearly
  const factor = height / GAUGE_SERIES.REFERENCE_HEIGHT;

  const progressThickness = factor * styleWithoutUnit('SynSpacingMedium');
  const sectionThickness = factor * styleWithoutUnit('SynSpacingXSmall');
  const sectionSpacing = factor * styleWithoutUnit('SynSpacingXSmall');
  // We need to reserve the space for the outer sections ring, which is drawn outside of the main gauge radius.
  const reservedOuterSpace = mergedConfig.showSections ? sectionThickness + sectionSpacing : 0;
  const gaugeRadius = (shortestSide * 0.5) - reservedOuterSpace;
  const sectionOuterRadius = shortestSide * 0.5;

  const normalizedValue = clamp(rawValue, mergedConfig.min, mergedConfig.max);
  const progressColor = getAutoProgressColor(mergedConfig, normalizedValue);

  const valueRange = mergedConfig.max - mergedConfig.min;
  const progress = valueRange === 0 ? 0 : (normalizedValue - mergedConfig.min) / valueRange;

  const startAngle = convertDegreeToRadian(GAUGE_SERIES.START_ANGLE);
  const endAngle = convertDegreeToRadian(GAUGE_SERIES.END_ANGLE);
  const progressEndAngle = interpolate(startAngle, endAngle, progress);

  const root = new graphic.Group();

  // Outer sections
  if (mergedConfig.showSections) {
    const sections = createSections({
      centerX,
      centerY,
      config: mergedConfig,
      endAngle,
      outerRadius: sectionOuterRadius,
      sectionThickness,
      startAngle,
    });
    sections.forEach((section) => root.add(section));
  }

  // Background arc
  root.add(createSector({
    centerX,
    centerY,
    color: mergedConfig.backgroundColor,
    endAngle,
    innerRadius: gaugeRadius - progressThickness,
    outerRadius: gaugeRadius,
    startAngle,
    z: 2,
  }));

  // Progress arc
  if (progress > 0) {
    root.add(createSector({
      centerX,
      centerY,
      // Use palette color if no color is provided in the config.
      color: progressColor ?? paletteColor,
      endAngle: progressEndAngle,
      innerRadius: gaugeRadius - progressThickness,
      outerRadius: gaugeRadius,
      startAngle,
      z: 3,
    }));
  }

  const valueFontSize = factor * styleWithoutUnit('SynFontSize3xLarge');
  const minMaxFontSize = styleWithoutUnit('SynFontSizeSmall') * factor;

  // Trend indicator
  if (config.showTrend) {
    root.add(createTrendElement({
      centerX,
      centerY,
      config: mergedConfig,
      factor,
      valueFontSize,
    }));
  }

  const formattedValue = config.formatter?.value?.(normalizedValue) ?? String(normalizedValue);
  const formattedMinimum = config.formatter?.min?.(mergedConfig.min) ?? String(mergedConfig.min);
  const formattedMaximum = config.formatter?.max?.(mergedConfig.max) ?? String(mergedConfig.max);

  // Value label
  root.add(createText({
    fontSize: valueFontSize,
    fontWeight: 400,
    text: formattedValue,
    x: centerX,
    y: centerY,
  }));

  // Icon image
  if (config.icon) {
    const iconSize = styleWithoutUnit('SynFontSize2xLarge') * factor;
    // Between the value and the icon we add a gap, scaled by the factor.
    const iconGap = styleWithoutUnit('SynSpacingXSmall') * factor;
    const iconY = centerY + (valueFontSize / 2) + iconGap;
    const coloredIcon = colorSvgDataUrl(config.icon, style('SynTypographyColorText'));
    root.add(createImage({
      height: iconSize,
      image: coloredIcon,
      width: iconSize,
      x: centerX - (iconSize / 2),
      y: iconY,
    }));
  }

  const minimumPoint = polarPoint(centerX, centerY, gaugeRadius, startAngle);
  const maximumPoint = polarPoint(centerX, centerY, gaugeRadius, normalizeAngle(endAngle));

  const maxTextWidth = measureTextWidth(formattedMaximum, `${styleWithoutUnit('SynFontWeightBold')} ${minMaxFontSize}px ${style('SynFontSans')}`);
  const minTextWidth = measureTextWidth(formattedMinimum, `${styleWithoutUnit('SynFontWeightBold')} ${minMaxFontSize}px ${style('SynFontSans')}`);
  const contentGap = (styleWithoutUnit('SynSpacingSmall') * factor);

  // Minimum label
  root.add(createText({
    align: 'center',
    fontSize: minMaxFontSize,
    text: formattedMinimum,
    x: minimumPoint.x + (minTextWidth / 2),
    y: minimumPoint.y + contentGap,
  }));

  // Maximum label
  root.add(createText({
    align: 'center',
    fontSize: minMaxFontSize,
    text: formattedMaximum,
    x: maximumPoint.x - (maxTextWidth / 2),
    y: maximumPoint.y + contentGap,
  }));

  return root;
};

export class SynergyGaugeView extends ChartView {
  static type = GAUGE_SERIES.TYPE_NAME;

  type = SynergyGaugeView.type;

  /**
   * ECharts render lifecycle hook. Clears the previous frame and redraws the gauge
   * based on the current series model data and options.
   */
  // @ts-expect-error - I don't know where this typescript error comes from. Even in echarts itself it is available..
  render(seriesModel: SynergyGaugeSeriesModel, ecModel: GlobalModel, api: ExtensionAPI): void {
    const { group } = this;
    group.removeAll();

    const data = seriesModel.getData();
    const rawValue = Number(data.get('value', 0));
    const option = seriesModel.option as SynergyGaugeSeriesOption;

    const firstPaletteColor = seriesModel.getColorFromPalette('first-color', {});
    const gaugeGroup = buildGaugeGroup(rawValue, option, api.getWidth(), api.getHeight(), firstPaletteColor);
    group.add(gaugeGroup);
  }
}
