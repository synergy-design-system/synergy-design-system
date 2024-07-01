/* eslint-disable complexity */
import type { CSSResultGroup, PropertyValues } from 'lit';
import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { property, query, queryAll } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import type { SynergyFormControl } from '../../internal/synergy-element.js';
import { defaultValue } from '../../internal/default-value.js';
import { FormControlController } from '../../internal/form.js';
import { HasSlotController } from '../../internal/slot.js';
import { LocalizeController } from '../../utilities/localize.js';
import componentStyles from '../../styles/component.styles.js';
import formControlStyles from '../../styles/form-control.styles.js';
import formControlCustomStyles from '../../styles/form-control.custom.styles.js';
import SynergyElement from '../../internal/synergy-element.js';
import SynTooltip from '../tooltip/tooltip.component.js';
import { arraysDiffer, numericSort } from './utility.js';
import styles from './range.styles.js';

/**
 * @summary Multi-Ranges allow the user to select
 * multiple values within a given range using a slider with multiple handles.
 * @documentation https://shoelace.style/components/multi-range
 * @status experimental
 * @since next
 *
 * @dependency syn-tooltip
 *
 * @slot label - The range's label. Alternatively, you can use the `label` attribute.
 * @slot help-text - Text that describes how to use the input.
 * Alternatively, you can use the `help-text` attribute.
 *
 * @event syn-blur - Emitted when the control loses focus.
 * @event syn-change - Emitted when an alteration to the control's value is committed by the user.
 * @event syn-focus - Emitted when the control gains focus.
 * @event syn-input - Emitted when the control receives input.
 *
 * @csspart form-control - The form control that wraps the label, input, and help text.
 * @csspart form-control-label - The label's wrapper.
 * @csspart form-control-help-text - The help text's wrapper.
 * @csspart base - The component's base wrapper.
 * @csspart tooltip - The range's tooltip.
 *
 * @cssproperty --thumb-size - The size of the thumb.
 * @cssproperty --track-color-active - Color of the track representing the current value.
 * @cssproperty --track-color-inactive - Color of the track that represents the remaining value.
 * @cssproperty --track-height - The height of the track.
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

  /** The preferred placement of the range's tooltip. */
  @property({ attribute: 'tooltip-placement', type: String }) tooltipPlacement: Extract<SynTooltip['placement'], 'top' | 'bottom'> = 'top';

  /** Set the visibility of the tooltip  */
  @property({ attribute: 'tooltip-disabled', type: Boolean }) tooltipDisabled = false;

  /** The current values of the input (in ascending order) as a string of space separated values */
  @property({ type: String })
  set value(value: string | null) {
    this.#value = value ? value.split(' ').map(n => +n) : [];
  }

  get value() {
    return this.#value.join(' ');
  }

  /** Gets or sets the current values of the range as an array of numbers */
  set valueAsArray(value: readonly number[] | null) {
    const oldValue = this.#value;
    this.#value = value || [];
    if (arraysDiffer(oldValue, this.#value)) {
      this.requestUpdate('value', oldValue.join(','));
    }
  }

  get valueAsArray() {
    return this.#value;
  }

  /** The default value of the form control. Primarily used for resetting the form control. */
  @defaultValue() defaultValue = (this.max / 2).toFixed(0);

  /**
   * A function used to format the tooltip's value.
   * The range's value is passed as the first and only argument. The
   * function should return a string to display in the tooltip.
   */
  @property({ attribute: false }) tooltipFormatter: (value: number) => string;

  @query('.base') baseDiv: HTMLDivElement;

  @query('.active-track') activeTrack: HTMLDivElement;

  @queryAll('.handle') handles: NodeListOf<HTMLDivElement>;

  #hasSlotController = new HasSlotController(this, 'help-text', 'label');

  #formControlController = new FormControlController(this, { assumeInteractionOn: ['syn-change'] });

  #localize = new LocalizeController(this);

  #value: readonly number[] = [this.max / 2];

  #sliderValues = new Map<number, number>();

  #hasFocus = false;

  #validationError = '';

  #nextId = 1;

  get #rtl() {
    return this.#localize.dir() === 'rtl';
  }

  constructor() {
    super();
    this.tooltipFormatter = this.#localize.number.bind(this.#localize);
  }

  /* eslint-disable @typescript-eslint/unbound-method */
  override render(): unknown {
    const hasLabel = !!(this.label || this.#hasSlotController.test('label'));
    const hasHelpText = !!(this.helpText || this.#hasSlotController.test('help-text'));

    this.#sliderValues.clear();
    const handles = this.#value.map(value => {
      this.#nextId += 1;
      const sliderId = this.#nextId;
      this.#sliderValues.set(sliderId, value);
      return html`
        <syn-tooltip .placement=${this.tooltipPlacement} .disabled=${this.tooltipDisabled}>
          <div
            class="handle"
            tabindex="${this.disabled ? -1 : 0}"
            role="slider"
            aria-labelledby=${ifDefined(hasLabel ? 'label' : undefined)}
            aria-valuemin="${this.min}"
            aria-valuemax="${this.max}"
            aria-disabled=${ifDefined(this.disabled ? 'true' : undefined)}
            aria-valuenow="${value}"
            data-slider-id="${sliderId}"
            @pointerdown=${this.#onClickHandle}
            @pointermove=${this.#onDragHandle}
            @pointerup=${this.#onReleaseHandle}
            @pointercancel=${this.#onReleaseHandle}
            @keydown=${this.#onKeyPress}
            @focus=${this.#onFocusHandle}
          ></div>
        </syn-tooltip>
      `;
    });

    return html`
      <div
        part="form-control"
        class=${classMap({
          'form-control': true,
          'form-control--has-help-text': hasHelpText,
          'form-control--has-label': hasLabel,
          'form-control--medium': true, // range only has one size
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
        <div class="base" part="base">
          <div class="track"></div>
          <div class="active-track"></div>
          ${handles}
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

  protected override willUpdate(changedProperties: PropertyValues): void {
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
      })
      .sort(numericSort);

    if (arraysDiffer(this.#value, adjustedValue)) {
      this.#value = adjustedValue;
      if (!changedProperties.has('value')) {
        this.emit('syn-change');
      }
    }
  }

  protected override updated(changedProperties: PropertyValues): void {
    super.updated(changedProperties);
    // eslint-disable-next-line no-restricted-syntax
    for (const handle of this.handles) {
      const sliderId = +handle.dataset.sliderId!;
      // eslint-disable-next-line no-continue
      if (!this.#sliderValues.has(sliderId)) continue;
      this.#moveHandle(handle, this.#sliderValues.get(sliderId)!);
    }
    this.#updateActiveTrack();
  }

  override focus(options?: FocusOptions): void {
    const firstHandle = this.handles.item(0);
    if (firstHandle) {
      firstHandle.focus(options);
    } else {
      super.focus(options);
    }
  }

  /**
   * Checks for validity but does not show a validation message.
   * Returns `true` when valid and `false` when invalid.
   */
  public checkValidity(): boolean {
    return !this.#validationError;
  }

  /** Checks for validity and shows the browser's validation message if the control is invalid. */
  public reportValidity(): boolean {
    this.#validationError = '';
    return true;
  }

  /** Sets a custom validation message. Pass an empty string to restore validity. */
  public setCustomValidity(message: string): void {
    this.#validationError = message;
    this.#formControlController.updateValidity();
  }

  /** Gets the associated form, if one exists. */
  public getForm(): HTMLFormElement | null {
    return this.#formControlController.getForm();
  }

  /** Gets the validity state object */
  public get validity(): ValidityState {
    return {
      badInput: false,
      customError: !!this.#validationError,
      patternMismatch: false,
      rangeOverflow: false,
      rangeUnderflow: false,
      stepMismatch: false,
      tooLong: false,
      tooShort: false,
      typeMismatch: false,
      valid: !this.#validationError,
      valueMissing: false,
    };
  }

  /** Gets the validation message */
  public get validationMessage(): string {
    return this.#validationError;
  }

  #onClickHandle(event: PointerEvent): void {
    if (this.disabled) return;
    const handle = event.target as HTMLDivElement;
    this.#updateTooltip(handle);

    if (handle.dataset.pointerId) {
      handle.releasePointerCapture(+handle.dataset.pointerId);
    }

    if (this.disabled) return;

    handle.dataset.pointerId = event.pointerId.toString();
    handle.setPointerCapture(event.pointerId);
    handle.classList.add('grabbed');
  }

  #onDragHandle(event: PointerEvent): void {
    if (this.disabled) return;

    const handle = event.target as HTMLDivElement;
    const sliderId = +handle.dataset.sliderId!;
    if (!this.#sliderValues.has(sliderId)) return;

    const pointerId = handle.dataset.pointerId ? +handle.dataset.pointerId : null;
    if (pointerId !== event.pointerId) return;

    const pos = this.#getNormalizedValueFromClientX(handle, event.clientX);
    const unit = this.step / (this.max - this.min);
    const value = this.min + this.step * Math.round(pos / unit);
    this.#sliderValues.set(sliderId, value);
    this.#moveHandle(handle, value);

    const prevValue = this.#value;
    this.#value = Array.from(this.#sliderValues.values()).sort(numericSort);
    this.#updateActiveTrack();

    if (arraysDiffer(prevValue, this.#value)) {
      this.emit('syn-input');
    }
  }

  #getNormalizedValueFromClientX(handle: HTMLDivElement, x: number): number {
    const bounds = this.baseDiv.getBoundingClientRect();
    const size = bounds.width - handle.clientWidth;
    if (size <= 0) return 0;

    let nextX = x;

    nextX -= bounds.left + handle.clientWidth / 2;
    if (nextX <= 0) return this.#rtl ? 1 : 0;
    if (nextX >= size) return this.#rtl ? 0 : 1;
    nextX /= size;
    return this.#rtl ? 1.0 - nextX : nextX;
  }

  #updateActiveTrack(): void {
    const { activeTrack } = this;
    if (!activeTrack) return;

    if (this.min === this.max || this.#value.length < 2) {
      activeTrack.style.display = 'none';
      activeTrack.style.insetInlineStart = '0';
      activeTrack.style.width = '0';
      return;
    }

    const start = (100 * (this.#value[0] - this.min)) / (this.max - this.min);
    const span = (
      100 * (this.#value[this.#value.length - 1] - this.#value[0])
    ) / (this.max - this.min);

    activeTrack.style.display = 'inline-block';
    activeTrack.style.insetInlineStart = `${start}%`;
    activeTrack.style.width = `${span}%`;
  }

  #onKeyPress(event: KeyboardEvent): void {
    const handle = event.target as HTMLDivElement;
    const sliderId = +handle.dataset.sliderId!;

    let value = this.#sliderValues.get(sliderId);
    if (value === undefined) return;

    switch (event.key) {
    case 'ArrowUp':
    case 'Up':
      value = Math.min(value + this.step, this.max);
      break;
    case 'ArrowDown':
    case 'Down':
      value = Math.max(value - this.step, this.min);
      break;
    case 'ArrowLeft':
    case 'Left':
      value = this.#rtl
        ? Math.min(value + this.step, this.max)
        : Math.max(value - this.step, this.min);
      break;
    case 'ArrowRight':
    case 'Right':
      value = this.#rtl
        ? Math.max(value - this.step, this.min)
        : Math.min(value + this.step, this.max);
      break;
    case 'PageUp':
      value = Math.min(value + 10 * this.step, this.max);
      break;
    case 'PageDown':
      value = Math.max(value - 10 * this.step, this.min);
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

    this.baseDiv.classList.add('keyboard-focus');

    if (value !== this.#sliderValues.get(sliderId)) {
      this.#moveHandle(handle, value);

      this.#sliderValues.set(sliderId, value);
      this.#value = Array.from(this.#sliderValues.values()).sort(numericSort);
      this.#updateActiveTrack();

      this.emit('syn-input');
      this.emit('syn-change');
    }

    event.stopPropagation();
    event.preventDefault();
  }

  #onReleaseHandle(event: PointerEvent) {
    const handle = event.target as HTMLDivElement;
    if (!handle.dataset.pointerId || event.pointerId !== +handle.dataset.pointerId) return;

    handle.classList.remove('grabbed');
    handle.releasePointerCapture(event.pointerId);
    delete handle.dataset.pointerId;
    this.emit('syn-change');
  }

  #moveHandle(handle: HTMLDivElement, value: number): void {
    handle.setAttribute('aria-valuenow', value.toString());
    handle.setAttribute('aria-valuetext', this.tooltipFormatter(value));
    const pos = (value - this.min) / (this.max - this.min);
    // eslint-disable-next-line no-param-reassign
    handle.style.insetInlineStart = `calc( ${100 * pos}% - var(--thumb-size) * ${pos} )`;
    this.#updateTooltip(handle);
  }

  #onBlur(event: FocusEvent): void {
    this.baseDiv?.classList?.remove('keyboard-focus');
    if (event.relatedTarget && this.shadowRoot?.contains(event.relatedTarget as Node)) return;
    this.emit('syn-blur');
    this.#hasFocus = false;
  }

  #updateTooltip(handle: HTMLDivElement): void {
    const sliderId = +handle.dataset.sliderId!;
    if (!this.#sliderValues.has(sliderId)) return;
    const value = this.#sliderValues.get(sliderId)!;
    const tooltip = handle.parentElement as SynTooltip;
    tooltip.content = this.tooltipFormatter(value);
  }

  #onFocusHandle(event: FocusEvent): void {
    if (this.disabled) return;
    if (!this.#hasFocus) {
      this.#hasFocus = true;
      this.emit('syn-focus');
    }
    const handle = event.target as HTMLDivElement;
    if (!handle?.dataset?.sliderId) return;
    this.#updateTooltip(handle);
  }
}
