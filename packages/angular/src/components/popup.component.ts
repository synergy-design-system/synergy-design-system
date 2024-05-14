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
import type { SynPopup, SynRepositionEvent } from '@synergy-design-system/components';
import '@synergy-design-system/components/components/popup/popup.js';

/**
 * @summary Popup is a utility that lets you declaratively anchor "popup" containers to another element.
 * @documentation https://synergy.style/components/popup
 * @status stable
 * @since 2.0
 *
 * @event syn-reposition - Emitted when the popup is repositioned. This event can fire a lot, so avoid putting expensive
 *  operations in your listener or consider debouncing it.
 *
 * @slot - The popup's content.
 * @slot anchor - The element the popup will be anchored to. If the anchor lives outside of the popup, you can use the
 *  `anchor` attribute or property instead.
 *
 * @csspart arrow - The arrow's container. Avoid setting `top|bottom|left|right` properties, as these values are
 *  assigned dynamically as the popup moves. This is most useful for applying a background color to match the popup, and
 *  maybe a border or box shadow.
 * @csspart popup - The popup's container. Useful for setting a background color, box shadow, etc.
 * @csspart hover-bridge - The hover bridge element. Only available when the `hover-bridge` option is enabled.
 *
 * @cssproperty [--arrow-size=6px] - The size of the arrow. Note that an arrow won't be shown unless the `arrow`
 *  attribute is used.
 * @cssproperty [--arrow-color=var(--syn-color-neutral-0)] - The color of the arrow.
 * @cssproperty [--auto-size-available-width] - A read-only custom property that determines the amount of width the
 *  popup can be before overflowing. Useful for positioning child elements that need to overflow. This property is only
 *  available when using `auto-size`.
 * @cssproperty [--auto-size-available-height] - A read-only custom property that determines the amount of height the
 *  popup can be before overflowing. Useful for positioning child elements that need to overflow. This property is only
 *  available when using `auto-size`.
 */
@Component({
  selector: 'syn-popup',
  standalone: true,
  template: '<ng-content></ng-content>',
})
export class SynPopupComponent {
  public nativeElement: SynPopup;

  private _ngZone: NgZone;

  constructor(e: ElementRef, ngZone: NgZone) {
    this.nativeElement = e.nativeElement;
    this._ngZone = ngZone;
    this.nativeElement.addEventListener('syn-reposition', (e: SynRepositionEvent) => { this.synRepositionEvent.emit(e); });
  }

  /**
* The element the popup will be anchored to.
* If the anchor lives outside of the popup, you can provide the anchor
element `id`, a DOM element reference, or a `VirtualElement`.
* If the anchor lives inside the popup, use the
`anchor` slot instead.
 */
  @Input()
  set anchor(v: SynPopup['anchor']) {
    this._ngZone.runOutsideAngular(() => (this.nativeElement.anchor = v));
  }

  get anchor() {
    return this.nativeElement.anchor;
  }

  /**
* Activates the positioning logic and shows the popup.
* When this attribute is removed, the positioning logic is torn
down and the popup will be hidden.
 */
  @Input()
  set active(v: SynPopup['active']) {
    this._ngZone.runOutsideAngular(() => (this.nativeElement.active = v));
  }

  get active() {
    return this.nativeElement.active;
  }

  /**
* The preferred placement of the popup.
* Note that the actual placement will vary as configured to keep the
panel inside of the viewport.
 */
  @Input()
  set placement(v: SynPopup['placement']) {
    this._ngZone.runOutsideAngular(() => (this.nativeElement.placement = v));
  }

  get placement() {
    return this.nativeElement.placement;
  }

  /**
* Determines how the popup is positioned.
* The `absolute` strategy works well in most cases, but if overflow is
clipped, using a `fixed` position strategy can often workaround it.
 */
  @Input()
  set strategy(v: SynPopup['strategy']) {
    this._ngZone.runOutsideAngular(() => (this.nativeElement.strategy = v));
  }

  get strategy() {
    return this.nativeElement.strategy;
  }

  /**
* The distance in pixels from which to offset the panel away from its anchor.
 */
  @Input()
  set distance(v: SynPopup['distance']) {
    this._ngZone.runOutsideAngular(() => (this.nativeElement.distance = v));
  }

  get distance() {
    return this.nativeElement.distance;
  }

  /**
* The distance in pixels from which to offset the panel along its anchor.
 */
  @Input()
  set skidding(v: SynPopup['skidding']) {
    this._ngZone.runOutsideAngular(() => (this.nativeElement.skidding = v));
  }

  get skidding() {
    return this.nativeElement.skidding;
  }

  /**
* Attaches an arrow to the popup.
* The arrow's size and color can be customized using the `--arrow-size` and
`--arrow-color` custom properties.
* For additional customizations, you can also target the arrow using
`::part(arrow)` in your stylesheet.
 */
  @Input()
  set arrow(v: SynPopup['arrow']) {
    this._ngZone.runOutsideAngular(() => (this.nativeElement.arrow = v));
  }

  get arrow() {
    return this.nativeElement.arrow;
  }

  /**
* The placement of the arrow.
* The default is `anchor`, which will align the arrow as close to the center of the
anchor as possible, considering available space and `arrow-padding`.
* A value of `start`, `end`, or `center` will
align the arrow to the start, end, or center of the popover instead.
 */
  @Input()
  set arrowPlacement(v: SynPopup['arrowPlacement']) {
    this._ngZone.runOutsideAngular(() => (this.nativeElement.arrowPlacement = v));
  }

  get arrowPlacement() {
    return this.nativeElement.arrowPlacement;
  }

  /**
* The amount of padding between the arrow and the edges of the popup.
* If the popup has a border-radius, for example,
this will prevent it from overflowing the corners.
 */
  @Input()
  set arrowPadding(v: SynPopup['arrowPadding']) {
    this._ngZone.runOutsideAngular(() => (this.nativeElement.arrowPadding = v));
  }

  get arrowPadding() {
    return this.nativeElement.arrowPadding;
  }

  /**
* When set, placement of the popup will flip to the opposite site to keep it in view.
* You can use
`flipFallbackPlacements` to further configure how the fallback placement is determined.
 */
  @Input()
  set flip(v: SynPopup['flip']) {
    this._ngZone.runOutsideAngular(() => (this.nativeElement.flip = v));
  }

  get flip() {
    return this.nativeElement.flip;
  }

  /**
* If the preferred placement doesn't fit, popup will be tested in these fallback placements until one fits.
* Must be a
string of any number of placements separated by a space, e.g.
* "top bottom left".
* If no placement fits, the flip
fallback strategy will be used instead.
 */
  @Input()
  set flipFallbackPlacements(v: SynPopup['flipFallbackPlacements']) {
    this._ngZone.runOutsideAngular(() => (this.nativeElement.flipFallbackPlacements = v));
  }

  get flipFallbackPlacements() {
    return this.nativeElement.flipFallbackPlacements;
  }

  /**
* When neither the preferred placement nor the fallback placements fit, this value will be used to determine whether
the popup should be positioned using the best available fit based on available space or as it was initially
preferred.
 */
  @Input()
  set flipFallbackStrategy(v: SynPopup['flipFallbackStrategy']) {
    this._ngZone.runOutsideAngular(() => (this.nativeElement.flipFallbackStrategy = v));
  }

  get flipFallbackStrategy() {
    return this.nativeElement.flipFallbackStrategy;
  }

  /**
* The flip boundary describes clipping element(s) that overflow will be checked relative to when flipping.
* By
default, the boundary includes overflow ancestors that will cause the element to be clipped.
* If needed, you can
change the boundary by passing a reference to one or more elements to this property.
 */
  @Input()
  set flipBoundary(v: SynPopup['flipBoundary']) {
    this._ngZone.runOutsideAngular(() => (this.nativeElement.flipBoundary = v));
  }

  get flipBoundary() {
    return this.nativeElement.flipBoundary;
  }

  /**
* The amount of padding, in pixels, to exceed before the flip behavior will occur.
 */
  @Input()
  set flipPadding(v: SynPopup['flipPadding']) {
    this._ngZone.runOutsideAngular(() => (this.nativeElement.flipPadding = v));
  }

  get flipPadding() {
    return this.nativeElement.flipPadding;
  }

  /**
* Moves the popup along the axis to keep it in view when clipped.
 */
  @Input()
  set shift(v: SynPopup['shift']) {
    this._ngZone.runOutsideAngular(() => (this.nativeElement.shift = v));
  }

  get shift() {
    return this.nativeElement.shift;
  }

  /**
* The shift boundary describes clipping element(s) that overflow will be checked relative to when shifting.
* By
default, the boundary includes overflow ancestors that will cause the element to be clipped.
* If needed, you can
change the boundary by passing a reference to one or more elements to this property.
 */
  @Input()
  set shiftBoundary(v: SynPopup['shiftBoundary']) {
    this._ngZone.runOutsideAngular(() => (this.nativeElement.shiftBoundary = v));
  }

  get shiftBoundary() {
    return this.nativeElement.shiftBoundary;
  }

  /**
* The amount of padding, in pixels, to exceed before the shift behavior will occur.
 */
  @Input()
  set shiftPadding(v: SynPopup['shiftPadding']) {
    this._ngZone.runOutsideAngular(() => (this.nativeElement.shiftPadding = v));
  }

  get shiftPadding() {
    return this.nativeElement.shiftPadding;
  }

  /**
* When set, this will cause the popup to automatically resize itself to prevent it from overflowing.
 */
  @Input()
  set autoSize(v: SynPopup['autoSize']) {
    this._ngZone.runOutsideAngular(() => (this.nativeElement.autoSize = v));
  }

  get autoSize() {
    return this.nativeElement.autoSize;
  }

  /**
* Syncs the popup's width or height to that of the anchor element.
 */
  @Input()
  set sync(v: SynPopup['sync']) {
    this._ngZone.runOutsideAngular(() => (this.nativeElement.sync = v));
  }

  get sync() {
    return this.nativeElement.sync;
  }

  /**
* The auto-size boundary describes clipping element(s) that overflow will be checked relative to when resizing.
* By
default, the boundary includes overflow ancestors that will cause the element to be clipped.
* If needed, you can
change the boundary by passing a reference to one or more elements to this property.
 */
  @Input()
  set autoSizeBoundary(v: SynPopup['autoSizeBoundary']) {
    this._ngZone.runOutsideAngular(() => (this.nativeElement.autoSizeBoundary = v));
  }

  get autoSizeBoundary() {
    return this.nativeElement.autoSizeBoundary;
  }

  /**
* The amount of padding, in pixels, to exceed before the auto-size behavior will occur.
 */
  @Input()
  set autoSizePadding(v: SynPopup['autoSizePadding']) {
    this._ngZone.runOutsideAngular(() => (this.nativeElement.autoSizePadding = v));
  }

  get autoSizePadding() {
    return this.nativeElement.autoSizePadding;
  }

  /**
* When a gap exists between the anchor and the popup element, this option will add a "hover bridge" that fills the
gap using an invisible element.
* This makes listening for events such as `mouseenter` and `mouseleave` more sane
because the pointer never technically leaves the element.
* The hover bridge will only be drawn when the popover is
active.
 */
  @Input()
  set hoverBridge(v: SynPopup['hoverBridge']) {
    this._ngZone.runOutsideAngular(() => (this.nativeElement.hoverBridge = v));
  }

  get hoverBridge() {
    return this.nativeElement.hoverBridge;
  }

  /**
* Forces the popup to recalculate and reposition itself.
 */
  @Input()
  callReposition(...args: Parameters<SynPopup['reposition']>) {
    return this._ngZone.runOutsideAngular(() => this.nativeElement.reposition(...args));
  }

  /**
* Emitted when the popup is repositioned.
* This event can fire a lot, so avoid putting expensive operations in your listener or consider debouncing it.
 */
  @Output() synRepositionEvent = new EventEmitter<SynRepositionEvent>();
}

export type { SynRepositionEvent } from '@synergy-design-system/components';
