import { css } from 'lit';

export default css`
  :host {
    display: block;
  }

  :host([data-user-invalid]) {
    --syn-input-border-color: var(--syn-input-border-color-focus-error);
    --syn-input-border-color-hover: var(--syn-input-border-color-focus-error);
    --syn-color-primary-600: var(--syn-input-border-color-focus-error);
    --syn-color-primary-900: var(--syn-color-error-900);
    --syn-color-primary-950: var(--syn-color-error-950);
    --syn-color-neutral-1000: var(--syn-input-border-color-focus-error);
    --syn-interactive-emphasis-color: var(--syn-input-border-color-focus-error);
    --syn-interactive-emphasis-color-hover: var(--syn-input-border-color-focus-error);
    --syn-interactive-emphasis-color-active: var(--syn-input-border-color-focus-error);
  }

  .form-control {
    border: none;
    margin: 0;
    padding: 0;
    position: relative;
  }

  .form-control__label {
    padding: 0;
  }

  .form-control-input {
    display: flex;
    flex-direction: column;
    gap: var(--syn-spacing-x-small);
  }

  .form-control--has-help-text.form-control--radio-group .form-control__help-text {
    margin-top: var(--syn-spacing-x-small);
  }

  .radio-group--required .radio-group__label::after {
    content: var(--syn-input-required-content);
    margin-inline-start: var(--syn-input-required-content-offset);
  }

  .visually-hidden {
    border: 0;
    /* stylelint-disable-next-line property-no-deprecated */
    clip: rect(0, 0, 0, 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    white-space: nowrap;
    width: 1px;
  }

  /**
   * #1140:
   * Apply custom styling when we are using syn-radio-button.
   * This is needed because syn-radio-button is displayed with space between the items
   * and should not adhere to the default styling needed for regular button groups.
   */
  .form-control--has-button-group .form-control-input {
    max-width: 100%; /* Fallback for older browsers, do not remove */
  }

  @supports (max-width: fit-content) {
    .form-control--has-button-group .form-control-input {
      /* stylelint-disable-next-line plugin/no-unsupported-browser-features */
      max-width: fit-content;
    }
  }

  .form-control--has-button-group syn-button-group::part(base) {
    --radiogroup-padding: calc(var(--syn-spacing-x-small) - 1px);

    border: 1px solid var(--syn-input-border-color);
    border-radius: var(--syn-input-border-radius-large);
    gap: var(--radiogroup-padding);
    padding: var(--radiogroup-padding);
  }

  .form-control--has-button-group syn-button-group[readonly]::part(base) {
    background: var(--syn-readonly-background-color);
    border-color: var(--syn-readonly-background-color);
  }

  .form-control--has-button-group syn-button-group[size="small"]::part(base) {
    --radiogroup-padding: calc(var(--syn-spacing-2x-small) + var(--syn-input-width));
  }

  /**
   * #1140: This statement overrides the children selectors that are used for showing readonly fields
   * We are not able to easily forward them to the radio button, so we need to override them here.
   */
  .form-control--has-button-group syn-button-group[readonly] ::slotted(syn-radio-button) {
    --syn-readonly-indicator-color: var(--syn-readonly-background-color);
    --syn-readonly-border-color: transparent;
    --syn-color-neutral-0: var(--syn-readonly-color-text);
  }
`;
