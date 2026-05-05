import { Component } from '@angular/core';
import { range1272ChangeValueButton } from '@synergy-design-system/demo-utilities';
import { SynButtonComponent } from '@synergy-design-system/angular/components/button';
import { SynRangeComponent } from '@synergy-design-system/angular/components/range';

@Component({
  selector: 'demo-range',
  standalone: true,
  imports: [
    SynButtonComponent,
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

    <syn-range
      data-testid="range-1272-programatic-value-change"
      label="Regression #1272"
      [max]=100
      [min]=0
      value="50"
    ></syn-range>
    <syn-button
      data-testid="range-1272-change-value-button"
      (click)="range1272ChangeValueButton($event)"
    >Programatically set value</syn-button>
  `,
})
export class Range {
  protected readonly range1272ChangeValueButton = range1272ChangeValueButton;
}
