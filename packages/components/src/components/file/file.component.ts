import { classMap } from 'lit/directives/class-map.js';
import { property, query, state } from 'lit/decorators.js';
import type { CSSResultGroup } from 'lit';
import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { defaultValue } from '../../internal/default-value.js';
import { watch } from '../../internal/watch.js';
import type { SynergyFormControl } from '../../internal/synergy-element.js';
import { LocalizeController } from '../../utilities/localize.js';
import { FormControlController } from '../../internal/form.js';
import { HasSlotController } from '../../internal/slot.js';
import componentStyles from '../../styles/component.styles.js';
import formControlStyles from '../../styles/form-control.styles.js';
import formControlCustomStyles from '../../styles/form-control.custom.styles.js';
import SynergyElement from '../../internal/synergy-element.js';
import SynButton from '../button/button.component.js';
import styles from './file.styles.js';

/**
 * @summary File controls allow selecting an arbitrary number of files for uploading.
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
 * @csspart input-wrapper - The wrapper around the button and placeholder.
 * @csspart input-button - The syn-button acting as a file input.
 * @csspart input-placeholder - The placeholder text for the file input.
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

  private readonly hasSlotController = new HasSlotController(this, 'help-text', 'label');

  private readonly localize = new LocalizeController(this);

  @state() private userIsDragging = false;

  /** List of uploaded files */
  @property({ attribute: false }) files: FileList | null = null;

  /** The name of the input, submitted as a name/value pair with form data. */
  @property() name = '';

  /**
   * The current value of the input, submitted as a name/value pair with form data.
   * Beware that the only valid value when setting a file input is an empty string!
   */
  @property({ type: String })
  set value(v: string) {
    this.input.value = v;
  }

  get value() {
    return this.input?.value;
  }

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

  /** The inputs hidden input[type="file"] */
  @query('.input__control') input: HTMLInputElement;

  /** The inputs button the user will interact with */
  @query('.input__button') button: SynButton;

  /** Gets the validity state object */
  get validity(): ValidityState {
    console.log('validity', this, this.files);
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

  @watch('disabled', { waitUntilFirstUpdate: true })
  handleDisabledChange() {
    // Disabled form controls are always valid
    this.formControlController.setValidity(this.disabled);
  }

  /** Sets focus on the button. */
  focus(options?: FocusOptions) {
    this.button.focus(options);
  }

  /** Removes focus from the button. */
  blur() {
    this.button.blur();
  }

  private handleClick() {
    this.input.click();
  }

  private handleChange(e: Event) {
    e.preventDefault();
    e.stopPropagation();
    const target = e.target as HTMLInputElement;
    this.files = target.files;
    this.emit('syn-change');
  }

  private handleDragOver(e: DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    this.userIsDragging = true;
  }

  private handleDragLeave(e: DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    this.userIsDragging = false;
  }

  private handleDrop(e: DragEvent) {
    e.preventDefault();
    e.stopPropagation();

    // Use the transferred file list from the drag drop interface
    if (e.dataTransfer?.files) {
      this.files = e.dataTransfer.files;
    }

    this.userIsDragging = false;
  }

  /* eslint-disable @typescript-eslint/unbound-method */
  private renderDropzone() {
    console.log(this);
    return html``;
  }
  /* eslint-enable @typescript-eslint/unbound-method */

  /* eslint-disable @typescript-eslint/unbound-method */
  private renderInput() {
    const buttonText = this.multiple
      ? this.localize.term('fileButtonTextMultiple')
      : this.localize.term('fileButtonText');

    let hasFiles = false;
    let fileChosenLabel = this.localize.term('fileNoFilesChosen');
    if (this.multiple && this.files?.length) {
      hasFiles = true;
      fileChosenLabel = `${this.files.length} ${this.localize.term('fileChosen')}`;
    } else if (this.files?.length) {
      hasFiles = true;
      fileChosenLabel = this.files[0].name;
    }

    return html`
      <div
        class="input__wrapper"
        part="input-wrapper"
      >
        <syn-button
          class="input__button"
          @click=${this.handleClick}
          ?disabled=${this.disabled}
          part="input-button"
          size=${this.size}
          variant="outline"
        >
          ${buttonText}
        </syn-button>
        
        <span
          class=${classMap({
            input__chosen: true,
            'input__chosen--hidden': this.hideValue,
            'input__chosen--placeholder': !hasFiles,
          })}
          part="input-placeholder"
        >
          ${fileChosenLabel}
        </span>
      </div>
    `;
  }
  /* eslint-enable @typescript-eslint/unbound-method */

  /* eslint-disable @typescript-eslint/unbound-method */
  // eslint-disable-next-line complexity
  render() {
    const hasLabel = this.label || !!this.hasSlotController.test('label');
    const hasHelpText = this.helpText ? true : !!this.hasSlotController.test('help-text');
    const output = this.dropzone ? this.renderDropzone() : this.renderInput();

    return html`
      <div
        class=${classMap({
          'form-control': true,
          'form-control--has-help-text': hasHelpText,
          'form-control--has-label': hasLabel,
          'form-control--large': this.size === 'large',
          'form-control--medium': this.size === 'medium',
          'form-control--small': this.size === 'small',
          'form-control--user-dragging': this.userIsDragging,
        })}
        @dragenter=${this.handleDragOver}
        @dragleave=${this.handleDragLeave}
        @dragover=${this.handleDragOver}
        @drop=${this.handleDrop}
        part="form-control"
      >
        <label
          aria-hidden=${hasLabel ? 'false' : 'true'}
          class="form-control__label"
          for="input"
          part="form-control-label"
        >
          <slot name="label">${this.label}</slot>
        </label>

        <div
          class="form-control-input"
          part="form-control-input"
        >

          ${output}

          <input
            accept=${this.accept}
            aria-describedby="help-text"
            aria-hidden="true"
            @change=${this.handleChange}
            class="input__control"
            ?disabled=${this.disabled}
            id="input"
            ?multiple=${this.multiple}
            name=${ifDefined(this.name)}
            type="file"
          >
        </div>

        <div
          aria-hidden=${hasHelpText ? 'false' : 'true'}
          class="form-control__help-text"
          id="help-text"
          part="form-control-help-text"
        >
          <slot name="help-text">${this.helpText}</slot>
        </div>
      </div>
    `;
  }
  /* eslint-enable @typescript-eslint/unbound-method */
}