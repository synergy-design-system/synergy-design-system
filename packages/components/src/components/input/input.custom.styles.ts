import { css } from 'lit';

export default css`

  /* PADDINGS */
  .input--medium .input__control {
    padding: var(--syn-spacing-x-small) var(--syn-input-spacing-small);
  }

    .input--small .input__control {
    padding: var(--syn-spacing-3x-small) var(--syn-input-spacing-small);
  }

    .input--large .input__control {
    padding: var(--syn-spacing-small) var(--syn-input-spacing-medium);
  }

  .input__prefix ::slotted(syn-icon) {
    padding: var(--syn-spacing-2x-small);
  }

  .input--small .input__prefix ::slotted(*) {
    margin-inline-start: var(--syn-input-spacing-small);
  }

  .input--medium .input__prefix ::slotted(*) {
    margin-inline-start: var(--syn-input-spacing-small);
  }

  .input--large .input__prefix ::slotted(*) {
    margin-inline-start: var(--syn-input-spacing-medium);
  }

  /* -----------TODO -----------------------------*/

    .input--small .has-prefix .input__control {
    padding: var(--syn-spacing-3x-small) var(--syn-input-spacing-2x-small);
  }

  .input--medium .has-prefix .input__control {
    padding: var(--syn-input-spacing-x-small);
  }

  .input--large .has-prefix .input__control {
    padding: var(--syn-input-spacing-small);
  }

  /* -----------TODO -----------------------------*/

  .input__suffix ::slotted(*) {
    padding: var(--syn-spacing-2x-small);
  }

  .input--small .input__suffix ::slotted(*) {
    margin-inline-end: var(--syn-input-spacing-small);
  }

  .input--medium .input__suffix ::slotted(*) {
    margin-inline-end: var(--syn-input-spacing-small);
  }

  .input--large .input__suffix ::slotted(*) {
    margin-inline-end: var(--syn-input-spacing-medium);
  }

  /* ICONS SIZE */
   .input--small .input__prefix ::slotted(syn-icon) {
    font-size: var(--syn-spacing-small);
   }

  .input--large .input__prefix ::slotted(syn-icon) {
    font-size: var(--syn-spacing-large);
   }

    .input--small .input__suffix ::slotted(syn-icon) {
    font-size: var(--syn-spacing-small);
   }

  .input--large .input__suffix ::slotted(syn-icon) {
    font-size: var(--syn-spacing-large);
   }
  
`;
