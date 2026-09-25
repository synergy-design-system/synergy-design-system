import filter from 'echarts/lib/processor/dataFilter.js';
import type { EChartsExtensionInstallRegisters } from '../../types.js';
import { SynergySegmentSeriesModel } from './segment-model.js';
import { SynergySegmentView } from './segment-view.js';
import { SEGMENT_SERIES } from '../../constants.js';

export function segmentInstall(registers: EChartsExtensionInstallRegisters) {
  registers.registerChartView(SynergySegmentView);
  registers.registerSeriesModel(SynergySegmentSeriesModel);
  registers.registerProcessor(filter(SEGMENT_SERIES.TYPE_NAME) as Parameters<typeof registers.registerProcessor>[0]);
}
