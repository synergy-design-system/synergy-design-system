import { css } from 'lit';

export default css`
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
    background: var(--syn-interactive-background-color-hover);
    color: var(--syn-interactive-quiet-color-hover);
  }

  .hidden-input {
     all: unset;
     inset: 0;
     opacity: 0;
     position: absolute;
     z-index: -1;
   }
`;
