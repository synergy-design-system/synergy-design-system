import { css } from 'lit';

export default css`
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
    font-size: var(--syn-input-spacing-medium);
   }

  .input--medium .input__prefix ::slotted(syn-icon) {
    font-size: var(--syn-input-spacing-large);
   }

  .input--large .input__prefix ::slotted(syn-icon) {
    font-size: var(--syn-font-size-2x-large);
   }

  .input--small .input__suffix ::slotted(syn-icon) {
    font-size: var(--syn-input-spacing-medium);
   }

  .input--medium .input__suffix ::slotted(syn-icon) {
    font-size: var(--syn-input-spacing-large);
   }

  .input--large .input__suffix ::slotted(syn-icon) {
    font-size: var(--syn-font-size-2x-large);
   }
  
  :host([data-user-invalid]) .input--standard {
    border-color: var(--syn-input-border-color-focus-error);
  }

  :host([data-user-invalid]) .input--standard.input--focused:not(.input--disabled) {
    border-color: var(--syn-input-border-color-focus-error);
    box-shadow: 0 0 0 var(--syn-focus-ring-width) var(--syn-input-focus-ring-error);
  }

  .input--standard.input--disabled .input__suffix, 
  .input--standard.input--disabled .input__prefix {
    cursor: not-allowed;
  } 
`;
