import { Component } from '@angular/core';
import { SynComboboxComponent } from '@synergy-design-system/angular/components/combobox';
import { SynOptionComponent } from '@synergy-design-system/angular/components/option';

@Component({
  selector: 'demo-combobox',
  standalone: true,
  imports: [
    SynComboboxComponent,
    SynOptionComponent,
  ],
  template: `
    <syn-combobox value="option-2">
      <syn-option value="option-1">Option 1</syn-option>
      <syn-option value="option-2">Option 2</syn-option>
      <syn-option value="option-3">Option 3</syn-option>
    </syn-combobox>
  `,
})
export class Combobox {}
