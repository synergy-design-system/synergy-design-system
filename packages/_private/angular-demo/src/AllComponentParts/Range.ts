import { Component } from '@angular/core';
import { SynRangeComponent } from '@synergy-design-system/angular/components/range';

@Component({
  selector: 'demo-range',
  standalone: true,
  imports: [
    SynRangeComponent,
  ],
  template: `
    <syn-range
      help-text="Controls the volume of the current song"
      label="Volume"
      [max]=100
      [min]=0
      value="50"
    >
      <span slot="prefix">0</span>
      <span slot="suffix">100</span>
    </syn-range>
  `,
})
export class Range {}
