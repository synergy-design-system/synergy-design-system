import { Component } from '@angular/core';
import { SynChartComponent } from '@synergy-design-system/angular/components/chart';
import { charts } from '@synergy-design-system/demo-utilities';

@Component({
  selector: 'demo-segment-chart',
  standalone: true,
  imports: [
    SynChartComponent,
  ],
  template: `
    <syn-chart [config]="segmentChartConfig"></syn-chart>
  `,
})
export class SegmentChart {
  segmentChartConfig = charts.segmentChartConfigCallback;
}
