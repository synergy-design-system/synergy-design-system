import { Component } from '@angular/core';
import { SynOptgroupComponent, SynOptionComponent, SynSelectComponent } from '@synergy-design-system/angular';

@Component({
  selector: 'demo-optgroup',
  standalone: true,
  imports: [
    SynSelectComponent,
    SynOptgroupComponent,
    SynOptionComponent,
  ],
  template: `
    <syn-select>
      <syn-optgroup label="Section 1">
        <syn-option value="1">Option 1</syn-option>
        <syn-option value="2">Option 2</syn-option>
        <syn-option value="3">Option 3</syn-option>
      </syn-optgroup>

      <syn-optgroup label="Section 2">
        <syn-option value="4">Option 4</syn-option>
      </syn-optgroup>
    </syn-select>
  `,
})
export class OptGroup {}
