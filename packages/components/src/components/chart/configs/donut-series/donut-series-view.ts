import { ChartView, graphic } from 'echarts/core.js';
import type GlobalModel from 'echarts/types/src/model/Global.js';
import type ExtensionAPI from 'echarts/types/src/core/ExtensionAPI.js';
import type { ZRColor } from 'echarts/types/dist/shared.js';
import type { SynergyDonutSeriesModel } from './donut-series-model.js';
import type {
  DonutSegmentLabelOptions,
  DonutSeriesConfig,
  Point,
  ResolvedDonutSeriesConfig,
  Sector,
  SegmentRange,
  SynergyDonutSeriesOption,
} from './types.js';
import { DONUT_SERIES } from '../constants.js';
import { measureTextWidth, getRealStyleValue as style, getRealValueWithoutUnit as styleWithoutUnit } from '../../themes/utilities.js';

const FULL_CIRCLE = Math.PI * 2;
const RADIAN = Math.PI / 180;

const getDefaultDonutConfig = (): ResolvedDonutSeriesConfig => ({
  backgroundColor: style('SynChartTrackColor'),
  colors: [],
  labels: [],
});

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

const createImage = ({
  image, x, y, width, height, z,
}: {
  image: string; x: number; y: number; width: number; height: number; z: number;
}): graphic.Image => new graphic.Image({
  silent: true,
  style: {
    height,
    image,
    width,
    x,
    y,
  },
  z,
});

const createText = ({
  text, x, y, fontSize, align, z,
}: {
  text: string; x: number; y: number; fontSize: number; align: 'left' | 'right'; z: number;
}): graphic.Text => new graphic.Text({
  silent: true,
  style: {
    align,
    fill: style('SynTypographyColorText'),
    fontFamily: style('SynFontSans'),
    fontSize,
    fontWeight: styleWithoutUnit('SynFontWeightNormal'),
    text,
    verticalAlign: 'middle',
    x,
    y,
  },
  z,
});

/**
 * Distributes the data values evenly around a full circle, sized proportionally to their value.
 * Returns `null` ranges for zero/negative totals, so no segments or labels are rendered.
 */
const computeSegmentRanges = (values: number[]): Array<SegmentRange | null> => {
  const total = values.reduce((sum, value) => sum + Math.max(value, 0), 0);

  if (total <= 0) {
    return values.map(() => null);
  }

  let currentAngle = DONUT_SERIES.START_ANGLE * RADIAN;

  return values.map((value) => {
    const sweep = (Math.max(value, 0) / total) * FULL_CIRCLE;
    const startAngle = currentAngle;
    const endAngle = currentAngle + sweep;
    currentAngle = endAngle;

    return { endAngle, startAngle };
  });
};

const createSegmentSectors = ({
  ranges, centerX, centerY, innerRadius, outerRadius, colors,
}: {
  ranges: Array<SegmentRange | null>;
  centerX: number;
  centerY: number;
  innerRadius: number;
  outerRadius: number;
  colors: ZRColor[];
}): graphic.Sector[] => {
  const gap = DONUT_SERIES.SEGMENT_GAP;

  return ranges.reduce<graphic.Sector[]>((sectors, range, index) => {
    if (!range) {
      return sectors;
    }

    const sweep = range.endAngle - range.startAngle;
    // Keep gaps from collapsing very small slices into a negative sweep.
    const halfGap = Math.min(gap / 2, sweep / 2);

    sectors.push(createSector({
      centerX,
      centerY,
      color: colors[index],
      endAngle: range.endAngle - halfGap,
      innerRadius,
      outerRadius,
      startAngle: range.startAngle + halfGap,
      z: 2,
    }));

    return sectors;
  }, []);
};

/**
 * Renders a label centered on a segment, outside the outer ring, with an
 * optional icon prefix. Labels on the left half of the circle are right-aligned
 * so their text ends near the ring; labels on the right half are left-aligned
 * so their text starts near the ring. The icon always precedes the text.
 */
const createSegmentLabel = ({
  label, point, onRightHalf, factor,
}: {
  label: DonutSegmentLabelOptions;
  point: Point;
  onRightHalf: boolean;
  factor: number;
}): graphic.Group => {
  const group = new graphic.Group({ silent: true });

  const fontSize = factor * styleWithoutUnit('SynFontSizeSmall');
  const iconSize = factor * styleWithoutUnit('SynFontSizeLarge');
  const iconTextGap = factor * styleWithoutUnit('SynSpacing2xSmall');
  const font = `${styleWithoutUnit('SynFontWeightNormal')} ${fontSize}px ${style('SynFontSans')}`;

  const textWidth = measureTextWidth(label.text, font);
  const iconWidth = label.icon ? iconSize + iconTextGap : 0;
  const totalWidth = iconWidth + textWidth;

  // On the right half the block starts at the anchor point, on the left half it ends there.
  const blockStartX = onRightHalf ? point.x : point.x - totalWidth;

  if (label.icon) {
    group.add(createImage({
      height: iconSize,
      image: label.icon,
      width: iconSize,
      x: blockStartX,
      y: point.y - (iconSize / 2),
      z: 15,
    }));
  }

  group.add(createText({
    align: 'left',
    fontSize,
    text: label.text,
    x: blockStartX + iconWidth,
    y: point.y,
    z: 15,
  }));

  return group;
};

const buildDonutGroup = (
  rawValues: number[],
  inputConfig: DonutSeriesConfig,
  width: number,
  height: number,
  getSegmentColor: (index: number) => ZRColor,
): graphic.Group => {
  const defaultConfig = getDefaultDonutConfig();
  const mergedConfig: ResolvedDonutSeriesConfig = {
    ...defaultConfig,
    ...inputConfig,
  };

  const shortestSide = Math.min(width, height);
  const centerX = width / 2;
  const centerY = height / 2;

  // At a height of 280px the ring thicknesses are of factor 1 and then scale linearly.
  const factor = height / DONUT_SERIES.REFERENCE_HEIGHT;

  const innerRingThickness = factor * styleWithoutUnit('SynSpacingMedium');
  // The dynamic outer segment ring is only half as thick as the static inner track ring.
  const segmentThickness = innerRingThickness / 2;
  const ringSpacing = factor * styleWithoutUnit('SynSpacingXSmall');
  const labelOffset = factor * styleWithoutUnit('SynSpacingSmall');

  const outerRingOuterRadius = shortestSide * 0.5;
  const outerRingInnerRadius = outerRingOuterRadius - segmentThickness;
  const innerRingOuterRadius = outerRingInnerRadius - ringSpacing;
  const innerRingInnerRadius = innerRingOuterRadius - innerRingThickness;

  const root = new graphic.Group();

  // Static inner track ring.
  root.add(createSector({
    centerX,
    centerY,
    color: mergedConfig.backgroundColor,
    endAngle: FULL_CIRCLE,
    innerRadius: innerRingInnerRadius,
    outerRadius: innerRingOuterRadius,
    startAngle: 0,
    z: 1,
  }));

  const segmentRanges = computeSegmentRanges(rawValues);

  // Dynamic outer data ring.
  const segmentColors: ZRColor[] = rawValues.map((_value, index) => (
    mergedConfig.colors.length > 0
      ? mergedConfig.colors[index % mergedConfig.colors.length]
      : getSegmentColor(index)
  ));

  createSegmentSectors({
    centerX,
    centerY,
    colors: segmentColors,
    innerRadius: outerRingInnerRadius,
    outerRadius: outerRingOuterRadius,
    ranges: segmentRanges,
  }).forEach((sector) => root.add(sector));

  // Segment labels, centered on each segment and placed outside the outer ring.
  segmentRanges.forEach((range, index) => {
    const label = mergedConfig.labels[index];

    if (!range || !label) {
      return;
    }

    const midAngle = (range.startAngle + range.endAngle) / 2;
    const point = polarPoint(centerX, centerY, outerRingOuterRadius + labelOffset, midAngle);
    const onRightHalf = Math.cos(midAngle) >= 0;

    root.add(createSegmentLabel({
      factor,
      label,
      onRightHalf,
      point,
    }));
  });

  return root;
};

export class SynergyDonutView extends ChartView {
  static type = DONUT_SERIES.TYPE_NAME;

  type = SynergyDonutView.type;

  // @ts-expect-error - I don't know where this typescript error comes from. Even in echarts itself it is available..
  render(seriesModel: SynergyDonutSeriesModel, ecModel: GlobalModel, api: ExtensionAPI): void {
    const { group } = this;
    group.removeAll();

    const data = seriesModel.getData();
    const rawValues: number[] = [];
    for (let index = 0; index < data.count(); index += 1) {
      rawValues.push(Number(data.get('value', index)));
    }

    const option = seriesModel.option as SynergyDonutSeriesOption;

    // Cycle through the categorical palette, one color per data segment.
    const paletteScope = {};
    const getSegmentColor = (index: number): ZRColor => seriesModel.getColorFromPalette(`synergy-donut-segment-${index}`, paletteScope);

    const donutGroup = buildDonutGroup(rawValues, option, api.getWidth(), api.getHeight(), getSegmentColor);
    group.add(donutGroup);
  }
}
