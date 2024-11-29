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
import type { SynBadge } from '@synergy-design-system/components';

import '@synergy-design-system/components/components/badge/badge.js';

/**
 * @summary Badges are used to draw attention and display statuses or counts.
 * @documentation https://synergy.style/components/badge
 * @status stable
 * @since 2.0
 *
 * @slot - The badge's content.
 *
 * @csspart base - The component's base wrapper.
 */
@Component({
  selector: 'syn-badge',
  standalone: true,
  template: '<ng-content></ng-content>',
})
export class SynBadgeComponent {
  public nativeElement: SynBadge;
  private _ngZone: NgZone;

  constructor(e: ElementRef, ngZone: NgZone) {
    this.nativeElement = e.nativeElement;
    this._ngZone = ngZone;
  }

  /**
   * The badge's theme variant.
   */
  @Input()
  set variant(v: SynBadge['variant']) {
    this._ngZone.runOutsideAngular(() => (this.nativeElement.variant = v));
  }
  get variant(): SynBadge['variant'] {
    return this.nativeElement.variant;
  }
}
