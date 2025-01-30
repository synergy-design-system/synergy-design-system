import { Component } from '@angular/core';
import { SynOptionComponent } from '@synergy-design-system/angular/components/option';
import { SynSelectComponent } from '@synergy-design-system/angular/components/select';

@Component({
  selector: 'demo-option',
  standalone: true,
  imports: [
    SynSelectComponent,
    SynOptionComponent,
  ],
  template: `
    <syn-select label="Select one">
      <syn-option value="Option_1" tabindex="0">Option 1</syn-option>
      <syn-option value="Option_2">Option 2</syn-option>
      <syn-option value="Option_3">Option 3</syn-option>
    </syn-select>
  `,
})
export class Option {}
