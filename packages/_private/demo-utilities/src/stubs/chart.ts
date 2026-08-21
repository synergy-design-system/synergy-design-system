import type { ECConfig, GaugeSeriesPresetOptions, LineSeriesOption } from '@synergy-design-system/components/components/chart/types.js';

export const lineChartSeriesData: LineSeriesOption[] = [
  { data: [150, 230, 224, 218, 135, 147, 260], name: 'Visits', type: 'line' },
  { data: [80, 120, 100, 134, 90, 110, 200], name: 'Unique', type: 'line' },
];

export const generalChartConfig: ECConfig = {
  xAxis: { data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], type: 'category' },
  yAxis: { type: 'value' },
};

export const lineChartConfigObject: ECConfig = {
  series: lineChartSeriesData,
  ...generalChartConfig,
};

export const gaugeChartConfigObject: GaugeSeriesPresetOptions = {
  max: 120,
  min: 10,
  sections: {
    boundaries: [10, 40, 70, 120],
  },
  showSections: true,
  showTrend: true,
  trend: {
    direction: 'down',
    value: '6.5%',
  },
  unit: '%',
  value: 82,
};
