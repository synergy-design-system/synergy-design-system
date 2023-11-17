import { css } from 'lit';

/**
 * @todo
 * - [ ] :hover Design not in figma
 * - [ ] indeterminate Icon has to be defined in assets
 * - [ ] Toggles size tokens are currently incorrect
 *        --syn-toggle-size-small,
 *        --syn-toggle-size-medium: 1.125rem,
 *        --syn-toggle-size-large: 1.375rem
 *        --syn-focus-ring-offset: 0
 */
export default css`
  .checkbox__control {
    border-radius: var(--syn-input-border-radius-small);
  }

  .checkbox__label {
    margin-inline-start: var(--syn-spacing-x-small);
  }

  /* Disabled */
  .checkbox--disabled {
    opacity: 1;
  }

  .checkbox--disabled .checkbox__label {
    color: var(--syn-color-neutral-700);
  }
`;
