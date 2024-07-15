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
  SynBlurEvent, SynChangeEvent, SynFocusEvent, SynInputEvent, SynInvalidEvent, SynRange,
} from '@synergy-design-system/components';
import '@synergy-design-system/components/components/range/range.js';

/**
 * @summary Ranges allow the user to select values within a given range using one or two knob.
 * @documentation https://synergy-design-system.github.io/?path=/docs/components-syn-range--docs
 * @status stable
 *
 * @dependency syn-tooltip
 *
 * @slot label - The range's label. Alternatively, you can use the `label` attribute.
 * @slot prefix - Used to prepend a presentational icon or similar element to the range.
 * @slot suffix - Used to append a presentational icon or similar element to the range.
 * @slot help-text - Text that describes how to use the range.
 * Alternatively, you can use the `help-text` attribute.
 * @slot ticks - Used to display tick marks at specific intervals along the range.
 *
 * @event syn-blur - Emitted when the control loses focus.
 * @event syn-change - Emitted when an alteration to the control's value is committed by the user.
 * @event syn-focus - Emitted when the control gains focus.
 * @event syn-input - Emitted when the control receives input.
 * @event syn-invalid - Emitted when the form control has been checked for validity
 * and its constraints aren't satisfied.
 *
 * @csspart form-control - The form control that wraps the label, input, and help text.
 * @csspart form-control-label - The label's wrapper.
 * @csspart form-control-help-text - The help text's wrapper.
 * @csspart base - The component's base wrapper.
 * @csspart input-wrapper - The container that wraps the input track and ticks.
 * @csspart track-wrapper - The wrapper for the track.
 * @csspart track - The inactive track.
 * @csspart active-track - The active track.
 * @csspart ticks - The container that wraps the tick marks.
 * @csspart prefix - The container that wraps the prefix.
 * @csspart suffix - The container that wraps the suffix.
 * @csspart ticks - The container that wraps the tick marks.
 * @csspart knob - The knob(s) that the user can drag to change the range.
 *
 * @cssproperty --thumb-size - The size of the thumb.
 * @cssproperty --thumb-clickable-area - The clickable area around the thumb.
 * Per default this uses 40% of the thumb size. Must be a scale css value (e.g. 1.8).
 * @cssproperty --track-color-active - Color of the track representing the current value.
 * @cssproperty --track-color-inactive - Color of the track that represents the remaining value.
 * @cssproperty --track-height - The height of the track.
 * @cssproperty --track-active-offset - The point of origin of the active track.
 */
@Component({
  selector: 'syn-range',
  standalone: true,
  template: '<ng-content></ng-content>',
})
export class SynRangeComponent {
  public nativeElement: SynRange;

  private _ngZone: NgZone;

  constructor(e: ElementRef, ngZone: NgZone) {
    this.nativeElement = e.nativeElement;
    this._ngZone = ngZone;
    this.nativeElement.addEventListener('syn-blur', (e: SynBlurEvent) => { this.synBlurEvent.emit(e); });
    this.nativeElement.addEventListener('syn-change', (e: SynChangeEvent) => { this.synChangeEvent.emit(e); });
    this.nativeElement.addEventListener('syn-focus', (e: SynFocusEvent) => { this.synFocusEvent.emit(e); });
    this.nativeElement.addEventListener('syn-input', (e: SynInputEvent) => { this.synInputEvent.emit(e); this.valueChange.emit(this.value); });
    this.nativeElement.addEventListener('syn-invalid', (e: SynInvalidEvent) => { this.synInvalidEvent.emit(e); });
  }

  /**
* The name of the range, submitted as a name/value pair with form data.
 */
  @Input()
  set name(v: SynRange['name']) {
    this._ngZone.runOutsideAngular(() => (this.nativeElement.name = v));
  }

  get name() {
    return this.nativeElement.name;
  }

  /**
* The range's label.
* If you need to display HTML, use the `label` slot instead.
 */
  @Input()
  set label(v: SynRange['label']) {
    this._ngZone.runOutsideAngular(() => (this.nativeElement.label = v));
  }

  get label() {
    return this.nativeElement.label;
  }

  /**
* The range's help text.
* If you need to display HTML, use the help-text slot instead.
 */
  @Input()
  set helpText(v: SynRange['helpText']) {
    this._ngZone.runOutsideAngular(() => (this.nativeElement.helpText = v));
  }

  get helpText() {
    return this.nativeElement.helpText;
  }

  /**
* Disables the range.
 */
  @Input()
  set disabled(v: SynRange['disabled']) {
    this._ngZone.runOutsideAngular(() => (this.nativeElement.disabled = v));
  }

  get disabled() {
    return this.nativeElement.disabled;
  }

  /**
* The minimum acceptable value of the range.
 */
  @Input()
  set min(v: SynRange['min']) {
    this._ngZone.runOutsideAngular(() => (this.nativeElement.min = v));
  }

  get min() {
    return this.nativeElement.min;
  }

  /**
* The maximum acceptable value of the range.
 */
  @Input()
  set max(v: SynRange['max']) {
    this._ngZone.runOutsideAngular(() => (this.nativeElement.max = v));
  }

  get max() {
    return this.nativeElement.max;
  }

  /**
* The interval at which the range will increase and decrease.
 */
  @Input()
  set step(v: SynRange['step']) {
    this._ngZone.runOutsideAngular(() => (this.nativeElement.step = v));
  }

  get step() {
    return this.nativeElement.step;
  }

  /**
* The range's size.
 */
  @Input()
  set size(v: SynRange['size']) {
    this._ngZone.runOutsideAngular(() => (this.nativeElement.size = v));
  }

  get size() {
    return this.nativeElement.size;
  }

  /**
* The preferred placement of the range's tooltip.
 */
  @Input()
  set tooltipPlacement(v: SynRange['tooltipPlacement']) {
    this._ngZone.runOutsideAngular(() => (this.nativeElement.tooltipPlacement = v));
  }

  get tooltipPlacement() {
    return this.nativeElement.tooltipPlacement;
  }

  /**
* Set the visibility of the tooltip
 */
  @Input()
  set tooltipDisabled(v: SynRange['tooltipDisabled']) {
    this._ngZone.runOutsideAngular(() => (this.nativeElement.tooltipDisabled = v));
  }

  get tooltipDisabled() {
    return this.nativeElement.tooltipDisabled;
  }

  /**
* The current values of the input (in ascending order) as a string of space separated values
 */
  @Input()
  set value(v: SynRange['value']) {
    this._ngZone.runOutsideAngular(() => (this.nativeElement.value = v));
  }

  get value() {
    return this.nativeElement.value;
  }

  /**
* By default, form controls are associated with the nearest containing `<form>` element.
This attribute allows you to place the form control outside of a form
and associate it with the form that has this `id`.
The form must be in the same document or shadow root for this to work.
 */
  @Input()
  set form(v: SynRange['form']) {
    this._ngZone.runOutsideAngular(() => (this.nativeElement.form = v));
  }

  get form() {
    return this.nativeElement.form;
  }

  /**
* Emitted when the control loses focus.
 */
  @Output() synBlurEvent = new EventEmitter<SynBlurEvent>();

  /**
* Emitted when an alteration to the control's value is committed by the user.
 */
  @Output() synChangeEvent = new EventEmitter<SynChangeEvent>();

  /**
* Emitted when the control gains focus.
 */
  @Output() synFocusEvent = new EventEmitter<SynFocusEvent>();

  /**
* Emitted when the control receives input.
 */
  @Output() synInputEvent = new EventEmitter<SynInputEvent>();

  /**
* Emitted when the form control has been checked for validity and its constraints aren't satisfied.
 */
  @Output() synInvalidEvent = new EventEmitter<SynInvalidEvent>();

  /**
* Support for two way data binding
 */
  @Output() valueChange = new EventEmitter<SynRange['value']>();
}

export type { SynBlurEvent } from '@synergy-design-system/components';
export type { SynChangeEvent } from '@synergy-design-system/components';
export type { SynFocusEvent } from '@synergy-design-system/components';
export type { SynInputEvent } from '@synergy-design-system/components';
export type { SynInvalidEvent } from '@synergy-design-system/components';
