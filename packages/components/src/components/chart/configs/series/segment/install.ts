import type { EChartsExtensionInstallRegisters } from '../../types.js';
import { SynergySegmentSeriesModel } from './segment-model.js';
import { SynergySegmentView } from './segment-view.js';

export function segmentInstall(registers: EChartsExtensionInstallRegisters) {
  registers.registerChartView(SynergySegmentView);
  registers.registerSeriesModel(SynergySegmentSeriesModel);
}
