import { Component } from '@angular/core';
import { SynChartComponent } from '@synergy-design-system/angular/components/chart';
import { charts } from '@synergy-design-system/demo-utilities';

@Component({
  selector: 'demo-area-range-chart',
  standalone: true,
  imports: [
    SynChartComponent,
  ],
  template: `
    <syn-chart [config]="areaRangeChartConfig"></syn-chart>
  `,
})
export class AreaRangeChart {
  areaRangeChartConfig = charts.areaRangeChartConfigCallback;
}
