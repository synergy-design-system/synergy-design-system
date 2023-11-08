import { css } from 'lit';

export default css`

  /* DISABLED */

  :host([disabled]) .form-control--has-label .form-control__label,
  :host([disabled]) .form-control--has-help-text .form-control__help-text {
    opacity: 0.5;
  }

  /* PADDINGS */
  .input--medium .input__control {
    padding: var(--syn-spacing-x-small) var(--syn-input-spacing-medium);
  }

  .input--small .input__control {
    padding: var(--syn-spacing-3x-small) var(--syn-input-spacing-small);
  }

  .input--large .input__control {
    padding: var(--syn-input-spacing-small) var(--syn-input-spacing-large);
  }

  .input--small .input__prefix ::slotted(*) {
    margin-inline-end: var(--syn-spacing-x-small);
    margin-inline-start: var(--syn-input-spacing-small);
  }

  .input--medium .input__prefix ::slotted(*) {
    margin-inline-end: var(--syn-input-spacing-small);
    margin-inline-start: var(--syn-input-spacing-medium);
  }

  .input--large .input__prefix ::slotted(*) {
    margin-inline-end: var(--syn-input-spacing-medium);
    margin-inline-start: var(--syn-input-spacing-large);
  }

  .input--small .input__suffix ::slotted(*) {
    margin-inline-end: var(--syn-input-spacing-small);
    margin-inline-start: var(--syn-spacing-x-small);
  }

  .input--medium .input__suffix ::slotted(*) {
    margin-inline-end: var(--syn-input-spacing-medium);
    margin-inline-start: var(--syn-input-spacing-small);
  }

  .input--large .input__suffix ::slotted(*) {
    margin-inline-end: var(--syn-input-spacing-large);
    margin-inline-start: var(--syn-input-spacing-medium);
  }

  /* ICONS SIZE */
   .input--small .input__prefix ::slotted(syn-icon) {
    font-size: var(--syn-input-spacing-small);
   }

  .input--large .input__prefix ::slotted(syn-icon) {
    font-size: var(--syn-input-spacing-large);
   }

  .input--small .input__suffix ::slotted(syn-icon) {
    font-size: var(--syn-input-spacing-small);
   }

  .input--large .input__suffix ::slotted(syn-icon) {
    font-size: var(--syn-input-spacing-large);
   }
  
  :host([data-user-invalid]) .input--standard {
    border-color: var(--syn-input-border-color-focus-error);
  }

  :host([data-user-invalid]) .input--standard.input--focused:not(.input--disabled) {
    border-color: var(--syn-input-border-color-focus-error);
    box-shadow: 0 0 0 var(--syn-focus-ring-width) var(--syn-input-focus-ring-error);
  }
`;
