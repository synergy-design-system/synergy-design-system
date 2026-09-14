import { Component } from '@angular/core';
import { SynChartComponent } from '@synergy-design-system/angular/components/chart';
import { charts } from '@synergy-design-system/demo-utilities';

@Component({
  selector: 'demo-gauge-chart',
  standalone: true,
  imports: [
    SynChartComponent,
  ],
  template: `
    <syn-chart [config]="gaugeChartConfig"></syn-chart>
  `,
})
export class GaugeChart {
  gaugeChartConfig = charts.gaugeChartConfigCallback;
}
