import { css } from 'lit';

export default css`
  :host([readonly]) {
    cursor: default;
  }

  .button {
    /* Medium size is the default */
    --syn-radio-button-height: 32px;
    --syn-radio-button-radius: var(--syn-radio-button-group-border-radius-medium);

    border-radius: var(--syn-radio-button-radius);
    font-weight: normal;
    line-height: calc(var(--syn-radio-button-height) - var(--syn-input-border-width) * 2);
    min-height: var(--syn-radio-button-height);
  }

  .button--small {
    --syn-radio-button-height: 24px;
    --syn-radio-button-radius: var(--syn-radio-button-group-border-radius-small);
  }

  .button--large {
    --syn-radio-button-height: 48px;
    --syn-radio-button-radius: var(--syn-radio-button-group-border-radius-large);
  }

  /**
   * Icon only buttons
   */
  .button--icon-only .button__label {
    border-radius: var(--syn-border-radius-medium);
    padding-inline: var(--syn-spacing-2x-small);
  }

  /**
   * Override the default unchecked button
   */
  .button--text {
    color: var(--syn-interactive-quiet-color);
  }

  .button--text:hover:not(.button--disabled):not(.button--readonly) {
    background: var(--syn-interactive-background-color-hover);
    color: var(--syn-interactive-quiet-color-hover);
  }

  /**
   * Readonly state styles
   */
  .button.button--readonly {
    background: var(--syn-readonly-background-color);
    color: var(--syn-readonly-color-text);
    cursor: text;
    pointer-events: none;
    user-select: text;
  }

  .button.button--readonly:focus-visible {
    background: var(--syn-input-readonly-background-color-focus);
    color: var(--syn-readonly-color-text);
  }

  .button.button--readonly.button--checked {
    background: var(--syn-readonly-indicator-color);
    border-color: var(--syn-readonly-border-color);
    color: var(--syn-color-neutral-0);
  }
`;
