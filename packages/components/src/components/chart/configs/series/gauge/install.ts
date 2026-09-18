import type { EChartsExtensionInstallRegisters } from '../../types.js';
import { SynergyGaugeSeriesModel } from './gauge-model.js';
import { SynergyGaugeView } from './gauge-view.js';

export function gaugeInstall(registers: EChartsExtensionInstallRegisters) {
  registers.registerChartView(SynergyGaugeView);
  registers.registerSeriesModel(SynergyGaugeSeriesModel);
}
