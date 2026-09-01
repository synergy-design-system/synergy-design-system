import {
  List, SeriesModel, helper,
} from 'echarts/core';
// @ts-expect-error - ECharts package does not ship this module declaration path.
import LegendVisualProvider from 'echarts/lib/visual/LegendVisualProvider.js';
import { DONUT_SERIES } from '../constants.js';
import type { DonutSeriesOption } from './types.js';

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

  init(...args): void {
    super.init(...args);

    // Enable legend selection and rendering per named data item.
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
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
