import '@synergy-design-system/components/components/chart/chart.js';
import { mockData } from '@synergy-design-system/demo-utilities';
import { html } from 'lit';
import type { ChartConfigCallback } from '@synergy-design-system/components/components/chart/types.js';

const lineChartConfig: ChartConfigCallback = (handle) => {
  handle.baseConfig(mockData('generalChartConfig'))
    .seriesLine(mockData('lineChartSeriesData'))
    .legendShow();
};

export const LineChart = () => html`
  <syn-chart
    .config=${lineChartConfig}
  ></syn-chart>
`;
