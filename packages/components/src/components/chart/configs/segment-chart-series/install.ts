import type { EChartsExtensionInstallRegisters } from 'echarts/types/src/extension.js';
import { SynergySegmentChartSeriesModel } from './segment-chart-series-model.js';
import { SynergySegmentChartView } from './segment-chart-series-view.js';

export function segmentChartInstall(registers: EChartsExtensionInstallRegisters) {
  // @ts-expect-error - I don't know where this typescript error comes from. Even in echarts itself it is available..
  registers.registerChartView(SynergySegmentChartView);
  registers.registerSeriesModel(SynergySegmentChartSeriesModel);
}
