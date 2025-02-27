// ---------------------------------------------------------------------
// 🔒 AUTOGENERATED @synergy-design-system/angular wrappers for @synergy-design-system/components
// Please do not edit this file directly!
// It will get recreated when running pnpm build.
// ---------------------------------------------------------------------
import {
  Component,
  ElementRef,
  NgZone,
  Input,
  Output,
  EventEmitter,
  AfterContentInit,
} from '@angular/core';
import type { SynSideNav } from '@synergy-design-system/components';
import type { SynShowEvent } from '@synergy-design-system/components';
import type { SynAfterShowEvent } from '@synergy-design-system/components';
import type { SynHideEvent } from '@synergy-design-system/components';
import type { SynAfterHideEvent } from '@synergy-design-system/components';
import '@synergy-design-system/components/components/side-nav/side-nav.js';

/**
 * @summary The <syn-side-nav /> element contains secondary navigation and fits below the header.
 * It can be used to group multiple navigation items (<syn-nav-item />s) together.
 *
 * @example
 * <syn-side-nav open>
 *  <syn-nav-item >Item 1</syn-nav-item>
 *  <syn-nav-item divider>Item 2</syn-nav-item>
 * </syn-side-nav>
 *
 * @documentation https://synergy-design-system.github.io/?path=/docs/components-syn-side-nav--docs
 * @status stable
 * @since 1.14.0
 *
 * @dependency syn-divider
 * @dependency syn-drawer
 *
 * @slot - The main content of the side-nav. Used for <syn-nav-item /> elements.
 * @slot footer - The footer content of the side-nav. Used for <syn-nav-item /> elements.
 *    Please avoid having to many nav-items as it can massively influence the user experience.
 *
 * @event syn-show - Emitted when the side-nav opens.
 * @event syn-after-show - Emitted after the side-nav opens and all animations are complete.
 * @event syn-hide - Emitted when the side-nav closes.
 * @event syn-after-hide - Emitted after the side-nav closes and all animations are complete.
 *
 * @csspart base - The components base wrapper
 * @csspart drawer - The drawer that is used under the hood for creating the side-nav
 * @csspart content-container - The components main content container
 * @csspart content - The components main content
 * @csspart footer-container - The components footer content container
  (where the footer slot content is rendered)
 * @csspart footer-divider - The components footer divider
 * @csspart footer - The components footer content
 * @csspart overlay - The overlay that covers the screen behind the side-nav.
 * @csspart panel - The side-nav's panel (where the whole content is rendered).
 * @csspart body - The side-nav's body (where the default slot content is rendered)
 * @csspart drawer__base - The drawer's base wrapper
 *
 * @cssproperty  --side-nav-open-width - The width of the side-nav if in open state
 *
 * @animation sideNav.showNonRail - The animation to use when showing the side-nav in non-rail mode.
 * @animation sideNav.showRail - The animation to use when showing the side-nav in rail mode.
 * @animation sideNav.hideNonRail - The animation to use when hiding the side-nav in non-rail mode.
 * @animation sideNav.hideRail - The animation to use when hiding the side-nav in rail mode.
 * @animation sideNav.overlay.show - The animation to use when showing the side-nav's overlay.
 * @animation sideNav.overlay.hide - The animation to use when hiding the side-nav's overlay.
 */
@Component({
  selector: 'syn-side-nav',
  standalone: true,
  template: '<ng-content></ng-content>',
})
export class SynSideNavComponent {
  public nativeElement: SynSideNav;
  private _ngZone: NgZone;

  constructor(e: ElementRef, ngZone: NgZone) {
    this.nativeElement = e.nativeElement;
    this._ngZone = ngZone;
    this.nativeElement.addEventListener('syn-show', (e: SynShowEvent) => {
      this.synShowEvent.emit(e);
    });
    this.nativeElement.addEventListener(
      'syn-after-show',
      (e: SynAfterShowEvent) => {
        this.synAfterShowEvent.emit(e);
      },
    );
    this.nativeElement.addEventListener('syn-hide', (e: SynHideEvent) => {
      this.synHideEvent.emit(e);
    });
    this.nativeElement.addEventListener(
      'syn-after-hide',
      (e: SynAfterHideEvent) => {
        this.synAfterHideEvent.emit(e);
      },
    );
  }

  /**
* Indicates whether or not the side-nav is open.
You can toggle this attribute to show and hide the side-nav, or you can use the `show()` and
`hide()` methods and this attribute will reflect the side-nav's open state.

Depending if the rail attribute is set or not, the behavior will differ.

__Non rail__:
With `open` will show the side-nav.
Without `open`, the side-nav will be hidden.

__Rail__:
With `open` will show the whole side-nav with an overlay for touch devices
or without an overlay for non-touch devices.
Without `open`, the side-nav will only show the prefix of nav-item's.
 */
  @Input()
  set open(v: '' | SynSideNav['open']) {
    this._ngZone.runOutsideAngular(
      () => (this.nativeElement.open = v === '' || v),
    );
  }
  get open(): SynSideNav['open'] {
    return this.nativeElement.open;
  }

  /**
* Use the rail attribute to only show the prefix of navigation items in closed state.
This will open on hover on the rail navigation.
On touch devices the navigation opens on click and shows an overlay.

Note: The Rail is only an option if all Navigation Items on the first level have an Icon.
If this is not the case you should use a burger navigation.
 */
  @Input()
  set rail(v: '' | SynSideNav['rail']) {
    this._ngZone.runOutsideAngular(
      () => (this.nativeElement.rail = v === '' || v),
    );
  }
  get rail(): SynSideNav['rail'] {
    return this.nativeElement.rail;
  }

  /**
* By default, the side-nav traps the focus if in non-rail mode and open.
To disable the focus trapping, set this attribute.
 */
  @Input()
  set noFocusTrapping(v: '' | SynSideNav['noFocusTrapping']) {
    this._ngZone.runOutsideAngular(
      () => (this.nativeElement.noFocusTrapping = v === '' || v),
    );
  }
  get noFocusTrapping(): SynSideNav['noFocusTrapping'] {
    return this.nativeElement.noFocusTrapping;
  }

  /**
   * Emitted when the side-nav opens.
   */
  @Output() synShowEvent = new EventEmitter<SynShowEvent>();

  /**
   * Emitted after the side-nav opens and all animations are complete.
   */
  @Output() synAfterShowEvent = new EventEmitter<SynAfterShowEvent>();

  /**
   * Emitted when the side-nav closes.
   */
  @Output() synHideEvent = new EventEmitter<SynHideEvent>();

  /**
   * Emitted after the side-nav closes and all animations are complete.
   */
  @Output() synAfterHideEvent = new EventEmitter<SynAfterHideEvent>();
}

export type { SynShowEvent } from '@synergy-design-system/components';
export type { SynAfterShowEvent } from '@synergy-design-system/components';
export type { SynHideEvent } from '@synergy-design-system/components';
export type { SynAfterHideEvent } from '@synergy-design-system/components';
