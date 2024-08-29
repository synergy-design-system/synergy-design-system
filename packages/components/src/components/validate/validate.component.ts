import type { CSSResultGroup } from 'lit';
import { html } from 'lit';
import { property, queryAssignedElements, state } from 'lit/decorators.js';
import componentStyles from '../../styles/component.styles.js';
import SynergyElement from '../../internal/synergy-element.js';
import { watch } from '../../internal/watch.js';
import SynAlert from '../alert/alert.component.js';
import { arraysDiffer } from './utility.js';
import styles from './validate.styles.js';

// on: live

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
 * @csspart alert - The container that wraps the alert.
 * @csspart alert-message - The container that wraps the alert message.
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
   * @example <syn-validate on="invalid change"></syn-validate>
   */
  @property({
    converter: {
      fromAttribute: (e: string) => e.split(' ').map(s => s.trim()),
      toAttribute: (a: string[]) => a.map(e => e.trim()).join(' '),
    },
    reflect: true,
    type: Array,
  }) on: string[] = ['invalid', 'change'];

  /**
   * Custom validation message to be displayed when the input is invalid.
   * Will override the default browser validation message.
   * Set to an empty string to reset the validation message.
   */
  @property({
    attribute: 'custom-validation',
    reflect: true,
    type: String,
  }) customValidation = '';

  /**
   * Automatically refresh all event listeners when the on property changes.
   * @param old Original event listeners to use
   * @param next Next event listeners to use
   */
  @watch('on', { waitUntilFirstUpdate: true })
  handleListenerChange(old: string[], next: string[]) {
    if (arraysDiffer(old, next)) {
      console.log(old, next);
      this.updateEvents();
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
   * If the found input is a synergy element, will use syn- prefixes.
   * Will also make sure to always listen to the invalid event.
   * @returns The event names to listen for
   */
  private getUsedEventNames() {
    const [...events] = this.on;
    const input = this.getInput();
    const isSynergyElement = input instanceof SynergyElement;

    // Make sure to always have an invalid event
    if (!events.includes('invalid')) {
      events.push('invalid');
    }

    // If the input is a synergy element, use syn- prefixed events.
    // Only adjust items that do not already have syn- prefixes to
    // prevent event names like syn-syn-input from being added.
    if (isSynergyElement) {
      return events.map(e => {
        if (e.startsWith('syn-')) return e;
        return `syn-${e}`;
      });
    }
    return events;
  }

  /**
   * Update the events on the input element.
   * @param eventsToAdd The events to attach. If omitted, will use the ones from the on property
   */
  private updateEvents() {
    this.controller.abort();
    this.controller = new AbortController();
    const input = this.getInput();

    if (!input) {
      return;
    }

    const events = this.getUsedEventNames();
    events.forEach(e => {
      input.addEventListener(e, this.validate, {
        capture: e.includes('invalid'),
        signal: this.controller.signal,
      });
    });
  }

  private setValidationMessage(input: HTMLInputElement) {
    const { customValidation } = this;
    const validationMessage = customValidation || input.validationMessage;

    this.validationMessage = validationMessage;
  }

  /**
   * Triggers a validation run, showing the validation message if needed.
   */
  private validate = (e: Event) => {
    // Make sure to always prevent the invalid event when using inline validation
    if (e.type.includes('invalid') && this.inline) {
      e.preventDefault();
      e.stopPropagation();
    }

    const input = e.target as HTMLInputElement;
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
        exportparts="base:alert,message:alert-message"
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
