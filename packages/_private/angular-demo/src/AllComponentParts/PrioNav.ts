import { Component } from '@angular/core';
import { SynNavItemComponent, SynPrioNavComponent } from '@synergy-design-system/angular';

@Component({
  selector: 'demo-prio-nav',
  standalone: true,
  imports: [
    SynNavItemComponent,
    SynPrioNavComponent,
  ],
  template: `
    <div style="display: flex; gap: var(--syn-spacing-2x-large)">
      <syn-prio-nav style="width: 220px;">
        <syn-nav-item current horizontal>Domains</syn-nav-item>
        <syn-nav-item horizontal>Projects</syn-nav-item>
        <syn-nav-item horizontal href="javascript:void(0)">Trainings</syn-nav-item>
      </syn-prio-nav>
    </div>
  `,
})
export class PrioNav {}
