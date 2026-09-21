import { List, SeriesModel, helper } from 'echarts/core';
import type { SegmentModelOption } from './types.js';
import { SEGMENT_CHART_SERIES } from '../../constants.js';

export class SynergySegmentSeriesModel extends SeriesModel {
  static type = `series.${SEGMENT_CHART_SERIES.TYPE_NAME}`;

  static defaultOption: SegmentModelOption = {
    data: [],
    type: 'synSegment',
  };

  type = SynergySegmentSeriesModel.type;

  getInitialData(option: SegmentModelOption): List {
    const seriesData = option.data ?? [];

    const dimensions = helper.createDimensions(seriesData, {
      coordDimensions: ['value'],
    });

    const list = new List(dimensions, this);
    list.initData(seriesData);

    return list;
  }
}
