import { Component } from '@angular/core';
import { SynNavItemComponent } from '@synergy-design-system/angular';

@Component({
  selector: 'demo-navitem',
  standalone: true,
  imports: [
    SynNavItemComponent,
  ],
  template: `
    <nav style="display: flex; flex-direction: column; gap: 24px; width: 320px">
      <syn-nav-item current>Indentation: none</syn-nav-item>
      <syn-nav-item current style="--indentation: 1">Indentation: 1</syn-nav-item>
      <syn-nav-item current style="--indentation: 2">Indentation: 2</syn-nav-item>
    </nav>
  `,
})
export class NavItem {}
