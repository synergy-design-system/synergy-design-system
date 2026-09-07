import {
  List, type Model, SeriesModel, helper,
} from 'echarts/core';
import LegendVisualProvider from 'echarts/lib/visual/LegendVisualProvider.js';
import { DONUT_SERIES } from '../constants.js';
import type { DonutSeriesOption } from './types.js';
import type { GlobalModel } from '../types.js';

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

    const dimensions = helper.createDimensions(seriesData, {
      coordDimensions: ['value'],
    });

    const list = new List(dimensions, this);
    list.initData(seriesData);

    return list;
  }
}
