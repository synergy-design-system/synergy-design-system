/* eslint-disable complexity */
import type { CSSResultGroup, PropertyValues } from 'lit';
import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { property, query, queryAll } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import type { SynergyFormControl } from '../../internal/synergy-element.js';
import { defaultValue } from '../../internal/default-value.js';
import { FormControlController, customErrorValidityState, validValidityState } from '../../internal/form.js';
import { HasSlotController } from '../../internal/slot.js';
import { LocalizeController } from '../../utilities/localize.js';
import componentStyles from '../../styles/component.styles.js';
import formControlStyles from '../../styles/form-control.styles.js';
import formControlCustomStyles from '../../styles/form-control.custom.styles.js';
import SynergyElement from '../../internal/synergy-element.js';
import SynTooltip from '../tooltip/tooltip.component.js';
import {
  arraysDiffer,
  getNormalizedValueFromClientX,
  numericSort,
} from './utility.js';
import styles from './range.styles.js';
import { enableDefaultSettings } from '../../utilities/defaultSettings/decorator.js';

/**
 * @summary Ranges allow the user to select values within a given range using one or two thumbs.
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
 * @event syn-move - Emitted when the user moves a thumb, either via touch or keyboard.
 * Use `Event.preventDefault()` to prevent movement.
 *
 * @csspart form-control - The form control that wraps the label, input, and help text.
 * @csspart form-control-label - The label's wrapper.
 * @csspart form-control-help-text - The help text's wrapper.
 * @csspart base - The component's base wrapper.
 * @csspart input-wrapper - The container that wraps the input track and ticks.
 * @csspart track-wrapper - The wrapper for the track.
 * @csspart track - The inactive track.
 * @csspart active-track - The active track.
 * @csspart prefix - The container that wraps the prefix.
 * @csspart suffix - The container that wraps the suffix.
 * @csspart ticks - The container that wraps the tick marks.
 * @csspart thumb - The thumb(s) that the user can drag to change the range.
 *
 * @csspart tooltip__base - The base of the tooltip
 * @csspart tooltip__arrow - The arrow of the tooltip
 * @csspart tooltip__popup - The popup of the tooltip
 * @csspart tooltip__body - The body of the tooltip
 *
 * @cssproperty --thumb-size - The size of a thumb.
 * @cssproperty --thumb-hit-area-size - The clickable area around the thumb.
 * Per default this is set to 140% of the thumb size. Must be a scale css value (defaults to 1.4).
 * @cssproperty --track-hit-area-size - The clickable area around the track (top and left).
 * @cssproperty --track-color-active - Color of the track representing the current value.
 * @cssproperty --track-color-inactive - Color of the track that represents the remaining value.
 * @cssproperty --track-height - The height of the track.
 * @cssproperty --track-active-offset - The point of origin of the active track,
 * starting at the left side of the range.
 */
@enableDefaultSettings('SynRange')
export default class SynRange extends SynergyElement implements SynergyFormControl {
  static styles: CSSResultGroup = [
    componentStyles,
    formControlStyles,
    formControlCustomStyles,
    styles,
  ];

  static dependencies = {
    'syn-tooltip': SynTooltip,
  };

  /** The name of the range, submitted as a name/value pair with form data. */
  @property() name = '';

  /** The range's label. If you need to display HTML, use the `label` slot instead. */
  @property() label = '';

  /** The range's help text. If you need to display HTML, use the help-text slot instead. */
  @property({ attribute: 'help-text' }) helpText = '';

  /** Disables the range. */
  @property({ reflect: true, type: Boolean }) disabled = false;

  /** The minimum acceptable value of the range. */
  @property({ type: Number }) min = 0;

  /** The maximum acceptable value of the range. */
  @property({ type: Number }) max = 100;

  /** The interval at which the range will increase and decrease. */
  @property({ type: Number }) step = 1;

  /** The range's size. */
  @property({ reflect: true }) size: 'small' | 'medium' | 'large' = 'medium';

  /** The preferred placement of the range's tooltip. Use "none" to disable the tooltip */
  @property({ attribute: 'tooltip-placement', type: String }) tooltipPlacement: 'top' | 'bottom' | 'none' = 'top';

  /** The current values of the input (in ascending order) as a string of space separated values */
  @property({ type: String })
  set value(value: string | null) {
    this.#value = value ? value.split(' ').map(n => +n).sort(numericSort) : [];
  }

  get value() {
    return this.#value.slice().sort(numericSort).join(' ');
  }

  /**
   * Set to true to restrict the movement of a thumb to its next and previous thumb.
   * This only affects multi range components
   */
  @property({ attribute: 'restrict-movement', type: Boolean }) restrictMovement = false;

  /** Gets or sets the current values of the range as an array of numbers */
  set valueAsArray(value: readonly number[] | null) {
    const oldValue = this.#value;
    this.#value = Array.isArray(value) ? value.slice().sort(numericSort) : value || [];
    if (arraysDiffer(oldValue, this.#value)) {
      this.requestUpdate('value', oldValue.join(' '));
    }
  }

  get valueAsArray() {
    return [...this.#value].sort(numericSort);
  }

  /** The default value of the form control. Primarily used for resetting the form control. */
  @defaultValue() defaultValue = '0';

  /**
   * By default, form controls are associated with the nearest containing `<form>` element.
   * This attribute allows you to place the form control outside of a form
   * and associate it with the form that has this `id`.
   * The form must be in the same document or shadow root for this to work.
   */
  @property({ reflect: true }) form = '';

  /**
   * A function used to format the tooltip's value.
   * The value of the thumb is passed as the only argument.
   * The function should return a string to display in the tooltip.
   */
  @property({ attribute: false }) tooltipFormatter: (value: number) => string;

  @query('.input__wrapper') baseDiv: HTMLDivElement;

  @query('.active-track') activeTrack: HTMLDivElement;

  @query('.ticks') ticks: HTMLDivElement;

  @queryAll('.thumb') thumbs: NodeListOf<HTMLDivElement>;

  @query('.range__validation-input') validationInput: HTMLInputElement;

  private readonly hasSlotController = new HasSlotController(this, 'help-text', 'label', 'prefix', 'suffix', 'ticks');

  private readonly formControlController = new FormControlController(this, { assumeInteractionOn: ['syn-change'] });

  private localize = new LocalizeController(this);

  private visibilityObserver: IntersectionObserver;

  #value: readonly number[] = [0];

  #rangeValues = new Map<number, number>();

  #hasFocus = false;

  #validationError = '';

  #validationTimeout: NodeJS.Timeout;

  #lastChangeValue: number [] = [];

  get #rtl() {
    return this.localize.dir() === 'rtl';
  }

  constructor() {
    super();
    this.tooltipFormatter = this.localize.number.bind(this.localize);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this?.visibilityObserver?.disconnect();
  }

  firstUpdated() {
    // #727: Check if the ticks are visible and update the prefix and suffix position when they are.
    this.visibilityObserver = new IntersectionObserver((entries) => {
      const entry = entries.at(0);
      if (entry && entry.isIntersecting && entry.target.checkVisibility()) {
        this.#updatePrefixSuffixPosition(entry.boundingClientRect.height);
      }
    }, {
      // We bind the root to the parent element of the ticks to make sure we are only called
      // when the ticks are visible, not when the ticks are scrolled out of the viewport.
      root: this.ticks.parentElement,
    });
    this.visibilityObserver.observe(this.ticks);

    this.formControlController.updateValidity();
    // initialize the lastChangeValue with the initial value
    this.#lastChangeValue = Array.from(this.#value);
    /**
     * Silence the screen reader for the tooltip.
     * Otherwise it will read the new value on change multiple times instead of just one time.
     * The aria-hidden needs to be set where the aria-live attribute is set, to silence it.
     */
    this.thumbs.forEach((thumb) => {
      const tooltip = thumb.parentElement as SynTooltip;
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      tooltip.updateComplete.then(() => {
        const tooltipBody = tooltip.shadowRoot!.querySelector('.tooltip__body');
        tooltipBody?.setAttribute('aria-hidden', 'true');
      });
    });
  }

  protected override willUpdate(changedProperties: PropertyValues) {
    super.willUpdate(changedProperties);

    // When the proposed min is bigger than the max value,
    // we need to swap the values to make sure the min is always smaller than the max
    // @example <syn-range min="50" max="10"> becomes <syn-range min="10" max="50">
    if (this.min > this.max) {
      [this.min, this.max] = [this.max, this.min];
    }

    if (this.step > this.max - this.min) {
      this.step = this.max - this.min;
    }

    if (this.step <= 0) {
      this.step = 1;
    }

    const adjustedValue = this.#value
      .map(value => {
        if (value <= this.min) return this.min;
        if (value >= this.max) return this.max;
        const nextValue = this.min + this.step * Math.round((value - this.min) / this.step);
        if (nextValue > this.max) return this.max;
        return nextValue;
      });

    if (arraysDiffer(this.#value, adjustedValue)) {
      this.#value = adjustedValue;
    }
  }

  protected override updated(changedProperties: PropertyValues) {
    super.updated(changedProperties);
    // eslint-disable-next-line no-restricted-syntax
    for (const thumb of this.thumbs) {
      const rangeId = +thumb.dataset.rangeId!;
      // eslint-disable-next-line no-continue
      if (!this.#rangeValues.has(rangeId)) continue;
      this.#moveThumb(thumb, this.#rangeValues.get(rangeId)!);
    }
    this.#updateActiveTrack();
  }

  override focus(options?: FocusOptions) {
    const firstThumb = this.thumbs.item(0);
    if (firstThumb) {
      firstThumb.focus(options);
    } else {
      super.focus(options);
    }
  }

  /**
   * Checks for validity but does not show a validation message.
   * Returns `true` when valid and `false` when invalid.
   */
  public checkValidity() {
    if (this.disabled) return true;
    const isValid = !this.#validationError;

    if (!isValid) {
      this.formControlController.emitInvalidEvent();
    }

    return isValid;
  }

  /** Checks for validity and shows the browser's validation message if the control is invalid. */
  public reportValidity() {
    if (this.disabled) return true;

    const isValid = this.validity.valid;

    this.formControlController.setValidity(isValid);
    this.validationInput.hidden = true;
    clearTimeout(this.#validationTimeout);

    if (!isValid) {
      // Show the browser's constraint validation message
      this.validationInput.hidden = false;
      this.validationInput.reportValidity();
      this.#validationTimeout = setTimeout(() => {
        this.validationInput.hidden = true;
      }, 10000);
    }

    return isValid;
  }

  /** Sets a custom validation message. Pass an empty string to restore validity. */
  public setCustomValidity(message: string) {
    this.#validationError = message;
    this.validationInput.setCustomValidity(message);
    this.formControlController.updateValidity();
  }

  /** Gets the associated form, if one exists. */
  public getForm(): HTMLFormElement | null {
    return this.formControlController.getForm();
  }

  /** Gets the validity state object */
  public get validity(): ValidityState {
    if (this.#validationError) return customErrorValidityState;

    return validValidityState;
  }

  /** Gets the validation message */
  public get validationMessage() {
    return this.#validationError;
  }

  #onClickTrack(event: PointerEvent, focusThumb = true) {
    if (this.disabled) return;
    const { clientX } = event;

    const thumbs = Array.from(this.thumbs);
    const pos = getNormalizedValueFromClientX(this.baseDiv, clientX, this.#rtl);
    const unit = this.step / (this.max - this.min);
    const nextValue = this.min + this.step * Math.round(pos / unit);

    // Get the thumb that is placed closest to the click position
    const thumb = thumbs.reduce((prev, curr) => {
      const currValue = this.#rangeValues.get(+curr.dataset.rangeId!)!;
      const prevValue = this.#rangeValues.get(+prev.dataset.rangeId!)!;

      const currDiff = Math.abs(currValue - nextValue);
      const prevDiff = Math.abs(prevValue - nextValue);

      if (currDiff === prevDiff) {
        // If the difference is the same, we use the thumb which has the correct order.
        // left track click --> prev, right track click --> curr
        return currValue < nextValue ? curr : prev;
      }

      return currDiff < prevDiff ? curr : prev;
    });

    const rangeId = +thumb.dataset.rangeId!;

    if (!rangeId) return;

    this.#rangeValues.set(rangeId, nextValue);
    this.#moveThumb(thumb, nextValue);

    const prevValue = this.#value;
    this.#value = Array.from(this.#rangeValues.values());
    this.#updateActiveTrack();

    if (arraysDiffer(prevValue, this.#value)) {
      this.#lastChangeValue = Array.from(this.#value);
      this.emit('syn-input');
      this.emit('syn-change');
    }

    // #595: Redispatch the original event to start dragging the thumb
    // whenever the user clicked on the track.
    // The check for focusThumb makes sure this does not happen when clicking on the track items
    const newEvt = new PointerEvent('pointerdown', event);
    if (focusThumb) {
      if (thumb.dispatchEvent(newEvt)) {
        this.#updateTooltip(thumb);
      }
    }
  }

  /**
   * Special method for handling clicks on track items
   * When clicking track items, we do not want the thumb to have focus
   */
  #onClickTrackItem(event: PointerEvent) {
    this.#onClickTrack(event, false);
  }

  /**
   * Get the boundaries of a given thumb
   * @param thumb The thumb element that was moved
   * @param value The current value of a thumb
   * @returns An object containing information about the current boundaries
   */
  #movementBoundariesForThumb(thumb: HTMLDivElement, value: number) {
    // If we are in restrict mode, we should not move the thumb
    // if it is smaller than the previous thumb or larger than the next thumb
    const values = this.valueAsArray!;
    const thumbs = Array.from(this.thumbs);
    const thumbIndex = thumbs.indexOf(thumb);

    // Get the previous and next thumb and see what are our valid ranges
    const prevValue = values[thumbIndex - 1] || this.min;
    const nextValue = values[thumbIndex + 1] || this.max;

    const isRestricted = value < prevValue || value > nextValue;
    const finalValue = Math.max(prevValue, Math.min(nextValue, value));

    return {
      finalValue,
      isRestricted,
      nextValue,
      prevValue,
    };
  }

  async #onClickThumb(event: PointerEvent) {
    if (this.disabled) return;

    const thumb = event.target as HTMLDivElement;
    this.#updateTooltip(thumb);

    if (thumb.dataset.pointerId) {
      thumb.releasePointerCapture(+thumb.dataset.pointerId);
    }

    thumb.dataset.pointerId = event.pointerId.toString();
    thumb.setPointerCapture(event.pointerId);
    thumb.classList.add('grabbed');

    await (thumb.parentElement as SynTooltip).show();
  }

  #onDragThumb(event: PointerEvent) {
    if (this.disabled) return;

    const thumb = event.target as HTMLDivElement;
    const rangeId = +thumb.dataset.rangeId!;
    if (!this.#rangeValues.has(rangeId)) return;

    const pointerId = thumb.dataset.pointerId ? +thumb.dataset.pointerId : null;
    if (pointerId !== event.pointerId) return;

    const pos = getNormalizedValueFromClientX(this.baseDiv, event.clientX, this.#rtl);
    const unit = this.step / (this.max - this.min);
    let value = this.min + this.step * Math.round(pos / unit);

    const synMove = this.emit('syn-move', {
      cancelable: true,
      detail: {
        element: thumb,
        value,
      },
    });

    if (synMove.defaultPrevented) {
      return;
    }

    if (this.restrictMovement) {
      const movementData = this.#movementBoundariesForThumb(thumb, value);
      if (movementData.isRestricted) {
        value = movementData.finalValue;
        // Make sure the thumb has the highest z-index of all thumbs
        thumb.style.zIndex = (3 + this.thumbs.length).toFixed(0);
      } else {
        thumb.style.zIndex = '3';
      }
    }

    this.#rangeValues.set(rangeId, value);
    this.#moveThumb(thumb, value);

    const prevValue = this.#value;
    this.#value = Array.from(this.#rangeValues.values());
    this.#updateActiveTrack();

    if (arraysDiffer(prevValue, this.#value)) {
      this.emit('syn-input');
    }
  }

  async #onReleaseThumb(event: PointerEvent) {
    const thumb = event.target as HTMLDivElement;
    if (!thumb.dataset.pointerId || event.pointerId !== +thumb.dataset.pointerId) return;

    thumb.classList.remove('grabbed');
    thumb.releasePointerCapture(event.pointerId);
    delete thumb.dataset.pointerId;

    if (arraysDiffer(this.#lastChangeValue, this.#value)) {
      this.#lastChangeValue = Array.from(this.#value);
      this.emit('syn-change');
    }

    await (thumb.parentElement as SynTooltip).hide();
  }

  #moveThumb(thumb: HTMLDivElement, value: number) {
    thumb.setAttribute('aria-valuenow', value.toString());
    thumb.setAttribute('aria-valuetext', this.tooltipFormatter(value));
    const pos = (value - this.min) / (this.max - this.min);
    // eslint-disable-next-line no-param-reassign
    thumb.style.insetInlineStart = `calc(${100 * pos}% - var(--half-thumb-size))`;
    this.#updateTooltip(thumb);
  }

  #updateActiveTrack() {
    const { activeTrack } = this;
    if (!activeTrack) return;

    // Special case: User set min and max to the same values.
    // To not show the active track in this case.
    if (this.min === this.max) {
      activeTrack.style.insetInlineStart = '0%';
      activeTrack.style.insetInlineEnd = '0%';
      return;
    }

    // If there is only one thumb, the active track should start at the beginning
    // and end at the thumb
    if (this.#value.length === 1) {
      const start = getComputedStyle(this).getPropertyValue('--track-active-offset') || '0%';
      const end = (100 * (this.#value[0] - this.min)) / (this.max - this.min);

      activeTrack.style.insetInlineStart = `min(${start}, ${end}%)`;
      activeTrack.style.insetInlineEnd = `min(calc(100% - ${start}), calc(100% - ${end}%))`;

      return;
    }

    // The render order of the thumbs is not guaranteed to be the same as the value order.
    const sortedValues = this.#value.slice().sort(numericSort);

    // Multi thumb: Place the active track between the first and last thumb
    const start = (100 * (sortedValues[0] - this.min)) / (this.max - this.min);
    const end = (100 * (sortedValues[sortedValues.length - 1] - this.min)) / (this.max - this.min);

    activeTrack.style.insetInlineStart = `${start}%`;
    activeTrack.style.insetInlineEnd = `calc(100% - ${end}%)`;
  }

  #onKeyPress(event: KeyboardEvent) {
    const thumb = event.target as HTMLDivElement;
    const rangeId = +thumb.dataset.rangeId!;

    const currentValue = this.#rangeValues.get(rangeId);
    if (currentValue === undefined) return;

    let value = currentValue;

    switch (event.key) {
    case 'ArrowUp':
    case 'Up':
      value = Math.min(currentValue + this.step, this.max);
      break;
    case 'ArrowDown':
    case 'Down':
      value = Math.max(currentValue - this.step, this.min);
      break;
    case 'ArrowLeft':
    case 'Left':
      value = this.#rtl
        ? Math.min(currentValue + this.step, this.max)
        : Math.max(currentValue - this.step, this.min);
      break;
    case 'ArrowRight':
    case 'Right':
      value = this.#rtl
        ? Math.max(currentValue - this.step, this.min)
        : Math.min(currentValue + this.step, this.max);
      break;
    case 'PageUp':
      value = Math.min(
        currentValue + ((this.max - this.min) / 5),
        this.max,
      );
      break;
    case 'PageDown':
      value = Math.max(
        (currentValue - (this.max - this.min) / 5),
        this.min,
      );
      break;
    case 'Home':
      value = this.min;
      break;
    case 'End':
      value = this.max;
      break;
    default:
      return;
    }

    if (value !== currentValue) {
      // Make sure the user is able to intercept movement
      const synMove = this.emit('syn-move', {
        cancelable: true,
        detail: {
          element: thumb,
          value,
        },
      });

      if (synMove.defaultPrevented) {
        return;
      }

      if (this.restrictMovement) {
        const movementData = this.#movementBoundariesForThumb(thumb, value);
        if (movementData.isRestricted) {
          value = movementData.finalValue;
        }
      }

      this.#moveThumb(thumb, value);

      this.#rangeValues.set(rangeId, value);
      this.#value = Array.from(this.#rangeValues.values());

      this.#updateActiveTrack();
      this.#updateTooltip(thumb);

      this.#lastChangeValue = Array.from(this.#value);
      this.emit('syn-input');
      this.emit('syn-change');
    }

    event.stopPropagation();
    event.preventDefault();
  }

  #onBlur(event: FocusEvent) {
    if (event.relatedTarget && this.shadowRoot?.contains(event.relatedTarget as Node)) return;
    this.emit('syn-blur');
    this.#hasFocus = false;
  }

  #updateTooltip(thumb: HTMLDivElement) {
    if (this.tooltipPlacement === 'none') return;
    const rangeId = +thumb.dataset.rangeId!;
    if (!this.#rangeValues.has(rangeId)) return;
    const value = this.#rangeValues.get(rangeId)!;
    const tooltip = thumb.parentElement as SynTooltip;
    tooltip.content = this.tooltipFormatter(value);
  }

  #onFocusThumb(event: FocusEvent) {
    if (this.disabled) return;
    if (!this.#hasFocus) {
      this.#hasFocus = true;
      this.emit('syn-focus');
    }
    const thumb = event.target as HTMLDivElement;
    if (!thumb?.dataset?.rangeId) return;
    this.#updateTooltip(thumb);
  }

  #handleInvalid(event: Event) {
    this.formControlController.setValidity(false);
    this.formControlController.emitInvalidEvent(event);
  }

  #updatePrefixSuffixPosition(height?: number) {
    const hasTicksSlot = this.hasSlotController.test('ticks');
    const hasPrefixSlot = this.hasSlotController.test('prefix');
    const hasSuffixSlot = this.hasSlotController.test('suffix');

    if (!hasTicksSlot) {
      return;
    }

    let ticksHeight = height || this.shadowRoot?.querySelector('.ticks')?.clientHeight;
    if (ticksHeight) {
      // Add two pixels as the 1px margin on top and bottom are not included in the clientHeight
      ticksHeight += 2;

      ticksHeight /= 2;

      if (hasPrefixSlot) {
        const prefix = this.shadowRoot?.querySelector('.input__prefix') as HTMLElement;
        prefix.style.transform = `translateY(-${ticksHeight}px)`;
      }

      if (hasSuffixSlot) {
        const suffix = this.shadowRoot?.querySelector('.input__suffix') as HTMLElement;
        suffix.style.transform = `translateY(-${ticksHeight}px)`;
      }
    }
  }

  /* eslint-disable @typescript-eslint/unbound-method */
  private renderThumbs(hasLabel: boolean) {
    // Aria special handling:
    // 1. When there is only one label: Use the provided label as the aria-label for the thumb
    // 2. When we have multiple label: Set the label for the first and last item to itself
    const isMultiple = this.#value.length > 1;

    this.#rangeValues.clear();
    return this.#value.map((value, index) => {
      const rangeId = index + 1;
      this.#rangeValues.set(rangeId, value);

      const id = `thumb-${rangeId}`;

      let ariaLabel = '';
      let ariaLabeledBy = '';

      if (!isMultiple) {
        ariaLabeledBy = hasLabel ? 'label aria-label-hidden' : '';
      } else {
        ariaLabeledBy = hasLabel ? `label aria-label-hidden ${id}` : `aria-label-hidden ${id}`;

        if (index === 0) {
          ariaLabel = `${this.localize.term('rangeMin')} (${this.tooltipFormatter(value)})`;
        } else if (index === this.#value.length - 1) {
          ariaLabel = `${this.localize.term('rangeMax')} (${this.tooltipFormatter(value)})`;
        } else {
          ariaLabel = this.tooltipFormatter(value);
        }
      }

      return html`
        <syn-tooltip
          exportparts="base:tooltip__base, base__arrow:tooltip__arrow, base__popup:tooltip__popup, body:tooltip__body"
          hoist
          .disabled=${this.tooltipPlacement === 'none' || this.disabled}
          .placement=${this.tooltipPlacement as 'top' | 'bottom'}
          trigger="focus"
        >
          <div
            aria-disabled=${ifDefined(this.disabled ? 'true' : undefined)}
            aria-labelledby=${ariaLabeledBy}
            aria-label=${ariaLabel}
            aria-valuemax="${this.max}"
            aria-valuemin="${this.min}"
            aria-valuenow="${value}"
            aria-valuetext="${this.tooltipFormatter(value)}"
            class="thumb"
            data-range-id="${rangeId}"
            id=${id}
            part="thumb"
            role="slider"
            tabindex="${this.disabled ? -1 : 0}"
            @pointerdown=${this.#onClickThumb}
            @pointermove=${this.#onDragThumb}
            @pointerup=${this.#onReleaseThumb}
            @pointercancel=${this.#onReleaseThumb}
            @pointerleave=${this.#onReleaseThumb}
            @keydown=${this.#onKeyPress}
            @focus=${this.#onFocusThumb}
          ></div>
        </syn-tooltip>
      `;
    });
  }
  /* eslint-enable @typescript-eslint/unbound-method */

  /* eslint-disable @typescript-eslint/unbound-method */
  override render() {
    const hasLabelSlot = this.hasSlotController.test('label');
    const hasHelpTextSlot = this.hasSlotController.test('help-text');
    const hasPrefixSlot = this.hasSlotController.test('prefix');
    const hasSuffixSlot = this.hasSlotController.test('suffix');
    const hasLabel = this.label ? true : !!hasLabelSlot;
    const hasHelpText = this.helpText ? true : !!hasHelpTextSlot;

    return html`
      <div
        part="form-control"
        class=${classMap({
          'form-control': true,
          'form-control--has-help-text': hasHelpText,
          'form-control--has-label': hasLabel,
          'form-control--has-prefix': hasPrefixSlot,
          'form-control--has-suffix': hasSuffixSlot,
          'form-control--is-disabled': this.disabled,
          'form-control--large': this.size === 'large',
          'form-control--medium': this.size === 'medium',
          'form-control--small': this.size === 'small',
        })}
        @focusout=${this.#onBlur}
      >
        <label
          id="label"
          part="form-control-label"
          class="form-control__label"
          aria-hidden=${hasLabel ? 'false' : 'true'}
          @click=${this.focus}
        >
          <slot name="label">${this.label}</slot>
        </label>

        <label id="aria-label-hidden" class="visually-hidden">
          (${this.#value.map(this.tooltipFormatter).join(' - ')})
        </label>

        <div class="base input__control" part="base">
          <span part="prefix" class="input__prefix">
            <slot name="prefix"></slot>
          </span>

          <div class="input__wrapper" part="input-wrapper">
            <input
              class="range__validation-input visually-hidden"
              tabindex="-1"
              hidden
              @invalid=${this.#handleInvalid}
            />

            <div
              class="track__wrapper"
              @pointerdown=${this.#onClickTrack}
              part="track-wrapper"
              role="presentation"
            >
              <div class="track__click-helper"></div>
              <div class="track" part="track"></div>
              <div class="active-track" part="active-track"></div>
            </div>

            ${this.renderThumbs(hasLabel)}

            <div
              class="ticks"
              part="ticks"
              @pointerdown=${this.#onClickTrackItem}
              role="presentation"
            >
              <slot name="ticks"></slot>
            </div>
          </div>

          <span part="suffix" class="input__suffix">
            <slot name="suffix"></slot>
          </span>
        </div>

        <div
          part="form-control-help-text"
          class="form-control__help-text"
          aria-hidden=${hasHelpText ? 'false' : 'true'}
        >
          <slot name="help-text">${this.helpText}</slot>
        </div>
      </div>
    `;
  }
  /* eslint-enable @typescript-eslint/unbound-method */
}
