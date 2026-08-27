import { ChartView, graphic } from 'echarts/core.js';
import type GlobalModel from 'echarts/types/src/model/Global.js';
import type ExtensionAPI from 'echarts/types/src/core/ExtensionAPI.js';
import type { ZRColor } from 'echarts/types/dist/shared.js';
import type { SynergySegmentChartSeriesModel } from './segment-chart-series-model.js';
import type {
  Point,
  ResolvedSegmentChartSeriesConfig,
  Sector,
  SegmentChartSeriesConfig,
  SegmentRange,
  SynergySegmentChartSeriesOption,
} from './types.js';
import { SEGMENT_CHART_SERIES } from '../constants.js';
import { getRealStyleValue as style, getRealValueWithoutUnit as styleWithoutUnit } from '../../themes/utilities.js';

const FULL_CIRCLE = Math.PI * 2;
const RADIAN = Math.PI / 180;

const getDefaultSegmentChartConfig = (): ResolvedSegmentChartSeriesConfig => ({
  backgroundColor: style('SynChartTrackColor'),
  gap: SEGMENT_CHART_SERIES.GAP_DEFAULT,
  gapOrientation: 0,
  icon: '',
  mainLabel: '',
  max: SEGMENT_CHART_SERIES.MAX_DEFAULT,
  min: SEGMENT_CHART_SERIES.MIN_DEFAULT,
  segmentBackgroundColors: [],
  segmentColors: [],
  segmentLabelColors: [],
  segmentLabels: [],
  segmentOutlineColor: [],
  weights: [],
});

const clamp = (value: number, minimum: number, maximum: number): number => Math.min(Math.max(value, minimum), maximum);

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

/**
 * A point shifted tangentially (perpendicular to the radial direction) by a constant pixel
 * distance from the ideal (un-shifted) angle, together with the angle at which it sits on
 * its own radius. Coordinates are relative to the shape's center.
 */
type ShiftedPoint = Point & { angle: number };

/**
 * Computes the point on a circle of the given radius that lies on a line parallel to,
 * and offset by a constant pixel distance from, the radial line at `angle`. Used to build
 * segment edges with a constant pixel-width gap, regardless of radius.
 */
const getShiftedPoint = (radius: number, angle: number, tangentialOffset: number): ShiftedPoint => {
  const safeOffset = clamp(tangentialOffset, -(radius - 0.5), radius - 0.5);
  const radialOffset = Math.sqrt(Math.max((radius * radius) - (safeOffset * safeOffset), 0));

  return {
    angle: angle + Math.asin(safeOffset / radius),
    x: (radialOffset * Math.cos(angle)) - (safeOffset * Math.sin(angle)),
    y: (radialOffset * Math.sin(angle)) + (safeOffset * Math.cos(angle)),
  };
};

type WedgeStyle = {
  fill?: ZRColor;
  lineWidth?: number;
  stroke?: string;
};

export type SegmentWedgeShape = {
  centerX: number;
  centerY: number;
  innerRadius: number;
  outerRadius: number;
  startAngle: number;
  endAngle: number;
  halfGap: number;
};

/** Number of straight segments used to approximate one radian of an arc as a polygon. */
const ARC_STEPS_PER_RADIAN = 20;

/** Samples points along a circular arc, used to approximate it as a straight-edged polygon. */
const buildArcPoints = (
  centerX: number,
  centerY: number,
  radius: number,
  fromAngle: number,
  toAngle: number,
): number[][] => {
  const steps = Math.max(1, Math.ceil(Math.abs(toAngle - fromAngle) * ARC_STEPS_PER_RADIAN));

  return Array.from({ length: steps + 1 }, (_unused, index) => {
    const angle = fromAngle + (((toAngle - fromAngle) * index) / steps);
    return [centerX + (radius * Math.cos(angle)), centerY + (radius * Math.sin(angle))];
  });
};

/**
 * Builds an annular wedge (a segment's radial band) whose two side edges are straight lines
 * offset by a constant pixel distance (`halfGap` on each side) from the ideal angle, rather
 * than pure radial cuts. This keeps the visual gap between adjacent segments the same width
 * at every radius, instead of widening farther from the center. The inner/outer arcs are
 * approximated as densely-sampled polygon points, since only straight-edged shapes (like
 * `graphic.Polygon`) are part of the typed `graphic` namespace re-exported from `echarts/core.js`.
 */
const createSegmentWedge = ({
  shape, wedgeStyle, z,
}: {
  shape: SegmentWedgeShape;
  wedgeStyle: WedgeStyle;
  z: number;
}): graphic.Polygon => {
  const {
    centerX, centerY, innerRadius, outerRadius, startAngle, endAngle, halfGap,
  } = shape;

  const startInner = getShiftedPoint(innerRadius, startAngle, halfGap);
  const startOuter = getShiftedPoint(outerRadius, startAngle, halfGap);
  const endOuter = getShiftedPoint(outerRadius, endAngle, -halfGap);
  const endInner = getShiftedPoint(innerRadius, endAngle, -halfGap);

  const points = [
    [centerX + startInner.x, centerY + startInner.y],
    ...buildArcPoints(centerX, centerY, outerRadius, startOuter.angle, endOuter.angle),
    ...buildArcPoints(centerX, centerY, innerRadius, endInner.angle, startInner.angle),
  ];

  return new graphic.Polygon({
    shape: { points },
    silent: true,
    style: {
      fill: wedgeStyle.fill ?? 'none',
      lineWidth: wedgeStyle.lineWidth ?? 0,
      stroke: wedgeStyle.stroke ?? 'none',
    },
    z,
  });
};

const createText = ({
  text, x, y, fontSize, align, verticalAlign, color, fontWeight, z,
}: {
  text: string;
  x: number;
  y: number;
  fontSize: number;
  align: 'left' | 'center' | 'right';
  verticalAlign: 'top' | 'middle' | 'bottom';
  color: string;
  fontWeight?: number;
  z: number;
}): graphic.Text => new graphic.Text({
  silent: true,
  style: {
    align,
    fill: color,
    fontFamily: style('SynFontSans'),
    fontSize,
    fontWeight: fontWeight ?? styleWithoutUnit('SynFontWeightNormal'),
    text,
    verticalAlign,
    x,
    y,
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

/**
 * Resolves the angular start and available angle for the segments, based on the gap
 * fraction and orientation. The gap is centered at the bottom of the circle by default.
 */
export const computeGapRange = (gap: number, gapOrientation: number): { startAngle: number; availableAngle: number } => {
  const clampedGap = clamp(gap, 0, 1);
  const gapAngle = clampedGap * FULL_CIRCLE;
  const availableAngle = FULL_CIRCLE - gapAngle;
  const gapCenterAngle = (SEGMENT_CHART_SERIES.GAP_CENTER_ANGLE + gapOrientation) * RADIAN;

  return {
    availableAngle,
    startAngle: gapCenterAngle + (gapAngle / 2),
  };
};

/**
 * Distributes the resolved weights across the available angle, proportionally to each weight.
 * Returns `null` ranges when no angle is available, so no segments or labels are rendered.
 */
export const computeSegmentRanges = (
  weights: number[],
  startAngle: number,
  availableAngle: number,
): Array<SegmentRange | null> => {
  const total = weights.reduce((sum, weight) => sum + Math.max(weight, 0), 0);

  if (total <= 0 || availableAngle <= 0) {
    return weights.map(() => null);
  }

  let currentAngle = startAngle;

  return weights.map((weight) => {
    const sweep = (Math.max(weight, 0) / total) * availableAngle;
    const rangeStartAngle = currentAngle;
    const rangeEndAngle = currentAngle + sweep;
    currentAngle = rangeEndAngle;

    return { endAngle: rangeEndAngle, startAngle: rangeStartAngle };
  });
};

/** Pairs `data` with `weights` by index, defaulting missing weights to an equal share. */
export const resolveWeights = (data: number[], weights: number[]): number[] => data.map(
  (_value, index) => weights[index] ?? SEGMENT_CHART_SERIES.DEFAULT_WEIGHT,
);

/**
 * Clamps the half-gap so it never consumes more than the segment's own arc length at its
 * inner radius (the most constrained point), preventing self-intersecting wedges for very
 * thin or many segments.
 */
export const getSafeHalfGap = (halfGap: number, sweep: number, innerRadius: number): number => {
  if (sweep <= 0 || innerRadius <= 0) {
    return 0;
  }

  const maxHalfGap = (sweep * innerRadius) / 2;
  return Math.min(halfGap, Math.max(maxHalfGap - 0.5, 0));
};

/**
 * Renders a label centered on a segment, outside its outer radius. Labels on the left half of
 * the circle are right-aligned so their text ends near the ring; labels on the right half are
 * left-aligned so their text starts near the ring.
 */
const createSegmentLabel = ({
  text, color, point, onRightHalf, fontSize,
}: {
  text: string;
  color: string;
  point: Point;
  onRightHalf: boolean;
  fontSize: number;
}): graphic.Text => createText({
  align: onRightHalf ? 'left' : 'right',
  color,
  fontSize,
  text,
  verticalAlign: 'middle',
  x: point.x,
  y: point.y,
  z: 15,
});

const buildSegmentChartGroup = (
  rawValues: number[],
  inputConfig: SegmentChartSeriesConfig,
  width: number,
  height: number,
  getSegmentColor: (index: number) => ZRColor,
): graphic.Group => {
  const defaultConfig = getDefaultSegmentChartConfig();
  const mergedConfig: ResolvedSegmentChartSeriesConfig = {
    ...defaultConfig,
    ...inputConfig,
  };

  const shortestSide = Math.min(width, height);
  const centerX = width / 2;
  const centerY = height / 2;

  // At a height of 280px the layout is of factor 1 and then scales linearly.
  const factor = height / SEGMENT_CHART_SERIES.REFERENCE_HEIGHT;

  // Reserve room for the outer labels (offset + text height), so labels near the top or
  // bottom of the circle aren't clipped by the container edges, which sit right at the
  // circle's radius on the shorter side of the (16:9) chart container.
  const labelOffset = factor * styleWithoutUnit('SynSpacingSmall');
  const labelFontSize = factor * styleWithoutUnit('SynFontSizeSmall');
  const reservedLabelSpace = labelOffset + labelFontSize;

  const outerRadius = (shortestSide * 0.5) - reservedLabelSpace;
  // 20% smaller than the previous 0.35 proportion.
  const centerCircleRadius = outerRadius * 0.35 * 0.8;
  // Half of the previous spacing between the center circle and the segments.
  const ringSpacing = (factor * styleWithoutUnit('SynSpacingXSmall')) / 2;

  const segmentInnerRadius = centerCircleRadius + ringSpacing;
  const segmentOuterRadius = outerRadius;

  const root = new graphic.Group();

  // Static center circle.
  root.add(createSector({
    centerX,
    centerY,
    color: mergedConfig.backgroundColor,
    endAngle: FULL_CIRCLE,
    innerRadius: 0,
    outerRadius: centerCircleRadius,
    startAngle: 0,
    z: 1,
  }));

  // Optional icon inside the center circle.
  if (mergedConfig.icon) {
    const iconSize = centerCircleRadius;

    root.add(createImage({
      height: iconSize,
      image: mergedConfig.icon,
      width: iconSize,
      x: centerX - (iconSize / 2),
      y: centerY - (iconSize / 2),
      z: 2,
    }));
  }

  const { startAngle, availableAngle } = computeGapRange(mergedConfig.gap, mergedConfig.gapOrientation);
  const weights = resolveWeights(rawValues, mergedConfig.weights);
  const segmentRanges = computeSegmentRanges(weights, startAngle, availableAngle);

  const valueRange = mergedConfig.max - mergedConfig.min;
  const halfGap = (factor * SEGMENT_CHART_SERIES.SEGMENT_GAP_PX) / 2;

  segmentRanges.forEach((range, index) => {
    if (!range) {
      return;
    }

    const segmentHalfGap = getSafeHalfGap(halfGap, range.endAngle - range.startAngle, segmentInnerRadius);

    const backgroundColor = mergedConfig.segmentBackgroundColors[index] ?? style('SynChartTrackColor');
    const fillColor = mergedConfig.segmentColors[index] ?? getSegmentColor(index);
    const outlineColor = mergedConfig.segmentOutlineColor[index];

    // Unfilled background, spanning the full radial band.
    root.add(createSegmentWedge({
      shape: {
        centerX,
        centerY,
        endAngle: range.endAngle,
        halfGap: segmentHalfGap,
        innerRadius: segmentInnerRadius,
        outerRadius: segmentOuterRadius,
        startAngle: range.startAngle,
      },
      wedgeStyle: { fill: backgroundColor },
      z: 3,
    }));

    // Filled portion, growing from the inner radius outward based on the segment's value.
    const fillRatio = valueRange === 0 ? 0 : clamp((rawValues[index] - mergedConfig.min) / valueRange, 0, 1);

    if (fillRatio > 0) {
      const filledOuterRadius = segmentInnerRadius + (fillRatio * (segmentOuterRadius - segmentInnerRadius));

      root.add(createSegmentWedge({
        shape: {
          centerX,
          centerY,
          endAngle: range.endAngle,
          halfGap: segmentHalfGap,
          innerRadius: segmentInnerRadius,
          outerRadius: filledOuterRadius,
          startAngle: range.startAngle,
        },
        wedgeStyle: { fill: fillColor },
        z: 4,
      }));
    }

    if (outlineColor) {
      root.add(createSegmentWedge({
        shape: {
          centerX,
          centerY,
          endAngle: range.endAngle,
          halfGap: segmentHalfGap,
          innerRadius: segmentInnerRadius,
          outerRadius: segmentOuterRadius,
          startAngle: range.startAngle,
        },
        wedgeStyle: { lineWidth: 1, stroke: outlineColor },
        z: 5,
      }));
    }

    // Segment label, centered on the segment and placed outside the outer radius.
    const labelText = mergedConfig.segmentLabels[index] ?? String(rawValues[index]);
    const labelColor = mergedConfig.segmentLabelColors[index] ?? style('SynTypographyColorText');
    const midAngle = (range.startAngle + range.endAngle) / 2;
    const labelPoint = polarPoint(centerX, centerY, segmentOuterRadius + labelOffset, midAngle);
    const onRightHalf = Math.cos(midAngle) >= 0;

    root.add(createSegmentLabel({
      color: labelColor,
      fontSize: factor * styleWithoutUnit('SynFontSizeSmall'),
      onRightHalf,
      point: labelPoint,
      text: labelText,
    }));
  });

  // Main label, centered in the gap.
  if (mergedConfig.mainLabel) {
    const gapCenterAngle = (SEGMENT_CHART_SERIES.GAP_CENTER_ANGLE + mergedConfig.gapOrientation) * RADIAN;
    const mainLabelPoint = polarPoint(centerX, centerY, centerCircleRadius + labelOffset, gapCenterAngle);

    root.add(createText({
      align: 'center',
      color: style('SynTypographyColorText'),
      fontSize: factor * styleWithoutUnit('SynFontSizeMedium'),
      fontWeight: styleWithoutUnit('SynFontWeightBold'),
      text: mergedConfig.mainLabel,
      verticalAlign: 'middle',
      x: mainLabelPoint.x,
      y: mainLabelPoint.y,
      z: 15,
    }));
  }

  return root;
};

export class SynergySegmentChartView extends ChartView {
  static type = SEGMENT_CHART_SERIES.TYPE_NAME;

  type = SynergySegmentChartView.type;

  // @ts-expect-error - I don't know where this typescript error comes from. Even in echarts itself it is available..
  render(seriesModel: SynergySegmentChartSeriesModel, ecModel: GlobalModel, api: ExtensionAPI): void {
    const { group } = this;
    group.removeAll();

    const data = seriesModel.getData();
    const rawValues: number[] = [];
    for (let index = 0; index < data.count(); index += 1) {
      rawValues.push(Number(data.get('value', index)));
    }

    const option = seriesModel.option as SynergySegmentChartSeriesOption;

    // Cycle through the categorical palette, one color per data segment.
    const paletteScope = {};
    const getSegmentColor = (index: number): ZRColor => seriesModel.getColorFromPalette(`synergy-segment-chart-segment-${index}`, paletteScope);

    const segmentChartGroup = buildSegmentChartGroup(rawValues, option, api.getWidth(), api.getHeight(), getSegmentColor);
    group.add(segmentChartGroup);
  }
}
