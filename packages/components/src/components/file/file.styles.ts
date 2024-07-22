import { css } from 'lit';

export default css`
  :host {
    display: block;
  }

  #input {
    display: none;
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
`;
