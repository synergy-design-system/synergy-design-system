import { css } from 'lit';

export default css`
  :host([readonly]) {
    cursor: default;
  }

  .button {
    --syn-radio-button-height-small: 24px;
    --syn-radio-button-height-medium: 32px;
    --syn-radio-button-height-large: 48px;

    border-radius: var(--syn-border-radius-small);
    font-weight: normal;
  }

  .button--small {
    line-height: calc(var(--syn-radio-button-height-small) - var(--syn-input-border-width) * 2);
    min-height: var(--syn-radio-button-height-small);
  }

  .button--medium {
    line-height: calc(var(--syn-radio-button-height-medium) - var(--syn-input-border-width) * 2);
    min-height: var(--syn-radio-button-height-medium);
  }

  .button--large {
    line-height: calc(var(--syn-radio-button-height-large) - var(--syn-input-border-width) * 2);
    min-height: var(--syn-radio-button-height-large);
  }

  /**
   * Override the default unchecked button
   */
  .button--text {
    color: var(--syn-interactive-quiet-color);
  }

  .button--text:hover {
    background: var(--syn-interactive-background-color-hover) !important;
    color: var(--syn-interactive-quiet-color-hover) !important;
  }

  /**
   * Readonly state styles
   */
  .button.button--readonly {
    background: var(--syn-readonly-background-color);
    color: var(--syn-readonly-color-text);
    cursor: text;
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

  .hidden-input {
     all: unset;
     inset: 0;
     opacity: 0;
     position: absolute;
     z-index: -1;
   }
`;
