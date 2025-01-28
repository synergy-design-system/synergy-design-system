import { Component } from '@angular/core';
import { SynComboboxComponent, SynOptionComponent } from '@synergy-design-system/angular';

@Component({
  selector: 'demo-combobox',
  standalone: true,
  imports: [
    SynComboboxComponent,
    SynOptionComponent,
  ],
  template: `
    <syn-combobox>
      <syn-option>Option 1</syn-option>
      <syn-option>Option 2</syn-option>
      <syn-option>Option 3</syn-option>
    </syn-combobox>
  `,
})
export class Combobox {}
