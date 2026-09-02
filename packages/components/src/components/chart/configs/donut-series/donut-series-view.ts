import { ChartView, graphic } from 'echarts/core.js';
import type { SeriesData } from 'echarts/types/dist/shared.js';
import type { SynergyDonutSeriesModel } from './donut-series-model.js';
import type {
  DonutDataItem,
  DonutDataValue,
  DonutSeriesOption,
  LayoutBounds,
  LayoutCenterInput,
  LayoutRadiusInput,
  ResolvedLayout,
  SegmentRange,
} from './types.js';
import { DEGREE_TO_RADIAN, DONUT_SERIES, FULL_CIRCLE_RADIAN } from '../constants.js';
import { measureTextWidth, getRealStyleValue as style, getRealValueWithoutUnit as styleWithoutUnit } from '../../themes/utilities.js';
import {
  colorSvgDataUrl,
  createImageGraphic,
  createSectorGraphic,
  createTextGraphic,
  polarPoint,
} from '../utilities.js';
import type { ExtensionAPI, GlobalModel, LayoutValue } from '../types.js';

/** Converts a pixel/percent input to pixels relative to the given base size. */
const toPixels = (value: LayoutValue | undefined, baseSize: number, fallback = 0): number => {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === 'string') {
    const trimmed = value.trim();

    if (trimmed.endsWith('%')) {
      const percent = Number.parseFloat(trimmed.slice(0, -1));
      return Number.isFinite(percent) ? (baseSize * percent) / 100 : fallback;
    }

    const numeric = Number.parseFloat(trimmed);
    return Number.isFinite(numeric) ? numeric : fallback;
  }

  return fallback;
};

const resolveLayoutBounds = (
  edges: Pick<DonutSeriesOption, 'top' | 'right' | 'bottom' | 'left'>,
  width: number,
  height: number,
): LayoutBounds => {
  const top = Math.max(0, toPixels(edges.top, height));
  const right = Math.max(0, toPixels(edges.right, width));
  const bottom = Math.max(0, toPixels(edges.bottom, height));
  const left = Math.max(0, toPixels(edges.left, width));

  return {
    bottom: Math.max(top, height - bottom),
    left: Math.min(width, left),
    right: Math.max(left, width - right),
    top: Math.min(height, top),
  };
};

const resolveLayoutCenter = (
  center: LayoutCenterInput,
  bounds: LayoutBounds,
): { centerX: number; centerY: number; layoutWidth: number; layoutHeight: number } => {
  const layoutWidth = Math.max(0, bounds.right - bounds.left);
  const layoutHeight = Math.max(0, bounds.bottom - bounds.top);

  return {
    centerX: bounds.left + toPixels(center?.[0], layoutWidth, layoutWidth / 2),
    centerY: bounds.top + toPixels(center?.[1], layoutHeight, layoutHeight / 2),
    layoutHeight,
    layoutWidth,
  };
};

const resolveOuterRadius = (
  radius: LayoutRadiusInput,
  layoutWidth: number,
  layoutHeight: number,
): number => {
  const size = Math.min(layoutWidth, layoutHeight);
  const radiusBase = Math.max(0, size / 2);
  return Math.max(0, toPixels(radius, radiusBase, radiusBase));
};

const isFixedRadius = (radius: LayoutRadiusInput): boolean => {
  if (typeof radius === 'number') {
    return Number.isFinite(radius);
  }

  if (typeof radius === 'string') {
    const trimmed = radius.trim();
    return trimmed !== '' && !trimmed.endsWith('%');
  }

  return false;
};

/** Resolves layout bounds/center/radius for the donut rendering area. */
const resolveDonutLayout = (
  inputConfig: DonutSeriesOption,
  width: number,
  height: number,
): ResolvedLayout => {
  const bounds = resolveLayoutBounds(inputConfig, width, height);
  const {
    centerX,
    centerY,
    layoutHeight,
    layoutWidth,
  } = resolveLayoutCenter(inputConfig.center, bounds);
  const outerRadius = resolveOuterRadius(inputConfig.radius, layoutWidth, layoutHeight);
  return {
    bounds,
    centerX,
    centerY,
    layoutHeight,
    layoutWidth,
    outerRadius,
  };
};

/**
 * Distributes the data values evenly around a full circle, sized proportionally to their value.
 * Returns `null` ranges for zero or negative totals so no segments or labels are rendered.
 */
const computeSegmentRanges = (values: number[]): Array<SegmentRange | null> => {
  const total = values.reduce((sum, value) => sum + Math.max(value, 0), 0);

  if (total <= 0) {
    return values.map(() => null);
  }

  let currentAngle = DONUT_SERIES.START_ANGLE * DEGREE_TO_RADIAN;

  return values.map((value) => {
    const sweep = (Math.max(value, 0) / total) * FULL_CIRCLE_RADIAN;
    const startAngle = currentAngle;
    const endAngle = currentAngle + sweep;
    currentAngle = endAngle;

    return { endAngle, startAngle };
  });
};

/**
 * Creates the visible sector shapes for each donut segment while keeping a small gap between slices.
 */
const createSegmentSectors = ({
  ranges, centerX, centerY, innerRadius, outerRadius, data,
}: {
  ranges: Array<SegmentRange | null>;
  centerX: number;
  centerY: number;
  innerRadius: number;
  outerRadius: number;
  data: SeriesData,
}): graphic.Sector[] => {
  const gap = DONUT_SERIES.SEGMENT_GAP;

  return ranges.reduce<graphic.Sector[]>((sectors, range, index) => {
    if (!range) {
      return sectors;
    }

    const sweep = range.endAngle - range.startAngle;
    // Keep gaps from collapsing very small slices into a negative sweep.
    const halfGap = Math.min(gap / 2, sweep / 2);

    sectors.push(createSectorGraphic({
      centerX,
      centerY,
      color: data.getItemVisual(index, 'style').fill ?? 'transparent',
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
 * Computes the layout bounds and attachment point for a segment label based on its angle and radius.
 */
const computeLabelDimensions = (
  item: DonutDataItem,
  factor: number,
  centerX: number,
  centerY: number,
  radius: number,
  midAngle: number,
) => {
  const labelGap = factor * styleWithoutUnit('SynSpacingSmall');
  const point = polarPoint(centerX, centerY, radius + labelGap, midAngle);
  const onRightHalf = Math.cos(midAngle) >= 0;
  const fontSize = factor * styleWithoutUnit('SynFontSizeSmall');
  const iconSize = factor * styleWithoutUnit('SynFontSizeLarge');
  const iconTextGap = factor * styleWithoutUnit('SynSpacing2xSmall');
  const textWidth = item.name ? measureTextWidth(item.name, `${fontSize}px ${style('SynFontSans')}`) : 0;
  const iconWidth = item.icon ? iconSize + iconTextGap : 0;
  const totalWidth = iconWidth + textWidth;
  // Labels on the right half grow rightward from point.x; left half grow leftward.
  const labelLeft = onRightHalf ? point.x : point.x - totalWidth;
  const labelRight = labelLeft + totalWidth;
  const iconX = labelLeft;
  const textX = labelLeft + iconWidth;
  return {
    fontSize, iconSize, iconX, labelLeft, labelRight, point, textX,
  };
};

/**
 * Renders a label centered on a segment, outside the outer ring, with an optional icon prefix.
 */
const createSegmentLabel = ({
  item, factor, centerX, centerY, radius, midAngle,
}: {
  item: DonutDataItem;
  factor: number;
  centerX: number;
  centerY: number;
  radius: number;
  midAngle: number;
}): graphic.Group => {
  const group = new graphic.Group({ silent: true });

  const {
    fontSize, iconSize, iconX, point, textX,
  } = computeLabelDimensions(item, factor, centerX, centerY, radius, midAngle);

  if (item.icon) {
    const coloredIcon = colorSvgDataUrl(item.icon, style('SynTypographyColorText'));
    group.add(createImageGraphic({
      height: iconSize,
      image: coloredIcon,
      width: iconSize,
      x: iconX,
      y: point.y - (iconSize / 2),
      z: 15,
    }));
  }

  if (item.name) {
    group.add(createTextGraphic({
      align: 'left',
      fontSize,
      text: item.name,
      x: textX,
      y: point.y,
      z: 15,
    }));
  }

  return group;
};

/**
 * Returns the largest value in the range that satisfies the provided fit check.
 */
const binarySearchMax = (lo: number, hi: number, fits: (v: number) => boolean, iterations = 5): number => {
  let best = lo;
  let low = lo;
  let high = hi;
  for (let i = 0; i < iterations; i += 1) {
    const mid = (low + high) / 2;
    if (fits(mid)) {
      best = mid;
      low = mid;
    } else {
      high = mid;
    }
  }
  return best;
};

/**
 * Finds the largest adaptive scale factor that keeps every visible donut label within the chart bounds.
 */
const computeAdaptiveLayout = ({
  baseOuterRingOuterRadius,
  bounds,
  centerX,
  centerY,
  dataItems,
  factor,
  segmentRanges,
}: {
  baseOuterRingOuterRadius: number;
  bounds: LayoutBounds;
  centerX: number;
  centerY: number;
  dataItems: DonutDataItem[];
  factor: number;
  segmentRanges: Array<SegmentRange | null>;
}): { adaptiveFactor: number; outerRingOuterRadius: number } => {
  const visibleLabels = segmentRanges.flatMap((range, index) => {
    const item = dataItems[index];

    if (!range || !item || (!item.name && !item.icon)) {
      return [];
    }

    return [{ item, midAngle: (range.startAngle + range.endAngle) / 2 }];
  });

  /** Returns true when every visible label fits for the given adaptive factor. */
  const labelsAllFit = (af: number): boolean => {
    const normalizedFactor = factor > 0 ? (af / factor) : 1;
    const radius = baseOuterRingOuterRadius * normalizedFactor;

    return visibleLabels.every(({ midAngle, item }) => {
      const {
        iconSize,
        labelLeft,
        labelRight,
        point,
      } = computeLabelDimensions(item, af, centerX, centerY, radius, midAngle);

      return (
        labelLeft >= bounds.left
        && labelRight <= bounds.right
        && point.y - iconSize / 2 >= bounds.top
        && point.y + iconSize / 2 <= bounds.bottom
      );
    });
  };

  const adaptiveFactor = (visibleLabels.length > 0 && !labelsAllFit(factor))
    ? binarySearchMax(factor * 0.1, factor, labelsAllFit)
    : factor;

  const normalizedAdaptiveFactor = factor > 0 ? (adaptiveFactor / factor) : 1;

  return {
    adaptiveFactor,
    outerRingOuterRadius: baseOuterRingOuterRadius * normalizedAdaptiveFactor,
  };
};

/**
 * Builds the complete donut graphic group, including track, slices, and optional labels.
 */
const buildDonutGroup = (
  dataItems: DonutDataItem[],
  inputConfig: DonutSeriesOption,
  width: number,
  height: number,
  data: SeriesData,
) => {
  const {
    bounds,
    centerX,
    centerY,
    layoutHeight,
    outerRadius,
  } = resolveDonutLayout(inputConfig, width, height);
  const factor = layoutHeight / DONUT_SERIES.REFERENCE_HEIGHT;

  const segmentRanges = computeSegmentRanges(dataItems.map((item) => Number(item.value)));

  const fixedRadiusFactor = (outerRadius > 0) ? (outerRadius / (DONUT_SERIES.REFERENCE_HEIGHT / 2)) : factor;

  const { adaptiveFactor, outerRingOuterRadius } = isFixedRadius(inputConfig.radius)
    ? { adaptiveFactor: fixedRadiusFactor, outerRingOuterRadius: outerRadius }
    : computeAdaptiveLayout({
      baseOuterRingOuterRadius: outerRadius,
      bounds,
      centerX,
      centerY,
      dataItems,
      factor,
      segmentRanges,
    });

  // All dimensions derive from the single adaptive factor.
  const segmentThickness = adaptiveFactor * styleWithoutUnit('SynSpacingXSmall');
  const ringSpacing = adaptiveFactor * styleWithoutUnit('SynSpacingXSmall');
  const innerRingThickness = adaptiveFactor * styleWithoutUnit('SynSpacingMedium');
  const outerRingInnerRadius = outerRingOuterRadius - segmentThickness;
  const innerRingOuterRadius = outerRingInnerRadius - ringSpacing;
  const innerRingInnerRadius = innerRingOuterRadius - innerRingThickness;

  const donutGroup = new graphic.Group();
  const backgroundColor = inputConfig.backgroundColor ?? style('SynProgressTrackColor');

  // Static inner track ring.
  donutGroup.add(createSectorGraphic({
    centerX,
    centerY,
    color: backgroundColor,
    endAngle: FULL_CIRCLE_RADIAN,
    innerRadius: innerRingInnerRadius,
    outerRadius: innerRingOuterRadius,
    startAngle: 0,
    z: 1,
  }));

  // Outer data segments
  const segmentSectors = createSegmentSectors({
    centerX,
    centerY,
    data,
    innerRadius: outerRingInnerRadius,
    outerRadius: outerRingOuterRadius,
    ranges: segmentRanges,
  });
  segmentSectors.forEach((sector) => donutGroup.add(sector));

  // Segment labels, centered on each segment and placed outside the outer ring.
  segmentRanges.forEach((range, index) => {
    const dataItem = dataItems[index];

    if (!range || (!dataItem?.name && !dataItem?.icon)) {
      return;
    }

    const midAngle = (range.startAngle + range.endAngle) / 2;

    const segmentLabels = createSegmentLabel({
      centerX,
      centerY,
      factor: adaptiveFactor,
      item: dataItem,
      midAngle,
      radius: outerRingOuterRadius,
    });
    donutGroup.add(segmentLabels);
  });

  return donutGroup;
};

const toDonutDataItems = (seriesModel: SynergyDonutSeriesModel): DonutDataItem[] => {
  const data = seriesModel.getData();
  const dataItems: DonutDataItem[] = [];

  for (let index = 0; index < data.count(); index += 1) {
    const value = Number(data.get('value', index));
    const rawDataItem = data.getRawDataItem(index) as DonutDataValue;
    const objectDataItem = typeof rawDataItem === 'object' && rawDataItem !== null ? rawDataItem : undefined;

    dataItems.push({
      icon: objectDataItem?.icon,
      name: objectDataItem?.name,
      value,
    });
  }

  return dataItems;
};

export class SynergyDonutView extends ChartView {
  static type = DONUT_SERIES.TYPE_NAME;

  type = SynergyDonutView.type;

  /**
   * Renders the donut chart into the ECharts group using the current model data and option config.
   */
  render(seriesModel: SynergyDonutSeriesModel, _ecModel: GlobalModel, api: ExtensionAPI): void {
    const { group } = this;
    group.removeAll();
    const data = seriesModel.getData();
    const { option } = seriesModel;
    const dataItems = toDonutDataItems(seriesModel);

    const donutGroup = buildDonutGroup(dataItems, option, api.getWidth(), api.getHeight(), data);
    group.add(donutGroup);
  }
}
