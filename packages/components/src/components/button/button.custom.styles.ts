import { css } from 'lit';

export default css`

  /*
* SIZES
*/
  .button--medium {
    font-size: var(--syn-button-font-size-large);
  }

  .button--large {
    font-size: var(--syn-font-size-large);
  }

  .button--large syn-icon {
    font-size: var(--syn-spacing-large);
  }

  .button.button--large.button--has-label.button--has-prefix .button__prefix,
  .button.button--large.button--has-label.button--has-suffix .button__suffix {
    font-size: var(--syn-spacing-large);
  }

  /*
 * COLORING
*/
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

  /*
 * PADDING
*/
   .button.button--small.button--has-label.button--has-prefix {
      padding-inline-start: var(--syn-spacing-small);
   }

  .button.button--small.button--has-label.button--has-suffix {
    padding-inline-end: var(--syn-spacing-small);
  }

  .button.button--primary.button--medium.button--has-label.button--has-prefix {
    padding-inline-start: var(--syn-spacing-medium);
   } 

  .button.button--medium.button--has-label.button--has-suffix {
    padding-inline-end: var(--syn-spacing-medium);
  }

  .button.button--large.button--has-label.button--has-prefix {
    padding-inline-start: var(--syn-spacing-large);
   }

  .button.button--large.button--has-label.button--has-prefix .button__label {
    padding-inline-start: var(--syn-spacing-medium);
   }

  .button.button--large.button--has-label.button--has-suffix {
    padding-inline-end: var(--syn-spacing-large);
  }

  .button.button--large.button--has-label.button--has-suffix .button__label {
    padding-inline-end: var(--syn-spacing-medium);
  }
  `;
