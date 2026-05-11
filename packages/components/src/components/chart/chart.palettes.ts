/**
 * The available color palettes for `syn-chart`.
 * Palette names correspond 1:1 to the Synergy design token groups.
 *
 * - `categorical` — 12 distinct colors for comparing unrelated data series
 * - `sequential-01` … `sequential-07` — 10-step single-hue ramps, ordered from darkest to brightest
 *   (`01`=primary, `02`=accent, `03`=muted, `04`=purple, `05`=teal, `06`=magenta, `07`=neutral)
 * - `sequential-status-critical/error/info/success/warning` — 10-step status color ramps, ordered from darkest to brightest
 */
export type SynChartPalette =
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

/** Maps each palette name to the ordered list of CSS custom property names to resolve. */
export const PALETTE_TOKENS: Record<SynChartPalette, string[]> = {
  categorical: [
    '--syn-categorical-01', '--syn-categorical-02', '--syn-categorical-03',
    '--syn-categorical-04', '--syn-categorical-05', '--syn-categorical-06',
    '--syn-categorical-07', '--syn-categorical-08', '--syn-categorical-09',
    '--syn-categorical-10', '--syn-categorical-11', '--syn-categorical-12',
  ],
  'sequential-01': [
    '--syn-sequential-01-100', '--syn-sequential-01-90', '--syn-sequential-01-80',
    '--syn-sequential-01-70', '--syn-sequential-01-60', '--syn-sequential-01-50',
    '--syn-sequential-01-40', '--syn-sequential-01-30', '--syn-sequential-01-20',
    '--syn-sequential-01-10',
  ],
  'sequential-02': [
    '--syn-sequential-02-100', '--syn-sequential-02-90', '--syn-sequential-02-80',
    '--syn-sequential-02-70', '--syn-sequential-02-60', '--syn-sequential-02-50',
    '--syn-sequential-02-40', '--syn-sequential-02-30', '--syn-sequential-02-20',
    '--syn-sequential-02-10',
  ],
  'sequential-03': [
    '--syn-sequential-03-100', '--syn-sequential-03-90', '--syn-sequential-03-80',
    '--syn-sequential-03-70', '--syn-sequential-03-60', '--syn-sequential-03-50',
    '--syn-sequential-03-40', '--syn-sequential-03-30', '--syn-sequential-03-20',
    '--syn-sequential-03-10',
  ],
  'sequential-04': [
    '--syn-sequential-04-100', '--syn-sequential-04-90', '--syn-sequential-04-80',
    '--syn-sequential-04-70', '--syn-sequential-04-60', '--syn-sequential-04-50',
    '--syn-sequential-04-40', '--syn-sequential-04-30', '--syn-sequential-04-20',
    '--syn-sequential-04-10',
  ],
  'sequential-05': [
    '--syn-sequential-05-100', '--syn-sequential-05-90', '--syn-sequential-05-80',
    '--syn-sequential-05-70', '--syn-sequential-05-60', '--syn-sequential-05-50',
    '--syn-sequential-05-40', '--syn-sequential-05-30', '--syn-sequential-05-20',
    '--syn-sequential-05-10',
  ],
  'sequential-06': [
    '--syn-sequential-06-100', '--syn-sequential-06-90', '--syn-sequential-06-80',
    '--syn-sequential-06-70', '--syn-sequential-06-60', '--syn-sequential-06-50',
    '--syn-sequential-06-40', '--syn-sequential-06-30', '--syn-sequential-06-20',
    '--syn-sequential-06-10',
  ],
  'sequential-07': [
    '--syn-sequential-07-100', '--syn-sequential-07-90', '--syn-sequential-07-80',
    '--syn-sequential-07-70', '--syn-sequential-07-60', '--syn-sequential-07-50',
    '--syn-sequential-07-40', '--syn-sequential-07-30', '--syn-sequential-07-20',
    '--syn-sequential-07-10',
  ],
  'sequential-status-critical': [
    '--syn-sequential-status-critical-100', '--syn-sequential-status-critical-90',
    '--syn-sequential-status-critical-80', '--syn-sequential-status-critical-70',
    '--syn-sequential-status-critical-60', '--syn-sequential-status-critical-50',
    '--syn-sequential-status-critical-40', '--syn-sequential-status-critical-30',
    '--syn-sequential-status-critical-20', '--syn-sequential-status-critical-10',
  ],
  'sequential-status-error': [
    '--syn-sequential-status-error-100', '--syn-sequential-status-error-90',
    '--syn-sequential-status-error-80', '--syn-sequential-status-error-70',
    '--syn-sequential-status-error-60', '--syn-sequential-status-error-50',
    '--syn-sequential-status-error-40', '--syn-sequential-status-error-30',
    '--syn-sequential-status-error-20', '--syn-sequential-status-error-10',
  ],
  'sequential-status-info': [
    '--syn-sequential-status-info-100', '--syn-sequential-status-info-90',
    '--syn-sequential-status-info-80', '--syn-sequential-status-info-70',
    '--syn-sequential-status-info-60', '--syn-sequential-status-info-50',
    '--syn-sequential-status-info-40', '--syn-sequential-status-info-30',
    '--syn-sequential-status-info-20', '--syn-sequential-status-info-10',
  ],
  'sequential-status-success': [
    '--syn-sequential-status-success-100', '--syn-sequential-status-success-90',
    '--syn-sequential-status-success-80', '--syn-sequential-status-success-70',
    '--syn-sequential-status-success-60', '--syn-sequential-status-success-50',
    '--syn-sequential-status-success-40', '--syn-sequential-status-success-30',
    '--syn-sequential-status-success-20', '--syn-sequential-status-success-10',
  ],
  'sequential-status-warning': [
    '--syn-sequential-status-warning-100', '--syn-sequential-status-warning-90',
    '--syn-sequential-status-warning-80', '--syn-sequential-status-warning-70',
    '--syn-sequential-status-warning-60', '--syn-sequential-status-warning-50',
    '--syn-sequential-status-warning-40', '--syn-sequential-status-warning-30',
    '--syn-sequential-status-warning-20', '--syn-sequential-status-warning-10',
  ],
};
