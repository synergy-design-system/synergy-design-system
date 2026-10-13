import type {
  DonutSeriesPresetOptions, ECConfig, GaugeSeriesPresetOptions, LineSeriesOption,
  SegmentSeriesPresetOptions,
} from '@synergy-design-system/components/components/chart/types.js';
import { formatter } from '@synergy-design-system/components/components/chart/index.js';

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
  formatter: {
    max: formatter.unitFormatter('°C'),
    min: formatter.unitFormatter('°C'),
    value: formatter.unitFormatter('°C'),
  },
  max: 120,
  min: 10,
  sections: {
    boundaries: [10, 40, 70, 120],
    show: true,
  },
  trend: {
    direction: 'down',
    show: true,
    value: '6.5%',
  },
  value: 82,
};

export const donutChartConfigObject: DonutSeriesPresetOptions = {
  data: [
    { label: 'Angular', value: 10 },
    { label: 'React', value: 20 },
    { label: 'Vue', value: 30 },
    { label: 'Svelte', value: 40 },
  ],
  radius: '70%',
};

export const segmentChartConfigObject: SegmentSeriesPresetOptions = {
  data: [
    { label: 'Segment A', value: 70, weight: 0.7 },
    { label: 'Segment B', value: 55, weight: 0.5 },
    { label: 'Segment C', value: 30, weight: 0.4},
    { label: 'Segment D', value: 50, weight: 1},
  ],
};
