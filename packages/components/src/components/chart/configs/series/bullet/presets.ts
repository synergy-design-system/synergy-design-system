import { type ConfigModifier, mergeConfigs } from '../../utilities.js';
import { BULLET_SERIES } from '../../constants.js';
import type { BulletSeriesPresetOptions, SynergyBulletSeriesConfig } from './types.js';

/** Adds a custom `synBullet` series using the direct SeriesModel and ChartView implementation. */
export const seriesBullet = (options: BulletSeriesPresetOptions): ConfigModifier => (config) => {
  const seriesOption: SynergyBulletSeriesConfig = {
    ...options,
    type: BULLET_SERIES.TYPE_NAME,
  };

  return mergeConfigs(config, { series: [seriesOption] }, { arrayStrategy: 'append' });
};
