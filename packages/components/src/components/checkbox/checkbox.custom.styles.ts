import { css } from 'lit';

/**
 * @todo
 * - [ ] indeterminate Icon has to be defined in assets
 * - [ ] Toggles size tokens are currently incorrect
 *   --syn-toggle-size-small,
 * --syn-toggle-size-medium: 1.125rem,
 * --syn-toggle-size-large: 1.375rem
 */
export default css`
  .checkbox__control {
    border-radius: 0;
  }

  /* Disabled */
  .checkbox--disabled {
    opacity: 1;
  }

  .checkbox--disabled .checkbox__label {
    color: var(--syn-color-neutral-700);
  }
`;
