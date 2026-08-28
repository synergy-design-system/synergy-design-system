import { List, SeriesModel, helper } from 'echarts/core';
import type { DonutModelOption } from './types.js';
import { DONUT_SERIES } from '../constants.js';

export class SynergyDonutSeriesModel extends SeriesModel {
  static type = `series.${DONUT_SERIES.TYPE_NAME}`;

  static defaultOption: DonutModelOption = {
    data: [],
    type: DONUT_SERIES.TYPE_NAME,
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
