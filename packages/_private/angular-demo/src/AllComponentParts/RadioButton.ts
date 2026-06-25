import { Component } from '@angular/core';
import { SynRadioButtonComponent } from '@synergy-design-system/angular/components/radio-button';
import { SynRadioGroupComponent } from '@synergy-design-system/angular/components/radio-group';

@Component({
  selector: 'demo-radiobutton',
  standalone: true,
  imports: [
    SynRadioButtonComponent,
    SynRadioGroupComponent,
  ],
  template: `
    <syn-radio-group
      help-text="This is the help-text"
      label="This is a label"
    >
      <syn-radio-button value="option1">Option 1</syn-radio-button>
      <syn-radio-button value="option2">Option 2</syn-radio-button>
      <syn-radio-button value="option3">Option 3</syn-radio-button>
    </syn-radio-group>
  `,
})
export class RadioButton {}
