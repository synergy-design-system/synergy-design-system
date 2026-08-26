import { ChartConfigCallback } from '@synergy-design-system/components/components/chart/types.js';
import { mockData } from './mockFetch.js';

export const lineChartConfigCallback: ChartConfigCallback = (handle) => {
  handle
    .baseConfig(mockData('generalChartConfig'))
    .seriesLine(mockData('lineChartSeriesData'))
    .legendShow();
};
