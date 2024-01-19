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

  :host([type='number']) .input--small:not(.input--no-spin-buttons) .input__suffix ::slotted(*) {
    margin-inline-end: var(--syn-input-spacing-small);
  }

  :host([type='number']) .input--medium:not(.input--no-spin-buttons) .input__suffix ::slotted(*) {
    margin-inline-end: var(--syn-input-spacing-small);
  }

  :host([type='number']) .input--large:not(.input--no-spin-buttons) .input__suffix ::slotted(*) {
    margin-inline-end: var(--syn-input-spacing-small);
    // TODO adapt
  }

  /**
  * Number stepper
  */
  .input__number-stepper {
    display: flex;
    align-items: center
  }


  .input__number-stepper-button {
    display: flex;
    align-items: center;
    background: none;
    border: none;
    cursor: pointer;
    transition: var(--syn-transition-x-fast) color;
    -webkit-appearance: none;
    padding: var(--syn-spacing-x-small);
    color: var(--syn-color-primary-600)
  }

  .input__number-stepper-button[disabled] {
    color: var(--syn-color-neutral-400);
    opacity: 0.5;
    cursor: not-allowed;
  }

  .input__number-stepper-button:hover:not([disabled]) {
    color: var(--syn-color-primary-900)
  }

  .input__number-stepper-button:active:not([disabled]) {
    color: var(--syn-color-primary-950)
  }

  .input--small .input__number-stepper-button {
    font-size: var(--syn-font-size-medium);
  }

  .input--medium .input__number-stepper-button {
    font-size: var(--syn-font-size-x-large);
  }

  .input--large .input__number-stepper-button {
    font-size: var(--syn-font-size-2x-large);
  }
`;
