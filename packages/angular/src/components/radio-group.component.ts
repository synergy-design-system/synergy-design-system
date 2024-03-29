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
import type {
  SynChangeEvent, SynInputEvent, SynInvalidEvent, SynRadioGroup,
} from '@synergy-design-system/components';
import '@synergy-design-system/components/components/radio-group/radio-group.js';

/**
 * @summary Radio groups are used to group multiple [radios](/components/radio) or [radio buttons](/components/radio-button) so they function as a single form control.
 * @documentation https://synergy.style/components/radio-group
 * @status stable
 * @since 2.0
 *
 * @dependency syn-button-group
 *
 * @slot - The default slot where `<syn-radio>` or `<syn-radio-button>` elements are placed.
 * @slot label - The radio group's label. Required for proper accessibility. Alternatively, you can use the `label`
 *  attribute.
 * @slot help-text - Text that describes how to use the radio group. Alternatively, you can use the `help-text` attribute.
 *
 * @event syn-change - Emitted when the radio group's selected value changes.
 * @event syn-input - Emitted when the radio group receives user input.
 * @event syn-invalid - Emitted when the form control has been checked for validity and its constraints aren't satisfied.
 *
 * @csspart form-control - The form control that wraps the label, input, and help text.
 * @csspart form-control-label - The label's wrapper.
 * @csspart form-control-input - The input's wrapper.
 * @csspart form-control-help-text - The help text's wrapper.
 * @csspart button-group - The button group that wraps radio buttons.
 * @csspart button-group__base - The button group's `base` part.
 */
@Component({
  selector: 'syn-radio-group',
  standalone: true,
  template: '<ng-content></ng-content>',
})
export class SynRadioGroupComponent {
  private _el: SynRadioGroup;

  private _ngZone: NgZone;

  constructor(e: ElementRef, ngZone: NgZone) {
    this._el = e.nativeElement;
    this._ngZone = ngZone;
    this._el.addEventListener('syn-change', (e: SynChangeEvent) => { this.synChangeEvent.emit(e); });
    this._el.addEventListener('syn-input', (e: SynInputEvent) => { this.synInputEvent.emit(e); });
    this._el.addEventListener('syn-invalid', (e: SynInvalidEvent) => { this.synInvalidEvent.emit(e); });
  }

  /**
* The radio group's label.
* Required for proper accessibility.
* If you need to display HTML, use the `label` slot
instead.
 */
  @Input()
  set label(v: SynRadioGroup['label']) {
    this._ngZone.runOutsideAngular(() => (this._el.label = v));
  }

  get label() {
    return this._el.label;
  }

  /**
* The radio groups's help text.
* If you need to display HTML, use the `help-text` slot instead.
 */
  @Input()
  set helpText(v: SynRadioGroup['helpText']) {
    this._ngZone.runOutsideAngular(() => (this._el.helpText = v));
  }

  get helpText() {
    return this._el.helpText;
  }

  /**
* The name of the radio group, submitted as a name/value pair with form data.
 */
  @Input()
  set name(v: SynRadioGroup['name']) {
    this._ngZone.runOutsideAngular(() => (this._el.name = v));
  }

  get name() {
    return this._el.name;
  }

  /**
* The current value of the radio group, submitted as a name/value pair with form data.
 */
  @Input()
  set value(v: SynRadioGroup['value']) {
    this._ngZone.runOutsideAngular(() => (this._el.value = v));
  }

  get value() {
    return this._el.value;
  }

  /**
* The radio group's size.
* This size will be applied to all child radios and radio buttons.
 */
  @Input()
  set size(v: SynRadioGroup['size']) {
    this._ngZone.runOutsideAngular(() => (this._el.size = v));
  }

  get size() {
    return this._el.size;
  }

  /**
* By default, form controls are associated with the nearest containing `<form>` element.
* This attribute allows you
to place the form control outside of a form and associate it with the form that has this `id`.
* The form must be in
the same document or shadow root for this to work.
 */
  @Input()
  set form(v: SynRadioGroup['form']) {
    this._ngZone.runOutsideAngular(() => (this._el.form = v));
  }

  get form() {
    return this._el.form;
  }

  /**
* Ensures a child radio is checked before allowing the containing form to submit.
 */
  @Input()
  set required(v: SynRadioGroup['required']) {
    this._ngZone.runOutsideAngular(() => (this._el.required = v));
  }

  get required() {
    return this._el.required;
  }

  @Input()
  callHandleSizeChange(...args: Parameters<SynRadioGroup['handleSizeChange']>) {
    return this._ngZone.runOutsideAngular(() => this._el.handleSizeChange(...args));
  }

  @Input()
  callHandleValueChange(...args: Parameters<SynRadioGroup['handleValueChange']>) {
    return this._ngZone.runOutsideAngular(() => this._el.handleValueChange(...args));
  }

  /**
* Checks for validity but does not show a validation message.
* Returns `true` when valid and `false` when invalid.
 */
  @Input()
  callCheckValidity(...args: Parameters<SynRadioGroup['checkValidity']>) {
    return this._ngZone.runOutsideAngular(() => this._el.checkValidity(...args));
  }

  /**
* Gets the associated form, if one exists.
 */
  @Input()
  callGetForm(...args: Parameters<SynRadioGroup['getForm']>) {
    return this._ngZone.runOutsideAngular(() => this._el.getForm(...args));
  }

  /**
* Checks for validity and shows the browser's validation message if the control is invalid.
 */
  @Input()
  callReportValidity(...args: Parameters<SynRadioGroup['reportValidity']>) {
    return this._ngZone.runOutsideAngular(() => this._el.reportValidity(...args));
  }

  /**
* Sets a custom validation message.
* Pass an empty string to restore validity.
 */
  @Input()
  callSetCustomValidity(...args: Parameters<SynRadioGroup['setCustomValidity']>) {
    return this._ngZone.runOutsideAngular(() => this._el.setCustomValidity(...args));
  }

  /**
* Emitted when the radio group's selected value changes.
 */
  @Output() synChangeEvent = new EventEmitter<SynChangeEvent>();

  /**
* Emitted when the radio group receives user input.
 */
  @Output() synInputEvent = new EventEmitter<SynInputEvent>();

  /**
* Emitted when the form control has been checked for validity and its constraints aren't satisfied.
 */
  @Output() synInvalidEvent = new EventEmitter<SynInvalidEvent>();
}

export type { SynChangeEvent } from '@synergy-design-system/components';
export type { SynInputEvent } from '@synergy-design-system/components';
export type { SynInvalidEvent } from '@synergy-design-system/components';
