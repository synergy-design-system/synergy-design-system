import { Component } from '@angular/core';
import { SynergyComponentsModule } from '@synergy-design-system/angular';
import { type SideNavTypes } from '@synergy-design-system/demo-utilities';
import { type SynSideNav } from '@synergy-design-system/components';

@Component({
  imports: [SynergyComponentsModule],
  selector: 'sidenav-switch',
  standalone: true,
  templateUrl: './sidenavswitch.component.html',
})
export class SidenavSwitchComponent {
  type: SideNavTypes = 'rail';

  setVariant(type: SideNavTypes) {
    this.type = type;
    const sideNav = document.querySelector('syn-side-nav');
    if (sideNav) {
      sideNav.variant = (type as SynSideNav['variant']);
    }
  }
}
