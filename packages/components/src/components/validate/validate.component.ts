import type { CSSResultGroup } from 'lit';
import { html } from 'lit';
import { property, query, queryAssignedElements, state } from 'lit/decorators.js';
import componentStyles from '../../styles/component.styles.js';
import SynergyElement from '../../internal/synergy-element.js';
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

  @query('slot:not([name])') defaultSlot: HTMLSlotElement;

  @queryAssignedElements() private slottedChildren: HTMLElement[];

  @state() validationMessage = '';

  /** Show the invalid message underneath the element, using a syn-alert */
  @property({ reflect: true, type: Boolean }) inline = false;
  
  /** Do not show the error icon when using inline validation */
  @property({ attribute: 'hide-icon', reflect: true, type: Boolean }) hideIcon = false;

  /**
   * Enable to validate on each input change (e.g. when a keystroke occurs on an input)
   * instead of form submit.
   */
  @property({ reflect: true, type: Boolean }) live = false;

  /** Define a custom event name to listen for */
  @property() on = '';

  /**
   * Custom validation message to be displayed when the input is invalid.
   * Will override the default browser validation message.
   */
  @property({ attribute: 'custom-validation', type: String, reflect: true }) customValidation = '';

  /**
   * Get the input element to validate. Defined as the first slotted element
   * @returns The input element or undefined if not found
   */
  private getInput() {
    const input = this.slottedChildren[0];
    return input as HTMLFormElement | undefined;
  }

  /**
   * Get the event name to listen for.
   * Will return the custom event name if defined, otherwise will return 'input' or 'change',
   * depending on if it is a synergy element or not.
   * @returns The event name to listen for
   */
  private getUsedEventName() {
    if (this.on) {
      return this.on;
    }

    const input = this.getInput();
    const isSynergyElement = input instanceof SynergyElement;

    // Check if we should use synergies custom events
    const baseEventName = this.live ? 'input' : 'change';

    return isSynergyElement ? `syn-${baseEventName}` : baseEventName;
  }

  validate = () => {
    const {
      customValidation,
      inline,
    } = this;

    const input = this.getInput();

    if (!input) {
      return;
    }

    input.setCustomValidity(customValidation || '');

    const isValid = input.checkValidity();

    // Regular case: Use inline browser validation
    if (!inline) {
      input.reportValidity();
      return;
    }

    // When using inline validation, sync the needed attributes
    const validationMessage = isValid ? '' : customValidation || input.validationMessage;
    this.validationMessage = validationMessage;
  }

  firstUpdated() {
    this.defaultSlot.addEventListener(this.getUsedEventName(), this.validate);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.defaultSlot.removeEventListener(this.getUsedEventName(), this.validate);
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
