import type { ECConfig } from '@synergy-design-system/components/components/chart/types.js';

export const lineChartConfig: ECConfig = {
  series: [
    { data: [150, 230, 224, 218, 135, 147, 260], name: 'Visits', type: 'line' },
    { data: [80, 120, 100, 134, 90, 110, 200], name: 'Unique', type: 'line' },
  ],
  title: { text: 'Weekly Traffic (Line)' },
  tooltip: { trigger: 'axis' },
  xAxis: { data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], type: 'category' },
  yAxis: { type: 'value' },
};
