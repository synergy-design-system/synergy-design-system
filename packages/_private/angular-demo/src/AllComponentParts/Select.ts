import { Component } from '@angular/core';
import { SynSelectComponent } from '@synergy-design-system/angular/components/select';
import { SynOptionComponent } from '@synergy-design-system/angular/components/option';

@Component({
  selector: 'demo-select',
  standalone: true,
  imports: [
    SynSelectComponent,
    SynOptionComponent,
  ],
  template: `
    <syn-select label="Experience" help-text="Please tell us your skill level.">
      <syn-option value="1">Novice</syn-option>
      <syn-option value="2">Intermediate</syn-option>
      <syn-option value="3">Advanced</syn-option>
    </syn-select>
  `,
})
export class Select {}
