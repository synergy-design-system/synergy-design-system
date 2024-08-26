import type { CSSResultGroup } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { html } from 'lit';
import { property, queryAssignedElements, state } from 'lit/decorators.js';
import type {
  SynChangeEvent,
  SynInputEvent,
} from '../../events/events.js';
import componentStyles from '../../styles/component.styles.js';
import SynergyElement from '../../internal/synergy-element.js';
import SynAlert from '../alert/alert.component.js';
import styles from './validate.styles.js';
import {
  ENABLED_FORM_ELEMENTS,
  getIsNativeFormElement,
  getIsSynergyFormElement,
} from './utility.js';

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

  @queryAssignedElements({
    selector: ENABLED_FORM_ELEMENTS.join(','),
  }) private input: HTMLElement[];

  @state() private isValid = true;

  /** Show the invalid message underneath the element, using a syn-alert */
  @property({ reflect: true, type: Boolean }) inline = false;

  /** Do not show the error icon when using inline validation */
  @property({ attribute: 'hide-icon', reflect: true, type: Boolean }) hideIcon = false;

  /**
   * Enable to validate on each input change (e.g. when a keystroke occurs on an input)
   * instead of form submit.
   */
  @property({ reflect: true, type: Boolean }) live = false;

  /**
   * Custom validation message to be displayed when the input is invalid.
   * Will override the default browser validation message.
   */
  @property({ attribute: 'custom-validation', type: String }) customValidation = '';

  validate(event: SynChangeEvent | SynInputEvent | Event) {
    const {
      customValidation,
      inline,
    } = this;
    
    const target = event.target as HTMLInputElement;
    const isValid = target.checkValidity();

    if (customValidation) {
      target.setCustomValidity(customValidation);
    } else {
      target.setCustomValidity('');
    }
  }

  // eslint-disable-next-line complexity
  firstUpdated() {
    if (!this.input || !this.input.length) {
      return;
    }

    const [input] = this.input;

    const isSynElement = getIsSynergyFormElement(input);
    const isNativeElement = getIsNativeFormElement(input);

    // Skip as we have an invalid element slotted
    if (!isSynElement && !isNativeElement) {
      return;
    }

    const listenerToUse = this.live ? 'input' : 'change';
    const finalListenerName = isSynElement ? `syn-${listenerToUse}` : listenerToUse;

    input.addEventListener(finalListenerName, e => this.validate(e));
  }

  private renderInlineValidation() {
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
        ${this.customValidation}
      </syn-alert>
    `;
  }

  render() {
    console.log(this, this.isValid);
    return html`
      <div
        class=${classMap({
          validate: true,
          'validate--inline': this.inline,
        })}
        part="base"
      >
        <slot
          class="validate__input-wrapper"
          part="input-wrapper"
        ></slot>
        
        ${this.inline ? this.renderInlineValidation() : ''}
      </div>
    `;
  }
}
