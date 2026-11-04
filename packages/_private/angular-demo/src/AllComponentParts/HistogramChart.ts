import { Component } from '@angular/core';
import { SynChartComponent } from '@synergy-design-system/angular/components/chart';
import { charts } from '@synergy-design-system/demo-utilities';

@Component({
  selector: 'demo-histogram-chart',
  standalone: true,
  imports: [
    SynChartComponent,
  ],
  template: `
    <syn-chart [config]="histogramChartConfig"></syn-chart>
  `,
})
export class HistogramChart {
  histogramChartConfig = charts.histogramChartConfigCallback;
}
