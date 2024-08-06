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

const hasTouch = () => window.navigator.maxTouchPoints > 0 || !!('ontouchstart' in window);

/**
 * @summary Ranges allow the user to select values within a given range using one or two knobs.
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
 * @event syn-move - Emitted when the user moves a knob, either via touch or keyboard.
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
 * @csspart knob - The knob(s) that the user can drag to change the range.
 *
 * @cssproperty --thumb-size - The size of a knob.
 * @cssproperty --thumb-hit-area-size - The clickable area around the knob.
 * Per default this is set to 140% of the knob size. Must be a scale css value (defaults to 1.4).
 * @cssproperty --track-hit-area-size - The clickable area around the track (top and left).
 * @cssproperty --track-color-active - Color of the track representing the current value.
 * @cssproperty --track-color-inactive - Color of the track that represents the remaining value.
 * @cssproperty --track-height - The height of the track.
 * @cssproperty --track-active-offset - The point of origin of the active track,
 * starting at the left side of the range.
 */
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

  @queryAll('.knob') knobs: NodeListOf<HTMLDivElement>;

  @query('.range__validation-input') validationInput: HTMLInputElement;

  private readonly hasSlotController = new HasSlotController(this, 'help-text', 'label', 'prefix', 'suffix');

  private readonly formControlController = new FormControlController(this, { assumeInteractionOn: ['syn-change'] });

  private localize = new LocalizeController(this);

  #value: readonly number[] = [0];

  #sliderValues = new Map<number, number>();

  #hasFocus = false;

  #validationError = '';

  #validationTimeout: NodeJS.Timeout;

  #nextId = 1;

  #lastChangeValue: number [] = [];

  get #rtl() {
    return this.localize.dir() === 'rtl';
  }

  constructor() {
    super();
    this.tooltipFormatter = this.localize.number.bind(this.localize);
  }

  firstUpdated() {
    this.formControlController.updateValidity();
    // initialize the lastChangeValue with the initial value
    this.#lastChangeValue = Array.from(this.#value);
  }

  protected override willUpdate(changedProperties: PropertyValues) {
    super.willUpdate(changedProperties);

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
      if (!changedProperties.has('value')) {
        this.#lastChangeValue = Array.from(this.#value);
        this.emit('syn-change');
      }
    }
  }

  protected override updated(changedProperties: PropertyValues) {
    super.updated(changedProperties);
    // eslint-disable-next-line no-restricted-syntax
    for (const knob of this.knobs) {
      const sliderId = +knob.dataset.sliderId!;
      // eslint-disable-next-line no-continue
      if (!this.#sliderValues.has(sliderId)) continue;
      this.#moveKnob(knob, this.#sliderValues.get(sliderId)!);
    }
    this.#updateActiveTrack();
  }

  override focus(options?: FocusOptions) {
    const firstKnob = this.knobs.item(0);
    if (firstKnob) {
      firstKnob.focus(options);
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

  #onClickTrack(event: PointerEvent) {
    if (this.disabled) return;
    const { clientX } = event;

    const knobs = Array.from(this.knobs);
    const pos = getNormalizedValueFromClientX(this.baseDiv, knobs.at(0)!, clientX, this.#rtl);
    const unit = this.step / (this.max - this.min);
    const nextValue = this.min + this.step * Math.round(pos / unit);

    // Get the knob that is placed closest to the click position
    const knob = knobs.reduce((prev, curr) => {
      const currValue = this.#sliderValues.get(+curr.dataset.sliderId!)!;
      const prevValue = this.#sliderValues.get(+prev.dataset.sliderId!)!;

      return Math.abs(currValue - nextValue) <= Math.abs(prevValue - nextValue) ? curr : prev;
    });

    const sliderId = +knob.dataset.sliderId!;

    if (!sliderId) return;

    this.#sliderValues.set(sliderId, nextValue);
    this.#moveKnob(knob, nextValue);

    const prevValue = this.#value;
    this.#value = Array.from(this.#sliderValues.values());
    this.#updateActiveTrack();

    if (arraysDiffer(prevValue, this.#value)) {
      this.#lastChangeValue = Array.from(this.#value);
      this.emit('syn-input');
      this.emit('syn-change');
    }
  }

  async #onClickKnob(event: PointerEvent) {
    if (this.disabled) return;
    const knob = event.target as HTMLDivElement;
    this.#updateTooltip(knob);

    if (knob.dataset.pointerId) {
      knob.releasePointerCapture(+knob.dataset.pointerId);
    }

    knob.dataset.pointerId = event.pointerId.toString();
    knob.setPointerCapture(event.pointerId);
    knob.classList.add('grabbed');

    // Show the tooltip on touch devices
    if (hasTouch()) {
      await (knob.parentElement as SynTooltip).show();
    }
  }

  #onDragKnob(event: PointerEvent) {
    if (this.disabled) return;

    const knob = event.target as HTMLDivElement;
    const sliderId = +knob.dataset.sliderId!;
    if (!this.#sliderValues.has(sliderId)) return;

    const pointerId = knob.dataset.pointerId ? +knob.dataset.pointerId : null;
    if (pointerId !== event.pointerId) return;

    const pos = getNormalizedValueFromClientX(this.baseDiv, knob, event.clientX, this.#rtl);
    const unit = this.step / (this.max - this.min);
    const value = this.min + this.step * Math.round(pos / unit);

    const synMove = this.emit('syn-move', {
      cancelable: true,
      detail: {
        element: knob,
        value,
      },
    });

    if (synMove.defaultPrevented) {
      return;
    }

    this.#sliderValues.set(sliderId, value);
    this.#moveKnob(knob, value);

    const prevValue = this.#value;
    this.#value = Array.from(this.#sliderValues.values());
    this.#updateActiveTrack();

    if (arraysDiffer(prevValue, this.#value)) {
      this.emit('syn-input');
    }
  }

  async #onReleaseKnob(event: PointerEvent) {
    const knob = event.target as HTMLDivElement;
    if (!knob.dataset.pointerId || event.pointerId !== +knob.dataset.pointerId) return;

    knob.classList.remove('grabbed');
    knob.releasePointerCapture(event.pointerId);
    delete knob.dataset.pointerId;

    if (arraysDiffer(this.#lastChangeValue, this.#value)) {
      this.#lastChangeValue = Array.from(this.#value);
      this.emit('syn-change');
    }

    // Hide the tooltip on touch devices
    if (hasTouch()) {
      await (knob.parentElement as SynTooltip).hide();
    }
  }

  #moveKnob(knob: HTMLDivElement, value: number) {
    knob.setAttribute('aria-valuenow', value.toString());
    knob.setAttribute('aria-valuetext', this.tooltipFormatter(value));
    const pos = (value - this.min) / (this.max - this.min);
    // eslint-disable-next-line no-param-reassign
    knob.style.insetInlineStart = `calc( ${100 * pos}% - var(--full-thumb-size) * ${pos} )`;
    this.#updateTooltip(knob);
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

    // If there is only one knob, the active track should start at the beginning and end at the knob
    if (this.#value.length === 1) {
      const start = getComputedStyle(this).getPropertyValue('--track-active-offset') || '0%';
      const end = (100 * (this.#value[0] - this.min)) / (this.max - this.min);

      activeTrack.style.insetInlineStart = `min(${start}, ${end}%)`;
      activeTrack.style.insetInlineEnd = `min(calc(100% - ${start}), calc(100% - ${end}%))`;

      return;
    }

    // The render order of the knobs is not guaranteed to be the same as the value order.
    const sortedValues = this.#value.slice().sort(numericSort);

    // Multi knob: Place the active track between the first and last knob
    const start = (100 * (sortedValues[0] - this.min)) / (this.max - this.min);
    const end = (100 * (sortedValues[sortedValues.length - 1] - this.min)) / (this.max - this.min);

    activeTrack.style.insetInlineStart = `${start}%`;
    activeTrack.style.insetInlineEnd = `calc(100% - ${end}%)`;
  }

  #onKeyPress(event: KeyboardEvent) {
    const knob = event.target as HTMLDivElement;
    const sliderId = +knob.dataset.sliderId!;

    const currentValue = this.#sliderValues.get(sliderId);
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
          element: knob,
          value,
        },
      });

      if (synMove.defaultPrevented) {
        return;
      }

      this.#moveKnob(knob, value);

      this.#sliderValues.set(sliderId, value);
      this.#value = Array.from(this.#sliderValues.values());

      this.#updateActiveTrack();
      this.#updateTooltip(knob);

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

  #updateTooltip(knob: HTMLDivElement) {
    if (this.tooltipPlacement === 'none') return;
    const sliderId = +knob.dataset.sliderId!;
    if (!this.#sliderValues.has(sliderId)) return;
    const value = this.#sliderValues.get(sliderId)!;
    const tooltip = knob.parentElement as SynTooltip;
    tooltip.content = this.tooltipFormatter(value);
  }

  #onFocusKnob(event: FocusEvent) {
    if (this.disabled) return;
    if (!this.#hasFocus) {
      this.#hasFocus = true;
      this.emit('syn-focus');
    }
    const knob = event.target as HTMLDivElement;
    if (!knob?.dataset?.sliderId) return;
    this.#updateTooltip(knob);
  }

  #handleInvalid(event: Event) {
    this.formControlController.setValidity(false);
    this.formControlController.emitInvalidEvent(event);
  }

  /* eslint-disable @typescript-eslint/unbound-method */
  private renderKnobs(hasLabel: boolean) {
    // Aria special handling:
    // 1. When there is only one label: Use the provided label as the aria-label for the knob
    // 2. When we have multiple label: Set the label for the first and last item to itself
    const isMultiple = this.#value.length > 1;

    this.#sliderValues.clear();
    return this.#value.map((value, index) => {
      this.#nextId += 1;
      const sliderId = this.#nextId;
      this.#sliderValues.set(sliderId, value);

      const id = `knob-${sliderId}`;

      let ariaLabel = '';
      let ariaLabeledBy = '';

      if (!isMultiple) {
        ariaLabel = this.tooltipFormatter(value);
        ariaLabeledBy = hasLabel ? 'label aria-label-hidden' : 'label-hidden';
      } else {
        ariaLabeledBy = hasLabel ? `label aria-label-hidden ${id}` : 'id label-hidden';

        if (index === 0) {
          ariaLabel = `${this.localize.term('sliderMin')} (${this.tooltipFormatter(value)})`;
        } else if (index === this.#value.length - 1) {
          ariaLabel = `${this.localize.term('sliderMax')} (${this.tooltipFormatter(value)})`;
        } else {
          ariaLabel = this.tooltipFormatter(value);
        }
      }

      return html`
        <syn-tooltip
          hoist
          .disabled=${this.tooltipPlacement === 'none' || this.disabled}
          .placement=${this.tooltipPlacement as 'top' | 'bottom'}
        >
          <div
            aria-disabled=${ifDefined(this.disabled ? 'true' : undefined)}
            aria-labelledby=${ariaLabeledBy}
            aria-label=${ariaLabel}
            aria-valuemax="${this.max}"
            aria-valuemin="${this.min}"
            aria-valuenow="${value}"
            aria-valuetext="${ariaLabel} ${this.tooltipFormatter(value)}"
            class="knob"
            data-slider-id="${sliderId}"
            id=${id}
            part="knob"
            role="slider"
            tabindex="${this.disabled ? -1 : 0}"
            @pointerdown=${this.#onClickKnob}
            @pointermove=${this.#onDragKnob}
            @pointerup=${this.#onReleaseKnob}
            @pointercancel=${this.#onReleaseKnob}
            @keydown=${this.#onKeyPress}
            @focus=${this.#onFocusKnob}
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

        <label id="aria-label-hidden">
          (${this.#value.map(this.tooltipFormatter).join(' - ')})
        </label>

        <div class="base input__control" part="base">
          <span part="prefix" class="input__prefix">
            <slot name="prefix"></slot>
          </span>

          <div class="input__wrapper" part="input-wrapper">
            <input
              class="range__validation-input"
              tabindex="-1"
              hidden
              @invalid=${this.#handleInvalid}
            />

            <div
              class="track__wrapper"
              @click=${this.#onClickTrack}
              part="track-wrapper"
              role="presentation"
            >
              <div class="track__click-helper"></div>
              <div class="track" part="track"></div>
              <div class="active-track" part="active-track"></div>
            </div>

            ${this.renderKnobs(hasLabel)}

            <div
              class="ticks"
              part="ticks"
              @click=${this.#onClickTrack}
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
