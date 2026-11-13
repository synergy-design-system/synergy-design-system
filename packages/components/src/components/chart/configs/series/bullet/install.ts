import filter from 'echarts/lib/processor/dataFilter.js';
import type { EChartsExtensionInstallRegisters } from '../../types.js';
import { BULLET_SERIES } from '../../constants.js';
import { SynergyBulletSeriesModel } from './bullet-model.js';
import { SynergyBulletView } from './bullet-view.js';

export function bulletInstall(registers: EChartsExtensionInstallRegisters) {
  registers.registerChartView(SynergyBulletView);
  registers.registerSeriesModel(SynergyBulletSeriesModel);
  registers.registerProcessor(filter(BULLET_SERIES.TYPE_NAME) as Parameters<typeof registers.registerProcessor>[0]);
}
