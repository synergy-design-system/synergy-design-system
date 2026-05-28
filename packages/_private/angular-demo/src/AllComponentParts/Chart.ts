import { Component } from '@angular/core';
import { SynChartComponent } from '@synergy-design-system/angular/components/chart';
import { mockData } from '@synergy-design-system/demo-utilities';

@Component({
  selector: 'demo-chart',
  standalone: true,
  imports: [
    SynChartComponent,
  ],
  template: `
    <syn-chart [config]="lineChartConfig"></syn-chart>
  `,
})
export class Chart {
  lineChartConfig = mockData('lineChartConfig');
}
