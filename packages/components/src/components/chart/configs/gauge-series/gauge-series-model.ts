import { List, SeriesModel, helper } from 'echarts/core';
import type { GaugeModelOption } from './types.js';

export class SynergyGaugeSeriesModel extends SeriesModel {
  static type = 'series.synergyGauge';

  static defaultOption: GaugeModelOption = {
    data: [0],
    type: 'synergyGauge',
  };

  type = SynergyGaugeSeriesModel.type;

  getInitialData(option: GaugeModelOption): List {
    const seriesData = option.data ?? [];

    const dimensions = helper.createDimensions(seriesData, {
      coordDimensions: ['value'],
    });

    const list = new List(dimensions, this);
    list.initData(seriesData);

    return list;
  }
}
