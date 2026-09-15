import { Component } from '@angular/core';
import { SynChartComponent } from '@synergy-design-system/angular/components/chart';
import { charts } from '@synergy-design-system/demo-utilities';

@Component({
  selector: 'demo-donut-chart',
  standalone: true,
  imports: [
    SynChartComponent,
  ],
  template: `
    <syn-chart [config]="donutChartConfig"></syn-chart>
  `,
})
export class DonutChart {
  donutChartConfig = charts.donutChartConfigCallback;
}
