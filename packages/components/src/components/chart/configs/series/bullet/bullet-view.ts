import { ChartView, graphic, number } from 'echarts/core.js';
import { calcBandWidth } from 'echarts/lib/coord/axisBand.js';
import { setStatesStylesFromModel, toggleHoverEmphasis } from 'echarts/lib/util/states.js';
import { getRealValueWithoutUnit as styleWithoutUnit } from '../../../themes/utilities.js';
import { BULLET_SERIES } from '../../constants.js';
import type { ExtensionAPI, GlobalModel } from '../../types.js';
import type { SynergyBulletSeriesModel } from './bullet-model.js';
import type { BulletEmphasis, Cartesian2D } from './types.js';

// Mirrors the single-stack width calculation of ECharts bars (echarts/lib/layout/barGrid.js).
/**
 * Calculates the range thickness from explicit width, minimum/maximum limits, and category gap.
 */
const getRangeWidth = (seriesModel: SynergyBulletSeriesModel, bandWidth: number): number => {
  const explicitWidth = number.parsePercent(seriesModel.get('barWidth'), bandWidth);
  const maxWidth = number.parsePercent(seriesModel.get('barMaxWidth'), bandWidth);
  const minWidth = number.parsePercent(seriesModel.get('barMinWidth') || 1, bandWidth);
  // ECharts falls back to a 30% category gap for a single bar chart without barCategoryGap.
  const categoryGap = number.parsePercent(seriesModel.get('barCategoryGap') ?? BULLET_SERIES.DEFAULT_CATEGORY_GAP, bandWidth);

  let rangeWidth: number;
  if (explicitWidth) {
    rangeWidth = maxWidth ? Math.min(explicitWidth, maxWidth) : explicitWidth;
  } else {
    rangeWidth = Math.max(bandWidth - categoryGap, 0);
    if (maxWidth && maxWidth < rangeWidth) {
      rangeWidth = Math.min(maxWidth, bandWidth);
    }
  }
  return minWidth ? Math.max(rangeWidth, minWidth) : rangeWidth;
};

/** Resolves a requested marker dimension, enforcing a one-pixel minimum or using its fallback. */
const resolveSize = (requested: number | undefined, fallback: number) => (
  requested != null && Number.isFinite(requested) ? Math.max(1, requested) : fallback
);

/** Calculates the marker rectangle centered on the current-value point. */
const getMarkerShape = (seriesModel: SynergyBulletSeriesModel, currentPoint: number[], isVertical: boolean, rangeWidth: number) => {
  const markerStyle = seriesModel.get('markerStyle');
  const thickness = styleWithoutUnit('SynBorderWidthMedium');

  const width = resolveSize(markerStyle?.width, isVertical ? rangeWidth : thickness);
  const height = resolveSize(markerStyle?.height, isVertical ? thickness : rangeWidth);
  return {
    height,
    r: markerStyle?.borderRadius,
    width,
    x: currentPoint[0] - (width / 2),
    y: currentPoint[1] - (height / 2),
  };
};

/** Creates the styled actual-value marker centered on its data point. */
const createMarker = (seriesModel: SynergyBulletSeriesModel, currentPoint: number[], isVertical: boolean, rangeWidth: number): graphic.Rect => {
  const markerStyle = seriesModel.getModel('markerStyle').getItemStyle();
  // The default marker width is according to design the range width plus 8px
  const defaultMarkerWidth = rangeWidth + styleWithoutUnit('SynSpacingXSmall');
  const markerShape = getMarkerShape(seriesModel, currentPoint, isVertical, defaultMarkerWidth);
  const marker = new graphic.Rect({
    shape: markerShape,
    style: {
      strokeFirst: true,
      ...markerStyle,
    },
    z2: BULLET_SERIES.MARKER_Z_INDEX,
  });
  // this ensures the marker is still visible, if the bullet is hovered and uses emphasis styling
  marker.ensureState('emphasis').style = { fill: markerStyle.fill };
  return marker;
};

/** Checks that a series coordinate system is Cartesian and provides an area for clipping. */
const isCartesian2D = (coordinateSystem: SynergyBulletSeriesModel['coordinateSystem']): coordinateSystem is Cartesian2D => (
  coordinateSystem?.type === BULLET_SERIES.COORDINATE_SYSTEM
  && typeof coordinateSystem.getArea === 'function'
);

/**
 * Creates available range and actual-value marker graphics for one data item,
 * or returns `undefined` when neither can be rendered.
 */
const renderBullet = (seriesModel: SynergyBulletSeriesModel, dataIndex: number, coordinateSystem: Cartesian2D): graphic.Group | undefined => {
  const data = seriesModel.getData();
  const start = Number(data.get('start', dataIndex));
  const end = Number(data.get('end', dataIndex));
  const current = Number(data.get('current', dataIndex));
  const hasRange = Number.isFinite(start) && Number.isFinite(end);
  const hasCurrent = !Number.isNaN(current);
  if (!hasRange && !hasCurrent) {
    return undefined;
  }

  const baseAxis = seriesModel.getBaseAxis();
  const isVertical = baseAxis.dim === 'x';
  const categoryIndex = Number(data.get('category', dataIndex));
  const toPoint = (numericValue: number) => coordinateSystem.dataToPoint(
    isVertical ? [categoryIndex, numericValue] : [numericValue, categoryIndex],
  );
  const bandWidth = calcBandWidth(baseAxis, { min: 1 }).w;
  const rangeWidth = getRangeWidth(seriesModel, bandWidth);
  const itemGroup = new graphic.Group();

  if (hasRange) {
    const startPoint = toPoint(start);
    const endPoint = toPoint(end);
    const offset = (bandWidth - rangeWidth) / 2;
    const rangeStyle = data.getItemVisual(dataIndex, 'style');
    const rangeShape = isVertical
      ? {
        height: Math.max(Math.abs(endPoint[1] - startPoint[1]), 1),
        width: rangeWidth,
        x: startPoint[0] - (bandWidth / 2) + offset,
        y: Math.min(startPoint[1], endPoint[1]),
      }
      : {
        height: rangeWidth,
        width: Math.max(Math.abs(endPoint[0] - startPoint[0]), 1),
        x: Math.min(startPoint[0], endPoint[0]),
        y: startPoint[1] - (bandWidth / 2) + offset,
      };
    const range = new graphic.Rect({
      shape: rangeShape,
      style: { ...rangeStyle },
      z2: BULLET_SERIES.RANGE_Z_INDEX,
    });
    // This sets the hover styling from the item model's emphasis configuration
    setStatesStylesFromModel(range, data.getItemModel(dataIndex));
    itemGroup.add(range);
  }

  if (hasCurrent) {
    const currentPoint = toPoint(current);
    itemGroup.add(createMarker(seriesModel, currentPoint, isVertical, rangeWidth));
  }
  return itemGroup;
};

/** ECharts chart view that renders each bullet range and its actual-value marker. */
export class SynergyBulletView extends ChartView {
  static type = BULLET_SERIES.TYPE_NAME;

  type = SynergyBulletView.type;

  /** Renders the series items, hover emphasis, and optional coordinate-area clipping. */
  render(seriesModel: SynergyBulletSeriesModel, _ecModel: GlobalModel, _api: ExtensionAPI): void {
    const { group } = this;
    group.removeAll();
    group.removeClipPath();

    const data = seriesModel.getData();
    const { coordinateSystem } = seriesModel;
    if (!isCartesian2D(coordinateSystem)) {
      return;
    }

    data.each((dataIndex) => {
      const itemGroup = renderBullet(seriesModel, dataIndex, coordinateSystem);
      if (!itemGroup) {
        return;
      }

      data.setItemGraphicEl(dataIndex, itemGroup);
      const emphasis = data.getItemModel<{ emphasis: BulletEmphasis }>(dataIndex).getModel('emphasis');
      toggleHoverEmphasis(itemGroup, 'none', 'coordinateSystem', !!emphasis.get('disabled'));
      group.add(itemGroup);
    });

    if (seriesModel.get('clip')) {
      group.setClipPath(new graphic.Rect({ shape: coordinateSystem.getArea() }));
    }
  }
}
