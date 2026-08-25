import type { EChartsExtensionInstallRegisters } from 'echarts/types/src/extension.js';
import { SynergyDonutSeriesModel } from './donut-series-model.js';
import { SynergyDonutView } from './donut-series-view.js';

export function donutInstall(registers: EChartsExtensionInstallRegisters) {
  // @ts-expect-error - I don't know where this typescript error comes from. Even in echarts itself it is available..
  registers.registerChartView(SynergyDonutView);
  registers.registerSeriesModel(SynergyDonutSeriesModel);
}
