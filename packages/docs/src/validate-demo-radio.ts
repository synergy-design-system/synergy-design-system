import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('validate-demo-radio')
export class ValidateDemoRadio extends LitElement {
  static formAssociated = true;

  static shadowRootOptions = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };

  @property({ type: String }) name = '';

  @property({ type: String }) value = '';

  @property({ type: Boolean }) required = false;

  static styles = css`
    /* stylelint-disable */
    :host {
      --item-width: 32px;
      display: block;
    }

    div {
      box-sizing: content-box;
      display: flex;
      gap: 12px;
    }

    label {
      box-sizing: content-box;
      width: var(--item-width);
      height: var(--item-width);
      overflow: hidden;
      margin: 5px 0;
      padding: 5px;
    }

    input {
      box-sizing: border-box;
      appearance: none;
      width: var(--item-width);
      height: var(--item-width);
      color: red;
      border-radius: var(--item-width);
      background: currentColor;
      display: block;
      margin: 0;
      overflow: hidden;
      position: relative;
      cursor: pointer;
    }

    input:checked {
      outline: 2px solid currentColor;
      outline-offset: 2px;
    }

    input:not(checked):hover {
      filter: brightness(85%);
    }

    input:focus-visible {
      outline: 2px solid black;
      outline-offset: 2px;
    }

    label:nth-of-type(1) input {
      color: #ea0823;
    }

    label:nth-of-type(2) input {
      color: #8950BF;
    }

    label:nth-of-type(3) input {
      color: #007cc1;
    }

    label:nth-of-type(4) input {
      color: #63B017;
    }

    label:nth-of-type(5) input {
      color: #e5ae0d;
    }
    /* stylelint-enable */
  `;

  internals: ElementInternals;

  constructor() {
    super();
    this.internals = this.attachInternals();
  }

  connectedCallback() {
    super.connectedCallback();
    this.internals.setFormValue(this.value);
  }

  get willValidate() {
    return this.internals.willValidate;
  }

  formDisabledCallback(disabled: boolean) {
    // eslint-disable-next-line no-return-assign, no-param-reassign
    this.shadowRoot!.querySelectorAll('input').forEach(input => input.disabled = disabled);
  }

  formResetCallback() {
    this.value = '';
    this.internals.setFormValue('');
  }

  checkValidity() {
    return this.internals.checkValidity();
  }

  reportValidity() {
    return this.internals.reportValidity();
  }

  get validity() {
    return this.internals.validity;
  }

  get validationMessage() {
    return this.internals.validationMessage;
  }

  validate() {
    const isValid = this.value?.length > 0 && this.value === 'option3';

    if (isValid) {
      this.internals.setValidity({});
    } else {
      this.internals.setValidity(
        { customError: true },
        'You know, that this is not correct.',
        this.shadowRoot!.querySelector('input[value="option3"]') as HTMLElement,
      );
    }

    return isValid;
  }

  render() {
    return html`
      <div>
        ${[1, 2, 3, 4, 5].map(n => html`
          <label>
            <input
              ?required=${this.required}
              ?checked=${this.value === `option${n}`}
              type="radio"
              name=${this.name}
              value=${n === 3 ? `option${n}` : ''}
              @click="${() => this.selectOption(`option${n}`)}"
            >
            Option ${n}
          </label>
        `)}
      </div>
    `;
  }

  selectOption(option: string) {
    this.value = option;
    this.internals.setFormValue(option);
    this.validate();
  }
}
