import { css } from 'lit';

export default css`
.button--medium {
    font-size: var(--syn-button-font-size-large);
  }

  .button--large {
    font-size: var(--syn-font-size-large);
  }

  .button--default.button--primary.button--disabled {
    background-color: var(--syn-color-neutral-400);
    border-color: var(--syn-color-neutral-400);
    color: var(--syn-color-neutral-600);
  }

  .button--outline.button--primary.button--disabled {
    background: none;
    border-color: var(--syn-color-neutral-400);
    color: var(--syn-color-neutral-400);
  }

  .button--text.button--primary.button--disabled {
    color: var(--syn-color-neutral-400);
  }

  .button--default.button--primary:hover:not(.button--disabled) {
    background-color: var(--syn-color-primary-900);
    border-color: var(--syn-color-primary-900);
    color: var(--syn-color-neutral-0);
  }

  .button--outline.button--primary:hover:not(.button--disabled),
  .button--outline.button--primary.button--checked:not(.button--disabled) {
    background: none;
    border-color: var(--syn-color-primary-900);
    color: var(--syn-color-primary-900);
  }
  
  .button--text:hover:not(.button--disabled) {
    color: var(--syn-color-primary-900);
  }
  `;
