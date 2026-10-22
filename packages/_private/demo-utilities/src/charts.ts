import { ChartConfigCallback } from '@synergy-design-system/components/components/chart/types.js';
import { mockData } from './mockFetch.js';

export const areaChartConfigCallback: ChartConfigCallback = (handle) => {
  handle
    .baseConfig(mockData('generalChartConfig'))
    .seriesArea(mockData('areaChartSeriesData'))
    .legendShow();
};

export const areaRangeChartConfigCallback: ChartConfigCallback = (handle) => {
  handle
    .baseConfig(mockData('generalChartConfig'))
    .seriesAreaRange(mockData('areaRangeChartSeriesData'), { name: 'Visits' })
    .legendShow();
};

export const lineChartConfigCallback: ChartConfigCallback = (handle) => {
  handle
    .baseConfig(mockData('generalChartConfig'))
    .seriesLine(mockData('lineChartSeriesData'))
    .legendShow();
};

export const gaugeChartConfigCallback: ChartConfigCallback = (handle) => {
  handle
    .seriesGauge(mockData('gaugeChartConfigObject'));
};

export const donutChartConfigCallback: ChartConfigCallback = (handle) => {
  handle
    .seriesDonut(mockData('donutChartConfigObject'));
};

export const segmentChartConfigCallback: ChartConfigCallback = (handle) => {
  handle
    .seriesSegment(mockData('segmentChartConfigObject'));
};
