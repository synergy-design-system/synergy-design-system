import { ChartView, graphic } from 'echarts/core.js';
import type { SeriesData } from 'echarts/types/dist/shared.js';
import type { SynergySegmentSeriesModel } from './segment-model.js';
import type {
  ResolvedSegmentChartSeriesConfig,
  SegmentDataItem,
  SegmentWedgeShape,
  WedgeStyle,
} from './types.js';
import { DEGREE_TO_RADIAN, FULL_CIRCLE_RADIAN, SEGMENT_SERIES } from '../../constants.js';
import {
  clamp,
  colorSvgDataUrl,
  createImageGraphic,
  createSectorGraphic,
  createTextGraphic,
  getShiftedPoint,
  polarPoint,
  resolveCircularLayout,
  resolveText,
} from '../../utilities.js';
import { getRealStyleValue as style, getRealValueWithoutUnit as styleWithoutUnit } from '../../../themes/utilities.js';
import type {
  ExtensionAPI, GlobalModel, SegmentRange,
} from '../../types.js';

/** Samples points along a circular arc, used to approximate it as a straight-edged polygon. */
const buildArcPoints = (
  centerX: number,
  centerY: number,
  radius: number,
  fromAngle: number,
  toAngle: number,
): number[][] => {
  const steps = Math.max(1, Math.ceil(Math.abs(toAngle - fromAngle) * SEGMENT_SERIES.ARC_STEPS_PER_RADIAN));

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
  shape, style: wedgeStyle, z,
}: {
  shape: SegmentWedgeShape;
  style: WedgeStyle;
  z: number;
}): graphic.Polygon => {
  const {
    centerX, centerY, innerRadius, outerRadius, startAngle, endAngle, halfGap,
  } = shape;

  const lineWidth = wedgeStyle.lineWidth ?? 0;
  // Calculate the inset if there is a border, to remove it from the polygon area
  const halfBorderWidth = lineWidth / 2;
  const insetInnerRadius = innerRadius + halfBorderWidth;
  const insetOuterRadius = Math.max(insetInnerRadius, outerRadius - halfBorderWidth);
  const insetHalfGap = halfGap + halfBorderWidth;

  const startInner = getShiftedPoint(insetInnerRadius, startAngle, insetHalfGap);
  const startOuter = getShiftedPoint(insetOuterRadius, startAngle, insetHalfGap);

  const endOuter = getShiftedPoint(insetOuterRadius, endAngle, -insetHalfGap);
  const endInner = getShiftedPoint(insetInnerRadius, endAngle, -insetHalfGap);
  const points = [
    [centerX + startInner.x, centerY + startInner.y],
    ...buildArcPoints(centerX, centerY, insetOuterRadius, startOuter.angle, endOuter.angle),
    ...buildArcPoints(centerX, centerY, insetInnerRadius, endInner.angle, startInner.angle),
  ];

  return new graphic.Polygon({
    shape: { points },
    silent: true,
    style: {
      fill: wedgeStyle.fill ?? 'none',
      lineWidth,
      stroke: wedgeStyle.stroke ?? 'none',
    },
    z,
  });
};

/**
 * Resolves the angular start and available angle for the segments, based on the gap
 * fraction and orientation. The gap is centered at the bottom of the circle by default.
 */
const computeGapRange = (gap: number, gapOrientation: number): { startAngle: number; availableAngle: number } => {
  const clampedGap = clamp(gap, 0, 1);
  const gapAngle = clampedGap * FULL_CIRCLE_RADIAN;
  const availableAngle = FULL_CIRCLE_RADIAN - gapAngle;
  const gapCenterAngle = (SEGMENT_SERIES.GAP_CENTER_ANGLE + gapOrientation) * DEGREE_TO_RADIAN;

  return {
    availableAngle,
    startAngle: gapCenterAngle + (gapAngle / 2),
  };
};

/**
 * Distributes the resolved weights across the available angle, proportionally to each weight.
 * Returns `null` ranges when no angle is available, so no segments or labels are rendered.
 */
const computeSegmentRanges = (
  weights: number[],
  startAngle: number,
  availableAngle: number,
): Array<SegmentRange | null> => {
  const total = weights.reduce((sum, weight) => sum + Math.max(weight, 0), 0);

  if (total <= 0 || availableAngle <= 0) {
    // TODO: TEst out this use case. What happens
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

/**
 * Clamps the half-gap so it never consumes more than the segment's own arc length at its
 * inner radius (the most constrained point), preventing self-intersecting wedges for very
 * thin or many segments.
 */
const getSafeHalfGap = (halfGap: number, sweep: number, innerRadius: number): number => {
  if (sweep <= 0 || innerRadius <= 0) {
    return 0;
  }

  const maxHalfGap = (sweep * innerRadius) / 2;
  return Math.min(halfGap, Math.max(maxHalfGap - 0.5, 0));
};

const resolveSegmentLabel = (dataItem: SegmentDataItem | number, value: number): string | undefined => {
  if (typeof dataItem !== 'object') {
    return String(value);
  }

  return Object.hasOwn(dataItem, 'label') ? resolveText(dataItem.label, value) : String(value);
};

/** Pairs `data` with `weights` by index, defaulting missing weights to an equal share. */
const resolveWeights = (data: SeriesData<SynergySegmentSeriesModel>): number[] => {
  const weights: number[] = [];
  data.each((idx) => {
    const itemModel = data.getItemModel<SegmentDataItem>(idx);
    weights.push(Number(itemModel.get('weight')) || SEGMENT_SERIES.DEFAULT_WEIGHT);
  });
  return weights;
};

const getFillRatio = (value: number, min: number, max: number): number => {
  const valueRange = max - min;
  return valueRange === 0 ? 0 : clamp((value - min) / valueRange, 0, 1);
};

const createSegments = (
  data: SeriesData<SynergySegmentSeriesModel>,
  config: ResolvedSegmentChartSeriesConfig,
  segmentRanges: Array<SegmentRange | null>,
  centerX: number,
  centerY: number,
  segmentInnerRadius: number,
  segmentOuterRadius: number,
  halfGap: number,
  labelOffset: number,
  factor: number,
) => {
  const segments: Array<graphic.Polygon | graphic.Text> = [];
  segmentRanges.forEach((range, index) => {
    if (!range || !(segmentOuterRadius > segmentInnerRadius)) {
      return;
    }
    const segmentHalfGap = getSafeHalfGap(halfGap, range.endAngle - range.startAngle, segmentInnerRadius);
    const segmentItemModel = data.getItemModel<SegmentDataItem>(index);

    const backgroundStyle = segmentItemModel.getModel('backgroundStyle').getItemStyle();

    const backgroundColor = backgroundStyle.fill ?? style('SynChartTrackColor');
    const backgroundBorderColor = backgroundStyle.stroke ?? style('SynChartTrackColor');
    const backgroundBorderWidth = backgroundStyle.lineWidth ?? 0;

    // Unfilled background, spanning the full radial band.
    segments.push(createSegmentWedge({
      shape: {
        centerX,
        centerY,
        endAngle: range.endAngle,
        halfGap: segmentHalfGap,
        innerRadius: segmentInnerRadius,
        outerRadius: segmentOuterRadius,
        startAngle: range.startAngle,
      },
      style: {
        fill: backgroundColor,
        lineWidth: backgroundBorderWidth,
        stroke: backgroundBorderColor,
      },
      z: 3,
    }));

    // Filled portion, growing from the inner radius outward based on the segment's value.
    const rawValue = Number(data.get('value', index));
    const value = Number.isNaN(rawValue) ? 0 : rawValue;
    const fillRatio = getFillRatio(value, config.min, config.max);
    if (fillRatio > 0) {
      const filledOuterRadius = segmentInnerRadius + (fillRatio * (segmentOuterRadius - segmentInnerRadius));
      const itemStyle = data.getItemVisual(index, 'style');
      segments.push(createSegmentWedge({
        shape: {
          centerX,
          centerY,
          endAngle: range.endAngle,
          halfGap: segmentHalfGap,
          innerRadius: segmentInnerRadius,
          outerRadius: filledOuterRadius,
          startAngle: range.startAngle,
        },
        style: {
          fill: itemStyle.fill,
          lineWidth: itemStyle.lineWidth,
          stroke: itemStyle.stroke,
        },
        z: 4,
      }));
    }

    const label = resolveSegmentLabel(segmentItemModel.option, value);

    if (label) {
      const midAngle = (range.startAngle + range.endAngle) / 2;
      const labelPoint = polarPoint(centerX, centerY, segmentOuterRadius + labelOffset, midAngle);
      const onRightHalf = Math.cos(midAngle) >= 0;

      const labelOverwriteStyle = segmentItemModel.get('labelTextStyle');

      segments.push(createTextGraphic({
        align: onRightHalf ? 'left' : 'right',
        fontSize: factor * styleWithoutUnit('SynFontSizeSmall'),
        text: label,
        x: labelPoint.x,
        y: labelPoint.y,
        z: 15,
      }, labelOverwriteStyle));
    }
  });
  return segments;
};

const buildSegmentChartGroup = (
  model: SynergySegmentSeriesModel,
  width: number,
  height: number,
): graphic.Group => {
  const data = model.getData();
  const config = model.option as ResolvedSegmentChartSeriesConfig;

  const {
    centerX,
    centerY,
    layoutHeight,
    layoutWidth,
    outerRadius: availableOuterRadius,
  } = resolveCircularLayout(config, width, height);

  // At a height of 340px the layout is of factor 1 and then scales linearly.
  const factor = Math.min(layoutWidth, layoutHeight) / SEGMENT_SERIES.REFERENCE_HEIGHT;

  // Reserve room for the outer labels (offset + text height), so labels near the top or
  // bottom of the circle aren't clipped by the container edges, which sit right at the
  // circle's radius on the shorter side of the (16:9) chart container.
  const labelOffset = factor * styleWithoutUnit('SynSpacingSmall');
  const labelFontSize = factor * styleWithoutUnit('SynFontSizeSmall');
  const reservedLabelSpace = labelOffset + labelFontSize;

  const outerRadius = Math.max(0, availableOuterRadius - reservedLabelSpace);

  const centerCircleRadius = factor * SEGMENT_SERIES.CENTER_CIRCLE_RADIUS;
  const ringSpacing = factor * SEGMENT_SERIES.GAP_CENTER_CIRCLE_TO_SEGMENTS;

  const segmentInnerRadius = centerCircleRadius + ringSpacing;
  const segmentOuterRadius = outerRadius;

  const root = new graphic.Group();

  // Static center circle.
  root.add(createSectorGraphic({
    centerX,
    centerY,
    color: style('SynChartTrackColor'),
    endAngle: FULL_CIRCLE_RADIAN,
    innerRadius: 0,
    outerRadius: centerCircleRadius,
    startAngle: 0,
    z: 1,
  }));

  // Optional icon inside the center circle.
  if (config.icon) {
    const iconSize = factor * SEGMENT_SERIES.ICON_SIZE;
    const halfIconSize = iconSize / 2;
    const coloredIcon = colorSvgDataUrl(config.icon, style('SynColorNeutral950'));
    root.add(createImageGraphic({
      height: iconSize,
      image: coloredIcon,
      width: iconSize,
      x: centerX - halfIconSize,
      y: centerY - halfIconSize,
      z: 2,
    }));
  }

  const { startAngle, availableAngle } = computeGapRange(config.gap, config.gapOrientation);
  const weights = resolveWeights(data);
  const segmentRanges = computeSegmentRanges(weights, startAngle, availableAngle);

  const halfGap = (factor * SEGMENT_SERIES.SEGMENTS_GAP) / 2;

  const segments = createSegments(
    data,
    config,
    segmentRanges,
    centerX,
    centerY,
    segmentInnerRadius,
    segmentOuterRadius,
    halfGap,
    labelOffset,
    factor,
  );
  segments.forEach(segment => root.add(segment));

  const name = model.get('name');
  // Main name, centered in the gap.
  if (name) {
    const textRadiusPosition = ((outerRadius - centerCircleRadius) / 2) + centerCircleRadius;
    const gapCenterAngle = (SEGMENT_SERIES.GAP_CENTER_ANGLE + config.gapOrientation) * DEGREE_TO_RADIAN;
    const namePoint = polarPoint(centerX, centerY, textRadiusPosition, gapCenterAngle);
    // TODO: currently we do not have a token for font-size 22. Either do one, or use another font-size
    const fontSize = 22;
    const styleOverwrite = model.get('nameTextStyle');
    root.add(createTextGraphic({
      fontSize: factor * fontSize,
      text: name,
      x: namePoint.x,
      y: namePoint.y,
    }, styleOverwrite));
  }

  return root;
};

export class SynergySegmentView extends ChartView {
  static type = SEGMENT_SERIES.TYPE_NAME;

  type = SynergySegmentView.type;

  /**
   * Renders the segment chart into the ECharts group using the current model data and option config.
   */
  render(seriesModel: SynergySegmentSeriesModel, _ecModel: GlobalModel, api: ExtensionAPI): void {
    const { group } = this;
    group.removeAll();

    const segmentChartGroup = buildSegmentChartGroup(seriesModel, api.getWidth(), api.getHeight());
    group.add(segmentChartGroup);
  }
}
