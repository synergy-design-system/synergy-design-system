import { Component } from '@angular/core';
import { SynCheckboxComponent } from '@synergy-design-system/angular/components/checkbox';

@Component({
  selector: 'demo-checkbox',
  standalone: true,
  imports: [
    SynCheckboxComponent,
  ],
  template: `
    <syn-checkbox>Checkbox</syn-checkbox>
  `,
})
export class Checkbox {}
