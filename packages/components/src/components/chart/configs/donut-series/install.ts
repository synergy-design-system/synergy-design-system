import type { EChartsExtensionInstallRegisters } from 'echarts/types/src/extension.js';
import filter from 'echarts/lib/processor/dataFilter.js';
import { SynergyDonutSeriesModel } from './donut-series-model.js';
import { SynergyDonutView } from './donut-series-view.js';
import { DONUT_SERIES } from '../constants.js';

export function donutInstall(registers: EChartsExtensionInstallRegisters) {
  // @ts-expect-error - I don't know where this typescript error comes from. Even in echarts itself it is available..
  registers.registerChartView(SynergyDonutView);
  registers.registerSeriesModel(SynergyDonutSeriesModel);
  registers.registerProcessor(filter(DONUT_SERIES.TYPE_NAME));
}
