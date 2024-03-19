import { css } from 'lit';

export default css`
  .icon-button {
    border-radius: 0;
    color: currentColor;
    font-size: inherit;
  }

  /* Color variants */
  .icon-button--neutral,
  .icon-button--neutral:focus-visible:not(.icon-button--disabled):not(:hover) {
    color: var(--syn-color-neutral-950);
  }

  .icon-button--primary,
  .icon-button--primary:focus-visible:not(.icon-button--disabled) {
    color: var(--syn-color-primary-600);
  }

  .icon-button--primary:hover:not(.icon-button--disabled) {
    color: var(--syn-color-primary-900);
  }

  .icon-button--primary:active:not(.icon-button--disabled) {
    color: var(--syn-color-primary-950);
  }

  .icon-button--disabled {
    color: var(--syn-color-neutral-400);
  }

  /* Remove round borders */
  .icon-button:focus-visible {
    border-radius: var(--syn-border-radius-none);
  }


  /* Sizes */
  .icon-button--small {
    font-size: var(--syn-font-size-medium);
  }

  .icon-button--medium {
    font-size: var(--syn-font-size-x-large);

  }

  .icon-button--large {
    font-size: var(--syn-font-size-2x-large);
  }

  /* Force user to set "label" prop */
  .icon-button[aria-label=""] {
    border: var(--syn-border-width-large) var(--syn-color-error-600) solid;
  }

  .icon-button[aria-label=""]::after {
    content: "Set label prop for a11y to get rid of this text and border!";
    font-size: var(--syn-font-size-2x-small);
    margin-left: var(--syn-spacing-2x-small);
  }
`;
