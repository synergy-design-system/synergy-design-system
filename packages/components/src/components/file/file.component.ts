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
import SynIcon from '../icon/icon.component.js';
import styles from './file.styles.js';
import { getAnimation, setDefaultAnimation } from '../../utilities/animation-registry.js';
import { animateTo } from '../../internal/animate.js';

/**
 * @summary File controls allow selecting an arbitrary number of files for uploading.
 * @status stable
 *
 * @dependency syn-button
 * @dependency syn-icon
 *
 * @slot label - The input's label. Alternatively, you can use the `label` attribute.
 * @slot help-text - Text that describes how to use the input.
 * Alternatively, you can use the `help-text` attribute.
 * @slot droparea-icon - Optional droparea icon to use instead of the default.
 * Works best with `<syn-icon>`.
 *
 * @event syn-blur - Emitted when the control loses focus.
 * @event syn-change - Emitted when an alteration to the control's value is committed by the user.
 * @event syn-error - Emitted when multiple files are selected via drag and drop, without
 * the `multiple` property being set.
 * @event syn-focus - Emitted when the control gains focus.
 * @event syn-input - Emitted when the control receives input.
 *
 * @csspart form-control - The form control that wraps the label, input, and help text.
 * @csspart form-control-label - The label's wrapper.
 * @csspart form-control-input - The input's wrapper.
 * @csspart form-control-help-text - The help text's wrapper.
 * @csspart input-wrapper - The wrapper around the button and placeholder.
 * @csspart input-button - The syn-button acting as a file input.
 * @csspart input-placeholder - The placeholder text for the file input.
 * @csspart droparea-wrapper - The element wrapping the drop zone.
 * @csspart droparea-background - The background of the drop zone.
 * @csspart droparea-icon - The container that wraps the icon for the drop zone.
 * @csspart droparea-text - The text for the drop zone.
 *
 * @animation file.iconDrop.small - The animation to use for the file icon
 * when a file is dropped for size small
 * @animation file.iconDrop.medium - The animation to use for the file icon
 * when a file is dropped for size medium
 * @animation file.iconDrop.large - The animation to use for the file icon
 * when a file is dropped for size large
 * @animation file.text.disappear - The disappear animation to use for the file placeholder text
 * when a file is dropped
 * @animation file.text.appear - The appear animation to use for the file placeholder text
 * when a file is dropped
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
    'syn-icon': SynIcon,
  };

  private readonly formControlController = new FormControlController(this, {
    assumeInteractionOn: ['syn-change'],
    // This makes sure the value sent in formdata events is always the files object
    // @see internals/form.ts #handleFormData for more information
    value: (el: SynFile) => el.files,
  });

  private readonly hasSlotController = new HasSlotController(this, 'help-text', 'label');

  private readonly localize = new LocalizeController(this);

  @state() private userIsDragging = false;

  /** List of uploaded files */
  @property({ type: Object })
  set files(v: FileList | null) {
    if (this.input) {
      this.input.files = v;
    }
  }

  get files() {
    return this.input?.files;
  }

  /** The name of the input, submitted as a name/value pair with form data. */
  @property({ type: String }) name = '';

  /**
   * The current value of the input, submitted as a name/value pair with form data.
   * Beware that the only valid value when setting a file input is an empty string!
   */
  @property({ type: String })
  set value(v: string) {
    if (this.input) {
      this.input.value = v;
    }
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

  /** Draw the file input as a drop area */
  @property({ type: Boolean }) droparea = false;

  /**
   * Comma separated list of supported file types
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/accept
   * @example <syn-file accept=".jpg,.jpeg,.png,.gif,text/plain,image/*"></syn-file>
   */
  @property({ type: String }) accept = '';

  /**
   * Specifies the types of files that the server accepts.
   * Can be set either to user or environment.
   * Works only when not using a droparea!
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/capture
   */
  @property({ type: String }) capture: 'user' | 'environment';

  /**
   * Indicates whether the user can select more than one file.
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#multiple
   */
  @property({ reflect: true, type: Boolean }) multiple = false;

  /**
   * By default, form controls are associated with the nearest containing `<form>` element.
   * This attribute allows you to place the form control outside of a form and associate it
   * with the form that has this `id`. The form must be in the same document
   * or shadow root for this to work.
   */
  @property({ reflect: true }) form = '';

  /** Makes the input a required field. */
  @property({ reflect: true, type: Boolean }) required = false;

  /** Suppress the value from being displayed in the input */
  @property({ attribute: 'hide-value', type: Boolean }) hideValue = false;

  // The inputs hidden input[type="file"]
  @query('.input__control') input: HTMLInputElement;

  // The inputs button the user will interact with
  @query('.input__button') button: SynButton;

  // The droparea
  @query('.droparea__wrapper') dropareaWrapper: HTMLDivElement;

  // The droparea icon
  @query('.droparea__icon') dropareaIcon: HTMLSpanElement;

  // File name placeholer
  @query('.input__chosen') inputChosen: HTMLSpanElement;

  /** Gets the validity state object */
  get validity() {
    return this.input.validity;
  }

  /** Gets the validation message */
  get validationMessage() {
    return this.input.validationMessage;
  }

  /**
   * Checks for validity but does not show a validation message.
   * Returns `true` when valid and `false` when invalid.
   */
  checkValidity() {
    return this.input.checkValidity();
  }

  /** Gets the associated form, if one exists. */
  getForm(): HTMLFormElement | null {
    return this.formControlController.getForm();
  }

  /** Checks for validity and shows the browser's validation message if the control is invalid. */
  reportValidity() {
    return this.input.reportValidity();
  }

  /** Sets a custom validation message. Pass an empty string to restore validity. */
  setCustomValidity(message: string) {
    this.input.setCustomValidity(message);
    this.formControlController.updateValidity();
  }

  @watch('disabled', { waitUntilFirstUpdate: true })
  handleDisabledChange() {
    // Disabled form controls are always valid
    this.formControlController.setValidity(this.disabled);
  }

  @watch('value', { waitUntilFirstUpdate: true })
  async handleValueChange() {
    await this.updateComplete;
    this.formControlController.updateValidity();
  }

  /** Sets focus on the button or droparea. */
  focus(options?: FocusOptions) {
    if (this.droparea) {
      this.dropareaWrapper.focus(options);
      return;
    }

    this.button.focus(options);
  }

  /** Removes focus from the button or droparea. */
  blur() {
    if (this.droparea) {
      this.dropareaWrapper.blur();
      return;
    }

    this.button.blur();
  }

  private handleInvalid(event: Event) {
    this.formControlController.setValidity(false);
    this.formControlController.emitInvalidEvent(event);
  }

  /**
   * Handle file uploads
   * @param files The files to handle
   */
  private handleFiles(files: FileList | null) {
    if (!files) {
      this.value = '';
      return;
    }
    this.files = files;
  }

  private handleClick(e: Event) {
    e.preventDefault();
    this.input.click();
  }

  /** Handles the change event of the native input */
  private handleChange(e: Event) {
    e.preventDefault();
    e.stopPropagation();

    this.emit('syn-input');
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

  private async handleDrop(e: DragEvent) {
    e.preventDefault();
    e.stopPropagation();

    const files = e.dataTransfer?.files;

    if (files) {
      if (!this.multiple && files.length > 1) {
        this.emit('syn-error');
      } else {
        // Use the transferred file list from the drag drop interface
        const disappearAnimation = getAnimation(this.inputChosen, 'file.text.disappear', { dir: this.localize.dir() });
        const appearAnimation = getAnimation(this.inputChosen, 'file.text.appear', { dir: this.localize.dir() });

        if (this.droparea) {
          const dropIconAnimation = getAnimation(this.dropareaIcon, `file.iconDrop.${this.size}`, { dir: this.localize.dir() });
          // eslint-disable-next-line @typescript-eslint/no-floating-promises
          animateTo(this.dropareaIcon, dropIconAnimation.keyframes, dropIconAnimation.options);
        }

        await animateTo(this.inputChosen, disappearAnimation.keyframes, disappearAnimation.options);
        this.handleFiles(files);
        await animateTo(this.inputChosen, appearAnimation.keyframes, appearAnimation.options);
        this.input.dispatchEvent(new Event('change'));
      }
    }

    this.userIsDragging = false;
  }

  /**
   * Handle the focus of the droparea and emit focus event
   */
  private handleFocus() {
    this.emit('syn-focus');
  }

  /**
   * Handle the blur of the droparea and emit blur event
   */
  private handleBlur() {
    this.emit('syn-blur');
  }

  private renderValue() {
    let hasFiles = false;
    let fileChosenLabel = this.localize.term('fileNoFilesChosen');

    if (this.files && this.files?.length > 0) {
      hasFiles = true;
      fileChosenLabel = this.files.length === 1
        ? this.files[0].name
        : `${this.files.length} ${this.localize.term('fileChosen')}`;
    }

    return html`
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
    `;
  }

  /* eslint-disable @typescript-eslint/unbound-method */
  private renderDroparea() {
    return html`
      <div
        class="droparea__wrapper"
        @click=${this.handleClick}
        @keypress=${this.handleClick}
        @focus=${this.handleFocus}
        @blur=${this.handleBlur}
        tabindex=${this.disabled ? -1 : 0}
        part="droparea-wrapper"
      >
        <div
          class="droparea__background"
          part="droparea-background"
        >
          <span part="droparea-icon" class="droparea__icon">
            <slot name="droparea-icon">
              <syn-icon name="upload-file" library="system" ></syn-icon>
            </slot>
          </span>
          <p
            class="droparea__text"
            part="droparea-text"
          >
            <strong>${this.localize.term('fileDragDrop')}</strong>
            ${this.renderValue()}
          </p>
        </div>
      </div>
    `;
  }
  /* eslint-enable @typescript-eslint/unbound-method */

  /* eslint-disable @typescript-eslint/unbound-method */
  private renderInput() {
    const buttonText = this.multiple
      ? this.localize.term('fileButtonTextMultiple')
      : this.localize.term('fileButtonText');

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
        
        ${this.renderValue()}
      </div>
    `;
  }
  /* eslint-enable @typescript-eslint/unbound-method */

  /* eslint-disable @typescript-eslint/unbound-method */
  // eslint-disable-next-line complexity
  render() {
    const hasLabel = this.label || !!this.hasSlotController.test('label');
    const hasHelpText = this.helpText ? true : !!this.hasSlotController.test('help-text');
    const output = this.droparea ? this.renderDroparea() : this.renderInput();

    return html`
      <div
        class=${classMap({
          'form-control': true,
          'form-control--droparea': this.droparea,
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
            @change=${this.handleChange}
            class="input__control"
            ?disabled=${this.disabled}
            id="input"
            @invalid=${this.handleInvalid}
            ?multiple=${this.multiple}
            name=${ifDefined(this.name)}
            ?required=${this.required}
            type="file"
            tabindex="-1"
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

setDefaultAnimation('file.iconDrop.small', {
  keyframes: [
    { scale: 1 },
    { scale: 0.8 },
    { scale: 1 },
  ],
  options: { duration: 600, easing: 'ease-out' },
});

setDefaultAnimation('file.iconDrop.medium', {
  keyframes: [
    { scale: 1 },
    { scale: 0.7 },
    { scale: 1 },
  ],
  options: { duration: 600, easing: 'ease-out' },
});

setDefaultAnimation('file.iconDrop.large', {
  keyframes: [
    { scale: 1 },
    { scale: 0.6 },
    { scale: 1 }],
  options: { duration: 600, easing: 'ease-out' },
});

setDefaultAnimation('file.text.disappear', {
  keyframes: [
    { opacity: 1 },
    { opacity: 0, transform: 'translateY(-50%)' },
  ],
  options: { duration: 300, easing: 'cubic-bezier(0.45, 1.45, 0.8, 1)' },
});

setDefaultAnimation('file.text.appear', {
  keyframes: [
    { opacity: 0, transform: 'translateY(50%)' },
    { opacity: 1 },
  ],
  options: { duration: 300, easing: 'cubic-bezier(0.45, 1.45, 0.8, 1)' },
});
