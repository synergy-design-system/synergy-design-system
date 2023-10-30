import { css } from 'lit';

export default css`
    .input--medium .input__control {
    padding: var(--syn-spacing-x-small) var(--syn-input-spacing-small);
  }

    .input--small .input__control {
    padding: var(--syn-spacing-3x-small) var(--syn-input-spacing-small);
  }

    .input--large .input__control {
    padding: var(--syn-spacing-small) var(--syn-input-spacing-medium);
  }

  .input__prefix ::slotted(*) {
    padding: var(--syn-spacing-2x-small);
  }

    .input__suffix ::slotted(*) {
    padding: var(--syn-spacing-2x-small);
  }
`;
