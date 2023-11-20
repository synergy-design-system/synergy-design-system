import { css } from 'lit';

export default css`
  .checkbox__control {
    border-radius: var(--syn-input-border-radius-small);
  }

  .checkbox__label {
    margin-inline-start: var(--syn-spacing-x-small);
  }

  /* Disabled */
  .checkbox--disabled .checkbox__label {
    color: var(--syn-color-neutral-700);
  }

  :host([data-user-invalid]) .checkbox__control {
    border-color: var(--syn-input-border-color-focus-error);
  }
`;
