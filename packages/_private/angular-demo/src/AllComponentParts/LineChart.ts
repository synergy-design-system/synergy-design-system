import { Component } from '@angular/core';
import { SynChartComponent } from '@synergy-design-system/angular/components/chart';
import type { ChartConfigCallback } from '@synergy-design-system/components/components/chart/types.js';
import { mockData } from '@synergy-design-system/demo-utilities';

@Component({
  selector: 'demo-line-chart',
  standalone: true,
  imports: [
    SynChartComponent,
  ],
  template: `
    <syn-chart [config]="lineChartConfig"></syn-chart>
  `,
})
export class LineChart {
  lineChartConfig: ChartConfigCallback = (handle) => {
    handle
    .baseConfig(mockData('generalChartConfig'))
    .seriesLine(mockData('lineChartSeriesData'))
    .legendShow();
  };
}
