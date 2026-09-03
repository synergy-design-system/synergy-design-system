import filter from 'echarts/lib/processor/dataFilter.js';
import { SynergyDonutSeriesModel } from './donut-series-model.js';
import { SynergyDonutView } from './donut-series-view.js';
import { DONUT_SERIES } from '../constants.js';
import type { EChartsExtensionInstallRegisters } from '../types.js';

export function donutInstall(registers: EChartsExtensionInstallRegisters) {
  registers.registerChartView(SynergyDonutView);
  registers.registerSeriesModel(SynergyDonutSeriesModel);
  registers.registerProcessor(filter(DONUT_SERIES.TYPE_NAME) as Parameters<typeof registers.registerProcessor>[0]);
}
