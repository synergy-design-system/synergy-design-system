import type { EChartsExtensionInstallRegisters } from '../types.js';
import { SynergyGaugeSeriesModel } from './gauge-series-model.js';
import { SynergyGaugeView } from './gauge-series-view.js';

export function gaugeInstall(registers: EChartsExtensionInstallRegisters) {
  registers.registerChartView(SynergyGaugeView);
  registers.registerSeriesModel(SynergyGaugeSeriesModel);
}
