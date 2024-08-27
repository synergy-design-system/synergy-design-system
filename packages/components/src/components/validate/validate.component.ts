import type { CSSResultGroup } from 'lit';
import { html } from 'lit';
import { property, queryAssignedElements, state } from 'lit/decorators.js';
import componentStyles from '../../styles/component.styles.js';
import SynergyElement from '../../internal/synergy-element.js';
import { watch } from '../../internal/watch.js';
import SynAlert from '../alert/alert.component.js';
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

  /** Show the invalid message underneath the element, using a syn-alert */
  @property({ reflect: true, type: Boolean }) inline = false;

  /** Do not show the error icon when using inline validation */
  @property({ attribute: 'hide-icon', reflect: true, type: Boolean }) hideIcon = false;

  /** Define the events to listen for */
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
   */
  @property({
    attribute: 'custom-validation',
    reflect: true,
    type: String,
  }) customValidation = '';

  /**
   * Clean up old event listeners and attach new ones after changes of the "on" property
   * @param old Orignal event listeners to use
   * @param next Next event listeners to use
   */
  @watch('on', { waitUntilFirstUpdate: true })
  handleListenerChange(_: string[], next: string[]) {
    this.attachEvents(next);
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
   * @returns The event names to listen for
   */
  private getUsedEventNames() {
    const events = this.on;

    const input = this.getInput();
    const isSynergyElement = input instanceof SynergyElement;

    return isSynergyElement ? events.map((event) => `syn-${event}`) : events;
  }

  /**
   * Attach the given events to the input
   * @param eventsToAdd The events to attach. If omitted, will use the ones from the on property
   */
  private attachEvents(eventsToAdd?: string[]) {
    this.controller.abort();
    this.controller = new AbortController();
    const input = this.getInput();

    if (!input) {
      return;
    }

    const events = eventsToAdd || this.getUsedEventNames();
    events.forEach(e => {
      input.addEventListener(e, this.validate, {
        signal: this.controller.signal,
      });
    });
  }

  private setValidationMessage(input: HTMLInputElement) {
    const { customValidation } = this;
    const validationMessage = customValidation || input.validationMessage;

    this.validationMessage = validationMessage;
  }

  private handleInvalidEvent(e: Event) {
    const { inline } = this;

    // If we do not use inline validation, skip
    if (!inline) {
      return;
    }

    e.preventDefault();

    const input = e.target as HTMLInputElement;

    this.setValidationMessage(input);
  }

  private handleGenericEvent(e: Event) {
    const input = e.target as HTMLInputElement;
    this.setValidationMessage(input);
  }

  /**
   * Triggers a validation run, showing the validation message if needed.
   */
  public validate = (e: Event) => {
    if (e.type.includes('invalid')) {
      this.handleInvalidEvent(e);
      return;
    }

    this.handleGenericEvent(e);
  };

  firstUpdated() {
    this.attachEvents();
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
