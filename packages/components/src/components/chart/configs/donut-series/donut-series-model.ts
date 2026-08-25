import { List, SeriesModel, helper } from 'echarts/core';
import type { DonutModelOption } from './types.js';

export class SynergyDonutSeriesModel extends SeriesModel {
  static type = 'series.synergyDonut';

  static defaultOption: DonutModelOption = {
    data: [],
    type: 'synergyDonut',
  };

  type = SynergyDonutSeriesModel.type;

  getInitialData(option: DonutModelOption): List {
    const seriesData = option.data ?? [];

    const dimensions = helper.createDimensions(seriesData, {
      coordDimensions: ['value'],
    });

    const list = new List(dimensions, this);
    list.initData(seriesData);

    return list;
  }
}
