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
    <syn-chart [option]="lineChartOption"></syn-chart>
  `,
})
export class Chart {
  lineChartOption = mockData('lineChartOption');
}
