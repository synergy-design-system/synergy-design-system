import { Component } from '@angular/core';
import { SynChartComponent } from '@synergy-design-system/angular/components/chart';
import { charts } from '@synergy-design-system/demo-utilities';

@Component({
  selector: 'demo-bar-chart',
  standalone: true,
  imports: [
    SynChartComponent,
  ],
  template: `
    <syn-chart [config]="barChartConfig"></syn-chart>
  `,
})
export class BarChart {
  barChartConfig = charts.barChartConfigCallback;
}
