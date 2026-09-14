import { Component } from '@angular/core';
import { SynChartComponent } from '@synergy-design-system/angular/components/chart';
import { charts } from '@synergy-design-system/demo-utilities';

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
  lineChartConfig = charts.lineChartConfigCallback;
}
