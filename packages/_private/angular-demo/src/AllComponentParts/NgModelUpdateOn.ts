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
    <syn-input data-testid="ng-model-input" [(value)]="inputValue" ></syn-input>
    <syn-input data-testid="ng-model-input-changed" [(value)]="inputValue" ngModelUpdateOn="syn-change"></syn-input>
    <syn-checkbox data-testid="ng-model-checkbox" [(checked)]="checkboxValue"></syn-checkbox>
    <syn-checkbox data-testid="ng-model-checkbox-changed" [(checked)]="checkboxValue" ngModelUpdateOn="syn-blur"></syn-checkbox>
    <syn-range data-testid="ng-model-range" [(value)]="rangeValue"></syn-range>
    <syn-range data-testid="ng-model-range-changed" [(value)]="rangeValue" ngModelUpdateOn="syn-blur"></syn-range>

    <div data-testid="ng-model-result-input">{{inputValue}}</div>
    <div data-testid="ng-model-result-checkbox">{{checkboxValue}}</div>
    <div data-testid="ng-model-result-range">{{rangeValue}}</div>
  `,
})
export class NgModelUpdateOn {
  inputValue = 'Hello';
  rangeValue = '50';
  checkboxValue = false;
}
