import { List, SeriesModel, helper } from 'echarts/core';
import type { SegmentChartModelOption } from './types.js';

export class SynergySegmentChartSeriesModel extends SeriesModel {
  static type = 'series.synergySegmentChart';

  static defaultOption: SegmentChartModelOption = {
    data: [],
    type: 'synergySegmentChart',
  };

  type = SynergySegmentChartSeriesModel.type;

  getInitialData(option: SegmentChartModelOption): List {
    const seriesData = option.data ?? [];

    const dimensions = helper.createDimensions(seriesData, {
      coordDimensions: ['value'],
    });

    const list = new List(dimensions, this);
    list.initData(seriesData);

    return list;
  }
}
