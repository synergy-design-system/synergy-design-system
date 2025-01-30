import { Component } from '@angular/core';
import { SynButtonComponent } from '@synergy-design-system/angular/components/button';
import { SynTooltipComponent } from '@synergy-design-system/angular/components/tooltip';

@Component({
  selector: 'demo-tooltip',
  standalone: true,
  imports: [
    SynTooltipComponent,
    SynButtonComponent
  ],
  template: `
    <syn-tooltip content="This is a tooltip" [distance]=13 open>
      <syn-button>Hover me</syn-button>
    </syn-tooltip>
  `,
})
export class Tooltip {}
