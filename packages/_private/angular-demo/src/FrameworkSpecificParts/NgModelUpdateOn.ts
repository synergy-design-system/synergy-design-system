import { Component } from '@angular/core';
import { SynCheckboxComponent, SynInputComponent, SynRangeComponent } from '@synergy-design-system/angular';

@Component({
  selector: 'demo-ng-model-update-on',
  standalone: true,
  imports: [
    SynInputComponent,
    SynCheckboxComponent,
    SynRangeComponent,
  ],
  template: `
    <syn-input data-testid="input-808" [(value)]="inputValue" ></syn-input>
    <syn-input data-testid="input-changed-808" [(value)]="inputValue" ngModelUpdateOn="syn-change"></syn-input>
    <syn-checkbox data-testid="checkbox-808" [(checked)]="checkboxValue"></syn-checkbox>
    <syn-checkbox data-testid="checkbox-changed-808" [(checked)]="checkboxValue" ngModelUpdateOn="syn-blur"></syn-checkbox>
    <syn-range data-testid="range-808" [(value)]="rangeValue"></syn-range>
    <syn-range data-testid="range-changed-808" [(value)]="rangeValue" ngModelUpdateOn="syn-blur"></syn-range>

    <div data-testid="result-input-808">{{inputValue}}</div>
    <div data-testid="result-checkbox-808">{{checkboxValue}}</div>
    <div data-testid="result-range-808">{{rangeValue}}</div>
  `,
})
export class NgModelUpdateOn {
  inputValue = 'Hello';
  rangeValue = '50';
  checkboxValue = false;
}
