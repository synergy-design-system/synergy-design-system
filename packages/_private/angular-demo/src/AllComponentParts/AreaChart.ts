import { Component } from '@angular/core';
import { SynChartComponent } from '@synergy-design-system/angular/components/chart';
import { charts } from '@synergy-design-system/demo-utilities';

@Component({
  selector: 'demo-area-chart',
  standalone: true,
  imports: [
    SynChartComponent,
  ],
  template: `
    <syn-chart [config]="areaChartConfig"></syn-chart>
  `,
})
export class AreaChart {
  areaChartConfig = charts.areaChartConfigCallback;
}
