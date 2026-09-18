import {
  List, type Model, SeriesModel, helper,
} from 'echarts/core';
import LegendVisualProvider from 'echarts/lib/visual/LegendVisualProvider.js';
import { DONUT_SERIES } from '../../constants.js';
import type { DonutDataValue, DonutSeriesOption, ResolvedDonutDataItem } from './types.js';
import type { GlobalModel } from '../../types.js';
import { resolveText, sanitizeFiniteNumber } from '../../utilities.js';

/**
 * Converts a donut data value into a normalized donut data item.
 *
 * @param dataItem - Primitive numeric value or configured donut data object.
 * @returns The normalized donut data item.
 */
const normalizeDonutDataItem = (dataItem: DonutDataValue): ResolvedDonutDataItem => {
  if (typeof dataItem !== 'object') {
    const value = sanitizeFiniteNumber(dataItem);
    return { label: String(value), value };
  }

  const value = sanitizeFiniteNumber(dataItem.value);
  const hasLabel = Object.prototype.hasOwnProperty.call(dataItem, 'label');
  const hasName = Object.prototype.hasOwnProperty.call(dataItem, 'name');
  const label = hasLabel ? resolveText(dataItem.label, value) : String(value);
  const name = hasName ? resolveText(dataItem.name, value) : undefined;
  const { prefixIcon } = dataItem;
  return {
    label,
    ...(name ? { name } : {}),
    ...(prefixIcon ? { prefixIcon } : {}),
    value,
  };
};

export class SynergyDonutSeriesModel extends SeriesModel<DonutSeriesOption> {
  static type = `series.${DONUT_SERIES.TYPE_NAME}`;

  static defaultOption: Omit<DonutSeriesOption, 'type'> = {
    bottom: 0,
    center: ['50%', '50%'],
    colorBy: 'data',
    data: [],
    left: 0,
    radius: '100%',
    right: 0,
    top: 0,
  };

  type = SynergyDonutSeriesModel.type;

  init(option: DonutSeriesOption, parentModel: Model, ecModel: GlobalModel): void {
    super.init(option, parentModel, ecModel);

    // Enable legend selection and rendering per named data item.
    this.legendVisualProvider = new LegendVisualProvider(
      () => this.getData(),
      () => this.getRawData(),
    );
  }

  getInitialData(option: DonutSeriesOption): List {
    const seriesData = option.data ?? [];
    const convertedData = seriesData.map(normalizeDonutDataItem);

    const dimensions = helper.createDimensions(convertedData, {
      coordDimensions: ['value'],
    });

    const list = new List(dimensions, this);
    list.initData(convertedData);

    return list;
  }
}
