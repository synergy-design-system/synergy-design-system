import type { BarSeriesOption } from 'echarts';
import type { SeriesModel, ZRColor } from 'echarts/types/dist/shared.js';
import type { WithRequired } from '../../types.js';

/** A Cartesian coordinate system that exposes the chart area used for clipping. */
export type Cartesian2D = WithRequired<SeriesModel['coordinateSystem'], 'getArea'>;

/** Range styling supported by the bullet renderer. */
export type BulletItemStyle = Pick<NonNullable<BarSeriesOption['itemStyle']>,
  'color' | 'borderColor' | 'borderWidth' | 'borderType' | 'borderDashOffset'
  | 'opacity' | 'shadowBlur' | 'shadowColor' | 'shadowOffsetX' | 'shadowOffsetY'>;

/** Border and opacity styling for the actual-value marker. */
export type BulletMarkerStyle = Pick<BulletItemStyle,
  'borderColor' | 'borderWidth' | 'borderType' | 'borderDashOffset' | 'opacity'> & {
    /** Marker width in pixels, when omitted, it is derived from the range orientation. */
    width?: number;
    /** Marker height in pixels, when omitted, it is derived from the range orientation. */
    height?: number;
    /** Marker corner radius in pixels. */
    borderRadius?: number;
    /** Marker fill color. */
    color?: ZRColor;
  };

/** Hover styling for a bullet item. */
export type BulletEmphasis = {
  /** Whether to disable hover emphasis for this item. */
  disabled?: boolean;
  /** Range styling to apply while the item is emphasized. */
  itemStyle?: BulletItemStyle;
};

/** A bullet item with a numeric range and actual value. */
export type BulletDataItem = {
  /** First boundary of the displayed range. */
  start: number;
  /** Second boundary of the displayed range. */
  end: number;
  /** Actual value shown by the contrasting marker. */
  current: number;
  /** Category label used by the axes, legend, and tooltip. */
  name?: string;
  /** Per-item range color and border styling. */
  itemStyle?: BulletItemStyle;
  /** Per-item hover styling. */
  emphasis?: BulletEmphasis;
};

/** A data dimension reference accepted by ECharts encode options. */
type BulletEncodeValue = string | number | Array<string | number>;

/** ECharts series-level tooltip options supported by the `synBullet` series. */
export type BulletTooltipOption = BarSeriesOption['tooltip'];

/** ECharts encode dimensions supported by `synBullet`. */
export type BulletEncode = {
  /** Data dimension mapped to the horizontal coordinate. */
  x?: BulletEncodeValue;
  /** Data dimension mapped to the vertical coordinate. */
  y?: BulletEncodeValue;
  /** Tooltip dimensions: current shows the value; start or end shows the complete range. Category adds no value row. */
  tooltip?: BulletEncodeValue;
  /** Data dimension used as the item name. */
  itemName?: BulletEncodeValue;
};
/** ECharts series options for `synBullet`. */
export type SynergyBulletSeriesOption = Pick<BarSeriesOption, 'id' | 'silent' | 'z' | 'zlevel' | 'tooltip'> & {
  type?: 'synBullet';
  /** Series name used in chart labels and tooltips. */
  name?: string;
  /** Bullet ranges and their actual values. */
  data?: BulletDataItem[];
  /** Coordinate system used to lay out the bullet ranges. */
  coordinateSystem?: 'cartesian2d';
  /** Index of the horizontal axis used by the series. */
  xAxisIndex?: number;
  /** Index of the vertical axis used by the series. */
  yAxisIndex?: number;
  /** Range thickness in pixels or a percentage of the category band; automatic when omitted or zero. */
  barWidth?: number | string;
  /** Minimum thickness in pixels or a percentage of the category band; overrides barMaxWidth. */
  barMinWidth?: number | string;
  /** Maximum thickness in pixels or a percentage of the category band; defaults to SynSpacingLarge. */
  barMaxWidth?: number | string;
  /** Category spacing for automatic widths; explicit barWidth takes priority. */
  barCategoryGap?: number | string;
  /** Marker dimensions, corner radius, color, border and opacity, independent of range styling. */
  markerStyle?: BulletMarkerStyle;
  /** Default fill, border, opacity, and shadow styling for the ranges. */
  itemStyle?: BulletItemStyle;
  /** Maps data dimensions to chart coordinates, tooltip values, and item names. */
  encode?: BulletEncode;
  /** Whether item colors are assigned per data item or per series. */
  colorBy?: 'data' | 'series';
  /** Whether rendered ranges are clipped to the coordinate-system area. */
  clip?: boolean;
  /** Default hover-emphasis behavior for the series and its items. */
  emphasis?: BulletEmphasis;
  /** Series-level tooltip settings that override the chart's global tooltip options. */
  tooltip?: BulletTooltipOption;
};

/** Public option shape with the `synBullet` type required. */
export type SynergyBulletSeriesConfig = Omit<SynergyBulletSeriesOption, 'type'> & { type: 'synBullet' };

/** Options accepted by the `seriesBullet` preset. */
export type BulletSeriesPresetOptions = Omit<SynergyBulletSeriesOption, 'type'>;

/** Adds the custom bullet-series option to ECharts' registered series options. */
declare module 'echarts/types/dist/shared.js' {
  interface RegisteredSeriesOption {
    /** Series configuration associated with the `synBullet` discriminator. */
    synBullet: SynergyBulletSeriesConfig;
  }
}
