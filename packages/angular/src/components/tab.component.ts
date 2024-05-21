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
import type { SynCloseEvent, SynTab } from '@synergy-design-system/components';
import '@synergy-design-system/components/components/tab/tab.js';

/**
 * @summary Tabs are used inside [tab groups](/components/tab-group) to represent and activate [tab panels](/components/tab-panel).
 * @documentation https://synergy.style/components/tab
 * @status stable
 * @since 2.0
 *
 * @dependency syn-icon-button
 *
 * @slot - The tab's label.
 * @slot prefix - Used to prepend an icon or similar element to the tab.
 *
 * @event syn-close - Emitted when the tab is closable and the close button is activated.
 *
 * @csspart base - The component's base wrapper.
 * @csspart close-button - The close button, an `<syn-icon-button>`.
 * @csspart close-button__base - The close button's exported `base` part.
 * @csspart prefix - The prefix container.
 */
@Component({
  selector: 'syn-tab',
  standalone: true,
  template: '<ng-content></ng-content>',
})
export class SynTabComponent {
  public nativeElement: SynTab;

  private _ngZone: NgZone;

  constructor(e: ElementRef, ngZone: NgZone) {
    this.nativeElement = e.nativeElement;
    this._ngZone = ngZone;
    this.nativeElement.addEventListener('syn-close', (e: SynCloseEvent) => { this.synCloseEvent.emit(e); });
  }

  /**
* The name of the tab panel this tab is associated with.
* The panel must be located in the same tab group.
 */
  @Input()
  set panel(v: SynTab['panel']) {
    this._ngZone.runOutsideAngular(() => (this.nativeElement.panel = v));
  }

  get panel() {
    return this.nativeElement.panel;
  }

  /**
* Draws the tab in an active state.
 */
  @Input()
  set active(v: SynTab['active']) {
    this._ngZone.runOutsideAngular(() => (this.nativeElement.active = v));
  }

  get active() {
    return this.nativeElement.active;
  }

  /**
* Makes the tab closable and shows a close button.
 */
  @Input()
  set closable(v: SynTab['closable']) {
    this._ngZone.runOutsideAngular(() => (this.nativeElement.closable = v));
  }

  get closable() {
    return this.nativeElement.closable;
  }

  /**
* Disables the tab and prevents selection.
 */
  @Input()
  set disabled(v: SynTab['disabled']) {
    this._ngZone.runOutsideAngular(() => (this.nativeElement.disabled = v));
  }

  get disabled() {
    return this.nativeElement.disabled;
  }

  @Input()
  callHandleActiveChange(...args: Parameters<SynTab['handleActiveChange']>) {
    return this._ngZone.runOutsideAngular(() => this.nativeElement.handleActiveChange(...args));
  }

  @Input()
  callHandleDisabledChange(...args: Parameters<SynTab['handleDisabledChange']>) {
    return this._ngZone.runOutsideAngular(() => this.nativeElement.handleDisabledChange(...args));
  }

  /**
* Sets focus to the tab.
 */
  @Input()
  callFocus(...args: Parameters<SynTab['focus']>) {
    return this._ngZone.runOutsideAngular(() => this.nativeElement.focus(...args));
  }

  /**
* Removes focus from the tab.
 */
  @Input()
  callBlur(...args: Parameters<SynTab['blur']>) {
    return this._ngZone.runOutsideAngular(() => this.nativeElement.blur(...args));
  }

  /**
* Emitted when the tab is closable and the close button is activated.
 */
  @Output() synCloseEvent = new EventEmitter<SynCloseEvent>();
}

export type { SynCloseEvent } from '@synergy-design-system/components';
