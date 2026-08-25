import { ChartView, graphic } from 'echarts/core.js';
import type GlobalModel from 'echarts/types/src/model/Global.js';
import type ExtensionAPI from 'echarts/types/src/core/ExtensionAPI.js';
import type { ZRColor } from 'echarts/types/dist/shared.js';
import type { SynergyGaugeSeriesModel } from './gauge-series-model.js';
import type {
  GaugeSeriesConfig,
  ImageInput,
  Point,
  ResolvedGaugeSeriesConfig,
  Sector,
  SynergyGaugeSeriesOption,
  TextInput,
} from './types.js';
import { GAUGE_SERIES } from '../constants.js';
import { measureTextWidth, getRealStyleValue as style, getRealValueWithoutUnit as styleWithoutUnit } from '../../themes/utilities.js';
import { colorSvgDataUrl } from '../utilities.js';

const FULL_CIRCLE = Math.PI * 2;
const RADIAN = Math.PI / 180;

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
  unit: '',
});

const clamp = (value: number, minimum: number, maximum: number): number => Math.min(Math.max(value, minimum), maximum);

const normalizeAngle = (angle: number): number => {
  const normalized = angle % FULL_CIRCLE;
  return normalized < 0 ? normalized + FULL_CIRCLE : normalized;
};

const interpolate = (start: number, end: number, progress: number): number => start + ((end - start) * progress);

const polarPoint = (centerX: number, centerY: number, radius: number, angle: number): Point => ({
  x: centerX + (Math.cos(angle) * radius),
  y: centerY + (Math.sin(angle) * radius),
});

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

const createText = ({
  text,
  x,
  y,
  fontSize,
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
      fontFamily: style('SynFontSans'),
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
  const elements: graphic.Sector[] = [];

  for (let index = 0; index < boundaries.length - 1; index += 1) {
    const sectionStart = boundaries[index];
    const sectionEnd = boundaries[index + 1];

    const sectionStartRatio = valueRange === 0 ? 0 : (sectionStart - config.min) / valueRange;
    const sectionEndRatio = valueRange === 0 ? 0 : (sectionEnd - config.min) / valueRange;

    const rawStartAngle = interpolate(startAngle, endAngle, sectionStartRatio);
    const rawEndAngle = interpolate(startAngle, endAngle, sectionEndRatio);

    const isFirst = index === 0;
    const isLast = index === boundaries.length - 2;

    const sectionStartAngle = rawStartAngle + (isFirst ? 0 : sectionGap);
    const sectionEndAngle = rawEndAngle - (isLast ? 0 : sectionGap);

    elements.push(
      createSector({
        centerX,
        centerY,
        // If there are fewer colors than segments, repeat the colors from the start
        color: colors[index % colors.length],
        endAngle: sectionEndAngle,
        innerRadius: outerRadius - sectionThickness,
        outerRadius,
        startAngle: sectionStartAngle,
        z: 1,
      }),
    );
  }

  return elements;
};

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
  const pillY = centerY - (pillHeight / 2) - (valueFontSize + (8 * factor));

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
    fontSize,
    fontWeight: styleWithoutUnit('SynFontWeightBold'),
    text: trendValue,
    x: iconSource ? contentStartX + iconSize + verticalPadding : centerX,
    y: pillY + (pillHeight / 2),
    z: 21,
  }));

  return group;
};

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

  const startAngle = GAUGE_SERIES.START_ANGLE * RADIAN;
  const endAngle = GAUGE_SERIES.END_ANGLE * RADIAN;
  const progressEndAngle = interpolate(startAngle, endAngle, progress);

  const root = new graphic.Group();

  // Outer sections
  if (mergedConfig.showSections) {
    createSections({
      centerX,
      centerY,
      config: mergedConfig,
      endAngle,
      outerRadius: sectionOuterRadius,
      sectionThickness,
      startAngle,
    }).forEach((section) => root.add(section));
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
  const unitFontSize = styleWithoutUnit('SynFontSizeMedium') * factor;
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

  // Between the value and the unit/icon we add a 12px gap, scaled by the factor.
  let nextContentY = centerY + (valueFontSize / 2) + (12 * factor);

  // Unit label
  if (config.unit) {
    root.add(createText({
      fontSize: unitFontSize,
      fontWeight: 600,
      text: config.unit,
      x: centerX,
      y: nextContentY,
    }));

    nextContentY += unitFontSize + (12 * factor);
  }

  // Icon image
  if (config.icon) {
    const iconSize = 24 * factor;

    root.add(createImage({
      height: iconSize,
      image: config.icon,
      width: iconSize,
      x: centerX - (iconSize / 2),
      y: nextContentY - (iconSize / 2),
    }));
  }

  const minimumPoint = polarPoint(centerX, centerY, gaugeRadius, startAngle);
  const maximumPoint = polarPoint(centerX, centerY, gaugeRadius, normalizeAngle(endAngle));

  const maxTextWidth = measureTextWidth(formattedMaximum, `${styleWithoutUnit('SynFontWeightBold')} ${minMaxFontSize}px ${style('SynFontSans')}`);
  const minTextWidth = measureTextWidth(formattedMinimum, `${styleWithoutUnit('SynFontWeightBold')} ${minMaxFontSize}px ${style('SynFontSans')}`);

  // Minimum label
  root.add(createText({
    align: 'center',
    fontSize: minMaxFontSize,
    text: formattedMinimum,
    x: minimumPoint.x + (minTextWidth / 2),
    y: minimumPoint.y + (12 * factor),
  }));

  // Maximum label
  root.add(createText({
    align: 'center',
    fontSize: minMaxFontSize,
    text: formattedMaximum,
    x: maximumPoint.x - (maxTextWidth / 2),
    y: maximumPoint.y + (12 * factor),
  }));

  return root;
};

export class SynergyGaugeView extends ChartView {
  static type = GAUGE_SERIES.TYPE_NAME;

  type = SynergyGaugeView.type;

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
