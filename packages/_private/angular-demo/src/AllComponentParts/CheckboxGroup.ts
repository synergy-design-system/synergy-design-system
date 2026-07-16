import { Component } from '@angular/core';
import { SynCheckboxComponent } from '@synergy-design-system/angular/components/checkbox';
import { SynCheckboxGroupComponent } from '@synergy-design-system/angular/components/checkbox-group';

@Component({
  selector: 'demo-checkbox-group',
  standalone: true,
  imports: [
    SynCheckboxComponent,
    SynCheckboxGroupComponent,
  ],
  template: `
    <syn-checkbox-group
      help-text="This is a checkbox group with a label and description."
      label="Checkbox Group Legend"
    >
      <syn-checkbox>Checkbox 1</syn-checkbox>
      <syn-checkbox>Checkbox 2</syn-checkbox>
      <syn-checkbox>Checkbox 3</syn-checkbox>
    </syn-checkbox-group>
  `,
})
export class CheckboxGroup {}
