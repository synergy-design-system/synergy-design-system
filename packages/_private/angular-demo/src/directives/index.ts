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
  constructor(
    private element: ElementRef,
    private renderer: Renderer2,
    router: Router,
    @Host() routerLink: RouterLink,
  ) {
    // Make the custom element behave like an anchor for RouterLink
    this.renderer.setAttribute(this.element.nativeElement, 'role', 'link');

    // Let syn-nav-item set its own tabindex first, then prevent RouterLink from interfering
    setTimeout(() => {
      const synNavItemTabindex = this.element.nativeElement.getAttribute('tabindex');

      // Remove any tabindex that RouterLink might try to set later
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === 'attributes' && mutation.attributeName === 'tabindex') {
            const currentTabindex = this.element.nativeElement.getAttribute('tabindex');
            // Only restore if RouterLink changed it from what syn-nav-item set
            if (currentTabindex !== synNavItemTabindex) {
              this.renderer.setAttribute(this.element.nativeElement, 'tabindex', synNavItemTabindex);
            }
          }
        });
      });

      observer.observe(this.element.nativeElement, {
        attributes: true,
        attributeFilter: ['tabindex']
      });
    });

    // Helper function to safely get route commands
    const getRouteCommands = () => {
      const commands = routerLink.routerLink;
      if (!commands) return [];
      if (typeof commands === 'string') return [commands];
      if (Array.isArray(commands)) return commands;
      return []; // fallback for other cases
    };

    // Listen to router events to update href attribute
    router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        const commands = getRouteCommands();
        if (commands.length > 0) {
          const urlTree = router.createUrlTree(commands);
          const href = router.serializeUrl(urlTree);
          this.renderer.setAttribute(this.element.nativeElement, 'href', href);
        }
      }
    });

    // Set initial href
    const initialCommands = getRouteCommands();
    if (initialCommands.length > 0) {
      const urlTree = router.createUrlTree(initialCommands);
      const href = router.serializeUrl(urlTree);
      this.renderer.setAttribute(this.element.nativeElement, 'href', href);
    }
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
