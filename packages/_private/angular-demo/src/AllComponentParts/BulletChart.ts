import { Component } from '@angular/core';
import { SynChartComponent } from '@synergy-design-system/angular/components/chart';
import { charts } from '@synergy-design-system/demo-utilities';

@Component({
  selector: 'demo-bullet-chart',
  standalone: true,
  imports: [
    SynChartComponent,
  ],
  template: `
    <syn-chart [config]="bulletChartConfig"></syn-chart>
  `,
})
export class BulletChart {
  bulletChartConfig = charts.bulletChartConfigCallback;
}
