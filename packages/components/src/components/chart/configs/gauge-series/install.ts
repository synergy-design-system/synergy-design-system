import type { EChartsExtensionInstallRegisters } from 'echarts/types/src/extension.js';
import { SynergyGaugeSeriesModel } from './gauge-series-model.js';
import { SynergyGaugeView } from './gauge-series-view.js';

export function gaugeInstall(registers: EChartsExtensionInstallRegisters) {
  // @ts-expect-error - I don't know where this typescript error comes from. Even in echarts itself it is available.
  registers.registerChartView(SynergyGaugeView);
  registers.registerSeriesModel(SynergyGaugeSeriesModel);
}
