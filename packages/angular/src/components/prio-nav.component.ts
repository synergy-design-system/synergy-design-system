// ---------------------------------------------------------------------
// 🔒 AUTOGENERATED @synergy-design-system/angular wrappers for @synergy-design-system/components
// Please do not edit this file directly!
// It will get recreated when running pnpm build.
// ---------------------------------------------------------------------
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  Output,
} from '@angular/core';
import type { SynPrioNav } from '@synergy-design-system/components';

import '@synergy-design-system/components/components/prio-nav/prio-nav.js';

/**
 * @summary The `<syn-prio-nav />` element provides a generic navigation bar
 * that can be used to group multiple navigation items  (usually horizontal `<syn-nav-item />`s)
 * together. It will automatically group all items not visible in the viewport into a custom
 * priority menu.
 *
 * @example
 * <syn-prio-nav>
 *  <syn-nav-item current horizontal>Item 1</syn-nav-item>
 *  <button role="menuitem">Item 2 (custom)</button>
 *  <syn-nav-item horizontal>Item 3</syn-nav-item>
 * </syn-prio-nav>
 *
 * @documentation https://synergy-design-system.github.io/?path=/docs/components-syn-prio-nav--docs
 * @status stable
 * @since 1.14.0
 *
 * @dependency syn-dropdown
 * @dependency syn-icon
 * @dependency syn-menu
 * @dependency syn-nav-item
 *
 * @slot - The given navigation items. Must be horizontal `<syn-nav-item>`s
 *    or have a role of "menuitem"
 *
 * @csspart base - The component's base wrapper.
 * @csspart priority-menu - The wrapper around the priority menu
 * @csspart priority-menu-nav-item - The navigation item for the priority menu
 * @csspart priority-menu-label - The label for the priority menu
 * @csspart priority-menu-icon - The icon for the priority menu
 * @csspart priority-menu-container - The container for the shifted navigation items,
 *    if there is not enough space.
 *
 */
@Component({
  selector: 'syn-prio-nav',
  standalone: true,
  template: '<ng-content></ng-content>',
})
export class SynPrioNavComponent {
  public nativeElement: SynPrioNav;

  private _ngZone: NgZone;

  constructor(e: ElementRef, ngZone: NgZone) {
    this.nativeElement = e.nativeElement;
    this._ngZone = ngZone;
  }

  /**
* The components priority menu label.
This will be shown after the priority menu 3 dots link
 */
  @Input()
  set priorityMenuLabel(v: SynPrioNav['priorityMenuLabel']) {
    this._ngZone.runOutsideAngular(() => (this.nativeElement.priorityMenuLabel = v));
  }

  get priorityMenuLabel() {
    return this.nativeElement.priorityMenuLabel;
  }
}
