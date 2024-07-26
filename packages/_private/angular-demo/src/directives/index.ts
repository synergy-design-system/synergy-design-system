/**
 * Make routing work with `syn-nav-item` and `routerLink` and `routerLinkActive`
 * Original solution by @xkabylgSICKAG
 * @see https://github.com/synergy-design-system/synergy-design-system/issues/442
 */
import {
  Directive,
  ElementRef,
  Host,
  Renderer2,
} from '@angular/core';
import {
  Event,
  NavigationEnd,
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';

@Directive({
  selector: 'syn-nav-item[routerLink]',
  standalone: true,
})
export class SynNavItemRouterLinkDirective {
  constructor(router: Router, @Host() routerLink: RouterLink) {
    routerLink['isAnchorElement'] = true;
    routerLink['subscription'] = router.events.subscribe((s: Event) => {
      if (s instanceof NavigationEnd) {
        routerLink['updateHref']();
      }
    });

    routerLink['applyAttributeValue']('tabindex', null);
  }
}

@Directive({
  selector: 'syn-nav-item[routerLinkActive]',
  standalone: true,
})
export class SynNavItemRouterLinkActiveDirective {
  constructor(
    element: ElementRef,
    renderer: Renderer2,
    @Host() routerLinkActive: RouterLinkActive,
  ) {
    const originalUpdate = routerLinkActive['update'].bind(routerLinkActive);
    routerLinkActive['update'] = () => {
      originalUpdate();

      queueMicrotask(() => {
        if (routerLinkActive.isActive) {
          renderer.setAttribute(element.nativeElement, 'current', 'true');
        } else {
          renderer.removeAttribute(element.nativeElement, 'current');
        }
      });
    };
  }
}
