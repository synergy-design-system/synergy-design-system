import { ChartView, graphic } from 'echarts/core.js';
import type GlobalModel from 'echarts/types/src/model/Global.js';
import type ExtensionAPI from 'echarts/types/src/core/ExtensionAPI.js';
import type { ZRColor } from 'echarts/types/dist/shared.js';
import type { SynergyDonutSeriesModel } from './donut-series-model.js';
import type {
  DonutDataItem,
  DonutDataValue,
  Point,
  ResolvedDonutSeriesConfig,
  Sector,
  SegmentRange,
  SynergyDonutSeriesOption,
} from './types.js';
import { DONUT_SERIES } from '../constants.js';
import { measureTextWidth, getRealStyleValue as style, getRealValueWithoutUnit as styleWithoutUnit } from '../../themes/utilities.js';
import { colorSvgDataUrl } from '../utilities.js';

const FULL_CIRCLE = Math.PI * 2;
const RADIAN = Math.PI / 180;

/**
 * Returns the default theme configuration for the donut chart track.
 */
const getDefaultDonutConfig = (): ResolvedDonutSeriesConfig => ({
  backgroundColor: style('SynProgressTrackColor'),
});

/**
 * Converts a polar coordinate into Cartesian space for placement calculations.
 */
const polarPoint = (centerX: number, centerY: number, radius: number, angle: number): Point => ({
  x: centerX + (Math.cos(angle) * radius),
  y: centerY + (Math.sin(angle) * radius),
});

/**
 * Creates a single ring sector for the donut chart.
 */
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
 * Creates an image element for an icon placed within the donut graphic layer.
 */
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
 * Creates a text element used for donut segment labels.
 */
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
 * Returns `null` ranges for zero or negative totals so no segments or labels are rendered.
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

/**
 * Creates the visible sector shapes for each donut segment while keeping a small gap between slices.
 */
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
    group.add(createImage({
      height: iconSize,
      image: coloredIcon,
      width: iconSize,
      x: iconX,
      y: point.y - (iconSize / 2),
      z: 15,
    }));
  }

  if (item.name) {
    group.add(createText({
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
  centerX,
  centerY,
  dataItems,
  height,
  segmentRanges,
  width,
}: {
  centerX: number;
  centerY: number;
  dataItems: DonutDataItem[];
  height: number;
  segmentRanges: Array<SegmentRange | null>;
  width: number;
}): { adaptiveFactor: number; outerRingOuterRadius: number } => {
  const factor = height / DONUT_SERIES.REFERENCE_HEIGHT;
  const initialOuterRingOuterRadius = Math.min(width, height) * 0.5;

  const visibleLabels = segmentRanges.flatMap((range, index) => {
    const item = dataItems[index];
    if (!range || !item || (!item.name && !item.icon)) return [];
    return [{ item, midAngle: (range.startAngle + range.endAngle) / 2 }];
  });

  /** Returns true when every visible label fits for the given adaptive factor. */
  const labelsAllFit = (af: number): boolean => {
    const r = initialOuterRingOuterRadius * (af / factor);
    return visibleLabels.every(({ midAngle, item }) => {
      const {
        iconSize, labelLeft, labelRight, point,
      } = computeLabelDimensions(item, af, centerX, centerY, r, midAngle);
      return (
        labelLeft >= 0
        && labelRight <= width
        && point.y - iconSize / 2 >= 0
        && point.y + iconSize / 2 <= height
      );
    });
  };

  const adaptiveFactor = (visibleLabels.length > 0 && !labelsAllFit(factor))
    ? binarySearchMax(factor * 0.1, factor, labelsAllFit)
    : factor;

  return {
    adaptiveFactor,
    outerRingOuterRadius: initialOuterRingOuterRadius * (adaptiveFactor / factor),
  };
};

/**
 * Builds the complete donut graphic group, including track, slices, and optional labels.
 */
const buildDonutGroup = (
  dataItems: DonutDataItem[],
  inputConfig: SynergyDonutSeriesOption,
  width: number,
  height: number,
  getSegmentColor: (index: number) => ZRColor,
): graphic.Group => {
  const defaultConfig = getDefaultDonutConfig();
  const mergedConfig: ResolvedDonutSeriesConfig = {
    ...defaultConfig,
    ...inputConfig,
  };

  const centerX = width / 2;
  const centerY = height / 2;

  const segmentRanges = computeSegmentRanges(dataItems.map((item) => Number(item.value)));

  const { adaptiveFactor, outerRingOuterRadius } = computeAdaptiveLayout({
    centerX,
    centerY,
    dataItems,
    height,
    segmentRanges,
    width,
  });

  // All dimensions derive from the single adaptive factor.
  const segmentThickness = adaptiveFactor * styleWithoutUnit('SynSpacingXSmall');
  const ringSpacing = adaptiveFactor * styleWithoutUnit('SynSpacingXSmall');
  const innerRingThickness = adaptiveFactor * styleWithoutUnit('SynSpacingMedium');
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

  const segmentColors: ZRColor[] = dataItems.map((item, index) => item.color ?? getSegmentColor(index));

  // Outer data segments
  const segmentSectors = createSegmentSectors({
    centerX,
    centerY,
    colors: segmentColors,
    innerRadius: outerRingInnerRadius,
    outerRadius: outerRingOuterRadius,
    ranges: segmentRanges,
  });
  segmentSectors.forEach((sector) => root.add(sector));

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
    root.add(segmentLabels);
  });

  return root;
};

export class SynergyDonutView extends ChartView {
  static type = DONUT_SERIES.TYPE_NAME;

  type = SynergyDonutView.type;

  /**
   * Renders the donut chart into the ECharts group using the current model data and option config.
   */
  // @ts-expect-error - I don't know where this typescript error comes from. Even in echarts itself it is available..
  render(seriesModel: SynergyDonutSeriesModel, ecModel: GlobalModel, api: ExtensionAPI): void {
    const { group } = this;
    group.removeAll();

    const data = seriesModel.getData();
    const option = seriesModel.option as SynergyDonutSeriesOption;
    const dataItems: DonutDataItem[] = [];

    for (let index = 0; index < data.count(); index += 1) {
      const value = Number(data.get('value', index));
      const rawDataItem = data.getRawDataItem(index) as DonutDataValue;
      const objectDataItem = typeof rawDataItem === 'object' && rawDataItem !== null ? rawDataItem : undefined;

      dataItems.push({
        color: objectDataItem?.color,
        icon: objectDataItem?.icon,
        name: objectDataItem?.name,
        value,
      });
    }

    // Cycle through the categorical palette, one color per data segment.
    const paletteScope = {};
    const getSegmentColor = (index: number): ZRColor => seriesModel.getColorFromPalette(`synergy-donut-segment-${index}`, paletteScope);

    const donutGroup = buildDonutGroup(dataItems, option, api.getWidth(), api.getHeight(), getSegmentColor);
    group.add(donutGroup);
  }
}
