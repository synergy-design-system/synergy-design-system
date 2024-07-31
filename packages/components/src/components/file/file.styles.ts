import { css } from 'lit';

export default css`
  :host {
    display: block;
  }

  .input__control {
    /**
     * Visually hide the input type=file without display:none
     * This is necessary for accessibility reasons and so the native html input validation popup 
     * is shown.
     */
    border: 0;
    clip-path: inset(50%);
    height: 1px;
    margin: 0;
    overflow: hidden;
    padding: 0;
    position: absolute;
    white-space: nowrap;
    width: 1px;
  }

  .form-control--droparea .input__control {
    /* move the input into the center, so the native validation popup is centered to the droparea */
    left: 50%;
  }

  .form-control-input {
    /* needed, so the native validation popup is centered correctly */
    position: relative;
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
    color: var(--syn-input-help-text-color);
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

  /* Drop Area */
  .droparea__wrapper {
    --highlight-color: var(--syn-color-primary-600);

    border: var(--syn-border-width-small) dashed var(--syn-input-border-color);
    font: var(--syn-body-medium-regular);
    padding: var(--syn-spacing-x-large) var(--syn-spacing-large);
    transition: var(--syn-transition-medium) background;
  }

  .droparea__wrapper:focus-visible {
    outline: var(--syn-focus-ring);
    outline-offset: var(--syn-focus-ring-offset);
  }

  /* Adjust the highlight to match an inactive item */
  :host([disabled]) .droparea__wrapper {
    --highlight-color: var(--syn-color-neutral-600);
  }

  :host([disabled]) .input__chosen {
    display: none;
  }

  .droparea__background {
    align-items: center;
    display: flex;
    gap: var(--syn-spacing-x-small);
    padding: var(--syn-spacing-x-small) var(--syn-spacing-medium);
  }

  .droparea__icon {
    color: var(--highlight-color);
    font-size: var(--syn-spacing-3x-large);
  }

  .droparea__text {
    display: flex;
    flex-direction: column;
    margin: 0;
  }

  .droparea__text strong {
    color: var(--highlight-color);
    font-weight: var(--syn-font-weight-bold);
  }

  /* Sizes */
  :host([size="small"]) .droparea__wrapper {
    font: var(--syn-body-small-regular);
  }

  :host([size="small"]) .droparea__icon {
    font-size: var(--syn-spacing-2x-large)
  }

  :host([size="large"]) .droparea__wrapper {
    font: var(--syn-body-large-regular);
  }

  :host([size="large"]) .droparea__icon {
    font-size: var(--syn-spacing-4x-large)
  }

  /* Disabled Styles */
  :host([disabled]) .droparea__wrapper,
  :host([disabled]) .input__chosen {
    cursor: not-allowed;
    opacity: 0.5;
  }

  :host(:not([disabled])) .form-control--user-dragging .droparea__wrapper,
  :host(:not([disabled])) .droparea__wrapper:not(:focus-visible):hover {
    background: var(--syn-color-primary-50);
    border: var(--syn-border-width-small) solid var(--syn-color-primary-600);
    cursor: pointer;
  }
`;
