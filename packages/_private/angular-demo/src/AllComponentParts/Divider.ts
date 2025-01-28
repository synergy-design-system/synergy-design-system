import { Component } from '@angular/core';
import { SynDividerComponent } from '@synergy-design-system/angular';

@Component({
  selector: 'demo-divider',
  standalone: true,
  imports: [
    SynDividerComponent,
  ],
  template: `
    <div style="text-align: center;">
      Above
      <syn-divider style="--spacing: var(--syn-spacing-large);" />
      Below
    </div>
  `,
})
export class Divider {}
