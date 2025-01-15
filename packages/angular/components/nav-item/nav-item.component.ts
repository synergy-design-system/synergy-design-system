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
} from '@angular/core';
import type { SynNavItem } from '@synergy-design-system/components';
import type { SynShowEvent } from '@synergy-design-system/components';
import type { SynHideEvent } from '@synergy-design-system/components';
import type { SynBlurEvent } from '@synergy-design-system/components';
import type { SynFocusEvent } from '@synergy-design-system/components';
import '@synergy-design-system/components/components/nav-item/nav-item.js';

/**
 * @summary Flexible button / link component that can be used to quickly build navigations.
 * Takes one of 3 forms:
 * - button (default),
 * - link (overrides button if a 'href' is provided),
 * - or accordion (overrides all other if 'children' slot is defined).
 *
 * @status stable
 * @since 1.14.0
 *
 * @dependency syn-divider
 *
 * @event syn-show - Emitted when the navigation item:
 * - has children,
 * - and is clicked while HTML details are hidden.
 *
 * @event syn-hide - Emitted when the navigation item:
 * - has children,
 * - and is clicked while HTML details are shown.
 *
 * @event syn-blur - Emitted when the button loses focus.
 * @event syn-focus - Emitted when the button gains focus.
 *
 * @slot - The navigation item's label.
 * @slot prefix - A presentational prefix icon or similar element.
 * @slot suffix - A presentational suffix icon or similar element.
 * @slot children - Slot used to provide nested child navigation elements.
 * If provided, details and summary elements will be used.
 * A chevron will be shown on the right side regardless of the chevron property.
 *
 * @csspart base - The component's base wrapper including children.
 * @csspart children - The wrapper that holds the children
 * @csspart content-wrapper - The component's content wrapper.
 * @csspart content - The component's content excluding children.
 * @csspart current-indicator - The indicator used when current is set to true
 * @csspart chevron - The container that wraps the chevron.
 * @csspart details - The details element rendered when there are children available
 * @csspart divider - The components optional top divider.
 * @csspart prefix - The container that wraps the prefix.
 * @csspart suffix - The container that wraps the suffix.
 *
 * @cssproperty --indentation - Numeric value, indicating the level the item is placed at.
 * @cssproperty --indentation-stepping - The amount of pixels each level will indent.
 * @cssproperty --display-children - Display property of the children. Defaults to "contents"
 */
@Component({
  selector: 'syn-nav-item',
  standalone: true,
  template: '<ng-content></ng-content>',
})
export class SynNavItemComponent {
  public nativeElement: SynNavItem;
  private _ngZone: NgZone;

  constructor(e: ElementRef, ngZone: NgZone) {
    this.nativeElement = e.nativeElement;
    this._ngZone = ngZone;
    this.nativeElement.addEventListener('syn-show', (e: SynShowEvent) => {
      this.synShowEvent.emit(e);
    });
    this.nativeElement.addEventListener('syn-hide', (e: SynHideEvent) => {
      this.synHideEvent.emit(e);
    });
    this.nativeElement.addEventListener('syn-blur', (e: SynBlurEvent) => {
      this.synBlurEvent.emit(e);
    });
    this.nativeElement.addEventListener('syn-focus', (e: SynFocusEvent) => {
      this.synFocusEvent.emit(e);
    });
  }

  /**
* The navigation item's href target.
If provided, the navigation item will use an anchor tag otherwise it will use a button tag.

If the 'children' slot is provided, the navigation item will ignore the 'href' and use
accordion behavior.
 */
  @Input()
  set href(v: SynNavItem['href']) {
    this._ngZone.runOutsideAngular(() => (this.nativeElement.href = v));
  }
  get href(): SynNavItem['href'] {
    return this.nativeElement.href;
  }

  @Input()
  set current(v: '' | SynNavItem['current']) {
    this._ngZone.runOutsideAngular(
      () => (this.nativeElement.current = v === '' || v),
    );
  }
  get current(): SynNavItem['current'] {
    return this.nativeElement.current;
  }

  /**
   * Disables the navigation item.
   */
  @Input()
  set disabled(v: '' | SynNavItem['disabled']) {
    this._ngZone.runOutsideAngular(
      () => (this.nativeElement.disabled = v === '' || v),
    );
  }
  get disabled(): SynNavItem['disabled'] {
    return this.nativeElement.disabled;
  }

  /**
   * The navigation item's orientation.
   */
  @Input()
  set horizontal(v: '' | SynNavItem['horizontal']) {
    this._ngZone.runOutsideAngular(
      () => (this.nativeElement.horizontal = v === '' || v),
    );
  }
  get horizontal(): SynNavItem['horizontal'] {
    return this.nativeElement.horizontal;
  }

  /**
* Appends a chevron to the right side of a navigation item.
Only used if `horizontal` is false.
 */
  @Input()
  set chevron(v: '' | SynNavItem['chevron']) {
    this._ngZone.runOutsideAngular(
      () => (this.nativeElement.chevron = v === '' || v),
    );
  }
  get chevron(): SynNavItem['chevron'] {
    return this.nativeElement.chevron;
  }

  /**
* Reflects HTML details element state and allows control from parent.
Only used if `horizontal` is false and `children` is defined.
 */
  @Input()
  set open(v: '' | SynNavItem['open']) {
    this._ngZone.runOutsideAngular(
      () => (this.nativeElement.open = v === '' || v),
    );
  }
  get open(): SynNavItem['open'] {
    return this.nativeElement.open;
  }

  /**
* Toggle to true to show a divider above the element.
Only available when horizontal is false.
 */
  @Input()
  set divider(v: '' | SynNavItem['divider']) {
    this._ngZone.runOutsideAngular(
      () => (this.nativeElement.divider = v === '' || v),
    );
  }
  get divider(): SynNavItem['divider'] {
    return this.nativeElement.divider;
  }

  /**
   * Emitted when the navigation item: - has children, - and is clicked while HTML details are hidden.
   */
  @Output() synShowEvent = new EventEmitter<SynShowEvent>();

  /**
   * Emitted when the navigation item: - has children, - and is clicked while HTML details are shown.
   */
  @Output() synHideEvent = new EventEmitter<SynHideEvent>();

  /**
   * Emitted when the button loses focus.
   */
  @Output() synBlurEvent = new EventEmitter<SynBlurEvent>();

  /**
   * Emitted when the button gains focus.
   */
  @Output() synFocusEvent = new EventEmitter<SynFocusEvent>();
}

export type { SynShowEvent } from '@synergy-design-system/components';
export type { SynHideEvent } from '@synergy-design-system/components';
export type { SynBlurEvent } from '@synergy-design-system/components';
export type { SynFocusEvent } from '@synergy-design-system/components';