// import { classMap } from 'lit/directives/class-map.js';
import { property } from 'lit/decorators.js';
import type { CSSResultGroup } from 'lit';
import { html } from 'lit';
import { defaultValue } from '../../internal/default-value.js';
import type { SynergyFormControl } from '../../internal/synergy-element.js';
import { FormControlController } from '../../internal/form.js';
import componentStyles from '../../styles/component.styles.js';
import formControlStyles from '../../styles/form-control.styles.js';
import formControlCustomStyles from '../../styles/form-control.custom.styles.js';
import SynergyElement from '../../internal/synergy-element.js';
import SynButton from '../button/button.component.js';
import styles from './file.styles.js';

/**
 * @summary File controls allow selecting an arbitary number of files for uploading.
 * @status stable
 *
 * @dependency syn-button
 *
 * @slot label - The input's label. Alternatively, you can use the `label` attribute.
 * @slot help-text - Text that describes how to use the input.
 * Alternatively, you can use the `help-text` attribute.
 *
 * @event syn-blur - Emitted when the control loses focus.
 * @event syn-change - Emitted when an alteration to the control's value is committed by the user.
 * @event syn-focus - Emitted when the control gains focus.
 * @event syn-invalid - Emitted when the form control has been checked for validity
 * and its constraints aren't satisfied.
 *
 * @csspart form-control - The form control that wraps the label, input, and help text.
 * @csspart form-control-label - The label's wrapper.
 * @csspart form-control-input - The input's wrapper.
 * @csspart form-control-help-text - The help text's wrapper.
 * @csspart base - The component's base wrapper.
 * @csspart input - The internal `<input>` control.
 */
export default class SynFile extends SynergyElement implements SynergyFormControl {
  static styles: CSSResultGroup = [
    componentStyles,
    formControlStyles,
    formControlCustomStyles,
    styles,
  ];

  static dependencies = {
    'syn-button': SynButton,
  };

  private readonly formControlController = new FormControlController(this, {
    assumeInteractionOn: ['syn-blur', 'syn-input'],
  });

  /** The name of the input, submitted as a name/value pair with form data. */
  @property() name = '';

  /** The current value of the input, submitted as a name/value pair with form data. */
  @property() value = '';

  /** The default value of the form control. Primarily used for resetting the form control. */
  @defaultValue() defaultValue = '';

  /** The input's size. */
  @property({ reflect: true }) size: 'small' | 'medium' | 'large' = 'medium';

  /** The input's label. If you need to display HTML, use the `label` slot instead. */
  @property() label = '';

  /** The input's help text. If you need to display HTML, use the `help-text` slot instead. */
  @property({ attribute: 'help-text' }) helpText = '';

  /** Disables the input. */
  @property({ reflect: true, type: Boolean }) disabled = false;

  /** Draw the file input as a dropzone */
  @property({ type: Boolean }) dropzone = false;

  /**
   * Comma separated list of supported file types
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#accept
   * @example <syn-file accept=".jpg,.jpeg,.png,.gif"></syn-file>
   */
  @property({ type: String }) accept = '';

  /**
   * Specifies the types of files that the server accepts
   * Can be set either to user or environment
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/capture
   */
  @property({ type: String }) capture: 'user' | 'environment';

  /**
   * Indicates whether the user can select more than one file.
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#multiple
   */
  @property({ type: Boolean }) multiple: boolean;

  /**
   * By default, form controls are associated with the nearest containing `<form>` element.
   * This attribute allows you to place the form control outside of a form and associate it
   * with the form that has this `id`. The form must be in the same document
   * or shadow root for this to work.
   */
  @property({ reflect: true }) form = '';

  /** Indicates that the input should receive focus on page load. */
  @property({ type: Boolean }) autofocus: boolean;

  /** Suppress the value from being displayed in the input */
  @property({ attribute: 'hide-value', type: Boolean }) hideValue = false;

  /** Gets the validity state object */
  get validity(): ValidityState {
    console.log('validity', this);
    return {
      badInput: false,
      customError: false,
      patternMismatch: false,
      rangeOverflow: false,
      rangeUnderflow: false,
      stepMismatch: false,
      tooLong: false,
      tooShort: false,
      typeMismatch: false,
      valid: true,
      valueMissing: false,
    };
  }

  /** Gets the validation message */
  get validationMessage() {
    console.log('validationMessage', this);
    return '';
  }

  /**
   * Checks for validity but does not show a validation message.
   * Returns `true` when valid and `false` when invalid.
   */
  checkValidity() {
    console.log('checkValidity', this);
    return true;
  }

  /** Gets the associated form, if one exists. */
  getForm(): HTMLFormElement | null {
    return this.formControlController.getForm();
  }

  /** Checks for validity and shows the browser's validation message if the control is invalid. */
  reportValidity() {
    console.log('reportValidity', this);
    return true;
  }

  /** Sets a custom validation message. Pass an empty string to restore validity. */
  setCustomValidity(message: string) {
    console.log('setCustomValidity!', this, message);
  }

  render() {
    console.log(this);
    return html`
      <div>SynFile</div>
    `;
  }
}
