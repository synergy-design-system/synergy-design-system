import { css } from 'lit';

export default css`
  :host {
    display: block;
  }

  #input {
    display: none;
  }

  /* Validation */
  :host([data-invalid]) .form-control__help-text {
    color: var(--syn-input-help-text-color-error);
  }

  /* Regular Input */
  .input__wrapper {
    align-items: center;
    display: flex;
    gap: var(--syn-spacing-medium);
  }

  :host([size="small"]) .input__wrapper {
    gap: var(--syn-spacing-small);
  }

  :host([size="large"]) .input__wrapper {
    gap: var(--syn-spacing-large);
  }

  .input__chosen {
    color: var(--syn-color-neutral-800);
    font-size: var(--syn-input-label-font-size-medium);
  }

  .input__chosen.input__chosen--hidden {
    display: none;
  }

  .input__chosen--placeholder {
    color: var(--syn-color-neutral-500);
  }

  :host([size="small"]) .input__chosen {
    font-size: var(--syn-input-label-font-size-small);
  }

  :host([size="large"]) .input__chosen {
    font-size: var(--syn-input-label-font-size-large);
  }

  /**
   * Special case for regular inputs:
   * When the user uses drag and drop, highlight the button with the primary color
   */
  .form-control--user-dragging:not([disabled]) .input__button::part(base) {
    background: none;
    border-color: var(--syn-color-primary-900);
    color: var(--syn-color-primary-900);
  }

  /* Dropzone */
  .dropzone__wrapper {
    border: var(--syn-border-width-small) dashed var(--syn-input-border-color);
    font: var(--syn-body-medium-regular);
    padding: var(--syn-spacing-x-large) var(--syn-spacing-large);
    transition: var(--syn-transition-medium) background;
  }

  .dropzone__wrapper:focus-visible {
    outline: var(--syn-focus-ring);
    outline-offset: var(--syn-focus-ring-offset);
  }

  .dropzone__background {
    align-items: center;
    display: flex;
    gap: var(--syn-spacing-x-small);
    padding: var(--syn-spacing-x-small) var(--syn-spacing-medium);
  }

  .dropzone__icon {
    color: var(--syn-color-primary-600);
    font-size: var(--syn-spacing-3x-large);
  }

  .dropzone__text {
    display: flex;
    flex-direction: column;
    margin: 0;
  }

  .dropzone__text strong {
    color: var(--syn-color-primary-600);
    font-weight: var(--syn-font-weight-bold);
  }

  .form-control--user-dragging .dropzone__wrapper,
  .dropzone__wrapper:not(:focus-visible):hover {
    background: var(--syn-color-primary-50);
    border: var(--syn-border-width-small) solid var(--syn-color-primary-600);
    cursor: pointer;
  }

  /* Sizes */
  :host([size="small"]) .dropzone__wrapper {
    font: var(--syn-body-small-regular);
  }

  :host([size="small"]) .dropzone__icon {
    font-size: var(--syn-spacing-2x-large)
  }

  :host([size="large"]) .dropzone__wrapper {
    font: var(--syn-body-large-regular);
  }

  :host([size="large"]) .dropzone__icon {
    font-size: var(--syn-spacing-4x-large)
  }
`;
