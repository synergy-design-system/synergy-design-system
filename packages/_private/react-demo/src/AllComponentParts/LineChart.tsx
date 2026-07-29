import '@synergy-design-system/components/components/chart/chart.js';
import type { ChartConfigCallback } from '@synergy-design-system/components/components/chart/types.js';
import { mockData } from '@synergy-design-system/demo-utilities';

const lineChartConfig: ChartConfigCallback = (handle) => {
  handle.baseConfig(mockData('generalChartConfig'))
    .seriesLine(mockData('lineChartSeriesData'))
    .legendShow();
};

export const LineChart = () => (
  <syn-chart config={lineChartConfig} />
);
