import { Component } from '@angular/core';
import { SynIconComponent } from '@synergy-design-system/angular/components/icon';
import { SynInputComponent } from '@synergy-design-system/angular/components/input';

@Component({
  selector: 'demo-input',
  standalone: true,
  imports: [
    SynInputComponent,
    SynIconComponent,
  ],
  template: `
    <syn-input
        placeholder="Disabled"
        help-text="Help Text"
        label="Label"
      >
        <syn-icon name="house" slot="prefix" />
        <syn-icon name="chat" slot="suffix" />
    </syn-input>
  `,
})
export class Input {}
