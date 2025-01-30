import { Component } from '@angular/core';
import { SynRadioGroupComponent } from '@synergy-design-system/angular/components/radio-group';
import { SynRadioComponent } from '@synergy-design-system/angular/components/radio';

@Component({
  selector: 'demo-radiogroup',
  standalone: true,
  imports: [
    SynRadioGroupComponent,
    SynRadioComponent,
  ],
  template: `
    <syn-radio-group
      help-text="This is the help-text"
      label="This is a label"
    >
      <syn-radio value="1">Option</syn-radio>
      <syn-radio value="2">Option</syn-radio>
      <syn-radio value="3">Option</syn-radio>
    </syn-radio-group>
  `,
})
export class RadioGroup {}
