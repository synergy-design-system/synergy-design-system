import {
  List, type Model, SeriesModel, helper,
} from 'echarts/core.js';
import LegendVisualProvider from 'echarts/lib/visual/LegendVisualProvider.js';
import type { SegmentSeriesOption } from './types.js';
import { SEGMENT_SERIES } from '../../constants.js';
import type { GlobalModel } from '../../types.js';

export class SynergySegmentSeriesModel extends SeriesModel<SegmentSeriesOption> {
  static type = `series.${SEGMENT_SERIES.TYPE_NAME}`;

  static defaultOption: Omit<SegmentSeriesOption, 'type'> = {
    backgroundStyle: {
      borderWidth: 0,
    },
    colorBy: 'data',
    data: [],
    gap: SEGMENT_SERIES.GAP_DEFAULT,
    gapOrientation: 0,
    itemStyle: {
      borderWidth: 0,
    },
    max: SEGMENT_SERIES.MAX_DEFAULT,
    min: SEGMENT_SERIES.MIN_DEFAULT,
  };

  type = SynergySegmentSeriesModel.type;

  init(option: SegmentSeriesOption, parentModel: Model, ecModel: GlobalModel): void {
    super.init(option, parentModel, ecModel);

    // Enable legend selection and rendering per named data item.
    this.legendVisualProvider = new LegendVisualProvider(
      () => this.getData(),
      () => this.getRawData(),
    );
  }

  getInitialData(option: SegmentSeriesOption): List {
    const seriesData = option.data ?? [];

    const dimensions = helper.createDimensions(seriesData, {
      coordDimensions: ['value'],
    });

    const list = new List(dimensions, this);
    list.initData(seriesData);

    return list;
  }
}
