import type { CSSResultGroup } from 'lit';
import { html } from 'lit';
import { property, queryAssignedElements, state } from 'lit/decorators.js';
import componentStyles from '../../styles/component.styles.js';
import SynergyElement from '../../internal/synergy-element.js';
import { watch } from '../../internal/watch.js';
import SynAlert from '../alert/alert.component.js';
import {
  arraysDiffer,
  getEventNameForElement,
  isBlurEvent,
  isInvalidEvent,
  normalizeEventAttribute,
  onConverter,
} from './utility.js';
import styles from './validate.styles.js';

/**
 * @summary Validate is a helper that may be used to wrap
 * synergy input fields and forms to provide validation message.
 *
 * @dependency syn-alert
 *
 * @slot - The input fields or form element to be validated.
 * Avoid slotting in more than one element, as subsequent ones will be ignored.
 *
 * @csspart base - The component's base wrapper.
 * @csspart input-wrapper - The container that wraps the input field.
 * @csspart alert - The syn-alert that is shown when inline is true.
 * @csspart alert__base - The container that wraps the alert.
 * @csspart alert__message - The container that wraps the alert message.
 * @csspart alert__icon - The container that wraps the alert icon.
 */
export default class SynValidate extends SynergyElement {
  static styles: CSSResultGroup = [componentStyles, styles];

  static dependencies = {
    'syn-alert': SynAlert,
  };

  controller = new AbortController();

  @queryAssignedElements() private slottedChildren: HTMLElement[];

  @state() validationMessage = '';

  /** Show the validation message underneath the element, using a syn-alert */
  @property({ reflect: true, type: Boolean }) inline = false;

  /** Do not show the error icon when using inline validation */
  @property({ attribute: 'hide-icon', reflect: true, type: Boolean }) hideIcon = false;

  /**
   * Defines the events that trigger the validation.
   * Defaults to the `invalid` and `change` events.
   * `invalid` will always automatically be included.
   * You may also use the `live` keyword to validate on every input change.
   * `live` will make sure to listen to the `invalid`, `input` and `blur` events.
   * @example ```html
   * <!-- Use default validation (invalid) -->
   * <syn-validate></syn-validate>
   *
   * <!-- Validate on invalid and change events (invalid, change) -->
   * <syn-validate on="invalid change"></syn-validate>
   *
   * <!-- Validate on live events (invalid, blur, input)-->
   * <syn-validate on="live"></syn-validate>
   *
   * <!-- Validate on live and custom events (invalid, focus, input, change) -->
   * <syn-validate on="live focus change"></syn-validate>
   * ```
   */
  @property({
    converter: onConverter(),
    reflect: true,
  }) on: string = '';

  /**
   * Custom validation message to be displayed when the input is invalid.
   * Will override the default browser validation message.
   * Set to an empty string to reset the validation message.
   */
  @property({ attribute: 'custom-validation', type: String }) customValidation = '';

  /**
   * Automatically refresh all event listeners when the on property changes.
   * @param old Original event listeners to use
   * @param next Next event listeners to use
   */
  @watch('on', { waitUntilFirstUpdate: true })
  handleListenerChange(old: string[], next: string[]) {
    if (arraysDiffer(old, next)) {
      this.updateEvents();
    }
  }

  @watch('customValidation', { waitUntilFirstUpdate: true })
  handleCustomValidationChange() {
    const input = this.getInput();
    if (input) {
      this.setValidationMessage(input);
    }
  }

  /**
   * Get the input element to validate. Defined as the first slotted element
   * @returns The input element or undefined if not found
   */
  private getInput() {
    const input = this.slottedChildren[0];
    return input ? input as HTMLInputElement : undefined;
  }

  /**
   * Get the event names to listen for.
   * If the input is a synergy element, will use syn- prefixes.
   * @returns The event names to listen for
   */
  // eslint-disable-next-line complexity
  private getUsedEventNames() {
    const input = this.getInput();

    // If there is no input, skip before doing any harm
    if (!input) {
      return [];
    }

    // Make sure to always use an array of events
    // This is needed because on may be a special value like "live"
    const on = normalizeEventAttribute(this.on);

    // Filter makes sure to remove empty values, e.g.
    // <syn-validate on=""></syn-validate>
    const [...events] = on.filter(Boolean);

    // Make sure to always have an invalid event
    if (!events.includes('invalid')) {
      events.push('invalid');
    }

    // Special handling for the live keyword:
    // live always means on input and blur
    if (events.includes('live')) {
      events.push('input');
      events.push('blur');
    }

    // Make sure to remove duplicated events and the live property
    // and map the events to the correct event names
    return Array
      .from(new Set(events.filter(e => e !== 'live')))
      .map(e => getEventNameForElement(input, e));
  }

  /**
   * Update the events on the input element.
   */
  private updateEvents() {
    this.controller.abort();
    this.controller = new AbortController();
    const input = this.getInput();

    if (!input) {
      return;
    }

    const events = this.getUsedEventNames();
    events.forEach(eventName => {
      input.addEventListener(eventName, this.validate, {
        capture: isInvalidEvent(eventName),
        signal: this.controller.signal,
      });
    });

    // If the change event is not included,
    // make sure to attach a custom listener that resets the validation message
    // This is needed as the custom message may be set on change
    const usedChangeEvent = getEventNameForElement(input, 'change');
    if (!events.includes(usedChangeEvent)) {
      input.addEventListener(usedChangeEvent, this.internalRevalidate, {
        signal: this.controller.signal,
      });
    }
  }

  private setValidationMessage(input: HTMLInputElement) {
    const { customValidation } = this;
    const validationMessage = customValidation || input.validationMessage;

    this.validationMessage = validationMessage;
  }

  /**
   * Set the validation message from the input element
   * @param e The event that was received
   */
  private internalRevalidate = (e: Event) => {
    const input = e.currentTarget as HTMLInputElement;
    if (input.validity?.valid) {
      this.validationMessage = '';
    }
  };

  /**
   * Handle the blur event during validation
   */
  // eslint-disable-next-line class-methods-use-this
  private handleFocus(input: HTMLInputElement) {
    const activeElement = document.activeElement! as HTMLInputElement;
    const activeElementIsWrapped = activeElement.closest('syn-validate');

    if (!activeElement.validity?.valid && activeElementIsWrapped) {
      // The active element is invalid do not scroll
      return;
    }

    input.scrollIntoView({ block: 'nearest' });
    input.focus();
  }

  /**
   * Triggers a validation run, showing the validation message if needed.
   */
  private validate = (e: Event) => {
    // Make sure to always prevent the invalid event when using inline validation
    if (isInvalidEvent(e.type) && this.inline) {
      e.preventDefault();
      e.stopPropagation();
    }

    const input = e.currentTarget as HTMLInputElement;
    const isValid = input.validity?.valid;

    // If the active element that has focus is placed in a validate component,
    // make sure to not loose focus.
    if (!isValid && !isBlurEvent(e.type)) {
      this.handleFocus(input);
    }

    this.setValidationMessage(input);
  };

  firstUpdated() {
    this.updateEvents();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.controller.abort();
  }

  private renderInlineValidation() {
    if (!this.inline || !this.validationMessage) {
      return '';
    }

    return html`
      <syn-alert
        open
        exportparts="base:alert__base,message:alert__message,icon:alert__icon"
        part="alert"
        variant="danger"
      >
        ${!this.hideIcon
          ? html`<syn-icon slot="icon" name="info"></syn-icon>`
          : ''
        }
        ${this.validationMessage}
      </syn-alert>
    `;
  }

  render() {
    return html`
      <div
        class="validate"
        part="base"
      >
        <slot
          class="validate__input-wrapper"
          part="input-wrapper"
        ></slot>
        
        ${this.renderInlineValidation()}
      </div>
    `;
  }
}
