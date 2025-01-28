import { Component } from '@angular/core';
import { SynSwitchComponent } from '@synergy-design-system/angular';

@Component({
  selector: 'demo-switch',
  standalone: true,
  imports: [
    SynSwitchComponent,
  ],
  template: `
    <syn-switch>
      Option
      <span slot="help-text">Help Text</span>
    </syn-switch>
  `,
})
export class Switch {}
