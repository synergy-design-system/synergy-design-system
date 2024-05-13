import { Component, ViewChild } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { SynSideNavComponent } from '@synergy-design-system/angular';
import type { SynNavItem } from '@synergy-design-system/components';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  @ViewChild('sideNav') sideNav!: SynSideNavComponent;


  constructor(private router: Router) {
    router.events.subscribe((event) => {
      if(event instanceof NavigationStart) {
        const path = event.url;
        this.sideNav.nativeElement.querySelectorAll('syn-nav-item').forEach((navItem: SynNavItem) => {
          navItem.current = navItem.href === path;
        });
      }
    });
  }
}
