/* eslint-disable */
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
    background: var(--syn-input-background-color);
    border: 1px solid var(--syn-radio-button-group-border-color);
    border-radius: var(--syn-input-border-radius-medium);
    max-width: fit-content;
    padding: var(--syn-spacing-3x-small);
  }

  .form-control--has-button-group syn-button-group::part(base) {
    border: 1px solid var(--component-radio-button-group-border-color, #737F85);
    border-radius: var(--syn-input-border-radius-large);
    padding: var(--syn-spacing-3x-small);
  }
`;
