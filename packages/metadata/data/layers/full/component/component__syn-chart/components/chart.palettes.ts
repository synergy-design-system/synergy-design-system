import { type ResolvedTokensName } from './themes/utilities.js';

/**
 * The available color palettes for `syn-chart`.
 * Palette names correspond 1:1 to the Synergy design token groups.
 *
 * - `categorical` — 12 distinct colors for comparing unrelated data series
 * - `sequential-01` … `sequential-07` — 10-step single-hue ramps, ordered from darkest to brightest
 *   (`01`=primary, `02`=accent, `03`=muted, `04`=purple, `05`=teal, `06`=magenta, `07`=neutral)
 * - `sequential-status-critical/error/info/success/warning` — 10-step status color ramps, ordered from darkest to brightest
 */
export type ChartPalette =
  | 'categorical'
  | 'sequential-01'
  | 'sequential-02'
  | 'sequential-03'
  | 'sequential-04'
  | 'sequential-05'
  | 'sequential-06'
  | 'sequential-07'
  | 'sequential-status-critical'
  | 'sequential-status-error'
  | 'sequential-status-info'
  | 'sequential-status-success'
  | 'sequential-status-warning';

/** Maps each palette name to the ordered list of token names to resolve. */
export const PALETTE_TOKENS: Record<ChartPalette, ResolvedTokensName[]> = {
  categorical: [
    'SynChartCategorical01', 'SynChartCategorical02', 'SynChartCategorical03',
    'SynChartCategorical04', 'SynChartCategorical05', 'SynChartCategorical06',
    'SynChartCategorical07', 'SynChartCategorical08', 'SynChartCategorical09',
    'SynChartCategorical10', 'SynChartCategorical11', 'SynChartCategorical12',
  ],
  'sequential-01': [
    'SynChartSequential01_100', 'SynChartSequential01_90', 'SynChartSequential01_80',
    'SynChartSequential01_70', 'SynChartSequential01_60', 'SynChartSequential01_50',
    'SynChartSequential01_40', 'SynChartSequential01_30', 'SynChartSequential01_20',
    'SynChartSequential01_10',
  ],
  'sequential-02': [
    'SynChartSequential02_100', 'SynChartSequential02_90', 'SynChartSequential02_80',
    'SynChartSequential02_70', 'SynChartSequential02_60', 'SynChartSequential02_50',
    'SynChartSequential02_40', 'SynChartSequential02_30', 'SynChartSequential02_20',
    'SynChartSequential02_10',
  ],
  'sequential-03': [
    'SynChartSequential03_100', 'SynChartSequential03_90', 'SynChartSequential03_80',
    'SynChartSequential03_70', 'SynChartSequential03_60', 'SynChartSequential03_50',
    'SynChartSequential03_40', 'SynChartSequential03_30', 'SynChartSequential03_20',
    'SynChartSequential03_10',
  ],
  'sequential-04': [
    'SynChartSequential04_100', 'SynChartSequential04_90', 'SynChartSequential04_80',
    'SynChartSequential04_70', 'SynChartSequential04_60', 'SynChartSequential04_50',
    'SynChartSequential04_40', 'SynChartSequential04_30', 'SynChartSequential04_20',
    'SynChartSequential04_10',
  ],
  'sequential-05': [
    'SynChartSequential05_100', 'SynChartSequential05_90', 'SynChartSequential05_80',
    'SynChartSequential05_70', 'SynChartSequential05_60', 'SynChartSequential05_50',
    'SynChartSequential05_40', 'SynChartSequential05_30', 'SynChartSequential05_20',
    'SynChartSequential05_10',
  ],
  'sequential-06': [
    'SynChartSequential06_100', 'SynChartSequential06_90', 'SynChartSequential06_80',
    'SynChartSequential06_70', 'SynChartSequential06_60', 'SynChartSequential06_50',
    'SynChartSequential06_40', 'SynChartSequential06_30', 'SynChartSequential06_20',
    'SynChartSequential06_10',
  ],
  'sequential-07': [
    'SynChartSequential07_100', 'SynChartSequential07_90', 'SynChartSequential07_80',
    'SynChartSequential07_70', 'SynChartSequential07_60', 'SynChartSequential07_50',
    'SynChartSequential07_40', 'SynChartSequential07_30', 'SynChartSequential07_20',
    'SynChartSequential07_10',
  ],
  'sequential-status-critical': [
    'SynChartSequentialStatusCritical100', 'SynChartSequentialStatusCritical90',
    'SynChartSequentialStatusCritical80', 'SynChartSequentialStatusCritical70',
    'SynChartSequentialStatusCritical60', 'SynChartSequentialStatusCritical50',
    'SynChartSequentialStatusCritical40', 'SynChartSequentialStatusCritical30',
    'SynChartSequentialStatusCritical20', 'SynChartSequentialStatusCritical10',
  ],
  'sequential-status-error': [
    'SynChartSequentialStatusError100', 'SynChartSequentialStatusError90',
    'SynChartSequentialStatusError80', 'SynChartSequentialStatusError70',
    'SynChartSequentialStatusError60', 'SynChartSequentialStatusError50',
    'SynChartSequentialStatusError40', 'SynChartSequentialStatusError30',
    'SynChartSequentialStatusError20', 'SynChartSequentialStatusError10',
  ],
  'sequential-status-info': [
    'SynChartSequentialStatusInfo100', 'SynChartSequentialStatusInfo90',
    'SynChartSequentialStatusInfo80', 'SynChartSequentialStatusInfo70',
    'SynChartSequentialStatusInfo60', 'SynChartSequentialStatusInfo50',
    'SynChartSequentialStatusInfo40', 'SynChartSequentialStatusInfo30',
    'SynChartSequentialStatusInfo20', 'SynChartSequentialStatusInfo10',
  ],
  'sequential-status-success': [
    'SynChartSequentialStatusSuccess100', 'SynChartSequentialStatusSuccess90',
    'SynChartSequentialStatusSuccess80', 'SynChartSequentialStatusSuccess70',
    'SynChartSequentialStatusSuccess60', 'SynChartSequentialStatusSuccess50',
    'SynChartSequentialStatusSuccess40', 'SynChartSequentialStatusSuccess30',
    'SynChartSequentialStatusSuccess20', 'SynChartSequentialStatusSuccess10',
  ],
  'sequential-status-warning': [
    'SynChartSequentialStatusWarning100', 'SynChartSequentialStatusWarning90',
    'SynChartSequentialStatusWarning80', 'SynChartSequentialStatusWarning70',
    'SynChartSequentialStatusWarning60', 'SynChartSequentialStatusWarning50',
    'SynChartSequentialStatusWarning40', 'SynChartSequentialStatusWarning30',
    'SynChartSequentialStatusWarning20', 'SynChartSequentialStatusWarning10',
  ],
};
