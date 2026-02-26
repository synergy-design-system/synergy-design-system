import type { CSSResultGroup, PropertyValues } from 'lit';
import { html } from 'lit';
import {
  property,
  query,
  queryAssignedElements,
  state,
} from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import componentStyles from '../../styles/component.styles.js';
import SynergyElement from '../../internal/synergy-element.js';
import type SynInput from '../input/input.component.js';
import { watch } from '../../internal/watch.js';
import SynAlert from '../alert/alert.component.js';
import SynTooltip from '../tooltip/tooltip.component.js';
import {
  alertSizeForInput,
  getActualInputElement,
  getEventNameForElement,
  isBlurEvent,
  isInvalidEvent,
  isSynergyElement,
  normalizeEventAttribute,
} from './utility.js';
import styles from './validate.styles.js';
import { enableDefaultSettings } from '../../utilities/defaultSettings/decorator.js';

/**
 * Utility function that renders the default slot content.
 * This is needed to avoid code duplication when rendering the default slot in both the tooltip and the regular render function.
 */
const renderDefaultSlot = () => html`
  <slot
    class="validate__input-wrapper"
    part="input-wrapper"
  ></slot>
`;

/**
 * @summary Validate provides form field validation messages in a unified way.
 * It does this by using [the native browser validation](https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation)
 * and showing the validation message in a consistent, user defined way.
 * @documentation https://synergy-design-system.github.io/?path=/docs/components-syn-validate--docs
 * @dependency syn-alert
 * @dependency syn-tooltip
 *
 * @slot - The form field that should be validated.
 * Avoid slotting in more than one element, as subsequent ones will be ignored.
 *
 * @csspart base - The component's base wrapper.
 * @csspart input-wrapper - The container that wraps the form field.
 *
 * @csspart alert - The syn-alert that is shown when the variant is set to "inline".
 * @csspart alert__base - The container that wraps the alert.
 * @csspart alert__message - The container that wraps the alert message.
 * @csspart alert__icon - The container that wraps the alert icon.
 *
 * @csspart tooltip - The syn-tooltip that is shown when the variant is set to "tooltip".
 * @csspart tooltip__base - The container that wraps the tooltip.
 * @csspart tooltip__popup - The container that wraps the tooltip popup.
 * @csspart tooltip__arrow - The container that wraps the tooltip arrow.
 * @csspart tooltip__body - The container that wraps the tooltip body.
*/
@enableDefaultSettings('SynValidate')
export default class SynValidate extends SynergyElement {
  static styles: CSSResultGroup = [componentStyles, styles];

  static dependencies = {
    'syn-alert': SynAlert,
    'syn-tooltip': SynTooltip,
  };

  controller = new AbortController();

  observer: MutationObserver;

  sizeObserver: MutationObserver;

  @queryAssignedElements() private slottedChildren: HTMLElement[];

  @query('syn-tooltip') private tooltipElement?: SynTooltip;

  @state() validationMessage = '';

  @state() eagerFirstMount = true;

  @state() isInternalTriggeredInvalid = false;

  @state() isValid = true;

  @state() alertSize?: SynInput['size'];

  @state() hasFocus = false;

  /**
   * The variant that should be used to show validation alerts.
   *
   * The following variants are supported:
   * - **native** (default): Uses the native browser validation, usually a browser tooltip.
   * - **tooltip**: Show the validation message as a tooltip using a `<syn-tooltip>`.
   * - **inline**: Show the validation message underneath the element, using a `<syn-alert>`
   */
  @property({ reflect: true }) variant: 'native' | 'tooltip' | 'inline' = 'native';

  /** Do not show the error icon when using the inline variant validation */
  @property({ attribute: 'hide-icon', reflect: true, type: Boolean }) hideIcon = false;

  /**
   * Defines the events that trigger the validation.
   * `invalid` will always automatically be included.
   * You may also use the `live` keyword to validate on every input change.
   * `live` will make sure to listen to the `invalid`, `input` and `blur` events.
   *
   * Please have a look at the [documentation for native form validation](https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation)
   * and [the use of form invalid events](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/invalid_event) for further information.
   *
   * @example ```html
   * <!-- Validate on invalid and change events (invalid, change) -->
   * <syn-validate on="invalid change"></syn-validate>
   *
   * <!-- Validate on live events (invalid, blur, input)-->
   * <syn-validate on="live"></syn-validate>
   *
   * <!-- Validate on live and custom events (invalid, blur, input, focus, change) -->
   * <syn-validate on="live focus change"></syn-validate>
   * ```
   */
  @property({ reflect: true }) on: string = '';

  /**
   * Custom validation message to be displayed when the input is invalid.
   * Will override the default browser validation message.
   * Set to an empty string to reset the validation message.
   */
  @property({ attribute: 'custom-validation-message', type: String }) customValidationMessage = '';

  /**
   * Set this to true to validate the input immediately when it is rendered.
   * Best used with a `variant` of `inline`.
   * When setting eager, the input will not be focused automatically.
   *
   * When using a `variant` of `native` the browser will focus
   * the last eager field as it is using a tooltip.
   * In this case it is better to just provide one eager field.
   */
  @property({ type: Boolean }) eager = false;

  // Automatically refresh all event listeners when the on property changes.
  @watch('on', { waitUntilFirstUpdate: true })
  handleListenerChange() {
    this.updateEvents();
  }

  @watch('eager', { waitUntilFirstUpdate: false })
  async handleEagerChange() {
    if (this.eager) {
      const input = this.getInput();
      await this.updateComplete;
      input?.reportValidity();
      this.eagerFirstMount = true;
    } else {
      this.eagerFirstMount = false;
    }
  }

  // Synchronize the validation message on the wrapped input with the custom message
  @watch('customValidationMessage', { waitUntilFirstUpdate: true })
  handleCustomValidationMessageChange() {
    const input = this.getInput();
    if (input) {
      this.setCustomValidationMessage(input);
      this.setValidationMessage(input);
    }
  }

  /**
   * Returns the validity state of the input component.
   * `true` for valid and `false` for invalid.
   */
  getValidity() {
    return this.isValid;
  }

  /**
   * Get the input element to validate. Defined as the first slotted element
   * @returns The input element or undefined if not found
   */
  private getInput() {
    const input = this.slottedChildren[0];
    return input ? input as HTMLInputElement : undefined;
  }

  private setAlertSize() {
    this.alertSize = alertSizeForInput(this.getInput());
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
    return Array.from(new Set(
      events
        .filter(e => e !== 'live')
        .map(e => getEventNameForElement(input, e)),
    ));
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
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
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

    // #664: Add focus/blur listeners specifically for tooltip variant
    // This is needed because we want to show the tooltip on focus and hide it on blur, but only when using the tooltip variant.
    // Otherwise, this would interfere with the native validation tooltip, which also relies on focus and blur events.
    const focusEvent = getEventNameForElement(input, 'focus');
    const blurEvent = getEventNameForElement(input, 'blur');

    input.addEventListener(focusEvent, this.handleInputFocus, {
      signal: this.controller.signal,
    });

    input.addEventListener(blurEvent, this.handleInputBlur, {
      signal: this.controller.signal,
    });
  }

  private setValidationMessage(input: HTMLInputElement) {
    const { customValidationMessage } = this;
    const validationMessage = customValidationMessage || input.validationMessage;
    this.validationMessage = validationMessage;
  }

  /**
   * Set the custom validation message to the input. This will make sure to either:
   * - use the custom message if one is set or
   * - use the default message if the custom message is empty
   */
  private setCustomValidationMessage(input: HTMLInputElement) {
    // Set the custom validation message on the input only once, when the customValidationMessage
    // is changed. Otherwise there could be problems with `variant="native"` and `on="live"` or
    //  `on="blur"`, because the browser popup will never disappear even if clicking somewhere else.
    input.setCustomValidity(this.customValidationMessage);
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
   * Handle focus/blur events for tooltip variant
   */
  private handleInputFocus = () => {
    this.hasFocus = true;
  };

  private handleInputBlur = () => {
    this.hasFocus = false;
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
  // eslint-disable-next-line complexity
  private validate = async (e: Event) => {
    // Make sure to stop the validate component from going into an endless cycle of triggering
    if (isInvalidEvent(e.type) && this.variant === 'native' && this.isInternalTriggeredInvalid === true) {
      this.isInternalTriggeredInvalid = false;
      return;
    }

    // Make sure to always prevent the invalid event when not using native validation
    if (isInvalidEvent(e.type) && this.variant !== 'native') {
      e.preventDefault();
      e.stopPropagation();
    }

    const input = e.currentTarget as HTMLInputElement;
    if (isSynergyElement(input)) {
      // When using a synergy element, we need to wait for it to be ready!
      // This is needed as the validity state of the element may not be set yet.
      await input.updateComplete;
    }
    this.isValid = input.validity?.valid;

    // When we are using eager, make sure to skip focus on the first mount
    if (this.eager && this.eagerFirstMount) {
      this.eagerFirstMount = false;
      this.setValidationMessage(input);
      return;
    }

    // If the active element that has focus is placed in a validate component,
    // make sure to not loose focus.
    if (!this.isValid && !isBlurEvent(e.type)) {
      this.handleFocus(input);
    }

    this.setValidationMessage(input);

    // Trigger reportValidity when using native validation, so the browser popup is also shown
    // for other events than `invalid`. All events except the blur event, should trigger this.
    if (!isBlurEvent(e.type) && this.variant === 'native') {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      this.updateComplete.then(() => {
        this.isInternalTriggeredInvalid = true;
        input.reportValidity();
      });
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  async firstUpdated(changedProperties: PropertyValues) {
    super.firstUpdated(changedProperties);
    this.updateEvents();

    // #713: Make sure to set the custom validation message on mount
    // When we have a custom element, we need to wait for it to be ready!
    const input = this.getInput();

    if (this.customValidationMessage) {
      if (isSynergyElement(input)) {
        await input.updateComplete;
      }
      input?.setCustomValidity(this.customValidationMessage);
    }

    // Make sure to run validation on mount if eager is set
    if (this.eager) {
      await this.updateComplete;
      this.isValid = input?.validity?.valid ?? false;
      input?.reportValidity();
    }
  }

  connectedCallback() {
    super.connectedCallback();

    // #1119: Update alert size when the input size changes
    // Note that we need to create our own observer here,
    // as the size attribute may be changed on the input element directly,
    // which would not be captured by the synergy-element observer.
    this.sizeObserver = new MutationObserver(entries => {
      const input = this.getInput();

      if (!input) {
        return;
      }

      const hasSizeChanged = entries
        .filter(({ target }) => target === input)
        .every(
          entry => entry.attributeName === 'size',
        );

      if (hasSizeChanged) {
        this.setAlertSize();
      }
    });

    this.sizeObserver.observe(this, {
      attributeFilter: ['size'],
      attributes: true,
      subtree: true,
    });

    // #717: Make sure to remove to rerun validation when
    // disabled or readonly properties change on the input
    this.observer = new MutationObserver(entries => {
      const input = this.getInput();

      if (!input) {
        return;
      }

      // Check if the input is disabled or readonly
      const hasDisabledOrReadonly = entries
        .filter(({ target }) => target === input)
        .every(entry => {
          const target = entry.target as HTMLInputElement;
          return target.hasAttribute('disabled') || target.hasAttribute('readonly');
        });

      if (hasDisabledOrReadonly) {
        this.isValid = true;
        this.validationMessage = '';
      } else {
        // When using a synergy element, we need to check the validity after the element is updated,
        // as we cannot rely on the validity state of the element itself.
        // Unfortunately, this depends on used browser :(.
        const waitForPromise = isSynergyElement(input)
          ? input.updateComplete
          : Promise.resolve();

        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        waitForPromise.then(() => {
          this.isValid = input?.validity?.valid ?? false;
          this.validationMessage = input?.validationMessage ?? '';
        });
      }
    });

    this.observer.observe(this, {
      attributeFilter: ['disabled', 'readonly'],
      attributes: true,
      subtree: true,
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.controller.abort();
    this?.observer?.disconnect();
    this?.sizeObserver?.disconnect();
  }

  updated(changedProperties: PropertyValues) {
    super.updated(changedProperties);

    // #664: Make sure to update the syn-tooltip if the validation state changes when using the tooltip variant
    if (this.variant !== 'tooltip') {
      return;
    }

    const tooltip = this.tooltipElement;

    if (!tooltip) {
      return;
    }

    // When we have a valid tooltip,
    // we need to update the content and show or hide it based on the validation state and focus state.
    // We have to do this manually, as there is a problem when updating open and content at the same time.
    // The order is critical: fill before showing, don´t update the content during hide.
    const shouldShowTooltip = !this.isValid && this.validationMessage && this.hasFocus;

    if (shouldShowTooltip) {
      tooltip.content = this.validationMessage;
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      tooltip.show();
    } else {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      tooltip.hide();
    }
  }

  private renderInlineValidation() {
    if (this.variant !== 'inline' || !this.validationMessage) {
      return '';
    }

    return html`
      <syn-alert
        open
        exportparts="base:alert__base,message:alert__message,icon:alert__icon"
        part="alert"
        size=${ifDefined(this.alertSize)}
        variant="danger"
      >
        ${!this.hideIcon
          ? html`<syn-icon slot="icon" name="status-error" library="system"></syn-icon>`
          : ''
        }
        ${this.validationMessage}
      </syn-alert>
    `;
  }

  render() {
    // #664: When using the tooltip variant, we need to wrap the default slot in a tooltip when the input is invalid and has a validation message.
    const slotContent = this.variant === 'tooltip'
      ? html`
        <syn-tooltip
          .anchor=${getActualInputElement(this.getInput()) as Element ?? undefined}
          exportparts="base:tooltip__base,base__popup:tooltip__popup,base__arrow:tooltip__arrow,body:tooltip__body"
          .open=${this.eager ? !this.isValid && this.validationMessage.length > 0 : false}
          part="tooltip"
          placement="bottom"
          trigger="manual"
        >
          ${renderDefaultSlot()}
        </syn-tooltip>
      ` : renderDefaultSlot();

    return html`
      <div
        class="validate"
        part="base"
      >
        ${slotContent}
        ${this.renderInlineValidation()}
      </div>
    `;
  }
}
