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
import type { SynSwitch } from '@synergy-design-system/components';
import type { SynBlurEvent } from '@synergy-design-system/components';
import type { SynChangeEvent } from '@synergy-design-system/components';
import type { SynInputEvent } from '@synergy-design-system/components';
import type { SynFocusEvent } from '@synergy-design-system/components';
import type { SynInvalidEvent } from '@synergy-design-system/components';
import '@synergy-design-system/components/components/switch/switch.js';

/**
 * @summary Switches allow the user to toggle an option on or off.
 * @documentation https://synergy-design-system.github.io/?path=/docs/components-syn-switch--docs
 * @status stable
 * @since 2.0
 *
 * @slot - The switch's label.
 * @slot help-text - Text that describes how to use the switch. Alternatively, you can use the `help-text` attribute.
 *
 * @event syn-blur - Emitted when the control loses focus.
 * @event syn-change - Emitted when the control's checked state changes.
 * @event syn-input - Emitted when the control receives input.
 * @event syn-focus - Emitted when the control gains focus.
 * @event syn-invalid - Emitted when the form control has been checked for validity and its constraints aren't satisfied.
 *
 * @csspart base - The component's base wrapper.
 * @csspart control - The control that houses the switch's thumb.
 * @csspart thumb - The switch's thumb.
 * @csspart label - The switch's label.
 * @csspart form-control-help-text - The help text's wrapper.
 *
 * @cssproperty --width - The width of the switch.
 * @cssproperty --height - The height of the switch.
 * @cssproperty --thumb-size - The size of the thumb.
 */
@Component({
  selector: 'syn-switch',
  standalone: true,
  template: '<ng-content></ng-content>',
})
export class SynSwitchComponent {
  public nativeElement: SynSwitch;
  private _ngZone: NgZone;
  private modelSignal = new AbortController();

  constructor(e: ElementRef, ngZone: NgZone) {
    this.nativeElement = e.nativeElement;
    this._ngZone = ngZone;
    this.nativeElement.addEventListener('syn-blur', (e: SynBlurEvent) => {
      this.synBlurEvent.emit(e);
    });
    this.nativeElement.addEventListener('syn-change', (e: SynChangeEvent) => {
      this.synChangeEvent.emit(e);
    });
    this.nativeElement.addEventListener('syn-input', (e: SynInputEvent) => {
      this.synInputEvent.emit(e);
    });
    this.nativeElement.addEventListener('syn-focus', (e: SynFocusEvent) => {
      this.synFocusEvent.emit(e);
    });
    this.nativeElement.addEventListener('syn-invalid', (e: SynInvalidEvent) => {
      this.synInvalidEvent.emit(e);
    });
    this.ngModelUpdateOn = 'syn-input';
  }

  /**
   * The event that will trigger the ngModel update.
   * By default, this is set to "syn-input".
   */
  @Input()
  set ngModelUpdateOn(v: keyof HTMLElementEventMap) {
    this.modelSignal.abort();
    this.modelSignal = new AbortController();
    const option = v || 'syn-input';
    this.nativeElement.addEventListener(
      option,
      () => {
        this.checkedChange.emit(this.checked);
      },
      {
        signal: this.modelSignal.signal,
      },
    );
  }
  get ngModelUpdateOn(): keyof HTMLElementEventMap {
    return this.ngModelUpdateOn;
  }

  @Input()
  set title(v: SynSwitch['title']) {
    this._ngZone.runOutsideAngular(() => (this.nativeElement.title = v));
  }
  get title(): SynSwitch['title'] {
    return this.nativeElement.title;
  }

  /**
   * The name of the switch, submitted as a name/value pair with form data.
   */
  @Input()
  set name(v: SynSwitch['name']) {
    this._ngZone.runOutsideAngular(() => (this.nativeElement.name = v));
  }
  get name(): SynSwitch['name'] {
    return this.nativeElement.name;
  }

  /**
   * The current value of the switch, submitted as a name/value pair with form data.
   */
  @Input()
  set value(v: SynSwitch['value']) {
    this._ngZone.runOutsideAngular(() => (this.nativeElement.value = v));
  }
  get value(): SynSwitch['value'] {
    return this.nativeElement.value;
  }

  /**
   * The switch's size.
   */
  @Input()
  set size(v: SynSwitch['size']) {
    this._ngZone.runOutsideAngular(() => (this.nativeElement.size = v));
  }
  get size(): SynSwitch['size'] {
    return this.nativeElement.size;
  }

  /**
   * Disables the switch.
   */
  @Input()
  set disabled(v: '' | SynSwitch['disabled']) {
    this._ngZone.runOutsideAngular(
      () => (this.nativeElement.disabled = v === '' || v),
    );
  }
  get disabled(): SynSwitch['disabled'] {
    return this.nativeElement.disabled;
  }

  /**
   * Draws the switch in a checked state.
   */
  @Input()
  set checked(v: '' | SynSwitch['checked']) {
    this._ngZone.runOutsideAngular(
      () => (this.nativeElement.checked = v === '' || v),
    );
  }
  get checked(): SynSwitch['checked'] {
    return this.nativeElement.checked;
  }

  /**
* By default, form controls are associated with the nearest containing `<form>` element.
* This attribute allows you
to place the form control outside of a form and associate it with the form that has this `id`.
* The form must be in
the same document or shadow root for this to work.
 */
  @Input()
  set form(v: SynSwitch['form']) {
    this._ngZone.runOutsideAngular(() => (this.nativeElement.form = v));
  }
  get form(): SynSwitch['form'] {
    return this.nativeElement.form;
  }

  /**
   * Makes the switch a required field.
   */
  @Input()
  set required(v: '' | SynSwitch['required']) {
    this._ngZone.runOutsideAngular(
      () => (this.nativeElement.required = v === '' || v),
    );
  }
  get required(): SynSwitch['required'] {
    return this.nativeElement.required;
  }

  /**
   * The switch's help text.
   * If you need to display HTML, use the `help-text` slot instead.
   */
  @Input()
  set helpText(v: SynSwitch['helpText']) {
    this._ngZone.runOutsideAngular(() => (this.nativeElement.helpText = v));
  }
  get helpText(): SynSwitch['helpText'] {
    return this.nativeElement.helpText;
  }

  /**
   * Emitted when the control loses focus.
   */
  @Output() synBlurEvent = new EventEmitter<SynBlurEvent>();

  /**
   * Emitted when the control's checked state changes.
   */
  @Output() synChangeEvent = new EventEmitter<SynChangeEvent>();

  /**
   * Emitted when the control receives input.
   */
  @Output() synInputEvent = new EventEmitter<SynInputEvent>();

  /**
   * Emitted when the control gains focus.
   */
  @Output() synFocusEvent = new EventEmitter<SynFocusEvent>();

  /**
   * Emitted when the form control has been checked for validity and its constraints aren't satisfied.
   */
  @Output() synInvalidEvent = new EventEmitter<SynInvalidEvent>();

  /**
   * Support for two way data binding
   */
  @Output() checkedChange = new EventEmitter<SynSwitch['checked']>();
}

export type { SynBlurEvent } from '@synergy-design-system/components';
export type { SynChangeEvent } from '@synergy-design-system/components';
export type { SynInputEvent } from '@synergy-design-system/components';
export type { SynFocusEvent } from '@synergy-design-system/components';
export type { SynInvalidEvent } from '@synergy-design-system/components';
