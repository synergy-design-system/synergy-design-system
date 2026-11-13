import {
  List, Model, SeriesModel, format, helper,
} from 'echarts/core.js';
import { TooltipMarkupStyleCreator, createTooltipMarkup, retrieveVisualColorForTooltipMarker } from 'echarts/lib/component/tooltip/tooltipMarkup.js';
import { convertToColorString, makeValueReadable } from 'echarts/lib/util/format.js';
import LegendVisualProvider from 'echarts/lib/visual/LegendVisualProvider.js';
import type { BulletEncode, SynergyBulletSeriesOption } from './types.js';
import { BULLET_SERIES } from '../../constants.js';
import type { GlobalModel } from '../../types.js';

/** Original ECharts tooltip marker renderer, retained for marker types this series does not customize. */
// eslint-disable-next-line @typescript-eslint/unbound-method
const originalMakeTooltipMarker = TooltipMarkupStyleCreator.prototype.makeTooltipMarker;

/** Renders bullet value markers as thin lines while preserving ECharts rendering for other marker types. */
TooltipMarkupStyleCreator.prototype.makeTooltipMarker = function makeTooltipMarker(
  this: TooltipMarkupStyleCreator,
  markerType: Parameters<TooltipMarkupStyleCreator['makeTooltipMarker']>[0],
  colorStr: Parameters<TooltipMarkupStyleCreator['makeTooltipMarker']>[1],
  renderMode: Parameters<TooltipMarkupStyleCreator['makeTooltipMarker']>[2],
): ReturnType<TooltipMarkupStyleCreator['makeTooltipMarker']> {
  if (markerType !== BULLET_SERIES.VALUE_MARKER_TYPE) {
    return originalMakeTooltipMarker.call(this, markerType, colorStr, renderMode);
  }

  if (renderMode === 'html') {
    const marker = format.getTooltipMarker({
      color: colorStr,
      extraCssText: `height:${BULLET_SERIES.VALUE_MARKER_HEIGHT}px;width:${BULLET_SERIES.VALUE_MARKER_WIDTH}px;vertical-align:middle;`,
      renderMode,
    });
    return typeof marker === 'string' ? marker : marker.content;
  }

  return this.wrapRichTextStyle('', {
    backgroundColor: colorStr,
    height: BULLET_SERIES.VALUE_MARKER_HEIGHT,
    width: BULLET_SERIES.VALUE_MARKER_WIDTH,
  });
};

/**
 * Selects the category or time axis as the base dimension, defaulting to the horizontal axis
 * when neither axis uses one of those types.
 */
const getBaseAxisDimension = (model: SeriesModel<SynergyBulletSeriesOption>, ecModel: GlobalModel): 'x' | 'y' => {
  const xType = ecModel.getComponent('xAxis', model.get('xAxisIndex') ?? 0)?.get('type');
  const yType = ecModel.getComponent('yAxis', model.get('yAxisIndex') ?? 0)?.get('type');
  /** Finds the first axis dimension whose type matches the requested type. */
  const findDimension = (type: string): 'x' | 'y' | undefined => {
    if (xType === type) return 'x';
    if (yType === type) return 'y';
    return undefined;
  };
  return findDimension('category') ?? findDimension('time') ?? 'x';
};

/**
 * Completes the series encode mapping with its category axis and the range dimensions
 * used for coordinates and tooltips.
 */
const getEncode = (encode: BulletEncode | undefined, baseAxisDimension: 'x' | 'y'): BulletEncode => {
  const rangeDimensions = ['start', 'end', 'current'];
  const valueAxis = baseAxisDimension === 'x' ? 'y' : 'x';

  return {
    ...encode,
    [baseAxisDimension]: encode?.[baseAxisDimension] ?? 'category',
    tooltip: encode?.tooltip ?? rangeDimensions,
    [valueAxis]: rangeDimensions,
  };
};

/** ECharts model for bullet-series data, encoding, legends, and tooltip content. */
export class SynergyBulletSeriesModel extends SeriesModel<SynergyBulletSeriesOption> {
  /** ECharts series type identifier for the custom bullet series. */
  static type = `series.${BULLET_SERIES.TYPE_NAME}`;

  /** Coordinate-system components required by this series. */
  static dependencies = ['grid'];

  /** Default configuration used when a bullet series omits its options. */
  static defaultOption: SynergyBulletSeriesOption = {
    clip: true,
    colorBy: 'data',
    coordinateSystem: BULLET_SERIES.COORDINATE_SYSTEM,
    data: [],
    type: BULLET_SERIES.TYPE_NAME,
    // The default values for which synergy tokens are used (e.g. for markerStyle) are in the default synergy theme, as we can apply them per mode there
  };

  type = SynergyBulletSeriesModel.type;

  /** Initializes the series model and its per-item legend provider. */
  init(option: SynergyBulletSeriesOption, parentModel: Model, ecModel: GlobalModel): void {
    super.init(option, parentModel, ecModel);
    // Enable legend selection and rendering per named data item.
    this.legendVisualProvider = new LegendVisualProvider(
      () => this.getData(),
      () => this.getRawData(),
    );
  }

  /** Builds ECharts data dimensions and normalized values for each bullet item. */
  getInitialData(_option: SynergyBulletSeriesOption, ecModel: GlobalModel): List {
    const encode = getEncode(this.get('encode'), getBaseAxisDimension(this, ecModel));
    const normalizedData = (this.get('data') ?? []).map((item, index) => ({
      ...item,
      value: [index, item.start, item.end, item.current],
    }));
    const dimensions = helper.createDimensions(normalizedData, {
      coordDimensions: ['x', 'y'],
      dimensionsDefine: ['category', 'start', 'end', 'current'],
      encodeDefine: encode,
    });
    const seriesData = new List(dimensions, this);
    seriesData.initData(normalizedData);
    return seriesData;
  }

  /** Refreshes the inferred encode mapping after series options change. */
  optionUpdated(): void {
    this.option.encode = getEncode(this.get('encode'), getBaseAxisDimension(this, this.ecModel));
  }

  /** Creates tooltip markup containing the item's current value and displayed range. */
  formatTooltip(dataIndex: number, multipleSeries: boolean): ReturnType<SeriesModel['formatTooltip']> {
    const data = this.getData();
    const globalTooltip = this.ecModel.getComponent('tooltip');
    // Merge series tooltip options with the global tooltip defaults.
    const tooltip = new Model(this.get('tooltip'), globalTooltip, this.ecModel);
    const valueFormatter = tooltip.get('valueFormatter');
    const rawDataIndex = data.getRawIndex(dataIndex);

    /** Formats a value with the configured tooltip formatter or ECharts' readable-number format. */
    const readableValue = (value: number | string) => (
      valueFormatter
        ? valueFormatter(value, rawDataIndex)
        : makeValueReadable(value, 'float', !!this.ecModel.get('useUTC'))
    );
    const itemName = data.getName(dataIndex);
    const hideItemName = !multipleSeries || !itemName.trim();
    const header = itemName
      || this.getBaseAxis()?.scale.getLabel({ value: Number(data.get('category', dataIndex)) });
    const tooltipDimensions = data.mapDimensionsAll('tooltip');
    const showCurrent = tooltipDimensions.includes('current');
    const showRange = tooltipDimensions.includes('start') || tooltipDimensions.includes('end');
    const start = data.get('start', dataIndex);
    const end = data.get('end', dataIndex);
    const current = data.get('current', dataIndex);
    return createTooltipMarkup('section', {
      blocks: [
        ...(showCurrent ? [createTooltipMarkup('nameValue', {
          markerColor: convertToColorString(this.getModel('markerStyle').getItemStyle().fill ?? ''),
          markerType: BULLET_SERIES.VALUE_MARKER_TYPE,
          name: itemName,
          noName: hideItemName,
          rawDataIndex,
          value: current,
        })] : []),
        ...(showRange ? [createTooltipMarkup('nameValue', {
          markerColor: retrieveVisualColorForTooltipMarker(this, dataIndex),
          markerType: 'item',
          name: itemName,
          noName: hideItemName || showCurrent,
          rawDataIndex,
          value: [start, end],
          valueFormatter: () => `${readableValue(start)} - ${readableValue(end)}`,
        })] : []),
      ],
      header,
      noHeader: multipleSeries || !header,
      sortParam: current,
      valueFormatter,
    });
  }
}
